import React, { useState, useEffect, FC } from 'react'
import { getArticleList, ArticleInfo, delArticle } from '@/api/article'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { List, Col, Row, Button, Modal, message } from 'antd'
import styles from './ArticleList.scss'
import { history } from 'umi';

const { confirm } = Modal
const ArticleList: FC = () => {
  const [list, setList] = useState<ArticleInfo[]>([])
  useEffect(() => {
    getArticleList().then(res => {
      setList(res.data)
    })
  }, [])
  const enterDel = (item: ArticleInfo): void => {
    confirm({
      title: '你确定要删除这个文章吗？',
      icon: <ExclamationCircleOutlined />,
      content: item.title,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        delArticle(item.id).then(red => {
          getArticleList().then(res => {
            setList(res.data)
            message.success('删除成功')
          })
        })
      }
    });
  }
  const enterRevise = (item: ArticleInfo): void => {
    history.push({
      pathname: '/addArticle',
      query: {
        id: `${item.id}`
      }
    })
  }
  return (
    <div>
      <List
        header={
          <Row className={styles.list}>
            <Col span={7}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className={styles.list}>
              <Col span={7}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.addTime}
              </Col>
              <Col span={4}>
                {item.viewCount}
              </Col>
              <Col span={5}>
                <Button type="primary" onClick={() => enterRevise(item)} >修改</Button>&nbsp;
                <Button onClick={() => enterDel(item)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  )
}
export default ArticleList