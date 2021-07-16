# react后台管理项目

## 项目结构
1. 导航栏
   1. 首页
   2. 商品
   3. 用户
   4. 角色
   5. 图标
2. 头部
3. 内容区
4. 底部

### 整体布局采用antd的layout布局

## 各组件的技术问题以及解决方案
1. ### 导航栏
    - 生成导航栏所需要的样式结构：采用数组的map或者reduce方法。拥有子列表的菜单，需要二次递归调用生成列表的方法
    - 二级子路由与当前路径不匹配，导致选不中的问题，可以用indexof判断二级路由路径是否含有匹配的路径
    - selectedKey 和 openkey的问题，刷新时选中丢失

2. ### 头部
    - 时间和天气显示：定时器和ajax请求放在componentDidMount这个钩子下，定时器在组件卸载之前要记得关闭
    - 登录以及保存用户信息，采用的是：1.放在内存中（写一个外部文件用来存储用户信息）2.localStorage（采用的是一个store.js这个库文件）（这两个utils用来判断登录的逻辑）
    - **头部导航信息随lefNav的选择变化**  如果当前 ` this.props.location.pathname ` 与menuconfig的某项路径匹配，就取出该配置路径的title显示
    - 样式的小三角的绘制：用伪元素 
    (```)
    &::after{
                position: absolute;
                content: '';
                border-top: 20px solid white;
                border-right: 20px solid transparent;
                border-bottom: 20px solid transparent;
                border-left: 20px solid transparent;
                top: 100%;
                right:50%;
                transform: translateX(50%);
            }
    (```)

3. ### 分类管理
    - 制作拥有超链接效果的button
    - 添加功能：点击添加是一个模态框套一个form。父组件category向子组件addform通过props传递参数，
       1. 子组件通过调用父组件传递过来的方法，将自己的this.props.form这个属性（状态）传递给父组件。
       2. 或者可以通过给子组件打ref锚点的方法，获取子组件操作自身方法的ref，然后调用子组件提供给外部调用的接口函数，将自己的状态或者属性交出去。
    - setState是异步的，获取二级子列表时，应该在回调中设置好，parentId后，在发请求
        (```)
        this.setState({},()=>{
            //发请求
        })
        (```)

4. ### 商品管理
    - 调用this.props.history.push/repalce('路径',[参数])，第二个参数当传递的时候，在this.props.location.state中找到这个参数
    - antd表格的行数据可以传递一个jsx风格的代码，用render属性来渲染，render的是一个函数，他默认传递参数就是dataIndex，当dataIndex不写时，默认传递该行所用的对象
    - 分页：后台分页，后台返回的数据有：total（总记录条数），和当前页的数据，这样就能显示一共有多少页，前台用pagination这个Table的属性来进行分页。
    - addUpdate组件的使用，统一发请求Promise.all(req1,req2).返回是一个promise对象，结果是两个请求的promise结果的数组
    - 级联列表显示Cascader
    - Upload组件上传文件PictureWall   （关键函数handleChange）
    - 富文本编辑器 react-draft-wysiwyg库的使用  看docs

5. ### 角色管理
    - antd的Table组件的属性 onRow 和 rowSelection 属性
    - antd的Tree组件的属性 onCheck 和 ChechedKeys
    - 父组件每次渲染时，都会重新给子组件传递props参数，但是子组件因为在第一次渲染时，就需要数据所以在ComponentWillMount钩子中将参数先拿到用了，但是当更新后，新的props父组件已经传递给了子组件，但是子组件却没有拿到，这个场景最适合这个钩子UNSAFE_componentWillMount（nextProps）{},第二次传递参数时调用。

6. ### 用户管理
    - jsx遍历对象成数组的方法：Oject.keys()得到对象属性名数组后，在map遍历
    - ref对象什么时候可以拿到？只有在真实Dom渲染完成后    

7. ### 权限管理
    - 通过控制用户能否看到某些标签来鉴权，如果用户的role数组中含有menulist的某个key，就说明，拥有该权限
    - 数组的indexOf方法 arr.indexOf(element),返回元素所在的下标，没有就返回-1（有些遗忘）

8. ### 3个bug
    - 角色管理的radio选不中的问题 通过配置rowSelection的onSelect属性解决
    - 商品添加的富文本编辑器，当为点击富文本编辑器输入框，直接提交出现getCurrentContent()库内置函数不是一个函数问题，通过type这个函数，只有当这个属性是函数才调用
    - 商品搜索，当在非第一页搜索时，页面跳转到第一页，但是分页的page，不改变的情况。通过配置pagination的current来解决