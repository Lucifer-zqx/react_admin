import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from "prop-types"
class AddRole extends Component {

    static propTypes={
        setForm :PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.setForm(this.props.form)
    }


    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <Form.Item
                label="角色名称"
                labelCol={{span:4}}
                wrapperCol={{span:15}}
                >
                    {
                        getFieldDecorator('roleName',
                            {
                                rules:[
                                    {required:true,message:"角色名称必须输入"}
                                ],
                                initialValue:''
                            }

                        )(
                            <Input placeholder="请输入要创建的角色"/>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(AddRole)
