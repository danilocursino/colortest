import { useState, createContext } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import './css/App.scss';

import { BubbleCanvas } from './Bubble';
import * as utils from './Util';

export const BubbleContext = createContext();

function Bubbles() {
  const { pathname } = useLocation();
  const color = utils.randomColor();
  const isColor = (/^#[0-9A-F]{6}[0-9a-f]{0,2}$/i).test(pathname.replace('/', '#'));
  const [colorObj, setColor] = useState({
    color: isColor ? pathname.replace('/', '') : color,
    colorFull: isColor ? pathname.replace('/', '#') : '#' + color,
    colorDark: utils.isColorDark(isColor ? pathname.replace('/', '#') : '#' + color),
    colorBlack: utils.isColorBlack(isColor ? pathname.replace('/', '#') : '#' + color)
  });
  const [winHeight, updateWinHeight] = useState(window.innerHeight);
  const [winWidth, updateWinWidth] = useState(window.innerWidth);
  const [quantity] = useState(utils.randomNumber(5, 15));

  window.addEventListener('resize', () => {
    updateWinHeight(window.innerHeight);
    updateWinWidth(window.innerWidth);
  });

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={"/" + colorObj.color} />} />
      <Route path="/:color" element={(isColor) ? (
        <BubbleContext.Provider value={{ colorObj, setColor, winHeight, winWidth, quantity }}>
          <BubbleCanvas />
        </BubbleContext.Provider>
      ) : (
        <Navigate replace to={"/" + colorObj.color} />
      )} />
    </Routes>
  );
}

export default Bubbles;
