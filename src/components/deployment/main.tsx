
import { useEffect, useState } from "react";
import httpRequest from "axios";
import { findDifferentNamesInList, findName } from "@/functions";
import InfoTable from "./tables/infoTable";
import ServiceTableWithIssue from "./tables/serviceTableWithIssue";
import ServiceTable from "./tables/serviceTable";
import { Deployment } from "@/types";
import { saveDeploymentsData, getDeploymentsData } from "@/functions/localstorage";

const DeploymentTab = (props: any) => {
  const { workLoadOne, workLoadTwo, loading,activeTab } = props;
  const [deployments, setData] = useState<Deployment[] | null>(null);
  const [deploymentsDiff, setDataDiff] = useState<any | null>(null);
  const [error, setError]  = useState("");
  const getDeployments = async (props: any) => {
    let queryString = [
      props.workLoadOne ? `workload1=${props.workLoadOne}` : '',
      props.workLoadTwo ? `workload2=${props.workLoadTwo}` : ''
    ].filter(Boolean).join('&');
    try {
      const response = await httpRequest.get(`/api/deploy?${queryString}`);
      saveDeploymentsData(response.data);
      setData(response.data);
      setDataDiff(findDifferentNamesInList(response.data as unknown as any));

      if (response && response.data && response.data.length > 0) {
        props.closeLoading(false);
      }
    } catch (error:any) {
      setError(error.message);
      props.closeLoading(false);
    }

  };

  useEffect(() => {
    setData(getDeploymentsData());
    props.closeLoading(false);
  }, []);

  useEffect(() => {
    if (workLoadOne || workLoadTwo && activeTab =="Deployment") {
      getDeployments(props);
    }

  }, [loading]);


  if (loading && !deployments) return <div className="text-red-500">Error loading data</div>;

  return (
    <div>
      <div className="block w-100 p-2 gap-8">{error ? error : ""}</div>
      <div className="flex flex-row p-2 gap-8">
      
      {!workLoadOne && !workLoadTwo && !deployments ?
        <div className="text-red-500 p-2 gap-2">Please select at least one workloads</div> : ""}
      {
        deployments?.map((deployment, index) => (

          <div key={index} className="flex flex-col gap-2">
            <h3 className="font-bold flex-row text-l p-2">
              {`${index + 1}.`} <span className="text-blue-500"> {index == 0 ? findName(workLoadOne || workLoadTwo) : findName(workLoadTwo)} </span> <small className="text-sm">({index == 0 ? workLoadOne || workLoadTwo : workLoadTwo})</small>
              &nbsp; <small className="text-xs font-light text-green-500">{loading ? "Loading..." : ""}</small>
            </h3>
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
    </div>
   
  );
}

export default DeploymentTab;