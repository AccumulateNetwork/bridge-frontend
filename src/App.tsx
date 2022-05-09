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
import { Card } from "./Card"
import { Footer } from "./Footer"
import { Web3ReactProvider } from "@web3-react/core"

import { config }  from './config/config';

const appName = "Accumulate Bridge"


const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export const App = () => (
  <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Box>{config.ethNetworks[0].bridgeContract}</Box>
        <Box textAlign="center" fontSize="xl">
        <SimpleGrid minH="10vh" p={3} spacing="50px" ml='auto' mr='auto' maxW='1280px'>
          <Navbar appName = { appName }/>   
          <VStack mt={-1} pt={1} minH='calc(93vh - 107px)'>
          <Card/>
          </VStack>
          <Footer/>
        </SimpleGrid>
      </Box>
      </Web3ReactProvider>
  </ChakraProvider>
)
