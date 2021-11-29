import { Typography } from '@mui/material'
import React from 'react'

function About() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
        <Typography variant='h3' component='div'>
            About page
        </Typography>
        </div>
    )
}

export default About
