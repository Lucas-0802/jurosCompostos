
let form = document.querySelector('#form')

form.onsubmit= function(evento) {
    evento.preventDefault()
    
  let nome = document.forms['form']['nome'].value
  let mensalidade = document.forms['form']['mensalidade'].value
  let taxa = document.forms['form']['taxa'].value
  let tempo = document.forms['form']['tempo'].value
  let taxaFormatada = taxa/100
  let tempoFormatado = tempo * 12

  fetch('http://api.mathjs.org/v4/', {
    method: 'POST',
    body: `{ "expr": "${mensalidade} * (((1 + ${taxaFormatada}) ^ ${tempoFormatado} - 1) / ${taxaFormatada})" }`
  })
  .then(transformarEmJson)
  .then(exibirNaTela)

  function transformarEmJson(response) {
    return response.json()
  }

  function exibirNaTela(dados) {
    let res = document.querySelector('.res')
    res.innerHTML = `Olá ${nome}, juntando R$${mensalidade} todo mês, você terá R$${dados.result} em ${tempo} anos.`
    
    form.reset()

    
  }
}
