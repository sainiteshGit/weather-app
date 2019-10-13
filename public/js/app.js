console.log('Client Side Javascript File is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')


messageOne.textContent=''
messagetwo.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
response.json().then((data)=>{
if(data.error){
   messageOne.textContent=data.location
   messagetwo.textContent="Invalid location Please try again"
    //console.log(data.error)
} else{
    messageOne.textContent=data.location+'   '
    messagetwo.textContent='Forecast: '+data.forecast
    //console.log(data.location)
    //console.log(data.forecast)
}
})
})
    console.log(location)
})