import React, { Component } from 'react'

export class ContactFilter extends Component {
    state = {
        filterBy: null
    }

    componentDidMount() {
        this.setState({ filterBy: { ...this.props.filterBy } })
    }
    
    render() {
        const {filterBy} = this.state
        if(!filterBy) return
        return (
            <input type="text" value={filterBy.term} className='contact-filter' onChange={this.props.onSearch} placeholder="Search" />
        )
    }
}

