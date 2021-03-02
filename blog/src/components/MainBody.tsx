import { FC, useState } from 'react'
import { Col, Row, Breadcrumb, Affix } from "antd";
import Author from "./Author";
import Advert from "./Advert";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";
import 'styles/components/mainBody.scss'
import ArticleNavbar from './ArticleNavbar';
interface Props {
  pageTitles: BreadGlobal.BreadPath[]
  articleType: string,
  articleData: ArticleGlobal.Article[]
}
const MainBody: FC<Props> = ({ pageTitles, articleType, articleData }) => {
  return (
    <>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {
            pageTitles &&
            <Breadcrumb className="bread">
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              {
                pageTitles.map(item =>
                  <Breadcrumb.Item key={item.name}>{
                    item.path.length ? <a href={item.path}>{item.name}</a> : item.name}
                  </Breadcrumb.Item>
                )
              }
            </Breadcrumb>
          }
          {
            (() => {
              switch (articleType) {
                case 'list':
                  return <ArticleList list={articleData} />
                case 'detail':
                  return <ArticleDetail detail={articleData[0]} />
                default:
                  return null
              }
            })()
          }
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          {
            articleType === 'detail' && (
              <Affix offsetTop={55}>
                <ArticleNavbar />
              </Affix>
            )
            // (() => {
            //   console.log(articleType)
            //   if (articleType === 'detail') {
            //     return (
            //       <Affix offsetTop={55}>
            //         <ArticleNavbar />
            //       </Affix>
            //     )
            //   }
            // })()
          }
        </Col>
      </Row>
    </>
  )
}
export default MainBody