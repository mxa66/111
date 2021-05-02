import React, { Component } from 'react';
import Header from './header/header'
import './login.css'
import {reqLogin} from '../../api'
import StoreUtils from '../../utils/storageUtils'
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
           const {username,password}=values
            const result=await reqLogin(username,password)
            console.log(result);
            if (result.status===0) {
                message.success('登陆成功')
                StoreUtils.saveUser(result.data)
                this.props.history.push('/')
            }else{
              message.error(result.msg)
            }
          }
        });}
    render() { 
        const user =StoreUtils.getUser()||'';
        if (user&&user._id) {
            return<Redirect to="/"/>
        }
        const { getFieldDecorator } = this.props.form;
        return ( 

            <div className="login_box">
                <Header />
                <div className="login_content">
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
            Log in
          </Button>
        </Form.Item>
      </Form>
                </div>
            </div>
         );
    }
}
 
export default Form.create()(Login);