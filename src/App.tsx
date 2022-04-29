import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react"

import theme  from "./theme"
import { Navbar } from "./Navbar"
import { Card } from "./Card"
import { Footer } from "./Footer"
const appName = "Accumulate Bridge"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <SimpleGrid minH="10vh" p={3} spacing="50px" ml='auto' mr='auto' maxW='1280px'>
        <Navbar appName = { appName }/>   
        <VStack mt={-1} pt={1} minH='calc(93vh - 107px)'>
        <Card/>
        </VStack>
        <Footer/>
      </SimpleGrid>
     
    </Box>
   
  </ChakraProvider>
)
