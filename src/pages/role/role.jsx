import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { reqRoles, reqAddRole ,reqUpdateAuthority} from '../../api/ajax'
import { PAGE_SIZE } from '../../utils/constant'
import AddRole from './add-role'
import UpdateRole from './update-role'
import memoryUtils from '../../utils/memoryUtils'
import dateUtils from '../../utils/dateUtils'
export default class Role extends Component {

    state = {
        roles: [],
        role: {},
        isShowAddModal: false,
        isUpdateAuthority:false
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
                render : dateUtils
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: dateUtils
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
    onRow = role => {
        return {
            onClick: event => {
                this.setState({ role })
            }
        }
    }

    //添加角色点击ok后的回调
    handleOk = () => {
        //表单校验
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //发请求
                const result = await reqAddRole(values)
                //取数据
                if (result.status === 0) {
                    // 更新状态隐藏模态框
                    //直接拿到状态数据，不必在重新发送请求去拿roles列表
                    this.setState({ roles: [...this.state.roles, result.data], isShowAddModal: false })
                    this.form.resetFields()
                    message.success('添加成功')
                } else {
                    message.error('添加失败')
                }


            }
        })

    }

    //设置权限角色点击ok后的回调
    handleUpdate = async ()=>{
        const menus = this.updateRoleNode.getState2Parent()
        const {role} = this.state
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        //发请求
        const result = await reqUpdateAuthority(role)
        if(result.status === 0){
            //关闭模态 、 更新数据
            this.setState({role:result.data,isUpdateAuthority:false})
            message.success("设置权限成功")
        }else{
            message.error("设置权限失败")
        }
        
    }

    //隐藏显示添加模态框
    handleCancel = () => {
        this.setState({ isShowAddModal: false })
        this.form.resetFields()
    }
    //隐藏显示更新模态框
    handleCancel2 = () => {
        this.setState({ isUpdateAuthority:false })
    }


    //添加按钮绑定事件
    showAddWindow = () => {
        this.setState({ isShowAddModal: true })
    }


    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        //取出状态数据
        const { roles, role, isShowAddModal,isUpdateAuthority } = this.state
        //card标题

        const title = <span>
                        <Button type="primary" onClick={this.showAddWindow}>创建角色</Button>&nbsp;
                        <Button type="primary" disabled={!role._id} onClick={()=>this.setState({isUpdateAuthority:true})}>设置角色权限</Button>
                      </span>

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
                        selectedRowKeys: [role._id]
                    }}
                    onRow={this.onRow}
                    bordered

                />
                {/* 添加模态框 */}
                <Modal
                    title="创建角色"
                    visible={isShowAddModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddRole setForm={form => this.form = form} />
                </Modal>


                <Modal
                    title="设置角色权限"
                    visible={isUpdateAuthority}
                    onOk={this.handleUpdate}
                    onCancel={this.handleCancel2}
                >
                    <UpdateRole role={role} ref={c => this.updateRoleNode = c}/>
                </Modal>

            </Card>

        )
    }
}
