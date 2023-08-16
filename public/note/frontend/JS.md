[TOC]
# JavaScript
## JavaScript是一个单线程语言
## 变量：
### var：（不使用）
1. 函数作用域，函数退出时销毁
2. 函数内部定义变量时省略var，可创建一个全局变量
3. 声明提升，先使用后声明不会报错
    + 仅提升声明，例如`var a = 1;`，被提升的只是`var a`声明，赋值`a=1`不会被提升
4. 允许冗余声明
5. for中的迭代变量会渗透到外部
### let：（次之）
1. 块作用域，是函数作用域的子集
2. 不允许一个块作用域中出现冗余声明，但嵌套使用的标识符不会报错
3. 不会被提升，“暂时性死区”
4. 与var不同，let在全局作用域中声明的变量不会成为Window对象的属性，但该变量依然会在页面生命周期内存续，导致变量冗余
    例：`let age=25; console.log(window.age); //undefine`
5. 变量仅限于for循环内部
### const：（优先）
1. 与let相似
2. 声明变量时必须初始化
3. 变量不能修改
4. const声明的限制只适用于它指向的变量的引用。换句话说，如果const变量引用的是一个对象，那么修改这个对象内部的属性并不违反const的限制。
5. 只想用const声明一个不会被修改的for循环变量，那也是可以的。也就是说，每次迭代只是创建一个新变量，并不是修改原变量的值。这对`for-of`和`for-in`循环特别有意义


## 数据类型：
### 6个简单数据类型：
1. Undefined：
    + 只有一个值，特殊值undefined。 变量声明但未初始化时为该值（包含undefined值的变量不等于未定义变量，但两者使用typeof时均返回undefined）
2. Null：
    + 只有一个值，null，逻辑上表示一个空对象指针。null与undefined表面上是相等的
    + 在内存里的表示就是，栈中的变量没有指向堆中的内存对象
    + null 会被`typeof`误判断为 Object 类型。
