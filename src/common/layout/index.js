import React from 'react'
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import { Box, styled } from '@mui/material';
// import BacktoTop from '../backtotop';

export default function Layout() {
 return (
  <LayoutContainer>
   <HeaderContainer>
    <Header />
   </HeaderContainer>
   <SidebarContainer >
    <Sidebar />
   </SidebarContainer>
  </LayoutContainer>
 )
}

const LayoutContainer = styled(Box)({
 minHeight: 'inherit',
 boxSizing: 'border-box',
 display: 'flex',
 flexDirection: 'column'
});
const HeaderContainer = styled(Box)({
 minHeight: '64px',
 flex: '0 0 64px'
})

const SidebarContainer = styled(Box)({
 flex: '1 1 100%',
 display: 'flex'
})