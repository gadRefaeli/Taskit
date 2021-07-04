import React, { Component } from 'react'

export class CardAddTodo extends Component {

    state = {
        isEditing: false,
        todo: {
            title: '',
            isDone: false
        }
    }

    inputRef = React.createRef()

    componentDidUpdate() {
        this.state.isEditing && this.inputRef.current.focus()
    }

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })
    }

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ ...this.state, todo: { title: value } })
    }

    onEnter = (ev) => {
        if (ev.key === 'Enter') {
            const { todo } = this.state
            if (!todo.title || todo.title.charAt(0) === ' ' || todo.title.charAt(0) === '\n') {
                this.setState({ ...this.state, todo: { title: '' } })
                return
            }
            ev.preventDefault()
            this.onAddTodo()
            this.setState({ ...this.state, card: { title: '' } })
        }
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { todo } = this.state
        if (!todo.title || todo.title.charAt(0) === ' ') return
        this.onAddTodo()
        this.setState({ ...this.state, todo: { title: '' } })
    }

    onAddTodo = () => {
        this.props.onUpdateChecklist(this.state.todo)
    }

    render() {
        const { isEditing, todo: { title } } = this.state
        return (
            <React.Fragment>
                { !isEditing &&
                    <div className="todo-add-edit" >
                        <p className="todo-add-txt" onClick={this.onToggleMode}>Add an item</p>
                    </div>}
                {isEditing &&
                    <div className="todo-add-edit" >
                        <form action="">
                            <textarea type="text" ref={this.inputRef} value={title} placeholder='Enter a title...' onKeyPress={this.onEnter} onChange={this.handleChange} />
                            <div className="todo-add-btn" >
                                <span className="left-btn flex align-center">
                                    <button className="checklist-add-edit-btn" onClick={this.onSubmit}>Add</button>
                                    <button className="card-add-exit-btn" onClick={this.onToggleMode}></button>
                                </span>
                            </div>

                        </form>
                    </div>}
            </React.Fragment>
        )
    }
}