import React, { Component } from 'react'


export class GroupAdd extends Component {

    state = {
        isEditing: false,
        group: {
            title: ''
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

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, group: { title: value } })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        if (!this.state.group.title) return
        const { onSaveGroup } = this.props
        onSaveGroup(this.state.group, this.props.board, 'ADD_GROUP')
        this.setState({ ...this.state, group: { title: '' } })
    }

    render() {
        const { isEditing, group: { title } } = this.state
        return (<React.Fragment>

            { !isEditing &&
                <div className="group-add" >
                    <p className="add-txt" onClick={this.onToggleMode}>Add another list</p>
                </div>}

            {isEditing &&
                <div className="group-add-edit" >
                    <form action="">
                        <input type="text" ref={this.inputRef} value={title} onChange={this.handleChange} placeholder="Enter list title..." />
                        <div className="group-add-edit-btn">
                            <button className="add-list-btn" onClick={this.onSubmit}>Add list</button>
                            <button className="censel-add-list-btn" onClick={this.onToggleMode}></button>
                        </div>
                    </form>
                </div>}
        </React.Fragment>
        )
    }
}
