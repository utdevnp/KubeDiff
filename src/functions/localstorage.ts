import { Deployment } from "@/types";

export const saveDeploymentsData = (deployments: Deployment[]) => {
    localStorage.setItem('deployments', btoa(JSON.stringify(deployments)));
}

export const getDeploymentsData = () => {
    const deployments = localStorage.getItem('deployments');
    return deployments ? JSON.parse(atob(deployments)) : [];
}

export const saveConfigData = (deployments: Deployment[]) => {
    localStorage.setItem('configMap', btoa(JSON.stringify(deployments)));
}

export const getConfigData = () => {
    const deployments = localStorage.getItem('configMap');
    return deployments ? JSON.parse(atob(deployments)) : [];
}

export const saveKvData = (kv: any) => {
    localStorage.setItem('kv892', btoa(JSON.stringify(kv)));
}

export const getKvData = () => {
    const deployments = localStorage.getItem('kv892');
    return deployments ? JSON.parse(atob(deployments)) : [];
}

export const saveWorkLoadData = (workload: string, value: string) => {
    localStorage.setItem(workload, JSON.stringify(value));
}

export const getWorkLoadData = (workload:string) => {
    const deployments = localStorage.getItem(workload);
    return deployments ? JSON.parse(deployments) : [];
}
