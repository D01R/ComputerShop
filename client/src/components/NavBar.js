import React, { useContext } from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../index'
import {Button} from 'react-bootstrap'
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
            <NavLink style={{color:'white'}} to={SHOP_ROUTE}>Home</NavLink>
            {user.isAuth ?
                <Nav className="ml-auto" style={{color:"white"}}>
                    {user.user.role == 'ADMIN' ?
                        <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                        :
                        <Button variant={'outline-light'} onClick={() => navigate(BASKET_ROUTE)}>Корзина</Button>
                    }
                    <Button variant={'outline-light'} className='ms-3' onClick={() => logOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color:"white"}}>
                    <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
        </Container>
      </Navbar>
    )
})

export default NavBar