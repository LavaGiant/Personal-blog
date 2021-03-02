import { FC, useState, useEffect } from 'react'
import { Input, Select, Row, Col, Button, DatePicker, message } from 'antd'
import { getTypeInfo, ArticleContext, addArticle, updateArticle, getArticleById, ArticleDetail, TypeInfo } from '@/api/article'
import moment, {Moment} from 'moment'
import ReactMarkdown from 'react-markdown'
import './AddArticle.scss'
import { history } from 'umi'
const { Option } = Select
const { TextArea } = Input

const AddArticle: FC = (props) => {
  const [articleId, setArticleId] = useState<number>(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState<string>('')   //文章标题
  const [articleContent, setArticleContent] = useState<string>('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState<string>('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState<string>('')            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState<string>('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState<string>(new Date().toLocaleDateString().replace(/\//g,'-'))   //发布日期
  const [updateDate, setUpdateDate] = useState<Moment | null>(null) //修改日志的日期
  const [typeInfo, setTypeInfo] = useState<TypeInfo[] | string | any>([]) // 文章类别信息
  const [selectedType, setSelectType] = useState<number | string>('请选择类型') //选择的文章类别
  useEffect(() => {
    getTypeInfo().then(res => {
      if (res.data === '没有登陆') {
        localStorage.removeItem('openId')
        history.replace('/login')
      } else {
        setTypeInfo(res.data)
      }
    })
    let tmpRoute: any = history.location.query
    if (tmpRoute.id) {
      getArticleById(tmpRoute.id).then(res => {
        let tmpInfo:ArticleDetail = res.data[0]
        setArticleId(tmpInfo.id)
        setArticleTitle(tmpInfo.title)
        setArticleContent(tmpInfo.articleContent)
        setMarkdownContent(tmpInfo.articleContent)
        setIntroducemd(tmpInfo.introduce)
        setIntroducehtml(tmpInfo.introduce)
        setShowDate(tmpInfo.addTime)
        setSelectType(tmpInfo.typeId)
      })
    }else{
      setArticleId(0)
      setArticleTitle('')
      setArticleContent('')
      setMarkdownContent('')
      setIntroducemd('')
      setIntroducehtml('')
      setShowDate(new Date().toLocaleDateString().replace(/\//g,'-'))
      setSelectType('请选择类型')
    }
  }, [history.location.query])
  const changeContent = (e: any): void => {
    setArticleContent(e.target.value)
    setMarkdownContent(e.target.value)
  }
  const changeIntroduce = (e: any): void => {
    setIntroducemd(e.target.value)
    setIntroducehtml(e.target.value)
  }
  const saveArticle = (): void | false => {
    if (selectedType === '请选择类型') {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    let datetext: string = showDate.replace('-', '/') //把字符串转换成时间戳
    let add_time: number = (new Date(datetext).getTime()) / 1000
    let dataProps: ArticleContext = {
      type_id: Number(selectedType),
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      add_time,
      view_count: 0
    }
    if (!articleId) {
      addArticle(dataProps).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.insertSuccess) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败');
        }
      })
    } else {
      dataProps.id = articleId
      updateArticle(dataProps).then(res => {
        if (res.data.updateSuccess) {
          message.success('文章修改成功')
        } else {
          message.error('文章修改失败');
        }
      })
    }
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} className='article-header'>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" onChange={e => setArticleTitle(e.target.value)} value={articleTitle} />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select size="large" value={selectedType} onChange={value => setSelectType(value)}>
                {
                  typeInfo.map((item: any) => {
                    return (
                      <Option value={item.order_num} key={item.id}>{item.type_name}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html">
                <ReactMarkdown
                  source={markdownContent}
                  escapeHtml={true}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button>暂存文章</Button>&nbsp;
              <Button type="primary" onClick={saveArticle}>发布文章</Button>
              <br /><br />
            </Col>
            <Col span={24}>
              <TextArea
                value={introducemd}
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html">
                <ReactMarkdown
                  source={introducehtml}
                  escapeHtml={false}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => {console.log(dateString);return setShowDate(dateString)}}
                  placeholder="发布日期"
                  size="large"
                  value={moment(showDate)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div >
  );
}
export default AddArticle