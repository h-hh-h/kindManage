## 选择器
+ 内联 > id > 伪类 > 属性 > 类 > 元素 > 通用
+ 简单选择器（名称、id、类）
+ 组合器选择器（特定关系）
    + 空格——后代选择器
    + `>`：子选择器
    + `+`：相邻兄弟选择器
    + `~`：通用兄弟选择器
+ 伪类选择器（特定状态）
    + 一般选择
        1. `:enabled`：已启用状态
        2. `:checked`：选中状态
        3. `:disabled`：禁用状态
        4. `:empty`：没有子元素的状态
        + `<a>`标签状态——hover必须在link和visited之后，active必须在hover之后
            5. `:active`：活动状态
            6. `:link`：未被访问状态
            7. `:hover`：鼠标悬停状态
            8. `:visited`：已访问状态
        9. `:focus`：获得焦点状态
        10. `:lang(language)`：lang属性值为language（参数）的状态
        11. `:not(selector)`：非selector的元素
        12. `:target`：选择目标url跳转到的元素
        13. `:root`：选择根元素
    + 根据元素父子关系选择
        1. `:first-child`：是其父元素的首个子元素时的状态
        2. `:last-child`：是其父元素的首个子元素时的状态
        3. `:nth-child(n)`：是其父元素的第n子元素时的状态
        4. `:nth-last-child(n)`：是其父元素的倒数第n子元素时的状态
        5. `:first-of-type`：是其父元素这一特定类型中的首个元素的状态
        6. `:last-of-type`：是其父元素这一特定类型中的首个元素的状态
        7. `:nth-of-type(n)`：是其父元素这一特定类型中的第n个元素的状态
        8. `:nth-last-of-child(n)`：是其父元素这一特定类型中的倒数第n个元素的状态
    + 用于表单元素
        1. `:in-range`：input输入值具有指定范围内的状态
            + 仅适用于带有min和max属性的input元素
        2. `:out-of-range`：input输入值超出指定范围的状态
            + 仅适用于带有min和max属性的input元素
        3. `:invalid`：表单元素输入值无效的状态
            + 仅适用于有限制的表单元素
        4. `:invalid`：表单元素输入值有效的状态
            + 仅适用于有限制的表单元素
        5. `:valid`：所有具有有效值的表单元素
            + 仅适用于有限制的表单元素
        6. `:optional`：选择可选（非必填）的表单元素（即不带required属性的表单元素）
+ 伪元素选择器（某元素内部的一部分）
    1. `::after`：元素内的后面插入新内容
        + `content`属性指定要插入的内容
    2. `::before`：元素内的前面插入新内容
        + `content`属性指定要插入的内容
    3. `::first-letter`：首字母
    4. `::first-line`：首行
    5. `::selection`：用户选择的部分（长按鼠标左键选择）
+ 属性选择器（属性或属性值）
    + `元素名[属性]`

## 盒模型
+ 标准盒模型：`height/width = content`
    + 长和宽只定义内容区域，不包含内外边距`padding`和`margin`
+ 怪异盒模型：`height/width = content + margin + padding`
    + 长和宽定义内容区域和内外边距
+ `box-sizing`：元素总宽/高度，包含内边距和边框

## 对齐和居中
+ 文本对齐
    + 水平对齐居中：`text-align`
        + `center/left/right`：水平居中/左/右对齐
        + `justify`：使每一行都具有相等的宽度，且左右边距是直的
    + 垂直对齐居中：`vertical-align`（对多行文本也有效）
        + `top/middle/bottom`：上/垂直居中/下对齐
        + 垂直居中（仅对单行文本有用）
            1. `padding: ... 0;`
            2. `line-height: height;`
                + line-height定义文本行间距
    + 垂直和水平都居中——`padding: ... 0;` + `text-align: center;`
+ 元素对齐
    + 水平对齐居中——`margin: auto;`
            + 元素必须指定宽度`width`，这样才能将两边的空外边距平均分配
    + 左右居中和对齐
        1. `position: absolute;`
            + 绝对定位元素会被从正常流中删除，并且能够交叠元素。
            + 当使用`position`来对齐元素时, 通常`<body>`元素会设置`margin`和`padding`。 这样可以避免在不同的浏览器中出现可见的差异。
        2. `float: ...`
            + 当使用`float`来对齐元素时, 通常`<body>`元素会设置`margin`和`padding`。
            + 如果子元素的高度大于父元素，且子元素设置了浮动，那么子元素将溢出，这时候可以在父元素上添加`overflow: auto;`来解决该问题。
    + 垂直居中
        1. `position: absolute; top: 50%; left: 50%;` + `transform: translate(-50%, -50%);`
            + 先将元素的左上顶点放置在中央，在使用translate向左向上移动自身宽度和高度的一半
        2. `display: flex;` + `justify-content: center;` + `align-items:center;`