3. Boolean：
    + 所有其他ECMAScript类型的值都有相应布尔值的等价形式。要将一个其他类型的值转换为布尔值，可以调用特定的Boolean()转型函数
    布尔值与整数比较时，true转换为1，false转换为0
    + |数据类型|结果为true|结果为false|
        |:------|:--------:|---------:|
        |boolean|true|false|
        |String|非空字符串|空字符串|
        |Number|非零数字|0和NaN|
        |Object|任何对象|null|
        |Undefined| |undefined|
    + JavaScript里面的六种假值：false、0、''''、undefined、null、NaN
4. Number：
    1. 进制
        1）十进制，直接写。
        2）八进制字面量，第一个数字必须是零（0/0o），然后是相应的八进制数字（数值0\~7）。无效值会当做十进制处理。
        3）十六进制字面量，必须让真正的数值前缀0x（区分大小写），然后是十六进制数字（0\~9以及A\~F）。十六进制数字中的字母大小写均可。
        4）使用八进制和十六进制格式创建的数值在所有数学操作中都被视为十进制数值。
    2. 浮点值
        1）要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字。
        2）永远不要测试某个特定的浮点值。
    3. Nan
        1）意思是“不是数值”（Not a Number），用于表示本来要返回数值的操作失败了（而不是抛出错误）。
        2）任何涉及NaN的操作始终返回NaN（如NaN/10）
        3）NaN不等于包括NaN在内的任何值。为此，ECMAScript提供了isNaN()函数。该函数接收一个参数，可以是任意数据类型，然后判断这个参数是否“不是数值”。
    4. 数值转换
        3个函数：
            Number()：转型函数，可用于任何数据类型。

            parseInt()、parseFloat()主要用于将字符串转换为数值。

            parseInt()：更专注于字符串是否包含数值模式。字符串最前面的空格会被忽略，从第一个非空格字符开始转换。如果第一个字符不是数值字符、加号或减号，parseInt()立即返回NaN。
            
            parseFloat()：只解析十进制值
    5. 取整：
        1. `~~number`
        2. `number^0`
        3. `number<<0`
5. String：
    1. 字符串可以使用双引号（"）、单引号（'）或反引号（`）标示
    2. 底层原理上，字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。
    3. 转换为字符串：
        + `toString()`：可见于数值、布尔值、对象和字符串值。null和undefined值没有toString()方法。
        + `String()`：始终会返回表示相应类型值的字符串。不确定一个值是不是null或undefined，可以使用。
    4. 模板字面量：
        保留换行字符，可以跨行定义字符串
6. Symbol：
    1. 符号是原始值，且符号实例是唯一、不可变的。符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。
    2. 符号需要使用Symbol()函数初始化。
    3. 调用Symbol()函数时，也可以传入一个字符串参数作为对符号的描述（description），将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关
+ 规定null = undefined
### 1个复杂数据类型：
+ Object-无序 名值对的集合
### typeof操作符（无需参数，但也可以使用参数）：
+ `undefined`：值未定义
+ `boolean`：布尔值
+ `number`：数值
+ `string`：字符串
+ `symbol`：符号
+ `object`：对象
+ `function`：函数
+ `typeof null //结果为object`，因为null被认为是一个对空对象的引用

## Object：
### 分类：
1. 内建对象
2. 宿主对象
3. 自定义对象
### 特性：
1. Object是引用数据类型，先定义的对象变量的改变会引起后定义对象变量的改变，后的改变则不会影响先的。（对象保存在堆内存中。变量保存对象的内存地址，存储在栈内存中。）
2. 对象进行比较时，比较的是对象的内存地址。
3. 当在页面中直接打印一个对象时，事实上输出的是对象的toString()方法的返回值。`[Object,Object]`实际上是Object的原型的toString()返回值
    ```
    构造函数.prototype.toString() = function(){
        return "构造函数[属性名=" + this.name + "]";
    }
    //自定义返回内容
    ```
### 创建：
1. var obj = new Object();
2. 对象字面量来创建一个对象：
    var obj = {};
    //属性值可以加双引号，也可以不加
3. 使用工厂模式大批量创建对象：
    ```
    function createPerson(name, age, gender){
        var obj = new Object();
        obj.name = name;
        obj.age = age;
        obj.gender = gender;
        obj.sayName = function(){
            ...
        };
        return obj;
    }
    //使用工厂模式创建的对象，使用构造函数都是Object，会导致无法区分出多种不同类型的对象。为解决该问题，使用构造函数创建对象。
    ```
4. 构造函数创建对象（首字母大写，调用时加上 new 关键字）：
    ```
    function Person(属性值){
        this.属性名 = 属性值;
    }

    var per = new Person();
    //构造函数的执行流程：1、立即创建一个新的对象；2、将新建的对象设置为函数中的this，在构造函数中可以使用this来引用创建新的对象；3、运行构造函数；4、将新建的对象作为返回值返回。
    //使用一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类，将通过构造函数创建的对象，称为是该类的实例。
    ```
5. 原型对象 <=> 构造函数：
    1. 每创建一个新对象，解析器都会向函数中添加一个属性`prototype`，这个属性指向另外一个对象，该对象就是所谓的原型对象。
        + 构造函数的原型对象中有一个`constructor`属性，指向构造函数本身
    2. 函数作为普通函数调用时，prototype无意义。
    3. 作为构造函数调用时，其所创建的对象中都会有一个隐含的`__proto__`属性指向该构造函数的原型对象，可以通过`__proto__`来访问prototype属性。
    4. 原型对象相当于一个公共区域，所有同一个类的实例都可以访问。因此可以将所有实例的共有内容添加到原型对象中。
        + 当一个构造函数所指的原型对象发生变化时，之前定义的实例所指的原型对象不变，之后定义的实例所指的原型对象改变。
        + 对象找属性时，既在自身中找，又在原型对象中找，还在原型的原型中找。直到找到Object的原型（`toString()`等方法就在Object的原型中）
    6. 原型对象中也有原型（原型链）
    7. 向原型中添加属性和方法
        + `构造函数名.prototype.属性名 = 属性值；`
        + `构造函数名.prototype.属性名 = function(){};`
### 添加属性值：
1. `obj.name = ""; `
2. `对象["属性名"] = 属性值;`
    + 属性值可以为任何类型、对象甚至于函数。其中一个对象中的函数称为对象的方法。
### 删除属性值：
`delete obj.name;`
### 检查对象中是否含有指定属性：
1. 属性名 in 对象名 —— 若自身没有原型中有，也会返回TRUE
2. 使用对象的hasOwnProperty()检查对象自身是否含有
    ```
    对象名.hasOwnProperty("属性名");
    //hasOwnProperty在原型的原型中
    ```
### 枚举对象中属性：
    `for(var 变量 in 对象)`
### 实例对象与函数对象：
+ 实例对象：new函数产生的对象，称为实例对象，简称为对象。
    ```
    let p = new 构造函数
    //这里的p的就是实例对象
    ```
+ 函数对象：将函数作为对象使用时，简称为函数对象。
    ```
    构造函数名.方法
    //这里的构造函数就是函数对象
    ```
### `Object.create(proto)`：
+ 创建一个新对象，将proto参数传递的现有对象作为新对象的prototype
+ 可以用来实现继承


## 函数：
### JS中的所有函数`function`都是`Function()`的实例对象，即`Function()`是所有`function`的构造函数
### 立即执行函数-IIFE：
```
(function(){
})(参数);
//函数对象()
```
### 函数方法：
+ call()和apply()
    1. 都是函数对象的方法，需要通过函数对象来调用
    2. 可以将一个对象指定为第一个参数，此时该对象会成为函数this指向的对象
    3. 区别：
        ```
        call(obj, 实参, 实参, ...)
        //可以将实参在对象后依次传递
        
        apply(obj, [实参, 实参, ...])
        //需要将实参封装到一个数组中统一传递
        ```
### arguments：
1. 每次调用函数时，浏览器向函数内部传递进的一个隐含参数，是封装实参的对象
2. 是一个类数组对象，也可以通过索引来操作数据，也可以获取长度
3. 即使不定义形参，也可以通过arguments来使用实参
4. callee属性：
    该属性对应一个函数对象，是当前正在指向的函数的对象
### 箭头函数：
+ 语法：`() => {}`
1. 不绑定this，会捕获其所在上下文的this作为自己的this。即若箭头函数的外层有普通函数，则箭头函数的this就是该普通函数的this，若没有普通函数，则箭头函数的this是全局变量
2. 是匿名函数，不能作为构造函数，不能使用new
3. 不绑定arguments，取而代之用rest参数解决，同事没有super和new.target
4. 使用call、apply、bind不能改变其this指向
5. 没有原型对象prototype这个属性
6. 不能使用yield关键字，不能作为Generator函数
7. 不加{}时默认return语句

## this：
### 浏览器在调用函数每次都会向函数内部传递进的一个隐含参数
### 指向一个对象，称为函数执行的上下文对象
### 函数的调用方法不同，this指向也不同
1. 以函数调用，this指向window
2. 以方法调用，this指向调用方法的对象
3. 使用call和apply调用时，this指向指定对象

## 垃圾回收机制：
### 垃圾：当一个对象没有任何变量或属性对其进行引用，此时无法操作该对象。
### JS拥有自动的垃圾回收机制，所以只需将不再使用的对象设置为null。

## 数组-Array：
### 也是一个对象
### 创建：
```
var arr = new Array(值, 值);
var arr = [值, 值];
```
### 添加：
`数组[索引] = 值;`
### 数组长度：
`数组.length`
### 对象方法：
1. `push()`：向数组末尾添加新元素，返回值为数组长度
2. `pop()`：删除末尾元素，返回值为被删除元素
3. `unshift()`：向数组开头添加新元素，添加后其他元素索引+n，返回值为数组长度
4. `shift()`：删除开头元素，返回值为被删除元素
5. `indexOf()`：判断参数传递的数据是否在使用方法的数组中，当不存在时返回-1，当存在时返回下标
6. `includes()`：判断数组是否包含参数
7. `from()`：将一个类数组对象或者可遍历对象转换成一个真正的数组
### 数组遍历：
+ `for(var i = 0, i<arr.length, i++){}`
+ `forEach( function(){} )`：
    1. 用来遍历数组，支持IE8以上
    2. 需要一个函数做参数,该函数是回调函数，只管创建，调用由浏览器完成，该函数的 this 指向 window
    3. 数组中的元素个数 = 回调函数执行次数，每次执行时，以实参的形式来传递
    4. 其中匿名函数有3个参数：
        1. 当前正在遍历的元素
        2. 当前正在遍历的元素索引
        3. 正在遍历的数组
        ```
        数组.forEach(function(item, index, obj){
            ...
        })
        ```
    5. 不能用return终止循环但可以跳过当前循环。终止循环要使用`try{}catch{}`包裹循环，然后通过`throw new Error();`来终止循环。
    6. return后不能有返回值，否则结果是undefined。即foreach的所有返回值都是undefined。
    7. 但可以通过回调函数来修改原数组的元素
+ `map()`
    1. 用来遍历数组
    2. 需要一个匿名函数做参数，该函数的 this 指向 window
    3. 数组中的元素个数 = 回调函数执行次数，每次执行时，以实参的形式来传递
    4. 其中匿名函数有3个参数：
        1. 当前正在遍历的元素
        2. 当前正在遍历的元素索引
        3. 正在遍历的数组
        ```
        数组.map(function(item, index, obj){
            ...
        })
        ```
    5. 会分配内存空间给新数组，有返回值，返回值是新数组
+ `reduce()`
    1. 数组遍历
    2. 参数有两个：
        + 第一个为回调函数（两个必要参数，两个可选参数）
            1. `pre`：
                + 上一次回调返回的值 或是 提供的初始值
                    + 初始值`initialValue`为数字是，使用该数字，不是数字时表示上一次回调的返回值
            2. `current`
                + 数组当前被处理的元素
            3. `index`
                + 当前被处理元素的索引值
            4. `array`
                + 整个数组
        + 第二个为初始值`initialValue`，表示遍历开始的位置
    + 实例：
        ```
        //pre初始指定为了0，表示从数组第0个元素开始遍历。current是上一次调用reduce的返回值
        return this.todos.reduce((pre, current) =>  pre + (current.done ? 1: 0), 0)
        ```
+ `filter()`
    1. 数组过滤
    2. 遍历数组元素，参数为一个回调函数，回调函数的参数为当前数组元素，当回调函数返回值为真时保留当前数组元素，为假时过滤掉当前数组元素。
### 数组分割：
1. `slice()`：
    1. 从数组中返回选定元素
    2. 不会改变原数组，结果成为一个新数组返回
    3. 参数：
        + `(截取开始位置, 结束位置)`
        + 不包括结束位置元素
        + 结束位置参数可省略
        + 参数可为负数，表示倒数第n个元素
2. `splice()`：
    1. 删除数组中的指定元素，也可以用来改变指定位置元素值
    2. 会改变原数组，返回值为被删除的元素
    3. 参数：
        `(开始位置索引, 删除的数量, 替换元素值, 替换元素值, ...)`
### 数组去重：
+ 使用`Set`
    + `Array.from(new Set(arr))`
        + 简化：`[...new Set(arr)]`
    + 但无法去掉`{}`空对象
+ 双层for循环，配合splice
    + 外层循环遍历元素，内层循环比较值，值相同时使用splice()删去该值
    + `NaN`、`{}`没有去重
+ 使用`indexOf()`
    + 先新建一个数组，通过`新数组.indexOf(原数组的每个元素)`将不同的数据元素放入新数组中
    + `NaN`、`{}`没有去重
+ 使用`sort()`
    + 先排序，然后对比相邻元素去重
    + `NaN`、`{}`没有去重
+ 使用`includes()`
    + 与`indexOf()`用法类似
    + `{}`没有去重
+ 使用`hasOwnProperty()`
    + `hasOwnProperty()`判断是否存在对象属性
    +  先定义一个空对象，`obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)`
+ 使用`reduce` + `includes()`
    + `arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[])`
+ 使用 Map 数据结构：
    + 创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重后的结果。
### 其他方法：
1. `concat()`：
    1. 连接数组，返回新数组
    2. 不改变原数组
    3. 参数也可为元素值
2. `join()`：
    1. 将数组转换为字符串，返回字符串
    2. 不改变原数组
    3. 参数可以指定一个字符串，将作为连接符使用，连接符默认为,
3. `reverse()`：
    1. 反转数组
    2. 直接修改原数组
4. `sort()`：
    1. 数组排序
    2. 会改变原数组
    3. 默认按照Unicode编码进行排序，所以对数字数组排序时会出错
    4. 可以添加回调函数，来指定排序规则。
        1. 浏览器将数组元素作为实参来调用回调函数，当回调函数形参个数小于实参个数时，实参调用情况不确定，但相互之间的顺序一定遵循数组中的顺序
        2. 浏览器根据回调函数的返回值来决定元素的顺序
            + 返回值大于0，元素交换
            + 返回值小于0，元素不交换
            + 返回值等于0，认为元素相等不交换
5. `fill(value, start, end)`
    + 使用固定值替换数组元素
### 类数组：
+ 一个拥有length属性，并且其他属性为非负整数的普通对象，类数组不能直接调用数组方法。
+ 区别：
    + 数组是一个特殊对象，类数组是一个简单对象，两者的原型关系不同
+ 转换：
    1. `Array.from(...)`
    2. `Array.prototype.slice.call(...)`
    3. `Array.prototype.forEach(...)`
    + 转换后的数组长度由length属性决定。索引不连续时转换结果是连续的，会自动补位。

## Date对象：
### 创建：
```
var d = new Date();
//封装当前代码执行的时间

var d = new Date("12/03/2016 12:32:00");
//指定的时间，将一个字符串作为参数传递给构造函数
```
### 方法：
+ getDate()
    + 获取当前对象是一个月中的第几天
+ getDay()
    + 获取当前对象是一个周中的星期几，返回0-6的数字，0表示周日，1表示周一
+ getMonth()
    + 获取月份，返回0-11的数字，0表示一月
+ getFullYear()
    + 获取年份
+ getTime()
    + 获取当前日期对象的时间戳
        + 时间戳：从格林威治标准时间的1970年1月1日0时0分0秒到当前日期所花费的毫秒数（1秒 = 1000毫秒）
    + `time = Date.now()`
        + 获取当前时间戳，可用来测试代码执行的性能

## Math：
1. 不是一个构造函数，属于工具类，封装了数学运算相关的属性和方法
2. 属性为圆周率`pi`等常量

## 包装类：
1. JS提供三个包装类，通过三个包装类可以将基本数据类型的数据装换为对象
2. String() Number() Boolean()
    ```
    var str = new String("数据内容");
    //数据内容相当于属性名
    
    //基本不用，浏览器自己用。当对一些基本数据类型调用属性和方法时（原理上是错误的），浏览器会使用包装类将其临时转换为对象
    ```
3. 问题：
    ```
    s = s.toString();
    s.hello = "121";
    console.log(s.hello);
    //结果为undefined，因为两次创建的不是同一个对象

    //故基本数据类型也可以调用相关的属性和方法
    ```

## 字符串：
1. 底层字符串是以字符数组的形式保存的，所以可以用数组的属性和方法
2. 属性和方法：
    + length：字符串长度
    + charAt()：返回字符串中指定位置字符，可以用[]代替
    + charCodeAt()：返回指定位置的Unicode编码
    + formCharCode()：根据字符编码获取字符，与上述不同的是，需要通过字符串构造函数对象来调用 String.formCharCode
    + concat()：连接两个或多个字符串，作用和+相同
    + indexOf()：检索字符串中是否含有指定内容。若存在，返回值为字符第一次出现的索引。
        + 可以指定第二个参数，指定开始查找的位置
    + lastIndexOf()：用法与indexOf()相似，区别是该方法从后往前查找，第二个参数为负数
    + slice()：截取指定的内容，不会影响原字符串
        + 参数：
            1. 开始位置（可为负数，包括该位置）
            2. 结束位置（可省略，可为负数，包括该位置）
    + subString()：截取指定内容，与slice()类似
        + 参数:
            1. 开始位置（不可为负数默认转换为0，包括开始位置）
            2. 结束位置（不可为负数默认转换为0，包括开始位置）
        + 会自动调整参数位置，保持第一个大第二个小
    + subStr()：与上述类似
        + 参数：
            1. 开始位置（包括）
            2. 截取长度
    + split()：讲一个字符串拆分为一个数组
        + 参数：
            + 一个字符，指定拆分时所依据的间隔符,间隔符不出现。若为空串，则会将每个字符都拆分成数组的一个元素
    + toUpperCase()：装换为答谢并返回，不影响原字符串
    + toLowerCase()：转换为小写

## 正则表达式：
1. 定义一些字符串的规则，计算机根据此来检查字符串和提取有效内容
2. 是一个对象
3. 可以为一个正则表达式指定多个匹配模式，无前后顺序
+ 创建：
    ```
    var reg = new RegExp("正则表达式", "匹配模式");

    var 变量 = /正则表达式/匹配模式
    //字面量创建
    ```
+ 方法：
    + test(字符串)：检查字符串是否有内容符合正则表达式的规则，符合返回true

+ 正则式语法：
    + 常用表达：
        + `"a"`：检查是否含有"a"，严格区分大小写
        + `|`：表示或
        + `[内容]`：也表示或的关系
        + `a-z`：所有小写字母
        + `A-Z`：所有大写字母
        + `0-9`：所有数字
        + `a[bde]c`：以a开头c结尾，中间时b或d或e
        + `[^内容]`：除了
        + `.`：表示任意字符
        + `\`：转义字符，在字符串中使用无效，字符串中需要使用\\
        + `\w`：任意字符、数字、_
        + `\W`：除了字符、数字、_
        + `\d`：0-9
        + `\D`：除了0-9
        + `\s`：空格
        + `\S`：除了空格
        + `\b`：单词边界
        + `\B`：除了单词边界
    
    + 量词：设置一个内容出现的次数。只对前边一个内容起作用
        + `{n}`：正好出现n次
        + `(ab){n}`：ab出现3次
        + `{m,n}`：出现m到n次
        + `{m,}`：出现m次以上
        + `+`：出现至少1个
        + `*`：0个或多个，相当于{0,}
        + `?`：0个或1个
        + `^`：不在[]中表示开头
        + `$`：表示结尾
        + `^a$`：a既是开头也是结尾，所以只能是单个a
        + `^a|a$`：以a开头或者a结尾


+ 匹配模式：
    + `i`：忽略大小写
    + `g`：全局匹配模式

+ 字符串中支持正则式的方法：
    + split()：即使不指定全局匹配，也会进行全局匹配 
    + search()：搜索字符串中是否有指定内容。搜到返回第一次出现的索引；没有出现，返回-1。
        + 只会查找第一个，设置全局也没用。
    + match()：提取字符串内容。默认情况找到就停止，可指定为全局匹配模式。
        + 返回值为封装到数组中的匹配内容
    + replace()：替换为新的内容，默认只替换第一个
        + 参数：
            1. 指定被替换内容
            2. 新的内容
    + test()：检测一个字符串是否匹配某个模式
## === 与 == 的区别
+ `==`表示相同，`===`表示严格相同
+ `==`：
    + 先检查两个操作数的数据类型
        + 如果相同，转为`===`比较
        + 如果不同，转换为相同类型后再进行比较
            + 类型不同时也相等：
                1. null = undefined
                2. 内容相同的字符串 = 数字
    + 更喜欢将两边转为数字进行比较
+ `===`：
    + 数据类型不同时就返回false
    + 为数字时：
        + 有一方是`Nan`，就会返回false
        + null != undefined

## instanceOf
+ 判断一个实例是否属于某种类型
+ 原理：
    + 借助原型对象实现判断
        + 若左变量的原型链中有右变量的`prototype`，就返回true

## 内存泄漏：
1. 意外的全局变量
2. 闭包
3. 未被清空的定时器
4. 未被销毁的事件监听
5. DOM引用

## DOM：document object model文档对象模型
+ 节点：Node，HTML最基本的单元
    + 分类：
        + 文档节点
        + 元素节点
        + 属性节点
        + 文本节点：
+ 事件：用户与浏览器之间的交互行为。JS与HTML之间的交互通过事件实现。
    + 脚本写在head中时，写在onload的回调函数中
    window.onload = function(){};

+ 查询：
    + 获取元素节点的子节点：
        + getElementsByTagName()
        + childNodes：属性，当前节点的所有子节点。
            + 会获取包括文本节点在内的所有节点，标签间的空白也会被当作文本节点。但在IE8及以下不会将空白当作文本节点。
        + firstChild：属性，当前节点的第一个子节点
        + lastChild：属性，当前节点的第一个子节点
        + children：属性，获取所有子元素
        + firstElementChild：属性，获取当前元素的第一个子元素
    + 获取元素节点的父节点和兄弟节点：
        + parentNode：属性，当前节点的父节点。
        + previousSibling：属性，当前节点的前一个兄弟节点
        + nextSibling：属性，当前节点的后一个兄弟子节点

    + document.querySelector()
        + 返回唯一一个元素，若满足的元素有多个，只返回第一个
    + document.querySelectorAll()
        + 将符合条件的元素封装到一个数组中返回
+ 增加：
    + appenChild()：将新的子节点添加到指定节点
    + inserBefore()：将新的子节点添加到指定节点之前
    + creatAttribute()：创建属性节点
    + creatElement()：创建元素节点。标签名作为参数，返回创建好的节点对象。
    + creatTextNode()：创建文本节点。文本内容作为参数，返回创建好的节点对象。
+ 删除：
    + removeChild()
+ 修改：
    + replaceChild()：替换子节点
+ 其他：
    + getAttribute()：获取指定属性值
    + setAttribute()：设置指定属性值

## BOM：浏览器对象模型
+ 可以通过JS操作浏览器
+ 提供了一组对象，用来完成对浏览器的操作
+ BOM对象：
    + Window
        + 代表整个浏览器的窗口，同时也是网页中的全局对象
    + Navigator
        + 代表当前浏览器的信息，通过该对象可以识别不同的浏览器
        + 由于历史原因，该对象中的大部分对象都已经不能帮助我们识别浏览器了
        +  一般只会使用userAgent来判断浏览器的信息
    + Location
        + 代表当前浏览器的地址栏信息，可以获取地址栏信息或者操作浏览器跳转页面
        + `assion()`：跳转到其他页面，生成历史记录
        + `reload()`：重新加载，一般缓存不会清除，传递一个true可以强制清空缓存
        + `replace()`：用新页面替换当前页面，不会生成历史记录
    + History
        + 代表浏览器的历史记录，该对象不能获取到具体的历史记录，只能操作浏览器向前向后翻页，而且只在档次访问时有效
        + `back()`、`forward()`、`go(整数)`
    + Screen
        + 代表用户屏幕的信息，可以获取用户的显示器的相关信息
    + 这些对象都是作为window对象的属性来保存的

## 修改元素样式（内联样式）：
+ 语法：元素.style.样式名 = 样式值
+ 注意：如果CSS的样式名中含有-，需要将其样式名修改为驼峰命名法
+ 通过这种方法设置的都是内联样式，有较高优先级。读取的也是内联样式。

## 获取元素样式：（IE8及以下会有不同）
+ 语法：`元素.currentStyle.样式名`
+ 读取正在显示的样式，获取到的是只读的

+ 其他浏览器可以使用`getComputedStyle()`来获取当前样式
+ 参数：
    + 获取样式的元素
    + 传递一个伪元素，一般传null
+ 返回值为封装了当前元素对应样式的一个对象
+ 获取的样式是只读的

+ `getStyle()`：获取当前样式
    + 参数：
        + `obj`：获取样式的元素
        + `name`：获取的样式名

## 样式的其他属性：
    clientWidth、clientHeight：
        获取元素的可见宽度和高度，包括内容区和内边距。
        返回的是数字
        只读不能修改
    offsetWeight、offsetHeight
        获取整个的宽度和高度，包括内容区、内边距和边框
    offsetParent：
        获取当前元素的定位父元素
        会获取到距当前元素最近的开启了定位的祖先元素
    offsetLeft
        当前元素相对于其定位父元素的水平偏移量
    offsetTop
        当前元素相对于其定位父元素的垂直偏移量

## 事件对象：
+ 当事件的响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数
+ `节点.事件 = function(event){};`
+ IE8及以下将事件对象作为window对象的属性保存

## 事件冒泡：
+ 冒泡指的是事件的向上传导，当后代元素上的时间被触发时，其祖先元素的相同事件也会被触发。
+ 不希望发生事件冒泡时可以通过事件对象来取消冒泡
    + `event.cancelBubble = true()`

## 事件委派：
+ 只绑定一次事件，可以应用到多个元素上，即使元素是后添加的
+ 指的是将事件统一绑定给元素相同的祖先元素，利用事件冒泡来解决问题
+ 可以解决绑定次数，提高程序性能

## 事件绑定：
+ 使用`对象.事件 = function(){};`只能同时为一个元素的一个事件绑定一个响应函数，不能绑定多个，如果绑定了多个，则后边的会覆盖掉前边的
+ addEventListener()：可以一个元素同时绑定多个响应函数
    + 参数：
        + 事件的字符串，不要“on”
        + 回调函数
        + 是否在捕获阶段触发事件，布尔值，一般都为false
    + 该方法中的this指向绑定事件的对象
    + 不支持IE8及以下，须使用`attachEvent()`

## 事件传播：
+ 微软公司：事件由内向外传播，事件应该在冒泡阶段执行
+ 网景公司：事件由外向内传播，事件应该在捕获阶段执行

+ W3C：
    + 捕获阶段
        + 在捕获阶段时从最外层的祖先元素向目标元素进行事件的捕获，此时默认不触发事件
    + 目标阶段
        + 事件捕获到目标元素，捕获结束开始在目标元素上触发事件
    + 冒泡阶段
        + 事件从目标事件向其祖先元素传递，并依次触发事件
    
    + 如果希望在捕获阶段就触发事件，将addEventListener()第三个参数设为true

    + IE8及以下没有捕获阶段

## 定时器：window对象的方法
+ `setInterval()`：
    + 将一个函数每隔一段时间调用一次
    + 参数：
        + 回调函数
        + 每次调用的时间间隔，单位是毫秒
    + 返回值是一个Number类型的数据，该数字用来作为定时器的唯一标识
+ `clearInterval()`：
    + 关闭一个定时器或延时调用
    + 参数：
        + 一个定时器的标识
+ `setTimeout()`：
    + 延时调用
    + 不马上执行，而是隔一段时间执行，且延时调用执行一次

## 类的操作：
+ 可以通过修改元素的class属性来间接修改样式
+ 添加样式：`元素.className += " 类名";`

## JSON：
+ 一个特殊格式的字符串，可以被任意语言识别，并且可以转换为任意语言中的对象
+ JavaScript Object Notation JS对象表示法
+ 属性名必须加双引号，其他和JS对象一致
+ JSON有JSON对象和JSON数组
+ JSON中允许的值：
    + 字符串
    + 数值
    + 布尔值
    + null
    + 对象
    + 数组
+ JS中有一个工具类，就叫JSON，可以将JSON转换为JS对象，也可以将JS对象转换为JSON
+ JSON -> JS对象：
    + JSON.parse()
+ JS对象 -> JSON：
    + JSON.stringify()
+ 使用JSON进行深拷贝：
    + 浅复制（两者指向同一地址，一个改变会影响另外一个）：
        + `const obj = Object.assign()`
    + 深复制（两者指向不同地址，一个改变不影响另一个）
        ```
        const obj = structuredClone(obj)

        const str = JSON.stringify(obj)
        const obj = JSON.parse(str)
        //利用JSON进行深复制
        ```
+ `eval()`：
    + 可以执行一段字符串形成的JS代码，并将执行结果返回
    + 如果字符串中含有`{}`,会将`{}`当成是代码块，如果不希望这样，需要在字符串前后各加一个`()`：`eval("(" + 含{}的字符串 + ")");`

## Map：
+ 一个对象
+ 用来存储键值对结构的数据（key-value）
+ 与Object的区别：
    + Object中的属性名只能是字符串或符号，若是其他类型，会将其转换成字符串
    + Map中的任何类型的值都可以成为数据的key
+ 创建：
    + `const map = new Map()`
+ 添加键值对：
    + `map.set()`
+ 根据key获取值：
    + `map.get(key)`
+ 删除：
    + `map.delete(key)`
+ 检查是否包含指定key:
    + `map.has(key)`
+ 删除全部：
    + `map.clear()`
+ 转换为数组：
    + `const arr = Array.from(map)`
    + `const arr = [...map]`

## Set：
+ 用来创建一个集合，功能和数组类似，不同点在于Set中不能存储重复的数据
+ 创建：
    + `cosnt set = new Set()`
    + `const set = new Set([...])`
+ 添加：
    + `set.add()`
+ 检查：
    + `set.has()`
+ 数量：
    + `set.size`
+ 删除：
    + `set.delete()`

## 异步编程：
+ 实现方式：
    1. 回调函数
    2. Promise：
        + 可以用一种链式结构将多个一步操作串联起来，即链式调用
        + 示例：
            ```
            fetch()
                .then((response) => {

                })
                .then(() => {

                })
                .catch((erroe) => {
                    //前面出现错误时触发，之后的then不会执行
                })
                .finally(() => {
                    //所有链式调用执行结束后调用
                })
            ```
    3. async、await：
        + 基于Promise之上的一个语法糖，让异步操作更贱简单明了，用法相当于指定数据类型
        + 语法：
            ```
            async funciton f(){
                const response = await fetch();
                const json = await response.json();
            }
            //await 会等待Promise完成之后直接返回最终结果
            //await底层是基于Promise和事件循环机制实现的
            ```
        + 注意：
            + 在循环中执行异步操作，是不能直接调用forEach或map这类方法的
            + 不能在全局或者普通函数中使用await
        + async:
            1. 函数返回值封装为一个promise对象
            2. promise对象的结果由async函数执行的返回值决定
            3. 没有`await`的情况下执行`async`函数，该函数会立即执行，不会阻塞后面的语句
        + await：
            1. 右侧的表达式一般为promise对象，但也可以是其他值
            2. 若表达式是promise对象，await会阻塞后面的语句，等待Promise对象的resolve()执行，然后得到resolve的值将其作为await表达式的运算结果
            3. 若表达式是其他值，直接将此值作为await的返回值
            + `await`声明一个方法后，该方法后面的语句相当于写进了Promise的`.then(){}`中
        + 注意：
            1. await必须在async函数中，但async函数可以没有await
            2. 若await的promise失败了，就会抛出异常，需要通过try..catch...进行捕获和处理

## defer 和 async属性
+ 作用：
    + defer：
        + 外部js文件和当前html页面同时加载（异步），只在当前页面解析完成之后执行js代码
        + 多个js文件会按顺序加载执行
    + async：
        + 外部js文件和当前html页面同时加载（异步），在js文件加载完成后执行js代码
        + 多个js文件的加载执行顺序不定
+ 两者只对外部脚本文件生效
+ 使用defer和async属性后，`document.write()`失效
    + 因为当页面加载和解析完成后，文档流关闭，无法向页面中写入内容（但可以使用DOM方法写入）

## Ajax：
+ 异步JS和XML
+ XML（可扩展标记语言）：与HTML类似，但XML中都是自定义标签，无预定义标签，现已用JSON代替
+ 是网页实现异步更新，在不重新加载整个网页的情况下，对网页的部分进行更新
+ 问题：
    + 没有浏览历史，不能回退。
    + 存在跨域问题（Ajax默认不允许）
    + SEO（搜索引擎优化）不友好，爬虫爬不到
+ HTTP协议：
    + 请求-请求报文
        + 格式：
            ```
            请求行：GET 路径或者查询字符串等 HTTP/1.1
            请求头：Host Cookie Content-type User-Agent
            空行
            请求体
            ```
    + 响应-响应报文
        + 格式：
            ```
            行：HTTP/1.1 状态码 状态字符串
            头：Content-type Content-length Content-encoding
            空行
            体
            ```
+ 工作原理：
    + 客户端发送请求，请求交给xhr对象，xhr对象把请求提交给服务器，服务器进行业务处理，服务器响应数据交给xhr对象，xhr对象接收数据，由javascript把数据写到页面上
+ 重要属性
    1. onreadystatechange
        + 每当readyState发生变化是都会触发onreadystatechange函数
    2. readyState
        + readyState的五种状态
            1. （0）未初始化——uninitialized
                + 判断xhr对象是否被创建，为调用open()方法做好准备。值为0表示对象已经存在，否则浏览器会报错（对象不存在）
            2. （1）载入——loading
                + 调用open()对xhr对象进行初始化，根据参数(method,url,true)完成对象状态的设置。并调用send()方法开始向服务端发送请求。值为1表示正在向服务端发送请求。
            3. （2）正在载入——loaded
                + 接收服务器端的响应数据。但获得的还只是服务端响应的原始数据，并不能直接在客户端使用。值为2表示已经接收完全部响应数据。并为下一阶段对数据解析作好准备。
            4. （3）交互——interactive
                + 解析接收到的服务器端响应数据。即根据服务器端响应头部返回的MIME类型把数据转换成能通过responseBody、responseText或responseXML属性存取的格式，为在客户端调用作好准备。状态3表示正在解析数据。
            5. （4）完成——complete
                + 确认全部数据都已经解析为客户端可用的格式，解析已经完成。值为4表示数据解析完毕，可以通过XMLHttpRequest对象的相应属性取得数据。
    3. status
        + 用来表示请求是否很成功，能够找到服务器页面
        + 类似http状态码
+ 步骤：
    1. 创建对象
        + `const xhr = new XMLHttpRequest();`
    2. 初始化，设置请求方法和URL
        + `xhr.open('GET', "http://127.0.0.1:8000/server");`
    3. 发送
        + `xhr.send();`
    4. 事件绑定，处理服务器返回的结果
        ```
        //readystate是xhr对象中的属性，表示状态 0 1 2 3 4
        xhr.onreadystatechange = function(){}
        ```
+ 请求体参数设置：
    + GET：直接在url中设置
    + POST：在sent()中作为参数进行设置
+ 响应服务端JSON数据的两种方式：
    + 手动设置
        + `let data = JSON.parse(xhr.response);`
    + 自动转换
        ```
        //设置响应体数据的类型
        xhr.responseType = 'json';
        ```
+ IE缓存问题：
    + IE会对Ajax的请求结果进行缓存，之后访问使用的是缓存的而非最新的
    + 解决方法：在url中添加可变的参数，如时间戳
+ 请求超时与网络异常处理：自动取消请求
    ```
    //超时设置
    xhr.timeout = 2000;
    //超时回调
    xhr.ontimeout = function(){
        alert("网络不佳");
    };

    //网络异常回调
    xhr.onerror = function(){
        alert("网络错误")
    }
    ```
+ 手动取消请求：
    + `abort()`：
        + 属于Ajax方法，用于取消请求
+ 请求重复发送问题：
    + 判断之前是否有同样请求，若有则取消上次请求
+ jQuery中发送Ajax请求：
    ```
    $.get('http://127.0.0.1:8000/jQuery-server', 
        {a:100, b:200}, 
        function(data){console.log(data);}, 
        'json')
    ```
    ```
    $.ajax({
        url: 'http://127.0.0.1:8000/jQuery-server',
        data: {a:100, b:200},
        type: 'GET',
        //响应体结果
        dataType: 'json',
        //成功的回调
        success: function(data){
            console.log(data);
        }
    })
    ```
+ Axios发送Ajax请求：
    + 发送请求：
        ```
        //GET请求
        axios.get('http://127.0.0.1:8000/axios-server', {
            //url参数
            params: {
                id:100,
                vip:7
            },
            //请求头
            headers: {
                name:'123',
                age:20
            }
        }).then(value => {
            console.log(value);
        })
        ```
        ```
        //POST请求
        axios.post('http://127.0.0.1:8000/axios-server', {
                usname:'123',
                uspassword:'456'
            }, {
            //url参数
            params: {
                id:100,
                vip:7
            },
            //请求头
            headers: {
                height: 158,
                age: 20
            }
        }).then(value => {
            console.log(value);
        })
        ```
        ```
        //axios函数
        axios({
            //请求方法
            method:'GET',
            //url
            url:'http://127.0.0.1:8000/axios-server',
            //url参数
            params: {
                id:100,
                vip:7
            },
            //请求头
            headers: {
                a: 1,
                b: 2
            },
            //请求体参数
            data: {
                usname:'123',
                uspassword:'456'
            }
        }).then(value => {
            console.log(value);
        })
        ```
    + 数据返回和处理：基于promise

+ fetch发送Ajax请求：
    + fetch()属于全局函数，返回一个promise对象
    url参数直接添加在url后
        ```
        fetch('http://127.0.0.1:8000/axios-server', {
            //请求方法
            method:'POST',
            //头信息
            headers: {
                name:'123'
            },
            //请求体
            body:'usname=147'
        }).then(response => 
            response.json()
        ).then(response => {
            console.log(response)
        })
        ```
+ 同源策略：
    + 协议、域名、端口号必须完全相同
    + 解决跨域的方法：
        1. jsonp
            + 原理：
                + 因为script标签本身就支持跨域，所以利用script对后端发送请求，后端需要返回有效的js代码供前端使用
            + 使用jQuery发送jsonp：
                ```
                $.gestJSON('url', function(){})
                //url必须加上参数'callback=?'
                ```
        2. CORS
            + 跨域资源共享，是官方跨域解决方法，在后端进行设置
            + `response.setHeader('Access-Control-Allow-Origin','*');`等

## Promise：
+ 一个构造函数，处理异步问题
+ 异步编程：
    + fs文件操作
    + 数据库操作
    + Ajax
    + 定时器
+ 优势：
    1. 指定回调函数的方式更加灵活
        + 以前：必须在启动异步任务前指定
        + promise：启动异步任务、返回promise对象、给promise对象绑定回调函数（甚至可以在异步任务结束后指定多个）
    2. 支持链式调用，可以解决回调地狱问题
        + 回调地狱：回调函数嵌套调用，外部调用函数异步执行的结果是嵌套的回调执行的条件
+ 创建：
    ```
    //需要一个函数做参数
    let p = new Promise((resolve, reject)=>{
        //成功调用resolve，失败调用reject
        resolve();
        reject();
    })
    //调用then函数，两个函数做参数
    p.then((value)={
        //成功的回调函数，有默认参数value
    }, (reason)=>{
        //失败的回调函数，有默认参数reason
    })
    ```
+ promisify：
    1. 属于util模块。传入一个遵循常见的错误优先的回调风格的函数（即以(err, value) => ...回调作为最后一个参数），并返回一个返回promise的版本。
    2. 可以借助该方法将以前的回调函数转换为promise风格
+ 状态：
    1. 实例对象中的一个属性【PromiseState】
    2. 属性值：
        + `pending`
        + `resolved / fulfilled`
        + `rejected`
    3. 只有两种改变方式：`pending->resolved`、`pending->rejected`，且一个promise对象只能改变一次，无论变为成功还是失败，都会有一个结果数据，成功的结果数据一般称为value，失败的结果数据一般称为reason
+ 值：
    1. 实例对象中的另一个值【PromiseResult】
    2. 保存着异步任务【成功/失败】的结果
    3. resolve、reject
+ 工作流程：
    1. 创建promise对象
    2. 执行异步操作
    3. 判断
        + 成功了，执行`resolve()`，是一个promise对象，状态为resolved
        + 失败了，执行`reject()`，是一个promise对象，状态为rejected
    4. 进行回调
        + 回调`onResolved()`，即`.then()`
        + 回调`onRejected()`，即`.then()/.catch()`
    5. `.then()`返回一个新的promise对象
+ API：
    1. 构造函数`Promise()`
        + 作为参数的内部函数（执行器函数）与构造函数是同步调用的，不会进入队列，会立即执行
    2. `.prototype.then()`
        + 属于实例对象，两个回调做参数
    3. `.prototype.catch()`
        + 属于实例对象，参数是失败的回调函数
    4. `resolve()`
        + 属于函数对象，有一个参数value，返回一个成功/失败的promise对象
        + 如果传入的参数为非promise对象，返回的结果为成功的promise对象
        + 如果传入的参数为promise对象，则参数的结果决定了resolve的结果
    5. `reject()`
        + 属于函数对象，有一个参数reason，返回一个失败的promise对象
    6. `all()`
        + 属于函数对象。有一个参数，一般为promise数组。返回一个新的promise对象
        + 如果传入的参数全为成功的promise对象，返回的结果为成功的promise结果组成的数组
        + 如果传入的参数中有失败的promise对象，返回的结果为失败的promise结果
    7. `race()`
        + 属于函数对象。有一个参数，一般为promise数组。返回一个新的promise对象，第一个完成的promise对象的结果就是返回的结果
+ 改变promise对象状态：
    1. 调用`resolve()`，状态pending->resolved、
    2. 调用`reject()`，状态pending->rejected
    3. 抛出错误
        + `throw error`，状态pending->rejected
+ 为一个promise对象指定多个 成功/失败回调函数（通过`then()`来实现），当该promise改变为对应状态时都会调用
+ 改变promise状态和指定回调函数执行先后问题：
    + 都有可能：
        1. 当执行器函数中的任务是异步任务时或延时执行then()，先改变promise状态，再执行回调函数
        2. 当执行器函数中的任务是同步任务时，先执行回调函数，再改变promise状态
    + 何时获得数据：
        1. 若先指定回调，那当状态改变时，回调函数就会调用，得到数据
        2. 若先改变状态，那当指定回调时，回调函数就会调用，得到数据
+ then方法返回的promise对象状态：
    + then()指定的回调函数执行的结果决定
        + 若抛出异常，新promise对象变为rejected，reason为抛出的异常
        + 若返回的是非promise的任意值，新promise对象变为resolveed，value为返回的值
        + 若返回的是另一个新promise，该promise的结果就会变为返回结果
+ 如何串联多个操作任务：
    + 通过then()的链式调用串联多个同步/异步任务
+ 异常传递：
    + 当使用promise的then的链式调用时，可以在最后指定失败的回调。这样前面任何操作出了异常，都会穿到最后失败的回调中处理
+ 中断promise链：
    + 使用链式调用时，在中间中断，不再调用后面的回调函数。
    + 方法：在回调函数（then中）中返回一个pending状态的promise对象
+ Promise执行异步调用时，回调函数不在then()中执行，而是在resolve()和reject()中执行。
+ 特性：
    + 异常穿透
    + 值传递：第一个回调函数不传也可以

## JS引擎的执行机制：
+ event loop：
    + 同步任务依次执行，异步任务依次加入任务队列，同步任务都执行结束后，检查任务队列，优先将任务队列中的微任务依次加入主线程执行，当微任务都执行后，依次将任务队列中的宏任务加入主线程，开始下一次的事件循环。
+ 宏任务：
    + 整体script代码，定时器等
+ 微任务：
    + `promise`，`process.nextTick`,`MutationObserver`等
+ 微任务优先于宏任务执行
+ Promise的构造函数是立即和同步执行的，then是异步的
+ 定时器是宏任务，在定时器计时完毕后会将它的回调函数加入到任务队列中，等待下一次的事件循环。这也就是说下一次执行的定时器仅仅只是回调函数，计时已经在定时器模块中完成了。

## 三种包管理器：npm、yarn、pnpm。
    包的分类：
        1、项目包
        那些被安装到项目的node_modules目录中的包，就是项目包。
        项目包又分为：
            1、开发依赖包：被记录到devDependencies节点中，只在开发期间会用到。（npm i 包名称 -D）
            2、核心依赖包：被记录到dependencies节点中的，在开发期间和项目上线之后都会用到。（npm i 包名称）
        2、全局包
        只有工具性质的包，才有全局安装的必要性，因为它们提供了好用的终端命令。
    i5ting_toc：
        i5ting_toc是一个可以把md文档转换为html页面的小工具
    规范的包结构必须符合以下三点要求：
        （1）包必须以单独的目录存在；
        （2）包的顶级目录下要必须包含package.json这个包管理配置文件；
        （3）package.json中必须包含name，version，main这三个属性，即包的名称，版本号，包的入口。

    npm：
        package.json：
            1、包管理配置文件。用来记录与项目有关的一些配置信息，如：项目的名称、版本号、描述等，项目中都用到了哪些包，哪些包只在开发期间会用到，哪些包在开发和部署时需要用到。
            2、在package.json文件中，有一个dependencies节点，它专门用来记录使用npm install命令安装了哪些包。
            3、可以使用npm init -y 命令，在所处目录下生成一个package.json文件，里面会记录安装的包的信息
    
    yarn：
        有个缓存机制，当我们第一次下载的包，就会被缓存下来，当我们下次下载的时候，就直接载缓存里面找到使用，就省去了继续下载的时间
    
## 浏览器存储
+ 本地存储-localStorage：
    + 属于window。浏览器关闭后依然存在
    + `setItem()`：添加记录
    + `getItem()`：获取记录
    + `removeItem()`：移除记录
    + `clear()`：清除全部
+ 服务器存储-sessionStorage：
    + 浏览器关闭后就清空。

# ES6部分特性
## rest参数
+ 一种参数获取方式，ES5中使用arguments
+ rest参数必须放在参数的最后

## 扩展运算符`...`
+ 可以将数组转换为逗号分割的参数序列
+ 应用场景：
    + 数组的合并
    + 数组的克隆（是浅拷贝）
    + 将伪数组转为真正的数组

## 迭代器
+ 是一种接口，为各种不同的数据结构提供统一的访问机制。主要供`for...of...`使用
+ 原理：
    1. 创建一个指针对象，指向起始位置
    2. 第一次调用对象的next方法，指针自动指向数据结构的第一个成员
    3. 然后不断调用next方法，指针一直向后移动，直到指向最后一个成员
    4. 每次调用next方法都会返回一个包含value和done属性的对象

## 生成器
+ 是一个函数，用于实现异步编程
+ 声明方式
    + 函数名前加`*`
+ 直接调用无效，必须调用`.next()`来使用
+ 在生成器函数中可以出现`yield`语句
    + 相当于分割符，配合`next()`可以不断的向下调用
+ 参数
    + 生成器函数可以携带参数
    + `next()`可以携带参数，参数将作为上一个yield语句的返回结果
+ 解决回调地狱：
    + 将每个异步任务进行封装，并在其中调用生成器的`next()`，以此解决回调地狱问题

## class类
+ 可以视为是一个语法糖，其绝大部分功能ES5都可以实现，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语言。
+ ES5和ES6的对比
    + ES5的构造函数
        ```
        function fun(arg1, arg2){
            // 对实例对象的属性做初始化
            this.arg1 = arg1;
            this.arg2 = arg2;
        }

        // 通过原型对象添加方法
        fun.prototype.方法名 = function(){ ... }
        ```
    + ES6的class
        ```
        class fun(){
            // 构造函数，名字不能修改
            constructor(arg1, arg2){
                this.arg1 = arg1;
                this.arg2 = arg2;
            }

            // 添加方法
            // 必须使用简写形式
            方法名(){ ... }
        }
        ```
+ 静态成员
    + 函数对象（即构造函数）的属性和方法称之为静态成员
        + 静态成员实例对象不可访问
    + 在class中使用`static`关键字
+ 构造函数实现继承
    + ES5
        ```
        // 父类
        function Phone(brand, price){
            this.brand = brand;
            this.price = price;
        }
        // 声明父类的方法
        Phone.prototype.call = function(){ ... }

        // 子类
        function SmartPhone(brand, price, color, size){
            // 继承父类属性
            // 将Phone中的this指向改为了SmartPhone,借用父类的属性声明来实现子类的属性声明
            Phone.call(this, brand, price);
            this.color = color;
            this.size = size;
        }
        // 进行继承
        SmartPhone.prototype = new Phone();

        // 声明子类的方法
        SmartPhone.prototype.photo = function(){ ... }

        ```
    + ES6——`extends`关键字
        ```
        // 父类
        class Phone(brand, price){
            constructor(brand, price){
                this.brand = brand;
                this.price = price;
            }
            // 父类的成员属性
            call(){
                ...
            }                
        }

        // 子类 
        // 进行继承
        class SmartPhone extends Phone{
            constructor(brand, price, color, size){
                // 继承父类属性
                // 作用相当于call和apply
                // 只能在构造函数中使用
                super(brand, price);
                
                this.color = color;
                this.size = size;
            }

        }
        ```
+ 子类可以对父类方法进行重写
+ get 和 set 关键字
    + get和set声明的函数必须有返回值
    + get用于对象属性的获取
    + set用于对象属性的修改



## 暴露与引入
+ 暴露方式
    1. 分别暴露
        + 每个语句前使用`export`
    2. 统一暴露
        + `export { ... }`
    3. 默认暴露
        + `export default { ... }`
        + 要暴露的存放在default属性中
+ 引入方式（静态引入）
    + 通用引入方式
        + `import * as xxx from ".../..."`
    + 解构引入方式（对应上述暴露方式）
        1. `import {module1, modole2} from ".../..."`
        2. `import {module1 as x1, modole3} from ".../..."`
        3. `import {default as x} from ".../..."`
    + 简便引入方式（仅针对默认暴露）
        + `import * from ".../..."`
+ 动态引入
    + 使用`import()`，该方法的返回值是一个Promise对象
    + `import('.../...').then(module => { ... })`