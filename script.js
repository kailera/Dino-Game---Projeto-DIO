const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
let isJumping = false;
let position = 0;
let pontos = 0


//console.log(dino);
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
} 

function jump(){
    isJumping = true;
    let upInterval = setInterval(()=>{
        if(position >=150){
            clearInterval(upInterval);
            //descento
            let downInterval = setInterval(()=>{
                if(position<=0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position-=20;
                    dino.style.bottom = position + 'px';
                }   
            },20)
        }else{
            //subindo
            position += 20      
            dino.style.bottom = position + 'px';   
        }
    }, 20)
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;


    cactus.classList.add('cactus')
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus)
    let leftInterval = setInterval(()=>{
            if(cactusPosition < -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60 ){
                // game over
                document.body.innerHTML = `<h1 class = "game-over">Fim de Jogo! Pontos: ${pontos} </h1>`
                clearInterval(leftInterval);
                clearInterval(criarPontuacao);
                
            }
            else{
                cactusPosition -=10;
                cactus.style.left = cactusPosition + 'px';
            } 
    },20);

    setTimeout(createCactus, randomTime);
}

function pontuacao(){
    pontos += 10 
    document.getElementById('pontuacao').textContent = pontos
}

const criarPontuacao = setInterval(pontuacao, 100);

createCactus();
document.addEventListener('keyup', handleKeyUp)