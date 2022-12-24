import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import BasketItem from '../components/BasketItem'
import { fetchBasket } from '../http/basketAPI'

const Basket = observer(() => {
    const [products, setProducts] = useState({productsBasket:[]})
    
    useEffect(() => {
        fetchBasket().then(data => 
            setProducts(data)
        )
    },[])

    return(
        <Container>
            <Col md={12}>
                {products ?   
                    products.productsBasket.map(i => 
                        <BasketItem key={i.product.id} product={i.product} productBusketId={i.product.id}/>
                    )
                    :
                    'Корзина пуста'
                }
            </Col>
        </Container>
    )
})

export default Basket