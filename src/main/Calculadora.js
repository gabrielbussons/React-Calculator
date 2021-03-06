import React, { Component } from 'react'
import './Calculadora.css'

import Botao from '../componentes/Botao'
import Display from '../componentes/Display'

const stateInicial = {
    valorDisplay: '0',
    valores: [0, 0],
    limparDisplay: false,
    operacao: null,
    indice: 0
}

export default class Calculadora extends Component{

    state = { ...stateInicial};

    constructor(props){
        super(props);
        this.limparDisplay = this.limparDisplay.bind(this);
        this.realizarOperacao = this.realizarOperacao.bind(this);
        this.adicionarDigito = this.adicionarDigito.bind(this);
    }

    limparDisplay(e) {
        this.setState({ ...stateInicial});
    }

    realizarOperacao(e) {
        
        if(this.state.indice === 0){
            this.setState( {
                operacao: e,
                indice: 1,
                limparDisplay: true
            } )
        } else{
            const operadorIgual = (e === '=');
            const operadorAtual = this.state.operacao;

            const valores = [ ...this.state.valores];

            try{
                valores[0] = eval(`${valores[0]} ${operadorAtual} ${valores[1]}`);
            } catch(error){
                valores[0] = this.state.valores[0];
            }

            valores[1] = 0;

            this.setState({
                valorDisplay: valores[0],
                operacao: operadorIgual ? null : e,
                indice: operadorIgual ? 0 : 1,
                limparDisplay: !operadorIgual,
                valores: valores
            })
        }
    }

    adicionarDigito(e) {
        
        if(this.verificarPonto(e)){
            return;
        }

        const limparDisplay = this.verificarLimparDisplay(e);
        const valorAtual = limparDisplay ? '' : this.state.valorDisplay;
        const novoValorDisplay = valorAtual + e;

        this.setState({ 
            valorDisplay: novoValorDisplay, 
            limparDisplay: false 
        });

        if(e !== '.'){
            const indice = this.state.indice;
            const novoValor = parseFloat(novoValorDisplay);
            const valores = [ ...this.state.valores];
            valores[indice] = novoValor;
            this.setState({ valores });
        }
    }

    verificarPonto(e) {
        
        if(e === '.' && this.state.valorDisplay.toString().includes('.')){
            return true;
        }

        return false;
    }

    verificarLimparDisplay(e) {
        if((this.state.valorDisplay === '0' && e !== '.') || this.state.limparDisplay){
            return true;
        }

        return false;
    }

    render(){
        return(
            <div className="calculadora">
                <Display label={this.state.valorDisplay} />
                <Botao label="AC" onClick={this.limparDisplay} tresPosicoes/>
                <Botao label="/" onClick={this.realizarOperacao} operacao/>
                <Botao label="7" onClick={this.adicionarDigito}/>
                <Botao label="8" onClick={this.adicionarDigito}/>
                <Botao label="9" onClick={this.adicionarDigito}/>
                <Botao label="*" onClick={this.realizarOperacao} operacao/>
                <Botao label="4" onClick={this.adicionarDigito}/>
                <Botao label="5" onClick={this.adicionarDigito}/>
                <Botao label="6" onClick={this.adicionarDigito}/>
                <Botao label="-" onClick={this.realizarOperacao} operacao/>
                <Botao label="1" onClick={this.adicionarDigito}/>
                <Botao label="2" onClick={this.adicionarDigito}/>
                <Botao label="3" onClick={this.adicionarDigito}/>
                <Botao label="+" onClick={this.realizarOperacao} operacao/>
                <Botao label=" " />
                <Botao label="0" onClick={this.adicionarDigito}/>
                <Botao label="." onClick={this.adicionarDigito}/>
                <Botao label="=" onClick={this.realizarOperacao} operacao/>
            </div>
        )
    }
}