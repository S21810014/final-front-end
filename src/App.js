import React, { useState } from 'react'

function App() {
  const [data, setData] = useState("")

  useEffect(
    () => {
      fetch("http://merfry.unaux.com/api/forKelasFrontEnd")
        .then(resp => console.log(resp));
    }, 
  [])

  return (
    <div>
      testing
    </div>
  )
}

export default App
