
import { soma, subtracao, multiplicacao, divisao } from './calculadora.js';
import moment from 'moment';

const num1 = 15;
const num2 = 5;

console.log(" resultados das operações matematicas")
console.log('Soma:', soma(num1, num2));

console.log('Subtração:', subtracao(num1, num2));
console.log('Multiplicação:', multiplicacao(num1, num2));
console.log('Divisão:', divisao(num1, num2));



function calcularIdade(anoNascimento) {
    const anoAtual = moment().format('YYYY');  
    return anoAtual - anoNascimento; 
}
const anoNascimento = 2003;
const idade = calcularIdade(anoNascimento);
console.log(`Idade: ${idade} anos`);