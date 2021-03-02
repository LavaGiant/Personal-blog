import { FC } from 'react'
import LoginForm from './components/loginForm/LoginForm'
import './Login.scss'

const Login: FC = () => {

  return (
    <div className='login'>
      <div className="login-title">
        Malphite个人博客后台管理系统
      </div>
      <div className="login-card">
        <LoginForm />
      </div>
    </div>
  )
}
export default Login