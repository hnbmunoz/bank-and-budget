import React from 'react'
import Modal from '../../components/modal'
import { Input } from '../../components/input'
import { NeonButton, RoundedButton, GlowingButton } from "../../components/button"

const Messages = () => {

  const getData = (e) => {
    const targetEl = e.currentTarget.parentElement.parentElement.children;
    // let display = targetEl.divsample.children.sample.value;
    // let display = document.querySelector('[data-inputname=sample]')
    // alert(display)
  }
  return (
    <Modal>
      <div>Messages</div>
      <Input name="sample" placeholderText='my placeholder'/>

      <NeonButton displayText='Submit' buttonClick={getData}/>
      
      <RoundedButton displayText='Submit' buttonClick={getData}/>

      <GlowingButton displayText='Submit' buttonClick={getData}/>

    </Modal>
  )
}

export default Messages