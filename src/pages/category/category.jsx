import React, { Component } from 'react'
import { Card, Button, Table,Icon, message } from 'antd'
import LinkButton from "../../components/link-button"
import { reqCategorys } from '../../api/ajax'

export default class Category extends Component {

    state = {
        categorys: [],
        parentId: '0', //父分类的id
        parentName: '', //父分类名称
        loading: false,
        subCategorys: []
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
                render: (category) => this.state.parentId === "0" ?(<span>
                    <LinkButton>修改分类</LinkButton>
                    <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton></span>) :(<span>
                    <LinkButton>修改分类</LinkButton></span>)
            },
        ]
    }

    /*
        查询分类数据：一级列表/二级子列表
    */
    getCategorys = async() => {
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
            }else{
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
            },()=>{
                this.getCategorys()
            }
        )
    }

    /**
     * 回到一级列表
     */
    returnFirstPage = ()=>{
        this.setState({parentId:'0'})
    }


    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getCategorys()
    }



    render() {
        //状态数据
        const { categorys, loading ,subCategorys,parentId,parentName} = this.state
                    
        const categoryTitle = parentName?(<span><LinkButton onClick={this.returnFirstPage}>一级分类列表</LinkButton><Icon type="arrow-right" style={{marginRight:12}}/>{parentName}</span>):'一级分类列表'

        

        return (
            <Card title={categoryTitle} extra={<Button type='primary' icon="plus">添加</Button>} >
                <Table dataSource={parentId==='0' ? categorys:subCategorys} columns={this.columns}
                    rowKey='_id'
                    pagination={
                        {
                            defaultPageSize: 5,
                            showQuickJumper: true
                        }
                    }
                    loading={loading}
                />
            </Card>
        )
    }
}
