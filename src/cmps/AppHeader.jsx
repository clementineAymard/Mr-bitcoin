import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { userService } from "../services/user.service";
import { logout } from "../store/actions/user.actions";


function _AppHeader(props) {
    const logout = () => {
        props.logout()
    }
    const loggedInUser = props.loggedInUser
    console.log(loggedInUser)
    const userName = 'x' //loggedInUser.name ? loggedInUser.name.split(' ').slice(0, 1)[0] : 'Signup'

    return (
        <header className='app-header full'>
            <div>
                <NavLink exact to="/" >
                    <div className="logo">
                        Mister Bitcoin
                    </div>
                </NavLink>
                <div className="user-details flex gap align-center">
                    <img src={require('../assets/imgs/user.png')} alt='icon'></img>
                    <span>{userName}</span> |
                    <button onClick={logout}>Logout</button>
                </div>

                <nav className='header-nav'>
                    <NavLink exact to="/" >
                        <img src={require('../assets/imgs/maison.png')} alt='icon'></img>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/contact">
                        <img src={require('../assets/imgs/user.png')} alt='icon'></img>
                        <span>Contacts</span>
                    </NavLink>
                    <NavLink to="/statistics">
                        <img src={require('../assets/imgs/statistics.png')} alt='icon'></img>
                        <span>Statistics</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    loggedInUser: state.userModule.loggedInUser
})
const mapDispatchToProps = { logout }

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))