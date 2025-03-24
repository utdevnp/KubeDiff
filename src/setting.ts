
export const workLoads = [
    {
        name: "dev2", // set env name 
        value: "aks-workload-name", // set env workload name as value
    }
];

export const keyVaults = [
    {
        name: "aks-workload-name", // your aks workload name
        value: "key-vault-name", // your key vault name
    }
]

export const DEFAULT_NAMESPACE = "default";
export const DEFAULT_IGNORED_NAME = "redis";