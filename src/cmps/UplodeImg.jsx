import { cloudinaryService } from '../services/cloudinaryService'
import { Component } from 'react'

export class UplodeImg extends Component {
  state = {
    imgUrl: null,
    height: 500,
    width: 500,
    isUploading: false
  }

  uploadImg = async (ev) => {
    this.setState({ isUploading: true })
    const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
    this.setState({ isUploading: false, imgUrl: secure_url, height, width })
    const url = []
    url.push(secure_url)
    this.props.onUpdateCardProps('attachments', url, 'ATTACHMENT', this.props.card)
  }

  get uploadMsg() {
    const { imgUrl, isUploading } = this.state
    if (imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  render() {
    return (
      <span className="upload-preview" >
        <input type="file" onChange={this.uploadImg} accept="img/*" id="imgUpload" />
      </span>
    )
  }
}
