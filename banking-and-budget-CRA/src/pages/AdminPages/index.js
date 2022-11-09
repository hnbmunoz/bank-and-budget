import React from 'react'
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import Modal from '../../components/modal';
import * as adminPages from '../AdminPages';
import AdminAccounts from './AdminAccounts';
import CreateAdminUser from './CreateAdminUser';


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
          <AdminAccounts />
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
      </PanelSections>
      <PanelSections>    
        <Modal>
        </Modal> 
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