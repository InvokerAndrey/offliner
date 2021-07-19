import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button, Card, ListGroup, Form } from 'react-bootstrap';

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, listProductAttrs } from '../actions/productActions'


function ProductScreen({ match, history }) {

    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading: loadingProduct, error: errorProduct, product } = productDetails

    const productAttrs = useSelector(state => state.productAttrs)
    const { loading: loadingAttrs, error: errorAttrs, attrs } = productAttrs

    useEffect(() => {

        dispatch(listProductDetails(match.params.id))
        dispatch(listProductAttrs(match.params.id))

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
            {loadingProduct ? <Loader />
                : errorProduct ? <Message variant='danger'>{errorProduct}</Message>
                : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} reviews={product.reviews} color={'#fc0303'} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>${product.price}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
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
                                                        [...Array(product.countInStock).keys()].map((x) => (
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
                                        disabled={product.countInStock === 0}>
                                            Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                )
            }
            
            {loadingAttrs ? <Loader />
                : errorAttrs ? <Message variant='danger'>{errorAttrs}</Message>
                : (
                    <Row>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                {attrs.map(attr => (
                                    <ListGroup.Item key={attr.id}>
                                        <h4>
                                            {attr.name}:{' '} 
                                                            {attr.stringValue ? attr.stringValue : ''}
                                                            {' '}
                                                            {attr.decimalValue ? attr.decimalValue : ''}
                                        </h4>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                )
            }
        </div>
    )
}

export default ProductScreen
