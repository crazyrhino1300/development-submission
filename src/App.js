
import './App.css';
import composers from "./assets/composers.json";
import composerComp from "./composer.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Overlay from './hoverbutton.js';



function App() {
  const [total, totalYear] = useState(0);
  const [totalno, favtotal] = useState(0);
  const [favorites, favoriteComposers] = useState([]);
  const [gallery, setGal] = useState(composers);


  // compiles all of the years togethetr.
  function addYear(prop) {
    var bday = prop.birth;
    var bdayArray = bday.split('-');
    return totalYear(total + 2022 - parseInt(bdayArray[0]));
  }
  // adds 1 to the total number of favorited composers.
  function addFav() {
    return favtotal(totalno + 1);
  }

  /*
  input: num: average years since birth of the favorited composers.
  output: the era that it corresponds to
  */
  function determineEra(num) {
    if (num >= 272) {
      return "Your favorite age seems to be the Baroque Era";
    } else if (num < 272 && num >= 202) {
      return "Your favorite age seems to be the Classical Era";
    } else if (num < 202 && num >= 122) {
      return "Your favorite age seems to be the Romantic Era";
    } else if (num <122 && num >=0 ) {
      return "Your favorite age seems to be the Modern Era";
    }  else {
      return ""
    }
  }
  function averageYear() {
    if (totalno != 0) {
      return "Avg fav composer age: " + Math.round(total/totalno);
    }
    return "";
  }
  // ===========================================================================
  // --------------------------- Sorting functions -----------------------------
  function compare(prop1, prop2) {
    let name1 = prop1.name;
    let name2 = prop2.name;

    if (name1 < name2) { return -1; }
    if (name2 > name1) { return 1; }
    return 0;
    //code taken from w3 schools.
  }

  function sortAlpha() {
    const composerArr = [...gallery]
    setGal(composerArr.sort(compare))
  }
  // ===========================================================================
  // ------------------------- Filtering functions -----------------------------
  function baroqueP(prop) {
    return prop.epoch == "Baroque"
  }
  function classicalP(prop) {
    return prop.epoch == "Classical"
  }
  function romanticP(prop) {
    return prop.epoch == "Early Romantic" || prop.epoch == "Romantic" || prop.epoch == "Late Romantic"
  }
  function modernP(prop) {
    return prop.epoch == "21st Century"
  }

  function filterBaroque() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(baroqueP))
  }
  function filterClassical() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(classicalP))
  }
  function filterRomantic() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(romanticP))
  }
  function filterModern() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(modernP))
  }

  // ===========================================================================
  // ----------------------------- Reset functions -----------------------------
  function reset() {
    setGal(composers);
  }

  // ===========================================================================
  // --------------------------- aggregator displa -----------------------------
  /* on click, adds the favorited composer to the list of composers. */
  function appendComposer(prop) {
    favoriteComposers(favorites => [prop.name, ...favorites]);
  }
  function removeComposer(prop) {

    if (favorites.includes(prop.name)) {
      for (let i=0; i < favorites.length; i++) {
        if (favorites[i] == prop.name) {
          console.log(favorites)
          favorites.splice(i, 1)     
          totalYear( total - (2022 - parseInt(prop.birth.split('-')[0])))
          favtotal(totalno - 1)
          break
        }
      }

    }
  }
  function renderFav() {
    return favorites.map((item) => <li>{item}</li>)
  }
  // ===========================================================================
  return (
    <div id="root">
      <header>
        <Navbar className="navbar">

          <Navbar.Brand href="home"><h1>&#127925; composers 101 &#127925;</h1></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>

        </Navbar>

      </header>
      <Container>

        <Row >
          <Col md="12" lg="3" style = {{paddingBottom: "1rem"}}>
            <div className="left">
              <div style = {{display: "flex", alignItems:"center"}}>
                <h5>Which age of Classical music do you like best?</h5>
                <Overlay/>
              </div>
              
              <p className = "mainpage"><i><u>{averageYear()}</u></i> </p>

              <p className = "mainpage"><i><u>{determineEra(total / totalno)}</u></i></p>
              <h5>Favorite composers:</h5> 
              <p className = "mainpage">{renderFav()} </p>
            </div>

          </Col>


          <Col md="12" lg="9">
            <div className="col2Head">
              <h2 style = {{marginBottom: "0px"}}> All of the composers listed: </h2>
              <div className="buttons">
                <Button className="button1" variant = "outline-primary" onClick={() => sortAlpha()}>Sort A-Z</Button>
                <Dropdown className = "button2" as={ButtonGroup}>
                  <Button variant="outline-success">Epoch Filter</Button>
                  <Dropdown.Toggle split variant="outline-success" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => filterBaroque()} >Baroque</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterClassical()}>Classical</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterRomantic()}>Romantic</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterModern()}>Modern</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => reset()}>Reset all filters</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <br></br>
            <div className="gallery">
              {gallery.map((item) => (composerComp(item, addYear, addFav, appendComposer, removeComposer)))}
            </div>
          </Col>
        </Row>
      </Container>
      <footer style = {{borderTop: "1px solid rgb(0 0 0 / 18%)"}}>
        <i>All composers and their works can be found at https://openopus.org/.</i>
        <br></br>
        <i>All components were built and modified based on documentation from react-bootstrap.</i>
      </footer>
    </div>
  );
}

export default App;
