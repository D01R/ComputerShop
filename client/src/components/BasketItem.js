import React from 'react'
import { Button, Card, Col, Image, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/consts'
import star from '../assets/star.png'

const BasketItem = ({product, productBusketId}) =>{
    const navigate = useNavigate()
    
    return (
      <Card
        className="mt-5"
        border="light"
        onClick={() => navigate(PRODUCT_ROUTE + "/" + product.id)}
      >
        <Row>
            <Col md={4}>
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
                    className="d-flex align-items-center justify-content-between"
                    style={{ width: 500 }}
                    >
                    <h3>{product.price}</h3> руб.
                    </div>
                </div>

            </Col>
            <Col md={3}>
                <Button variant="outline-danger">Удалить из корзины</Button>
            </Col>
        </Row>
      </Card>
    );
}

export default BasketItem