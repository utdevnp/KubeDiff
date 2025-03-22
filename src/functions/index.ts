import { Deployment } from "@/pages/api/deploy";
import { DEFAULT_IGNORED_NAME, DEFAULT_NAMESPACE } from "@/setting";

export const filterDeployments = (deployments: Deployment[], filter: string = DEFAULT_NAMESPACE) => {
    return deployments.filter(deployment => deployment.namespace == filter && deployment.name != DEFAULT_IGNORED_NAME);
}

export const getDeploymentStatus = (replicas: number | null, available: number | null) => {
    if (replicas === null) {
        return {
            status: "Uninitialized",
            color: "text-gray-500",
            description: "Replicas not set or unknown."
        };
    }
    if (available === null) {
        return {
            status: "Unknown",
            color: "text-gray-500",
            description: "Availability status is not reported."
        };
    }

    if (replicas === 0 && available === 0) {
        return {
            status: "Scaled Down",
            color: "text-blue-500",
            description: "Deployment is intentionally scaled to zero."
        };
    }

    if (replicas === available) {
        return {
            status: "Running",
            color: "text-green-600",
            description: "All replicas are running and serving traffic."
        };
    }

    if (replicas > available) {
        return {
            status: "Degraded",
            color: "text-yellow-600",
            description: "Some replicas are unavailable."
        };
    }

    if (available > replicas) {
        return {
            status: "Unexpected",
            color: "text-red-600",
            description: "More available replicas than expected. Possible misconfiguration."
        };
    }

    return {
        status: "Unknown",
        color: "text-gray-500",
        description: "An unexpected condition occurred."
    };
}

export const deploymentHavingIssue = (deployments: Deployment[]) => {
    const filteredDeployments = filterDeployments(deployments);
    return filteredDeployments.filter(deployment => {
        const status = getDeploymentStatus(deployment.replicas, deployment.available);
        return status.status !== "Running";
    });
}

export const findDifferentNamesInList = (list: any[]) => {
    if(list.length !== 2) {
        return;
    }
    const [arr1, arr2] = list;

    // Filter by namespace 'default' and exclude 'zipkin'
    const filteredArr1 = arr1.filter((item: { namespace: string; name: string; }) => item.namespace === DEFAULT_NAMESPACE && item.name !== DEFAULT_IGNORED_NAME);
    const filteredArr2 = arr2.filter((item: { namespace: string; name: string; }) => item.namespace === DEFAULT_NAMESPACE && item.name !== DEFAULT_IGNORED_NAME);
  
    // Find differences between filtered arrays based on 'name'
    const diffInArr1 = filteredArr1.filter((item: { name: any; }) => !filteredArr2.some((e: { name: any; }) => e.name === item.name));
    const diffInArr2 = filteredArr2.filter((item: { name: any; }) => !filteredArr1.some((e: { name: any; }) => e.name === item.name));
  
    return [diffInArr1, diffInArr2];
  }