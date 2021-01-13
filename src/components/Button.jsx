import React from 'react';
import './Button.css';

export default props => {//QUANDO NÃO COLOCA O RETORNO E SÓ OS PARENTESES DA ERRO
    let classes = 'button '
    classes += props.operation ? 'operation' : ' ';
    classes += props.double ? 'double' : ' ';
    classes += props.triple ? 'triple' : ' ';

    return (
        <button className={classes} 
        onClick={e => props.click && props.click(props.label)}>

            {props.label}
        </button>

    )
}

// colocando codigo js
