import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactPreview({ contact }) {
    return (
        <section className='contact-preview-wrapper flex space-between gap align-center'>
            <Link to={`/contact/${contact._id}`} className='contact-preview' >
                <img src={require("../assets/imgs/user.png")}  alt='icon'/>
                <h2>{contact.name}</h2>
            </Link>
        </section>
    )
}
