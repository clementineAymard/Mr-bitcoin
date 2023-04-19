import React from 'react'
import MovePreview from './MovePreview'

export function MoveList(props) {
    const { moves } = props.user
    return (

        <section className='moves flex column'>
            <h2>Your moves</h2>
            <div className='move-list-layout underline'>
                <span>To contact</span>
                <span>When</span>
                <span>How much</span>
            </div>
            <section className='move-list '>
                {moves.map(move =>
                    <MovePreview key={move.at} move={move} />
                )}
            </section>
        </section>
    )
}
