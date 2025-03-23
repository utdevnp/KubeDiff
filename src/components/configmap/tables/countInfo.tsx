import { deploymentHavingIssue, filterDeployments } from '@/functions';
import React from 'react';

const CountTable = (props: any) => {
  const allServices = filterDeployments(props.deployments);
  const deploymentHavingIssues = deploymentHavingIssue(allServices);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-center table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Services</th>
            <th className="border border-gray-300 px-4 py-2">Config Item</th>
            <th className="border border-gray-300 px-4 py-2">Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">{allServices.length}</td>
            <td className="border border-gray-300 px-4 py-2">2</td>
            <td className={`border border-gray-300 px-4 py-2 ${deploymentHavingIssues.length ? "text-red-500": "text-green-500"}`}>{deploymentHavingIssues.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CountTable;