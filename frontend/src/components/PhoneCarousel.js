import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { listTopPhones } from '../actions/phoneActions'


function PhoneCarousel() {

    const dispatch = useDispatch()

    const phoneTopRated = useSelector(state => state.phoneTopRated)
    const {loading, error, phones} = phoneTopRated

    useEffect(() => {
        dispatch(listTopPhones())
    }, [dispatch])
 
    return (
        loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' className='bg-dark'>
                    {phones.map(phone => (
                        <Carousel.Item key={phone.id}>
                            <Link to={`/phone/${phone.id}`}>
                                <Image src={phone.image} alt={phone.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h4>{phone.name} - ${phone.price}</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )
    )
}

export default PhoneCarousel
