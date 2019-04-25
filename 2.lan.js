let http = require('http');
let url = require('url'); 
let path = require('path');
let fs = require('fs');
let obj = {
  'zh-CN':{
    data:'你好,世界'
  },
  en:{
    data:'hello,world'
  },
  ja:{
    data:'こんにちは、世界'
  }
}
let defaultLanguage = 'en';
let server = http.createServer(async function (req,res) {
  // 多语言 (语言包)
  // 1) 根据路径不同返回不同的语言
  // 2) 可以前端配置多语言
  // 3) 服务端配置多语言
  // Accept-Language: zh-CN;q=0.3,zh;q=0.9,en;q=1 请求头
  // [zh-CN, zh;q=0.9, en;q=0.8]
  // 
  let lan = req.headers['accept-language'];
  res.setHeader('Content-Type', 'text/plain;charset=utf8');
  if(lan){
    let lans = lan.split(',').map(l=>{ // 按照,分割
      let [name, q = 1] = l.split(';'); // 并且把数据转化成[{name:'zh-cn',q:1},{name:'zh';q:0.9}]格式
      return {
        name,
        q: q===1?1:Number(q.split('=')[1])
      }
    }).sort((a,b)=>b.q - a.q); // 根据权重排序
    for(let i = 0; i<lans.length;i++){ // 找到对应的语言返回
      let lanName = lans[i].name;
      console.log(lanName)
      if(obj[lanName]){
        return res.end(obj[lanName].data);
      }
    }
    res.end(obj[defaultLanguage].data); // 找不到默认语言
  }else{
    res.end(obj[defaultLanguage].data);
  }
  
});

server.listen(3000,function () {
  console.log(`server start 3000`);
})