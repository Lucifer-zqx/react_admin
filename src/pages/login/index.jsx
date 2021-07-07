import React from 'react'
import { Form, Icon, Input, Button} from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
//react 导入图片的格式
import logo from './img/logo.png'
/* export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="header">
                    <img src={logo} alt="logo" />
                    <h1>React 后台管理系统</h1>
                </header>
                <section className="inputBox">
                        <h2>用户登录</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                        >
                            <Form.Item>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                </section>
            </div>
        )
    }
} */

class Login extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
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
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
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

export default WrapLogin
