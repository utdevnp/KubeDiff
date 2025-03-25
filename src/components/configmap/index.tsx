import { useEffect, useState } from "react";
import { getConfigData, getDeploymentsData, saveConfigData } from "@/functions/localstorage";
import { findName } from "@/functions";
import CountTable from "./tables/countInfo";
import ConfigMapDeployments from "./tables/deployments";
import httpRequest from "axios";

const ConfigMapTab = (props: any) => {
    const { workLoadOne, workLoadTwo, loading, activeTab } = props;
    const [configMapData, setConfigMapData] = useState<any>([]);
    const [error, setError] = useState("");
    const getDeployments = async (props: any) => {
        let queryString = [
            props.workLoadOne ? `workload1=${props.workLoadOne}` : '',
            props.workLoadTwo ? `workload2=${props.workLoadTwo}` : ''
        ].filter(Boolean).join('&');
        try {
            const response = await httpRequest.get(`/api/deploy?${queryString}&loadConfig=true`);

            if (response && response.data && response.data.length > 0) {
                props.closeLoading(false);
                saveConfigData(response.data);
                setConfigMapData(response.data);
            }
        } catch (error: any) {
            setError(error.message);
            props.closeLoading(false);
        }

    };

    const updateDataWithIndex = (index: number, value: boolean, isOpenFlag: boolean = true) => {
        const confData = getConfigData();

        for (let i = 0; i < confData.length; i++) {
            if (isOpenFlag) {
                confData[i][index].isConfigMapOpen = value
            } else {
                confData[i][index].setCurrentView = value
            }
        }

        const sortedDeployments = confData.map(group => 
            group.sort((a, b) => (a?.name ?? null).localeCompare(b?.name ?? null))
        );
          
        saveConfigData(sortedDeployments);
        getConfigFromLocal();
    }

    const getConfigFromLocal = () => {
        setConfigMapData(getConfigData());
    }

    useEffect(() => {
        getConfigFromLocal();

        if (loading && activeTab == "Config Map") {
            getDeployments(props);
        }
        props.closeLoading(false);
    }, [props]);


    return (
        <div>
            <div> {error ? error : ""}</div>
            <div className="flex flex-row p-2 gap-8">
                {
                    configMapData?.map((deployment: any, index: number) => (

                        <div key={index} className="flex flex-col gap-2">
                            <h3 className="font-bold flex-row text-l p-2">
                                {`${index + 1}.`} <span className="text-blue-500">
                                    {index == 0 ? findName(workLoadOne || workLoadTwo) : findName(workLoadTwo)} </span>
                                <small className="text-sm">({index == 0 ? workLoadOne || workLoadTwo : workLoadTwo})</small>
                                &nbsp; <small className="text-xs font-light text-green-500">{loading ? "Loading..." : ""}</small>
                            </h3>
                            <div className="flex flex-col gap-2">
                                <CountTable deployments={deployment} />
                                <ConfigMapDeployments deployments={deployment} updateDataWithIndex={updateDataWithIndex} title="Services" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default ConfigMapTab;