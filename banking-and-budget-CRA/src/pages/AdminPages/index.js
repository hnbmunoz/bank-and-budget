import React from 'react'
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import Modal from '../../components/modal';
import * as adminPages from '../AdminPages';
import AdminAccounts from './AdminAccounts';
import CreateAdminUser from './CreateAdminUser';
import DepositTransaction from '../BankTransactions/DepositTransaction';
import WithdrawTransaction from '../BankTransactions/WithdrawTransaction';
import Messages from '../Messages';
import { AdminFundTransfer } from './AdminFundTransfer';
import Transactions from "../Transactions";
import DisableAccount from './DisableAccount';


const AdminPage = ({
  displayPanel,
  displayFullName = "",
  getUserCode = "",
  displayIndex = "",
  
}) => {
  return (
    <div className='flex-column'>
    <PanelSectionHolder panelIdx={displayPanel}>
      <PanelSections>    
        <AdminAccounts getUserCode={getUserCode} displayPanel={displayPanel} />
      </PanelSections>
      <PanelSections>    
        <Transactions getUserCode={getUserCode} displayPanel={displayPanel} />
      </PanelSections>
      <PanelSections>    
        <DepositTransaction getUserCode={getUserCode} displayPanel={displayPanel} />
      </PanelSections>
      <PanelSections>    
        <WithdrawTransaction getUserCode={getUserCode} displayPanel={displayPanel}  />
      </PanelSections>
      <PanelSections>    
        <AdminFundTransfer getUserCode={getUserCode} displayPanel={displayPanel} />
      </PanelSections>
      <PanelSections>    
      <DisableAccount getUserCode={getUserCode} displayPanel={displayPanel}/>
      </PanelSections>
      <PanelSections>    
        <Modal>
          <CreateAdminUser />
        </Modal> 
      </PanelSections>   
  </PanelSectionHolder>
  </div>
  )
}

export default AdminPage