import React from 'react';
import LineChart from 'components/misc/LineChart/LineChart';
import moment from 'moment';

const OrderChart=props=>{
  const {filter, elements, title}=props
  let format;
  switch(filter){
    case 'month':
      format='DD/MM/YYYY'
      break;
    case 'year':
      format='MM/YYYY'
      break;
    case 'all':
      format='YYYY'
      break;
  }

  const dates=[...new Set(elements.map(element=>moment(element.createdAt).format(format)))]; 
  const data=dates.map(date=>elements.filter(element=>moment(element.createdAt).format(format)===date).length)

  return (
    <div className='relw100'>
      <LineChart title={title} labels={dates} datasets={[{data}]}/>
    </div>
  )
}

export default OrderChart