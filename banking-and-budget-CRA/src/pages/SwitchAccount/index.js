import React from "react";
import Modal from "../../components/modal";
import Slider from "../../components/slider/Slider";

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
    <>
    {/* <Slider> */}
    <GalaxyAtm
        backgroundImage={Galaxy}
        logo={<LogoN26 />}
        cardType={<VisaWhiteLogo />}
      />
      <PinkAtm
        backgroundImage={<KlarnaBackgroundImg />}
        logo={<LogoKlarna />}
        cardType={<VisaBlackLogo />}
      />
      <RedAtm
        backgroundImage={""}
        logo={<LogoSparksse />}
        cardType={<MasterCardLogo />}
      />
    {/* </Slider> */}
    </>
  )
};

export default SwitchAccount;