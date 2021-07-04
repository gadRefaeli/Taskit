export function Footer() {

  return (
    <div className="footer">
      <h2>Meet the Team</h2>
      <div className="presentors-imgs">
        <div className="presentor">
          <div className="presentors-img" style={{ backgroundImage: `url("https://res.cloudinary.com/taskit-sprint/image/upload/v1622668300/members%20taskit/gad_ljlro4.jpg")` }}>
          </div> <h1>Gad Refaeli </h1>
        </div>
        <div className="presentor">
          <div className="presentors-img" style={{
            backgroundImage: `url("https://res.cloudinary.com/taskit-sprint/image/upload/v1623081734/members%20taskit/new_zygwjp.jpg")`
          }}></div>
          <h1>Oded Alon </h1>
        </div>
        <div className="presentor">
          <div className="presentors-img" style={{ backgroundImage: `url("https://res.cloudinary.com/taskit-sprint/image/upload/v1622668301/members%20taskit/aviv_hkgpml.jpg")` }}></div>
          <h1>Aviv Azulay</h1>
        </div>
      </div>
    </div>
  )


}