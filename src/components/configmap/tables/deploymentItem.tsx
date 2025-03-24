
const ConfigMapDeploymentList = ({ deployment, index, updateDataWithIndex }: { deployment: any, index: number, updateDataWithIndex: any }) => {

    const configMapArray = Object.entries(deployment.configMaps);

    return (
        <>
            <tr>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{deployment.name}</td>
                <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Replicas'>{deployment.replicas}</p></td>
                <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Available'>{deployment.available}</p></td>
                <td className="border border-gray-300 px-4 py-2 block-inline"> <a href="javascript:;" onClick={() => updateDataWithIndex(index, deployment.isConfigMapOpen ? false : true)} className="text-blue-500">   {deployment.isConfigMapOpen ? "close" : "open"}</a></td>
            </tr>
            <tr className={deployment.isConfigMapOpen ? "" : "hidden"}>
                <td className={`border border-gray-300 px-4 py-2 text-sm gap-2 ${deployment.setCurrentView ? "bg-green-100" : ""}  `} colSpan={5}>
                    <div className="gap-3 p-2">
                        <table className="w-full table-auto">
                            <tbody>
                            {
                                deployment && configMapArray.map((item: any, index: number) => {
                                     return<tr className="border-b-gray-50"> <td>{index+1}</td> <td> {item[0]} </td><td> {item[1]} </td></tr>
                                })
                            } 
                            </tbody>
                        </table>
                    </div>
                    <div className="gap-3">
                        <hr className=" border-gray-300 mt-3 mb-3"></hr>
                        <a className="text-blue-500" href="javascript:;" onClick={() => updateDataWithIndex(index, deployment.setCurrentView ? false : true, false)} >  {deployment.setCurrentView ? "unset" : "set"}  current view</a>
                    </div>

                </td>
            </tr>

        </>

    )
}

export default ConfigMapDeploymentList;