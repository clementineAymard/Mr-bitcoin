import React from 'react'

export default function MovePreview({ move }) {
    const at = new Intl.DateTimeFormat('fr', { dateStyle: 'short', timeStyle: "short" }).format(move.at)

    return (
        <section className='move-preview flex space-between gap align-center move-list-layout'>
            <h2>
                {move.to}
            </h2>
            <h2>
                {at}
            </h2>
            <h2>
                {move.amount}
            </h2>
        </section>
    )
}
