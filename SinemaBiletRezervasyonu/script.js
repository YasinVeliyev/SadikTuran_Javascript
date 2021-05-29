let container = document.querySelector('.container')
let count = document.querySelector('#count')
let amount = document.querySelector('#amount')
let select = document.querySelector('#movie')
let seats = document.querySelectorAll(".row .seat:not(.reserved)")

getFromLocalStorage()
calculateTotal()

container.addEventListener('click', (event)=>{
    if(event.target.classList.contains('seat') && !event.target.classList.contains('reserved')){
        event.target.classList.toggle('selected')
        calculateTotal()     
    }
})

select.addEventListener('change', (event)=>{
    calculateTotal()
})

function calculateTotal(){
    let selectesSeatsIndex = []

    seats.forEach((seat,index)=>{
        if(seat.className === 'seat selected'){
            selectesSeatsIndex.push(index)
    }})
    
    localStorage.setItem("selectesSeatsIndex", JSON.stringify(selectesSeatsIndex))
    localStorage.setItem('selectedMovieIndex',select.selectedIndex)
    selectedSeatCount = selectesSeatsIndex.length
    count.innerText = selectedSeatCount
    amount.innerText = Number(select.value) * selectedSeatCount
}

function getFromLocalStorage(){
    
    let selectedSeats = JSON.parse(localStorage.getItem('selectesSeatsIndex'))
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    
    if(selectedSeats)
        {selectedSeats.forEach((elem)=>seats[elem].className='seat selected')}

    if(selectedMovieIndex){
        select.selectedIndex = selectedMovieIndex
    }
}