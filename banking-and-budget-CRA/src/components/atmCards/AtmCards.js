import React from 'react'

const AtmCards = () => {
  return (
    <></>
  )
}

export const GalaxyAtm = ({logo, backgroundImage, cardType}) => {
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
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
              </fieldset>
              <div className="holder-valid-container">
                <label className="card-holder">
                  <span className="card-holder__title">CARD HOLDER</span>
                  <input name="ccname" autoComplete="cc-name" />
                </label>
                <fieldset className="valid-thru">
                  <legend className="valid-trhu__title">VALID THRU</legend>
                  <label>
                    <span className="sr-only">Month</span>
                    <select className="valid-thru__part month" id="valid-thru_part1">
                      <optgroup label="Month">
                        <option value=""></option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </optgroup>
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Year</span>
                    <select className="valid-thru__part year" id="valid-thru_part2">
                      <optgroup label="Year">
                        <option value=""></option>
                        <option value="2022">22</option>
                        <option value="2023">23</option>
                        <option value="2024">24</option>
                        <option value="2025">25</option>
                      </optgroup>
                    </select>
                  </label>
                </fieldset>
              </div>
            </div>
              <div className="back-card">
                <label className="cvc">
                  <span className="cvc__title">CVC</span>
                  <input className="cvc_input" type="password" name="cvc" maxLength={3} />
                </label>
              </div>
          </div>
        </div>
    )
  }


export const RedAtm = ({logo, backgroundImage, cardType}) => {
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
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
                  <input type="tel" className="card-number__part" maxLength={4} />
              </fieldset>
              <div className="holder-valid-container">
                <label className="card-holder">
                  <span className="card-holder__title">CARD HOLDER</span>
                  <input name="ccname" autoComplete="cc-name" />
                </label>
                <fieldset className="valid-thru">
                  <legend className="valid-trhu__title">VALID THRU</legend>
                  <label>
                    <span className="sr-only">Month</span>
                    <select className="valid-thru__part month" id="valid-thru_part1">
                      <optgroup label="Month">
                        <option value=""></option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </optgroup>
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Year</span>
                    <select className="valid-thru__part year" id="valid-thru_part2">
                      <optgroup label="Year">
                        <option value=""></option>
                        <option value="2022">22</option>
                        <option value="2023">23</option>
                        <option value="2024">24</option>
                        <option value="2025">25</option>
                      </optgroup>
                    </select>
                  </label>
                </fieldset>
              </div>
            </div>
              <div className="back-card">
                <label className="cvc">
                  <span className="cvc__title">CVC</span>
                  <input className="cvc_input" type="password" name="cvc" maxLength={3} />
                </label>
              </div>
          </div>
        </div>
    )
  }

export const PinkAtm = ({ logo, backgroundImage, cardType }) => {
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
              <input type="tel" className="card-number__part" maxLength={4} />
              <input type="tel" className="card-number__part" maxLength={4} />
              <input type="tel" className="card-number__part" maxLength={4} />
              <input type="tel" className="card-number__part" maxLength={4} />
            </fieldset>
            <div className="holder-valid-container">
              <label className="card-holder">
                <span className="card-holder__title">CARD HOLDER</span>
                <input name="ccname" autoComplete="cc-name" />
              </label>
              <fieldset className="valid-thru">
                <legend className="valid-trhu__title">VALID THRU</legend>
                <label>
                  <span className="sr-only">Month</span>
                  <select
                    className="valid-thru__part month"
                    id="valid-thru_part1">
                    <optgroup label="Month">
                      <option value=""></option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </optgroup>
                  </select>
                </label>
                <label>
                  <span className="sr-only">Year</span>
                  <select className="valid-thru__part year" id="valid-thru_part2">
                    <optgroup label="Year">
                      <option value=""></option>
                      <option value="2022">22</option>
                      <option value="2023">23</option>
                      <option value="2024">24</option>
                      <option value="2025">25</option>
                    </optgroup>
                  </select>
                </label>
              </fieldset>
            </div>
          </div>
          <div className="back-card">
            <label className="cvc">
              <span className="cvc__title">CVC</span>
              <input
                className="cvc_input"
                type="password"
                name="cvc"
                maxLength={3}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

export default AtmCards