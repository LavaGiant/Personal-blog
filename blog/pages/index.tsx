import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Header from "components/Header";
import MainBody from "components/MainBody";
import Footer from 'components/Footer';
import { Affix } from 'antd';
import { getArticleList } from 'api/articles'

interface Props {
  articleList: ArticleGlobal.Article[]
}
const Home: NextPage<Props> = ({articleList}) => {
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <Affix>
        <Header />
      </Affix>
      <MainBody pageTitles={null} articleType='list' articleData={articleList} />
      <Footer />
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const res = await getArticleList()
  const articleList: Props['articleList'] = res.data
  return {
    props: {
      articleList,
    },
  }
}

export default Home