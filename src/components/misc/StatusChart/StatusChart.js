import React from 'react';
import PieChart from 'components/misc/PieChart/PieChart';
import {format} from 'date-fns';

const StatusChart=props=>{
  const {elements, status, title}=props 
  const data=status.map(status=>elements.filter(element=>element.status===status.name).length)
  return (
    <div className='relw100'>
      <PieChart title={title} color={status.map(status=>status.color)} labels={status.map(status=>status.label)} datasets={[{data}]}/>
    </div>
  )
}

export default StatusChart