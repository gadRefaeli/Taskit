import { CardCheckList } from './CardCheckList'
import React, { Component } from 'react'

export class CardCheckListContainer extends Component {

    state = {
        checklist: null
    }

    componentDidMount() {
        this.setState({ checklist: this.props.checklist })
    }

    render() {
        const { onUpdateCardProps, board, card } = this.props
        if (!card.checklist || !card.checklist.length) return <></>
        return (
            <div className="checklists-container">
                {card.checklist.map(list => <CardCheckList
                    card={card}
                    list={list}
                    key={list.id}
                    board={board}
                    onUpdateCardProps={onUpdateCardProps}
                />)}
            </div>
        )
    }
}