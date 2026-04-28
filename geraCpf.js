function gerarCPF() {
  let cpf = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  let calcDV = (base) => {
    let soma = base.reduce((acc, num, i) => acc + num * ((base.length + 1) - i), 0);
    let resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  cpf.push(calcDV(cpf));
  cpf.push(calcDV(cpf));

  return cpf.join('');
}

for (let i = 0; i < 10; i++) {
  console.log(gerarCPF());
}