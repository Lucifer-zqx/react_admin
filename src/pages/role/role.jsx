import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd'
import { reqRoles } from '../../api/ajax'
import { PAGE_SIZE } from '../../utils/constant'
export default class Role extends Component {

    state = {
        roles: []
    }
    //初始行数据
    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            }
        ]
    }

    //获取角色列表
    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({ roles })
        } else {
            message.error("请求出错")
        }
    }

    //行被选中
    onRow = (event) =>{
        console.log("onRow()")
    }

    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        //card标题
        const title = <span><Button type="primary">创建角色</Button>&nbsp;<Button type="primary" disabled>设置角色权限</Button></span>

        //取出状态数据
        const { roles } = this.state
        return (
            <Card title={title}>
                <Table
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                    }}
                    rowKey="_id"
                    rowSelection={{
                        type: 'radio',
                    }}
                    onRow={record => {
                        return {
                            onClick: event => this.onRow, // 点击行
                        }
                    }}
                    bordered

                />


            </Card>
        )
    }
}
