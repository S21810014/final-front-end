import { Button, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { useNavigate, useParams } from 'react-router-dom'
import AnimatedNumber from 'animated-number-react'

ChartJS.register(ArcElement, Legend, Tooltip, CategoryScale, LinearScale, BarElement, Title)

function Details() {
    const [apiData, setApiData] = useState(null)
    const param = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://merfry0309.ip6dns.xyz/api/proxy/covidindo2")
            .then(resp => resp.json())
            .then(data => {
                setApiData(data)
            })
    }, [])

    const provinceName = param.id.split('_').map(el => el.split('').map((e, idx) => idx > 0 ? e.toLowerCase() : e).join('')).join(' ')
    const provinceData = !apiData ? null : apiData.list_data.find(el => el.key === param.id.split('_').join(' '))
    console.log(provinceData)

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
        }}>
            {
                !apiData ? 
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <Typography variant='h3' component='div'>
                            Fetching details for {provinceName}...
                        </Typography>
                    </div>
                    :
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <Paper style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '1em',
                            padding: '0.5em'
                        }}>
                            <Button variant='contained' onClick={() => navigate('/')}>Back to Home</Button>
                            <div style={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="h5">
                                    Details for {provinceName}
                                </Typography>
                            </div>
                        </Paper>

                        <Paper style={{
                            margin: '1em',
                            padding: '0.5em'
                        }}>
                            <div style={{
                                display: 'flex',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <Typography>Jenis Kelamin</Typography>
                                    <Pie data={{
                                        labels: ["Laki-Laki", "Perempuan"],
                                        datasets: [{
                                            data: [provinceData.jenis_kelamin[0].doc_count, provinceData.jenis_kelamin[1].doc_count],
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(153, 102, 255, 1)',
                                            ],
                                            borderWidth: 1,
                                        }]
                                    }}/>
                                    <div style={{display: 'flex', flexGrow: 1}}>
                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '0.25em', marginRight: '0.25em'}}>
                                            <Typography><AnimatedNumber value={provinceData.jumlah_kasus} duration={1000} formatValue={val => Number(val).toFixed(0)}/></Typography>
                                            <Typography variant='caption'>Jumlah Kasus</Typography>
                                        </div>

                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '0.25em', marginRight: '0.25em'}}>
                                            <Typography><AnimatedNumber value={provinceData.jumlah_meninggal} duration={1000} formatValue={val => Number(val).toFixed(0)}/></Typography>
                                            <Typography variant='caption'>Jumlah Meninggal</Typography>
                                        </div>

                                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '0.25em', marginRight: '0.25em'}}>
                                            <Typography><AnimatedNumber value={provinceData.jumlah_sembuh} duration={1000} formatValue={val => Number(val).toFixed(0)}/></Typography>
                                            <Typography variant='caption'>Jumlah Sembuh</Typography>
                                        </div>
                                    </div>
                                </div>

                                <div style={{display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography>Berdasarkan Umur</Typography>
                                    <Bar options={{aspectRatio: 1.1}} data={{
                                        labels: provinceData.kelompok_umur.map(el => el.key),
                                        datasets: [
                                            {
                                                label: 'Pasien',
                                                data: provinceData.kelompok_umur.map(el => el.doc_count),
                                                backgroundColor: 'rgba(53, 162, 235, 0.5)'
                                            }
                                        ]
                                    }}/>
                                </div>
                            </div> 
                        </Paper>
                    </div>
            } 
        </div>
    )
}

export default Details
