import { utilService } from '../services/util-service'
import React, { Component } from 'react'

export class CardAddCheckList extends Component {

    state = {
        title: 'Checklist',
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        this.setState({ title: ev.target.value })
    }

    onAdd = () => {
        const { card, onUpdateCardProps } = this.props
        const list = {
            id: utilService.makeId(),
            title: this.state.title,
            todos: []
        }
        if (!card.checklist) card.checklist = []
        card.checklist.push(list)
        onUpdateCardProps('checklist', card.checklist, 'ADD_CHECKLIST', list)
    }

    render() {
        let { title } = this.state
        return (
            <div className={`card-add-checklist ${this.props.modalLoc}`} onClick={(ev) => { ev.stopPropagation() }}>
                <div className="card-add-checklist-header">
                    <p></p>
                    <h3>Add checklist</h3>
                    <button onClick={this.props.onToggle} className="close-save-edit "></button>
                </div>
                <h4>Title</h4>
                <input type="txt" onFocus={(ev) => ev.target.select()} ref={this.inputRef} placeholder="Checlist name"
                    value={title} onChange={this.handleChange} />
                <div></div>
                <button onClick={this.onAdd}>Add</button>
            </div>
        )
    }
}