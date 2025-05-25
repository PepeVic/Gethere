// Reference: https://pt.stackoverflow.com/questions/123741/validar-cpf-com-express%C3%A3o-regular-javascript

export const isCpfValid = (documento: string): boolean => {
  let soma = 0;
  let resto;
  let i: number;

  if (documento == '00000000000') return false;
  for (i = 1; i <= 9; i++)
    soma = soma + parseInt(documento.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(documento.substring(9, 10))) return false;

  soma = 0;
  for (i = 1; i <= 10; i++)
    soma = soma + parseInt(documento.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(documento.substring(10, 11))) return false;
  return true;
};