## 画三角形
+ 用`border`（宽度设置大一点）包裹一个`div`，然后将`div`宽和高设置为0，最后将不想要的三角形`border-xxx-color`设置为透明`transparent`
    ```
    .trangle1 {
            height: 0px;
            width: 0px;
            border:100px solid #000;
            border-top-color: transparent;
            border-bottom-color: red;
            border-left-color:transparent ;
            border-right-color: transparent;
    }
    ```

## display（布局）
+ 每个元素都有一个默认的display值，大多数元素默认为`block`或`inline`
+ 属性值
    + block——块级元素
        + 总是从新行开始，并占据可用的全部宽度（尽可能向左和向右伸展）
        + `<div>、<h1>-<h6>、<p>、<form>、<header>、<footer>、<section>`
    + inline——行内（内联）元素
        + 从不从新行开始，仅占用所需的宽度
        + `<sapn>、<a>、<img>`
    + none
        + `visibility: hidden;`——仅隐藏，节点仍存在
    + inline-block
        + 区别
            + 与`inline`相比，主要区别在于`inline-block`允许在元素上设置宽度和高度，会保留上下外边距、内边距。
            + 与`block`相比，主要区别在于`inline-block`在元素之后不添加换行符，因此该元素可以位于其他元素旁边。
        + 用法场景：
            + 用于水平而不是垂直的显示列表项
    + flex
+ 元素默认display值可覆盖，设置display值仅更改元素的显示方式，不会更改元素的种类，因此，带有`display: block;`的行内元素不允许在其中包含其他块元素。

## flex布局
+ 要使用时在父元素中设置
+ 属性：
    + `flex-direction`：定义子元素堆叠方向
        + column：从上到下
        + column-reverse：从下到上
        + row：水平从左到右（默认值）
        + row-reverse：从右到左
    + `flex-wrap`：子元素是否换行
        + wrap：换行
        + nowarp：不换行（默认值）
        + wrap-reverse：以相反顺序换行
    + `flex-flow`：同时设置`flex-direction`和`flex-wrap`
    + `justify-content`：子元素水平方向的对齐方式
        + center：以容器中间为准线，左右均匀对称分布
        + flex-start：在容器开头对齐，即左对齐（默认）
        + flex-end：右对齐
        + space-between：物品均匀分布在行中；第一项在起始行，最后一项在结束行
        + space-around：项目均匀分布在行中，周围都会有一个相等大小的空间
            + 视觉上的空间是不相等的，因为所有项目的两边都有相等的空间。第一个项目将在容器边缘有一个空间单位，但下一个项目之间有两个空间单位
        + space-evenly：使得任何两个项目之间的间距（以及边缘的空间）相等。
            + 视觉上是相等的
    + `align-items`：子元素垂直对齐方式
        + center：以容器中间为准线，上下均匀对称分布
        + flex-start：在容器顶部对齐，即上对齐
        + flex-end：下对齐
        + stretch：拉伸子元素来填充容器（默认）
            + 会改变子元素的高度
        + baseline：使子元素基线（位于上下中间的一条线）对齐
    + `align-content`：与`align-items`属性作用类似
        + 区别：`align-items`作用于flex容器中子项目不换行的情况，而`align-content`则是作用于flex容器换行的情况
        + 属性值：
            + space-between：物品均匀分布在列中；第一项在起始列，最后一项在结束列
            + space-around：项目均匀分布在列中，周围都会有一个相等大小的空间
            + stretch：拉伸子元素来填充容器（默认）
            + center：以容器中间为准线，上下均匀对称分布
            + flex-start：在容器顶部对齐，即上对齐
            + flex-end：下对齐
