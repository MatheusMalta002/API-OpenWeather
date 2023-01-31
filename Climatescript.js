const entradaTexto = document.getElementById("entrada-texto") //input
const btnEnvia = document.getElementById("btn-envia")  //botao de envio

const city = document.getElementById("cidade")
const temperatura = document.getElementById("temperatura")
const temperatura_min = document.getElementById("temp_min")
const temperatura_max = document.getElementById("temp_max")
const umidade = document.getElementById("umidade")
const nuvens = document.getElementById("nuvens")
const vento = document.getElementById("vento")

const iconCeu = document.getElementById("céu")
const Ceu = document.getElementById("ceu")

const chaveAPI = "3851ff8a5f56eb5aa79d1e70c5e70887"

//captura os dados da API
async function getDadosAPI(cidade){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveAPI}&lang=pt_br`

    const resposta = await fetch(apiURL)
    
    const dados = await resposta.json()

    return dados
}

//imprime os dados na tela
async function imprimeDadosAPI(cidade){

    const dados = await getDadosAPI(cidade)

    if(dados.name == undefined){
        //tratar exceção
    }else{
        city.innerText = dados.name
        temperatura.innerText = `${Math.round(dados.main.temp)}°C`
        temperatura_min.innerText = `${Math.floor(dados.main.temp_min)}°`
        temperatura_max.innerText = `${Math.ceil(dados.main.temp_max)}°`
        umidade.innerText = `${dados.main.humidity}%`
        nuvens.innerText = dados.weather[0].description
        vento.innerText = `${Math.round(dados.wind.speed*1.60934)} Km/h`

        iconCeu.setAttribute("src", `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)
        Ceu.setAttribute("src", `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)
        
        console.log(dados)
    }
    
}

btnEnvia.addEventListener("click", ()=>{

    imprimeDadosAPI(entradaTexto.value)
})

