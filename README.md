# 1.HTTP协议和TCP协议
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h1.png)
## 1.1 长链接
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h2.png)
## 1.2 管线化
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h3.png)
# 2. URI和URL
## 2.1 URI
URI(Uniform Resource Identifier)是统一资源标识符,在某个规则下能把这个资源独一无二标示出来，比如人的身份证号

    Uniform 不用根据上下文来识别资源指定的访问方式
    Resource 可以标识的任何东西
    Identifier 表示可标识的对象
## 2.2 URL
统一资源定位符，表示资源的地点，URL时使用浏览器访问WEB页面时需要输入的网页地址

    Uniform 不用根据上下文来识别资源指定的访问方式
    Resource 可以标识的任何东西
    Location 定位
### 2.2.1 URL的格式
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h4.png)
协议类型、
登录信息、
服务器地址、
服务器端口号、
带层次的文件路径、
查询字符串、
片段标识符
# 3. HTTP
    请求的一方叫客户端，响应的一方叫服务器端
    通过请求和响应达成通信
    HTTP是一种不保存状态的协议
## 3.1 请求报文
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h5.png)
请求行方法

    GET 获取资源
    POST 向服务器端发送数据，传输实体主体
    PUT 传输文件
    HEAD 获取报文首部
    DELETE 删除文件
    OPTIONS 询问支持的方法
    TRACE 追踪路径
    协议/版本号
    URL
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h6.png)
   
    
请求头
    通用首部(General Header)
    请求首部(Request Header)
    响应首部(Response Header)
    实体首部(Entity Header Fields)
请求体
## 3.2 响应报文
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h7.png)
响应行、
响应头、
响应体

## 3.3 编码
HTTP可以在传输的过程中通过编码提升传输效率，但是会消耗更多的CPU时间。
### 3.3.1 编码压缩
发送文件时可以先用ZIP压缩功能后再发送文件
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h8.png)
gzip、
compress、
deflate、
identify

### 3.3.2 分割发送的分块传输编码
请求的实体在尚未传输完成前浏览器不能显示。所以在传输大容量数据时，通过把数据分割成多块，能让浏览器逐步显示页面。
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h9.png)
### 3.3.3 多部分对象集合
    一份报文主体中可以包含多类型实体。
    使用boundary字符串来划分多部分对象指明的各类实体。在各个实体起始行之前插入--标记,多部分对象集合最后插入--标记
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h10.png)
#### 3.3.3.1 multiparty/form-data
上传表单时使用multiparty/form-data

![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h11.png)
#### 3.3.3.2 multipart/byteranges 206(Particial Content)
状态码(Partical Content)响应报文中包含多个范围时使用
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h12.png)
### 3.3.4 获取部分内容的范围请求
为了实现中断恢复下载的需求，需要能下载指定下载的实体范围

    请求头中的Range来指定 资源的byte范围
    响应会返回状态码206响应报文 
    对于多重范围的范围请求，响应会在首部字段Content-Type中标明multipart/byteranges
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h13.png)
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h14.png)
# 4. Web服务器
## 4.1 虚拟主机(Virtual Host)
一台HTTP服务器上搭建多个Web站点,客户端发送请求时必须在Host首部完整指定主机名或域名的URL
## 4.2 通信转发程序:代理、网关
### 4.2.1 代理
代理就是客户端和服务器的中间人
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h15.png)
为啥使用代理？

    利用缓存技术减少网络流量
    组织内部针对网站进行访问控制
    获取访问日志
    
代理的分类

    缓存代理 会预先把资源副本保存在服务器上
    透明代理 不对报文进行任何加工
    
## 4.2.2 网关
接收从客户端发送来的数据时，会转发给其他服务器处理，再由自己返回

    使通信线路上的服务器提供非HTTP协议服务
    提高通信安全性
![image](https://github.com/tianyuexian/HTTP-TCP/blob/master/h16.png)
