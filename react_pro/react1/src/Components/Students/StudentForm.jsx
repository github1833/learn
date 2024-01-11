import React from "react";

export const StudentForm = () => {
  return (
    <tr>
      <td>
        <input type="text"></input>
      </td>
      <td>
        <select>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </td>
      <td>
        <input type="text"></input>
      </td>
      <td>
        <input type="text"></input>
      </td>
      <td>
        <button>添加</button>
      </td>
    </tr>
  );
};
