// crypto 加密  md5( 摘要算法 )

// MD5的特点 不可逆
// 不同的内容加密长度是一样的
// 如果内容不相同 那么摘要的结果肯定也是不相同的
let crypto = require('crypto'); 

// let r = crypto.createHash('md5').update('123456777777').digest('base64');
// console.log(r);
// r = crypto.createHash('md5').update('4QrcOUm6Wau+VuBX8g+IPg==').digest('base64');
// console.log(r);

// 加盐算法

// 弄一个密码 根据我的密码进行加密 加密cookie
let fs = require('fs');
let s = fs.readFileSync('./rsa_private_key.pem','utf8');
let r = crypto.createHmac('sha1', s).update('123456').digest('base64');

// 非对称 对称
console.log(r);