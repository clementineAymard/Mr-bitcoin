// import React from 'react'
import ContactPreview from './ContactPreview'

export function ContactList({ contacts, onBack }) {
    return (
        <section className='contact-list flex column'>
            {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact} />
            )}
        </section>
    )
}
