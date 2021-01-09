import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import React, {useEffect, useState} from 'react';

momentDurationFormatSetup(moment)

const TimeLeft = ({ breakLength, sessionLength}) => {
    const [currentSessionType, setCurrentSessionType] = useState("Session") // 'Session' or 'Break'
    const [intervalId, setIntervalId] = useState(null)
    const [timeleft, setTimeLeft ] = useState(sessionLength)
    
    // change timeleft whenever sessionlength changes
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength])

    const isStarted = intervalId != null;
    const handleStartStopClick = () => {
        if(isStarted) {
        //if we are in started mode
        // we want to stop the timer
        // clearInterval
        clearInterval(intervalId);
        setIntervalId(null);
        } else {
        // if we are in stopped mode:
        // decrement timeLeft by one every second (1000ms)
        // to do this we'll use setInterval  
        const newIntervalId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft >= 0) {
                    return prevTimeLeft - 1
                }
                // if session: 
                if (currentSessionType === "Session") {
                    // switch to break
                    setCurrentSessionType("Break")
                // setTimeLeft to breakSessionLength
                    setTimeLeft(breakLength)
                }
                // if break:
                else if (currentSessionType === "Break") {
                // switch to session
                setCurrentSessionType("Session")

                // setTimeLeft to sessionLength
                setTimeLeft(sessionLength)

                }

            });
        }, 1000); // TODO: turn back into 1000
        setIntervalId(newIntervalId);
        }



    
    };

    const formattedTimeLeft = moment.duration(timeleft, 's').format('mm:ss', {trim:false});
    return <div>
        {formattedTimeLeft}
        <p id="timer-label">{currentSessionType}</p>
        <p id="time-left">{formattedTimeLeft}</p>
        <button onClick={handleStartStopClick}>{isStarted? 'Stop' : "Start"}</button>
        </div>
    // MM:SS
    // 25:00

};

export default TimeLeft
