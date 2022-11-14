import React from 'react'
import { NeonButton } from '../button'
const Slider = ({children}) => {
    // const prev = document.querySelector('.left')
    // const next = document.querySelector('.right')
    const container = document.querySelector('.cards')
    const cards = document.querySelectorAll('.cards-container .card-item')
    let currentIndex = Math.floor(cards.length/2)
    const val = (cards.length - 1 - Math.floor(cards.length/2)) * 195
    let translateVal = 0
  
    // for (let i = 0; i < cards.length; i++) {
    //   if (i === Math.floor(cards.length/2)) {
    //     cards[i].classList.add('current')
    //   }
    //   cards[i].addEventListener('click', () => {
    //   })
    // }
  
    // let defaultVal = 0
    // if (cards.length % 2 === 0) {
    //   defaultVal = 90
    //   translateVal -= 90
    //   container.style.transform = `translateX(${translateVal}px)`
    // }
  
  
    // prev.addEventListener('click', () => {
    //   if (currentIndex - 1 < 0) {
    //     cards[currentIndex].classList.remove('current')
    //     cards[cards.length - 1].classList.add('current')
    //     currentIndex = cards.length - 1
    //     translateVal = -val - defaultVal
    //     container.style.transform = `translateX(${translateVal}px)`
    //   } else {
    //     cards[currentIndex].classList.remove('current')
    //     cards[currentIndex - 1].classList.add('current')
    //     currentIndex -= 1
    //     translateVal += 195
    //     container.style.transform = `translateX(${translateVal}px)`
    //   }
    // })
  
    // next.addEventListener('click', () => {
    //   if (currentIndex + 1 >= cards.length) {
    //     cards[currentIndex].classList.remove('current')
    //     cards[0].classList.add('current')
    //     currentIndex = 0
    //     translateVal = val + defaultVal
    //     container.style.transform = `translateX(${translateVal}px)`
    //     return
    //   }
    //   cards[currentIndex].classList.remove('current')
    //   cards[currentIndex + 1].classList.add('current')
    //   currentIndex += 1
    //   translateVal -= 195
    //   container.style.transform = `translateX(${translateVal}px)`
    // })

    const gotoLeft = () => {
      alert('event here')
    }

    const gotoRight = () => {
      alert('event here')
    }
  return (
    <div className="choose-card">
    <span className="modal-header">Choose your card</span>
    <div className="cards-container">
      <span className="left" onClick={gotoLeft}></span>     
      <div className="cards">
        {/* <div className="card-item">
        </div>
        <div className="card-item">
        </div>
        <div className="card-item">
        </div> */}
         {children}
      </div>
      <span className="right" onClick={gotoRight}></span>
    </div>
    <button className="button-simple">View Balance</button>
  </div>

  )
}

export default Slider