import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme="dark">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default App