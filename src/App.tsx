import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react"
import { Navbar } from "./Navbar"
const appName = "Bridge"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Navbar appName = { appName }/>
        <VStack spacing={10}>
        <Box padding='4' bg='blue.400' color='black' maxW='md'>
          Select an asset and description chain, to begin or resume a mint
        </Box>
        <Box padding='4' bg='blue.400' color='black' maxW='md'>
           Send select 
           Destination select
        </Box>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
