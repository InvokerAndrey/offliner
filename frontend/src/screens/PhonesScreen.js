import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Phone from '../components/Phone'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Filter from '../components/Filter'
import { listPhones } from '../actions/phoneActions'


function PhonesScreen() {

    const dispatch = useDispatch()

    const phoneList = useSelector(state => state.phoneList)
    const { loading, error, phones } = phoneList

    
    // Triggers any time component loads
    useEffect(() => {

        dispatch(listPhones())

    }, [dispatch])

    return (
        <div>
            <Row>
                <Col md={3}>
                    <Filter />
                </Col>
                <Col md={9}>
                    <h2>Phones</h2>
                    {loading ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : phones.length === 0 ? <Message variant='info'>Couldn't find any</Message>
                                    : <Row>
                                        {phones.map(phone => (
                                              <Col key={phone.id} sm={12} md={6} lg={4} xl={3}>
                                                  <Phone phone={phone} />
                                              </Col>
                                        ))}
                                      </Row>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default PhonesScreen
