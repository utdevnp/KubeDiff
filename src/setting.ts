export const workLoads = [
    {
        name: "dev2",
        value: "aks-dev2-non-pci-eastus",
    }, {
        name: "dev3",
        value: "aks-dev3-non-pci-eastus",
    },
    {
        name: "uat2",
        value: "aks-uat2-non-pci-eastus",
    },
    {
        name: "prod",
        value: "aks-prod-non-pci-eastus",
    }
];

export const keyVaults = [
    {
        name: "aks-dev2-non-pci-eastus",
        value: "kvDev2NonPCI-US-E",
    }, {
        name: "kv-dev3-non-pci-us-e",
        value: "aks-dev3-non-pci-eastus",
    },
    {
        name: "kv-uat2-non-pci-us-e",
        value: "aks-uat2-non-pci-eastus",
    },
    {
        name: "kv-prod-non-pci-us-e",
        value: "aks-prod-non-pci-eastus",
    }
]

export const DEFAULT_NAMESPACE = "default";
export const DEFAULT_IGNORED_NAME = "zipkin";