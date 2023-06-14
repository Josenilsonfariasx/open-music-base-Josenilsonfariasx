let dark = false
const img = document.querySelector('img')

const btnDark = document.querySelector('.img-dark')
const theme = ()=>{
    dark = !dark
    
    const html = document.querySelector('html')
    html.classList.toggle('darkmode')
    const local = localStorage.setItem('darkMode', JSON.stringify(dark))
    if(dark){
        img.src ='./src/assets/img/sol.png'
    }else {
        img.src ='./src/assets/img/moon.svg'
    }
}

const analic = ()=>{
    const getStorage = JSON.parse(localStorage.getItem('darkMode'))
    console.log(getStorage)
    if(getStorage){
        theme()
        img.src ='./src/assets/img/sol.png'
    }else{
        img.src ='./src/assets/img/moon.svg'
    }
}
btnDark.addEventListener('click', theme)
analic()