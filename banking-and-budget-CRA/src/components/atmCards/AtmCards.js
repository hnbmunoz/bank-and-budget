import React from 'react'
import { useState, useEffect} from "react";
import { GetAccountBalance} from "../../utilities/utilities";
const AtmCards = () => {
  return (
    <></>
  )
}

export const GalaxyAtm = ({userBalance = 0, userName, userData = {}, logo, backgroundImage, cardType, cardNumber = "", cardExpiry="12/29" }) => {
    return (
        <div className="container cards">
          <div className="payment space">
            <div className="front-card" style={{backgroundImage: `url(${backgroundImage})`}}>
              <div className='header'>
                <div className='logo'>
                  <svg>
                      {logo}
                  </svg>
                </div>
                <div className="card-type">
                  <svg>
                      {cardType}
                  </svg>
                </div>
              </div>
              <fieldset className="card-number card-number__fields">
                <legend className="card-number__title">CARD NUMBER</legend>
                <div className="flex-row" style={{justifyContent: 'space-between', width: '100%'}}>
                  <div className="card-number__part">{userData.accountNumber}</div>
                  <div className="user-balance">{userData.acctBalance}</div>
                </div>                    
              </fieldset>         
              <div className="holder-valid-container">
                <label className="card-holder">
                  <span className="card-holder__title">CARD HOLDER</span>
                  <div>{userData.userFullName}</div>
                </label>          
                <fieldset className="valid-thru">
                  <legend className="valid-trhu__title">VALID THRU</legend>
                  <div>{userData.accountExpiry}</div>
                </fieldset>
              </div>
            </div>
              <div className="back-card">
                <label className="cvc">
                  <span className="cvc__title">CVC</span>
                  {/* <input className="cvc_input" type="password" name="cvc" maxLength={3} /> */}
                  <div className="cvc_input">{userData.accountCVC}</div>
                </label>
              </div>
          </div>
        </div>
    )
  }


export const RedAtm = ({userBalance = 0, userName, userData = {},logo, backgroundImage, cardType, cardNumber = "", cardExpiry="12/29" }) => {
    return (
        <div className="container cards">
          <div className="payment sparkasse">
            <div className="front-card" style={{backgroundImage: `url(${backgroundImage})`}}>
              <div className='header'>
                <div className='logo'>
                  <svg>
                      {logo}
                  </svg>
                </div>
                <div className="card-type">
                  <svg>
                      {cardType}
                  </svg>
                </div>
              </div>
              <fieldset className="card-number card-number__fields">
                <legend className="card-number__title">CARD NUMBER</legend>
                <div className="flex-row" style={{justifyContent: 'space-between', width: '100%'}}>
                  <div className="card-number__part">{userData.accountNumber}</div>
                  <div className="user-balance">{userData.acctBalance}</div>
                </div>             
              </fieldset>
              <div className="holder-valid-container">
                <label className="card-holder">
                  <span className="card-holder__title">CARD HOLDER</span>
                  <div>{userData.userFullName}</div>
                </label>          
                <fieldset className="valid-thru">
                  <legend className="valid-trhu__title">VALID THRU</legend>
                  <div>{userData.accountExpiry}</div>
                </fieldset>
              </div>
            </div>
              <div className="back-card">
                <label className="cvc">
                  <span className="cvc__title">CVC</span>
                  <div className="cvc_input">{userData.accountCVC}</div>
                </label>
              </div>
          </div>
        </div>
    )
  }

export const PinkAtm = ({userBalance, userName, userData = {}, logo, backgroundImage, cardType, cardNumber = "", cardExpiry="12/29"  }) => {
    return (
      <div className="container cards">
        <div className="payment klarna">
          <div
            className="front-card"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="header">
              <div className="logo">
                <svg>{logo}</svg>
              </div>
              <div className="card-type">
                <svg>{cardType}</svg>
              </div>
            </div>
            <fieldset className="card-number card-number__fields">
                <legend className="card-number__title">CARD NUMBER</legend>
                <div className="flex-row" style={{justifyContent: 'space-between', width: '100%'}}>
                  <div className="card-number__part">{userData.accountNumber}</div>
                  <div className="user-balance">{userData.acctBalance}</div>
                </div>             
              </fieldset>
              <div className="holder-valid-container">
                <label className="card-holder">
                  <span className="card-holder__title">CARD HOLDER</span>
                  <div>{userData.userFullName}</div>
                </label>          
                <fieldset className="valid-thru">
                  <legend className="valid-trhu__title">VALID THRU</legend>
                  <div>{userData.accountExpiry}</div>
                </fieldset>
              </div>
          </div>
          <div className="back-card">
            <label className="cvc">
              <span className="cvc__title">CVC</span>              
              <div className='cvc_input'>{userData.accountCVC}</div>
            </label>
          </div>
        </div>
      </div>
    );
  };

export default AtmCards