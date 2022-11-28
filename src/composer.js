import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Biography from "./bio.js"
export default function composerComp(prop, addYear, addFav, appendComposer, removeComposer) {

    return (
        <div className="cardholder">
            <Card style = {{height: "21rem", width: "18rem"}}>


                <Card.Body style = {{display: "flex", flexFlow: "column"}} >
                
                    <div className="cardbod" >
                        {/* <img className="profile-pic" src={prop.photo} /> */}
                        <Biography prop={prop}/>
                    </div>
                    

                </Card.Body>
                <Card.Header className="cardname" style = {{height: "3rem", display:"flex", justifyContent: 'space-between' }}>
                    <h4>{prop.name}</h4>

                    <div style = {{display: "flex",  width:"50%", justifyContent:"flex-end"}}>
                        <Button className = "favorite-button" style = {{background: "rgba(0, 255, 0, 0.70)", outline: "lime solid 1px", borderColor: "lime", hoverColor: "red"}} 
                                variant="info" size="sm" active
                                onClick={() => { addYear(prop); addFav(); appendComposer(prop) }}> 
                            <p> &#9829; </p>
                        </Button>
                        <Button onClick = {() => removeComposer(prop)} style = {{background: "rgba(255, 0, 0, 0.70)", alignSelf:"center", height: "2rem"}} variant = "danger"
                        size = "sm">
                        <p>&#10006;</p>
                        </Button>
                    </div>
                    
                </Card.Header>
            </Card>
        </div>
    );
}