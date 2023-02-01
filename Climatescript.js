const entradaTexto = document.getElementById("entrada-texto") //input
const btnEnvia = document.getElementById("btn-envia")  //botao de envio

const city = document.getElementById("cidade")
const temperatura = document.getElementById("temperatura")
const temperatura_min = document.getElementById("temp_min")
const temperatura_max = document.getElementById("temp_max")
const umidade = document.getElementById("umidade")
const nuvens = document.getElementById("nuvens")
const vento = document.getElementById("vento")
const bandeiraPais = document.getElementById("bandeira-pais")
const Body = document.getElementById("img-cidades")


const iconCeu = document.getElementById("céu")
const Ceu = document.getElementById("ceu")

const chaveAPI = "3851ff8a5f56eb5aa79d1e70c5e70887"
const keyAPIunsplash = "-O_8nwSvvHCmjm5zXIfaiRG1w0CoIFsR9CiD3X473bo"


//captura os dados da API openwheater
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
        vento.innerText = `${Math.round(dados.wind.speed*3.6)} Km/h`

        iconCeu.setAttribute("src", `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)
        Ceu.setAttribute("src", `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`)

        //API das bandeiras dos países
        bandeiraPais.setAttribute("src", `https://flagsapi.com/${dados.sys.country}/flat/64.png`)
    }
     
}

// captura a url da API
async function getUnsplashApi(cidade){
 
    const apiURL = `https://api.unsplash.com/search/photos?query=${cidade}&client_id=${keyAPIunsplash}&per_page=5`
    
    const resposta = await fetch(apiURL)
    
    const dados = await resposta.json()

    return dados
}

// Exibe a imagem na tela

async function exibeUnsplashApi(cidade){

    const dados = await getUnsplashApi(cidade)

    imgAleatoria = Math.round(Math.random()*5)

    Body.style.backgroundImage=`url(${dados.results[imgAleatoria].urls.raw})`
    
}

//  Eventos

btnEnvia.addEventListener("click", ()=>{

    imprimeDadosAPI(entradaTexto.value)
    exibeUnsplashApi(entradaTexto.value)
    entradaTexto.value = ""
})

window.addEventListener("keypress", (evento)=>{

    if(evento.key == "Enter"){
        imprimeDadosAPI(entradaTexto.value)
        exibeUnsplashApi(entradaTexto.value)
        entradaTexto.value = ""
    }      
})

// valor default para cidade

imprimeDadosAPI("Brasília")
exibeUnsplashApi("Brasília")

