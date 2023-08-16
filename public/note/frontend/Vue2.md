# Vue：
## 相关介绍：
1. 首先创建一个vue实例，其要传入一个配置对象，内容如下：
    1. el用于指定当前vue实例为哪个容器服务，可以使用css选择器，还可以使用document选择dom节点
    2. data存储数据
        + data中的数据变化，页面也会变化
2. 容器中的代码符合html规范，且有一些vue语法。容器中的代码称为 vue模板
3. 使用插值来引入变量`{{变量}}`，`{{}}`中必须是js语句(如js表达式)

## 重要原则：
+ 由Vue管理的函数，不能使用箭头函数，因为箭头函数没有自己的this，会导致this指向的不再是Vue实例，而是window   
+ `Vue.config.productionTip`的作用-阻止vue启动生产消息
    
## 实例与容器对应关系：
+ 一个容器只能与一个实例绑定
    
## 模板语法：
+ 插值语法
    + 用于解析标签体内容
    + `{{}}`
+ 指令语法
    + 用于解析标签（包括：标签属性、标签体内容、绑定事件......）
    + `v-bind:（简写为 : ）`为标签中的属性指定变量，使用后会将""中的当做表达式处理
    
## 数据绑定：
+ 单向（数据仅从data流向页面）：v-bind
    + `v-bind:value=''` 简写为 `:value=''`
+ 双向（数据从data流向页面，也从页面流向data）：v-model
    + 仅限用于表单类元素
    + `v-model:value=''` 简写为 `v-model=`
    + v-model也有修饰符：
        + `.number`：将输入的转为数字
        + `.lazy`：失去焦点时才收集数据
        + `.trim`：去掉前后的空格
    
## el的第二种写法：（位置变了）
```
    const v=new Vue();
    v.$mount('容器');
```
    
## data的第二种写法：（位置不变）
``` 
    data:function(){
        return{
            ...
        }
    }

    //简写
    data(){
        return{
            ...
        }
    }
```

## 表单元素input作为多选框checkbox时：
+ 没有配置value属性，收集的是checked
+  配置了value属性：
    + value初始值是非数组，收集的是checked
    + value初始值是数组，收集的是value值组成的数组

## 架构模型-MVVM：
+ M：模型，对应data中的数据
+ V：视图，对应模板
+ VM：视图模型，对应Vue实例对象

## _Object.defineProperty(对象名，属性名，{属性值, 配置项...})：
+ 添加属性，添加的属性不可被枚举（遍历），不可被修改，不可被删除
+ 设置enumerable:true，就可以枚举了
+ 设置writable:true，就可以被修改了
+ 设置configurable:true，就可以被删除了
+ 设置get()函数，获取属性值，要有返回值
+ 设置set(value)函数，修改属性值，value就是修改的值
    
## 数据代理：
+ 通过一个对象代理对另一个对象中属性的操作，通过defineProperty实现
    
## Vue中的数据代理：
+ 通过vm对象来代理data对象中属性的操作
+ 基本原理：
    + 通过 defineProperty 将data中所有有属性添加到vm上，为每一个添加到vm上的属性都制定一个 getter/setter。在getter/setter内部去操作data中对应的数据。
+ _data进行的是数据劫持，并非简单的数据复制，为的是页面能够响应data中的数据变化

## 事件处理：
+ 事件回调函数在methods中定义
+ this指向vm或组件实例对象
+ 标签通过v-on:click（简写@click）来绑定回调函数。""中可以直接写函数体，仅限于使用vm有的属性
+ 标签绑定事件函数时可以直接传参数，方法是直接打括号写参数，其中$event可以防止event丢失。
+ 事件修饰符：
    + `.prevent`：
        + 阻止默认事件
    + `.stop`：
        + 阻止事件冒泡
    + `.once`：
        + 事件只触发一次
    + `.capture`：
        + 使用事件的捕获模式
    + `.self`：
        + 只有event.target是当前操作的元素时才触发
    + `.passive`：
        + 事件的默认行为立即执行，无需等待事件回调执行完毕
        
## 键盘事件：
+ 常用的按键别名：
    + 回车：`.enter`
    + 删除：`.delete`
    + 退出：`.esc`
    + 空格：`.space`
    + 换行：`.tab（特殊，需要配合keydown使用）`
    + 上：`.up`
    + 下：`.down`
    + 左：`.left`
    + 右：`.right`
+ 其他的：
    + `.键名（其中两个单词组成的需要改写，全小写且两个单词用-连接）`
+ 系统修饰键：`ctrl、alt、shift、meta`
    + 配合keyup使用，按下修饰键的同时再按下其他键，随后释放其他键，事件才被触发
    + 配合keydown使用，正常触发事件
        
## 计算属性computed：
+ 对属性进行计算，data中存的认为是属性，计算属性存在computed中。
+ 计算属性的整个过程要封装为对象，需要定义get()，该函数中的this指向vm。
+ get()调用时机：
    + 初次调用计算属性时
    + 所依赖的数据发生变化时
+ set()：非必须
    + 用处：修改计算属性
    + 调用时机：
        + 计算属性被修改时
