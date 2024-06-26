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

    // clicked anywhere outside the input
    const handleClick = () => {
      setFocused(input.contains(document.activeElement))
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const toggleModal = () => {
    store.dispatch(modalToggle())
  }

  if (!focused) return null

  return (
    <img
      src={editIcon}
      alt="Generate Icon"
      className="absolute right-2 bottom-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
      onClick={toggleModal}
    />
  )
}

export default IconBtnInline
