
const ConfigMapDeploymentList = ({ deployment, index }: { deployment: any, index: number }) => {
    return (
        <>
            <tr>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{deployment.name}</td>
                <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Replicas'>{deployment.replicas}</p></td>
                <td className="border border-gray-300 px-4 py-2 block-inline cursor-pointer"> <p title='Available'>{deployment.available}</p></td>
                <td className="border border-gray-300 px-4 py-2 block-inline"> <a href="#" className="text-blue-500">Open / Close </a></td>
            </tr>
            <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm gap-2 bg-green-100 " colSpan={5}>
                    <div className="gap-3 p-2">
                        <ol type="1">
                            <li>Swagger API</li>
                            <li>Swagger API2</li>
                        </ol>
                    </div>
                    <div className="gap-3">
                        <hr className=" border-gray-300 mt-3 mb-3"></hr>
                        <a className="text-blue-500 underline" href="">Set current</a>
                    </div>

                </td>
            </tr>

        </>

    )
}

export default ConfigMapDeploymentList;