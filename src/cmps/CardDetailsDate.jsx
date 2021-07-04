import { Checkbox } from '@material-ui/core'
import React, { Component } from 'react'

export class CardDetailsDate extends Component {

    state = {
        isDone: false,
    }

    componentDidMount() {
        const { card } = this.props
        this.setState({ isDone: card.dueDate.isCompleted })
    }

    handleChange = (ev) => {
        ev.preventDefault()
        const { card, onUpdateCardProps } = this.props
        let checkStatus = ev.target.checked
        this.setState({ isDone: checkStatus })
        card.dueDate.isCompleted = checkStatus
        !ev.target.checked && onUpdateCardProps('dueDate', card.dueDate, 'INCOMPLETE_DUEDATE')
        ev.target.checked && onUpdateCardProps('dueDate', card.dueDate, 'COMPLETE_DUEDATE')
    }

    displayDueDate = () => {
        const { card } = this.props
        return card.dueDate && <span>{(new Date(card?.dueDate?.time)).toString().split(' ')[1]
            + ' ' +
            (new Date(card?.dueDate?.time)).getUTCDate() + ' at ' +
            (new Date(card?.dueDate?.time)).getHours() + ':' +
            (((new Date(card?.dueDate?.time)).getMinutes().toString().length === 1) ?
                '0' + (new Date(card?.dueDate?.time)).getMinutes() : (new Date(card?.dueDate?.time)).getMinutes())
        }</span>
    }


    render() {
        const { isDone } = this.state
        return (
            <div className="due-date-edit-preview">
                <h6>DUE DATE</h6>
                <div className="due-date-edit-preview-body">
                    <Checkbox checked={isDone} onChange={this.handleChange} className="checkbox-todo" />
                    {this.displayDueDate()}
                    {isDone && <div className="completed">COMPLETED</div>}
                </div>
            </div>
        )
    }
}
