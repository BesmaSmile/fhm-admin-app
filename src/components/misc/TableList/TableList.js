import React from 'react';
import './TableList.scss';

const TableList=props=>{
  return(
    <div className='TableList relw100'>
      <div className='header'>
        <div className='fs22 cstronggrey lh30 extralight'>{props.title}</div>
        <div className='fs16 cgrey medium'>{props.subTitle}</div>
      </div>
      <div className='content'>
        <table>
          <thead><tr>{props.columns.map(column=><td key={column.key}>{column.name}</td>)}</tr></thead>
          <tbody>
            {props.raws.map((raw)=>(
              <tr key={raw.id}>
              {props.columns.map(column=><td key={column.key}>{raw[column.key]}</td>)}
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

TableList.defaultProps={
  title : 'Striped Table with Hover',
  subTitle : 'Here is a subtitle for this table',
  columns : [
    {key : 'id', name : 'id'}, 
    {key : 'firstname', name : 'Prénom'},
    {key : 'lastname', name : 'Nom'}
  ],
  raws : [
    { 
      id : '1',
      firstname : 'Besma',
      lastname : 'Smile'
    },
    { 
      id : '2',
      firstname : 'Rahma',
      lastname : 'Houma'
    },
    { 
      id : '3',
      firstname : 'Célia',
      lastname : 'Sissi'
    },
  ]
}

export default TableList