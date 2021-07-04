import { loadBoard, removeGroup, saveCard, removeCard, saveGroup, updateBoard, updateBoardSockets } from '../store/action/board.action.js'
import { socketService } from '../services/socketService'
import { BoardHeader } from '../cmps/BoardHeader.jsx'
import { CardDetails } from '../cmps/CardDetails'
import { GroupList } from '../cmps/GroupList'
import logo from '../assets/img/loder.gif'
import React, { Component } from 'react'
import { connect } from 'react-redux'



class _BoardApp extends Component {

    state = {
        currGroupIdx: null,
        isLebelOpen: false,
        isQuickCardEditorOpen: false,
        filterBy: ''
    }

    async componentDidMount() {
        const boardId = this.props.match.params.boardId
        try {
            await this.onLoadBoard()
            socketService.emit('join board', boardId)
            socketService.on('board updated', (board) => {
                this.props.updateBoardSockets(board)
            })
        } catch (err) {
            console.log('Huge error', err);
        }
    }

    componentWillUnmount() {
        // socketService.off('board updated')
        // socketService.terminate()
    }

    onLoadBoard = () => {
        this.props.loadBoard(this.props.match.params.boardId, this.state.filterBy)
    }

    onUpdateBoard = (key, value) => {
        const newBoard = { ...this.props.board }
        newBoard[key] = value
        this.props.updateBoard(newBoard)
        socketService.emit('board updated', { newBoard, id: newBoard._id })
    }

    onUpdateBoard = (key, value) => {
        const newBoard = { ...this.props.board }
        newBoard[key] = value
        this.props.updateBoard(newBoard)
    }

    onSetFilter = (filterBy) => {
        this.props.loadBoard(this.props.match.params.boardId, filterBy)
    }

    onSaveGroup = (group, board, action) => {
        return this.props.saveGroup(group, board, action)
    }
    toggelQuickEditor = () => {
        const { isQuickCardEditorOpen } = this.state
        this.setState({ ...this.state, isQuickCardEditorOpen: !isQuickCardEditorOpen })
    }

    onRemoveGroup = (group) => {
        return this.props.removeGroup(group, this.props.board, 'REMOVE_GROUP')
    }

    onSaveCard = (card, groupId, action) => {
        this.props.saveCard(card, groupId, this.props.board, action)
    }

    onRemoveCard = (card) => {
        return this.props.removeCard(card, this.props.board)
    }

    onSetGroupIdx = (idx) => {
        this.setState(...this.state, { currGroupIdx: idx })
    }

    onOpenPreviewLabels = () => {
        this.setState({ isLebelOpen: !this.state.isLebelOpen })
    }

    onSetBackground = (background) => {
        const newBoard = { ...this.props.board, style: { ...this.props.board.style, bgImg: background } }
        this.props.updateBoard(newBoard)
    }

    getActivitiesByCardId = (cardId) => {
        const cardActivities = this.props.board.activities.filter(activity => activity.card?.id === cardId)
        return cardActivities;
    }

    render() {
        const { board } = this.props
        if (!board) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
        return (<>
            { (this.props.match.params.cardId) ? <CardDetails cardId={this.props.match.params.cardId} history={this.props.history} /> : <div></div>}
            <div className="board" style={{ backgroundImage: `url(${board?.style?.bgImg})` }}>
                <div className="fade"></div>
                <div className="borad-nav-color"></div>
                <BoardHeader
                    board={board}
                    props={this.props}
                    onSetFilter={this.onSetFilter}
                    loadBoard={this.props.loadBoard}
                    onUpdateBoard={this.onUpdateBoard}
                    updateBoard={this.props.updateBoard}
                    onSetBackground={this.onSetBackground}
                />
                <div className="board-container">
                    <GroupList
                        board={board}
                        groups={board.groups}
                        onSaveCard={this.onSaveCard}
                        onSaveGroup={this.onSaveGroup}
                        onRemoveCard={this.onRemoveCard}
                        onRemoveGroup={this.onRemoveGroup}
                        isLebelOpen={this.state.isLebelOpen}
                        toggelQuickEditor={this.toggelQuickEditor}
                        onOpenPreviewLabels={this.onOpenPreviewLabels}
                        getActivitiesByCardId={this.getActivitiesByCardId}
                    />
                </div>
            </div>
        </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    saveCard,
    loadBoard,
    saveGroup,
    removeCard,
    updateBoard,
    removeGroup,
    updateBoardSockets
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
