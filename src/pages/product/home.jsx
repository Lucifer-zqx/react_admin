import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Select,
    Input
} from "antd"
import LinkButton from '../../components/link-button'
import { reqProducts, reqProductsByKeyword ,reqUpdateStatus} from '../../api/ajax'
import { PAGE_SIZE } from '../../utils/constant'

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        products: [],
        total: 0,
        productKeyword: '',
        searchType: 'productName',
        searchFlag: 0
    }
    /**
     * 初始化行
     */
    initialColumn = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: price => "￥" + price
            },
            {
                title: '状态',
                width: 100,
                render: product =>
                    <span>
                        <Button 
                        type="primary" 
                        onClick={()=>{
                            reqUpdateStatus(product._id,product.status === 1?2:1)
                            this.getProducts(this.pageNum)}}>
                        {product.status === 1?'下架':'上架'}
                        </Button>
                        <span>{product.status === 1?'在售':'已下架'}</span>
                    </span>

            },
            {
                title: '操作',
                width: 100,
                render: product =>
                    <span>
                        {/* 调用history的push方法的第二个参数传递 */}
                        <LinkButton onClick={()=> this.props.history.push('/product/detail',product)}>详情</LinkButton>
                        <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                    </span>

            },
        ]
    }
    /**
     * 获取商品分页数据
     */

    getProducts = async (pageNum = 1, pageSize = PAGE_SIZE) => {
        const {productKeyword,searchType,searchFlag} = this.state
        let result
        // 判断请求是哪种查询
        //这里的searchflag是为了解决，虽然在关键词框输入了内容，但是并没有点击搜索，
        //此时却不想按关键词搜索了，直接翻页，不会按照关键词搜索
        this.pageNum = pageNum
        if(searchFlag === 1){
            //按关键字查询
            result = await reqProductsByKeyword({pageNum,pageSize,searchType,productKeyword})
        }else{
            //无条件查询
            result = await reqProducts(pageNum, pageSize)
        }

        
        
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({ products: list, total })
        }
    }

    /**
     * 翻页操作函数
     */
    jumpToPage = (page, _) => {
        this.getProducts(page)
    }


    UNSAFE_componentWillMount() {
        this.initialColumn()
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        //状态数据
        const { products, total, searchType } = this.state

        //card标题和副标题
        const title = <span>
            <Select
                defaultValue={searchType}
                onChange={value => this.setState({ searchType: value })}
            >
                <Option value="productName">按名称查询</Option>
                <Option value="productDesc">按描述查询</Option>
            </Select>
            <Input
                placeholder="关键字"
                style={{ width: 150, margin: '0 10px' }}
                onChange={e => this.setState({ productKeyword: e.target.value })}
            />
            <Button icon="search" type="primary" onClick={
                () => {
                    this.setState({ searchFlag: 1 },()=>{
                        this.getProducts()
                    })
                }
            }>查询</Button>
        </span>
        const extra = <Button type='primary' icon="plus" onClick={()=>this.props.history.push('/product/addupdate')}>添加</Button>


        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={products}
                    columns={this.columns}
                    rowKey='_id'
                    pagination={
                        {
                            current:this.pageNum,
                            total,
                            defaultPageSize: PAGE_SIZE,
                            onChange: this.jumpToPage,
                            showQuickJumper: true
                        }}
                >
                </Table>
            </Card>
        )
    }
}
