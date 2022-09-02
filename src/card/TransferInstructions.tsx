import { CopyIcon, WarningTwoIcon } from "@chakra-ui/icons"
import {
  Box, 
  VStack,
  Heading,
  Divider,
  Alert,
  Tooltip,
  Text,
  Button
} from "@chakra-ui/react"

import { FC, useEffect, useState } from "react"

import { INITIAL_WITH_DATA } from "../store/actions"
import { useStore } from "../store/useStore"
import { config } from "../config/config"

type Props =  {
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
export const TransferInstructions: FC<Props> = (props) => {

  const { accSymbol, mintDestinationAddress, tokens, dispatch, mintAmount, tokensChainId } = useStore()
  const [ tokenAccount, setTokenAccount ] = useState("")

  const generateTokenAccount = (chainId: number, symbol: string) => {
    return "acc://" + config.bridgeADI + "/" + chainId + "-" + symbol
  }

  useEffect(() => {
    if (tokensChainId && tokens.length) {
      setTokenAccount(generateTokenAccount(tokensChainId, accSymbol))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box fontSize={16}>
      <Box pt={5} pl={10} pr={10} pb={5}>
        <VStack>
          <Heading size='md'>Mint Instructions</Heading>
          <Divider pt={2} />
          <Box py={2}>Send <strong>{ mintAmount } { accSymbol }</strong><br />to the bridge token account:</Box>    
          <Alert status='warning' justifyContent='center' display='block'>
            <strong>{ tokenAccount }</strong>
            <CopyTooltip content={ tokenAccount }/>
          </Alert>
          <Box py={2}><Text color='red'><WarningTwoIcon mr={1} mb={1} />Do not forget to inlcude <b>memo</b><br />(txs without memo will be lost)</Text></Box>
          <Alert status='warning' justifyContent='center' display='block'>
            <strong>{ mintDestinationAddress }</strong>
            <CopyTooltip content={ mintDestinationAddress }/>
          </Alert>
          <Divider pt={4} />
          <Box py={2}>
            <Button size='lg' colorScheme='messenger' onClick={()=> dispatch({type: INITIAL_WITH_DATA})}>Back to Mint Form</Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}