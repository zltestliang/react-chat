import React from 'react';
import {register} from '../socket';

import '../css/reg.css';

import { Form, Input, Tooltip, Icon, Select, Button,message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;




class Register extends React.Component {
  state = {
    confirmDirty: false,
    errInfo : ''
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        register({
            username : values.nickname,
            passward : values.password,
            phone : '',//values.phone ? values.phone : '',
            email : '' //values.email ? values.email : ''
        }).then((res)=>{
            if (res.result){
              message.info("恭喜您注册成功");
              const location = {
                pathname: '/'
              }

              localStorage.setItem("username",values.nickname);
              localStorage.setItem('pwd',values.password);

              this.props.history.push(location);
            }
            else{
              this.setState({errInfo:res.msg});
            }
        })

      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 ,offset:2},
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 20 ,offset:2},
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 2,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <div className="regPage">
      <Form onSubmit={this.handleSubmit} style={{marginTop:'6%'}}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              用户名&nbsp;
              <Tooltip title="您的系统中的名称">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>       
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认您的密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        {/* <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '邮箱不合法!',
            }, {
              required: false, message: '请输入邮箱!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: '请输入电话号码!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem> */}
        <FormItem {...tailFormItemLayout}>
          <span className="reg-err">{this.state.errInfo}</span>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
      </div>
      
    );
  }
}
export default Form.create()(Register);
