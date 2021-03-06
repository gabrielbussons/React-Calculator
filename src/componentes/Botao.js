import React from 'react'
import './Botao.css'

export default function Botao(props) {
    //const [listaOferta, setListaOfesta] = React.useState([])

    return(
        <button 
            onClick={e => props.onClick && props.onClick(props.label)}
            className={` botao
            ${props.operacao ? 'operacao' : ''}
            ${props.duasPosicoes ? 'duasPosicoes' : ''}
            ${props.tresPosicoes ? 'tresPosicoes' : ''}
        `}>
            {props.label}
        </button>
    )
}