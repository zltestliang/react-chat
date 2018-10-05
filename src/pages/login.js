import React from 'react';
import store from '../store';
import userinfo from '../user';

import '../css/login.css';


import {login} from '../socket/index';
import {
    Link
  } from 'react-router-dom'

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;



class Login extends React.Component {
    constructor(){
        super();
        this.state = {login_result:''};

        console.log(localStorage.getItem("username"));
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            userName: localStorage.getItem("username"),
            password: localStorage.getItem("pwd")
          });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            const location = {
                pathname: '/chat'
            }

            login(values.userName,values.password).then((res)=>{
                console.log(res);
                if(res.result){
                    userinfo.userid = res.data.userid;

                    localStorage.setItem("username",values.userName);
                    localStorage.setItem('pwd',values.password);
                    
                    store.dispatch({
                        type : 'SET_USER_INFO',
                        data : res.data
                    })
                    this.props.history.push(location);
                }
                else{
                    this.setState({login_result: res.msg ? res.msg:'用户名密码错误'});
                }
            })
            
        }
        });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login">
            <div className="form-container">
                <div className="logo h50">登录</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                })
                (
                    <Input size="large"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)',fontSize:'20px',marginTop: '-10px'}} />} placeholder="Username"/>
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)',fontSize:'20px',marginTop: '-10px' }} />} type="password" placeholder="Password"/>
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>记住密码</Checkbox>
                )}
                {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                    <span className="login-status">{this.state.login_result}</span>
                    <Button type="primary" size="large" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                        登录
                    </Button>
                    <Link to="register">立即注册</Link>
                </FormItem>
            </Form>
            </div>
        </div>
      
    );
  }
}


export default Form.create()(Login);