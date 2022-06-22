//Funcion: VisibleTodoList():   Conecta via react-redux connect() el estado al componente TodoList para que el componente TodoList se renderice ante
//cambios del estado.
//Para la conexión filtra los elementos del array de todos visibles actualmente, de forma que solo conecta esos elementos en lugar de todos ????

import { connect } from 'react-redux'
import { completeTodo } from '../actions'
import TodoList from '../TodoList'

const getVisibleTodos = (todos, filter) => {
  console.log("getVisibleTodos() Recibe de mapStateToProps:", todos, filter);
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  console.log("visibleTodoList.mapStateToProps()");
  return {
    todos: getVisibleTodos(state.sliceTareas.tareas, state.sliceTareas.visibilityFilter)
  }
}

//Cada cambio en el estado se ejecuta este mapDispatch que inyecta la prop onTodoClick() al componente TodoList
//el componente TodoList se rendizará e invocará a onTodoClick
const mapDispatchToProps = (dispatch) => {
  console.log("visibleTodoList.mapDispatchToProps()");
  return {
    onTodoClick: (id) => {
      dispatch( {type:'tareas/completeTodo', id} ) 
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList