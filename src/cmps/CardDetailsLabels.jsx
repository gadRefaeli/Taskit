export function CardDetailsLabels(props) {

    let lables = props.labels.map((label, index) => {
        return <span key={index} className={`label-name ${(label.color !== 'gray') ? label.color : 'grayColor'}`}>{label.name}</span>
    })

    return (
        <div className="card-details-labels">
            <h1>LABELS</h1>
            <div className="flex">{props.labels.length > 0 && lables}
                {props.labels.length > 0 && <div className="card-details-labels-open clickable" onClick={() => props.onToggle()}></div>}
            </div>
        </div>
    )
}