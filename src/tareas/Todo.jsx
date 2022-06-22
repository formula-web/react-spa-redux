//COMPONENTE REACT:  Todo  (Tarea mostrada en pantalla en una lista <li> )
// El componente se usará en jsx:   <Todo  onclick=funcion  completed=true/false   text='Descricpcion' />
import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)


// PropTypes se usa para definir la obligatoriedad de los argumentos pasados en un objeto ????
//Todo.propTypes = {
//onClick: PropTypes.func.isRequired,
//  completed: PropTypes.bool.isRequired,
//  text: PropTypes.string.isRequired
//}

export default Todo