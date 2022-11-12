import React from 'react'
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import Modal from '../../components/modal';
import * as adminPages from '../AdminPages';
import AdminAccounts from './AdminAccounts';
import CreateAdminUser from './CreateAdminUser';
import DepositTransaction from '../BankTransactions/DepositTransaction';
import WithdrawTransaction from '../BankTransactions/WithdrawTransaction';
import Messages from '../Messages';


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
        <Modal>          
          <AdminAccounts getUserCode={getUserCode}/>
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
          <DepositTransaction />
      </PanelSections>
      <PanelSections>    
          <WithdrawTransaction />
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
       <Messages />
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