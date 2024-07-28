import { Card, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashBoardInfo, setIsLoading } from '../../redux/slice/auth'
import Loader from '../../common/loader'

export default function Dashboard() {
  const dispatch = useDispatch()
  let color = {
    1: "linear-gradient(to left, #48d6a8 0%, #029666 100%)",
    2: "linear-gradient(to left, rgba(1, 98, 232, 0.5) 0%,#0162e8 100%)",
    3: "linear-gradient(to left, #c1872f,#e8a136)",
    4: "linear-gradient(to left, #f93a5a, #f7778c)",
    5: "linear-gradient(to left, #efa65f, #f76a2d)"
  }
  const dashboardData = useSelector(state => state.auth.dashboardInfo)
  const isLoading = useSelector(state => state.auth.isLoading)

  useEffect(() => {
    dispatch(setIsLoading())
    dispatch(DashBoardInfo())
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Dashboard Information</Typography>
      </Grid>
      {isLoading ?
        <Grid item xs={12}>
          <Loader />
        </Grid>
        :
        dashboardData && dashboardData.length > 0 && dashboardData.map((item, index) => {
          let currentno = index + 1
          let randomNumber;
          if (currentno > 5) {
            randomNumber = currentno % 5;
          } else {
            randomNumber = currentno;
          }
          return (
            <Grid key={index} item xs={4}>
              <Card sx={{
                backgroundImage: color[randomNumber], width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 15px'
              }}>
                <Typography component='div' variant='h2' sx={{ color: "#FFFFFF" }}>{item.value}</Typography>
                <Typography omponent='div' variant='body1' sx={{ color: "#FFFFFF", textAlign: 'center' }}>{item.cardName}</Typography>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}
