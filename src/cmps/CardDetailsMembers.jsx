export function CardDetailsMembers(props) {

    let initials = props.members.map((member) => {
        let splitedName = member.fullname.split(' ')
        let initials = splitedName.map(name => name[0])
        initials = initials.slice(0, 2)
        return member.imgUrl ? <span className="user-img-chat-large" style={{ backgroundImage: `url(${member.imgUrl})` }}></span> : <span className="user-img-chat-large">{initials}</span>
    })

    return (
        <div className="card-details-members">
            <h1>MEMBERS</h1>
            <div className="flex">{props.members.length > 0 && initials}
                <div className="card-details-members-open clickable" onClick={() => props.onToggle()}></div>
            </div>
        </div>

    )
}