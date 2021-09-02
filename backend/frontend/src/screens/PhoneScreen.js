import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, Card, ListGroup, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPhoneDetails, createReview } from '../actions/phoneActions'
import { PHONE_CREATE_REVIEW_RESET } from '../constants/phoneConstants'


function PhoneScreen({ match, history }) {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const phoneDetails = useSelector(state => state.phoneDetails)
    const { loading: loadingPhone, error: errorPhone, phone } = phoneDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const phoneReviewCreate = useSelector(state => state.phoneReviewCreate)
    const { loading: loadingReview, error: errorReview, success: successReview } = phoneReviewCreate

    useEffect(() => {

        if (successReview) {
            setRating(0)
            setComment('')
            dispatch({
                type: PHONE_CREATE_REVIEW_RESET
            })
        }

        dispatch(listPhoneDetails(match.params.id))

    }, [dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(match.params.id, {
            rating,
            comment,
        }))
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
                                    <Rating value={phone.rating} reviews={phone.reviews.length} color={'#fc0303'} />
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
                                        <Row>
                                            <Button 
                                                onClick={addToCartHandler}
                                                className="btn-block"
                                                type="button"
                                                disabled={phone.countInStock === 0}>
                                                    Add to Cart
                                            </Button>
                                        </Row>
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

                    <Row>
                        <Col md={6}>
                            <h4>Reviews</h4>
                            {phone.reviews.length === 0 && <Message variant='info'>No reviews</Message>}

                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4>Write a Review</h4>
                                    {loadingReview && <Loader />}
                                    {successReview && <Message variant='success'>Review submitted</Message>}
                                    {errorReview && <Message variant='danger'>{errorReview}</Message>}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''></option>
                                                    <option value='1'>1 - Shit</option>
                                                    <option value='2'>2 - Iphone</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Pretty Well</option>
                                                    <option value='5'>5 - Android</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='5'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                >

                                                </Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={loadingReview}
                                                type='submit'
                                                variant='primary'
                                                className='my-2'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant='info'><Link to='/login'>Login</Link> to write a review</Message>
                                    )}
                                </ListGroup.Item>

                                {phone.reviews.map(review => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color={'#fc0303'}/>
                                        <p>{review.createdAt}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
                )
            }
        </div>
    )
}

export default PhoneScreen
