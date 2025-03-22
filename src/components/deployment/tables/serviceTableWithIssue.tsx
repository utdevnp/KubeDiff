
import React from 'react';

import { deploymentHavingIssue, filterDeployments } from '@/functions';
import DeploymentList from './listDeployments';

const ServiceTableWithIssue = (props: any) => {
  const { deployments } = props;
  const deploymentList: any[] = filterDeployments(deployments);
  const deploymentHavingIssues = deploymentHavingIssue(deploymentList);
  return (
    deploymentHavingIssues.length  ? (
      <div className="overflow-x-auto">
        <h4 className='text-red-500 gap-2'>{props.title}</h4>
        <table className="w-full table-auto border-collapse border border-gray-300 mt-2">
          <tbody>
            {deploymentHavingIssues.map((deployment: any, index: number) => (
              <DeploymentList key={index} index={index} deployment={deployment} />
            ))}
          </tbody>
        </table>
      </div>
    ) : null
  );
  
};

export default ServiceTableWithIssue;