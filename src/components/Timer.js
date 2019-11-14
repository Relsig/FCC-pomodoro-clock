import React, {useState, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faUndo } from '@fortawesome/free-solid-svg-icons'

function formatDuration(secs) {

    let mins = Math.floor(secs/60);
    secs %= 60;

    let minsFormatted = (mins > 9) ? mins : '0' + mins;
    let secsFormatted = (secs > 9) ? secs : '0' + secs;

    return minsFormatted + ':' + secsFormatted;
}


function Timer({sessionLength, breakLength, running, setRunning, onReset}) {
    const timerLabel = useRef('session');
    const currentState = useRef('Start');
    //maybe this shouldn't use state
    const elapsedSeconds = useRef(0); 
    const duration = () => {return timerLabel.current === 'session' ? sessionLength : breakLength};
    const [remainingTime, setRemainingTime] = useState(formatDuration(duration()*60));
    const audio = useRef(null);
    let updateTimer = useRef(null);



    const update = () => {
        clearTimeout(updateTimer.current);
        updateTimer.current = setTimeout(update, 1000);

        let duration;
        switch (timerLabel.current) {
            case 'session':
                duration = sessionLength*60;
                break;
            case 'break':
                duration = breakLength*60;
                break;
            default:
                return;
            
        }

        duration -= elapsedSeconds.current;

        console.log('duration: ' + duration);

        if (duration === 0) {
            audio.current.pause();
            audio.current.currentTime = 0;
            audio.current.play();
        }

        if(duration < 0 ) {
            if(timerLabel.current === 'session') {
                timerLabel.current = 'break';
                duration = breakLength * 60;
            } else {
                timerLabel.current = 'session';
                duration = sessionLength * 60;
            }

            elapsedSeconds.current = 0;
        }

        elapsedSeconds.current++;
        setRemainingTime(formatDuration(duration));
    }

    //useEffect(update, )
    //  useEffect(()=>{
    //      update();
    //  }, [nonce, update])



    const addTimerEvent = () => {
        swapState();
        if(currentState.current === 'Pause'){
            update();
        } else {
            clearTimeout(updateTimer.current);
        }
        setRunning(true);
    }

    const swapState = () => {
        if (currentState.current === 'Start') {
            currentState.current = 'Pause';
        } else {
            currentState.current = 'Start';
        } 
    }

    const reset = () => {
        audio.current.pause();
        audio.current.currentTime = 0;
        elapsedSeconds.current = 0;
        timerLabel.current = 'session';
        currentState.current = 'Start';
        setRemainingTime(formatDuration(duration()*60));
        clearTimeout(updateTimer.current);
        onReset();
        setRunning(false);
    }

    return (
            <Col className="lb-border">
                <h4><Row
                    id='timer-label'
                    className="justify-content-center"
                >{timerLabel.current}</Row></h4>
                <b><Row id='time-left'
                    className="justify-content-center"
                    style={{color: 'black',
                        backgroundColor: 'white',
                        paddingBottom:'3px',
                        border: '1px solid gray',
                        borderRadius:'20px',
                        margin:'0px 25px 5px'
                    }}>
                {(!running)
                    ? formatDuration(sessionLength*60)
                    : remainingTime
                }
                </Row></b>
            
                <Row className="justify-content-center">
                    <ButtonGroup>
                        <Button variant="primary"
                            id="start_stop"
                            size="sm"
                            onClick={addTimerEvent}
                            onMouseUp={(b) => {b.target.blur()}}
                        >
                            <FontAwesomeIcon size="xs"
                                style={{paddingBottom: '3px'}}
                                icon={currentState.current === 'Start'
                                    ? faPlay
                                    : faPause}
                            />
                            {currentState.current}

                        </Button>
                        <Button variant="danger"
                            id="reset"
                            size="sm"
                            onClick={reset}
                            onMouseUp={(b) => {b.target.blur()}}>
                            <FontAwesomeIcon size="xs"
                                icon={faUndo}
                                style={{paddingBottom: '3px'}}
                            />
                                
                            Reset
                        </Button>
                    </ButtonGroup>
                </Row>
            <audio id="beep"
                preload='auto'
                src={'https://goo.gl/65cBl1'}
                ref={ref => audio.current = ref}
            />  
            </Col>        
    );
}

export default Timer;