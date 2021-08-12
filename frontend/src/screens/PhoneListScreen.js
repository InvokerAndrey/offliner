import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPhones, deletePhone, createPhone} from '../actions/phoneActions'
import { PHONE_CREATE_RESET } from '../constants/phoneConstants'


function PhoneListScreen({ history, match }) {

    const dispatch = useDispatch()

    const phoneList = useSelector(state => state.phoneList)
    const {loading, error, phones} = phoneList

    const phoneDelete = useSelector(state => state.phoneDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = phoneDelete

    const phoneCreate = useSelector(state => state.phoneCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, phone: createdPhone} = phoneCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({
            type: PHONE_CREATE_RESET
        })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/phone/${createdPhone.id}/edit`)
        } else {
            dispatch(listPhones())
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdPhone])

    const deleteHandler = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            dispatch(deletePhone(id))
        }
    }

    const createPhoneHandler = () => {
        dispatch(createPhone())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Phones</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <Button className='my-3' onClick={createPhoneHandler}>
                        <i className='fas fa-plus'></i> Add Phone
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table bordered hover responsive className='table-sm' >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>BRAND</th>
                            <th>PRICE</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {phones.map(phone => (
                            <tr key={phone.id}>
                                <td>{phone.id}</td>
                                <td>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={phone.image} alt={phone.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            {phone.name}
                                        </Col>
                                    </Row>
                                </td>
                                <td>{phone.brand}</td>
                                <td>${phone.price}</td>
                                <td>
                                    <LinkContainer to={`/admin/phone/${phone.id}/edit`}>
                                        <Button  variant="light" className='btn-sm'>
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button  
                                        variant="light"
                                        className='btn-sm'
                                        style={{color: 'red'}}
                                        onClick={() => deleteHandler(phone.id, phone.name)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default PhoneListScreen
