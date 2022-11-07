import React from 'react'
import { PanelSections, PanelSectionHolder } from "../../components/panels";
import {AdminModal} from '../../components/modal';
import * as adminPages from '../AdminPages';
import AdminAccounts from './AdminAccounts';


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
        <AdminModal>          
          <AdminAccounts />
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
      <PanelSections>    
        <AdminModal>
        </AdminModal> 
      </PanelSections>
   
  </PanelSectionHolder></div>
  )
}

export default AdminPage