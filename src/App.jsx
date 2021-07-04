import { updatePosition, updateBoard, loadBoard } from './store/action/board.action.js'
import { HashRouter as Router, Route } from 'react-router-dom'
import { socketService } from './services/socketService'
import { DragDropContext } from 'react-beautiful-dnd'
import { Header } from './cmps/Header.jsx'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routes } from './routes.js'
import './App.css'


class _App extends Component {

  componentDidMount() {
    socketService.setup()
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (!draggableId) return

    if (type === 'card') {
      const startGroupIndex = this.props.board.groups.findIndex(group => group.id === source.droppableId)
      const endGroupIndex = this.props.board.groups.findIndex(group => group.id === destination.droppableId)

      // Moving in same group
      if (source.droppableId === destination.droppableId) {

        const currGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const currCard = currGroup.cards.find(card => card.id === draggableId)
        const newCardsGroup = Array.from(currGroup.cards)
        newCardsGroup.splice(source.index, 1)
        newCardsGroup.splice(destination.index, 0, currCard)
        const newGroup = { ...currGroup, cards: newCardsGroup }
        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = newGroup
        const newBoard = { ...this.props.board, groups: newGroups }
        this.props.updatePosition(newBoard)
        return
      }

      // Moving between groups
      if (source.droppableId !== destination.droppableId) {

        const destinationGroup = this.props.board.groups.find(group => group.id === destination.droppableId)
        const formerGroup = this.props.board.groups.find(group => group.id === source.droppableId)
        const currCard = formerGroup.cards.find(card => card.id === draggableId)
        const formerCardIndex = formerGroup.cards.findIndex(card => card.id === draggableId)
        const newCardsArray = Array.from(destinationGroup.cards)

        currCard.currGroup.groupId = destinationGroup.id
        newCardsArray.splice(destination.index, 0, currCard)
        formerGroup.cards.splice(formerCardIndex, 1)

        const newGroups = [...this.props.board.groups]
        newGroups[startGroupIndex] = formerGroup
        newGroups[endGroupIndex].cards = newCardsArray

        const newBoard = { ...this.props.board, groups: newGroups }

        this.props.updatePosition(newBoard)
        this.props.updateBoard(newBoard)
      }



    }
    if (type === 'group') {
      const newGroupsOrder = Array.from(this.props.board.groups)
      const currGroup = this.props.board.groups.find(group => group.id === draggableId)

      newGroupsOrder.splice(source.index, 1)
      newGroupsOrder.splice(destination.index, 0, currGroup)

      const newBoard = {
        ...this.props.board,
        groups: newGroupsOrder
      }
      this.props.updatePosition(newBoard)
      return
    }
  }

  render() {

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Router>
          <Header board={this.props.board} />
          <main>
            {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
          </main>
        </Router >
      </DragDropContext>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  }
}

const mapDispatchToProps = {
  updatePosition,
  updateBoard,
  loadBoard
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