+ 原理：底层借助object.defineproperty方法提供的getter和setter。
+ 简写：
    + 使用条件：只使用了get()，没有用set()
    + 示例：
        ```
        计算属性名(){
            return ...
        }

        //完整写法
        计算属性名:{
            get(){
                return ...
            }
            //set()
        }
        ```
    
## 监视属性watch：
+ 当被监视的属性变化时，回调函数自动调用进行相关操作
+ 被监视的属性必须存在
+ 在新的配置项watch中
+ 默认不监视对象内部值得改变，需要添加deep配置项（vue自身是可以监视对象内部值得改变的）
+ 示例：
    ```
    watch:{
        immediate:true,
        属性名:{
            //有两个参数
            handler(newvalue, oldvalue){
                ...
            }
        }
    }            
    //简写，仅使用handler时
    属性名(newValue, oldValue){
        ...
    }
    ```
    ```
    //另一种方式，通过vm实现监视，写在vm示例外
    vm.$watch('属性名', {
        immediate:true,
        属性名:{
            handler(newvalue, oldvalue){
                ...
            }
        }
    })
    //简写
    vm.$watch('属性名', function(newValue, oldValue){
        ...
    })
    ```

+ handler()调用时机：
    + 监视的对应属性发生改变时
+ immediate属性：
    + 初始化时调用handler一下
+ 监视多级结构中某个属性的变化：
    + `'属性名':{}`
+ 监视多级结构中某个属性的变化：
    + 添加配置项：
        `deep:true`

+ Vue监视的原理：
    + vue会监视data中所有层次的数据
    + 监视对象中数据的实现方法：
        + 通过setter实现监视，且在new vue时就传入要监视的数据
        + 对象中或追加的属性，vue默认不做响应式处理
        + 若需要给后添加的属性做响应式，需要使用以下API:
            `vue.set(target, propertyName/index, value) 或 vue.$set(target, propertyName/index, value)`
    + 监视数组中数据的实现方法：
        + 通过包裹数组更新元素的方法实现监视，本质上是：
            + 调用原生对应的方法对数组进行更新
            + 重新解析模板，进而更新页面
    + 在vue中修改数组中的某个元素一定要使用如下方法：
        + 若干API：`push()、pop()、shift()、unshift()、splice()、sort()、reverse()`
        + `Vue.set()` 或 `vm.$set()`
        + `Vue.set()` 和 `vm.$set()`不能给vm或vm的根数据对象（如vm._data）添加属性
+ 数据劫持：
    + 将data中传入的数据进行遍历，并绑定对应的get和set，然后重新解析模板

+ computed与watch的比较：
    + computed中的属性，当变化发生时，computed计算相关变化，得到新值并返回到属性上，所以get最后需要return语句。watch是当改变发生时，直接对新值和旧值进行操作，无需return。
    + computed不能实现异步任务，watch可以（异步任务中回调函数须写成箭头函数，因为箭头函数没有this）

## 过滤器：
+ 配置项名为filters，里面配置函数
+ 使用格式为：`数据 | 函数`，用在插值语法 或 v-bind中
    + 流程是先获取管道符前的数据作为参数传入函数，最后用函数返回值进行替换。
    + 函数也可以传其他参数，使用时位置是第一个参数后的参数依次排列，第一个参数默认是数据。
    + 函数可以串联，格式是 `数据 | 函数 | 函数 | ...`
        + 此时，第二个函数的参数是第一个参数的返回值，以此类推
+ 作用：可以对数据进行简单加工再进行显示
+ 过滤器在配置项中时，是局部的；作为全局时，格式为：
    ```
    Vue.filter('函数名',function(value){
        ...
    })
    ```

## 函数重要原则：
+ vue管理的函数最好写成普通函数，这样this才会指向vm或组件实例对象
+ 所有不被vue管理的函数（如过滤器、定时器、Ajax的回调函数等）最好写成箭头函数，这样this才会指向vm或组件实例对象

## 绑定class样式：
+ 写法：`:class="xxx"`，xxx可以是字符串、对象、数组
+ 字符串写法——单个样式名写成字符串，
    + 适用于样式的类名不确定，需要动态指定
+ 数组写法——多个样式名添加到数组中，指定样式时指定为数组名。
    + 适用于要绑定的样式个数不确定，名字也不确定
+ 对象写法——绑定的样式作为属性名（属性值为布尔值）封装到一个对象中，指定样式时指定为对象名。
    + 适用于要绑定的样式个数确定，名字也确定，但要动态决定用不用
    
## 绑定style样式：
+ 写法：
+ `:style="{fontSize: xxx}"`，xxx是动态值
    + 但font-size这类的需要写成fontSize，且不能写没有的样式名
+ `:style="[a,b]"`，其中a、b是样式对象         

## 条件渲染：
+ 
    + 标签内使用`v-show="..."`
        + 为假时节点仍然存在，只是隐藏
    + 标签内使用`v-if/v-else-if`
        + 为假时节点不存在
    + 使用template不会影响结构，只能使用v-if，不能使用v-show
    
