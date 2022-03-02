import React from 'react'
import { SocketProvider } from './context/SocketContext'
import HomePage from './HomPage'

export const BandNamesApp = () => {
  return (
    <SocketProvider>
        <HomePage />
    </SocketProvider>
  )
}
