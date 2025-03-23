import { getKvData, saveKvData } from "@/functions/localstorage";
import httpRequest from "axios";
import { useEffect, useState } from "react";
import KeyVaultsDetail from "./table/listkv";
import { findKv, findName } from "@/functions";
import CompareKv from "./kvValues";

const KeyVaultTab = (props: any) => {
  const { workLoadOne, workLoadTwo, loading } = props;
  const [keyVaults, setData] = useState<any | null>([]);
  const [kvKeys, setKvKeys] = useState<any>([]);
  const [kvSelected, setKvSelected] = useState("");
  const [selectedKey, setSelectedKey] = useState([]);

  const getKeyVaults = async (props: any) => {
    let queryString = [
      props.workLoadOne ? `workload1=${props.workLoadOne}` : '',
      props.workLoadTwo ? `workload2=${props.workLoadTwo}` : ''
    ].filter(Boolean).join('&');
    try {
      const response = await httpRequest.get(`/api/keyvault?`);
      //   saveDeploymentsData(response.data);
      setData(response.data);
      saveKvData(response.data);
      //   setDataDiff(findDifferentNamesInList(response.data as unknown as any));

      //   if (response && response.data && response.data.length > 0) {
      //     props.closeLoading(false);ss
      //   }
    } catch (error) {
      console.error('Error fetching deployments:', error);
      props.closeLoading(false);
    }

  };

  const setKeyName = (e: any) => {
    setKvSelected(e.target.value);
  }
  const getFromLc = () => {
    const kvData = getKvData();
    const getKeys = kvData[0];
    setKvKeys(Object.keys(getKeys).map((item) => item));
    setData(kvData);
  }

  useEffect(() => {
    getFromLc();
  }, []);

  if (!keyVaults.length || !kvKeys.length) {
    return;
  }
  return (
    <>
      <div>
        <select onChange={setKeyName} className="p-2 text-l bg-gray-100 rounded-lg">
          <option value="">Choose Keys </option>
          {
            kvKeys && kvKeys.map((keys: string, index: number) => (
              <option value={keys} key={index}>{keys}</option>
            ))
          }
        </select>
        <CompareKv selectedKey={kvSelected} deployments={keyVaults} />
      </div>
      <div className="flex flex-row p-2 gap-8">
        {
          keyVaults.map((deployment: any, index: number) => (
            <div key={index} className="flex flex-col gap-2">

              <h3 className="font-bold flex-row text-l p-2">
                {`${index + 1}.`} <span className="text-blue-500"> {index == 0 ? findKv(workLoadOne || workLoadTwo) : findKv(workLoadTwo)} </span> <small className="text-sm">({index == 0 ? workLoadOne || workLoadTwo : workLoadTwo})</small>
                &nbsp; <small className="text-xs font-light text-green-500">{loading ? "Loading..." : ""}</small>
              </h3>
              <div className="flex flex-col gap-2">
                <KeyVaultsDetail deployments={deployment} title="Keys" />
              </div>
            </div>
          ))
        }
      </div>
    </>

  )
}

export default KeyVaultTab;