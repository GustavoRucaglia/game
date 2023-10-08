document.addEventListener('DOMContentLoaded', function () {
    
    const mario = document.querySelector('.mario')
    
    let characterPositionX = 0;
    let scenePositionX = 0;
    
    const trashElements = document.querySelectorAll('.trash'); // Selecionar todos os elementos com a classe "trash"
    
    const scene = document.querySelector('.game-board')

    function checkCollision() {
        const marioRect = mario.getBoundingClientRect();
        
        // Iterar sobre cada elemento "trash"
        trashElements.forEach(trash => {
            const trashRect = trash.getBoundingClientRect();
            
            const marioBottom = marioRect.bottom; // Posição vertical do fundo do personagem
            
            if (
                marioRect.left < trashRect.right &&
                marioRect.right > trashRect.left &&
                marioBottom > trashRect.top
            ) {
                window.location.replace("level-2.html");
                return;
            }
        });
    }
    

    function checkCollisionInterval() {
        checkCollision();
        requestAnimationFrame(checkCollisionInterval);
    }

    checkCollisionInterval();
    
    const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {
        mario.classList.remove('jump')
    }, 1000)
    }


    function right() {
        if(scenePositionX > 1680){
            window.location.replace("conquista1.html");
            return
        }
     
        
        const sceneSpeed = 150;
        scenePositionX += sceneSpeed;
     
        const transformValue = window.getComputedStyle(mario).getPropertyValue("transform");
        
        const currentX = parseFloat(transformValue.split(",")[4]) || 0;
    
        const newX = currentX + 250;
    
        mario.style.transform = `translateX(${newX}px)`;

        scene.style.left = -characterPositionX + 'px';
    
       scene.style.transform = `translateX(-${scenePositionX}px)`
    }
    

    function left() {
        if(scenePositionX <= 0){
            return
        }
        const sceneSpeed = 150;

        scenePositionX -= sceneSpeed;
       

        const transformValue = window.getComputedStyle(mario).getPropertyValue("transform");
        
        const currentX = parseFloat(transformValue.split(",")[4]) || 0;
    
        const newX = currentX - 250;
    
        mario.style.transform = `translateX(${newX}px)`;

        scene.style.left = -characterPositionX + 'px';
    
       scene.style.transform = `translateX(-${scenePositionX}px)`
    }
    

    document.addEventListener('keypress', e => {
    const tecla = e.key
    if (tecla === ' ') {
        jump()
    }
    })


    document.addEventListener('keypress', e => {
        const tecla = e.key
        if (tecla === 'w') {
        jump()
        }
    })

    document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump() 
    }
    })

    document.addEventListener('keypress', e => {
        const tecla = e.key
        if (tecla === 'd') {
            right()
        }
    })
    document.addEventListener('keypress', e => {
            const tecla = e.key
            if (tecla === 'a') {
                left()
            }
    })

});
