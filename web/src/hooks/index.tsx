import React from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from './toast'
import { ModalProvider } from './modal'

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  </AuthProvider>
)

export default AppProvider
