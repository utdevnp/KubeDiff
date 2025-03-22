import type { NextApiRequest, NextApiResponse } from 'next';
import { KubeConfig, AppsV1Api } from '@kubernetes/client-node';
import { console } from 'inspector';

export interface Deployment {
  name: string;
  namespace: string;
  replicas: number;
  available: number;
}

async function getDeployments(context: string): Promise<Deployment[]> {
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

    const response:any = await k8sApi.listDeploymentForAllNamespaces();
    return response.items.map((deployment: { metadata: { name: any; namespace: any; }; spec: { replicas: any; }; status: { availableReplicas: any; }; }) => ({
      name: deployment.metadata?.name || 'Unknown',
      namespace: deployment.metadata?.namespace || 'Unknown',
      replicas: deployment.spec?.replicas || 0,
      available: deployment.status?.availableReplicas || 0,
    }));
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

    if(workLoad1){
      workloads.push(workLoad1);
    }
    if(workLoad2){
      workloads.push(workLoad2);
    }

    const compareWorkLoads = workloads; //req.query.compareWorkLoads as string;
    for (let i = 0; i < compareWorkLoads.length; i++) {
      deploymentsLists.push(await getDeployments(compareWorkLoads[i]));
    }
    res.status(200).json(deploymentsLists);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
}