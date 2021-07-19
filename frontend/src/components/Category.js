import React from 'react'
import { Link } from 'react-router-dom'


function Category({ category }) {
    return (
        <Link to={`/catalog/category/${category.id}`}>
            <h4>{category.name}</h4>
        </Link>
    )
}

export default Category
