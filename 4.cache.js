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
  // 告诉浏览器十秒内别再找我了 （index.html） 不会的
  res.setHeader('Cache-Control','no-cache'); // http 1.1
  // 废弃了
  res.setHeader('Exipres', new Date(Date.now() + 10 * 1000).toLocaleString()); // 绝对时间
  
  // 第一次访问的时候 要给浏览器加一个头 last-modified
  // 第二请求的时候 会自动带一个头 if-modified-since 
  // 如果当前带过来的头和文件当前的状态有出入 说明文件被更改了（时间变了但是内容没更改 会出现再次访问文件的问题）
  
 
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname, pathname); // 拼接真实文件的路径
  try {
    let statObj = await stat(realPath); // 判断文件是否存在
    if (statObj.isFile()) { // 是文件 返回文件'
      let prev = req.headers['if-modified-since'];
      let current = statObj.ctime.toGMTString();
      if (prev === current){ // 当前文件没有更改 去找缓存把
        res.statusCode = 304;
        res.end();
      }else{
        res.setHeader('Last-Modified', statObj.ctime.toGMTString());
        res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8');
        fs.createReadStream(realPath).pipe(res);
      }
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