import React, { Component } from 'react'
import { MoveList } from '../cmps/MoveList.jsx'
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'
import { Signup } from '../cmps/Signup.jsx'

export class HomePage extends Component {

    state = {
        user: null,
        rate: null,
    }

    async componentDidMount() {
        try {
            const rate = await bitcoinService.getRate()
            this.setState({
                user: userService.getUser(),
                rate: rate,
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        console.log('home rendering')
        const { user, rate } = this.state

        if (!user) return (
            <section className="homepage">
                <span>Welcome to Mister-bitcoin!</span>
                <Signup />
            </section>
        )

        return (
            <section className="homepage">
                <span>Welcome to Mister-bitcoin!</span>


                <div className='user-info full'>
                    <div className='flex gap align-center'>
                        <img src={`https://robohash.org/12?set=set5`} alt='icon'/>
                        <h1>{user.name}</h1>
                    </div>
                    <div className='details flex column gap'>
                        <div className='flex align-center gap'>
                            <img src={require("../assets/imgs/coins.png")} alt='icon'/>
                            <span> Coins : {user.coins}</span>
                        </div>
                        <div className='flex align-center gap'>
                            <img src={require("../assets/imgs/bitcoin.png")} alt='icon'/>
                            <span> BTC : {rate}</span>
                        </div>
                    </div>
                    <div className='moves'>
                        <MoveList user={user} />
                    </div>
                </div>

            </section>
        )
    }
}
