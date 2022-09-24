import React from "react";
import "./style.css";
import testImage from "../../assets/cloud-bg.jpg";

const ListKeys = () => {
  const list = [
    { key: "image", img: testImage },
    { key: "image", img: testImage },
    { key: "image", img: testImage },
    { key: "image", img: testImage },
    { key: "image", img: testImage },
  ];
  return (
    <table>
      <caption>List of Keys</caption>
      <thead>
        <tr>
          <th>Key</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr>
            <td>{`${item.key} ${index + 1}`}</td>
            <td>
              <img src={item.img} alt="img" className="table__img" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListKeys;
