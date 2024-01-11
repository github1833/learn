import React from "react";

const Student = (props) => {
  // js 解构
  // {stu:{name, age, gender, address}} = props

  const delete_ = () => {
    console.log(props.stu.id);
    props.deleteHandler(props.stu.id)
  };

  return (
    <tr>
      <td>{props.stu.attributes.name}</td>
      <td>{props.stu.attributes.gender}</td>
      <td>{props.stu.attributes.age}</td>
      <td>{props.stu.attributes.address}</td>
      <td>
        <button onClick={delete_}>删除</button>
      </td>
    </tr>
  );
};

export default Student;
