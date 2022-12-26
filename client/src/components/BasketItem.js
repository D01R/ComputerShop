import React from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/consts'
import star from '../assets/star.png'

const BasketItem = ({product}) =>{
    const navigate = useNavigate()
    

    return (
      <Card
        className="mt-5 p-4"
        border="dark"
        
      >
        <Row onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}>
            <Col md={4} className='d-flex justify-content-center'>
                <Image
                    width={300}
                    height={300}
                    src={process.env.REACT_APP_API_URL + product.img}
                />
            </Col>
            <Col md={6}>
                <div>
                    <h2>{product.name}</h2>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 me-2">рейтинг: </p>
                        <div>{product.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                    <div className="d-flex align-items-center" style={{ width: 500 }}>
                        В наличии <h3 className="mb-0 ms-2 me-2">{product.quantity}</h3>{" "}
                        шт.
                    </div>
                    <div
                        className="d-flex align-items-center"
                        style={{ width: 500 }}
                    >
                        <h3>{product.price}</h3> руб.
                    </div>
                </div>

            </Col>
        </Row>
      </Card>
    );
}

export default BasketItem