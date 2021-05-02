import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
class Leftnav extends Component {
  getMenunodes = (menuList) => {
    return menuList.map(item => {
      const path = this.props.location.pathname;
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>)
      } else {
        const cItem = item.children.find((cItem) => cItem.key == path);
        if (cItem) {
          this.openKey = item.key; // 把找到的父元素的key保存在openKey中
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenunodes(item.children)} </SubMenu>
        )
      }
    })
  }
  componentWillMount() {
    // 在页面渲染之前就已经拿到数据了，这时候的openKey是可以使用的
    this.getNodes = this.getMenunodes(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div >
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.getNodes}

        </Menu>

      </div>
    );
  }
}

export default withRouter(Leftnav);