
import React from 'react';
import KeyVaultItem from './itemkv';
const KeyVaultsDetail = (props: any) => {
  const { deployments } = props;
  const deploymentList: any[] = Object.entries( deployments);

  return (
    <div className="overflow-x-auto">
       <h4>{props.title}</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 mt-2">
        <tbody>
          {deploymentList.map((deployment: any, index: number) => (
            <KeyVaultItem key={index} index={index} deployment={deployment} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyVaultsDetail;