import React from 'react';

const icons={
  fhm: (color)=><svg xmlns="http://www.w3.org/2000/svg" width="171" height="101" viewBox="0 0 171 101"><text transform="translate(0 80)" fill={color} fontSize="89" fontFamily="Bauhaus93, 'Bauhaus 93'"><tspan x="0" y="0">FHM</tspan></text></svg>
}

const SvgIcon=({name, color})=>{
    return icons[name](color)
}

export default SvgIcon;