import { Box, Select, useDisclosure, VStack, FormControl, FormLabel, Alert, AlertIcon, Input, HStack, Flex, Spacer, Divider } from "@chakra-ui/react"
import { FC, useState } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { SET_ACC_SYMBOL, SET_MINT_AMOUNT_AND_RECEIVED, TRANSFER_INSTRUCTIONS_STEP } from "../store/actions"
import { useStore } from "../store/useStore"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"
import BigNumber from "bignumber.js"

type Props = {
}

// select options group
const mintOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  mintOptions.push(<CardSelectItem key= {value.accSymbol} symbol={value.accSymbol}/>)
})

export const MintTab: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mintAmount, mintReceived, dispatch, fees } = useStore()

  const mintFeeBps = fees.mintFee
  const mintFeePercentage = mintFeeBps / 100
  
  const { 
    active, 
  } = useWeb3React()

  const handleAmountChange = (event: any) => {
    const inputValue = event.target.value
     if (isNaN(Number(inputValue))) {
       return
     }
     calcReceived(inputValue)
  }

  const calcReceived = (inputValue: any) => {
    const value = new BigNumber(inputValue)
    const mintFee = value.div(100).multipliedBy(mintFeePercentage)
    const result = value.minus(mintFee)
   if (result.isGreaterThan(0)) {
    dispatch({type: SET_MINT_AMOUNT_AND_RECEIVED, payload: {
      "mintAmount": inputValue, "mintReceived": result.toNumber()}})
  } else {
    dispatch({type: SET_MINT_AMOUNT_AND_RECEIVED, payload: {
      "mintAmount": inputValue, "mintReceived": 0}})
   }
  }
  return (
    <Box>
      <Box padding='6' pt={4}>
        <Alert status='info' fontSize='sm' textAlign='left'>
          <AlertIcon />
          Select an asset and destination chain, to begin a mint
        </Alert>
      </Box>
      <Box padding='6' pt={2} pb={0}>
        <VStack borderRadius='15px'>
          <FormControl pb={3}>
            <FormLabel htmlFor='token'>Token</FormLabel>
            <Select id='token' fontSize={14} borderRadius='15px' size='lg' onChange={(v) => {
              dispatch({type: SET_ACC_SYMBOL, payload: v.target.value})
            }}>
              {mintOptions}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='destination'>Destination</FormLabel>
            <Select id='destination' fontSize={14} borderRadius='15px' size='lg'>
              <option value='eth'>Ethereum</option>
            </Select>
          </FormControl>
          <FormControl pb={3}>
          <FormLabel htmlFor='amount'>Amount</FormLabel>
          <Input 
            placeholder="Amount"  borderRadius='15px' 
            fontSize='12px'
            size='lg'
            id='amount'
            onChange={handleAmountChange}
            value={ mintAmount }/>
          </FormControl>
          <FormControl pb={3}>
            <FormLabel htmlFor='received'>Received</FormLabel>
            <Input 
              placeholder="Received"  borderRadius='15px' readOnly
              fontSize='12px'
              size='lg'
              id='received'
              value={ mintReceived }/>
          </FormControl>
        </VStack>
        </Box>
        <Box padding='6'>
        <Divider mb={6} />
        <HStack spacing='24px' pb={2}>
          <Box fontSize= {14}>
            Details
          </Box>
        </HStack>
        <Flex fontSize={14} color={"gray.500"}>
          <Box>
            Mint fee
            </Box>
            <Spacer />
            {fees.received ?
            (
              <Box >
                {mintFeePercentage} % 
              </Box>
            ) :
            (
              <Box w={40}>
                { config.messages.feesNotReceived }
              </Box>
            )
            }  
        </Flex>
          {active ? (
              <CardButton title="Next" onClick={() =>dispatch({type: TRANSFER_INSTRUCTIONS_STEP})}/>
            ) : (
              <CardButton title="Connect wallet" onClick={onOpen}/>
            )
           }
        </Box> 
        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </Box>  
  )
}
