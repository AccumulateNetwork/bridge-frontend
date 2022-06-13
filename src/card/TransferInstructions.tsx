import { ArrowBackIcon, CopyIcon } from "@chakra-ui/icons"
import { Box, Center, HStack, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Tooltip, VStack } from "@chakra-ui/react"
import { FC, useState } from "react"

import { CALCULATE_FEE_STEP } from "../store/actions"
import { useStore } from "../store/useStore"
import { config } from '../config/config'

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
  const { accSymbol, dispatch } = useStore()
  const accDepositAddress =  config.tokens.filter(token => token.accSymbol === accSymbol)[0].accDepositAddress
  return (
    <Box fontSize={16}>
      <HStack p={2} width="100%">
        <ArrowBackIcon mr="90px" onClick={()=> dispatch({type: CALCULATE_FEE_STEP})}/>
        <Center mb={5} fontSize={16}>
            Transfer Instructions
        </Center>
      </HStack>
      <Box pt = {5} pl={10} pr={10} pb={5}>
        <VStack>
        <Box>Send { accSymbol } to </Box>    
        <Box>
          [{accDepositAddress}] 
          <CopyPopover address={accDepositAddress}/>
        </Box>
        <Box>with <b>memo</b> </Box> 
        <Box>(txs without memo will be lost)</Box>
        </VStack>
         
      </Box>
    </Box>
  )
}
