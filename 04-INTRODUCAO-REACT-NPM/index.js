import { calcularIMC, TableIMC } from "./CalculadoraIMC.js"; // A importação estava faltando

console.log("Projeto Rodando");

console.log(">>> Tabela do IMC");
console.table(TableIMC); // Corrigido para passar o objeto TableIMC

const peso = 50;
const altura = 1.70;

const resultado = calcularIMC(peso, altura);
console.log("Resultado do IMC:");
console.log(`IMC: ${resultado.toFixed(2)}`); // Corrigido para interpolação com crase
