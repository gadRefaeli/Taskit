import { MemberIcon } from './MemberIcon'
export function CardMember(props) {

    const splitedName = props.boardMember.fullname.split(' ')
    let initials = splitedName.map(name => name[0])
    initials = initials.slice(0, 2)
    let isChecked = false

    if (props.cardMembers.length) {
        isChecked = Boolean(props.cardMembers.find(member => member._id === props.boardMember._id))
    }

    function onToggleState(ev) {
        ev.stopPropagation()
        props.toggleMember(props.boardMember, isChecked)
        isChecked = !isChecked
    }

    return (
        <div className="board-member" onClick={onToggleState}>
            <div className="clickable">
                {!props.boardMember.imgUrl && <span className="user-img-chat-add">{initials}</span>}
                <MemberIcon member={props.boardMember} size={'large'} />
                <span>{props.boardMember.fullname}</span>
            </div>
            {isChecked ? <p></p> : null}
        </div>
    )
}