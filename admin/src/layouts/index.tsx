import { FC, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import './index.scss'
import {
  FormOutlined,
  HomeOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Link } from 'umi'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Layouts: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (collapsed: boolean): void => {
    setCollapsed(collapsed)
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">
              工作台
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FormOutlined />}>
            <Link to="/addArticle">
              添加文章
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FileTextOutlined />} title="文章管理">
            <Menu.Item key="3">
              <Link to="/addArticle">
                添加文章
            </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/articleList">
                文章列表
            </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<MessageOutlined />}>
            留言管理
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Malphite</Footer>
      </Layout>
    </Layout>
  );
}
export default Layouts