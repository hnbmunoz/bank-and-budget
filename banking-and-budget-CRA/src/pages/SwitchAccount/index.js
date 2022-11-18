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
  const [galaxyDetail, setGalaxyDetail] = useState({accountNumber:'', userFullname:'' ,acctBalance:0, accountExpiry:'', accountCVC:''});
  const [klarnaDetail, setKlarnaDetail] = useState({accountNumber:'', userFullname:'' ,acctBalance:0, accountExpiry:''});
  const [sparksseDetail, setSparksseDetail] = useState({accountNumber:'', userFullname:'' ,acctBalance:0, accountExpiry:''});
  // const [galaxyBalance, setGalaxyBalance] = useState(0)
  // const [klarnaBalance, setKlarnaBalance] = useState(0)
  // const [sparksseBalance, setSparksseBalance] = useState(0)


  useEffect(() => {
    getUserTransactions();
    getUserAccount();
    getUserStore();
    userStore.length > 0 && getCardDetails();
    // getDetails();
    return () => {};
  }, [displayPanel]);

  

  const galaxyBalance = (acct = "") => {
    const galaxyTransactions = userTransactions.filter(
        (user) => user.userCode === getUserCode && user.accountNumber == acct
      );

      const galaxyBalance = GetAccountBalance(galaxyTransactions)
      
    return {acctBalance: galaxyBalance}
  }

  const klarnaBalance = (acct = "") => {
    
    const klarnaTransactions = userTransactions.filter(
        (user) => user.userCode === getUserCode && user.accountNumber == acct
      );

    const klarnaBalance = GetAccountBalance(klarnaTransactions)
      
    return {acctBalance: klarnaBalance}
  }

  const sparksseBalance = (acct = "") => {
    const sparksseTransactions = userTransactions.filter(
        (user) => user.userCode === getUserCode && user.accountNumber == acct
      );
    const sparksseBalance = GetAccountBalance(sparksseTransactions)
      
    return {acctBalance: sparksseBalance}
  }

  const getCardDetails = () => {
    
    const userInfo = userStore.find(
      (user) => user.userCode === `${getUserCode}`)

    const galaxyATM = userAccount.find((data) => data.accountType === 'Galaxy' && data.accountUser === `${getUserCode}`);
    const klarnaATM = userAccount.find((data) => data.accountType === 'Klarna' && data.accountUser === `${getUserCode}`);
    const sparkssekATM = userAccount.find((data) => data.accountType === 'Sparksse' && data.accountUser === `${getUserCode}`);  

    galaxyATM && setGalaxyDetail({...galaxyDetail, ...galaxyATM, ...userInfo, ...galaxyBalance(galaxyATM.accountNumber)})
    klarnaATM && setKlarnaDetail({...klarnaDetail, ...klarnaATM, ...userInfo, ...klarnaBalance(klarnaATM.accountNumber)})
    sparkssekATM && setSparksseDetail({...sparksseDetail, ...sparkssekATM, ...userInfo , ...sparksseBalance(sparkssekATM.accountNumber)})
  }

  

  // const getDetails = () => {
    
  //   const userData = userAccount.filter(
  //     (user) => user.accountUser === `${getUserCode}`)

  // const userName = userStore.filter(
  //     (user) => user.userCode === `${getUserCode}`).map((user) =>
  //     {setUserName(user.userFullName)})

  // const galaxyATM = userData.find((data) => data.accountType === 'Galaxy');
  // const klarnaATM = userData.find((data) => data.accountType === 'Klarna');
  // const sparkssekATM = userData.find((data) => data.accountType === 'Sparksse');

  //   // getAccountBalance({galaxy: galaxyATM.accountNumber,klarna: klarnaATM.accountNumber, sparksse: sparkssekATM.accountNumber,})

  //   // galaxyATM && setGalaxyDetail({...galaxyDetail, ...galaxyATM})
  //   setKlarnaDetail(klarnaATM)
  //   setSparksseDetail(sparkssekATM)
  
  // };





  return (
    <Shifting>
      <div data-carousel="galaxy" className="carousel-div">
        <GalaxyAtm
            backgroundImage={Galaxy}
            logo={<LogoN26 />}
            cardType={<VisaWhiteLogo />}
            userData={galaxyDetail}
            userName={userName}
            // userBalance={galaxyBalance}
            // cardNumber={(galaxyDetail.accountNumber !== "" || galaxyDetail.accountNumber !== "undefined" ) ? galaxyDetail.accountNumber: ""}
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
        // cardNumber={(klarnaDetail.accountNumber !== "" || klarnaDetail.accountNumber !== "undefined" ) ? klarnaDetail.accountNumber: ""}
      />
      </div>
      <div data-carousel="sparksse" className="carousel-div">
        <RedAtm
        backgroundImage={""}
        logo={<LogoSparksse />}
        cardType={<MasterCardLogo />}
        userData={sparksseDetail}
        userName={userName}
        // userBalance={sparksseBalance}
        // cardNumber={(sparksseDetail.accountNumber !== "" || sparksseDetail.accountNumber !== "undefined" ) ? sparksseDetail.accountNumber: ""}
      />
      </div>
    </Shifting>
  )
};

export default SwitchAccount;