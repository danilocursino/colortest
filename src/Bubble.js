import { useContext, useRef, useState, useMemo, memo } from 'react';
import { ChromePicker } from 'react-color';
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'

import { BubbleContext } from './App';
import * as utils from './Util'; 

import reloadIcon from './assets/refresh.png';
import pickerIcon from './assets/color-picker.png';
import hideIcon from './assets/hide.png';

export const BubbleCanvas = (props) => {
    // eslint-disable-next-line
    const { colorObj, setColor, quantity } = useContext(BubbleContext);
    const navigate = useNavigate();
    const [colorPicker, setPicker] = useState(false);

    return (
        <div style={{ backgroundColor: colorObj.colorFull }} className="bubbles">
            <div style={{ backgroundColor: colorObj.colorFull }} className={'bubbles-control ' + colorObj.colorBlack}>
                <div className='bubbles-control-wrapper'>
                    
                    <div className={'bubbles-control-color' + (colorPicker ? ' open' : '')}>
                        <ChromePicker disableAlpha={true} color={colorObj.colorFull} onChange={(newColor) => {
                            setColor({
                                color: newColor.hex.replace('#', '').toUpperCase(),
                                colorFull: newColor.hex.toUpperCase(),
                                colorDark: utils.isColorDark(newColor.hex.toUpperCase()),
                                colorBlack: utils.isColorBlack(newColor.hex.toUpperCase())
                            });

                            navigate('/' + newColor.hex.replace('#', '').toUpperCase());
                        }} />
                    </div>

                    <ul className='bubbles-control-options'>
                        <li>
                            <span className={colorObj.colorDark}>{colorObj.colorFull}</span>
                        </li>
                        <li><img className={colorObj.colorDark} alt='Reaload' src={reloadIcon} /></li>
                        <li><img className={colorObj.colorDark} onClick={() => setPicker(!colorPicker)} alt='Color Picker' src={pickerIcon} /></li>
                        <li><img className={colorObj.colorDark} alt='Hide Bubble' src={hideIcon} /></li>
                    </ul>

                </div>
            </div>
            <div className='bubbles-items-wrapper'>
                <BubblesConstruct quantity={quantity} />
            </div>
        </div>
    );    
}

export const Bubble = memo((props) => {
    const { colorObj, winHeight, winWidth } = useContext(BubbleContext);
    let size = useMemo(() => utils.randomNumber((winWidth * 0.10), (winWidth * 0.25)), [winWidth]);
    let opacity = useMemo(() => (utils.randomNumber(2, 8) / 10), []);
    let brightness = useMemo(() => utils.randomNumber(50, 90), []);
    
    let top = useMemo(() => utils.randomNumber(0, (winHeight - size)), [winHeight, size]);
    let topMax = useMemo(() => winHeight - size, [winHeight, size]);
    let topTransition = useMemo(() => utils.randomNumber(2500, 10000), []);
    
    let left = useMemo(() => utils.randomNumber(0, (winWidth - size)), [winWidth, size]);
    let leftMax = useMemo(() => winWidth - size, [winWidth, size]);
    let leftTransition = useMemo(() => utils.randomNumber(2500, 10000), []);

    // eslint-disable-next-line
    let [topAnimation, topAnimationUpdate] = useSpring(() => ({
        from: { top: 0 },
        to: { top: topMax },
        config: {
            duration: topTransition
        },
        loop: {
            reverse: true,
        }
    }));

    // eslint-disable-next-line
    let [leftAnimation, leftAnimationUpdate] = useSpring(() => ({
        from: { left: 0  },
        to: { left: leftMax },
        config: { 
            duration: leftTransition
        },
        loop: {
            reverse: true,
        }
    }));

    // setTimeout(() => {
    //     topAnimationUpdate({
    //         from: { top: topMax },
    //         to: { top: 0 },
    //         config: {
    //             duration: topTransition
    //         },
    //         loop: {
    //             reverse: true,
    //         }
    //     });
    // }, topTransition);

    // setTimeout(() => {
    //     leftAnimationUpdate({
    //         from: { left: leftMax },
    //         to: { left: 0 },
    //         config: {
    //             duration: leftTransition
    //         },
    //         loop: {
    //             reverse: true,
    //         }
    //     });
    // }, leftTransition);

    return (
        <animated.div
            id={'bubbles-item-' + (props.index + 1)}
            ref={useRef(null)}
            className={'bubbles-item bubbles-item-' + (props.index + 1) + ' ' + colorObj.colorBlack}
            style={{
                backgroundColor: colorObj.colorFull,
                opacity: opacity,
                filter: "brightness(" + brightness + "%)",
                zIndex: (props.index + 1),
                width: size,
                height: size,
                top: top,
                left: left,
                ...topAnimation,
                ...leftAnimation
            }}
        ></animated.div>
    )
})

export const BubblesConstruct = (props) => {
    const { quantity } = useContext(BubbleContext);
    const bubblesConstruct = [];

    for (let i = 0; i < (props.quantity ?? quantity ); i++) {
        bubblesConstruct.push(<Bubble index={i} key={i} />);
    }
    
    return (bubblesConstruct);
}