import React, { Component } from 'react'

export class BoardAdd extends Component {

  state = {
    newboard: {
      title: '',
      backgroundURL: ''
    }
  }

  handleChange = (ev) => {
    const { value } = ev.target
    this.setState({ ...this.state, newboard: { ...this.state.newboard, title: value } })
  }

  setBackground = (URL) => {
    this.setState({ ...this.state, newboard: { ...this.state.newboard, backgroundURL: URL } })
  }

  onSubmit = (ev) => {
    ev.preventDefault()
    const { newboard } = this.state
    if (!newboard.title) return
    this.props.onNewBoard(newboard.title, newboard.backgroundURL)
    this.setState({ ...this.state, newboard: { title: '', backgroundURL: '' } })
    this.props.toggleModal()
  }

  render() {

    const backgroundURLs = [
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555555/background%20for%20Taskit/Layer_10_xkxb0s.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555555/background%20for%20Taskit/Layer_9_epgs5d.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555555/background%20for%20Taskit/Layer_3_fgx12a.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555555/background%20for%20Taskit/Layer_8_sstdao.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555554/background%20for%20Taskit/Layer_6_qxi41u.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555555/background%20for%20Taskit/Layer_7_fuzn2p.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555554/background%20for%20Taskit/Layer_2_etd492.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555554/background%20for%20Taskit/Layer_4_ozwqlv.jpg",
      "https://res.cloudinary.com/taskit-sprint/image/upload/v1622555554/background%20for%20Taskit/Layer_5_dxwxr7.jpg"
    ]

    const { newboard: { title } } = this.state

    return (<React.Fragment>
      <div className="window-screen">
        <div className="board-add" >
          <div className="board-add-modal" >
            <form action="">
              <div className="newboard-add-hedder">
                <input type="text" ref={this.inputRef} value={title} placeholder='Enter board title...' onKeyPress={this.onEnter} onChange={this.handleChange} />
                <button className="newboard-add-exit-btn" onClick={this.props.toggleModal}></button>
              </div>
              <div className="board-add-btn" >
                <div className="thumbnail">
                  {backgroundURLs.map((backgroundURL, index) =>
                    <button className={this.state.newboard.backgroundURL === backgroundURL ? 'active' : ''} key={index} onClick={() => this.setBackground(backgroundURL)} style={{ backgroundImage: `url(${backgroundURL})` }}></button>)}
                </div>
              </div>
              <button className="newboard-add-edit-btn" onClick={this.onSubmit}>Add board</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }
}
