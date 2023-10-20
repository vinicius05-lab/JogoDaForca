const array = ["Java", "PHP", "Javascript", "Python", "Ruby"]
const palavraSecreta = array[Math.floor( Math.random() * array.length)];
const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown",  event => {
    const codigo = event.keyCode;
    if(isLetra(codigo)){
        const letra = event.key;
        if(letrasErradas.includes(letra)){
            mostrarAvisoLetraRepetida();
        }else{
            if(palavraSecreta.includes(letra)){
                letrasCorretas.push(letra);
            }else{
                letrasErradas.push(letra);
            }
        }
        atualizarJogo();
    }
});

function atualizarJogo(){
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}

function mostrarLetrasErradas(){
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras erradas</h3>";
    letrasErradas.forEach(letras => {
        div.innerHTML += `<span>${letras}</span>`;
    });
}

function mostrarLetrasCertas(){
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    palavraSecreta.split("").forEach(letra => {
        if (letrasCorretas.includes(letra)){
            container.innerHTML += `<span>${letra}</span>`;
        }else{
            container.innerHTML += "<span>_</span>";
        }
    });
}

function desenharForca(){
    const partesCorpo = document.querySelectorAll(".forca-parte");
    for(let i = 0; i<letrasErradas.length; i++ ){
        partesCorpo[i].style.display = "block";
    }
}

function mostrarAvisoLetraRepetida(){
    let aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 4000)
}

function isLetra(codigo){
    if(codigo >= 65  && codigo <= 90){
        return codigo
    }else{
        return false
    }
}

function checarJogo(){
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");
    let mensagem = "";
    if(letrasErradas.length === partesCorpo.length){
        mensagem = "Fim de Jogo! Você Perdeu!";
    }
    
    if(palavraSecreta === container.innerText){
        mensagem = "Parabéns! Você Ganhou!";
    }

    if(mensagem){
        setInterval(() => {
            document.querySelector("#mensagem").innerHTML = mensagem;
            document.querySelector(".popup-container").style.display = "flex";
        }, 1000);
    }
}
  

function reiniciarJogo(){
    window.location.reload();
}