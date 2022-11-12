import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Slider from "../../components/slider/Slider";
import { Shifting } from "../../components/carousel";

//Atm Cards
import { GalaxyAtm, PinkAtm, RedAtm } from "../../components/atmCards/AtmCards";

//background image
import Galaxy from "../../assets/wallpapers/galaxy.png";
import KlarnaBackgroundImg from "../../assets/wallpapers/KlarnaBackgroundImg";

//logo
import LogoN26 from "../../assets/wallpapers/LogoN26";
import LogoKlarna from "../../assets/wallpapers/LogoKlarna";
import LogoSparksse from "../../assets/wallpapers/LogoSparksse";

//card type
import VisaWhiteLogo from "../../assets/wallpapers/VisaWhiteLogo";
import VisaBlackLogo from "../../assets/wallpapers/VisaBlackLogo";
import MasterCardLogo from "../../assets/wallpapers/MasterCardLogo";

const SwitchAccount = () => {  
  return (
    <Shifting>
      <div data-carousel="galaxy" className="carousel-div">
        <GalaxyAtm
            backgroundImage={Galaxy}
            logo={<LogoN26 />}
            cardType={<VisaWhiteLogo />}
          />
      </div> 
      <div data-carousel="klarna" className="carousel-div">
      <PinkAtm
        backgroundImage={<KlarnaBackgroundImg />}
        logo={<LogoKlarna />}
        cardType={<VisaBlackLogo />}
      />
      </div>
      <div data-carousel="sparksse" className="carousel-div">
      <RedAtm
        backgroundImage={""}
        logo={<LogoSparksse />}
        cardType={<MasterCardLogo />}
      />
      </div>
    </Shifting>
  )
};

export default SwitchAccount;