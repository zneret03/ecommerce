import React from "react"
import { Modal } from "@mui/material"
import { X } from "react-feather"

export default function MyModal({ toggle, isToggle, children }) {
  return (
    <Modal
      open={toggle}
      onClose={isToggle}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="h-screen flex">
        <div className="relative m-auto bg-white max-w-xl w-1/2 h-64 rounded-lg">
          <button
            type="button"
            onClick={isToggle}
            className="absolute right-5 top-5"
          >
            <X className="text-gray-400" />
          </button>
          <div className="p-8">
            <header>
              <h1 className="font-bold text-2xl">Create category</h1>
              <p className="text-gray-400">
                creating new category in every product
              </p>
            </header>
            <aside className="my-4">{children}</aside>
          </div>
        </div>
      </div>
    </Modal>
  )
}