+ `v-for:"item in arr"/"(item, index) in arr"`
    + 还需要`:key="item.id"/:key="index"`，给每个item一个标识
    + 可以遍历数组、对象、字符串，也可以遍历指定次数

    + key：
        + 根据数据生成虚拟DOM，将虚拟DOM转为真实DOM（页面显示）。
        新数据出现，根据新数据生成虚拟DOM，进行虚拟DOM对比算法，再将虚拟DOM转为真实DOM

        + 虚拟DOM对比算法：
            + 对比key值，与之前存在的相同key值相对比，节点内相同的内容复用，不同的重新创建。新的key值标记的节点，直接生成新的虚拟DOM节点。

        + key默认是index值，可能导致的问题：
            + 若对数据进行 逆序添加、逆序删除等破坏顺序操作，会产生没有必要的的真实DOM更新，效率低
            + 若结构中包含输入类的DOM，会产生错误的DOM更新
        
        + key值选取：
            + 最好使用每条数据的唯一标识作为key
            + 若不存在对数据的逆序添加、逆序删除等破坏顺序的操作，且仅用于展示，那么使用index作为key没有问题

## 列表过滤：
+ 数组.filter()方法返回的是新数组
+ 用watch可以实现，用computed也可以实现
    
## 内置指令：
+ `v-bind`：单向绑定，简写为:xxx
+ `v-model`：双向绑定
+ `v-for`：遍历
+ `v-on`：绑定事件监听，简写为@
+ `v-if`：条件渲染，控制节点是否存在
+ `v-else`：条件渲染，控制节点是否存在
+ `v-show`：条件渲染，控制节点是否显示
+ `v-text`：渲染文本内容。与插值语法相比，会替换掉节点中的内容，不会解析标签结构
+ `v-html`：支持结构解析，存在安全性问题，动态解析HTML容易导致XSS攻击
+ `v-cloak`：该属性无值，配合css的属性选择器[v-cloak]使用，vue引入后悔立即删掉该属性
+ `v-once`：该属性无值。所标记的节点在初次动态渲染后就被视为静态内容，可用于优化性能
+ `v-pre`：该属性无值。跳过所在节点的编译过程，可用该指令来跳过没有指令语法、插值语法的节点，可以加快编译
    
## 自定义指令：
+ 自定义指令定义时不加v-，使用时再加。指令如果是多个单词，使用`xxx-xxx`命名，不要使用驼峰命名。
+ 在配置项directives中（局部）定义
    + 定义指令即定义函数，有两个参数：`element（所在节点）、binding（绑定的所有相关信息）`。函数中的this指向window
    
    + 该函数调用时机：
        + 指令与元素成功绑定时（此时元素尚未放入页面）        
        + 指令所在模板被重新解析时

    + 要更精细的获取各种时机，需要使用对象写法：
        ```
            指令名:{
                ...（各类函数）
            }
            常用函数：（都有element、binding参数）
                bind()：指令与元素成功绑定时调用
                inserted()：指令所在元素被插入页面时调用
                update()：指令所在模板被重新解析时调用
        ```
    + 使用简写形式时（函数写法），实际上是省略了insered()
+ 全局定义格式：
    ```
    Vue.directive('函数名', function(element, binding){
        ...
    })
    Vue.directive('对象名', {
        ...
    })
    ```

## 生命周期（各类钩子函数，4对）（不在总流程中的还有3个）：
+ 挂载流程：
    ```
    //发生在初始化生命周期、事件后，数据代理尚未开始。无法通过vm访问到data、methods中的数据
    beforeCreate(){}
    ```
    ```
    //发生在初始化数据监测、数据代理后。可以通过vm访问到data、methods中的数据
    created(){}
    ```
    ```
    //之后Vue开始解析模板，生成虚拟DOM（内存中），页面还不能显示解析好的内容
    //此处有两个判断：
        1、先判断是否有el配置项，若没有就等待vm.$mount(el)响应
        2、然后判断是否使用了template（只能有一个根节点）配置项，若有进行解析，若没有就将el的整个外部页面结构当做template使用
    ```
    ```
    //此时页面呈现未经Vue编译的DOM结构，所有对DOM的操作最终都不奏效
    beforeMount(){}
    ```
    ```
    //将内存中的虚拟DOM转为真实DOM插入页面。会有副本$存在
    ```
    ```
    //页面呈现出经过Vue编译的DOM，对DOM的操作均有效，至此初始化过程结束。一般在此进行：开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作
    //Vue完成模板的解析并把初始化的DOM元素放入页面后（挂载完毕）调用mounted
    mounted(){}（重要）
    ```
+ 更新流程（是一个循环流程）：
    ```
    //此时数据是新的，但页面是旧的，页面尚未和数据保持同步
    beforeUpdate(){}
    ```
    ```
    //根据新数据生成新的虚拟DOM，随后与旧的虚拟DOm进行比较，最终完成页面更新。即完成了Model->View的更新
    ```
    ```
    //此时数据是新的，页面也是新的，页面和数据保持同步
    udated(){}
    ```
+ 销毁流程（当`vm.$destroy()`被调用时）：
    ```
    //此时vm中的所有东西都属于可用状态，但不会再触发更新流程，马上执行销毁过程。一般在此阶段：关闭定时器、取消订阅信息、解除自定义事件等
    beforeDestroyed(){}（重要）
    ```
    ```
    //销毁监视器、子组件和自定义事件
    destroyed(){}
    ```
