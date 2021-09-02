import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listPhoneDetails, updatePhone } from '../actions/phoneActions'
import { PHONE_UPDATE_RESET } from '../constants/phoneConstants'


function PhoneEditScreen({ match, history }) {

    const phoneId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [year, setYear] = useState(0)
    const [operatingSystem, setOperatingSystem] = useState('')
    const [screenSize, setScreenSize] = useState(0)
    const [screenResolution, setScreenResolution] = useState('')
    const [screenTechnology, setScreenTechnology] = useState('')
    const [platform, setPlatform] = useState('')
    const [RAM, setRAM] = useState(0)
    const [flashMemory, setFlashMemory] = useState(0)
    const [camera, setCamera] = useState(0)
    const [cameraAmount, setCameraAmount] = useState(0)
    const [battery, setBattery] = useState(0)

    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const phoneDetails = useSelector(state => state.phoneDetails)
    const {loading, error, phone} = phoneDetails

    const phoneUpdate = useSelector(state => state.phoneUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = phoneUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({
                type: PHONE_UPDATE_RESET
            })
            history.push('/admin/phonelist')
        } else {
            if (!phone.name || phone.id !== Number(phoneId)) {
                dispatch(listPhoneDetails(phoneId))
            } else {
                setName(phone.name)
                setImage(phone.image)
                setPrice(phone.price)
                setBrand(phone.brand)
                setCountInStock(phone.countInStock)
                setCategory(phone.category)
                setDescription(phone.description)
                setYear(phone.year)
                setOperatingSystem(phone.operatingSystem)
                setScreenSize(phone.screenSize)
                setScreenResolution(phone.screenResolution)
                setScreenTechnology(phone.screenTechnology)
                setPlatform(phone.platform)
                setRAM(phone.RAM)
                setFlashMemory(phone.flashMemory)
                setCamera(phone.camera)
                setCameraAmount(phone.cameraAmount)
                setBattery(phone.battery)
            }
        }
    }, [dispatch, phoneId, phone, history, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePhone(
            {
                id: phoneId,
                name,
                image,
                price,
                brand,
                countInStock,
                category,
                description, 
                year,
                operatingSystem,
                screenSize,
                screenResolution,
                screenTechnology,
                platform,
                RAM,
                flashMemory,
                camera,
                cameraAmount,
                battery,
            }
        ))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('phone_id', phoneId)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post(`/api/shop/phones/upload/`, formData, config)
            
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Button className="btn btn-dark my-3" onClick={() => history.goBack()}>
                <i className="fas fa-angle-double-left"></i>
                Back
            </Button>
            <FormContainer>
                <h1>Edit Phone</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}    
                            >
                            </Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose image'
                                custom
                                onChange={uploadFileHandler}
                            >
                            </Form.File>

                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                type='text'
                                placeholder='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='year'>
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='year'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='operatingSystem'>
                            <Form.Label>Operating System</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='operatingSystem'
                                value={operatingSystem}
                                onChange={(e) => setOperatingSystem(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='screenSize'>
                            <Form.Label>Screen Size</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='screenSize'
                                value={screenSize}
                                onChange={(e) => setScreenSize(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='screenResolution'>
                            <Form.Label>Screen Resolution</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='screenResolution'
                                value={screenResolution}
                                onChange={(e) => setScreenResolution(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='screenTechnology'>
                            <Form.Label>Screen Technology</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='screenTechnology'
                                value={screenTechnology}
                                onChange={(e) => setScreenTechnology(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='platform'>
                            <Form.Label>Platform</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='platform'
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='RAM'>
                            <Form.Label>RAM</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='RAM'
                                value={RAM}
                                onChange={(e) => setRAM(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='flashMemory'>
                            <Form.Label>Flash Memory</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='flashMemory'
                                value={flashMemory}
                                onChange={(e) => setFlashMemory(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='camera'>
                            <Form.Label>Camera</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='camera'
                                value={camera}
                                onChange={(e) => setCamera(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='cameraAmount'>
                            <Form.Label>CameraAmount</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='cameraAmount'
                                value={cameraAmount}
                                onChange={(e) => setCameraAmount(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='battery'>
                            <Form.Label>Battery</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='battery'
                                value={battery}
                                onChange={(e) => setBattery(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button className='mt-3' type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default PhoneEditScreen
