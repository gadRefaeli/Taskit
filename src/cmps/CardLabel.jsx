export function CardLabel(props) {

    let isChecked = false

    if (props.cardLabels.length) {
        isChecked = Boolean(props.cardLabels.find(label => label.id === props.boardLabel.id))
    }

    function onToggleCheck(ev) {
        ev.stopPropagation()
        props.toggleLabel(props.boardLabel, isChecked)
        isChecked = !isChecked
    }

    function onClickEdit(ev) {
        ev.stopPropagation()
        props.onClickEdit(props.boardLabel)
    }

    const { name, color } = props.boardLabel
    return (
        <div className="board-label">
            <div>
                <span className={`board-label-name ${(color !== 'gray') ? color : 'grayColor'} clickable`} onClick={onToggleCheck}>{name}
                    {isChecked ? <span className="checked"></span> : null}
                </span>
                <p onClick={onClickEdit}></p>
            </div>
        </div>
    )
}