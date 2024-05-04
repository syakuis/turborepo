import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {HeaderSecurityContextShare} from '@repo/layout';
import {PurchaseProvider} from '@repo/security';
import SecurityContextShare from './components/SecurityContextShare';

function App() {
  return (
    <PurchaseProvider>
      <HeaderSecurityContextShare />
      <SecurityContextShare />
    </PurchaseProvider>
  )
}

export default App
