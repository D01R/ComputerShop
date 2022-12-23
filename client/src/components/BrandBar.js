import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Card, Row } from "react-bootstrap"
import { Context } from '../index'

const BrandBar = observer(() => {
    const {product} = useContext(Context)
    return(
        <Row className="d-flex">
            {product.brands.map(brand => 
                <Card 
                    key={brand.id}
                    className='p-3 m-1'
                    style={{width:"fit-content", cursor:"pointer"}}
                    onClick={() => product.setSelectedBrand(brand)}
                    border={brand.id === product.selectedBrand.id ? 'dark' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    )
})

export default BrandBar