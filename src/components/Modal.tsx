import genIcon from "data-base64:assets/gen.png"
import insertIcon from "data-base64:assets/insert.svg"
import regenIcon from "data-base64:assets/regen.png"
import { useRef, useState } from "react"

const Modal = ({ closeModal }) => {
  const [prompt, setPrompt] = useState("")
  const [chat, setChat] = useState([])
  const ref = useRef(null)
  const inputRef = useRef(null)

  const generate = () => {
    if (!prompt || chat.length > 0) return

    setChat([
      ...chat,
      prompt,
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    ])
    setPrompt("")
    setTimeout(() => {
      ref.current.scrollTop = ref.current.scrollHeight
    }, 0)
  }

  const insertResult = () => {
    const input = document.querySelector<HTMLElement>("div[role='textbox'] > p")
    if (input) {
      input.textContent = chat[chat.length - 1]

      const inputEvent = new Event("input", {
        bubbles: true
      })
      input.dispatchEvent(inputEvent)

      const textBox = document.querySelector<HTMLElement>("div[role='textbox']")
      textBox.focus()
    }
    closeModal()
  }

  return (
    <div className="shadow-lg bg-white p-4 rounded-lg w-4/12 flex flex-col text-xl">
      {/* rendering the chat messages here */}
      <div className="flex flex-col gap-3 max-h-96 overflow-auto" ref={ref}>
        {chat?.map((msg, idx) => (
          <div
            key={idx}
            className={`${idx % 2 === 0 ? "bg-[#DFE1E7] self-end" : "bg-[#DBEAFE] self-start"} p-4 rounded-lg w-8/12`}>
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border border-gray-300 w-full p-2 mt-2 rounded-md transition-all"
        placeholder="Your prompt"
        value={prompt}
        ref={inputRef}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end p-2 gap-2">
        {chat?.length > 0 && chat?.length % 2 == 0 && (
          <button
            className="flex items-center gap-2 bg-transparent text-[#666D80] border border-[#666D80] px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all"
            onClick={insertResult}>
            <img src={insertIcon} className="size-5" alt="Insert" />
            Insert
          </button>
        )}
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all"
          onClick={generate}>
          <img
            src={chat?.length > 0 ? regenIcon : genIcon}
            className="size-5"
            alt="Insert"
          />
          {chat?.length > 0 ? "Regenerate" : "Generate"}
        </button>
      </div>
    </div>
  )
}

export default Modal
