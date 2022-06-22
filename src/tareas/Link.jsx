//COMPONENTE REDUX:  Link (enlace html <a href="#">  onclick=funcion onClick recibida como argumento)
//USO:   <Link active=true/false  children='texto del enlace' onClick=funcion />
import React, { PropTypes } from 'react'

const Link = ({ active, children, onClick }) => {
  //console.log("LINK.JSX   active:", active, "children:", children,"onClick=", onClick)
  if (active) {
    return <span style={{ color: 'red' }} >{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

//Link.propTypes = {
//  active: PropTypes.bool.isRequired,
//  children: PropTypes.node.isRequired,
//  onClick: PropTypes.func.isRequired
//}

export default Link