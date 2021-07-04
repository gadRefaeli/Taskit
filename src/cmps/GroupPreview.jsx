import { SmartTitleEdit } from './SmartTitleEdit'
import { Draggable } from 'react-beautiful-dnd'
import { CardList } from './CardList'
import { CardAdd } from './CardAdd'
import React from 'react'


export function GroupPreview({ onSaveGroup, onRemoveGroup, group, onRemoveCard, onSaveCard, index, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, board, isQuickCardEditorOpen, toggelQuickEditor }) {

    function removeGroup(groupId) {
        onRemoveGroup(groupId, board)
    }

    return (
        <Draggable
            draggableId={group.id}
            index={index}
        >
            {(provided) => (
                <div
                    className='group-preview'
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <div className="group-preview-header">
                        <SmartTitleEdit group={group} onSaveGroup={onSaveGroup} board={board} />
                        <button onClick={() => removeGroup(group)} className="group-preview-header-btn"></button>
                    </div>
                    <div className="card-list-and-add">
                        <CardList
                            group={group}
                            board={board}
                            onSaveCard={onSaveCard}
                            isLebelOpen={isLebelOpen}
                            onRemoveCard={onRemoveCard}
                            toggelQuickEditor={toggelQuickEditor}
                            onOpenPreviewLabels={onOpenPreviewLabels}
                            isQuickCardEditorOpen={isQuickCardEditorOpen}
                            getActivitiesByCardId={getActivitiesByCardId}
                        />
                        <CardAdd
                            group={group}
                            board={board}
                            onSaveCard={onSaveCard} />
                    </div>
                </div>

            )}
        </Draggable>
    )
}


