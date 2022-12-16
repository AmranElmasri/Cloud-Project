import React, { useState } from "react";
import "./style.css";
const ManagerConfig = () => {
  const [resize, setResize] = useState("manual");

  const setResizeMemCache = (e) => {
    setResize(e.target.value);
  };
  return (
    <div className="ManagerConfig">
      <p>Configure The mem-cache</p>
      <form>
        <div className="config__content">
          <select name="cachConfig" id="">
            <option value="10mb">10 mb</option>
            <option value="20mb">20 mb</option>
            <option value="30mb">30 mb</option>
            <option value="40mb">40 mb</option>
            <option value="50mb">50 mb</option>
            <option value="60mb">60 mb</option>
            <option value="70mb">70 mb</option>
            <option value="80mb">80 mb</option>
            <option value="90mb">90 mb</option>
            <option value="100mb">100 mb</option>
          </select>
          <p>Configure The mem-cache</p>
          <select name="replacePolicy">
            <option value="least recently used">least recently used</option>
            <option value="random">Random</option>
          </select>
          <div style={{ margin: "20px 0" }}>
            <label>
              <p style={{ display: "inline-block" }}>delete all images</p>
              <input type="checkbox" name="clearImages" />
            </label>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>
              <p style={{ display: "inline-block" }}>
                clear all mem-cache nodes in the pool
              </p>
              <input type="checkbox" name="clearMemecache" />
            </label>
          </div>
          <div>
            <p style={{ display: "inline-block" }}>
              Selecting between (Manual mode-Automatically mode) for resizing
              the mem-cache
            </p>
            <select name="resizeMemCahe" onClick={setResizeMemCache}>
              <option value="manual">Manual</option>
              <option value="auto">Automatic</option>
            </select>
            <div style={{ fontSize: "20px" }}>
              {resize === "manual" && (
                <input
                  type="number"
                  name="resizeMemCahe"
                  max={8}
                  min={1}
                  style={{ width: "100px" }}
                />
              )}
            </div>
          </div>
          <button> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerConfig;
