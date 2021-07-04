import { GroupPreview } from './GroupPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'
import { GroupAdd } from './GroupAdd.jsx'

export function GroupList({ board, onRemoveGroup, groups, onSaveCard, onRemoveCard, onSaveGroup, getActivitiesByCardId, onOpenPreviewLabels, isLebelOpen, isQuickCardEditorOpen, toggelQuickEditor }) {

  return (
    <div className="group-list-container">
      <Droppable
        droppableId={board._id}
        direction="horizontal"
        type="group">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="group-list">
            {groups?.map((group, index) => <GroupPreview
              group={group}
              index={index}
              board={board}
              key={group.id}
              onSaveCard={onSaveCard}
              isLebelOpen={isLebelOpen}
              onSaveGroup={onSaveGroup}
              onRemoveCard={onRemoveCard}
              onRemoveGroup={onRemoveGroup}
              toggelQuickEditor={toggelQuickEditor}
              onOpenPreviewLabels={onOpenPreviewLabels}
              isQuickCardEditorOpen={isQuickCardEditorOpen}
              getActivitiesByCardId={getActivitiesByCardId}
            />)}
            {provided.placeholder}
            <GroupAdd
              board={board}
              onSaveGroup={onSaveGroup}
            />
          </div>
        )}
      </Droppable>
    </div>
  )
}