import {
  Box, 
  VStack,
  Heading,
  Divider,
  Button,
  Alert,
  Tooltip,
  Text
} from "@chakra-ui/react"

import { CopyIcon } from "@chakra-ui/icons"

import { FC, useState } from "react"

import { useNavigate } from "react-router-dom"

type Props =  {
  symbol: string
  transactionHash: string
}

type CopyTooltipProps = {
  content: string
}

export const CopyTooltip: FC<CopyTooltipProps> = (props) => {
  const [clicked, setClicked]= useState(false)
  const onClick = () => {
    setClicked(true)
    navigator.clipboard.writeText(props.content)
    setTimeout(() => { setClicked(false) }, 1000)  
  }
  return (
    <Tooltip label={clicked ? "Copied!" : "Copy"} placement="right">
      <CopyIcon ml={1} onClick={onClick}/>
    </Tooltip>
  )
}

export const ReleaseCompleted: FC<Props> = (props) => {
  const navigate = useNavigate()
  return (
    <Box fontSize={16}>
      <Box pt={5} pl={10} pr={10} pb={5}>
        <VStack>
          <Heading size='md'>Transaction Sent</Heading>
          <Divider pt={2} />
          <Box py={2}>
            Transaction hash:
          </Box>    
          <Alert status='warning' justifyContent='center' display='block'>
            <strong>{ props.transactionHash }</strong>
            <CopyTooltip content={ props.transactionHash }/>
          </Alert>
          <Box py={2}>
            <Text fontSize='sm'>
            When your tx is confirmed by the network, 
            Accumulate Bridge will catch it up and send <strong>{ props.symbol }</strong> to your address. 
            </Text>
          </Box>    
          <Box py={2}>
            <Text fontSize='sm'>
            This operation usually takes up to 5 minutes (after confirmation of your tx).
            </Text>
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