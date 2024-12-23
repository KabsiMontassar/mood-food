import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ShoppingCartProvider } from './Context/ShoppingCartContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ShoppingCartProvider>
        <App />
      </ShoppingCartProvider>
    </ChakraProvider>
  </React.StrictMode>,
)