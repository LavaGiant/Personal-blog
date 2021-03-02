import { FC, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed: boolean): void => {
    setCollapsed(collapsed)
  };
  return (
    <div>
      工作台
    </div>
  );
}
export default Home