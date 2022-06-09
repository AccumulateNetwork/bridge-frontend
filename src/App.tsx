import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react"

import { ethers } from "ethers"
import theme  from "./theme"
import { Navbar } from "./Navbar"
import { Card } from "./card/Card"
import { Footer } from "./Footer"
import { Web3ReactProvider } from "@web3-react/core"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes, BrowserRouter as Router, Navigate} from "react-router-dom"
import { config } from "./config/config"
import { StoreProvider } from "./store/context"

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const App = () => (
  <Router>
    <StoreProvider>
      <ChakraProvider theme={theme}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Box textAlign="center" fontSize="xl">
              <SimpleGrid minH="10vh" p={3} spacing="50px" ml='auto' mr='auto' maxW='1280px'>
                <Navbar/> 
                <ToastContainer
                  style={{ width: "90%" }}
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={true}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />         
                <VStack mt={-1} pt={1} minH='calc(93vh - 107px)'>
                  <Routes>
                    <Route path="/" element={<Navigate to="mint"/>}/>
                    <Route path={ config.tab1Path } element={ <Card tabIndex={0}/>}/>
                    <Route path={ config.tab2Path } element={ <Card tabIndex={1}/>}/>
                    <Route
                      path="*"
                      element={
                        <div>
                          <h2>404 Page not found</h2>
                        </div>
                      }
                    />
                  </Routes>
                </VStack>
                <Footer/>
              </SimpleGrid>
            </Box>
          </Web3ReactProvider>
      </ChakraProvider>
    </StoreProvider>
  </Router>
)
