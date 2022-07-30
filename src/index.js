/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useRanger } from "./range";

const GlobalStyles = createGlobalStyle`
  body {
   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
   font-weight: 300;
  }
`;

export const Track = styled("div")`
  display: flex;
  height: 500px;
  width: 50px;
  margin: 5% 120px;
`;

export const Tick = styled("div")`
  :before {
    content: "";
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    width: 5px;
    height: 2px;
    transform: translate(0.1rem, -60%);
  }
`;

export const TickLabel = styled("div")`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-200%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled("div")`
  background: ${(props) =>
    props.index === 0
      ? "#3e8aff"
      : props.index === 1
      ? "#00d5c0"
      : props.index === 2
      ? "#f5c200"
      : "#ff6050"};

  /* height: 10px; */
`;

export const Handle = styled("div")`
  background: #ff1a6b;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transform: ${(props) =>
    props.active ? "translateX(-100%) scale(1.3)" : "translateX(0) scale(0.9)"};
`;

function App() {
  const [values, setValues] = React.useState([15]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values,
    onChange: setValues
  });

  return (
    <div className="App">
      <GlobalStyles />
      <h1>Custom Styles</h1>
      <br />
      <br />
      <Track {...getTrackProps()}>
        {ticks.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i}>
            asd
          </Segment>
        ))}
        {handles.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <pre
        style={{
          display: "inline-block",
          textAlign: "left"
        }}
      >
        <code>
          {JSON.stringify({
            values
          })}
        </code>
      </pre>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
