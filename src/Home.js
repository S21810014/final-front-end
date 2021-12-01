import { Menu, MenuItem, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchPanel from './SearchPanel'
import './styles.css'
import shape1 from './shape1.svg'
import shape2 from './shape2.svg'
import bg from './bg.svg'

const sortData = (array, sortByColumn, sortByOrder) => {
    // console.log(sortByOrder)

    const sortMapping = {
        'No.': 'index',
        'Kota': 'kota',
        'Provinsi': 'prov',
        'Tingkat': 'hasil'
    }

    const tingkatMapping = {
        'RESIKO TINGGI': 5,
        'RESIKO SEDANG': 4,
        'RESIKO RENDAH': 3,
        'TIDAK ADA KASUS': 2,
        'TIDAK TERDAMPAK': 1
    }

    const mappedSort = sortMapping[sortByColumn]
    const reverseSort = sortByOrder === 'desc' ? 1 : -1

    if(sortByColumn === 'Tingkat')
        array.sort((first, second) => {
            let f = tingkatMapping[first[mappedSort]]
            let s = tingkatMapping[second[mappedSort]]

            if(f > s) {
                return 1 * reverseSort
            } else {
                if(f === s) {
                    return 0
                } else {
                    return -1 * reverseSort
                }
            }
        })
    else
        array.sort((first, second) => {
            let f = first[mappedSort]
            let s = second[mappedSort]

            if(f > s) {
                return 1 * reverseSort
            } else {
                if(f === s) {
                    return 0
                } else {
                    return -1 * reverseSort
                }
            }
        })

    // console.log("done sorting...")

    return array
}

function Home({apiData}) {
    const [order, setOrder] = useState('desc')
    const [orderBy, setOrderBy] = useState('No.')
    const [filterBy, setFilterBy] = useState('')
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const [navMenuAnchor, setNavMenuAnchor] = useState(null)

    const navigate = useNavigate()

    const tableColumns = [
        ['No.', '1em'], 
        ['Kota', '1em'], 
        ['Provinsi'], 
        ['Tingkat']
    ]

    const levelColorMapping = {
        'TIDAK ADA KASUS': {
            textColor: 'white',
            backgroundColor: 'green'
        },
        'TIDAK TERDAMPAK': {
            textColor: 'white',
            backgroundColor: 'green'
        },
        'RESIKO RENDAH': {
            textColor: 'black',
            backgroundColor: 'cyan'
        },
        'RESIKO SEDANG': {
            textColor: 'black',
            backgroundColor: 'yellow'
        },
        'RESIKO TINGGI': {
            textColor: 'white',
            backgroundColor: 'red'
        },
    }

    const submitSearchHandler = (queryString) => {
        setFilterBy(queryString)
    }

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
                >Home</Button>
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
                    <MenuItem>
                        Home
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/about')}>
                        About
                    </MenuItem>
                </Menu>
            </Paper>


            <Paper style={{
                margin: '1em 1em 1em 1em',
                width: '55em',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                position: 'relative',
            }}>
                <Typography style={{margin: '1em 1em 0em 1em'}}>Data per tanggal {apiData.tanggal}. Klik baris dari tabel untuk melihat detail lebih lanjut.</Typography>
                <SearchPanel submitSearchHandler={submitSearchHandler}/> 
                <div style={{
                    margin: '1em 1em 1em 1em',
                }}>
                    <TableContainer sx={{maxHeight: '25em', boxSizing: 'border-box'}} component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        tableColumns.map((el, idx) =>
                                        <TableCell key={idx} sx={{width: el.length > 1 ? el[1] : null}}>
                                            <TableSortLabel
                                                active={orderBy === el[0]}
                                                direction={orderBy === el[0] ? order : 'asc'}
                                                onClick={() => {
                                                    setOrder(order === 'asc' ? 'desc' : 'asc')
                                                    setOrderBy(el[0])
                                                }}
                                            >
                                                {el[0]}
                                            </TableSortLabel>
                                        </TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    sortData(apiData.data, orderBy, order).filter(el => {
                                        if(filterBy.length > 0) {
                                            return el.kota.toLowerCase().includes(filterBy.toLowerCase())
                                             || el.prov.toLowerCase().includes(filterBy.toLowerCase())
                                             || el.hasil.toLowerCase().includes(filterBy.toLowerCase())
                                        } else {
                                            return true
                                        }
                                    }).map((el, idx) => 
                                        <TableRow className='tableRow' key={idx} onClick={() => navigate(`/details/${el.prov.split(' ').join('_')}`)}>
                                            <TableCell>{el.index + 1}</TableCell>
                                            <TableCell>{el.kota}</TableCell>
                                            <TableCell>{el.prov}</TableCell>
                                            <TableCell>
                                                <Typography style={{
                                                    backgroundColor: levelColorMapping[el.hasil].backgroundColor,
                                                    color: levelColorMapping[el.hasil].textColor,
                                                    borderRadius: '3em',
                                                    padding: '0.25em',
                                                    textAlign: 'center'
                                                }}>
                                                    {el.hasil}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Paper>
        </div>
    )
}

export default Home
