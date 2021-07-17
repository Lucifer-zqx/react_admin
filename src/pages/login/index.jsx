import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import './index.less'
//react 导入图片的格式
import logo from '../../assets/imgs/logo.png'


class Login extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            const { username, password } = values
            if (!err) {
                this.props.login(username,password)
            } else {
                message.error("登录失败")
            }
        });
    };

    validate = (rule, value, callback) => {
        if (value.length < 4) {
            callback('密码长度不能小于4')
        } else if (value.length > 12) {
            callback('密码长度不能大于12')
        } else if (!/^[A-z0-9_]+$/.test(value)) {
            callback('密码只能为数字字母下划线的组合')
        } else {
            callback()
        }
    }

    render() {
        //如果已经登录强制在home主页面
        const user = this.props.user
        if (user._id) {
            return <Redirect to="/" />
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="header">
                    <img src={logo} alt="logo" />
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="inputBox">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '请输入您的用户名' },
                                    { min: 4, message: '用户名最小长度为4个字符' },
                                    { max: 12, message: '用户名最大长度为12个字符' },
                                    { RegExp: /^[\w]+$/, message: '用户名为字母、数字或下划线组成' }],
                                initialValue: 'admin', // 初始值
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.validate }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}

const WrapLogin = Form.create({})(Login);

export default connect(
    state => ({user:state.user}),
    {login}
)(WrapLogin)
