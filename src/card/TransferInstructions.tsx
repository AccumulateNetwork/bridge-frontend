import { ArrowBackIcon, CopyIcon } from "@chakra-ui/icons"
import {
  Box, 
  Center, 
  HStack, 
  Popover, 
  PopoverContent, 
  PopoverTrigger, 
  Portal, 
  VStack 
} from "@chakra-ui/react"

import { FC, useEffect, useState } from "react"

import { INITIAL_WITH_DATA } from "../store/actions"
import { useStore } from "../store/useStore"
import { useWeb3React } from "@web3-react/core"
import { truncateAddress } from "../utils"

type Props =  {
}

type CopyPopoverProps = {
  address: string
}

export const CopyPopover: FC<CopyPopoverProps> = (props) => {
  const [open, setOpen]= useState(false)
  const onOpen = () => {
    setOpen(true)
    navigator.clipboard.writeText(props.address)
    setTimeout(() => { setOpen(false)}, 400)  
  }
  return (
    <Popover placement='right-start' onOpen={onOpen} isOpen = {open}>
      <PopoverTrigger>
      <CopyIcon ml={1}/>
      </PopoverTrigger>
      <Portal>
        <PopoverContent maxWidth={14}>
          Copied
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
export const TransferInstructions: FC<Props> = (props) => {
  const { 
    account, 
    chainId
  } = useWeb3React()

  const { accSymbol, tokens, dispatch } = useStore()

  const [url, setUrl] = useState("")

  useEffect(() => {
    if (tokens.length) {
      const url =  tokens.find(token => token.symbol === accSymbol)!.url
      setUrl(url)
    }
  }, [account, chainId, accSymbol, tokens])
  return (
    <Box fontSize={16}>
      <HStack p={2} width="100%">
        <ArrowBackIcon mr="90px" onClick={()=> dispatch({type: INITIAL_WITH_DATA})}/>
        <Center mb={5}>
            Transfer Instructions
        </Center>
      </HStack>
      <Box pt = {5} pl={10} pr={10} pb={5}>
        <VStack>
          <Box>Send { accSymbol } to </Box>    
          <Box>
            {url}
            <CopyPopover address={url}/>
          </Box>
          <Box>with <b>memo</b> </Box> 
          <Box> 
            { truncateAddress(account) } 
            {
              account ? (
                <CopyPopover address={account}/>
              ) : 
              null
            }
          </Box>
          <Box>(txs without memo will be lost)</Box>
        </VStack>
      </Box>
    </Box>
  )
}
