import React from 'react'

const Slider = () => {
    const prev = document.querySelector('.left')
    const next = document.querySelector('.right')
    const container = document.querySelector('.cards')
    const cards = document.querySelectorAll('.cards-container .card-item')
    let currentIndex = Math.floor(cards.length/2)
    const val = (cards.length - 1 - Math.floor(cards.length/2)) * 195
    let translateVal = 0
  
    for (let i = 0; i < cards.length; i++) {
      if (i === Math.floor(cards.length/2)) {
        cards[i].classList.add('current')
      }
      cards[i].addEventListener('click', () => {
      })
    }
  
    let defaultVal = 0
    if (cards.length % 2 === 0) {
      defaultVal = 90
      translateVal -= 90
      container.style.transform = `translateX(${translateVal}px)`
    }
  
  
    prev.addEventListener('click', () => {
      if (currentIndex - 1 < 0) {
        cards[currentIndex].classList.remove('current')
        cards[cards.length - 1].classList.add('current')
        currentIndex = cards.length - 1
        translateVal = -val - defaultVal
        container.style.transform = `translateX(${translateVal}px)`
      } else {
        cards[currentIndex].classList.remove('current')
        cards[currentIndex - 1].classList.add('current')
        currentIndex -= 1
        translateVal += 195
        container.style.transform = `translateX(${translateVal}px)`
      }
    })
  
    next.addEventListener('click', () => {
      if (currentIndex + 1 >= cards.length) {
        cards[currentIndex].classList.remove('current')
        cards[0].classList.add('current')
        currentIndex = 0
        translateVal = val + defaultVal
        container.style.transform = `translateX(${translateVal}px)`
        return
      }
      cards[currentIndex].classList.remove('current')
      cards[currentIndex + 1].classList.add('current')
      currentIndex += 1
      translateVal -= 195
      container.style.transform = `translateX(${translateVal}px)`
    })
  return (
    <div class="choose-card">
    <span class="title">Choose your card</span>
    <div class="cards-container">
      <span class="left"></span>
      <div class="cards">
        <div class="card-item">
        </div>
        <div class="card-item">
        </div>
        <div class="card-item">
        </div>
      </div>
      <span class="right"></span>
    </div>
    <button class="button-simple">Back</button>
  </div>

  )
}

export default Slider