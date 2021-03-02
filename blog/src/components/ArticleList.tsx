import { List } from 'antd'
import { useState, FC, useEffect } from "react";
import Link from 'next/link'
import 'styles/components/articleList.scss'
import ReactMarkdown from 'react-markdown'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
interface Props {
  list: ArticleGlobal.Article[]
}
const ArticleList: FC<Props> = ({ list }) => {
  const [myList, setMyList] = useState([])
  useEffect(() => {
    setMyList(list)
  })
  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={myList}
        renderItem={item => (
          <List.Item className="list">
            <div className="list-title">
              <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                <a>
                  {item.title}
                </a>
              </Link>
            </div>
            <div className="list-icon">
              <span><CalendarOutlined />{item.addTime}</span>
              <span><FolderOutlined />{item.typeName}</span>
              <span><FireOutlined />{item.viewCount}人</span>
            </div>
            <div className="list-context">
              <ReactMarkdown
                source={item.introduce}
                escapeHtml={false}
              />
            </div>
          </List.Item>
        )} />
    </>
  )
}
export default ArticleList