import React from 'react'
import { ListGroup, Row, Col, Form } from 'react-bootstrap'


function Filter() {
    const [category, setCategory] = 'ASD'

    return (
        <div>
            <h2>Filter</h2>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Category:</Col>
                        <Col xs="auto" className="my-1">
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {category}  
                            </Form.Control>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    Year
                </ListGroup.Item>
                <ListGroup.Item>
                    Brand
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default Filter
