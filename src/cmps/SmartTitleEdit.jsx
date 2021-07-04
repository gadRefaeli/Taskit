import logo from '../assets/img/loder.gif'
import React, { Component } from 'react'

export class SmartTitleEdit extends Component {

    state = {
        isEditing: false,
        group: null,
        card: null,
        data: null,
        prevTitle: ''
    }

    componentDidMount() {
        const { card, group } = this.props
        if (group) {
            this.setState({ ...this.state, group: group, prevTitle: group.title, data: { ...group } })
        }
        if (card) {
            this.setState({ ...this.state, card: card, prevTitle: card.title, data: { ...card } })
        }
    }

    onToggleMode = () => {
        const { isEditing } = this.state
        this.setState({ ...this.state, isEditing: !isEditing })
    }

    handleChange = ({ target }) => {
        const { value } = target
        this.setState({ ...this.state, data: { ...this.state.data, title: value } })
    }

    onSubmit = () => {
        const { prevTitle, data, card, group } = this.state
        if (!data.title) {
            this.setState({ ...this.state, data: { ...data, title: prevTitle } })
            this.onToggleMode()
            this.setState({ ...this.state, prevTitle: data.title })
            return
        }
        this.onToggleMode()
        if (card) this.props.saveCard(data, data.currGroup.groupId, this.props.board)
        if (group) this.props.onSaveGroup(data, this.props.board)
    }

    render() {
        const { group, card, data } = this.state

        if ((!group && !card)) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
        return (
            <input className="edit-details-textarea-header"
                data="text"
                value={data.title}
                onBlur={this.onSubmit}
                onChange={this.handleChange}>
            </input>
        )
    }
}
