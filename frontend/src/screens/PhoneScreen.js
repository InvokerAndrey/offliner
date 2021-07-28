import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, Card, ListGroup, Form, Table } from 'react-bootstrap';

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPhoneDetails } from '../actions/phoneActions'


function PhoneScreen({ match, history }) {

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const phoneDetails = useSelector(state => state.phoneDetails)
    const { loading: loadingPhone, error: errorPhone, phone } = phoneDetails

    useEffect(() => {

        dispatch(listPhoneDetails(match.params.id))

    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }

    return (
        <div>
            {/* <Link to="/" className="btn btn-dark my-3" ><i className="fas fa-angle-double-left"></i>Back</Link> */}
            <Button className="btn btn-dark my-3" onClick={() => history.goBack()}>
                <i className="fas fa-angle-double-left"></i>
                Back
            </Button>
            {loadingPhone ? <Loader />
                : errorPhone ? <Message variant='danger'>{errorPhone}</Message>
                : (
                <div>
                    <Row>
                        <Col md={6}>
                            <Image src={phone.image} alt={phone.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{phone.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={phone.rating} reviews={phone.reviews} color={'#fc0303'} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>${phone.price}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    {phone.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>${phone.price}</strong></Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {phone.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {phone.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantity:</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(phone.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }    
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToCartHandler}
                                            className="btn-block"
                                            type="button"
                                            disabled={phone.countInStock === 0}>
                                                Add to Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <Table hover responsive className="table-sm">
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <th>{phone.category}</th>
                                    </tr>
                                    <tr>
                                        <th>Year</th>
                                        <th>{phone.year}</th>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <th>{phone.brand}</th>
                                    </tr>
                                    <tr>
                                        <th>Operating System</th>
                                        <th>{phone.operatingSystem}</th>
                                    </tr>
                                    <tr>
                                        <th>Screen Size</th>
                                        <th>{phone.screenSize}"</th>
                                    </tr>
                                    <tr>
                                        <th>Screen Resolution</th>
                                        <th>{phone.screenResolution}</th>
                                    </tr>
                                    <tr>
                                        <th>Screen Technology</th>
                                        <th>{phone.screenTechnology}</th>
                                    </tr>
                                    <tr>
                                        <th>Platform</th>
                                        <th>{phone.platform}</th>
                                    </tr>
                                    <tr>
                                        <th>RAM</th>
                                        <th>{phone.RAM} GB</th>
                                    </tr>
                                    <tr>
                                        <th>Flash Memory</th>
                                        <th>{phone.flashMemory} GB</th>
                                    </tr>
                                    <tr>
                                        <th>Camera</th>
                                        <th>{phone.camera} mp</th>
                                    </tr>
                                    <tr>
                                        <th>Amount of Cameras</th>
                                        <th>{phone.cameraAmount}</th>
                                    </tr>
                                    <tr>
                                        <th>Battery</th>
                                        <th>{phone.battery} ma/h</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
                )
            }
        </div>
    )
}

export default PhoneScreen
