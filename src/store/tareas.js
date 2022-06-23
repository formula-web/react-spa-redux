import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers, createStore } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../tareas/actions'
const { SHOW_ALL } = VisibilityFilters

let visibilityFilter=(state = {}, action)=> {
  console.log("Entrando en reducer tareas/visibilityFilter(). action:", action );
  let newstate = {...state};
  newstate.visibilityFilter = action.visibilityFilter;
  return newstate
}


let todos=(state = [], action)=> {
  console.log("Entrando en reducer todos() action=",action);
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      //console.log("reducer todos(). salida por default.")
      return state
  }
}

let addtodofunc= (state={ status:'default', tareas:[], nextid:1 }, action)=>{
  console.log("Entrando en reducer addtodo () acion=",action, "state recibido:", state.tareas);
  let newstate = {...state};
  newstate.tareas = Array.from(state.tareas);
  newstate.nextid = state.nextid + 1;
  newstate.tareas.push( { text: action.text, completed:action.completed, id:state.nextid });
  return newstate;
}

/*
const todoApp = combineReducers({
  visibilityFilter,
  todos
})
*/

let estadoInicial = { estado:'Inicial', nextid:2, tareas:[{id:1,text:'Tarea1',completed:false}], visibilityFilter: 'SHOW_ALL' };

//let store=configureStore( {reducer:todoApp});
//export default store;

// Reducer completeTodo:  hace toggle de tarea.completada para la tarea dada por action.id
let completeTodo = (state, action)=>{
  console.log("Entrando en Reducer completeTodo. id recibido:",action.id);
  state.tareas.map((tarea)=>tarea.id==action.id?tarea.completed=!tarea.completed: tarea  )
}


let slice=createSlice({
    name: 'tareas', 
    initialState: estadoInicial,  
    reducers: { todos:todos, addtodo: addtodofunc, visibilityFilter, completeTodo }, 
    extraReducers: {  } 
}
)

export const { addtodo } = slice.actions;

export default slice.reducer;

