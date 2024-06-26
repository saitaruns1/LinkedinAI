import editIcon from "data-base64:assets/open.svg"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { modalToggle } from "~slice"
import { store } from "~store"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(
    "div.msg-form__msg-content-container--scrollable > div > div.msg-form__contenteditable"
  )

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const IconBtnInline = () => {
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const input = document.querySelector(
      "div.msg-form__msg-content-container--scrollable > div > div.msg-form__contenteditable"
    )

    const openModal = () => setFocused(true)

    // clicked anywhere outside the input
    const handleClickOutside = () => {
      if (
        document.activeElement !== input &&
        document.activeElement !== input.querySelector("*")
      ) {
        setFocused(false)
      }
    }

    if (input) {
      input.addEventListener("focus", openModal)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      if (input) {
        input.removeEventListener("focus", openModal)
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [])

  const toggleModal = () => {
    store.dispatch(modalToggle())
  }

  if (!focused) return null

  return (
    <img
      src={editIcon}
      alt="Edit Icon"
      className="absolute right-2 bottom-2 cursor-pointer hover:scale-105 active:scale-95"
      onClick={toggleModal}
    />
  )
}

export default IconBtnInline
