import { useRef, useState, useEffect } from 'react';

import * as utils from './Util';

function BubbleOptions(i, winWidth, winHeight) {
    let size = utils.randomNumber((((winWidth + winHeight) / 2) * 0.05), (((winWidth + winHeight) / 2) * 0.25));

    let top = utils.randomNumber(0, (winHeight - size));
    let left = utils.randomNumber(0, (winWidth - size));

    let maxTop = winHeight - size;
    let maxLeft = winWidth - size;

    return {
        ref: useRef(null),
        index: i,
        item: 'bubbles-item-' + (i + 1),
        size: size,
        opacity: (utils.randomNumber(2, 10) / 10),
        brightness: utils.randomNumber(50, 90),
        top: {
            value: top,
            max: maxTop,
            duration: utils.randomNumber(4000, 10000),
            first: false,
            hit: false
        },
        left: {
            value: left,
            max: maxLeft,
            duration: utils.randomNumber(4000, 10000),
            first: false,
            hit: false
        }
    };
}

export const Bubble = (props) => {
    return (
        <div
            id={props.options.item}
            className={'bubbles-item ' + props.options.item}
            ref={props.options.ref} style={{
                opacity: props.options.opacity,
                transition: "top " + props.options.top.duration + "ms, left " + props.options.left.duration + "ms",
                filter: "brightness(" + props.options.brightness + "%)",
                width: props.options.size,
                height: props.options.size,
                top: props.options.top.value,
                left: props.options.left.value,
                zIndex: props.options.index
            }}>
        </div>
    )
}

export const RenderBubbles = (props) => {
    let bubblesReturn = [];
    let [bubbles, changeBubble] = useState([]);
    let [winHeight, updateWinHeight] = useState(window.innerHeight);
    let [winWidth, updateWinWidth] = useState(window.innerWidth);
    let newItens = [];

    window.addEventListener('resize', () => {
        updateWinHeight(window.innerHeight);
        updateWinWidth(window.innerWidth);
    });

    for (let i = 0; i < props.num; i++) {
        newItens[i] = BubbleOptions(i, winWidth, winHeight);
    }

    console.log(newItens);

    changeBubble((oldValue) => [...oldValue, newItens]);


    for (let i = 0; i < props.num; i++) {
        bubblesReturn.push(<Bubble index={utils.randomNumber(10, 20)} options={newItens[i]} />)
    }

    return bubblesReturn;
}