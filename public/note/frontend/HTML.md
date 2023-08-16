## 元素分类
+ 块状元素
+ 内联（行内）元素——不能自定义宽高
+ 行内块状元素

## 元素宽高
+ clientHeight、scrollHeight、offsetHeight区别  ；
    + clientHeight：元素可见部分高度 + 内边距，不含水平滚动条高度、边框宽度和外边距
    + scrollHeight：元素里内容的高度 + 内边距，内容高度包括溢出的不可见内容
    + offsetHeight：元素可见部分高度 + 内边距 + 边框 + 水平滚动条的高度，且是一个整数。
+ innerHTML、innerText、textContent的区别
    1. innerHTML是HTML文本结构内容，输出结果包含内部嵌套的标签
    2. innerText会获取指定节点及其后代节点的所有文本内容，不包含标签，不会获取到`display:none`的标签文本，不会获取`<script>`和`<style>`中的内容，结果会被格式化（不包含原有的回车等）
        + innerText设置值时，会触发“回流”操作，即从DOM树的根节点再运行一次（再渲染一遍页面）
    3. textContent获取指定节点及其后代节点的文本内容，会获取到`<script>`和`<style>`中的内容，结果不会被格式化（包含原有的回车等内容）
        + textContent设置值时，会触发“重绘”操作，即对一个DOM节点往子节点重新进行排列，重绘只影响页面的一部分。
            + 重绘不一定引起回流，回流一定会引起重绘
    + nodeValue也可以用来获取文本标签的文本内容
        + nodeValue对于文本节点，包含文本内容；对于属性节点，包含属性值
        + nodeName
            + 元素节点：标签名称
            + 属性节点（元素节点的属性）：属性名称
            + 文本节点：#text
            + 文档节点：#document
        + nodeType
            + 元素element：1
            + 属性attr：2
            + 文本text：3
            + 注释comments：8
            + 文档document：9
## h5跨文档消息传输
+ h5提供了网页文档之间发送消息和相互接收的功能。
+ 可以实现同域内web页面之间的相互的通信（相互传递字符串和对象），也可以实现跨域。
+ 需要获取到页面所在窗口对象的实例。

