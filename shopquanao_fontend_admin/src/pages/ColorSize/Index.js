import { Col, Row } from "react-bootstrap";
import Size from "../../Admin/Layout/Form/Size";
import Color from "../../Admin/Layout/Form/Color";

function ColorSize() {
    return ( <div >


        <Row className="mt-5"  > 

            <Col md={6}>
            <Size/>
            </Col>
            <Col md={6}>
            <Color/>
            </Col>
            
        </Row>

    </div> );
}

export default ColorSize ;
