import React from 'react'
import useLocaleStorageStore from "../../utilities/hooks/useLocalStorage"

const NewMessage = () => {
  const [ messageStore, setMessageStore, getMessageStore] = useLocaleStorageStore('userMessages', [])

  return (
    <div>NewMessage</div>
  )
}

export default NewMessage