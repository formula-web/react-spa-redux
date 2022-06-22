//COMPONENTE REACT IU. FORMULARIO ADD TODO.
// input para crear una Todo (tarea). Al enviar el form->dispatch ( Action= addTodo(texto) )
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { addTodo } from '../actions'
import  store  from '../../store';
import { addtodo } from '../../store/tareas';
let AddTodo = ( {dispatch} ) => {
  let input
  //let midispatch = useDispatch();
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        console.log("submit en FORMULARIO AddTodo.jsx dispatch y (action)=", store.dispatch);
        if (!input.value.trim()) {
          console.log("input vacío. no hay submit")
          return
        }
        
        store.dispatch(  {type: 'tareas/addtodo', text: input.value,  completed: true} )
        //dispatch(addTodo(input.value))

        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Añadir tarea
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo