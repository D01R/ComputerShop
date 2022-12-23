import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../index'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const click = async () => {
        try{
            let data
            if (isLogin){
                data = await login(email, password)
            } else{
                data = await registration(email,password,phone)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch(e){
            alert(e.response.data.message)
        }
    }

    return(
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className='m-auto'>{isLogin? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите пароль..."
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {!isLogin ?
                        <Form.Control
                            className='mt-3'
                            placeholder="Введите телефон..."
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        :
                        <div></div>
                    }
                    <Row className='d-flex justify-content-between mt-3 p-3'>
                        {isLogin ?
                            <div style={{width:'fit-content', padding: 0}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div style={{width:'fit-content', padding: 0}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>                        
                        }
                        <Button style={{width:'fit-content'}} variant={'outline-success'} onClick={click}>
                            {isLogin? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth