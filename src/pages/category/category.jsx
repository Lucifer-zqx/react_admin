import React, { Component } from 'react'
import { Card, Button, Table, Icon,Modal, message } from 'antd'
import LinkButton from "../../components/link-button"
import UpdateForm from './update-form'
import { reqCategorys,reqUpdateCategory,reqAddCategory } from '../../api/ajax'

export default class Category extends Component {

    state = {
        categorys: [],
        parentId: '0', //父分类的id
        parentName: '', //父分类名称
        loading: false,
        subCategorys: [],
        visible:0
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
                    <LinkButton onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton>
                    <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton></span>) : (<span>
                        <LinkButton onClick={()=>this.showUpdateModal(category)}>修改分类</LinkButton></span>)
            },
        ]
    }

    /*
        查询分类数据：一级列表/二级子列表
    */
    getCategorys = async () => {
        this.setState({ loading: true })
        const { parentId } = this.state
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
        this.setState({ parentId: '0' })
    }

    /**
     * 关闭两个模态框
     */
     handleCancel = ()=>{
         this.setState({visible:0})
     }

     /**
      * 展示添加的模态框
      */
      showAddMoadl = ()=>{
          this.setState({visible:1})
      }

      /**
       * 展示修改的模态框
       */
       showUpdateModal =(category)=>{
           this.category = category
           this.setState({visible:2})
       }

       /**
        * 点击确定后的回调事件
        */
        handleOk = (type)=>{
            if(type === 'add'){
                console.log("11111")
            }else if(type === 'update'){
                //1.发送请求
                reqUpdateCategory(parentId,categoryName)
                //2.更新数据
                this.getCategorys()
                //3.关闭模态框
                this.setState({visible:0})
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
        const { categorys, loading, subCategorys, parentId, parentName,visible } = this.state
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
                    visible={visible===1?true:false}
                    onOk={()=>this.handleOk('add')}
                    onCancel={this.handleCancel}
                >
                    <p>添加的模态框</p>
                </Modal>


                <Modal
                    title="更新分类"
                    visible={visible===2?true:false}
                    onOk={()=>this.handleOk('update')}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={category.name}/>
                </Modal>
            </Card>
        )
    }
}
