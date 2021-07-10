import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types' 

const Item = Form.Item

class UpdateForm extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
        rendFunc:PropTypes.func.isRequired
    }

    UNSAFE_componentWillMount(){
        this.props.rendFunc(this.props.form)
    }

    
    render() {
        const { getFieldDecorator } = this.props.form       
        return (
            <Form>
                <Item>
                    {getFieldDecorator('categoryName',{
                        initialValue:this.props.categoryName,
                        rules:[
                            { required: true,message:"请输入修改后的分类"}
                        ]
                    })(
                        <Input placeholder="请输入修改后的分类" />
                    )}

                </Item>
            </Form>
        )
    }
}

export default Form.create()(UpdateForm)
