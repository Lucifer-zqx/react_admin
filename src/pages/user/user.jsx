import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import LinkButton from "../../components/link-button"
import { reqUsers, reqDeleteUser, reqAddUser ,reqUpdateUser} from '../../api/ajax'
import { PAGE_SIZE } from '../../utils/constant'
import DateUtils from '../../utils/dateUtils'
import AddUpdateRole from "./add-update-role";
export default class User extends Component {

    state = {
        uses: [],
        visible: 0,
    }
    initColumn = () => {
        this.column = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: DateUtils
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => this.roleMenu[role_id]
            },
            {
                title: '操作',
                dataIndex: '',
                render: user =>
                    <span>
                        <LinkButton onClick={() => this.showUpdateUser(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>

            },
        ]
    }

    deletUser = async () => {
        const result = await reqDeleteUser(this.user._id)
        if (result.status === 0) {
            message.success("删除用户成功")
            this.setState({ visible: 0 })
            this.getUsers()
        } else {
            message.error("删除用户失败")
        }

    }

    addOrUpdateUser = () => {
        //因为组件经过高级组件的包装，可以直接通过锚点的getForm方法拿到form属性
        this.form = this.addUpdateNode.getForm()
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //收集数据,就是表单数据
                //发送请求
                let result
                if (this.user) {
                    values._id=this.user._id
                    result = await reqUpdateUser(values)
                } else {
                    result = await reqAddUser(values)
                }
                this.form.resetFields()
                //更新状态
                if (result.status === 0) {
                    const user = result.data
                    this.setState({ users: [...this.state.users, user], visible: 0 })
                } else {
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdateUser = user => {
        this.user = user
        this.setState({ visible: 2 })
    }

    deleteUser = user => {
        Modal.confirm(
            {
                title: `您确定要删除${user.username}吗？`,
                onOk() {
                    reqDeleteUser(user._id)
                    this.getUsers()
                }
            }
        )
    }

    generateRoleMenu = roles => {
        this.roleMenu = roles.reduce((pre, c) => {
            pre[c._id] = c.name
            return pre
        }, {})
    }

    getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
            this.generateRoleMenu(roles)
            this.setState({ users })
        }
    }

    hideModal = () => {
        //自己去拿form，这样就不依赖点击确认后靠this.form了
        this.addUpdateNode.getForm().resetFields()
        this.setState({ visible: 0 })
    }

    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {
        const { users, visible } = this.state
        return (
            <Card title={
                <Button type="primary"
                    onClick={() => {
                        this.setState({ visible: 2 })
                        this.user=null
                    }}>创建用户</Button>
            }>
                <Table
                    dataSource={users}
                    columns={this.column}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize: PAGE_SIZE
                    }}
                />

                <Modal
                    title={this.user ? "修改用户" : '添加用户'}
                    visible={visible === 2 ? true : false}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <AddUpdateRole ref={c => this.addUpdateNode = c} roleMenu={this.roleMenu} user={this.user} />
                </Modal>
            </Card>
        )
    }
}
