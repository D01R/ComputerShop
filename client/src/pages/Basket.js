import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BasketItem from '../components/BasketItem'
import { deleteProductInBasket, fetchBasket } from '../http/basketAPI'
import { BASKET_ROUTE } from '../utils/consts'

const Basket = observer(() => {
    const [products, setProducts] = useState({productsBasket:[]})

    useEffect(() => {
        fetchBasket().then(data => 
            setProducts(data)
        )
    },[])

    useEffect(() => {
        fetchBasket().then(data => 
            setProducts(data)
        )
    },[products])
    
    const deleteProduct = (prodBusId) => {
        try{
            deleteProductInBasket(prodBusId).then()
        } catch (e){
            alert(e.response.data.message)
        }
    }
    
    return(
        <Container>
            <Col md={12}>
                {products ?   
                    products.productsBasket.map(i => 
                        <div key={i.product.id}>
                            <BasketItem product={i.product}/>
                            <Row className='d-flex justify-content-end'>
                                <Col md={3} className='d-flex justify-content-center'>
                                    <Button variant="outline-danger" onClick={() => deleteProduct(i.id)}>Удалить из корзины</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                    :
                    'Корзина пуста'
                }
            </Col>
            <Row>
                <h2 className='text-large-right mt-3'>Общая сумма {products.productsBasket.map(i => i.product.price).reduce((prev, curr) => prev + curr, 0)} руб.</h2>
            </Row>
        </Container>
    )
})

export default Basket