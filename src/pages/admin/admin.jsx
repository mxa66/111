import React, { Component } from 'react';
import StoreUtils from '../../utils/storageUtils'
import { Layout } from 'antd';
import './admin.css'
import Leftnav from '../../components/leftnav/leftnav'
import Header from '../../components/header/header'
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../home/home";
import Product from "../product/product";
import Category from "../category/category";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const user = StoreUtils.getUser() || ''
        if (!user || !user._id) {
            return <Redirect to="/" />
        }
        return (

            <Layout>
                <Sider>
                    <Leftnav></Leftnav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/product" component={Product} />
                            <Route path="/category" component={Category} />
                            <Route path="/role" component={Role} />
                            <Route path="/user" component={User} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/charts/pie" component={Pie} />
                            <Redirect to="/home" from="/" />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;