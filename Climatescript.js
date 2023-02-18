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


const selecionado = document.getElementById("selecionado")



//captura os dados da API openwheater
async function getDadosAPI(cidade){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveAPI}&lang=en_us`

    const resposta = await fetch(apiURL)
    
    const dados = await resposta.json()

    return dados
}

//imprime os dados na tela
async function imprimeDadosAPI(cidade){

    const dados = await getDadosAPI(cidade)

    if(dados.name == undefined){
        //tratar exceção
    }else if(selecionado.value == "C"){
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

    }else if(selecionado.value == "F"){
        city.innerText = dados.name
        temperatura.innerText = `${Math.round((dados.main.temp)*1.8)+32}°F`
        temperatura_min.innerText = `${Math.round(Math.floor(dados.main.temp_min)*1.8)+32}°`
        temperatura_max.innerText = `${Math.round(Math.ceil(dados.main.temp_max)*1.8)+32}°`
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

    imgAleatoria = Math.round(Math.random()*8)

    Body.style.backgroundImage=`url(${dados.results[imgAleatoria].urls.raw})`
    
}


// Eventos click e tecla
btnEnvia.addEventListener("click", ()=>{

    imprimeDadosAPI(entradaTexto.value)
    exibeUnsplashApi(entradaTexto.value)
    
})


window.addEventListener("keypress", (evento)=>{

    if(evento.key == "Enter"){
        imprimeDadosAPI(entradaTexto.value)
        exibeUnsplashApi(entradaTexto.value)
        
    }      
})


// aciona o evento da medida da temperatura
selecionado.addEventListener("click", ()=>{
    if(entradaTexto.value == ""){
        imprimeDadosAPI("Rio de Janeiro")
    }else{
        imprimeDadosAPI(entradaTexto.value)
    }  
})


// valor default para cidade

imprimeDadosAPI("Rio de Janeiro")
exibeUnsplashApi("Rio de Janeiro")









