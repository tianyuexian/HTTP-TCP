let http = require('http');
let url = require('url'); // pathname,query
let path = require('path');
let fs = require('fs');
let util = require('util');
let stat = util.promisify(fs.stat);
let mime = require('mime');
let server = http.createServer(async function (req,res) {
  let { pathname } = url.parse(req.url);
  let realPath = path.join(__dirname, pathname); // 拼接真实文件的路径
  try{
    let statObj = await stat(realPath); // 判断文件是否存在
    if (statObj.isFile()){ // 是文件 返回文件
      res.setHeader('Content-Type', mime.getType(realPath)+';charset=utf-8');
      fs.createReadStream(realPath).pipe(res);
    }else{
      let url = path.join(realPath,'index.html'); // 目录找html
      res.setHeader('Content-Type','text/html;charset=utf-8');
      fs.createReadStream(url).pipe(res);
    }
  }catch(e){ // 不存在返回404
    res.statusCode = 404;
    res.end('Not found');
  }



  // fs.stat(realPath,function (err,statObj) {
  //   if(err){ // 文件存在
  //     res.statusCode = 404;
  //     res.end('Not found');
  //   }else{
  //     if(statObj.isFile()){
  //       res.setHeader('Content-Type','text/html;charset=utf8');
  //       fs.createReadStream(realPath).pipe(res);
  //     }else{
  //       let url = path.join(realPath,'index.html');
  //       fs.createReadStream(url).pipe(res);
  //     }
  //   }
  // });
 
  // fs.readFile


  // req.on('data',function () { // 只有当有请求体的时候 才会触发on('data')事件
  //   console.log('data')
  // });
  // req.on('end',function () {
  //   console.log('end');
  // })
});

server.listen(3000,function () {
  console.log(`server start 3000`);
})