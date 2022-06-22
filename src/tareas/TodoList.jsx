//COMPONENTE REACT: TodoList   = Lista de Tareas renderizada en html <UL> <li>  a partir de un array de tareas 
// usa el componente Todo para renderizar cada tarea
//USO:  <TodoList todos={array} onTodoClick( funcion-al-hacer-clic-en-un-id) > 

import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) =>{
  console.log("Componente TodoList.jsx. todos=", todos);
  return (
    <ul>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />
      )}
    </ul>
  )
  
} 



//TodoList.propTypes = {
//  todos: PropTypes.arrayOf(PropTypes.shape({
//    id: PropTypes.number.isRequired,
//    completed: PropTypes.bool.isRequired,
//    text: PropTypes.string.isRequired
//  }).isRequired).isRequired,
//  onTodoClick: PropTypes.func.isRequired
//}

export default TodoList