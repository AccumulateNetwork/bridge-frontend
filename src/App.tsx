import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react"

import theme  from "./theme"
import { Navbar } from "./Navbar"
import Card from "./card"
const appName = "Accumulate Bridge"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <SimpleGrid minH="10vh" p={3} spacing="50px">
        <Navbar appName = { appName }/>   
        <VStack>
        <Card key="id"/>
        </VStack>
      </SimpleGrid>
    </Box>
  </ChakraProvider>
)
