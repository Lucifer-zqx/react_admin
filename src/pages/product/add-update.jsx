import React, { Component } from 'react'
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    message,
    Cascader
}
    from 'antd'

import LinkButton from "../../components/link-button"
const Item = Form.Item
const { TextArea } = Input;

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
]
class AddUpdate extends Component {
    state = {
        options
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            console.log(1111)
            targetOption.children = [
                {
                    label: `${targetOption.label}`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label}`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 2000)
    }

    //提交表单
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success("提交成功")
            } else {
                message.error("请检查表单内容")
            }
        });
    }

    //自定义校验规则
    validatePrice = (rule, value, callback) => {
        if (value <= 0) {
            callback("您输入的价格有误")
        } else {
            callback()
        }
    }
    render() {
        //card标题
        const title =
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span style={{ marginLeft: 12 }}>添加商品</span>
            </span>
        //form表单样式
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }
        //
        const { getFieldDecorator } = this.props.form

        return (
            <Card title={title}>
                <Form>
                    <Item label="商品名称" {...layout}>
                        {getFieldDecorator('name',
                            {
                                rules: [
                                    { required: true, message: "商品名称必须输入" }
                                ]
                            }
                        )(
                            <Input placeholder="请输入商品名称" />
                        )}
                    </Item>
                    <Item label="商品描述" {...layout}>
                        {getFieldDecorator('desc',
                            {
                                rules: [
                                    { required: true, message: "商品描述必须输入" }
                                ]
                            }
                        )(
                            <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 1, maxRows: 5 }} />
                        )}

                    </Item>
                    <Item label="商品价格" {...layout}>
                        {getFieldDecorator('price',
                            {
                                rules: [
                                    { required: true, message: "商品价格必须输入" },
                                    { validator: this.validatePrice }
                                ]
                            }
                        )(
                            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
                        )}

                    </Item>
                    <Item label="商品分类" {...layout}>
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            changeOnSelect
                            placeholder="Please select" />
                    </Item>
                    <Item label="商品图片" {...layout}>
                        <span>商品图片</span>
                    </Item>
                    <Item label="商品详情" {...layout}>
                        <span>商品详情</span>
                    </Item>

                </Form>
                <Button type="primary" onClick={this.submit}>提交</Button>
            </Card>
        )
    }
}

export default Form.create({})(AddUpdate)