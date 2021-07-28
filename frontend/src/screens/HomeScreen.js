import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Phone from '../components/Phone'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPhones } from '../actions/phoneActions'


function HomeScreen() {

    const dispatch = useDispatch()

    const phoneList = useSelector(state => state.phoneList)
    const { loading, error, phones } = phoneList

    // Triggers any time component loads
    useEffect(() => {

        dispatch(listPhones())

    }, [dispatch])

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {phones.map(phone => (
                            <Col key={phone.id} sm={12} md={6} lg={4} xl={3}>
                                <Phone phone={phone} />
                            </Col>
                        ))}
                    </Row>
            }
            
        </div>
    )
}

export default HomeScreen
