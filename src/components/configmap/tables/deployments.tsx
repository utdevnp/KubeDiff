
import React from 'react';
import { filterDeployments } from '@/functions';
import ConfigMapDeploymentList from './deploymentItem';

const ConfigMapDeployments = (props: any) => {
  const { deployments, type } = props;
  const deploymentList: any[] = filterDeployments(deployments);

  return (
    <div className="overflow-x-auto">
      { deploymentList.length ? <h4 className={type == 'diff' ? 'text-yellow-600 gap-2': ''}>{props.title}</h4> : <></>}
      <table className="w-full table-auto border-collapse border border-gray-300 mt-2">
        <tbody>
          {deploymentList.map((deployment: any, index: number) => (
            <ConfigMapDeploymentList key={index} index={index} deployment={deployment} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfigMapDeployments;