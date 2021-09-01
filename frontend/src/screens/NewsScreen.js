import React, {useState} from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import News from '../components/News'
import { listNews } from '../actions/newsActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


function NewsScreen() {

    const dispatch = useDispatch()

    const newsList = useSelector(state => state.newsList)
    const { loading, error, news, page, pages } = newsList

    const [category, setCategory] = useState('')

    const getNewsByCategory = () => {
        dispatch(listNews(category))
    }

    return (
        <div>
            <Row>
                <h1>Category</h1>
                <Col>
                    <select className='form-select' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=''></option>
                        <option value="SPORT">SPORT</option>
                        <option value="SCIENCE">SCIENCE</option>
                        <option value="HEALTH">HEALTH</option>
                        <option value="SHIT">SHIT</option>
                    </select>
                </Col>
                <Col>
                    <Button
                        onClick={getNewsByCategory}
                        className="btn-block"
                        type="button"
                    >
                        Search
                    </Button>
                </Col>
            </Row>
            
            <Col md={9} className='my-4'>
                <h2>News</h2>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : news.length === 0 ? <Message variant='info'>Couldn't find any</Message>
                                : <div>
                                    <Row>
                                        {news.map(newsItem => (
                                                <Col key={newsItem.datetime} sm={12} md={6} lg={4} xl={3}>
                                                    <News newsItem={newsItem} />
                                                </Col>
                                        ))}
                                    </Row>
                                  </div>
                                
                }
            </Col>
        </div>
    )
}

export default NewsScreen
