import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import Slider from "../../components/slider/Slider";
import { Shifting } from "../../components/carousel";
import useLocalStorageStore from "../../utilities/hooks/useLocalStorage";
import { GetAccountBalance, GetTransactionBalance } from "../../utilities/utilities";


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

const SwitchAccount = ({getUserCode, displayPanel}) => {
  const [userStore, setUserStore, getUserStore] = useLocalStorageStore(
    "registeredUsers",
    []
  );
  const [userAccount, setUserAccount, getUserAccount] = useLocalStorageStore('userAccounts',[])
  const [userTransactions, setUserTransaction, getUserTransactions] = useLocalStorageStore("userTransaction", []);
  const [userName, setUserName] = useState('');
  const [galaxyDetail, setGalaxyDetail] = useState('');
  const [klarnaDetail, setKlarnaDetail] = useState('');
  const [sparksseDetail, setSparksseDetail] = useState('');
  const [galaxyBalance, setGalaxyBalance] = useState(0)
  const [klarnaBalance, setKlarnaBalance] = useState(0)
  const [sparksseBalance, setSparksseBalance] = useState(0)


  useEffect(() => {
    getUserTransactions();
    getUserAccount();
    getUserStore();
    getAccountBalance()
    return () => {};
  }, [displayPanel]);

  const getAccountBalance = (acctNumber) => {       
    const galaxyATM = userTransactions.filter(
      (user) => user.userCode === getUserCode && user.accountNumber === acctNumber.galaxy
    );
    const klarnaATM = userTransactions.filter(
      (user) => user.userCode === getUserCode && user.accountNumber === acctNumber.klarna
    );
    const sparkssekATM = userTransactions.filter(
      (user) => user.userCode === getUserCode && user.accountNumber === acctNumber.sparksse
    );
    const galaxyTotalBalance = GetAccountBalance(galaxyATM);
    const klarnaTotalBalance = GetAccountBalance(klarnaATM);
    const sparksseTotalBalance = GetAccountBalance(sparkssekATM);

    setGalaxyBalance(galaxyTotalBalance);
    setKlarnaBalance(klarnaTotalBalance);
    setSparksseBalance(sparksseTotalBalance);
  }

  useEffect(() => {
    userAccount.length > 0 && getDetails();
    return () => {};
  },[displayPanel, userAccount]);

  const getDetails = () => {
    const userData = userAccount.filter(
      (user) => user.accountUser === `${getUserCode}`)

  const userName = userStore.filter(
      (user) => user.userCode === `${getUserCode}`).map((user) =>
      {setUserName(user.userFullName)})

  const galaxyATM = userData.find((data) => data.accountType === 'Galaxy');
  const klarnaATM = userData.find((data) => data.accountType === 'Klarna');
  const sparkssekATM = userData.find((data) => data.accountType === 'Sparksse');

    getAccountBalance({galaxy: galaxyATM.accountNumber,klarna: klarnaATM.accountNumber, sparksse: sparkssekATM.accountNumber,})

    setGalaxyDetail(galaxyATM)
    setKlarnaDetail(klarnaATM)
    setSparksseDetail(sparkssekATM)
  
  };





  return (
    <Shifting>
      <div data-carousel="galaxy" className="carousel-div">
        <GalaxyAtm
            backgroundImage={Galaxy}
            logo={<LogoN26 />}
            cardType={<VisaWhiteLogo />}
            userData={galaxyDetail}
            userName={userName}
            userBalance={galaxyBalance}
          />
      </div> 
      <div data-carousel="klarna" className="carousel-div">
      <PinkAtm
        backgroundImage={<KlarnaBackgroundImg />}
        logo={<LogoKlarna />}
        cardType={<VisaBlackLogo />}
        userData={klarnaDetail}
        userName={userName}
        userBalance={klarnaBalance}
      />
      </div>
      <div data-carousel="sparksse" className="carousel-div">
      <RedAtm
        backgroundImage={""}
        logo={<LogoSparksse />}
        cardType={<MasterCardLogo />}
        userData={sparksseDetail}
        userName={userName}
        userBalance={sparksseBalance}
      />
      </div>
    </Shifting>
  )
};

export default SwitchAccount;