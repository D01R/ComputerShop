import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import star from '../assets/star.png'
import { addProductBasket, fetchOneProduct } from '../http/productAPI'


const ProductPage = () => {
    const [product, setProduct] = useState({info:[]})
    const {id} = useParams()
    useEffect(()=>{
        fetchOneProduct(id).then(data => setProduct(data))
    },[])

    const addProduct = () => {
        try{
            addProductBasket({productId: id}).then()
        } catch(e){
            alert(e.response.data.message)
        }
        
    }

    return (
        <Container>
            <Row className='mt-3'>
                <Col md={4}>
                    <Image width={200} height={200} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col md={8}>
                    <Card className='d-flex flex-column align-items-start justify-content-around ps-5' style={{width: 600, height: 300, fontSize: 32, border: '5px solid lightgray'}}>
                        <h2>{product.name}</h2>
                        <div className="d-flex align-items-center">
                            <p className='mb-0 me-2'>рейтинг: </p>
                            <div>{product.rating}</div>
                            <Image width={18} height={18} src={star}/>
                        </div>
                        <div  className="d-flex align-items-center" style={{width: 500}}>
                            В наличии <h3 className='mb-0 ms-2 me-2'>{product.quantity}</h3> шт.
                        </div>
                        <div  className="d-flex align-items-center justify-content-between" style={{width: 500}}>
                            <h3>{product.price}</h3> руб.
                            <Button variant={'outline-dark'} style={{fontSize: 25}} onClick={addProduct}>В корзину</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex dlex-column m-3'>
                <h1>Характеристики</h1>
                {product.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray': 'transparent', padding: 10}}>
                        {info.title}: {info.descriptin}
                    </Row>
                )}
            </Row>
        </Container>
    )
}

export default ProductPage