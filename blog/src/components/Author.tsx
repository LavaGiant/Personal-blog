import { FC } from 'react'
import { Avatar, Divider } from 'antd'
import { GithubOutlined, WechatOutlined, QqOutlined } from '@ant-design/icons';
import 'styles/components/author.scss'
const Author:FC = () => {
  return (
    <div className="author comm-box">
      <div className="author-cover"><Avatar src="img/avatar.png" size={120} /></div>
      <div className="author-nickname">Malphite</div>
      <div className="author-introduction">
        <span className="author-introduction-text">
          一个普普通通的个人博客项目
        </span>
        <div className="author-introduction-other">
          <Divider>社交帐号</Divider>
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
          <Avatar size={28} icon={<QqOutlined />} className="account" />
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </div>
      </div>
    </div>
  )
}
export default Author