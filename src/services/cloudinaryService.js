export const cloudinaryService = {
  uploadImg,
  getLastUplode
}

let lastGetURL

function getLastUplode() {
  return lastGetURL
}

function uploadImg(ev) {
  const CLOUD_NAME = 'taskit-sprint'
  const PRESET_NAME = 'f0p0ntfj'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData();
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', PRESET_NAME);

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      lastGetURL = res.secure_url
      return res
    })
    .catch(err => console.error(err))
}
