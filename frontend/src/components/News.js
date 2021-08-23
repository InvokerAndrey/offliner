import React from 'react'

import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function News({newsItem}) {
    
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`https://${newsItem.link}/`} rel='noreferrer' target="_blank">
                <Card.Img src={newsItem.img_path}/>
            </a>
            <Card.Body>
                <a href={`https://${newsItem.link}/`} rel='noreferrer' target="_blank">
                    <Card.Title as="div">
                        <strong>{newsItem.title}</strong>
                    </Card.Title>
                </a>

                <Card.Text as="div">
                    <div className="my-3">
                        {newsItem.datetime}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default News
