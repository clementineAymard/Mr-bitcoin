import { Component } from 'react'
import { contactService } from '../services/contact.service'

export class ContactEdit extends Component {

    state = {
        contact: contactService.getEmptyContact()
    }

    async componentDidMount() {
        const contactId = this.props.match.params.id
        if (contactId) {
            try {
                const contact = await contactService.getContactById(contactId)
                console.log(contact)
                this.setState({ contact })
            } catch (error) {
                console.log('error1:', error)
            }
        }
    }

    onSaveContact = async (ev) => {
        ev.preventDefault()
        try {
            await contactService.saveContact({ ...this.state.contact })
            this.props.history.push('/contact')
        } catch (error) {
            console.log('error2:', error)
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
        }
        this.setState(({ contact }) => ({ contact: { ...contact, [field]: value } }))
    }

    onRemoveContact = async () => {
        try {
            await contactService.deleteContact(this.state.contact._id)
            this.setState(({ contacts }) => ({
                contacts: contacts.filter(contact => contact._id !== this.state.contact._id)
            }))

        } catch (error) {
            console.log('error:', error)
        }
    }

    render() {
        const { contact } = this.state
        const { name, email, phone } = contact

        return (
            <section className='contact-edit flex column gap justify-center'>
                <h1 className='bold'>{contact._id ? 'Edit' : 'Add'} Contact</h1>
                <form onSubmit={this.onSaveContact} className='flex column gap'>
                    <label htmlFor="name" className='flex gap '>
                        <span>Name</span>
                        <input value={name} onChange={this.handleChange} type="text" name="name" id="name" />
                    </label>

                    <label htmlFor="email" className='flex gap '>
                        <span>Email</span>
                        <input value={email} onChange={this.handleChange} type="text" name="email" id="email" />
                    </label>

                    <label htmlFor="phone" className='flex gap '>
                        <span>Phone</span>
                        <input value={phone} onChange={this.handleChange} type="text" name="phone" id="phone" />
                    </label>

                    <button className='btn-save'>Save</button>
                </form>
                <button onClick={this.onRemoveContact}>
                    <img src={require('../assets/imgs/delete.png')} alt='icon'/>
                </button>
            </section>
        )
    }
}
