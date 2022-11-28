import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function TriggerExample() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        <div style = {{textAlign:"left"}}>
        Baroque Era: 1600 - 1750 
        Classical Era: 1750 - 1820 
        Romantic Era: 1820 - 1900 
        Modern Era: 1900 - Present 
        <div> </div>
        <br></br>
        Select the heart buttons to see which era you align with!
        <div> </div>
        <br></br>
        Click the composers to learn more!
        </div>
        
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
        <div style = {{borderRadius: "25px",border: "black solid 1px", width: "25px", height: "25px", textAlign:"center"}}>	
            &#10067;
        </div>
    </OverlayTrigger>
  );
}

export default TriggerExample;