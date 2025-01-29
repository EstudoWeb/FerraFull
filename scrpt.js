//Elementos para testar o JavaScript da página
let TestBut = document.getElementById('TestBut')
let jsTesResul = document.getElementById('jsTesResul')

//Elementos para IMC
let IMCResul = document.getElementById('IMCResul')
let pesoImput = document.getElementById('pesoImput')
let alturaImput = document.getElementById('alturaImput')
let calcIMCbut = document.getElementById('calcIMCbut')

//Elementos para cotações de Dolla/Real
let informes = document.getElementById('informes')
let usd = document.getElementById('usd')
let real = document.getElementById('real')
let DataHoraCot = document.getElementById('DataHoraCot')
let ValorAtual = document.getElementById('ValorAtual')
let TotalCalc = document.getElementById('TotalCalc')
let trocar = document.getElementById('trocar')
let calcBut = document.getElementById('calcBut')

//Elementos para a calculadora simples
let operation = document.getElementById('operation')
let resultadoCalc = document.getElementById('resultadoCalc')
let number1 = document.getElementById('number1')
let number2 = document.getElementById('number2')
let calcSimplesBut = document.getElementById('calcSimplesBut')


let calcReal = true

//Adicionando a função de calcular o resultado ao clique do calcBut
calcBut.addEventListener('click',()=>getDollar())

calcIMCbut.addEventListener('click', function(){
  IMCResul.innerHTML = `seu IMC é: ${(pesoImput.value/(alturaImput.value*alturaImput.value)).toFixed(2)}`
})

//Função que faz a troca da moeda desejada "Dolla/Real"
trocar.addEventListener('click',function(){
  if(usd.disabled == true){
    real.disabled = true
    usd.disabled = false
    calcReal = true
    real.value = ""
  }else{
    real.disabled = false
    usd.disabled = true
    calcReal = false
    usd.value = ""
  }
})

//Variável que pega a data com o "mês, dia, e ano" do dispositivo do usúario
let data = `0${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`
//Declarando variável para pegar o preço do dolla
let DollarHoje;

//Resetando o resultado do teste de javaScript
jsTesResul.innerHTML = ""


TestBut.addEventListener('click', function(){
  alert('O JavaScript está ativo!')
    jsTesResul.innerHTML = "<strong>O JavaScript está ativado!</strong>"
})

const getDollar = ()=>{
  if(calcReal == true){
  informes.innerHTML = "Calculando..."
  fetch(`https://economia.awesomeapi.com.br/json/last/usd`).then(res => res.json()).then((dados)=>{ 

  DollarHoje = Number(dados.USDBRL.bid)
  real.value = (DollarHoje*usd.value).toFixed(2)
  informes.innerHTML = `
  <p id="DataHoraCot">Valor do dólar registrado em: <strong>${dados.USDBRL.create_date}</strong></p>
  <p id="ValorAtual">Valor atual: <strong>R$${Number((dados.USDBRL.bid)).toFixed(3)}</strong></p>
  <p id="TotalCalc">Total: <strong>R$${(DollarHoje*usd.value).toFixed(2)}</strong></p>`

  }).catch(()=>{
    informes.innerHTML = "Erro, verifique sua conexão!"
  })

  }else{
    informes.innerHTML = "Calculando..."
  fetch(`https://economia.awesomeapi.com.br/json/last/usd`).then(res => res.json()).then((dados)=>{ 

  DollarHoje = Number(dados.USDBRL.bid)
  usd.value = (real.value/DollarHoje).toFixed(2)
  informes.innerHTML = `
  <p id="DataHoraCot">Valor do dólar registrado em: <strong>${dados.USDBRL.create_date}</strong></p>
  <p id="ValorAtual">Valor atual: <strong>U$${(1/DollarHoje).toFixed(3)}</strong></p>
  <p id="TotalCalc">Total: <strong>U$${(real.value/DollarHoje).toFixed(2)}</strong></p>`

  }).catch(()=>{
    informes.innerHTML = "Erro, verifique sua conexão!"
  })
  }
}
calcSimplesBut.addEventListener('click',function(){
  if(operation.value == "soma"){
    resultadoCalc.innerHTML = `Resultado: ${Number(number1.value) + Number(number2.value)}`
  }else if(operation.value == "subtracao"){
    resultadoCalc.innerHTML = `Resultado: ${Number(number1.value) - Number(number2.value)}`
  }else if(operation.value == "multiplicacao"){
    resultadoCalc.innerHTML = `Resultado: ${(Number(number1.value) * Number(number2.value)).toFixed(2)}`
  }else{
    resultadoCalc.innerHTML = `Resultado: ${(Number(number1.value) / Number(number2.value)).toFixed(2)}`
  }
})