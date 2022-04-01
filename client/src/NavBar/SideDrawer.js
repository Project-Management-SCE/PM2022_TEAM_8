import React from 'react'
import ReactDom from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './SideDrawer.css'

const SideDrawer = (props) => {
    
     const content =  (
     <CSSTransition in={props.show} timeout={200} classNames='slide-in-right' mountOnEnter unmountOnExit>
         <aside ref={()=>{
             
         }} className='side-drawer' onClick={props.onClick}>
            {props.children}
        </aside>
     </CSSTransition>
     )
    return ReactDom.createPortal(content,document.getElementById('drawer-hook'))
}

export default SideDrawer
