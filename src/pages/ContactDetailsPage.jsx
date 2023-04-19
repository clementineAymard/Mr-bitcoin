import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { transferCoins } from '../store/actions/user.actions'
import { contactService } from '../services/contact.service'
import TransferFunds from '../cmps/TransferFunds'
import { MoveList } from '../cmps/MoveList'

export class _ContactDetailsPage extends Component {

    state = {
        contact: null
    }

    componentDidMount() {
        this.loadContact()
    }

    loadContact = async () => {
        try {
            const contact = await contactService.getContactById(this.props.match.params.id)
            this.setState({ contact })
        } catch (error) {
            console.error('error:', error)
        }
    }

    transferCoins = (amount, contact) => {
        console.log('transfering coins')
        this.props.transferCoins(amount, contact)
    }

    onBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { contact } = this.state
        const { user } = this.props
        if (!contact) return <div>Loading...</div>

        return (
            <section className='contact-details-section'>
                <button className="btn-back" onClick={this.onBack} >Back</button>

                <div className='contact-details'>
                    <div className='contact-info flex gap '>
                        <img src={`https://robohash.org/${contact._id}?set=set5`} alt='icon'/>
                        <div className='flex column gap'>
                            <h3><span>Name:</span> {contact.name}</h3>
                            <h3><span>Email:</span> {contact.email}</h3>
                            <h3><span>Phone:</span> {contact.phone}</h3>
                        </div>
                    </div>
                    <TransferFunds contact={contact} onTransfer={this.transferCoins} />

                    <Link to={`/contact/edit/${contact._id}`}>
                        <img src={require('../assets/imgs/edit.png')} alt='icon'/>
                    </Link>
                </div>

                <MoveList user={user}/>
            </section>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = { transferCoins }

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage)