+ 其余3个
    1. $nextTick
        + 指定的回调函数会在下一次DOM节点更新结束后再执行
    2. activated 和 deactivated
        + 路由独有的生命周期钩子
    
## 模块：
+ 向外提供特定功能的js程序，一般是一个js文件

## 组件：
+ 实现应用中局部功能代码和资源的集合
+ 分类：
    + 非单文件组件：
        + 一个文件中包含有n个组件
    + 单文件组件：
        + 一个文件中只包含有一个组件

+ 嵌套：
    + 在一个组件中注册另一个组件，使用时在模板中添加嵌套的组件

+ VueComponent构造函数：
    1. 组件本质时一个名为VueComponent的构造函数，且不是程序员定义的，时Vue.extend生成的
    2. 只需要写<组件名/>或<></>，Vue解析时就会帮助创建相对应组件的实例对象，即Vue帮忙执行`new VueComponent(option)`
    3. 每次调用`Vue.extend`，返回的都是一个全新的VueComponent（特别注意）
    4. 关于this指向：
        1. 组件配置中，
            + data函数、methods中的函数、watch中的函数、component中的函数，这些函数的this指向VueComponent实例对象（简称vc）
        3. new Vue()配置中，
            + data函数、methods中的函数、watch中的函数、component中的函数，这些函数的this指向Vue实例对象（简称vm）

+ 一个重要的内置关系：
    ```
    VueComponent.prototype.__proto__ === Vue.prototype
    //显示原型属性是函数的，隐式原型属性是对象的
    //作用：让组件实例（vc）可以访问Vue原型上的属性、方法
    ```
    

+ 非单文件组件：
    + 实现方式（3步）：
        1. 创建：
            ```
            组件名(非实际组件名) = Vue.extend({
                ...（配置项，不要写el配置项，data使用函数式定义，使用template配置组件结构）
            })
            ```
        2. 注册：
            + 在new Vue的配置项components中实现（局部）注册
                ```
                components:{
                    组件名（实际组件名）:上面定义组件时使用的名字
                    //简写为 组件名
                }
                ```
            + 全局注册：
                `Vue.component('组件名', 定义时的变量名)`
        3. 编写组件标签

    + 注意项：
        1. 组件名命名规则：
            + 一个单词：
                1. 定义时全小写，使用时也全小写
                2. 定义时首字母大写，使用时也首字母大写
            + 多个单词：
                1. 单词全小写之间用-连接
                2. 每个单词的首字母大写，此类需要Vue脚手架的支持
            + 注：配置时可以使用name指定组件在开发者工具中呈现的名字
        2. 组件标签：
            1. 双标签<></>
            2. 单个标签</>（Vue脚手架中生效）
        3. 简写方式：
            `组件名 = {...}`

+ 单文件组件（.vue文件）：
    + 文件名命名与上述非单的组件名命名规则相同
    + 使用3个标签：
        ```
        <template> 组件的结构 </template>
        
        <script> 组件交互相关的代码（data、methods等等） <script/>
            要使用ES6模块化，进行暴露（默认暴露 export default ...）
        
        <style> 组件的样式 <style/>
        ```
        
## Vue脚手架CLI：
+ 初始化
    1. 全局安装@vue/cli
        `npm install -g @vue/cli`
    2. 切换到要创建项目的目录，使用命令创建项目
        `vue create xxx`
    3. 启动项目
        `npm run serve`
    
## 项目结构：
+ src中：
    + main.js：整个项目的入口文件
        + 该js中因为引入的vuejs不完整，缺少模板解析器，所以使用了
            ```
            render(createElement){
                return ...
            }
            //参数createElement是一个函数，用来创建具体的元素

            //未使用this，所以可简写为箭头函数
            render: h => h(App)
            ```
+ public中：该文件夹相当于整个项目的根路径
    
## ref属性：
1. 给元素或子组件注册引用信息，代替id。
2. 在html标签中获取的是真实DOM元素，在组件标签中获取的是组件实例对象
3. 使用：
    添加：`<元素或组件名 ref="xxx">`
    使用：`this.$refs.xxx`
    
## props配置项：
+ 声明组件可接收的外部变量。
+ 声明方式：
    1、简单声明接收
    `props:['变量名', '变量名', ....]`
    2、接收时对数据进行类型限制
    ```
    props:{
        变量名: 类型,
        变量名: 类型,
        ....
    }
    ```
    3. 限制类型、必要性，指定默认值
    ```
    props:{
        变量名:{
            type：指定变量类型
            required：布尔值，指定是否是必要的
            default：指定默认值
        },
        ...
    }
    ```
+ 注意：
    1. props是只读的，优先级比data中的高。如要修改props中的内容，需要先复制props中需要修改的内容到data中，然后修改data中的数据。
    2. vue对props的监视是浅层的，如果对象中的属性值变了vue不会报错。
    3. v-model绑定的值不能是props传递的值，因为props是不可修改的。
    
