export function MemberIcon(member) {

  const splitedName = member.member.fullname.split(' ');
  let initials = splitedName.map(name => name[0])
  initials = initials.slice(0, 2);

  return (
    <>
      {member.member.imgUrl ? <span className={`user-img-chat-large`} style={{ backgroundImage: `url(${member.member.imgUrl})` }}></span> : <span className="user-img-chat">{initials}</span>}
    </>
  )
}