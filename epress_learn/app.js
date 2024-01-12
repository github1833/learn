const express = require("express");
const app = express();



// 测试用的 127.0.0.1
// 只有用html标签加载的资源才有 referer字段 如img等
// 白名单
const white_host_list = ['localhost']
const preventLink = (req,resp,next) => {
    const referer = req.get("referer")
    if(referer){
        const {hostname} = new URL(referer)
        console.log(hostname);
        if(!white_host_list.includes(hostname)){
            console.log("禁止访问");
            resp.status(403).send("外链禁止访问")
        }
    }
    console.log("通行");
    next()
}

// 在访问静态资源之前检测是否是外链 相当于拦截器
app.use("/imgs",preventLink)
// 设置静态资源 

app.use(express.static('public'))




app.listen(8000, () => {
  "服务器启动成功！";
});
