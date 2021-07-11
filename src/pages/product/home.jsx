import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Select,
    Input
} from "antd"
import LinkButton from '../../components/link-button'
import { reqProducts, reqProductsByKeyword } from '../../api/ajax'
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
                dataIndex: 'status',
                render: status =>
                    <span>
                        <Button type="primary">下架</Button>
                        <span>在售</span>
                    </span>

            },
            {
                title: '操作',
                width: 100,
                render: product =>
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
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
        const extra = <Button type='primary' icon="plus">添加</Button>


        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={products}
                    columns={this.columns}
                    rowKey='_id'
                    pagination={
                        {
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
