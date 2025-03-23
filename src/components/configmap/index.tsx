import { useEffect, useState } from "react";
import { getDeploymentsData } from "@/functions/localstorage";
import { findName } from "@/functions";
import CountTable from "./tables/countInfo";
import ConfigMapDeployments from "./tables/deployments";

const ConfigMapTab = (props: any) => {
    const { workLoadOne, workLoadTwo, loading } = props;
    const [configMapData, setConfigMapData] = useState<any>([]);
    const [deploymentsDiff, setDeploymentsDiff] = useState<any>(null);
    useEffect(() => {
        setConfigMapData(getDeploymentsData());
        props.closeLoading(false);
    }, []);


    return (
        <div className="flex flex-row p-2 gap-8">
            {
                configMapData?.map((deployment: any, index: number) => (

                    <div key={index} className="flex flex-col gap-2">
                        <h3 className="font-bold flex-row text-l p-2">
                            {`${index + 1}.`} <span className="text-blue-500"> {index == 0 ? findName(workLoadOne || workLoadTwo) : findName(workLoadTwo)} </span> <small className="text-sm">({index == 0 ? workLoadOne || workLoadTwo : workLoadTwo})</small>
                            &nbsp; <small className="text-xs font-light text-green-500">{loading ? "Loading..." : ""}</small>
                        </h3>
                        <div className="flex flex-col gap-2">
                            <CountTable deployments={deployment} />
                            <ConfigMapDeployments deployments={deployment} title="Services" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ConfigMapTab;