import "./tab.css";

type TabProps = {
  path: string;
  selected: boolean;
};

const Tab = ({ path, selected }: TabProps) => {
  const tabName = path.slice(1, path.length);

  return (
    <a href={path} className={`tab ${selected ? "selected" : "option"}`}>
      <h3 className="tab-text">{tabName || "HOME"}</h3>
    </a>
  );
};

export default Tab;