+ 子元素的属性
    + order：规定子元素的序列值，默认值为0
    + flex-grow：某个子元素相对于其他子元素的增长长度，默认值为0（表示不可增长）
        + 容器长度固定，该属性可以指定某一子元素所占容器长度的份额
    + flex-shrink：某个子元素相对于其他子元素的收缩长度，默认值为0（表示不可收缩）
    + flex-basis：规定子元素的初始长度
    + flex：是`flex-grow`、`flex-shrink`、`flex-basis`属性的简写
    + align-self：规定所选子元素的对齐方式
        + 会覆盖容器中`align-items`的属性值
        + 属性值：
            + auto（默认，继承父元素）、stretch、center、flex-start、flex-end、baseline、initial（将此属性设置为其默认值）、inherit（从父元素继承此属性）

## position（位置）
+ 元素其实是使用 top、bottom、left 和 right 属性定位的。但是，除非首先设置了`position`属性，否则这些属性将不起作用。
+ 被定位的元素是其位置除`static`以外的任何元素
+ 属性值：
    + static（默认值）
        + 静态定位的元素不受 top、bottom、left 和 right 属性的影响。
        + 元素不会以任何特殊方式定位；它始终根据页面的正常流进行定位：
    + relative
        + 相对于其正常位置进行定位
    + fixed
        + 相对于视口定位，这意味着即使滚动页面，它也始终位于同一位置。
    + absolute
        + 相对于最近的定位祖先元素进行定位
            + 
            + 如果绝对定位的元素没有祖先，它将使用文档主体（body），并随页面一起滚动
    + sticky
        + 根据用户的滚动位置进行定位
        + 粘性元素根据滚动位置在相对（relative）和固定（fixed）之间切换。起先它会被相对定位，直到在视口中遇到给定的偏移位置为止（随着视口的滚动到达指定位置）。然后将其固定粘贴在这一位置（比如 position:fixed）。
+ z-index

## overflow（溢出）
+ 指定在元素的内容太大而无法放入指定区域时是剪裁内容还是添加滚动条。
+ 属性值：
    + visible
    + hidden
        + 溢出被裁减，不可见
    + scroll
        + 溢出被裁减，并添加滚动条
    + auto
        + 仅在必要时添加滚动条
+ `overflow-x` 和 `overflow-y`

## 浮动 float
+ 定位和格式化内容，常用于图像。使元素向左或向右移动，直到其外边缘碰到包含框或另一个浮动框的边框为止
+ 属性值：
    + left/right/none（默认值）/inherit

+ 清除浮动——`clear`
    + 规定元素的哪些边不应该挨着浮动框
    + 属性值：
        + none/left/right/both：都允许/左侧不允许/右侧不允许/两侧均不允许
        + inherit：继承其父级的clear值
+ 清除浮动的原因：浮动元素会脱离文档流，而原来父级元素是由内容撑开的，此时会导致父级高度为0，从而造成高度塌陷的问题。
    + 方法：
        1. `overflow:hidden`
            + 父级元素使用，但必须设置`width`，否则超出部分会被隐藏
        2. `clear: both`
            + 父级元素结尾处添加空`<div>`，并定义`clear: both;`
        2. 父级确定高度`height`

## opacity（透明度）
+ 取值范围为 0.0~1.0，值越低越透明。

## 绝对单位：px、pt
+ `px`：最小单位是1，即一个像素。
+ `pt`：物理长度单位。

## 相对单位：em、rem、vw/vh、%百分比、vmin/vmax、vm、vh、ex
+ `em`：相对于所在容器的`font-size`属性，若没有`font-szie`属性则会相对于浏览器的默认字体尺寸16px，此时1em=16px
+ `rem`：相对于整个html的`font-size`
+ `vw/vh`：相对于视窗的宽度或高度。`1vw`=视窗宽度的1%，`1vh`=视窗高度的1%。
+ `x%`：相对于父元素
    1. `position: absolute`：相对于已定位的元素
    2. `position: fixed`：相对于可视窗口
+ `vm`：相对于视口的宽度或高度中较小的那个。`1vm`=最小值的1%。

## CSS特异性
+ 如果有两条或两条以上指向同一元素的冲突 CSS 规则，则浏览器将遵循一些原则来确定哪一条是最具体的，并因此胜出。
+ 通用选择器（*）具有较低的特异性，而 ID 选择器具有较高的特异性。
+ 特异性规则：
    1. 在特异性相同的情况下：最新的规则很重要
    2. ID 选择器比属性选择器拥有更高的特异性
    3. 嵌入式样式表更靠近要设置样式的元素
    4. 类选择器会击败任意数量的元素选择器
## 其他
+ 轮廓`outline-_/style/color/width/offset`
    + 绘制在元素边框之外，可能与其他内容重叠，不算在元素总宽度和总高度里面