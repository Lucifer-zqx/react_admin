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
import { reqCategorys } from '../../api/ajax'

import LinkButton from "../../components/link-button"
const Item = Form.Item
const { TextArea } = Input;

class AddUpdate extends Component {
    state = {
        options: []
    }


    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];   //tarfetOption选中的标签，selectedOption所有的父列表
        targetOption.loading = true;

        const result = await reqCategorys(targetOption.value)
        if (result.status === 0) {
            targetOption.loading = false;
            if (result.data.length > 0) {
                targetOption.children = result.data.map(c =>
                ({
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                })
                )
            } else {
                //当点击发现，改树节点没有叶节点时，将该树节点设置成叶节点
                targetOption.isLeaf = true
            }


        }
        // load options lazily
        this.setState({
            options: [...this.state.options],
        });

    }

    //提交表单
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success("提交成功")
                console.log(values)
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

    initOptions = async (options) => {
        const newOptions = options.map(c => {
            return {
                value: c._id,
                label: c.name,
                isLeaf: false
            }
        })

        const { updateFlag, product } = this
        const { pCategoryId} = product || {}
        if (updateFlag && pCategoryId !== '0') {
            const subOptions = await reqCategorys(pCategoryId)
            debugger
            const newSubOptions = subOptions.data.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            const targrtOption = newOptions.find( c => c.value === pCategoryId)
            targrtOption.children = newSubOptions
        }
        this.setState({ options: newOptions })
    }
    //获取分类列表
    getCategorys = async (parentId) => {
        const reslut = await reqCategorys(parentId)
        if (reslut.status === 0) {
            const options = reslut.data
            if (parentId === '0') {
                this.initOptions(options)
            } else {
                return options;
            }
        }

    }
    //组件将要挂载时
    UNSAFE_componentWillMount() {
        const product = this.props.location.state
        this.updateFlag = !!product
        this.product = this.props.location.state
    }

    //组件挂载时
    async componentDidMount() {
        this.getCategorys('0')
    }

    render() {
        //拿到是否是更新操作标识
        const { updateFlag } = this
        //拿到更新product传递过来的数据
        const { name, desc, price, pCategoryId, categoryId } = this.product || {}
        //card标题
        const title =
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span style={{ marginLeft: 12 }}>{updateFlag ? "更新商品" : "添加商品"}</span>
            </span>
        //form表单样式
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }
        //
        const { getFieldDecorator } = this.props.form

        //默认显示分类列表
        let categorys = []
        if (updateFlag) {
            console.log(pCategoryId, categoryId)
            if (pCategoryId === '0') {
                //一级分类列表
                categorys.push(categoryId)
            } else {
                //二级分类列表
                categorys.push(pCategoryId)
                categorys.push(categoryId)
            }
        }
        return (
            <Card title={title}>
                <Form>
                    <Item label="商品名称" {...layout}>
                        {getFieldDecorator('name',
                            {
                                initialValue: name,
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
                                initialValue: desc,
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
                                initialValue: price,
                                rules: [
                                    { required: true, message: "商品价格必须输入" },
                                    { validator: this.validatePrice }
                                ]
                            }
                        )(
                            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
                        )}

                    </Item>
                    <Item label="商品分类" {...layout}
                    >
                        {getFieldDecorator('categorys',
                            {
                                initialValue: categorys,
                                rules: [
                                    { required: true, message: "商品分类必须输入" },
                                ]

                            }
                        )(
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                placeholder="请输入商品分类" />
                        )}

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