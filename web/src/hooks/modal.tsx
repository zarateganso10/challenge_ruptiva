import React, { createContext, useContext, useCallback, useState } from 'react'

import ModalContainer from '../components/ModalContainer'

interface ItenProps {
  id: string
  user_id: string
  name: string
  description: string
  created_at: Date
  updated_at: Date
  format_date: Date
}

interface ModalContextData {
  addModal(data: ItenProps): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export const ModalProvider: React.FC = ({ children }) => {
  const [iten, setIten] = useState<ItenProps>({} as ItenProps)
  const [show, setShow] = useState(false)

  const addModal = useCallback((itenData: ItenProps) => {
    setIten(itenData)
    setShow(true)
  }, [])

  return (
    <ModalContext.Provider value={{ addModal }}>
      {children}
      <ModalContainer iten={iten} show={show} onHide={() => setShow(false)} />
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ToastProvider')
  }

  return context
}
