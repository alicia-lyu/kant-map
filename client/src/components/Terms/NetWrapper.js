import React, { useEffect, useRef } from 'react'
import './custom.scss'
import useWindowDimensions from '../../utils/useWindowDimensions'
import { setRatio } from './setRatio'

export default function NetWrapper(props) {
    const wrapperRef = useRef(null);
    const { width } = useWindowDimensions();
  
    let ratioClassName = setRatio(width);
  
    useEffect(() => {
      const wrapperDom = wrapperRef.current;
      wrapperDom.addEventListener('resize', () => {
        wrapperDom.classList.remove(ratioClassName);
        ratioClassName = setRatio(width)
        wrapperDom.classList.add(ratioClassName);
      })
    })
    
    return (
      <div ref={wrapperRef} className={`net-wrapper ${ratioClassName}`}>
        {props.children}
      </div>
    )
  }