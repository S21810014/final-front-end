import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Details from './Details'
import Home from './Home'
import bg from './bg.svg'

function App() {
  const [data, setData] = useState(null)
  const [dataStatus, setDataStatus] = useState('')

  useEffect(() => {
      const myFunc = async () => {
        setDataStatus('Fetching data...')

        await fetch("https://merfry0309.ip6dns.xyz/api/proxy/covidindo/")
          .then(resp => {
            setDataStatus("Data Received, converting to JSON...")

            return resp.json()
          })
          .then(json => {
            setDataStatus('Data converted to JSON, preprocessing...')

            const temp = json.data.map((el, idx) => ({index: idx, ...el}))

            json.data = temp
            setTimeout(() => setData(json), 500)
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
            height: '100%',
            flexDirection: 'column',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover'
          }}>
            <Typography variant='h3' component='div' style={{color: 'white'}}>
              Loading Data...
            </Typography>
            <Typography style={{marginTop: '3em', color: 'white'}}>
              {dataStatus}
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
