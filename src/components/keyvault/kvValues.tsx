import KvFullDetail from "./table/itemfulldetail";

const CompareKv = (props: any) => {
    const { deployments, selectedKey } = props;
    const arrayData = Object.entries(deployments);
    return (
            <div className="flex flex-row p-2 gap-8 flex-text-wrap">
                {arrayData.map((deployment: any, index: number) => (
                    <KvFullDetail key={index} index={index} deployment={deployment} selectedKey={selectedKey} />
                ))}
            </div>);
};

export default CompareKv;