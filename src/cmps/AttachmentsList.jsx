import React, { Component } from 'react'

export class AttachmentsList extends Component {
  state = {
    labelName: '',
    boardLabels: []
  }

  render() {
    return (
      <div className="card-preview-attachments" >{
        this.props.card.attachments.map((attachment, index) =>
          <img className="card-preview-attachments-img-details" src={attachment} alt="" key={index} />)}
      </div>
    )
  }
}