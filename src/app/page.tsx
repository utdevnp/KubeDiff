"use client";
import { useEffect, useState } from "react";
import { workLoads } from "@/setting";
import DeploymentTab from "@/components/deployment/main";
import ConfigMapTab from "@/components/configmap";
import { getWorkLoadData, saveWorkLoadData } from "@/functions/localstorage";
import KeyVaultTab from "@/components/keyvault";

const tabs = ["Deployments", "Config Map", "Key Vault"];

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [workLoadOne, setWorkLoadOne] = useState<string>('');
  const [workLoadTwo, setWorkLoadTwo] = useState<string>('');
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const setWorkLoadValueOne = (e: any) => {
    setWorkLoadOne(e.target.value);
    saveWorkLoadData("workLoadOne", e.target.value);
    setLoading(true);
  }

  const setWorkLoadValueTwo = (e: any) => {
    setWorkLoadTwo(e.target.value);
    saveWorkLoadData("workLoadTwo", e.target.value);
    setLoading(true);
  }

  const refreshData = () => {
    setLoading(true);
  }

  const closeLoading = () => {
    setLoading(false);
  }

  useEffect(() => {
    setWorkLoadOne(getWorkLoadData('workLoadOne'));
    setWorkLoadTwo(getWorkLoadData('workLoadTwo'));
  }, []);
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
                <option value={deployment.value} defaultValue={workLoadTwo} key={index}>{deployment.name}</option>
              ))
            }
          </select>

          <div>
            {
              workLoadOne || workLoadTwo ? <button
                onClick={refreshData}
                className="cursor-pointer border-none bg-green-200 text-gray-800 px-4 py-2 rounded-sm hover:bg-green-600 hover:text-white transition"
              >
                {loading ? "Loading..." : "Refresh"}
              </button> : ""
            }
          </div>
        </div>

        <div className="w-full p-4">
          <div className="flex border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-gray-600 cursor-pointer hover:text-blue-600 transition ${activeTab === tab ? "border-b-2 border-blue-600 font-semibold text-blue-600" : ""
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4 tab body">
            {activeTab === "Deployments" && <DeploymentTab workLoadOne={workLoadOne} workLoadTwo={workLoadTwo} loading={loading} closeLoading={closeLoading} />}
            {activeTab === "Config Map" && <ConfigMapTab loading={loading} closeLoading={closeLoading}  workLoadOne={workLoadOne} workLoadTwo={workLoadTwo}/>}
            {activeTab === "Key Vault" && <KeyVaultTab/>}
          </div>
        </div>
      </main>
    </div>
  );
}
