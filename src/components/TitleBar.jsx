import "./titlebar.css";

export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="title">CreativeMindMap</div>
      <div className="window-controls">
        <button className="minimize" onClick={() => window.electronAPI.minimize()}>
          &#x2013;
        </button>
        <button className="maximize" onClick={() => window.electronAPI.maximize()}>
          &#x25A1;
        </button>
        <button className="close" onClick={() => window.electronAPI.close()}>
          &#x2715;
        </button>
      </div>
    </div>
  );
}