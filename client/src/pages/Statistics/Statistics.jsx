import React from "react";

const Statistics = () => {
  const list = [
    { cache: "capacity", data: "70Mb" },
    { cache: " replace policy", data: "recently used" },
    { cache: "miss rate", data: "20%" },
    { cache: "hit rate", data: "80%" },
  ];
  return (
    <table>
      <caption>the current statistics for the mem-cache over the past 10 minutes</caption>
      <thead>
        <tr>
          <th>Key</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={index}>
            <td>{item.cache}</td>
            <td>{item.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Statistics;
