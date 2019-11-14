import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function SetTime ({name, length, setLength, running}) {

    const incrementLength = () => {
        if(length < 60)
        setLength(length+1);
    }

    const decrementLength = () => {
        if(length > 1)
        setLength(length-1);
    }

    return (
            <Col id={name+"-time"}>
                <h5><Row className="justify-content-center"  id={name+"-label"} >{name}</Row></h5>
                <b><Row className="justify-content-center" id={name + "-length"} style={{backgroundColor: 'white', paddingBottom:'3px', border: '1px solid gray', borderRadius:'20px', margin:'0px 37px 5px'}}>{length}</Row></b>
                <Row className="justify-content-center">
                    <ButtonGroup>
                        <Button 
                        id={name + "-decrement"}
                        className="fas fa-arrow-up"
                        size="sm"
                        onClick={decrementLength}
                        onMouseUp={(b) => b.target.blur()}
                        disabled={running}
                        ><FontAwesomeIcon icon={faArrowDown} /></Button>
                        <Button
                        id={name + "-increment"}
                        className="fas"
                        size="sm"
                        onClick={incrementLength}
                        onMouseUp={(b) => b.target.blur()}
                        disabled={running}
                        ><FontAwesomeIcon icon={faArrowUp} /></Button>
                    </ButtonGroup>
                </Row>
            </Col>
    )
}

export default SetTime;