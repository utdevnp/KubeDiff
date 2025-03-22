"use client";
import InfoTable from "@/componenets/infoTable";
import ServiceTable from "@/componenets/serviceTable";
import { useEffect, useState } from "react";
import httpRequest from "axios";
import ServiceTableWithIssue from "@/componenets/serviceTableWithIssue";
import { workLoads } from "@/setting";
import { findDifferentNamesInList } from "@/functions";

type Deployment = {
  name: string;
  namespace: string;
  replicas: number;
  available: number;
};

export default function Home() {

  const [deployments, setData] = useState<Deployment[] | null>(null);
  const [deploymentsDiff, setDataDiff] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [workLoadOne, setWorkLoadOne] = useState<string>('');
  const [workLoadTwo, setWorkLoadTwo] = useState<string>('');

  const getDeployments = async () => {
    let queryString = [
      workLoadOne ? `workload1=${workLoadOne}` : '',
      workLoadTwo ? `workload2=${workLoadTwo}` : ''
    ].filter(Boolean).join('&');

    const response = await httpRequest.get(`/api/deploy?${queryString}`);
    setData(response.data);
    setLoading(false);
    setDataDiff(findDifferentNamesInList(response.data as unknown as any));
    console.log(deploymentsDiff);
  };

 const setWorkLoadValueOne = (e: any) => {
    setWorkLoadOne(e.target.value);
    setLoading(true);
  }

  const setWorkLoadValueTwo = (e: any) => {
    setWorkLoadTwo(e.target.value);
    setLoading(true);
  }

  const refreshData = () => {
    setLoading(true);
    getDeployments();
  }

  useEffect(() => { getDeployments() }, [workLoadOne, workLoadTwo]);
  
  if (loading && !deployments) return <div className="text-red-500">Error loading data</div>;

  return (
    <div className="grid">
      <main className="flex flex-col gap-1 p-2 row-start-2 items-center sm:items-start">
        <h3 className="font-bold flex-row text-l p-2">Compare Workloads</h3>
        <div className="flex flex-row p-2 gap-2">
          <select onChange={setWorkLoadValueOne} className="p-2 text-l bg-gray-100 rounded-lg">
            <option value="">Choose workload </option>
            {
              workLoads.map((deployment, index) => (
                <option value={deployment.value} defaultValue={workLoadOne} key={index}>{deployment.name}</option>
              ))
            }
          </select>

          <select onChange={setWorkLoadValueTwo} className="p-2 text-l bg-gray-100 rounded-lg">
            <option value="">Choose workload </option>
            {
              workLoads.map((deployment, index) => (
                <option value={deployment.value} defaultValue={ deployment.value} key={index}>{deployment.name}</option>
              ))
            }
          </select>

          <div>  <button 
        onClick={refreshData} 
        className="cursor-pointer border border-gray-500 text-gray-800 px-4 py-2 rounded-sm hover:bg-gray-200 transition"
      >
        Refresh
      </button></div>
        </div>

        <div>
        {!workLoadOne && !workLoadTwo? 
          <div className="text-red-500 p-2 gap-2">Please select at least one workloads</div> : ""}
        </div>


        <div className="flex flex-row p-2 gap-2">

          {
            deployments?.map((deployment, index) => (

              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-bold flex-row text-l p-2">
                {`${index + 1}.`} {index == 0 ? workLoadOne || workLoadTwo : workLoadTwo} 
                  
                   <small className="text-blue-200 ml-2">{loading ? "Loading...": ""}
                </small></h3>
                <div className="flex flex-col gap-2">
                  <InfoTable deployments={deployment} />
                  <ServiceTableWithIssue deployments={deployment} title="Services with issue" />
                  {
                    deploymentsDiff ?
                      <ServiceTable deployments={deploymentsDiff[index]} type='diff' title="Different" /> : ""
                  }
                  <ServiceTable deployments={deployment} title="Services" />
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  );
}
