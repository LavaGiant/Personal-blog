import { FC, useEffect, useState } from 'react'
import 'styles/components/header.scss'
import { Row, Col, Menu } from 'antd'
import Router from 'next/router'
import { createFromIconfontCN } from '@ant-design/icons';
import { getHeaderType } from '@/api/headerType'

type HeaderProps = HeaderGlobal.HeaderType[]

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2354869_71rym6gsfit.js',
});
const Header:FC<any> = ({setBreadTitle, id}) => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    (async () => {
      const res = await getHeaderType()
      const result: HeaderProps = []
      res.data.forEach(item => {
        for (let key in item) {
          if (key.indexOf('_') !== -1) {
            let arr: string[] = key.split('_')
            let a: string = arr[1]
            arr[1] = a.replace(a[0], a[0].toUpperCase())
            let str: string = arr.join('')
            item[str] = item[key]
            delete item[key]
          }
        }
        result.push(item)
      })
      id && setBreadTitle(result[id - 1].typeName)
      setNavArray(result)
    })()
  }, [])
  const itemClick = (e: any): void => {
    Router.push(Number(e.key) ? `/list?id=${e.key}` : `/`)
    setBreadTitle && setBreadTitle(e.item.props.children[1][1])
  }
  return (
    <div className="header">
      <Row justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">Malphite</span>
          <span className="head-text">一个基于NextJs开发的个人博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={8}>
          <Menu mode="horizontal" onClick={itemClick}>
            <Menu.Item key="0">
              <IconFont type='icon-home' />
              首页
            </Menu.Item>
            {
              navArray.map(item => {
                return (
                  <Menu.Item key={item.id}>
                    <IconFont type={`icon-${item.icon}`} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header