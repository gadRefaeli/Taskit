import logo from '../assets/img/loder.gif'
import React, { Component } from 'react'
import { CardLabel } from './CardLabel'

export class CardLabelList extends Component {

    state = {
        labelName: '',
        boardLabels: [],
        isEditing: false,
        editedLabel: {}
    }

    colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'aqua', 'lightgreen',
        'pink', 'deepblue', 'gray']


    componentDidMount() {
        this.setState({ boardLabels: this.props.boardLabels })
    }

    onClickBoardLabel = (label, isChecked) => {
        let labels = this.props.card.labels
        if (!labels) labels = []
        if (!isChecked) {
            labels.push(label)
        } else {
            labels = labels.filter(cardlabel => cardlabel.id !== label.id)
        }
        this.props.onUpdateCardProps('labels', labels)
    }

    onClickEdit = (label) => {
        this.setState({ editedLabel: label })
        this.setState({ isEditing: true })
    }

    onEditSubmit = (editedLabel) => {
        let { boardLabels } = this.state
        const labelIdx = boardLabels.findIndex(label => label.id === editedLabel.id)
        boardLabels[labelIdx] = editedLabel
        this.props.onUpdateBoardLabels(boardLabels)
    }

    handleChange = (ev) => {
        this.setState({ labelName: ev.target.value })
    }

    handleLabelNameChange = (ev) => {
        this.setState({ editedLabel: { ...this.state.editedLabel, name: ev.target.value } })
    }

    onSetColor = (color) => {
        this.setState({ editedLabel: { ...this.state.editedLabel, color } })
    }

    render() {
        let { boardLabels, isEditing } = this.state
        if (!boardLabels || boardLabels.length === 0) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
        boardLabels = boardLabels.filter(label => label.name.toLowerCase().includes(this.state.labelName.toLowerCase()))
        if (!isEditing) {
            return (
                <div className={`card-label-list ${this.props.modalLoc}`} onClick={(ev) => { ev.stopPropagation() }}>
                    <div className="card-label-list-header">
                        <p></p>
                        <h3>Labels</h3>
                        <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-label"></button>
                    </div>
                    <input type="search" placeholder="Search labels" name="labelName"
                        value={this.state.labelName} onChange={this.handleChange} />
                    <h4>LABELS</h4>
                    {boardLabels.map(label => {
                        return <CardLabel key={label.id} boardLabel={label}
                            cardLabels={this.props.card.labels} toggleLabel={this.onClickBoardLabel}
                            onClickEdit={this.onClickEdit} />
                    })}
                </div>
            )
        } else {
            return (
                <div className={`card-label-list ${this.props.modalLoc}`} onClick={(ev) => { ev.stopPropagation() }}>
                    <div className="card-label-list-header">
                        <p className="btn-exp-edit-label clickable" onClick={() => this.setState({ isEditing: false })}></p>
                        <h3>Change label</h3>
                        <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-label"></button>
                    </div>
                    <h4>Name</h4>
                    <input type="text"
                        value={this.state.editedLabel.name} onChange={this.handleLabelNameChange} />
                    <h4>Select a color</h4>
                    <div className="label-colors">
                        <div>
                            {this.colors.map(color => <span className={`label-color ${(color !== 'gray') ? color : 'grayColor'} 
                                ${color === this.state.editedLabel.color ? 'select' : null}`}
                                onClick={() => this.onSetColor(color)}>{color === this.state.editedLabel.color ? <p></p> : null}</span>)}
                            <span className="text-container"><p className="text">No color.</p><p className="text"> This won't show up on the front of cards.</p></span>
                        </div>

                    </div>
                    <button className="btn-save" onClick={() => this.onEditSubmit(this.state.editedLabel)}>Save</button>
                </div>
            )
        }
    }
}