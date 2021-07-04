import logo from '../assets/img/loder.gif'
import React, { Component } from 'react'
import { CardMember } from './CardMember'

export class CardMemberList extends Component {

    state = {
        memberName: '',
        boardMembers: []
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.setState({ boardMembers: this.props.boardMembers })
    }

    onClickBoardMember = (member, isChecked) => {
        let members = this.props.card.members
        let card = { ...this.props.card }
        if (!isChecked) {
            members.push(member)
            card.addedMember = member
            this.props.onUpdateCardProps('members', members, 'ADD_MEMBER', member)
        } else {
            members = members.filter(cardMember => cardMember._id !== member._id)
            card.removedMember = member
            this.props.onUpdateCardProps('members', members, 'REMOVE_MEMBER', member)
        }
    }

    handleChange = (ev) => {
        this.setState({ memberName: ev.target.value })
    }

    render() {
        let { boardMembers } = this.state
        if (!boardMembers || boardMembers.length === 0) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
        boardMembers = boardMembers.filter(member => member.fullname.toLowerCase().includes(this.state.memberName.toLowerCase()))
        return (
            <div className={`card-member-list ${this.props.modalLoc}`} onClick={(ev) => { ev.stopPropagation() }}>
                <div className="card-member-list-header">
                    <p></p>
                    <h3>Members</h3>
                    <button onClick={this.props.onToggle} className="close-save-edit "></button>
                </div>

                <input type="search" ref={this.inputRef} placeholder="Search members" name="memberName"
                    value={this.state.memberName} onChange={this.handleChange} />
                <h4>BOARD MEMBERS</h4>
                {boardMembers.map(member => {
                    return <CardMember key={member._id} boardMember={member}
                        cardMembers={this.props.card.members} toggleMember={this.onClickBoardMember} />
                })}
            </div>
        )
    }
}