// crypto

// 加密 解密 hash函数 支付接口 数字签名 底层是 C/C++实现的


// 对称加密 非对称加密 

const crypto = require("crypto")


let key = crypto.randomBytes(32)

let iv = Buffer.from(key)
// console.log(iv);    

const hash = crypto.createHash("sha256")

console.log(hash.update("21221").digest("hex"));

// hash算法


// Node.js计算文件的MD5值
