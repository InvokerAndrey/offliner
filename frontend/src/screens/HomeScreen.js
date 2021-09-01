import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Phone from '../components/Phone'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PhoneCarousel from '../components/PhoneCarousel'
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
            <PhoneCarousel />
        </div>
    )
}

export default HomeScreen
