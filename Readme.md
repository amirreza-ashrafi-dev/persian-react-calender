### miminal and fully customizable calender
![persian calender overview](/assets/Capture.JPG)

#### installation :
### `npm i persian-react-calender`

#### usage : 
```typescript
import type { CSSProperties } from 'react';
import { Calender } from "persian-cal";
import { DayColumn, weekColumn, Header } from 'persian-cal/types';


const styles: CSSProperties = {
  width: "80px",
  height: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid",
  margin: "5px",
  borderRadius: "10px",
  backgroundColor: "#38598b",
  color: "black"
};

const dayNumberStyle: CSSProperties = {
  ...styles,
  backgroundColor: "#a2a8d3",
}

const HeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}


const WeekColumn : weekColumn = ({ name }) => {
  return <div style={styles}>{name}</div>
}

const DayColumn: DayColumn = (
  { dayNumber,
    month,
    year,
    currentDate
  }) => {
  return (
    <div style={{ ...dayNumberStyle, backgroundColor: currentDate ? "#e84a5f" : "#a2a8d3" }}
      onClick={() => console.log({ dayNumber, month, year })}>{dayNumber}</div>
  )
}

const Header : Header = ({ month, year, prevHandle, nextHandle }) => {
  return (
    <div style={HeaderStyle}>
      <button onClick={nextHandle}>Next</button>
      <div><b>{year}</b> {month}</div>
      <button onClick={prevHandle}>Prev</button>
    </div>
  )
}


function App() {
  return (
    <>
      <Calender WeekColumn={WeekColumn} DayColumn={DayColumn} Header={Header} />
    </>
  )
}

export default App

```