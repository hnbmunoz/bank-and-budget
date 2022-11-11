import React, { useState, useEffect} from 'react'
import Modal from '../../components/modal'
import { Input } from '../../components/input'
import { FloatingButton  } from "../../components/button"
import useLocaleStorageStore from "../../utilities/hooks/useLocalStorage"
import NewMessage from './NewMessage'


const Messages = () => {
  const [ messageStore, setMessageStore, getMessageStore] = useLocaleStorageStore('userMessages', [])
  const [ newMessage, setNewMessage] = useState(false);

  const handleComposeMessage = () => {
    setNewMessage(!newMessage)
  }

  return (
    <Modal>
      <div className="message-container">
        {newMessage && <NewMessage />}
        <FloatingButton buttonClick={handleComposeMessage}/>
      </div>
    
    </Modal>
  )
}

export default Messages