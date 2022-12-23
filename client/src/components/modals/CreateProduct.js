import { Context } from "../../index";
import React, { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createProduct, fetchBrands, fetchTypes } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const CreateProduct = observer(({show,onHide}) => {
    const {product} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
    },[])

    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info,{title: '', descriptin: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key,value,number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value}: i))
    }

    const addProduct = () =>{
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => onHide())
    }

    return(
        <Modal
            size="lg"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{type === null ? 'Выберите тип' : type.name}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item key={type.id} onClick={() => setType(type)}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>{brand === null ? 'Выберите бренд' : brand.name}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.brands.map(brand =>
                                <Dropdown.Item key={brand.id}  onClick={() => setBrand(brand)}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control 
                        className='mt-3'
                        placeholder="Введите название устройства..."
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder="Введите стоимость устройства..."
                        value = {price}
                        onChange = {e => setPrice(Number(e.target.value))}
                        type="number"
                    />
                    <Form.Control 
                        className='mt-3'
                        placeholder="Введите изображение устройства..."
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant="outline-dark"
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {
                        info.map(i => 
                            <Row className="mt-2" key={i.number}>
                                <Col md={4}>
                                    <Form.Control 
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                        placeholder="Введите название характеристики..."
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control 
                                        value={i.descriptin}
                                        onChange={(e) => changeInfo('descriptin', e.target.value, i.number)}
                                        placeholder="Введите описание свойства..."
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => removeInfo(i.number)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateProduct