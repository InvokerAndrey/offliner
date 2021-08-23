import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Rating from './Rating'


function Phone({ phone }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/phone/${phone.id}`}>
                <Card.Img src={phone.image}/>
            </Link>
            <Card.Body>
                <Link to={`/phone/${phone.id}`}>
                    <Card.Title as="div">
                        <strong>{phone.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={phone.rating} reviews={phone.numReviews} color={'#fc0303'} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    ${phone.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Phone
