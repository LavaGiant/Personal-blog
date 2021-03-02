import { Redirect } from 'umi'
export default (props: any) => {
  const isLogin = localStorage.getItem('openId') ? true : false;
  return (
    isLogin ? <div>{props.children}</div> : <Redirect to="/login" />
  )
}