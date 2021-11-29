import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Details from './Details'
import Home from './Home'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
      const myFunc = async () => {
        // console.log("fetching data")

        await fetch("https://merfry0309.ip6dns.xyz/api/proxy/covidindo/")
          .then(resp => {
            // console.log("data received, converting to json")

            return resp.json()
          })
          .then(json => {
            // console.log('data converted to json, preprocessing')

            const temp = json.data.map((el, idx) => ({index: idx, ...el}))

            json.data = temp
            setData(json)
          })
      }

      myFunc()
  }, [])

  return (
    <div style={{
      width: '100%', height: window.innerHeight 
    }}>
      {
        !data ? 
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Typography variant='h3' component='div'>
              Loading Data...   
            </Typography>
          </div>
          :
          <HashRouter>
            <Routes>
              <Route exact path='/' element={
                <Home apiData={data}/>
              }/>
              <Route exact path='/about' element={
                <About/>
              }/>
              <Route exact path='/details/:id' element={
                <Details/>
              }/>
            </Routes>
          </HashRouter>
    }
    </div>
  )
}

export default App
