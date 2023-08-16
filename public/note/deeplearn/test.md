## 5层架构
1. 应用层（应用层 + 表示层 + 会话层）
    + 确定进程之间通信的性质以满足用户的需要。（相当于确定格式）
    + TELNET、FTP、SMTP、HTTP协议等
2. 运输层
    + 负责主机中两个进程之间的通信。
    + TCP、UDP协议等
3. 网络层
    + 负责为分组交换网上的不同主机提供通信。
    + IP协议
4. 数据链路层
    + 提供无差错帧传送。
    + ARP、NAT、DNS协议等
5. 物理层 
    + 透明的经实际电路传送比特流。

## IP协议
+ IP协议是TCP/IP协议的动力，它为上层协议提供无状态，无连接，不可靠的服务。
+ ipv4头部结构
<!-- ![ipv4头部结构](../img/ipv4%E5%A4%B4%E9%83%A8%E7%BB%93%E6%9E%84.png) -->
+ IP分片
    + 当IP数据报的长度超过帧的MtU时，它将被分片传输。
    + 分片可能发生在发送端，也可能发生在中转路由器上，而且可能在传输过程中被多次分片，但只有在最终的目标机器上，这些分片才会被内核中的IP模块重新组装。
+ IP转发
    + 不是发送给本机的IP数据报将由数据报转发子模块来处理。路由器都能执行数据报的转发操作，而主机一般只发送和接收数据报，这是因为主机上/proc/sys/ne/ipv4/ip_forward内核参数默认被设置为0。我们可以通过修改它来使能主机的数据报转发功能

## TCP协议
+ 用于应用程序之间的通信。
+ TCP三次握手（建立连接）：
    <!-- ![TCP三次握手](../img/%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.png) -->
    1. 第一次握手：Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。
    2. 第二次握手：Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。
    3. 第三次握手：Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了。
    + 第二次握手结束后，TCP连接称为半连接
+ TCP四次挥手（断开连接）：
    <!-- ![TCP四次挥手](../img/%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.png) -->
    + 原则：
        + 由于TCP连接时全双工的，因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接，收到一个FIN只是意味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到这一方向也发送了FIN。首先进行关闭的一方将执行主动关闭，而另一方则执行被动关闭。
    + 过程：
        1. 第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。
        2. 第二次挥手：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。
        3. 第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。
        4. 第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。
+ 为什么建立连接是三次握手，而关闭连接却是四次挥手
    + 这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。
+ 为什么TIME_WAIT状态需要经过2MSL(最大报文段生存时间)才能返回到CLOSE状态
    1. 保证TCP协议的全双工连接能够可靠关闭
    2. 保证这次连接的重复数据段从网络中消失
+ TCP编程
    + 服务器端
        1. 创建socket
        2. 设置socket属性
        3. 绑定IP地址、端口等信息
        4. 开启监听
        5. 接收客户端的连接
        6. 收发数据
        7. 关闭连接
        8. 关闭监听
    + 客户端
        1. 创建socket
        2. 设置socket属性
        3. 绑定IP地址、端口等信息
        4. 设置要连接的IP地址、端口等信息
        5. 连接服务器
        6. 收发数据
        7. 关闭网络连接

## UDP协议
+ UDP是传输层的协议，功能即为在IP的数据报服务之上增加了最基本的服务：复用和分用以及差错检测。
+ 特点：提供不可靠服务
    + 无连接
        + 无需建立连接就可以发送IP数据包
    + 没有拥塞控制
        + 适用于能容忍一些数据的丢失，但是不能允许有较大的时延的场景
    + 提供尽最大努力的交付，不保证可靠交付
        + 所有维护传输可靠性的工作需要用户在应用层来完成。没有TCP的确认机制、重传机制。如果因为网络原因没有传送到对端，UDP也不会给应用层返回错误信息
    + 是面向报文的，对应用层交下来的报文，添加首部后直接乡下交付为IP层，既不合并，也不拆分，保留这些报文的边界。
        + 正是因为这样，UDP显得不够灵活，不能控制读写数据的次数和数量。
    + 常用一次性传输比较少量数据的网络应用，如DNS,SNMP等
+ UDP编程
    <!-- ![UDP过程](../img/UDP%E8%BF%87%E7%A8%8B.png) -->
    + 服务器端
        1. 创建socket
        2. 设置socket属性
        3. 绑定IP地址、端口等信息
        4. 循环接收数据
        5. 关闭
    + 客户端
        1. 创建socket
        2. 设置socket属性
        3. 绑定IP地址、端口等信息
        4. 设置要连接的IP地址、端口等信息
        5. 发送数据
        6. 关闭

## TCP和UDP的区别
1. TCP面向连接；而UDP是无连接的。
2. TCP提供可靠的服务；UDP尽最大努力交付，即不保证可靠交付。
3. TCP面向字节流，实际上是TCP把数据看成一连串无结构的字节流；UDP是面向报文的。
4. TCP有拥塞控制，UDP没有拥塞控制。
5. 每一条TCP连接只能是点到点的;UDP支持一对一，一对多，多对一和多对多的交互通信。
6. TCP首部开销20字节;UDP的首部开销小，只有8个字节
7. TCP的逻辑通信信道是全双工的可靠信道，UDP则是全双工的不可靠信道
## HTTP协议：
+ 无连接，无状态
    + 无连接：限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。
    + 无状态：指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。
