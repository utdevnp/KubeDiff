import { getDeploymentStatus } from "@/functions";

const DeploymentList = ({ deployment, index }: { deployment: any,index: number }) => {
    const status = getDeploymentStatus(deployment.replicas, deployment.available);
    return (
        <tr>
            <td className="border border-gray-300 px-4 py-2">{index+1}</td>
            <td className="border border-gray-300 px-4 py-2">{deployment.name}</td>
            <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Replicas'>{deployment.replicas}</p></td>
            <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Available'>{deployment.available}</p></td>
            <td className="border border-gray-300 px-4 py-2 block-inline"> <p title={status.description} className={status.color}>{status.status}</p></td>
        </tr>
    )
}

export default DeploymentList;