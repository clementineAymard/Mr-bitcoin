import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'
import { spendBalance } from '../store/actions/user.actions'

import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'

class _ContactPage extends Component {

    componentDidMount() {
        this.props.loadContacts()
    }

    onSearch = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }

    render() {
        const { contacts, filterBy } = this.props
        if (!contacts) return <div>Loading...</div>

        return (
            <section className='contact-page flex column'>
                <ContactFilter onSearch={this.onSearch} filterBy={filterBy} />
                <ContactList contacts={contacts} />
                <Link to={`/contact/edit/`} className='btn-add'>
                    <img src={require('../assets/imgs/plus.png')} alt='icon'/>
                </Link>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy
})

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    setFilterBy,
    spendBalance
}


export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