+ HTTP协议组成
    <!-- ![HTTP协议组成](../img/http%E5%8D%8F%E8%AE%AE%E7%BB%84%E6%88%90.png) -->
    + 请求
        + 请求行
            + GET/POST + URL字段 + HTTP协议版本
        + 请求头
            + 通知服务器有关于客户端请求的信息，典型的请求头有：
                1. User-Agent：产生请求的浏览器类型。
                2. Accept：客户端可识别的内容类型列表。
                3. Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机。
                4. Content-Type：请求体的MIME类型，MIME类型：描述消息内容类型的因特网标准，常见的有application/json、image/jpeg、application/octet-stream等
        + 请求体（正文）
            + 请求正文向服务器提交的请求数据
                + GET请求的参数一般是放在请求行后的键值对（URL中）
                + post请求的参数类型多样（表单、json、xml、图片等）
    + 响应
        + 响应行
            + 响应状态码 + 响应信息 + HTTP协议版本字段
                ```
                1xx：用于指定客户端应相应的某些动作
                2xx：用于表示请求成功
                3xx：用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息（304：指缓冲的版本已经被更新并且客户端应刷新文档）
                4xx：用于指出客户端的错误
                5xx：用于指出服务器的错误
                ```
        + 响应头
            + 描述服务器的基本信息，以及数据的描述，服务器通过这些数据的描述信息，可以通知客户端如何处理等一会儿它回送的数据。
            + 常见的响应头有：
                1. Content-Length：表示内容长度
                2. Content- Type：表示后面的文档属于什么MIME类型
                3. Server：服务器通过这个头告诉浏览器服务器的类型
        + 响应体（正文）
            + 响应的消息体，如果是纯数据就是返回纯数据，如果请求的是HTML页面，那么返回的就是HTML代码，如果是图片就是图片等
+ http存在的问题：
    + 无状态、无连接、需要客服端主动发送请求
    + 解决办法：
        1. 长轮询（long poll）——解决了http不能实时更新的弊端，因为这个时间很短，发起请求即处理请求返回响应，实现了“伪·长连接”
            + 客户端发起长轮询，如果服务端的数据没有发生变更，会 hold 住请求，直到服务端的数据发生变化，或者等待一定时间超时才会返回。返回后，客户端又会立即再次发起下一次长轮询
        2. Ajax轮询——解决了http不能实时更新的弊端
            + 规定每隔一段时间就由客户端发起一次请求，查询有没有新消息，如果有，就返回，如果没有等待相同的时间间隔再次询问
        + 依然存在的问题：
            1. 推送延迟
            2. 服务器端压力
        + 改进：WebSocket协议

## WebSocket协议
+ 一种在单个TCP连接上进行的全双工通讯的协议。只需要握手一次，就可以建立持久性的连接。
    + 全双工：可以同时（瞬时）进行信号的双向传输。
    + 半双工：一个时间内只有一个方向上的信号传输。
+ 原理：
    + 约定了一个通信的规范，通过一个握手的机制，客户端和服务器之间能建立一个类似TCP的连接
+ 在WebSocket以前，web交互一般是基于http协议的短连接或者长连接。WebSocket是一个全新的协议，不属于http无状态协议
+ 与http的异同：
    + 相同点：
        1. 都是基于tcp的可靠性传输协议
        2. 都是应用层协议
    + 不同点：
        1. ws是双向的，http是单向的
        2. ws需要浏览器和服务器握手进行建立连接的；而http是浏览器发起向服务器的连接，服务器预先并不知道这个连接。
        3. ws在建立握手时，数据通过http传输，当建立之后，真正传输数据不需要http协议
+ 过程：
    1. 客服端发起http请求，经过3次握手后建立起tcp连接。http请求中存放ws支持的版本号等信息，如：upgrade、connection、WebSocket-Version等
    2. 服务器收到客户端的握手请求后，同样采用http协议返回数据
    3. 客户端收到连接成功的消息，开始借助于tcp传输信道进行全双工通信。
+ 特点：
    + 是真正的全双工方式，建立连接后客户端与服务器端是完全平等的，可以互相主动请求。而HTTP长连接基于HTTP，是传统的客户端对服务器发起请求的模式。
    + HTTP长连接中，每次数据交换除了真正的数据部分外，服务器和客户端还要大量交换HTTP header，信息交换效率很低。Websocket协议通过第一个request建立了TCP连接之后，之后交换的数据都不需要发送 HTTP header就能交换数据，这显然和原有的HTTP协议有区别所以它需要对服务器和客户端都进行升级才能实现（主流浏览器都已支持HTML5）

## HTTP和HTTPS
+ HTTP：
    + HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写。HTTP 协议和 TCP/IP 协议族内的其他众多的协议相同， 用于客户端和服务器之间的通信。
+ HTTPS：
    + HTTPS是身披SSL外壳的HTTP。HTTPS是一种通过计算机网络进行安全通信的传输协议，经由HTTP进行通信，利用SSL/TLS建立全信道，加密数据包。
    + 使用HTTPS的主要目的：
        + 提供对网站服务器的身份认证，同时保护交换数据的隐私与完整性。
+ 区别：
    1. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
    2. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
    3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
    4. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

## HTTP2
### 多路复用
+ 代替原来的序列和阻塞机制，请求都是通过一个TCP连接并发完成，同时很好的解决了同一域名下的请求数量的问题。