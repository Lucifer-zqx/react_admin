import React, { Component } from 'react'
import { Form, Input ,Select} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

    static propTypes = {
        parentId:PropTypes.string.isRequired,
        categorys:PropTypes.array.isRequired,
        rendFunc:PropTypes.func.isRequired
    }
    
    UNSAFE_componentWillMount(){
        this.props.rendFunc(this.props.form)
    }
    
    render() {
        const { getFieldDecorator } = this.props.form
        const {parentId,categorys} = this.props
        return (
            <Form>
                所属分类：
                <Item>
                    {getFieldDecorator('parentId',{
                        initialValue:parentId
                    })(
                        
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                categorys.map(c=> <Option key={c._id} value={c._id}>{c.name}</Option>)
                            }
                        </Select>
                    )}

                </Item>
                分类名称：
                <Item>
                    {getFieldDecorator('categoryName',{
                        initialValue:this.props.categoryName,
                        rules:[
                            { required: true,message:"请输入需要添加的分类"}
                        ]
                    })(
                        <Input placeholder="请输入要添加的分类" />
                    )}

                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm)

