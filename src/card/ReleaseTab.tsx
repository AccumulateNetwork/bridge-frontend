
import { Box, Button, Divider, Flex, HStack, Input, Link, Select, Spacer, Text, useDisclosure, VStack, Alert, AlertIcon, FormControl, FormLabel, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { CardButton } from "./CardButton"
import { CardSelectItem } from "./CardSelectItem"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"
import Web3 from "web3"
import { toast } from "react-toastify"
import TOKENSERC20ABI from '../contracts/TOKENS-CONTRACT-ABI.json'
import BRIDGEABI from '../contracts/BRIDGE-CONTRACT-ABI.json'

import BigNumber from "bignumber.js"
import { decimalCount, toETHNumber, toRoundedDown, web3BNToFloatNumber } from "../utils"
import { useStore } from "../store/useStore"
import { Token } from "../common/Token"
import { SET_EVM_SYMBOL } from "../store/actions"
import { useNavigate } from "react-router-dom"
const maxApproval = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; //(2^256 - 1 )


type Props = {
}
export const ReleaseTab: FC<Props> = (props) => {
  const bridgeAddress = process.env.REACT_APP_BRIDGE_ADDRESS!
  const navigate = useNavigate()

  const { 
    active, 
    account,
    chainId,
    library,
  } = useWeb3React()

  const { evmAddress, evmDecimals, precision, fees, tokensChainId, tokens, dispatch } = useStore()

  const options: JSX.Element[] = []
  tokens.forEach((value:Token)=> {
    options.push(<CardSelectItem key= {value.evmSymbol} symbol={value.evmSymbol}/>)
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [evmSymbol, setEvmSymbol] = useState("")
  const [accSymbol, setAccSymbol] = useState("")

  const [ amount, setAmount ] = useState(0)
  const [ received, setReceived ] = useState(0)
  const [ balance, setBalance ] = useState(0)

  const [ tokenAddress, setTokenAddress] = useState("")
  const [ allowance, setAllowance ] = useState(0)
  const [ isApproving, setIsApproving] = useState(false)
  const [ isBurning, setIsBurning] = useState(false)
  const [ destinationAddress, setDestinationAddress] = useState("")

  const [destinationAddressError, setDestinationAddressError] = useState(false)

  const [amountError, setAmountError] = useState("")

  const burnFeeBps = fees.burnFee
  const burnFeePercentage = burnFeeBps / 100

  const handleAmountChange = (event: any) => {
    const inputValue = event.target.value
     if (isNaN(Number(inputValue))) {
       return
     }
     getAllowance(evmAddress, bridgeAddress)
     if (decimalCount(inputValue) > evmDecimals) {
      const rounded = toRoundedDown(inputValue, evmDecimals)
      setAmount(rounded)
      calcReceived(rounded)
      calculateValue(rounded)
      return
     }
     setAmount(inputValue)
     calcReceived(inputValue)
     calculateValue(inputValue)  
  }

  const calcReceived = (inputValue: any) => {
    const value = new BigNumber(inputValue)
    const burnFee = value.div(100).multipliedBy(burnFeePercentage)
    const result = value.minus(burnFee)
    if (result.isGreaterThan(0)) {
      setReceived(toRoundedDown(result, precision))
    } else {
      setReceived(0)
    }
  }

  const handleDestinationAddressChange = (event: any) => {
    const address = event.target.value
     if (address.toLowerCase().includes("acme")) {
      setDestinationAddressError(false)
    } else {
      setDestinationAddressError(true)
    }
    setDestinationAddress(address)
  }

  const calculateValue = (v: number) => {
    let val = Number(v) || 0
    if (val > balance) {
      setAmountError("Not enough tokens")
    } else {
      setAmountError("")
    }
  }

  const getContract = (library: any, abi: any, address: string) => {
    const web3 = new Web3(library.provider)
    let contract
    try {
      contract = new web3.eth.Contract(abi, address)
    } catch(e: any) {
       //(e.message)
    }
    return contract
  }

  const getBalance = (tokenAddress: string) => {
    const contract = getContract(library, TOKENSERC20ABI, tokenAddress)
    if (contract) {
      contract.methods.balanceOf(account).call()
      .then((_balance: number) => {
        const pow = new BigNumber('10').pow(new BigNumber(evmDecimals))
        setBalance(web3BNToFloatNumber(_balance, pow, 18, BigNumber.ROUND_DOWN))
      }).catch((e: Error) => {
        if (chainId === tokensChainId) {
          toast(e.message)
        }
       })
    }
  }

  const getAllowance = (tokenAddress: string, spender: string) => {
    const contract = getContract(library, TOKENSERC20ABI, tokenAddress)
    if (contract) {
      contract.methods.allowance(account, spender).call().then((_allowance: number) => {
        setAllowance(_allowance)
      }).catch((e: Error) => {
        if (chainId === tokensChainId) {
          toast(e.message)
        }
       })
    }
  }

  const handleApprove = (address: string = tokenAddress, spender: string = bridgeAddress) => {
    const contract = getContract(library, TOKENSERC20ABI, address);
    setIsApproving(true)
    if (contract) {
      contract.methods.approve(spender, maxApproval).send({from: account}).then((_ : number) => {
        setIsApproving(false)
        getAllowance(evmAddress, bridgeAddress)
      }).catch((e: Error) => {
        setIsApproving(false)
       })
    }
  }

  const handleBurn = () => {
    const contract = getContract(library, BRIDGEABI, bridgeAddress)
    const value = toETHNumber(amount, evmDecimals)
    setIsBurning(true)
    if (contract) {
      contract.methods
      .burn(tokenAddress, destinationAddress, value)
      .send({from: account})
      .on('transactionHash', (transactionHash: any) => {
        navigate(`/tx/${transactionHash}`, {state: {symbol: accSymbol}})
      }).catch((e: Error) => {
        setIsBurning(false)
      }) 
    }   
  }

  const isApproveAllowanceDisabled = (allowance: number, amount: number) => {
    const amountValue = toETHNumber(amount, evmDecimals)
    if (isNaN(amountValue)) {
      return true
    }
    return Number(allowance) > 0 && Number(allowance) >= Number(amountValue)
  }

  const isReleaseAllowanceDisabled = (allowance: number, amount: number) => {
    return !isApproveAllowanceDisabled(allowance, amount)
  }

  useEffect(() => {
    if (tokens.length && !evmSymbol) {
      setEvmSymbol(tokens[0].evmSymbol)
    }
    if (tokens.length && !accSymbol) {
      setAccSymbol(tokens[0].symbol)
    }
    if (account && evmAddress && tokens.length) {
      getBalance(evmAddress)
      getAllowance(evmAddress, bridgeAddress)
      setTokenAddress(evmAddress)
      setAmount(0)
      setReceived(0)
      calculateValue(0)
    }
  }, [chainId, account, evmSymbol, tokens]);// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box>
      <Box padding='6' pt={4}>
        <Alert status='info' fontSize='sm' textAlign='left'>
          <AlertIcon />
          Select an asset to begin a release
        </Alert>
      </Box>
      <Box padding='6' pt={2} pb={0}>
        <VStack borderRadius='15px'>
        <FormControl pb={3}>
          <FormLabel htmlFor='token'>Token</FormLabel>
          <Select id='token' fontSize= {14} borderRadius='15px' size='lg' onChange={(v) => {
              const accSymbol = tokens.find(item => item.evmSymbol === v.target.value)?.symbol
              if (accSymbol) {
                setEvmSymbol(v.target.value)
                setAccSymbol(accSymbol)
                dispatch({ type: SET_EVM_SYMBOL, payload: v.target.value})
              }
            }}>
            { options }
          </Select>
        </FormControl>
        <FormControl pb={3}>
          <FormLabel htmlFor='destination'>Destination</FormLabel>
          <Select id='destination' fontSize= {14} borderRadius='15px' size='lg'>
            <option value='acc'>Accumulate</option>
          </Select>
        </FormControl>
        <FormControl pb={3}>
          <FormLabel htmlFor='amount'>Amount</FormLabel>
          <InputGroup size='lg'>
            <Input 
              _focus={amountError ? {borderColor:"red"} : { borderColor:"inherit"}} 
              borderColor={ amountError ? "red" : "inherit"}
              placeholder="Amount"
              borderRadius='15px' 
              fontSize='10pt'
              autoComplete='off'
              size='lg'
              id='amount'
              onChange={ handleAmountChange }
              value={ amount }/>
            <InputRightAddon fontSize='10pt' children={ evmSymbol } />
          </InputGroup>
          { amountError ?
            <Text color={"red.400"} my={2} fontSize='sm'>Not enough tokens</Text>
            : null
          }
          <Link color='#3182ce' 
            onClick={() => { 
              setAmount(balance)
              calculateValue(balance) 
              calcReceived(balance)}}>
            <Text my={2} fontSize='sm'>Available balance: { balance } </Text>
          </Link>
        </FormControl>
        <FormControl pb={3}>
          <FormLabel htmlFor='received'>Receiving</FormLabel>
          <InputGroup size='lg'>
            <Input
              borderRadius='15px'
              readOnly
              variant='filled'
              fontSize='10pt'
              size='lg'
              id='received'
              value={ received }/>
            <InputRightAddon fontSize='10pt' children={ accSymbol} border={0} />
          </InputGroup>
        </FormControl>
        <FormControl pb={3}>
          <FormLabel htmlFor='amount'>Destination Address</FormLabel>
          <Input 
            placeholder='Accumulate token account' 
            borderRadius='15px' 
            fontSize='10pt'
            size='lg'
            _focus={ destinationAddressError ? {borderColor:"red"} : { borderColor:"inherit"} } 
            borderColor={ destinationAddressError ? "red" : "inherit" }
            onChange={ handleDestinationAddressChange }
          />
          { destinationAddressError ?
            <Text color={"red.400"} my={2} fontSize='sm'>Invalid Accumulate address</Text>
            : null
          }
        </FormControl>
        </VStack>
      </Box>
      <Box padding={6}>
      <Divider mb={6} />
        <HStack spacing='24px' pb={2}>
          <Box fontSize= {14}>
            Details
          </Box>
        </HStack>
        <Flex fontSize={14} color={"gray.500"}>
          <Box>
            Bridge Release Fee
          </Box>
          <Spacer />
          {fees.received ?
          ( <Box >
            { burnFeePercentage } %
            </Box>
          ):
          (
            <Box w={20}> 
              ...
            </Box>
          )
          }   
        </Flex>
      </Box>
      <Box padding='6'>
      { active ? (
          <HStack>
           <Button
              colorScheme='blue' 
              bg='#006FE8' 
              w='100%' 
              borderRadius='15px' 
              size='lg'
              p='7'
              onClick={() => handleApprove()}
              disabled={ isApproveAllowanceDisabled(allowance, amount) || isApproving }>
                {
                  isApproving ?
                    "Approving..." :
                    (isApproveAllowanceDisabled(allowance, amount) ? "Approved" : "Approve")
                }
           </Button>
           <Button
              colorScheme='blue' 
              bg='#006FE8' 
              w='100%' 
              borderRadius='15px' 
              size='lg'
              p='7'
              disabled={
                isReleaseAllowanceDisabled(allowance, amount) 
                 || isApproving || isBurning || (amountError ? true : false)
                 || Number(amount) === 0 || destinationAddress === "" || destinationAddressError 
              }
              onClick={handleBurn}>
                {
                  isBurning ?
                  "Releasing...":
                  "Release"
                } 
           </Button>
          </HStack>
        ):(
          <CardButton title="Connect wallet" onClick={onOpen}/>
        )
      }
      </Box>
      <SelectWalletModal  isOpen={isOpen} closeModal={onClose} />
  </Box>
  )
}
