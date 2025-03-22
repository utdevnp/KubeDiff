import { Deployment } from "@/types";

export const saveDeploymentsData = (deployments: Deployment[]) => {
    console.log('deployments', deployments);
    localStorage.setItem('deployments', JSON.stringify(deployments));
}

export const getDeploymentsData = () => {
    const deployments = localStorage.getItem('deployments');
    return deployments ? JSON.parse(deployments) : [];
}

export const saveConfigData = (deployments: Deployment[]) => {
    localStorage.setItem('configMap', JSON.stringify(deployments));
}

export const getConfigData = () => {
    const deployments = localStorage.getItem('configMap');
    return deployments ? JSON.parse(deployments) : [];
}

export const saveWorkLoadData = (deployments: Deployment[]) => {
    localStorage.setItem('workload', JSON.stringify(deployments));
}

export const getWorkLoadData = () => {
    const deployments = localStorage.getItem('workload');
    return deployments ? JSON.parse(deployments) : [];
}