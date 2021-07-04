
import { utilService } from '../services/util-service'
import { Button, Checkbox } from '@material-ui/core'
import React, { Component } from 'react'

export class CardChecklistTodo extends Component {

    state = {
        isDone: false,
        isEditing: false,
        txtValue: '',
        todo: null
    }

    componentDidMount() {
        this.updateTodo()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.txtValue !== this.state.txtValue || prevState.isDone !== this.state.isDone) this.updateChecklist(this.state.checklist)
    }

    handleChange = (ev) => {
        ev.stopPropagation()
        this.setState({ isDone: ev.target.checked }, () => {
            const card = { ...this.props.card }
            card.txtValue = this.state.txtValue
        })
    }

    toggleEditing = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    removeText = () => {
        this.setState({ txtValue: '' })
    }

    getTodoClassName = () => {
        const doneClass = (this.state.isDone) ? 'todo-done' : 'todo-not-done'
        return `checklist-todo-title ${doneClass}`
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.updateChecklist()
    }

    updateTodo = () => {
        const todo = this.props.todo
        if (!todo) return
        const txtValue = todo.title
        const isDone = todo.isDone
        this.setState({ ...this.state, isDone, txtValue })
    }

    onChange = (ev) => {
        ev.stopPropagation()
        this.setState({ txtValue: ev.target.value })
    }

    onRemove = () => {
        this.props.todo.title = ''
        this.props.onUpdateChecklist(this.props.todo)
    }

    updateChecklist = () => {
        const { isDone, txtValue } = this.state
        let id;
        if (this.props.todo) {
            id = this.props.todo.id
        } else {
            id = utilService.makeId()
        }
        const todo = {
            id,
            isDone: isDone,
            title: txtValue
        }
        this.props.onUpdateChecklist(todo)
    }

    render() {
        if (!this.props.displayCompleted && this.state.isDone) return <React.Fragment />

        if (this.state.isEditing)
            return (
                <div className="checklist-todo flex">
                    <Checkbox color="primary" checked={this.state.isDone} className="checkbox-todo" />
                    <form onBlur={this.toggleEditing} onSubmit={this.onSubmit}>
                        <input className="checkbox-text-edit" type="text" autoFocus value={this.state.txtValue} onChange={this.onChange} />
                        <button className="save-btn" type="submit">Save</button>
                    </form>
                </div>
            )
        return (
            <div className="checklist-todo flex">
                <Checkbox color="primary" checked={this.state.isDone} onChange={this.handleChange} className="checkbox-todo" />
                <div className={this.getTodoClassName()} onClick={this.toggleEditing}>
                    {this.state.txtValue}
                    <Button onClick={this.onRemove}>
                    </Button>
                </div>
            </div>
        )
    }
}
