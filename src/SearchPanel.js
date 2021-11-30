import { TextField } from '@mui/material'
import React, { useState } from 'react'

function SearchPanel({submitSearchHandler}) {
    const [searchBox, setSearchBox] = useState('')

    return (
        <TextField style={{
            margin: '1em 1em 0em 1em'
        }}  label="Cari data" variant="outlined" value={searchBox} onChange={e => setSearchBox(e.target.value)}
            onKeyDown={e => {
                if(e.key === 'Enter') {
                    submitSearchHandler(searchBox)
                }
            }}
        />
    )
}

export default SearchPanel
