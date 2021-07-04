import React, { Component } from 'react'

export class CardCoverList extends Component {

    state = {
        cover: ''
    }

    onSaveCover = (cover) => {
        this.props.onUpdateCardProps('cover', cover)
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
        return (
            <div className={`card-cover-list ${this.props.modalLoc}`}>
                <div className="card-cover-list-header">
                    <p></p>
                    <h3>cover</h3>
                    <button onClick={this.props.onToggle} className="close-save-edit btn-close-card-cover"></button>
                </div>
                <div className="cover-btns">
                    {backgroundURLs.map((backgroundURL, index) =>
                        <div key={index} onClick={() => this.onSaveCover(backgroundURL)} style={{ backgroundImage: `url(${backgroundURL})` }}></div>)}
                </div>
            </div>
        )
    }
}