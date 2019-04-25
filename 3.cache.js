// 304 走浏览器的缓存
// 缓存的类型 有两种 强制缓存 + 对比缓存

let http = require('http');
let url = require('url'); // pathname,query
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let mime = require('mime');
// 页面 可能内部引用了一个css  我希望把css缓存

http.createServer(async function (req,res) {
  console.log(req.url);
  // 告诉浏览器十秒内别再找我了 （index.html） 不会的
  res.setHeader('Cache-Control','max-age=10'); // http 1.1
  // 废弃了
  res.setHeader('Exipres', new Date(Date.now() + 10 * 1000).toLocaleString()); // 绝对时间
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname, pathname); // 拼接真实文件的路径
  try {
    let statObj = await stat(realPath); // 判断文件是否存在
    if (statObj.isFile()) { // 是文件 返回文件
      res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8');
      fs.createReadStream(realPath).pipe(res);
    } else {
      let url = path.join(realPath, 'index.html'); // 目录找html
      res.setHeader('Content-Type', 'text/html;charset=utf-8');
      fs.createReadStream(url).pipe(res);
    }
  } catch (e) { // 不存在返回404
    res.statusCode = 404;
    res.end('Not found');
  }
}).listen(4000);