import React from "react";

const CollectionTableHead = () => {
  const headers = ["Content", "Collection", "Progress"];
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              name="checkbox"
              placeholder="checkbox"
            />
          </label>
        </th>
        {headers.map((el) => (
          <th key={el}>{el}</th>
        ))}
      </tr>
    </thead>
  );
};

export default CollectionTableHead;