## mixin配置项：
+ 多个组件共享的内容
+ 使用：
    + 局部混合：
        1. 先引入`import`共享的内容
        2. 配置mixin：
            `minxin:[引入的名字]`
    + 全局混合：
        + 在`main.js`中,先引入，再`Vue.mixin()`
+ 引入的内容若与原有内容重合，data、methods中的以原有内容为主，生命周期函数则都会使用，混合的先使用
    
## 插件：
+ 本质上是包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
+ 定义插件：
    ```
    对象.install = function (Vue, option){
        Vue.filter(...)
        Vue.directive(...)
        ....
    }
    ```
+ 使用插件：
    `Vue.use()`
    
## scoped属性：
+ 添加到style标签中可以限定样式仅在局部生效

## 父组件与子组件之间的通信：
+ 父组件给子组件传递函数等，子组件使用这些传递过来的东西实现与父组件的通信

## 组件自定义事件
+ 使用场景：
    + 子组件给父组件传数据，就要在父组件中给子组件绑定自定义事件，事件回调在父组件中
+ 第一种：
    1. 在子组件标签中用`v-on（简写@）`绑定自定义事件和触发函数（本质上是给vc添加了一个事件属性）
    2. 在子组件methods中使用 `this.$emit('自定义事件名', 参数)` 进行触发
+ 第二种（更灵活）：
    1. 在子组件标签中使用ref指定一个组件的标识（即可以通过该标识获取到对应组件的实例对象）
    2. 在父组件中，先在methods中定义触发的函数，再当挂载阶段时调用 `this.$refs.组件标识名.$on('自定义事件名', 触发的函数) `绑定自定义事件，其中on可变为once等实现不同效果
    3、在子组件methods中使用 `this.$emit('自定义事件名', 参数)` 进行触发
    
+ 注意：
    1. 两种方式本质上相同，都是给vc添加自定义事件属性，只是添加的形式不同。
    2. 谁触发的自定义事件，绑定的函数中this指向的就是谁的实例对象
    3. 即使组件绑定时使用的是原生事件名，默认也认为绑定的是自定义事件。需要添加修饰符.native来说明当前绑定的是原生事件。

+ 事件解绑：
    1. 解绑单个事件：
        `$off('事件名')`
    2. 解绑多个事件：
        `$off(['事件名', '事件名', ...])`
    3. 解绑所有事件：
        `$off()`

## 全局事件总线
+ 任意组件间通信
    + 保证所有组件都能使用
        + 通过 `vc.prototype.__proto__ = Vue.prototype` 实现
    + 可以使用`$emit`、`$off`、`$on`、`$once`
        + 通过将一个组件实例对象绑定到`Vue.prototype`上
     
    + ```
        //main.js中
        new Vue({
            ...
            beforeCreate(){
                //安装全局事件总线
                //x可变，一般是以$xxx命名，可以通过该项调用$on等
                Vue.prototype.x = this;
            }
        })
      ```
    + 在mounted钩子中进行事件绑定
    + 绑定的组件事件在用完后最好进行解绑


## 消息订阅与发布
+ 借助第三方库 pubsub-js
+ 一种组件间通信的方式，适用于任意组件间的通信
1. 订阅消息（需要数据方，绑定在mounted钩子中，订阅的回调留在该组件自身）
    + ```
        methods(){
            demo(msgName, data){...}
            //第一个参数不用时可以用_占位
        },
        mounted(){
            this.pid = pubsub.subscribe('消息名', this.demo)
            //因为调用了第三方库，直接写回调函数中会导致this指向不明确
            //可以将回调函数写成箭头函数，这样this就会指向vc，还可以省略在methods中的定义
        }
      ```
    + 返回值为一个id
    + 取消订阅（在beforeDestro钩子中进行）
        + `pubsub.unsubcribe(pid)` 
2. 发布消息（提供数据方）
    + `pubsub.publish('消息名', data)`

## 动画
+ 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名
+ 过程：
    + 进入
        + v-enter-active
            + v-enter => v-enter-to
        + v-leave-active
            + v-leave => v-leave-to
+ 写法：
    1. 准备好样式
        + 元素进入的样式：
            1. v-enter：进入的起点
            2. v-enter-active：进入过程中
            3. v-enter-to：进入的终点
        + 元素离开的样式：
            1. v-leave：离开的起点
            2. v-leave-active：离开过程中
            3. v-leave-to：离开的终点
    2. 使用 `<transition>` 包裹住要过度的元素，并配置 name 属性
+ 注意：
    + 若有多个元素要过度时，需要使用： `<transition-group>` ，且包裹住的每个元素都要指定 key 值。
    + 不一定要全用，如只要动画时可以只使用 `v-enter-active/v-leave-active`

## 获取input框event、焦点等问题
+ 事件的响应函数要获取event，需要在在调用时传入参数`$event`
+ 需求：input框先隐藏，当出现时自动获取焦点
    + 按一般逻辑在input框blur事件的响应函数中使用 `focus()` 是行不通的，因为Vue会在响应函数结束后才重新解析模板渲染页面，而input框在隐藏时获取焦点是无效的。
        +  要实现此需求，使用 `$nextTick(function)` 
            + nextTick指定的回调函数会在下一次DOM节点更新结束后再执行
        + 定时器也可以实现类似功能

