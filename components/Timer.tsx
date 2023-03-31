
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const Box = styled.div`
    display:flex;
    align-items:center; 
    margin:0 4px;
`
const TimerValue = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:4px;
    background:#4CAFFF;
    color:white;
    width:30px;
    height:30px;
    font-size:12px;
`
const Flex = styled.div`
display:flex;
justify-content:center;
`

export default function Timer({
  secs,
  updateUI,
}: {
  secs: string;
  updateUI?: () => void;
}) {
  const Ref = useRef<null | NodeJS.Timer>(null);

  // The state for our timer
  const [minutes, setMins] = useState<string | number>("00");
  const [seconds, setSecs] = useState<string | number>("0");
  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date() as any);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setMins(minutes > 9 ? minutes : "0" + minutes);
      setSecs(seconds > 9 ? seconds : "0" + seconds);
    }
  };
  const clearTimer = (e: any) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    if (id) Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + parseInt(secs));
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
    setSecs(secs);
  }, [secs]);
  useEffect(() => {
    if (minutes === "00" && seconds === "00") {
      if (updateUI) {
        updateUI();
      }
    }
  }, [seconds]);

  return (
    <Flex>
      <TimerValue>
        {minutes}
      </TimerValue>
      <Box>
        :
      </Box>
      <TimerValue >
        {seconds}
      </TimerValue>
    </Flex>
  );
}
