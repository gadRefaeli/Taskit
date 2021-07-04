import { Draggable } from 'react-beautiful-dnd'
import { MemberIcon } from './MemberIcon'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'


export function CardPreview({ onRemoveCard, card, index, onSaveCard, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, board, isQuickCardEditorOpen, toggelQuickEditor }) {

    const [previousX, setPreviousX] = useState(null);
    const [cardPreviewDragClass, setCardPreviewDragClass] = useState("card-preview-drag-right")

    function toggleDueDate(ev) {
        ev.stopPropagation()
        ev.stopPropagation()
        card.dueDate.isCompleted = !card.dueDate.isCompleted
        const action = card.dueDate.isCompleted ? 'COMPLETE_DUEDATE' : 'INCOMPLETE_DUEDATE'
        onSaveCard(card, card.currGroup.groupId, action)
    }

    function handleDrag({ provided }) {
        const { transform } = provided.draggableProps.style;
        const currentXPosition = +transform?.match(/\(.*\px,/g)[0].slice(1, -3);
        if (currentXPosition !== previousX) setPreviousX(currentXPosition);
        if (previousX && previousX !== currentXPosition) {
            const className = `card-preview-drag-${previousX < currentXPosition ? 'right' : 'left'}`;
            setCardPreviewDragClass(className)
            return className;
        }
        return cardPreviewDragClass;
    }

    function countDoneTodos(card) {
        let count = 0
        card.checklist.forEach(oneList => oneList.todos.forEach(todo => {
            if (todo.isDone === true)
                count++
        }))
        return count
    }

    function countTodos(card) {
        let count = 0
        card.checklist.forEach(oneList => oneList.todos.forEach(todo => {
            count++
        }))
        return count
    }

    return (
        <Draggable
            draggableId={card.id}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? '' : 'card-preview'}>
                    <div className={snapshot.isDragging ? handleDrag({ provided }) : 'drag-flex'}>
                        {card.cover && <div className="card-preview-cover" style={{ backgroundImage: `url(${card.cover})` }}></div>}
                        <div className="card-preview-body">
                            <div className="card-preview-labels" onClick={onOpenPreviewLabels}>{
                                card?.labels?.map((label, index) =>
                                    <div className={`card-preview-label ${label.color} ${isLebelOpen ? "open" : ""}`} key={index}>
                                        {isLebelOpen && <span>{label.name}</span>}
                                    </div>
                                )}
                            </div>
                            <button className="card-preview-remove-btn" onClick={() => onRemoveCard(card)}></button>
                            <Link to={`/board/${board._id}/${card.id}`} >
                                <button className="card-preview-edit-icon" onClick={() => toggelQuickEditor()}></button>
                                <div className="test-white-space">{card.title} </div>
                                <div className="card-preview-attachments" >{
                                    card?.attachments?.map((attachment, index) =>
                                        <img className="card-preview-attachments-img" src={attachment} alt="" key={index} />)}
                                </div>
                                <div className="card-preview-bottom">
                                    <div className="card-preview-bottom-list">
                                        {card?.attachments.length > 0 && <span className="card-attachment-icon"></span>}
                                        {card?.checklist.length > 0 && <>
                                            <span className="card-checklist-preview">
                                                <span className="card-checklist-icon"></span>
                                                <span>{countDoneTodos(card)}</span>
                                                <span>/</span>
                                                <span>{countTodos(card)}</span>
                                            </span>
                                        </>
                                        }
                                        {getActivitiesByCardId(card.id).length !== 0 &&
                                            <span className="card-preview-activities ">{getActivitiesByCardId(card.id).length}</span>}
                                        {card?.dueDate?.time ? <span onClick={(event) => toggleDueDate(event)} className={card.dueDate.isCompleted ? "card-preview-date checked" : "card-preview-date not-checked"}>
                                            <div className="card-preview-date-clock"></div>
                                            {(new Date(card.dueDate.time)).toString().split(' ')[1]
                                                + ' ' +
                                                (new Date(card.dueDate.time)).getUTCDate()
                                            }</span> : <span></span>}
                                        {card.description && <span className="icon-desription"></span>}
                                    </div>
                                    <div className="card-preview-members">{
                                        card.members &&
                                        card.members.map((member, index) =>
                                            <MemberIcon member={member} size={'small'} key={index} />
                                        )}
                                    </div>

                                </div>
                            </Link >
                        </div>
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Draggable >
    )
}
