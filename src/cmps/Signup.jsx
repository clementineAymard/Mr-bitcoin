import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from "react-router-dom";
import { signup } from '../store/actions/user.actions'

function _Signup(props) {

    let name = ''

    function onSignup(event) {
        event.preventDefault()
        props.signup(name)
        props.history.push('/contact')
    }

    function onHandleChange({ target }) {
        name = target.value
    }

    return (
        <form onSubmit={onSignup} className="signup flex column gap">
            <label htmlFor="name">Enter your name to signup</label>
            <input
                onChange={onHandleChange}
                type="text"
                name="name"
                id="name"
            />
            <button>Sign up</button>
        </form>
    )
}

const mapStateToProps = (state) => ({
    user: state.userModule.loggedInUser
})

const mapDispatchToProps = { signup }

export const Signup = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Signup))
