import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function BiographyMake(wrapped) {
  const prop = wrapped.prop;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ===========================================================================
  // ------------------------ Extracting Functions -----------------------------
  function extract(work) {
    return <li> {work.title}</li>;
  }
  function extract5(works) {
    let res = works.slice(0, 5);
    return res.map((item) => (extract(item)));
  }
  // ===========================================================================

  return (
    <>
      <a onClick = {handleShow} href = "#">
        <img  className = "profile-pic" src = {prop.photo} onClick = {handleShow} ></img>
      </a>
      
      
      <Offcanvas className="Canvas" show={show} onHide={handleClose} placement="bottom" style={{ height: "75vh" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >
            <h1 style={{ textJustify: "center" }}>{prop.complete_name}</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <div style={{ display: "flex", width: "80vw", flexWrap: "wrap", flexFlow: "row", justifyContent: "center" }}>
            <div style={{ width: "40rem", display: "flex", justifyContent: "center" }}>
              <img src={prop.photo_canvas} style={{ width: "60%", objectFit: "cover" }}></img>
            </div>
            <div style={{ width: "40rem" }}>
              <p>{prop.wiki_page}</p>
              <br></br>
              <h2>Sample Works: </h2>
              {extract5(prop.works)}
              <br></br>
              <p><i>information taken from <br></br>{prop.cite}</i></p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
  // Skeleton taken from react-bootstrap.
}
