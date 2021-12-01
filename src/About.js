import { Button, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from './bg.svg'
import shape1 from './shape1.svg'
import shape2 from './shape2.svg'

function About() {
    const navigate = useNavigate()
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [navMenuAnchor, setNavMenuAnchor] = useState(null) 

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover'
        }}>
            <Paper style={{
                margin: '1em 1em 0em 1em',
                height: '4em',
                width: '55em',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
                boxSizing: 'border-box'
            }}>
                <img style={{position: 'absolute', maxWidth: '15em', top: -45, left: -75}} src={shape1}/>
                <img style={{position: 'absolute', maxWidth: '75em', top: -400, right: -359}} src={shape2}/>
                <Typography variant='h3' style={{position: 'relative', marginLeft: '1em'}}>Covid-19 Level | <span style={{color: 'white'}}>Indo</span></Typography>
                <div style={{flexGrow: 1}}></div> 
                <Button style={{borderColor: 'white', color: 'white', marginRight: '2em'}} variant='outlined'
                        onClick={e => {
                            setNavMenuAnchor(e.currentTarget)
                            setIsNavMenuOpen(true)
                        }}
                >About</Button>
                <Menu
                    anchorEl={navMenuAnchor}
                    open={isNavMenuOpen}
                    onClose={() => {
                        setIsNavMenuOpen(false)
                        setNavMenuAnchor(null)
                    }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            filter: 'drop-shadow(0px 5px 25px rgba(0, 0, 0, 0.37))',
                        },
                    }}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
                    }}
                >
                    <MenuItem onClick={() => navigate('/')}>
                        Home
                    </MenuItem>
                    <MenuItem>
                        About
                    </MenuItem>
                </Menu> 
            </Paper>


            <Paper style={{
                margin: '1em 1em 1em 1em',
                width: '55em',
                display: 'flex',
                flexDirection: 'column',
                padding: '1em',
                boxSizing: 'border-box'
            }}>
                <Typography variant='h4' style={{alignSelf: 'center', marginTop: '0.5em'}}>
                    Covid-19 Level | Indo <br/> <br/>
                </Typography>
                <Typography>
                    Sumber informasi sederhana untuk mengetahui resiko penularan Covid-19 di daerah-daerah yang ada di Indonesia
                    <br/>
                    <br/>
                    Dibuat untuk memenuhi tugas Front-end Web Development - B
                    <br/>
                    Oleh : Timothy Merfry Tiwow
                    <br/>
                    NIM : 105021810004
                    <br/>
                    Program Studi : Informatika
                </Typography>
            </Paper>
        </div>
    )
}

export default About
