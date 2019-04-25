let http = require('http');
let url = require('url'); // pathname,query
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let readFile = util.promisify(fs.readFile);
let mime = require('mime');
let crypto = require('crypto');

http.createServer(async function (req,res) {
  res.setHeader('Cache-Control','no-cache'); // http 1.1
  res.setHeader('Exipres', new Date(Date.now() + 10 * 1000).toLocaleString()); // 绝对时间
  
  // 第一次访问 给你一个文件的签名 Etag:各种
  // 下次你再来访问 会带上这个标签 if-none-match
  // 我在去拿文件当前的内容 在生成一个标签 如果相等 返回304即可(读文件)
 
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname, pathname); // 拼接真实文件的路径
  try {
    let statObj = await stat(realPath); // 判断文件是否存在
    if (statObj.isFile()) { // 是文件 返回文件'
      let content = await readFile(realPath);
      let sign = crypto.createHash('md5').update(content).digest('base64');
      let ifNoneMatch = req.headers['if-none-match'];
      if(ifNoneMatch === sign){
        res.statusCode = 304;
        res.end();
      }else{
        res.setHeader('Etag', sign);
        res.setHeader('Content-Type', mime.getType(realPath) + ';charset=utf-8');
        res.end(content);
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


// 缓存 一般分为 强制缓存 和 对比缓存
// 第一次来先来个强制缓存 Cache-Control + expires
// 过了10s 在刷新 此时会再次发送请求 启用对比缓存 
//   1) Last-Modified:ctime  2) if-modified-since
//   1) Etag                 2) if-none-match

// 缓存 图片 百度logo 10年
// js的话 根据你的应用场景 

//  Accept-Encoding 接收的编码 zh-cn  根据文件大小 30字节+ 文件的修改时间 = etag

// 防盗链 + http-server 命令行工具 + koa