import React, { useEffect } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Category from '../components/Category'
import { listCategories } from '../actions/categoryActions'


function CategoryScreen() {
    const dispatch = useDispatch()

    const categoryList = useSelector(state => state.categoryList)
    const { loading, error, categories } = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={8}>
                                <h2>Category</h2>
                                <ListGroup variant="flush" style={{margin: '1rem'}}>
                                    {categories.map(category => (
                                        <ListGroup.Item key={category.id}>
                                            <Category category={category}/>
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

export default CategoryScreen
