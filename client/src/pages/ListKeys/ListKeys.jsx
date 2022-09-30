import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const ListKeys = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get('/api/v1/get-images');
      setList(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="list__keys">
      <table>
        <caption>List of Keys</caption>
        <thead>
          <tr>
            <th>Key</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item.id}>
              <td>{item.key}</td>
              <td>
                <img src={item.image} alt="img" className="table__img" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <CircularProgress sx={{ marginTop: '4rem' }} />}
    </div>
  );
};

export default ListKeys;