## 解决跨域问题
+ 开发中前端发送请求时常用封装Ajax的第三方库，如jQuery、axios、fetch、vue-resource（vue的一个插件库）等
+ 使用代理服务器（一般与前端同源）：
    1. Nginx：后端使用
    2. vue-cli
        1. vue.config.js中开启代理服务器：
            ```
            devServer: {
                //url为后端服务器总地址，不包括接口
                proxy: 'url',
            }
            //配置后需要重新启动项目
            ```
            + 请求时使用项目自身url + 想要获取的内容所在接口
            + 当请求的文件本身就有（即public中存在同名文件）时，优先使用本身的。
            + 缺点：
                1. 一次只能配置一个代理
                2. 不能控制使不使用代理服务器
        2. vue.config.js中开启代理服务器：
            ```
            devServer: {
                proxy: {
                    //请求前缀api（可以自定义），控制是否使用代理，使用的话加上在端口号后加上/api/
                    //使用多个代理时，更换前缀即可
                    '/api': {
                        //请求后端的根地址
                        target: '<url>',
                        //转发请求时去掉添加的前缀/api
                        pathRewrite:{'^/api':''},
                        //支持websocket
                        ws: true,
                        //为真时，后端服务器获取到的是代理服务器伪装的后端服务器地址；为假时，后端服务器看到的是代理服务器自身的真实地址
                        //默认为真
                        changeOrigin: true
                    },
                    //
                    '/foo': {
                        target: '<other_url>'
                    }
                }
            }
            ```
+ vue-resource
    + 对xhr的封装，是vue的一个插件库，通过在main.js中使用`Vue.use(...)`使用
    + 用法与axios基本类似。
    + vue1.0时大量使用

## 插槽
+ 让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式
+ 默认插槽
    + 子组件中在`<slot></slot>`中的内容会作为默认内容，当父组件在使用子组件时传递了值就会覆盖默认值
+ 具名插槽
    + 子组件中为slot标签指定`name`属性值，未使用`name`的会隐式地命名为"dafault"。父组件在对应子组件中对想要插入插槽的html标签指定相同的`slot`属性值。
    + 其中仅在`<template></template>`中时`slot="xxx"`可简写为`v-slot:xxx`
+ 作用域插槽
    + 实现数据的逆向传递，进而满足同一个组件根据不同的使用者实现不同的结构效果
    + slot标签中使用`v-on`绑定的数据会传递给父组件
        + 但要求父组件中要插入的内容必须用`template标签`包裹，且`template标签`中使用`scope`或`slot-scope`属性，属性值指定为插槽绑定数据时的命名

## Vuex
+ 专门在Vue中实现集中式状态（数据）管理的一个Vue插件，对Vue应用中多个组件的共享状态进行集中式管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。
+ 使用时机：
    1. 多个组件依赖同一状态
    2. 来自不同组件的行为需要变更同一状态
+ 详解：
    + 三个组成：都是对象
        1. Actions；一般是有网络请求等方面的动作
        2. Mutations
        3. State
    + 都要经过 store 的管理
+ 环境搭建：
    1. main.js 中引入并 Vue.use (vue2对应vuex3版本)
    2. 添加 store 配置项到vm、vc中
        ```
        // 新建./store/index.js
        //index.js 文件内容

            // 引入vuex
            import Vuex from 'vuex'

            // 用于响应组件中的动作
            const actions = {}
            // 用于操作数据state
            const mutations = {}
            // 用于存储数据
            const state = {}
            // 创建并暴露store
            export default new Vuex.Store({
                actions,
                mutations,
                state
            })
        
        // main.js 中引入store，要在使用vuex之后。
        // 但仅调整顺序是没用的，因为解析时会先解析所有的 import 语句
        // 为了解决该问题，应该在 index.js 文件中就引入vue、vuex并使用vuex

        //在main.js 的Vue对象中添加store属性
            new Vue({
            ...
            store,
            }).$mount('#app')
        ```
+ 使用：
    + 在三个组成的对象中添加需要的内容
    + 组件通过dispatch来使用相应动作
    + 组件也可以通过commit来直接操作数据
