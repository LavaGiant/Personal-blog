import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from "components/Header";
import MainBody from "components/MainBody";
import { Affix } from 'antd'
import { getArticleDetail } from 'api/articles'
interface Props {
  articleDetail: ArticleGlobal.Article[]
}
const Detailed: NextPage<Props> = ({ articleDetail }) => {
  const info = articleDetail[0]
  const breadInfo: BreadGlobal.BreadPath[] = [
    {
      name: info.typeName,
      path: `/list?id=${info.typeId}`
    },
    {
      name: info.title,
      path: ''
    }
  ]
  return (
    <div>
      <Head>
        <title>{info.title}</title>
      </Head>
      <Affix>
        <Header />
      </Affix>
      <MainBody pageTitles={breadInfo} articleType='detail' articleData={articleDetail} />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context.query.id)
  const res = await getArticleDetail(id)
  const articleDetail: Props['articleDetail'] = res.data
  return {
    props: {
      articleDetail
    }
  }
}
export default Detailed