
import { Box, Button, Divider, HStack, Input, Link, Select, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"
import Web3 from "web3"
import { toast } from "react-toastify"
import TOKENSERC20ABI from '../contracts/TOKENS-CONTRACT-ABI.json'
import BRIDGEABI from '../contracts/BRIDGE-CONTRACT-ABI.json'

import BigNumber from "bignumber.js"
import { toETHNumber, web3BNToFloatNumber } from "../utils"
import { useStore } from "../store/useStore"
import { SET_EVM_SYMBOL } from "../store/actions"

const releaseOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  releaseOptions.push(<CardSelectItem key= {value.evmSymbol} symbol={value.evmSymbol}/>)
})

const getEvmTokenAddress = (evmSymbol: string) => {
  const result = config.tokens
  .find(token => token.evmSymbol === evmSymbol)!
  .evmTokenAddress
  return result
}

type Props = {
}
export const ReleaseTab: FC<Props> = (props) => {
  const { 
    active, 
    account,
    chainId,
    library,
  } = useWeb3React()

  const { evmSymbol, dispatch } = useStore()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ amount, setAmount ] = useState(0)
  const [ balance, setBalance ] = useState(0)
  const [ tokenAddress, setTokenAddress] = useState("")
  const [ allowance, setAllowance ] = useState(0)
  const [ isApproving, setIsApproving] = useState(false)
  const [ isBurning, setIsBurning] = useState(false)
  const [ destinationAddress, setDestinationAddress] = useState("")
  const [destinationAddressError, setDestinationAddressError] = useState(false)

  const [amountError, setAmountError] = useState("")

  const [ decimals, setDecimals] = useState(0)

  const handleAmountChange = (event: any) => {
     if (isNaN(Number(event.target.value))) {
       return
     }
     setAmount(event.target.value);
     calculateValue(event.target.value)   
  }

  const handleDestinationAddressChange = (event: any) => {
    const address = event.target.value
    if (address.includes(".acme")) {
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
    // const pow = new BigNumber('10').pow(new BigNumber(8));
    // setACMEValue(web3BNToFloatString(val*5*1e8, pow, 0, BigNumber.ROUND_DOWN));
  }

  const getContract = (library: any, abi: any, address: string) => {
    const web3 = new Web3(library.provider)
    let contract
    try {
      contract = new web3.eth.Contract(abi, address)
    } catch(e: any) {
       toast(e.message)
    }
    return contract
  }

  const getBalance = (tokenAddress: string) => {
    const contract = getContract(library, TOKENSERC20ABI, tokenAddress)
    if (contract) {
      contract.methods.decimals().call().then((_decimals: number) => {
        setDecimals(_decimals)
        return contract.methods.balanceOf(account).call()
          .then((_balance: number) => {
            const pow = new BigNumber('10').pow(new BigNumber(_decimals))
            setBalance(web3BNToFloatNumber(_balance, pow, 18, BigNumber.ROUND_DOWN))
          })
      }).catch((e: Error) => {
        toast(e.message)
       })
    }
  }

  const getAllowance = (tokenAddress: string, spender: string) => {
    const contract = getContract(library, TOKENSERC20ABI, tokenAddress)
    if (contract) {
      contract.methods.allowance(account, spender).call().then((_amount: number) => {
        setAllowance(_amount)
      }).catch((e: Error) => {
        toast(e.message)
       })
    }
  }

   const handleApprove = (address: string = tokenAddress, spender: string = config.evmNetwork.bridgeAddress) => {
    const contract = getContract(library, TOKENSERC20ABI, address);
    const maxApproval = new BigNumber(2).pow(256).minus(1);
    setIsApproving(true);
    if (contract) {
      contract.methods.approve(spender, maxApproval).send({from: account}).then((_ : number) => {
        window.location.reload();
      }).catch((e: Error) => {
        setIsApproving(false)
       })
    }
  }

  const handleBurn = () => {
    console.log(decimals)
    const contract = getContract(library, BRIDGEABI, config.evmNetwork.bridgeAddress)
    const value = toETHNumber(amount, decimals)
    setIsBurning(true)
    if (contract) {
      contract.methods.burn(tokenAddress, destinationAddress, value).send({from: account}).then((result: any) => {
        window.location.reload();
      }).catch((e: Error) => {
        setIsBurning(false)
       }) 
    }   
  }

  const isAllowanceMoreThenAmount = (allowance: number, amount: number) => {
    if (Number(allowance) >= Number(amount)) {
      return true;
    }
    return false;
  }

  useEffect(() => {    
    const address = getEvmTokenAddress(evmSymbol)
    if (account && address) {  
      getBalance(address)
      getAllowance(address, config.evmNetwork.bridgeAddress)
    }
    setTokenAddress(address)
    setAmount(0)
    calculateValue(0)
    }, [chainId, account, evmSymbol]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Box padding='6'>
        <VStack borderRadius='15px'>
          <Select fontSize= {14} borderRadius='15px' size='lg' onChange={(v) => {
              dispatch({type: SET_EVM_SYMBOL, payload: v.target.value})
            }}>
            { releaseOptions }
          </Select>
          <Select fontSize= {14} borderRadius='15px' size='lg'>
            <option value='acc'>Accumulate</option>
          </Select>
        </VStack>
      </Box>
      <Box padding='6'>
        <Input 
          _focus={amountError ? {borderColor:"red"} : { borderColor:"inherit"}} 
          borderColor={ amountError ? "red" : "inherit"}
          placeholder="Amount"  borderRadius='15px' 
          fontSize='12px'
          size='lg'
          onChange={handleAmountChange}
          value={ amount }/>
        { amountError ?
          <Text color={"red.400"} my={2} fontSize='sm'>Not enough tokens </Text>
          : null
        }
        <Link color='#3182ce' 
          onClick={() => { 
            setAmount(balance)
            calculateValue(balance) }}>
          <Text my={2} fontSize='sm'>Available balance: { balance } </Text>
        </Link>
      </Box>
      <Box padding='6'>
        <Input 
          placeholder='Enter a Destination Address' 
          borderRadius='15px' 
          fontSize='12px'
          size='lg'
          textAlign={"center"}
          _focus={ destinationAddressError ? {borderColor:"red"} : { borderColor:"inherit"} } 
          borderColor={ destinationAddressError ? "red" : "inherit" }
          onChange={ handleDestinationAddressChange }
        />
        { destinationAddressError ?
          <Text color={"red.400"} my={2} fontSize='sm'>Address should contains .acme </Text>
          : null
        }  
      </Box>
      <Divider my='20px'/>
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
              disabled={
                isAllowanceMoreThenAmount(allowance, amount) || isApproving
              }>
                {
                  isApproving ?
                    "Approving..." :
                    (!isAllowanceMoreThenAmount(allowance, amount) ? "Approve" : "Approved")
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
                !isAllowanceMoreThenAmount(allowance, amount) 
                || isApproving || isBurning
                || amount === 0 || destinationAddress === "" || destinationAddressError 
              }
              onClick={handleBurn}>
                {
                  isBurning ?
                  "Burning...":
                  "Burn"
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