+ 其他组成部分：
    + getters：用于将state中的数据进行加工处理
        ```
        getters:{
            加工数据的函数(state){
                return ...
            }
        }
        ```
    + mapState：是一个函数，用于将state中的数据映射为计算属性
        + 参数：
            + 一个对象，保存自定义名（不带''）和state中对应数据名（是字符串，要带''）的键值对
        + 写法：
            1. 对象写法
                ```
                //先引入mapState
                //使用实例
                computed:{
                    // 此处使用了es6语法，将mapState返回的对象展开放入computed中
                    //xxx_1用于返回到computed中，xxx_2用于在state中寻找
                    ...mapState({xxx_1:'xxx_2', ...})
                }
                ```
            2. 数组写法
                ```
                computed:{
                    //相当于对象写法的简写形式，xxx两种用途
                    ...mapState(['xxx', ...])
                }
                ```
    + mapGetters：是一个函数，用于将getters中的数据映射为计算属性
        + 参数：
            + 一个对象，保存自定义名（不带''）和getters中对应数据名（是字符串，要带''）的键值对
        + 写法：
            1. 对象写法
                ```
                //先引入mapGetters
                //使用实例
                computed:{
                    // 此处使用了es6语法，将mapGetters返回的对象展开放入computed中
                    //xxx_1用于返回到computed中，xxx_2用于在getters中寻找
                    ...mapGetters({xxx_1:'xxx_2', ...})
                }
                ```
            2. 数组写法
                ```
                computed:{
                    //相当于对象写法的简写形式，xxx两种用途
                    ...mapGetters(['xxx', ...])
                }
                ```
    + mapActions：是一个函数，用于生成actions中对应的方法，会自动调用dipatch去联系actions
        + 参数：
            + 一个对象，保存自定义名（不带''）和actions中对应函数名（是字符串，要带''）的键值对
        + 写法：
            1. 对象写法
                ```
                //先引入mapActions
                //使用实例
                methods:{
                    // 此处使用了es6语法，将mapActions返回的对象展开放入methods中
                    //xxx_1用于返回到methods中，xxx_2用于在actions中寻找
                    ...mapActions({xxx_1:'xxx_2', ...})
                }
                ```
            2. 数组写法
                ```
                methods:{
                    //相当于对象写法的简写形式，xxx两种用途
                    ...mapActions(['xxx', ...])
                }
                ```
        + 使用该函数时需要在绑定事件时传递参数
    + mapMutations：是一个函数，用于生成mutations中对应的方法，会自动调用commit去联系mutation
        + 参数：
            + 一个对象，保存自定义名（不带''）和mutations中对应函数名（是字符串，要带''）的键值对
        + 写法：
            1. 对象写法
                ```
                //先引入mapMutations
                //使用实例
                methods:{
                    // 此处使用了es6语法，将mapMutations返回的对象展开放入methods中
                    //xxx_1用于返回到methods中，xxx_2用于在mutations中寻找
                    ...mapMutations({xxx_1:'xxx_2', ...})
                }
                ```
            2. 数组写法
                ```
                methods:{
                    //相当于对象写法的简写形式，xxx两种用途
                    ...mapMutations(['xxx', ...])
                }
                ```
        + 使用该函数时需要在绑定事件时传递参数
+ 可以借助vuex实现多组件数据共享（即所有共享数据存在state中）
+ vuex模块化+namespace
    + 目的：让代码更好维护，让多种数据分类更加明确
    + 使用
        1. 定义多组actions、mutations、state、getters的配置
        2. 额外给各组添加额外配置项`namespaced:true`
            + 此时就可以通过`mapState、、mapGetters、mapActions、mapMutations`的第一个参数指定第二个参数所属的分类
        3. 引入时加入`modules`配置项，配置项中写上面定义的多组配置的名称（可以给这些名称添加名字，如`a:配置命名`。也可以简写，如`配置命名`）
    + 不使用`mapState、、mapGetters、mapActions、mapMutations`时的问题：
        + `state`相关的数据，在使用时更加精确地指定所属的分类
        + `actions、mutations`相关的函数，在使用`commit、dispatch`时在函数名前添加所属分类。`commit('所属分类名/函数名', 要传递的参数)`、`dispatch('所属分类名/函数名', 要传递的参数)`
        + `getters`相关操作，在封装时的key值设置为了`所属分类/自定义函数名`，故在使用时就使用`所属分类/自定义函数名`来获取getters中对应的值

## 路由vue-router
+ 一个插件库
+ 实现SPA（single page web application）单页面应用
    + 整个应用只有一个完整的页面
    + 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
    + 数据要通过Ajax请求获取
+ 路由的理解：
    + 一个路由就是一组key-value映射关系
    + key对应路径，value对应function或component
+ 分类：
    1. 后端路由：
        + value是function，用于处理客户端的请求
        + 当服务端收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
    2. 前端路由：
        + value是component，用于展示页面内容
        + 当浏览器的路径改变时，显示对应的组件
+ 使用：
    1. 安装vue-router
    2. 创建一个router文件夹（类似于vuex），在index.js进行整个路由的配置
        ```
        // 示例

        // 专门用于创建整个应用的路由器
        // 引入库
        import VueRouter from "vue-router";
        // 引入需要的组件
        import About from "../components/About";
        import Home from "../components/Home";

        // 创建并暴露路由
        export default new VueRouter({
            // 配置路由
            routes:[
                {
                    // 自定义路径名
                    path:'/about',
                    // 对应的组件
                    component:About   
                },
                {
                    path:'/home',
                    component:Home
                },
            ]
        })
        ```
    3. 在main.js中引入VueRouter（需要use一下）和自定义的router（需要添加到vm上）
    4. 通过标签`<router-link to="路由中配置的路径"></router-link>`实现跳转，通过标签`<router-view></router-view>`实现对应组件的显示
+ 组件分类：
    1. 一般组件
    2. 路由组件
        + 靠路由进行渲染的组件
        + 为了区分，一般存放在pages文件夹中
        + 不显示的路由组件是被销毁了而非被隐藏了，需要时再进行挂载
        + vc多了两项，`$route`（该组件对应的路由配置）和`$router`（整个应用的路由）
