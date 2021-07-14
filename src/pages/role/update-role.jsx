import React, { Component } from 'react'
import { Tree, Form ,Input} from 'antd'
import menuList from '../../config'
import PropTypes from 'prop-types'
const { TreeNode } = Tree

export default class UpdateRole extends Component {

    initList = () => {
        const treeData = menuList.map(c => {
            if (c.children) {
                delete c.icon
                c.children.map(cItem => delete cItem.icon)
                return c
            } else {
                delete c.icon
                return c
            }
        })
        this.treeData = [{ title: "平台权限", key: 'key', children: treeData }]
    }

    static propTypes = {
        role:PropTypes.object.isRequired
    }

    state = {
        checkedKeys: [],
    }

    //向父组件上交自己的状态属性
    getState2Parent=()=>{
        return this.state.checkedKeys
    }


    onCheck = checkedKeys => {
        this.setState({ checkedKeys })
    }


    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode key={item.key} {...item} />
        })

    
    UNSAFE_componentWillMount() {
        this.initList()
        this.state.checkedKeys = this.props.role.menus
    }
    
    //组件在接到父组件给的参数第二次时调用，因为如果只有一次调用（组件第一次即将挂载时）
    //后续在接收到的参数checkedKeys得不到一个及时的更新
    //会导致下次再打开模态窗口时，是一个错误的状态项
    UNSAFE_componentWillReceiveProps(nextProps){
        this.state.checkedKeys = nextProps.role.menus
    }
    
    render() {
        return (

            <div>
                <Form>
                    <Form.Item
                    labelCol={{span:4}}
                    wrapperCol={{span:15}}
                    label="用户角色"
                    >
                        <Input value={this.props.role.name} disabled/>
                        
                    </Form.Item>
                </Form>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                >
                    {this.renderTreeNodes(this.treeData)}
                </Tree>
            </div>

        )
    }
}