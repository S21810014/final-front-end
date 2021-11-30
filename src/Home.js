import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useState } from 'react'

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

    const tableColumns = [
        ['No.', '1em'], 
        ['Kota', '1em'], 
        ['Provinsi'], 
        ['Tingkat']
    ]

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column'
        }}>
            <Paper style={{
                margin: '1em 1em 1em 1em',
            }}>
                <Typography>Content</Typography>
            </Paper>


            <Paper style={{
                margin: '1em 1em 1em 1em',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography>testing</Typography>
                <div style={{
                    margin: '1em 1em 1em 1em',
                }}>
                    <TableContainer sx={{maxHeight: '25em'}} component={Paper}>
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
                                    sortData(apiData.data, orderBy, order).map((el, idx) => 
                                        <TableRow key={idx}>
                                            <TableCell>{el.index + 1}</TableCell>
                                            <TableCell>{el.kota}</TableCell>
                                            <TableCell>{el.prov}</TableCell>
                                            <TableCell>{el.hasil}</TableCell>
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
