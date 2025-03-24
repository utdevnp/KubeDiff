import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";


async function getKeyVaults(keyVaultName: string) {
  try {
    const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
    
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(keyVaultUrl, credential);
    const secrets: Record<string, string> = {};

  // Iterate over all secret properties (names)
  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    try {
      // Fetch the secret value
      const secret = await client.getSecret(secretProperties.name);
      secrets[secret.name] = secret.value || "(Secret value not available)";
    } catch (err) {
      console.error(`❌ Error retrieving secret ${secretProperties.name}:`, err);
    }
  }

  return secrets;

  } catch (err) {
    console.error(`Error fetching key vault keys ${keyVaultName} :`, err);
    throw err; // Re-throw to handle in the caller
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | { error: string }>
) {
  try {
    const keyVaultLists: any[] = [];
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
        keyVaultLists.push(await getKeyVaults(compareWorkLoads[i]));
    }
    res.status(200).json(keyVaultLists);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }


}