import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import Modal from "~components/Modal"
import { modalToggle } from "~slice"
import { store } from "~store"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    store.subscribe(() => {
      setShowModal(store.getState().modal)
    })
  }, [])

  const closeModal = () => {
    store.dispatch(modalToggle())
  }

  const handleClickOutside = (e) => {
    if (e.target !== e.currentTarget) return
    closeModal()
  }

  if (!showModal) return null

  return (
    <div
      onClick={(e) => handleClickOutside(e)}
      className="flex w-screen h-screen fixed bg-neutral-300/35 justify-center items-center">
      <Modal closeModal={closeModal} />
    </div>
  )
}

export default PlasmoOverlay
