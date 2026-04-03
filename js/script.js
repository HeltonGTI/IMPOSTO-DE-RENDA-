function calcular() {
  let salario = parseFloat(document.getElementById("salario").value);

  if (isNaN(salario) || salario <= 0) {
    alert("Digite um salário válido!");
    return;
  }

  let inss = calcularINSS(salario);
  let base = salario - inss;
  let irrf = calcularIRRF(base);
  let liquido = salario - inss - irrf;

  // Exibir valores formatados em reais
  document.getElementById("inss").value = formatarMoeda(inss);
  document.getElementById("irrf").value = formatarMoeda(irrf);
  document.getElementById("liquido").value = formatarMoeda(liquido);

  let msg = document.getElementById("mensagem");

  if (irrf === 0) {
    msg.style.display = "block";
    msg.innerText = "Você está isento de Imposto de Renda em 2026!";
  } else {
    msg.style.display = "block";
    msg.innerText = "Descontos aplicados com sucesso!";
  }
}

function limpar() {
  document.getElementById("salario").value = "";
  document.getElementById("inss").value = "";
  document.getElementById("irrf").value = "";
  document.getElementById("liquido").value = "";
  
  let msg = document.getElementById("mensagem");
  msg.style.display = "none";
  msg.innerText = "";
}

function calcularINSS(salario) {
  let teto = 8475.55;
  let base = Math.min(salario, teto);
  let inss = 0;

  if (base <= 1621) {
    inss = base * 0.075;
  } else if (base <= 2902.84) {
    inss = (1621 * 0.075) + ((base - 1621) * 0.09);
  } else if (base <= 4354.27) {
    inss = (1621 * 0.075) + (1281.84 * 0.09) + ((base - 2902.84) * 0.12);
  } else {
    inss = (1621 * 0.075) + (1281.84 * 0.09) + (1451.43 * 0.12) + ((base - 4354.27) * 0.14);
  }

  return Math.min(inss, 988.09);
}

function calcularIRRF(base) {
  if (base <= 5000) return 0;
  return (base - 5000) * 0.275;
}

// Função para formatar como moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}