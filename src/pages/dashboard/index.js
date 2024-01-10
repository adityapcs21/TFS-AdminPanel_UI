import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react'
import ReactApexChart from 'react-apexcharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const oprderSeries = [
 {
  data: [5, 9, 5, 6, 4, 12, 18, 14, 10, 15, 12, 5, 8, 5, 12, 5, 12, 10, 16, 12]
 }
];

const orderOptions = {
 chart: {
  type: 'area',
  height: 30,
  sparkline: {
   enabled: true
  },
 },
 dataLabels: {
  enabled: false
 },
 stroke: {
  curve: 'straight',
  width: 2
 },
 tooltip: {
  enabled: false,
 },
 fill: {
  opacity: 0.3
 },
 xaxis: {
  crosshairs: {
   width: 1
  },
 },
 yaxis: {
  min: 0
 },
 colors: ['#DCE6EC'],
};


export function Order() {
 return (
  <div id="chart">
   <ReactApexChart options={orderOptions} className="pt-1" series={oprderSeries} type="area" height={25} />
  </div>
 )
};

// danger 

const earningSeries = [
 {
  data: [3, 2, 4, 6, 12, 14, 8, 7, 14, 16, 12, 7, 8, 4, 3, 2, 2, 5, 6, 7]
 }
];

const earningOptions = {
 chart: {
  type: 'area',
  height: 30,
  sparkline: {
   enabled: true
  },
 },
 dataLabels: {
  enabled: false
 },
 stroke: {
  curve: 'smooth',
  width: 2
 },
 tooltip: {
  enabled: false,
 },
 fill: {
  opacity: 0.3
 },
 xaxis: {
  crosshairs: {
   width: 1
  },
 },
 yaxis: {
  min: 0
 },
 colors: ['#DCE6EC'],
};


export function DangerEarnings() {
 return (
  <div id="chart">
   <ReactApexChart options={earningOptions} className="pt-1" series={earningSeries} type="area" height={25} />
  </div>
 )
};

const earningsSeries = [
 {
  data: [5, 10, 5, 20, 22, 12, 15, 18, 20, 15, 8, 12, 22, 5, 10, 12, 22, 15, 16, 10]
 }
];

const earningsOptions = {
 chart: {
  type: 'area',
  height: 30,
  sparkline: {
   enabled: true
  },
 },
 dataLabels: {
  enabled: false
 },
 stroke: {
  curve: 'straight',
  width: 2
 },
 tooltip: {
  enabled: false,
 },
 fill: {
  opacity: 0.3
 },
 xaxis: {
  crosshairs: {
   width: 1
  },
 },
 yaxis: {
  min: 0
 },
 colors: ['#DCE6EC'],
};


export function SuccessEarning() {
 return (
  <div id="chart">
   <ReactApexChart options={earningsOptions} className="pt-1" series={earningsSeries} type="area" height={25} />
  </div>
 )
};

// PRODUCT SOLD

const soldSeries = [
 {
  data: [5, 9, 5, 6, 4, 12, 18, 14, 10, 15, 12, 5, 8, 5, 12, 5, 12, 10, 16, 12]
 }
];

const soldOptions = {
 chart: {
  type: 'area',
  height: 30,
  sparkline: {
   enabled: true
  },
 },
 dataLabels: {
  enabled: false
 },
 stroke: {
  curve: 'straight',
  width: 2
 },
 tooltip: {
  enabled: false,
 },
 fill: {
  opacity: 0.3
 },
 xaxis: {
  crosshairs: {
   width: 1
  },
 },
 yaxis: {
  min: 0
 },
 colors: ['#DCE6EC'],
};


export function Sold() {
 return (
  <div id="chart">
   <ReactApexChart options={soldOptions} className="pt-1" series={soldSeries} type="area" height={25} />
  </div>
 )
};


