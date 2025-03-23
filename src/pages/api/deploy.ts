import type { NextApiRequest, NextApiResponse } from 'next';
import { KubeConfig, AppsV1Api, CoreV1Api, CoreV1ApiReadNamespacedConfigMapRequest, V1ConfigMap } from '@kubernetes/client-node';
import { DEFAULT_NAMESPACE } from '@/setting';
import { Deployment } from '@/types';

const extractConfigMaps = (podSpec: any): string[] => {
  const configMaps = new Set<string>();

  const containers = podSpec?.containers || [];
  containers.forEach((container: { env?: any; envFrom?: any }) => {
    (container.env || []).forEach((env: { valueFrom?: { configMapKeyRef?: { name: string } } }) => {
      if (env.valueFrom?.configMapKeyRef?.name) {
        configMaps.add(env.valueFrom.configMapKeyRef.name);
      }
    });
    (container.envFrom || []).forEach((envFrom: { configMapRef?: { name: string } }) => {
      if (envFrom.configMapRef?.name) {
        configMaps.add(envFrom.configMapRef.name);
      }
    });
  });

  (podSpec?.volumes || []).forEach((volume: { configMap?: { name: string } }) => {
    if (volume.configMap?.name) {
      configMaps.add(volume.configMap.name);
    }
  });

  return Array.from(configMaps);
};

async function getConfigMapData(apiClient: CoreV1Api, namespace: string, configMapName: string) {

      try {

        //return {};
        // Prepare the parameters for the request
        const params: CoreV1ApiReadNamespacedConfigMapRequest = {
          name: configMapName,
          namespace: namespace,
        };

        // Fetch the ConfigMap using the prepared parameters
        const response = await apiClient.readNamespacedConfigMap(params);

        // Ensure response has the 'data' field and it's not empty
        // The response directly returns the V1ConfigMap object, no 'body' property
        const configMap: V1ConfigMap = response;

        if (!configMap || !configMap.data || Object.keys(configMap.data).length === 0) {
          console.warn(`ConfigMap "${configMapName}" in namespace "${namespace}" has no data.`);
          return {}; // Return an empty object if no data is found
        }

        // Return the key-value pairs inside the 'data' field
        return configMap.data;
      } catch (err) {
        console.error(`Error fetching ConfigMap "${configMapName}" in namespace "${namespace}":`, err);
        return {}; // Return an empty object on error
      }
    }



async function getDeployments(context: string, loadConfig: boolean): Promise<Deployment[]> {
  const kc = new KubeConfig();
  const configPath = `${process.env.HOME}/.kube/config`;

  try {
    kc.loadFromFile(configPath);
    // Ensure the context exists
    const availableContexts = kc.getContexts().map(c => c.name);
    if (!availableContexts.includes(context)) {
      throw new Error(`Context "${context}" not found in ${configPath}. Available: ${availableContexts.join(', ')}`);
    }

    kc.setCurrentContext(context); // Switch to the specified context
    const k8sApi = kc.makeApiClient(AppsV1Api);
    const coreApi = kc.makeApiClient(CoreV1Api);

    const response: any = await k8sApi.listNamespacedDeployment({
      namespace: DEFAULT_NAMESPACE,
    });//await k8sApi.listDeploymentForAllNamespaces();
    const deployments: Deployment[] = [];

    for (const deployment of response.items) {
      const deploymentName = deployment.metadata?.name || 'Unknown';
      const namespace = deployment.metadata?.namespace || 'Unknown';
      const replicas = deployment.spec?.replicas || 0;
      const available = deployment.status?.availableReplicas || 0;
      const configMaps = loadConfig ? await getConfigMapData(coreApi, namespace, deploymentName) : {} ;

      deployments.push({
        name: deploymentName,
        namespace,
        replicas,
        available,
        configMaps,
        isConfigMapOpen: false,
        setCurrentView: false
      });
    }

    return deployments;

  } catch (err) {
    console.error(`Error fetching deployments for ${context}:`, err);
    throw err; // Re-throw to handle in the caller
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | { error: string }>
) {
  try {
    const deploymentsLists: any[] = [];
    const workloads: string[] = [];
    const workLoad1 = req.query.workload1 as string;
    const workLoad2 = req.query.workload2 as string;
    const loadConfig = req.query.loadConfig as unknown as boolean;

    if (workLoad1) {
      workloads.push(workLoad1);
    }
    if (workLoad2) {
      workloads.push(workLoad2);
    }

    const compareWorkLoads = workloads; //req.query.compareWorkLoads as string;
    for (let i = 0; i < compareWorkLoads.length; i++) {
      deploymentsLists.push(await getDeployments(compareWorkLoads[i], loadConfig));
    }
    res.status(200).json(deploymentsLists);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
}