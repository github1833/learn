const express = require("express");
const app = express();

const port = 90;

let DATA = [
  {
    id: "1",
    attributes: {
      name: "孙",
      age: 18,
      gender: "男",
      address: "花果山",
    },
  },
  {
    id: "2",
    attributes: {
      name: "李",
      age: 18,
      gender: "男",
      address: "花果山",
    },
  },
  {
    id: "3",
    attributes: {
      name: "王",
      age: 18,
      gender: "男",
      address: "花果山",
    },
  },
];

app.use("/*", (req, resp, next) => {
  resp.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
    "Access-Control-Allow-Methods": "*",
  });
  next();
});

app.get("/api/students", (req, resp) => {
  resp.send(DATA);
});

app.delete("/api/students/:id", (req, resp) => {
  const id = req.params["id"];
  DATA = DATA.filter((item) => id != item.id);
  resp.send(DATA);
});

app.listen(port, () => {
  console.log("服务器已经启动");
});
