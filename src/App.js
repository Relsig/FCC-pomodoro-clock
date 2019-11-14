import React, {useState, useEffect} from 'react';
import Timer from './components/Timer';
import SetTime from './components/SetTime';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './App.css';

const [breakDefault, sessionDefault] = [5, 25];


function App() {

  const [breakLength, setBreakLength] = useState(breakDefault);
  const [sessionLength, setSessionLength] = useState(sessionDefault);
  const [running, setRunning] = useState(false);

  function onReset () {
    setBreakLength(5);
    setSessionLength(25);
  }


  return (
    <Container className="pomodoro-clock" style={{backgroundColor: 'lightblue', maxWidth: '500px'}}>
      <Row id='title' className="justify-content-center" style={{paddingTop:'20px', paddingBottom:'0px', marginBottom:'20px'}}><h2>Pomodoro Clock</h2></Row>
      <Row className="justify-content-md-center" style={{borderRadius:'25px', backgroundColor: 'burlywood', marginLeft: '5px', marginRight: '5px'}}>
      <SetTime
        id="break-time"
        name="break"
        length={breakLength}
        setLength={setBreakLength}
        running={running}
      />
      <Timer 
        id="timer"
        breakLength={breakLength}
        sessionLength={sessionLength}
        running={running}
        setRunning={setRunning}
        onReset={onReset}
      />
      <SetTime
        id="session-time"
        name="session"
        length={sessionLength}
        setLength={setSessionLength}
        running={running}
      />
    </Row></Container>
  )
}

export default App;
