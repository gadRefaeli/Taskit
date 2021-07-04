import { loadBoards, addBoard } from '../store/action/board.action.js'
import { BoardAdd } from '../cmps/BoardAdd'
import logo from '../assets/img/loder.gif'
import { NavLink } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class _Boards extends Component {
  state = {
    boards: null,
    addNewModal: false,
  }

  componentDidMount() {
    this.onLoadBoards()
  }

  onLoadBoards = () => {
    this.props.loadBoards()
    this.setState({ boards: this.props.boards })
  }

  onNewBoard = (title, backgroundURL) => {
    return this.props.addBoard(title, backgroundURL, this.props.history)
  }

  toggleModal = () => {
    const { addNewModal } = this.state
    this.setState({ ...this.state, addNewModal: !addNewModal })
  }

  render() {
    if (!this.state.boards) return <div className="loader-page"> <img src={logo} alt="loading..." /></div>
    const TemplateBoards = this.props?.boards?.filter(board => board.isTemplate);
    const NoTemplateBoards = this.props?.boards?.filter(board => !board.isTemplate);
    const { addNewModal } = this.state
    return (
      <div className="borads">
        <div className="borads-background"></div>
        <div className="home-nav"></div>
        <h2 >TEMPLATES</h2>
        <h1 className="borads-container-title-a">All Taskit Template</h1>
        <div className="borads-container">
          {TemplateBoards.map((board, index) =>
            <div className="borad-preview" key={index}
              style={{ backgroundImage: `url(${board.style.bgImg})` }}
              onClick={() => this.props.addBoard(board.title, board.style.bgImg, this.props.history, board)} >
              <span className="borad-preview-fade"></span>
              <span className="borad-preview-fade-text"><div className="borad-preview-fade-template">Template</div>{board.title}</span>
            </div>
          )}
          <button className="borads-container-add-btn" onClick={this.toggleModal}>Add new borad </button>
        </div>
        <h2>YOUR WORKSPACES</h2>
        <h1 className="borads-container-title-b">Our Taskit Project</h1>
        <div className="borads-container">
          {NoTemplateBoards.map((board, index) =>
            <NavLink to={`board/${board._id}?`} key={index}>
              <div className="borad-preview" key={board._id} style={{ backgroundImage: `url(${board.style.bgImg})` }}><span className="borad-preview-fade"></span><span className="borad-preview-fade-text">{board.title}</span> </div>
            </NavLink>)}
        </div>
        {addNewModal && <BoardAdd onNewBoard={this.onNewBoard} toggleModal={this.toggleModal} boards={this.props.boards} history={this.props.history} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
  }
}

const mapDispatchToProps = {
  loadBoards,
  addBoard
}

export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)
