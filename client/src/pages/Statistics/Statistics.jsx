import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Statistics = () => {
  const [configuration, setConfiguration] = useState({
    capacity: 10,
    replacepolicy: 'least-recently-used',
    hit_rate: 0,
    miss_rate: 0,
  });
  console.log('configuration: ', configuration);


  useEffect(() => {
    (async () => {
      const { data: data1 } = await axios.get('/api/v1/getConfiguraiton');
      const { data: data2 } = await axios.get('/api/v1/statistics');
      setConfiguration({
        ...configuration,
        capacity: data1[data1.length - 1].capacity,
        replacepolicy: data1[data1.length - 1].replacepolicy,
        hit_rate: data2[data2.length - 1].hit_rate,
        miss_rate: data2[data2.length - 1].miss_rate,
      });
    })();
  }, []);


  return (
    <table>
      <caption>
        the current statistics for the mem-cache over the past 10 minutes
      </caption>
      <thead>
        <tr>
          <th>Key</th>
          <th>statistics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>capacity</td>
          <td>{`${configuration.capacity} mb`}</td>
        </tr>
        <tr>
          <td>replace policy</td>
          <td>{configuration.replacepolicy}</td>
        </tr>
        <tr>
          <td>hit rate</td>
          <td>{`${configuration.hit_rate} %`}</td>
        </tr>
        <tr>
          <td>miss rate</td>
          <td>{`${configuration.miss_rate} %`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
