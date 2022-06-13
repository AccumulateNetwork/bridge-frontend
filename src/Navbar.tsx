import { FC, useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
  Tooltip,
  Link,
  MenuButton,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core"
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors"
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { config }  from './config/config'
import SelectWalletModal from './Modal'
import { truncateAddress, web3BNToFloatString } from './utils'
import CONTRACTERC20ABI from './CONTRACT-ABI.json'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'

export const Navbar: FC = () => {
  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    chainId, 
    library,
    error
  } = useWeb3React()

  const tokenAddress = '0x555E7deddae1711FDEf2490a32F27eb364cF343e';
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [balance, setBalance]= useState("")

  // TODO don't forget get from config
  const explorerURL = ''
  const tokenContract = ''
  const symbol = ''
  
  const disconnect = () => {
    refreshState()
    deactivate()
  }

  const refreshState = () => {
    window.localStorage.removeItem("provider")
  }

  const getContract = (library: any, abi: any, address: string) => {
    const web3 = new Web3(library.provider)
    let contract
    try {
      contract = new web3.eth.Contract(abi, address)
    } catch(e: any){
       toast(e.message)
  }
  return contract
  }

  const getBalance = (tokenAddress: string) => {
    const contract = getContract(library, CONTRACTERC20ABI, tokenAddress)
    if (contract) {
      contract.methods.balanceOf(account).call().then((_balance: number) => {
         const pow = new BigNumber('10').pow(new BigNumber(8))
         setBalance(web3BNToFloatString(_balance, pow, 18, BigNumber.ROUND_DOWN))
       }).catch((e: Error) => {
        toast(e.message)
       })
    }
  }

  useEffect(() => {
    if (error) {
      toast(error)
    }
    if (account) {
       getBalance(tokenAddress)
    }
  }, [account, chainId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Flex>
      <Logo w='40px' mx = '10px'/>
    <Box>
      { config.appName }
    </Box>
    <Spacer/>
    <Box>
    {!active ? (
      <Button bg='white' variant='ghost' fontSize='xl' borderRadius='20' onClick={onOpen}
      leftIcon={
        <CircleIcon boxSize={3} color='red.500' />
      }>
          Connect a wallet
      </Button>              
      ) : 
      <div>
        {chainId === 1337 ? (
          <Tooltip label='You are connected to localhost' fontSize='md'>
            <Button size='lg' colorScheme='orange' variant='outline' mb={3}>Localhost</Button>
          </Tooltip>
        ) :
          null
        }
        {chainId === 3 ? (
          <Tooltip label='You are connected to testnet' fontSize='md'>
            <Button size='lg' colorScheme='orange' variant='outline' mb={3}>Ropsten Testnet</Button>
          </Tooltip>
        ) :
          null
        }
          {explorerURL === "" ? (
            <Button size='lg' colorScheme='gray' variant='outline' mb={3} ml={3}>{balance} {symbol}</Button>
          ) :
            <Tooltip label='View in explorer' fontSize='md'>
              <Link href={explorerURL + '/token/' + tokenContract + '?a=' + account} isExternal>
                {/* <Button size='lg' colorScheme='gray' variant='outline' mb={3} ml={chainId === 3 ? ( 3 ) : null}>{balance2} {symbol}<ExternalLinkIcon ml={2} /></Button> */}
              </Link>
            </Tooltip>
          }
        {account ? (
          <Menu>
          <MenuButton as={Button} size='lg' colorScheme='gray' mb={3} ml={3} leftIcon={<CircleIcon color='#48BB78' />}>{account ? truncateAddress(account) : "Connected"}</MenuButton>
          <MenuList className="address-menu">
            <MenuItem onClick={() => {navigator.clipboard.writeText(account)}}><CopyIcon />Copy address</MenuItem>
            {explorerURL !== "" ? (
              <MenuItem><Link href={explorerURL + '/address/' + account} isExternal><ExternalLinkIcon />View on explorer</Link></MenuItem>
            ) : null
            }
            <MenuDivider />
            <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
          </MenuList>
        </Menu>
        ) : null
        }
        {error && error.message ? (
          <Alert status='error' justifyContent='center'>
            <AlertIcon />
            <AlertTitle mr={2}>MetaMask Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) :
          null
        }  
      </div>
    }
    </Box>
    <SelectWalletModal  isOpen={isOpen} closeModal={onClose} />
  </Flex>
  ) 
}
