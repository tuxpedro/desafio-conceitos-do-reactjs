import React from 'react'
import Button from '../Button'

function List({ id, title, value, onClick }) {
    return (<li key={id}>
        {title}
        <Button onClick={onClick}>{value}</Button>
    </li>)
}


export default List