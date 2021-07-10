import React, { Component } from 'react'
import { Card, Button, Table, Icon, Modal, message } from 'antd'
import LinkButton from "../../components/link-button"
import UpdateForm from './update-form'
import AddForm from './add-form'
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api/ajax'

export default class Category extends Component {

    state = {
        categorys: [],
        parentId: '0', //父分类的id
        parentName: '', //父分类名称
        loading: false,
        subCategorys: [],
        visible: 0
    }

    /*
        初始化行数据
    */
    initColumn = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                width: 300,
                render: (category) => this.state.parentId === "0" ? (<span>
                    <LinkButton onClick={() => this.showUpdateModal(category)}>修改分类</LinkButton>
                    <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton></span>) : (<span>
                        <LinkButton onClick={() => this.showUpdateModal(category)}>修改分类</LinkButton></span>)
            },
        ]
    }

    /*
        查询分类数据：一级列表/二级子列表
    */
    getCategorys = async (parentId) => {
        debugger
        this.setState({ loading: true })
        parentId = parentId || this.state.parentId
        const result = await reqCategorys(parentId)
        this.setState({ loading: false })
        if (result.status === 0) {
            if (parentId === '0') {
                const categorys = result.data
                this.setState({
                    categorys
                })
            } else {
                const categorys = result.data
                this.setState({
                    subCategorys: categorys
                })
            }


        } else {
            message.error("查询分类失败")
        }

    }

    /*
      异步展示二级子列表
    */
    showSubCategorys = (category) => {
        this.setState(
            {
                parentId: category._id,
                parentName: category.name
            }, () => {
                this.getCategorys()
            }
        )
    }

    /**
     * 回到一级列表
     */
    returnFirstPage = () => {
        this.setState({ parentId: '0' ,parentName:''}
        //解决在二级列表下添加一级列表，返回后不生效的问题
        // ,()=>{this.getCategorys()}
        )
    }

    /**
     * 关闭两个模态框
     */
    handleCancel = () => {
         //清除输入数据
        this.form.resetFields()
        this.setState({ visible: 0 })
    }

    /**
     * 展示添加的模态框
     */
    showAddMoadl = () => {
        this.setState({ visible: 1 })
    }

    /**
     * 展示修改的模态框
     */
    showUpdateModal = (category) => {
        this.category = category
        this.setState({ visible: 2 })
    }

    /**
     * 点击确定后的回调事件
     */
    handleOk = async (type) => {
        if (type === 'add') {
             //1.发送请求
             const{parentId,categoryName} = this.form.getFieldsValue()
             this.form.resetFields()
             const result  = await reqAddCategory(parentId,categoryName)
             if(result.status === 0){
                 //2.更新数据
                 //如果当前页面与要添加的页面不同，不更新parentId
                 if(parentId === this.state.parentId){
                    this.getCategorys()
                 }else if(parentId === '0'){
                     //解决在二级子列表下添加一级列表，返回后不生效的问题
                     //通过提前取得一级列表的内容，这样返回设置状态的异步问题就可以避免
                     this.getCategorys('0')
                 } 
                 //方法2，通过setState设置回调完成
                //  this.getCategorys()
                
                //3.关闭模态框
                this.setState({ visible: 0 })
             }
           
        } else if (type === 'update') {
            //1.发送请求
            const categoryId = this.category._id
            //一个重要知识点：子组件传递给父组件属性或方法，
            //通过父组件给其props传递一个方法，在子组件中调用这方法，来完成拿到子组件的一些属性或方法
            const categoryName = this.form.getFieldValue("categoryName")

            //清除输入数据
            this.form.resetFields()
            const result = await reqUpdateCategory({ categoryId, categoryName })

            if (result.status === 0) {
                //2.更新数据
                this.getCategorys()
                //3.关闭模态框
                this.setState({ visible: 0 })
            }

        }
    }


    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getCategorys()
    }



    render() {
        //状态数据
        const { categorys, loading, subCategorys, parentId, parentName, visible } = this.state
        //属性数据
        const category = this.category || {}  //空对象是防止未点击第一次渲染出错，因为此时category是undefined
        //头部数据显示
        const categoryTitle = parentName ? (<span><LinkButton onClick={this.returnFirstPage}>一级分类列表</LinkButton><Icon type="arrow-right" style={{ marginRight: 12 }} />{parentName}</span>) : '一级分类列表'



        return (
            <Card title={categoryTitle} extra={<Button type='primary' icon="plus" onClick={this.showAddMoadl}>添加</Button>} >
                <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={this.columns}
                    rowKey='_id'
                    pagination={
                        {
                            defaultPageSize: 5,
                            showQuickJumper: true
                        }
                    }
                    loading={loading}
                />

                <Modal
                    title="添加分类"
                    visible={visible === 1 ? true : false}
                    onOk={() => this.handleOk('add')}
                    onCancel={this.handleCancel}
                >
                    <AddForm parentId={parentId} categorys={categorys} rendFunc={(form) => this.form = form}/>
                </Modal>


                <Modal
                    title="更新分类"
                    visible={visible === 2 ? true : false}
                    onOk={() => this.handleOk('update')}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name} rendFunc={(form) => this.form = form} />
                </Modal>
            </Card>
        )
    }
}
