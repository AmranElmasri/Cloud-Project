import React from "react";
import "./style.css";

const ConfigureCache = () => {
  return (
    <div className="mem__cache">
      <h2>Configure The mem-cache</h2>
      <form className="selection__form">
        <div className="capacity">
          <label htmlFor="capacity "> Edit the capacity of mem-cache</label>
          <br />
          <select name="capacity" id="capacity">
            <option value="10MB">10 Mb</option>
            <option value="20MB">20 Mb</option>
            <option value="30MB">30 Mb</option>
            <option value="40MB">40 Mb</option>
            <option value="50MB">50 Mb</option>
            <option value="60MB">60 Mb</option>
            <option value="70MB">70 Mb</option>
            <option value="80MB">80 Mb</option>
            <option value="90MB">90 Mb</option>
            <option value="100MB">100 Mb</option>
          </select>
        </div>

        <div className="capacity">
          <label htmlFor="capacity "> replace policy</label>
          <br />
          <select name="capacity" id="capacity">
            <option value="10MB">Random</option>
            <option value="20MB">least recently used</option>
          </select>
        </div>
        <label>
          clear the cache
          <input type="checkbox" name="cache" id="cache" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ConfigureCache;
