import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Paginate({ page, pages, keyword='', isAdmin=false, screen='phones' }) {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            isAdmin ? `/admin/phonelist/?keyword=${keyword}&page=${x + 1}`
                                : screen === 'phones' ? `/phones/?keyword=${keyword}&page=${x + 1}`
                                : screen === 'news' ? `/news/?keyword=${keyword}&page=${x + 1}` : ''
                        }>
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
