import * as NB from 'native-base'

import { useCountdown } from "./useCountdown";

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return (
      <NB.NativeBaseProvider>
        <NB.Text>game over</NB.Text>
      </NB.NativeBaseProvider>
    ) 
  } else {
    return (
      <NB.NativeBaseProvider>
        <NB.HStack>
          <NB.Text>{minutes}</NB.Text>
          <NB.Text> : </NB.Text>
          <NB.Text>{seconds}</NB.Text>
        </NB.HStack>
      </NB.NativeBaseProvider>
    );
  }
};

export default CountdownTimer;