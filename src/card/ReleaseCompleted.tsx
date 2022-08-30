import {
  Box, 
  VStack,
  Heading,
  Divider,
  Button
} from "@chakra-ui/react"

import { FC } from "react"

import { useNavigate } from "react-router-dom"

type Props =  {
  symbol: string
  transactionHash: string
}

export const ReleaseCompleted: FC<Props> = (props) => {
  const navigate = useNavigate()
  return (
    <Box fontSize={16}>
      <Box pt={5} pl={10} pr={10} pb={5}>
        <VStack>
          <Heading size='md'>Burn TX Created</Heading>
          <Divider pt={2} /> 
          <Box py={2}>
            When your tx with hash <Heading size="sm"> { props.transactionHash }</Heading> is confirmed by the network, 
            Accumulate Bridge nodes will catch it up and send { props.symbol } to your address. 
            This operation usually takes up to 5 minutes.
          </Box>    
          <Divider pt={4} />
          <Box py={2}>
            <Button size='lg' colorScheme='messenger' onClick={()=> navigate("/release")}>Back</Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}