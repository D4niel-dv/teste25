
export const TableIMC = [
    { limite: 18.5, classificacao: "MAGREZA" },
    { limite: 30, classificacao: "GORDO" },
    { limite: 18.5, classificacao: "" }
  ];
  
  export const calcularIMC = (peso, altura) => {
    return peso / (altura * altura);
  };
  