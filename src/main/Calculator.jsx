import React, { Component } from 'react';
import Button from '../components/Button';
import Display from '../components/Display';
import './Calculator.css';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState }
    constructor(props) {
        super(props); //sempre chamar o super 
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '=' //quando o usuario clicar em igual
            const currentOperation = this.state.operation //já tem uma operação e está chamando de novo outra operação

            const values = [...this.state.values] //pegando os valores do array
            try{
                //eval pode gerar um efeito colateral
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //pegando o primeiro valor + a operação e depois o segundo valor
            }catch(e){
                values[0] = this.state.values[0] //pegando valor do estado atual
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation, //se for um equals a operação finalizou, se não vai ser um operation
                current: equals ? 0 : 1, 
                clearDisplay: !equals, //se for diferente de equals ele vai limpar o display e se não for o usuário vai continuar mechendo
                values 

            })
        }
    }
    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {//evitar colocar 2 pontos
            return;//se o usuario digitou um ponto e na operação já tem um ponto não vai retornar nada
        }
        const clearDisplay = this.state.displayValue === '0' //so vai está verdadeiro se o display for zero ou a flag do estado for verdadeiro
            || this.state.clearDisplay; //para evitar os zeros a esquerda

        const currentValue = clearDisplay ? '' : this.state.displayValue; //se precisar limpar o display vai ser vazio ou o valor que esta no display 
        const displayValue = currentValue + n;//valor atual + valor novo digitado 
        this.setState({ displayValue, clearDisplay: false });

        if (n !== '.') { //se for diferente de . significa que é um número de 0 a 9
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values]; //clonando o valor para um novo array 
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }
    render() {

        return (

            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple /> {/*click recebe uma arrow function apontando para clearMemory */}
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />


            </div>
        )
    }
}