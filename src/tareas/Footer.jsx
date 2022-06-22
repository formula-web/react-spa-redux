//COMPONENTE REACT: Footer  == Contenedor donde se visualizan las tareas (Todo) o sólo los Filtros ??
import React from 'react'
import FilterLink from './containers/FilterLink'

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      Todos
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Activo
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completado
    </FilterLink>
  </p>
)

export default Footer