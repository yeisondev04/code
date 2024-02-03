const inputOriginal = document.getElementById("input-original");
const cifrador = document.getElementById("cifrador");
const resultado = document.getElementById("resultado")
const iconoBoton = document.getElementById("icono-boton")

const titulo = document.getElementById("titulo")
const aside = document.getElementById("aside")
const ayuda = document.getElementById("ayuda")

const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let indexTheme = 0
iconoBoton.addEventListener("click", () => {
    indexTheme = indexTheme === 0 ? 1 : 0
    if (indexTheme) {
        document.body.style = `filter: invert(1);background: #479`; iconoBoton.src = "https://images.vexels.com/media/users/3/145137/isolated/preview/e6a965902c88e80552d448aa33cab165-icono-de-rayos-de-sol-afilados.png";
        aside.style = "color: #624911;"
        titulo.style = "color: #624911;"
        cifrador.style = "filter:contrast(.75)"
        ayuda.style = "color: #222"
    }
    else {
        document.body.style = "filter: invert(0);"; iconoBoton.src = "https://static.vecteezy.com/system/resources/previews/017/059/174/non_2x/moon-icon-free-png.png";
        aside.style = "rgb(128, 144, 169);"
        titulo.style = "color: var(--color-letras);";
        cifrador.style = "filter:contrast(1)"
        ayuda.style = "color: rgb(156, 149, 170)"
    }

})

const animarLetra = letra => {
    let cambiosDeLetra = 0
    if (cambiosDeLetra === 3) return
    return new Promise((resolve) => {
        const intervalo = setInterval(() => {
            cambiosDeLetra++
            letra.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)]
            if (cambiosDeLetra === 3) {
                clearInterval(intervalo)
                resolve()
            }
        }, 50);
    })
}

const cifrar = (index, letras) => {
    if (index === letras.length) return
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanLetra = document.createElement("span")
    resultado.appendChild(spanLetra)
    spanLetra.innerHTML = letras[index]
    animarLetra(spanLetra)
        .then(() => {
            spanLetra.innerHTML = letras[index]
            cifrar(index + 1, letras)
        })

}

const manejarMensaje = () => {
    const arrayLetras = [...inputOriginal.value.toUpperCase()]
    cifrar(0, arrayLetras)
}

const submit = e => {
    e.preventDefault()
    resultado.innerHTML = ""
    manejarMensaje()
}

resultado.addEventListener("click", () => {
    resultado.innerHTML = ""
    manejarMensaje()
})

cifrador.onsubmit = submit