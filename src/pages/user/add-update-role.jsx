import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from "prop-types";
const Item = Form.Item
const Option = Select.Option
class AddUpdateRole extends Component {

    static propTypes = {
        roleMenu: PropTypes.object.isRequired,
        user: PropTypes.object
    }


    render() {
        const { getFieldDecorator } = this.props.form
        const { roleMenu } = this.props
        const user = this.props.user || {}
        const layout = { labelCol: { span: 4 }, wrapperCol: { span: 15 } }
        return (
            <Form>
                <Item
                    label="用户名"
                    {...layout}
                >
                    {
                        getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名必须输入' }
                            ],
                            initialValue: user.username
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>
                {
                    user._id ? null : <Item
                        label="密码"
                        {...layout}
                    >
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '密码必须输入' }
                                ],
                                initialValue: user.password
                            })(
                                <Input placeholder='请输入密码' />
                            )
                        }
                    </Item>
                }
                <Item
                    label="手机号"
                    {...layout}
                >
                    {
                        getFieldDecorator('phone', {
                            initialValue: user.phone
                        })(
                            <Input />
                        )
                    }
                </Item>
                <Item
                    label="邮箱"
                    {...layout}
                >
                    {
                        getFieldDecorator('email', {
                            initialValue: user.email
                        })(
                            <Input />
                        )
                    }
                </Item>
                <Item
                    label="角色"
                    {...layout}
                >
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id
                        })(
                            <Select >
                                {
                                    Object.keys(roleMenu).map(c => {
                                        return <Option key={c} value={c}>{roleMenu[c]}</Option>
                                    })
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddUpdateRole)