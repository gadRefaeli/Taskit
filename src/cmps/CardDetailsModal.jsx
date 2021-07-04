import { CardAddCheckList } from './CardAddCheckList'
import { CardMemberList } from './CardMemberList'
import { CardLabelList } from './CardLabelList'
import { CardCoverList } from './CardCoverList'

export function CardDetailsModal({ modalType, board, modalLoc, card, onToggleModal,
    onUpdateCardProps, boardMembers, boardLabels, onUpdateBoardLabels }) {

    const DynamicCmp = (props) => {
        switch (modalType) {
            case 'members':
                return <CardMemberList {...props} />
            case 'labels':
                return <CardLabelList {...props} />
            case 'checklist':
                return <CardAddCheckList {...props} />
            case 'cover':
                return <CardCoverList {...props} />
            default:
                break
        }

    }
    return (
        <DynamicCmp
            card={card}
            board={board}
            modalLoc={modalLoc}
            onToggle={onToggleModal}
            boardLabels={boardLabels}
            boardMembers={boardMembers}
            onUpdateCardProps={onUpdateCardProps}
            onUpdateBoardLabels={onUpdateBoardLabels}
        />
    )
}