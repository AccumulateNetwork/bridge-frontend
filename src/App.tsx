import {
  ChakraProvider,
  Box,
  SimpleGrid,
} from "@chakra-ui/react"

import { ethers } from "ethers"
import theme  from "./theme"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { Web3ReactProvider } from "@web3-react/core"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from "react-router-dom"
import { StoreProvider } from "./store/context"
import { Main }  from "./Main"

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const App = () => {
  return (
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
                  <Main/> 
                  <Footer/>
                </SimpleGrid>
              </Box>
            </Web3ReactProvider>
        </ChakraProvider>
      </StoreProvider>
    </Router>
  )
}
