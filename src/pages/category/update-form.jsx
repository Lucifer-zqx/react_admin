import React, { Component } from 'react'
import { Form, Input } from 'antd'

const Item = Form.Item

class UpdateForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    {getFieldDecorator('categoryName',{
                        initialValue:this.props.categoryName
                    })(
                        <Input placeholder="请输入修改后的分类" />
                    )}

                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)