+ 多级路由：
    + 在一个配置对象中添加`children`配置项（是一个数组）
    + 一级路由的路径加`\`，子路由不加`\`
        ```
        // 示例

        {
            path:'/home',
            component:Home,
            // 多级路由的配置
            children:[
                {
                    // 路径前不加 / 
                    path:'about',
                    component:About
                },                
            ]
        },
        ```
+ 路由命名：
    + 作用：简化路由的跳转（一般用在多级路由中）
    + roter中通过`name:'xxx'`来初始化每个路由的名字
    + 使用：在 to 属性中指定`name:'xxx'`来使用
+ 路由传参：
    1. query参数：
        + to 属性的路径后通过 ? 传递（类似于url）
        + 调转并携带query参数
            + to的字符串写法
                ```
                :to="`/.../...?${参数}`"
                ```
            + to的对象写法
                ```
                :to="{
                    path:'/.../...',
                    query:{
                        // 要传递的参数
                        ...
                    }
                }"
                ```
        + 使用参数：
             `$route.query.参数名` 
    2. params参数：
        + 写法：
            + 传递路径时直接携带：`to="/路径/路径/.../参数/参数"`
            + 但要在配置对应路由的 path 时使用占位符`path:'/路径/路径/.../:占位参数名/:占位参数名'`
            + to使用对象写法时，必须使用name，不能使用path
+ props配置：
    + 写法；
        1. 值为对象（为死数据）：
            ```
            props:{
                ....
            }
            ```
        2. 值为布尔值：
            + 布尔值为真时，会将该路由组件收到的所有params参数以props的形式传给组件
            `props:true`
        3. 值为函数：
            + 函数返回值以props形式传给组件
            + 参数为`$route`
+ replace属性：
    + `route-link`默认（push操作）会保留历史记录
    + 使用该属性会替换最近一次历史记录，不保留
+ 编程式路由导航：
    + 不借助`route-link`实现路由跳转
    + 使用`$router`上的`push、replace、back、forward、go`来实现
        + `push、replace`的参数就是to属性中的对象内容
        + `back、forward`实现前进和后退功能
        + `go`中的参数为正时，前进；为负时，后退
+ 缓存路由组件：
    + 让不展示的路由组件保持挂载不被销毁
        ```
        <keep-alive include="路由名">
            <router-view></router-view>
        </keep-alive>
        ```
    + include的属性值还可以为一个多个路由名组成的数组
    + 路由独有的生命周期钩子：缓存的路由组件不会触发销毁流程
        + 由此出现两个路由独有的生命周期钩子
        + activated
            + 组件被激活时触发
        + deactivated
            + 组件失活时触发
+ 路由守卫：
    + 用于配置权限
    + 路由配置中还提供了一个`meta`属性对象，去可以在其中存放一些自定义数据，可以在路由守卫中进行调用
    + 分类：
        + 全局守卫：
            + 全局前置路由守卫：
                ```
                // 每次路由切换前调用
                router.beforeEach((to, from, next) => {
                    ...
                })
                ```
                + `router.beforeEach`指定的回调函数有3个参数
                    1. to 为一个对象，表示将要去的路由
                    2. from 为一个对象，表示跳转的出发路由
                    3. next 为一个函数，表示执行跳转动作
            + 全局后置路由守卫：
                ```
                // 每次路由切换后调用
                router.afterEach((to, from) => {
                    ...
                })
                ```
                + `router.afterEach`指定的回调函数有2个参数
                    1. to 为一个对象，表示将要去的路由
                    2. from 为一个对象，表示跳转的出发路由
        + 独享守卫：
            + 为某个路由独享的，在每个路由中进行配置
            + 只有前置，没有后置，参数为3个
        + 组件内守卫：
            + 组件内定义，通过路由规则 进入或离开 该组件时调用
            + beforeRouteEnter
                + 进入组件时调用
                + 参数为3个
            + beforeRouteLeave
                + 离开组件时调用
                + 参数为3个
+ 工作模式：
    + 通过`mode`属性配置
    1. hash模式
        + 默认开启的模式
        + 路径中存在/#/
        + 兼容性好
    2. history模式
        + 路径中不存在/#/
        + 兼容性略差
        + 应用部署上线时需要后端人员的支持，解决刷新新页面404的问题

## 项目打包
+ `npm run build`
+ 打包后产生的需要在服务器中进行部署
+ 如果路由使用 history 模式，当路由跳转后刷新会访问不到因为 history 模式将个路由组件当做了静态资源，使用 hash 模式不会出现此问题。
    + 可以在后端进行处理，使得 history 模式刷新后也能正常使用
        + 使用插件 connect-history-api-fallback
        + 使用 Nginx

## Vue UI组件库
+ 移动端常用UI组件库：
    1. [Vant](https://youzan.github.io/vant)
    2. [Cube UI](https://didi.github.io/cube-ui)
    3. [Mint UI](https://mint-ui.github.io)
+ PC端常用UI组件库
    1. [Element UI](https://element.eleme.cn)
    2. [IView UI](https://www.iviewui.com)

# Vue3