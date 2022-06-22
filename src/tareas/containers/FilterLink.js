//funcion para conectar componente Link con el state ???????
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../Link'
import store from '../../store'
import { displayPartsToString } from 'typescript'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.sliceTareas.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("FilterLink.mapDispatchToProps.")
  return {
    onClick: () => {
      store.dispatch(  {type:'tareas/visibilityFilter', visibilityFilter: ownProps.filter } ) 
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink