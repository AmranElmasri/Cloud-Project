import React, { useState } from 'react';
import './style.css';
import axios from "axios";

const ConfigureCache = () => {
  const [configure, setConfigure] = useState({
    capacity: '10mb',
    replacePolicy: 'least recently used',
    clearCache: false,
  });


  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('/api/v1/cache-configure', configure);
  };

  const handleChanges = (e) => {
    setConfigure({...configure, [e.target.name]: e.target.value});
  };

  const handleClearCache = (e) => {
    setConfigure({...configure, [e.target.name]: e.target.checked});
  };

  return (
    <div className="mem__cache">
      <h2>Configure The mem-cache</h2>
      <form className="selection__form" onSubmit={handleSubmit}>
        <div className="capacity">
          <label htmlFor="capacity "> Edit the capacity of mem-cache</label>
          <br />
          <select
            name="capacity"
            id="capacity"
            value={configure.capacity}
            onChange={handleChanges}
          >
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
        </div>

        <div className="capacity">
          <label htmlFor="capacity "> replace policy</label>
          <br />
          <select
            name="replacePolicy"
            id="capacity"
            value={configure.replacePolicy}
            onChange={handleChanges}
          >
            <option value="least recently used">least recently used</option>
            <option value="random">Random</option>
          </select>
        </div>
        <label>
          clear the cache
          <input
            type="checkbox"
            name="clearCache"
            id="cache"
            value={configure.clearCache}
            onChange={handleClearCache}
          />  
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ConfigureCache;
