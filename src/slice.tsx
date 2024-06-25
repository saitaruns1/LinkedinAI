import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "modalToggle",
  initialState: {
    modal: false
  },
  reducers: {
    modalToggle: (state) => {
      state.modal = !state.modal
    }
  }
})

export const { modalToggle } = counterSlice.actions
export default counterSlice.reducer
