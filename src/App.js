import { useState } from 'react';
import { SliderPicker } from 'react-color';

import './css/App.scss';

import reloadIcon from './assets/refresh.png';
import pickerIcon from './assets/color-picker.png';
import hideIcon from './assets/hide.png';

import { RenderBubbles } from './Bubble';
import * as utils from './Util'; 

function Bubbles() {
  const [color, setColor] = useState(utils.randomColor());

  return (
    <div style={{ backgroundColor: color }} className="bubbles">
      <div style={{ backgroundColor: color }} className='bubbles-control'>
        <div className='bubbles-control-wrapper'>
          <ul>
            <li><span>{color}</span></li>
            <li><img alt='Reaload' src={reloadIcon} /></li>
            <li><img alt='Color Picker' src={pickerIcon} /></li>
            <li><img alt='Hide Bubble' src={hideIcon} /></li>
          </ul>
          
          <SliderPicker color={color} onChange={(color) => setColor(color.hex.toUpperCase())} />
        </div>
      </div>

      <RenderBubbles num={1} color={color} />    
    </div>
  );
}

export default Bubbles;
