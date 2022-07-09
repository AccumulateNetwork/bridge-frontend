import { Box, Select, useDisclosure, VStack, FormControl, FormLabel, Alert, AlertIcon, Input, HStack, Flex, Spacer, Divider, InputGroup, InputRightAddon, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { CardSelectItem } from "./CardSelectItem"
import { SET_ACC_SYMBOL, SET_MINT_AMOUNT_AND_RECEIVED, TRANSFER_INSTRUCTIONS_STEP, UPDATE_MINT_DESTINATION_ADDRESS } from "../store/actions"
import { useStore } from "../store/useStore"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"
import BigNumber from "bignumber.js"
import { Token } from "../common/Token"
import { formAddress, validETHAddress } from "../utils"

type Props = {
}

export const MintTab: FC<Props> = (props) => {

  const { 
    account,
    active,
    chainId
  } = useWeb3React()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [destinationAddressError, setDestinationAddressError] = useState(false)

  const { 
    accSymbol, evmSymbol, 
    mintAmount, mintReceived, 
    mintDestinationAddress,
    fees, tokens, 
    evmMintTxCost, dispatch } = useStore()

  const mintFeeBps = fees.mintFee
  const mintFeePercentage = mintFeeBps / 100

  // select options group
  const options: JSX.Element[] = []
  tokens.forEach((value:Token)=> {
    options.push(<CardSelectItem key= {value.symbol} symbol={value.symbol}/>)
  })
  
  const handleAmountChange = (event: any) => {
    const inputValue = event.target.value
     if (isNaN(Number(inputValue))) {
       return
     }
     calcReceived(inputValue)
  }

  const handleDestinationAddressChange = (event: any) => {
    const address = event.target.value
    setDestinationAddress(address)
  }

  const setDestinationAddress = (address: string) => {
    if (validETHAddress(address)) {
      setDestinationAddressError(false)
    } else {
      setDestinationAddressError(true)
    }
    dispatch({type: UPDATE_MINT_DESTINATION_ADDRESS, payload: address})
  }

  const calcReceived = (inputValue: any) => {
    const value = new BigNumber(inputValue)
    const mintFee = value.div(100).multipliedBy(mintFeePercentage)
    const result = value.minus(mintFee).minus(evmMintTxCost)
   if (result.isGreaterThan(0)) {
    dispatch({type: SET_MINT_AMOUNT_AND_RECEIVED, payload: {
      "mintAmount": inputValue, "mintReceived": result.toNumber()}})
  } else {
    dispatch({type: SET_MINT_AMOUNT_AND_RECEIVED, payload: {
      "mintAmount": inputValue, "mintReceived": 0}})
   }
  }

  useEffect(() => {
    if (account && tokens.length && !mintDestinationAddress) {
      setDestinationAddress(formAddress(account))
    }
    }, [chainId, account, tokens]);// eslint-disable-line react-hooks/exhaustive-deps


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
            <Select value={accSymbol} id='token' fontSize={14} borderRadius='15px' size='lg' onChange={(v) => {
              dispatch({type: SET_ACC_SYMBOL, payload: v.target.value})
            }}>
              {options}
            </Select>
          </FormControl>
          <FormControl pb={3}>
            <FormLabel htmlFor='destination'>Destination</FormLabel>
            <Select id='destination' fontSize={14} borderRadius='15px' size='lg'>
              <option value='eth'>Ethereum</option>
            </Select>
          </FormControl>
          <FormControl pb={3}>
            <FormLabel htmlFor='amount'>How much will you send</FormLabel>
            <InputGroup size='lg'>
              <Input 
                placeholder="Amount"
                borderRadius='15px' 
                fontSize='10pt'
                id='amount'
                autoComplete='off'
                onChange={handleAmountChange}
                value={ mintAmount }/>
              <InputRightAddon fontSize='10pt' children={accSymbol} />
            </InputGroup>
          </FormControl>
          <FormControl pb={3}>
            <FormLabel htmlFor='received'>Receiving</FormLabel>
            <InputGroup size='lg'>
              <Input 
                placeholder="Received"
                borderRadius='15px'
                readOnly
                variant='filled'
                fontSize='10pt'
                id='received'
                value={ mintReceived }/>
              <InputRightAddon fontSize='10pt' children={evmSymbol} border={0} />
            </InputGroup>
          </FormControl>
          <FormControl pb={3}>
            <FormLabel htmlFor='destinationAddress'>Destination Address</FormLabel>
              <Input 
                borderRadius='15px'
                size='lg'
                fontSize='10pt'
                id='destinationAddress'
                placeholder='Ethereum address' 
                autoComplete='off'
                onChange={ handleDestinationAddressChange }
                _focus={ destinationAddressError ? {borderColor:"red"} : { borderColor:"inherit"} } 
                borderColor={ destinationAddressError ? "red" : "inherit" }
                value={ mintDestinationAddress }
              />
              { destinationAddressError ?
              <Text color={"red.400"} my={2} fontSize='sm'>Invalid EVM address</Text>
              : null
              }
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
            Bridge Mint Fee
            </Box>
            <Spacer />
            {fees.received ?
            (
              <Box >
                { mintFeePercentage } % 
              </Box>
            ) :
            (
              <Box w={40}>
                { config.messages.feesNotReceived }
              </Box>
            )
            }  
        </Flex>
        <Flex fontSize={14} color={"gray.500"}>
          <Box>
            Ethereum Tx Cost
          </Box>
          <Spacer />
          <Box >
            {evmMintTxCost} {accSymbol} 
          </Box>
        </Flex>
          {active ? (
              <CardButton disabled= { destinationAddressError } title="Next" onClick={() =>dispatch({type: TRANSFER_INSTRUCTIONS_STEP})}/>
            ) : (
              <CardButton title="Connect wallet" onClick={onOpen}/>
            )
           }
        </Box> 
        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </Box>  
  )
}
