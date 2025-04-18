import { deploymentHavingIssue, filterDeployments, getConfigMapDifferenceCount } from '@/functions';
import React from 'react';

const CountTable = (props: any) => {
  const allServices = props.deployments? filterDeployments(props.deployments) : [];
  const count = getConfigMapDifferenceCount(props.deployments);
  props.countMaps( count, props.index);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Services</th>
           
            <th className="border border-gray-300 px-4 py-2">Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">{allServices.length}</td>
            <td className={`border border-gray-300 px-4 py-2 ${props.isMatch ? "text-green-500": "text-red-500"}`}>{count}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountTable;