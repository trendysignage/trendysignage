import React from 'react';


const TableLoader = ({colSpan}) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableLoader;
