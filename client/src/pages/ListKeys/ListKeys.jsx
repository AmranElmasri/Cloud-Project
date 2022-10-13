import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const ListKeys = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/v1/get-images');
        setList(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
            <th>Date</th>
          </tr>
        </thead>
        {list.length > 0 && (
          <tbody>
            {list?.map((item) => (
              <tr key={item.id}>
                <td>{item.key}</td>
                <td>
                  <img src={item.image} alt="img" className="table__img" />
                </td>
                <td>{item.posting_date.substring(0,10)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {list.length === 0 && !loading && <h3>No Image Yet</h3>}
      {loading && <CircularProgress sx={{ marginTop: '4rem' }} />}
    </div>
  );
};

export default ListKeys;
