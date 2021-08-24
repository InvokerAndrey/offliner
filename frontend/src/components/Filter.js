import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listFilterValues, searchByFilter } from '../actions/phoneActions'


function Filter() {
    const dispatch = useDispatch()

    const phoneFilterValues = useSelector(state => state.phoneFilterValues)
    const { loading, error, filterValues } = phoneFilterValues

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [category, setCategory] = useState('')
    const [year, setYear] = useState('')
    const [brand, setBrand] = useState('')
    const [operatingSystem, setOperatingSystem] = useState('')
    const [screenSize, setScreenSize] = useState('')
    const [screenResolution, setScreenResolution] = useState('')
    const [screenTechnology, setScreenTechnology] = useState('')
    const [platform, setPlatform] = useState('')
    const [RAM, setRAM] = useState('')
    const [flashMemory, setFlashMemory] = useState('')
    const [camera, setCamera] = useState('')
    const [cameraAmount, setCameraAmount] = useState('')
    const [battery, setBattery] = useState('')

    useEffect(() => {

        dispatch(listFilterValues())

    }, [dispatch])

    const searchByFilterHandler = () => {
        dispatch(searchByFilter(
            minPrice, maxPrice, category, year, brand, operatingSystem, screenSize, screenResolution,
            screenTechnology, platform, RAM, flashMemory, camera, cameraAmount, battery
        ))
    }

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <h2>Filter</h2>
                            <ListGroup className='my-4'>
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            onClick={searchByFilterHandler}
                                            className="btn-block"
                                            type="button"
                                        >
                                            Search
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Min Price:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                            >
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>Max Price:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                            >
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Category:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                {
                                                    filterValues.category.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Year:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={year}
                                                onChange={(e) => setYear(e.target.value)}
                                            >
                                                {
                                                    filterValues.year.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Brand:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            >
                                                {
                                                    filterValues.brand.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={6}>Operating System:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={operatingSystem}
                                                onChange={(e) => setOperatingSystem(e.target.value)}
                                            >
                                                {
                                                    filterValues.operatingSystem.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Screen Size:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={screenSize}
                                                onChange={(e) => setScreenSize(e.target.value)}
                                            >
                                                {
                                                    filterValues.screenSize.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Screen Resolution:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={screenResolution}
                                                onChange={(e) => setScreenResolution(e.target.value)}
                                            >
                                                {
                                                    filterValues.screenResolution.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Screen Technology:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={screenTechnology}
                                                onChange={(e) => setScreenTechnology(e.target.value)}
                                            >
                                                {
                                                    filterValues.screenTechnology.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Platform:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={platform}
                                                onChange={(e) => setPlatform(e.target.value)}
                                            >
                                                {
                                                    filterValues.platform.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>RAM:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={RAM}
                                                onChange={(e) => setRAM(e.target.value)}
                                            >
                                                {
                                                    filterValues.RAM.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Flash Memory:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={flashMemory}
                                                onChange={(e) => setFlashMemory(e.target.value)}
                                            >
                                                {
                                                    filterValues.flashMemory.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Camera:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={camera}
                                                onChange={(e) => setCamera(e.target.value)}
                                            >
                                                {
                                                    filterValues.camera.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Amount of Cameras:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={cameraAmount}
                                                onChange={(e) => setCameraAmount(e.target.value)}
                                            >
                                                {
                                                    filterValues.cameraAmount.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Battery:</Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto" className="my-1" md={12}>
                                            <Form.Control
                                                as="select"
                                                value={battery}
                                                onChange={(e) => setBattery(e.target.value)}
                                            >
                                                {
                                                    filterValues.battery.map((x) => (
                                                        <option key={x} value={x}>
                                                            {x}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            onClick={searchByFilterHandler}
                                            className="btn-block"
                                            type="button"
                                        >
                                            Search
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    )
            }
        </div>
    )
}

export default Filter
