import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import StudentList from "./Components/Students/StudentList";

const STU_DATA = [];

function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 使用useCallBack
  const fetchData = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch("http://127.0.0.1:90/api/students");
      if (res.ok) {
        const json = await res.json();
        setStuData(json);
      } else {
        throw new Error("请求发生错误！");
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  });

  // 使用useCallBack
  const deleteData = useCallback(async (id) => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:90/api/students/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const json = await res.json();
        setStuData(json);
      } else {
        throw new Error("请求发生错误！");
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  });

  // 组件一渲染就开始向服务器请求数据
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);
  //   // fetch在执行的时候报错 then也会执行
  //   fetch("http://127.0.0.1:90/api/student")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       setLoading(false);
  //       throw new Error("数据加载错误！");
  //     })
  //     .then((json) => {
  //       setStuData(json);
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setError(e.message);
  //       setLoading(false);
  //     });
  // }, []);

  // 点击刷新 触发
  const freshHandler = () => {
    fetchData();
  };

  // 点击删除 触发
  const deleteHandler = (id) => {
    deleteData(id);
  };

  // 组件加载触发
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <button onClick={freshHandler}>点击刷新</button>
      {!loading && !error ? <StudentList stus={stuData} deleteHandler={deleteHandler}/> : ""}
      {loading ? "正在加载" : ""}
      {error ? "数据加载出错" : ""}
    </div>
  );
}

export default App;
