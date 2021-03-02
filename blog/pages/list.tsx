import { useState } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Header from "components/Header";
import MainBody from "components/MainBody";
import Footer from 'components/Footer';
import { getListById } from 'api/articles'
import { Affix } from 'antd'
interface Props {
  articleList: ArticleGlobal.Article[],
  id: string
}
const MyList: NextPage<Props> = ({ articleList, id }) => {
  const [breadTitle, setBreadTitle] = useState('')
  const breadInfo: BreadGlobal.BreadPath[] = [{
    name: breadTitle,
    path: ''
  }]
  return (
    <div>
      <Head>
        <title>{breadTitle}</title>
      </Head>
      <Affix>
        <Header setBreadTitle={setBreadTitle} id={id} />
      </Affix>
      <MainBody pageTitles={breadInfo} articleType='list' articleData={articleList} />
      <Footer />
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context.query.id)
  const res = await getListById(id)
  const articleList: Props['articleList'] = res.data
  return {
    props: {
      articleList,
      id
    },
  }
}
export default MyList