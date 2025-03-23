const KvFullDetail = ({ deployment, index, selectedKey }: { deployment: any, index: number, selectedKey: any }) => {
    let allKeys = []
    try {
        allKeys = selectedKey ? Object.entries(JSON.parse(atob(deployment[1][selectedKey]))) : [];
    } catch (error: any) {
        return <>{error.message}</>
    }

    return (
        <div>
            <table className="w-full table-auto border-collapse border border-gray-300 mt-2 text-sm">
                <tbody>
                    {
                        allKeys.map((item: any, index: number) => {
                            return <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item[0]}</td>
                                <td className="border border-gray-300 px-4 py-2 text-wrap"></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default KvFullDetail;