export default function Dashboard() {
 return (
  <Grid container spacing={2}>
   <Grid item xs={12} sm={6} lg={3}>
    <Card sx={{ color: '#FFFFFF', backgroundImage: "linear-gradient(to left, rgba(1, 98, 232, 0.5) 0%,#0162e8 100%) !important" }}>
     <Box sx={{ padding: '12px' }}>
      <Typography variant='h6' sx={{ fontSize: '12px' }}>TODAY ORDERS</Typography>
      <Box sx={{ paddingTop: '6px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
       <Box>
        <Typography sx={{ fontSize: '20px', padding: '6px 0px', fontWeight: '600' }} variant='h4'>$5,74.12</Typography>
        <Typography sx={{ fontSize: '12px', opacity: '0.7' }} >Compared to last</Typography>
       </Box>
       <Box display="flex" alignItems="center" gap="5px">
        <Box sx={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', background: '#FFFFFF' }}>
         <ArrowUpwardIcon sx={{ fontSize: '12px', color: 'rgba(1, 98, 232, 0.5)', fontWeight: '500' }} />
        </Box>
        <Typography sx={{ opacity: '0.7' }}>+472</Typography>
       </Box>
      </Box>
     </Box>
     <Order />
    </Card>
   </Grid>

   <Grid item xs={12} sm={6} lg={3}>
    <Card sx={{ color: '#FFFFFF', backgroundImage: "linear-gradient(to left, #48d6a8 0%, #029666 100%)" }}>
     <Box sx={{ padding: '12px' }}>
      <Typography variant='h6' sx={{ fontSize: '12px' }}>TOTAL EARNINGS</Typography>
      <Box sx={{ paddingTop: '6px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
       <Box>
        <Typography sx={{ fontSize: '20px', padding: '6px 0px', fontWeight: '600' }} variant='h4'>$5,74.12</Typography>
        <Typography sx={{ fontSize: '12px', opacity: '0.7' }} >Compared to last</Typography>
       </Box>
       <Box display="flex" alignItems="center" gap="5px">
        <Box sx={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', background: '#FFFFFF' }}>
         <ArrowUpwardIcon sx={{ fontSize: '12px', color: '#029666', fontWeight: '500' }} />
        </Box>
        <Typography sx={{ opacity: '0.7' }}>52.09%</Typography>
       </Box>
      </Box>
     </Box>
     <SuccessEarning />
    </Card>
   </Grid>

   <Grid item xs={12} sm={6} lg={3}>
    <Card sx={{ color: '#FFFFFF', backgroundImage: "linear-gradient(45deg, #f93a5a, #f7778c)" }}>
     <Box sx={{ padding: '12px' }}>
      <Typography variant='h6' sx={{ fontSize: '12px' }}>TODAY EARNINGS</Typography>
      <Box sx={{ paddingTop: '6px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
       <Box>
        <Typography sx={{ fontSize: '20px', padding: '6px 0px', fontWeight: '600' }} variant='h4'>$1,230.17</Typography>
        <Typography sx={{ fontSize: '12px', opacity: '0.7' }} >Compared to last</Typography>
       </Box>
       <Box display="flex" alignItems="center" gap="5px">
        <Box sx={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', background: '#FFFFFF' }}>
         <ArrowUpwardIcon sx={{ transform: 'rotate(180deg)', fontSize: '12px', color: '#f7778c', fontWeight: '500' }} />
        </Box>
        <Typography variant='body2' sx={{ opacity: '0.7' }}>+472</Typography>
       </Box>
      </Box>
     </Box>
     <Order />
    </Card>
   </Grid>

   <Grid item xs={12} sm={6} lg={3}>
    <Card sx={{ color: '#FFFFFF', backgroundImage: "linear-gradient(to left, #efa65f, #f76a2d)" }}>
     <Box sx={{ padding: '12px' }}>
      <Typography variant='h6' sx={{ fontSize: '12px' }}>PRODUCT SOLD</Typography>
      <Box sx={{ paddingTop: '6px', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
       <Box>
        <Typography sx={{ fontSize: '20px', padding: '6px 0px', fontWeight: '600' }} variant='h4'> -152.3</Typography>
        <Typography sx={{ fontSize: '12px', opacity: '0.7' }} >Compared to last</Typography>
       </Box>
       <Box display="flex" alignItems="center" gap="5px">
        <Box sx={{ width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', background: '#FFFFFF' }}>
         <ArrowUpwardIcon sx={{ fontSize: '12px', color: '#efa65f', fontWeight: '500' }} />
        </Box>
        <Typography sx={{ opacity: '0.7' }}>+472</Typography>
       </Box>
      </Box>
     </Box>
     <Sold />
    </Card>
   </Grid>
  </Grid >
 )
}
