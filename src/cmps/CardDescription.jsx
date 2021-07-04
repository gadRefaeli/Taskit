import React, { Component } from 'react'

export class CardDescription extends Component {

    state = {
        description: '',
        isEditing: false
    }

    componentDidMount() {
        this.setDescriptionFromProps()
    }

    setDescriptionFromProps = () => {
        let description = this.props.description
        if (!description) description = ''
        this.setState({ description })
    }

    onChange = (ev) => {
        const description = ev.target.value
        this.setState({ description: description })
    }

    toggleEditMode = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }

    onSave = () => {
        this.props.onUpdateCardProps('description', this.state.description)
        this.toggleEditMode()
    }

    descriptionText = () => {
        if (!this.state.description) return 'Add a more detailed description…'
        return this.state.description
    }

    descriptionContainer = () => {
        if (!this.state.isEditing)
            return (
                <div className="adit-details-description-textarea-continer" onClick={this.toggleEditMode}><textarea className="adit-details-description-textarea" value={this.state.description} placeholder="Enter a more details description here..." onChange={this.onChange} /></div>
            )
        return (
            <div>
                <textarea className="edit-details-description-textarea"
                    value={this.state.description}
                    autoFocus onChange={this.onChange}
                    onBlur={this.onSave}
                    placeholder="Enter a more details description here..." />
                <div className="edit-details-description-btns">
                    <button onClick={this.onSave} className="save-btn">Save</button>
                    <button className="card-add-exit-btn" onClick={this.onToggleMode}></button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="item-details-description">
                <div>
                    {this.descriptionContainer()}
                </div>
            </div>
        )
    }
}