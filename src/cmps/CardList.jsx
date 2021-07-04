import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'

export function CardList({ onRemoveCard, group, getActivitiesByCardId, onSaveCard, onOpenPreviewLabels, isLebelOpen, board, isQuickCardEditorOpen, toggelQuickEditor }) {

  return (
    <Droppable droppableId={group.id} type="card">
      {provided => (
        <div
          className="card-list-inner"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="card-container">
            {group.cards?.map((card, index) => {
              return <CardPreview
                card={card}
                index={index}
                board={board}
                key={card.id}
                onSaveCard={onSaveCard}
                isLebelOpen={isLebelOpen}
                onRemoveCard={onRemoveCard}
                toggelQuickEditor={toggelQuickEditor}
                onOpenPreviewLabels={onOpenPreviewLabels}
                isQuickCardEditorOpen={isQuickCardEditorOpen}
                getActivitiesByCardId={getActivitiesByCardId}
              />
            })}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}