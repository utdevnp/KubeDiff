const KeyVaultItem = ({ deployment, index }: { deployment: any,index: number }) => {
    return (
        <tr>
            <td className="border border-gray-300 px-4 py-2">{index+1}</td>
            <td className="border border-gray-300 px-4 py-2">{deployment[0]}</td>
        </tr>
    )
}

export default KeyVaultItem;