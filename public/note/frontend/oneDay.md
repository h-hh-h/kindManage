## Vue-渐进式JavaScript框架
    特点：
        1、组件化
        2、声名式编码  <->  命令式编码（JavaScript）：无需直接操作DOM
        3、虚拟DOM + Diff算法，尽量复用DOM节点：数据->虚拟DOM->页面真实DOM  添加新的数据形成新的虚拟DOM节点，使用diff算法对比找出旧的已有的节点进行直接复用