import { FC, useEffect } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
  MenuButton,
  Menu,
  MenuDivider,
  MenuList,
  MenuItem,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core"
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors"
import { CopyIcon } from '@chakra-ui/icons'

import SelectWalletModal from './Modal'
import { truncateAddress } from './utils'
import { toast } from 'react-toastify'

type Props = {
}

export const Navbar: FC<Props> = () => {

  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    chainId, 
    error
  } = useWeb3React()

  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO don't forget get from config
  // const explorerURL = ''
  // const tokenContract = ''
  const disconnect = () => {
    refreshState()
    deactivate()
  }

  const refreshState = () => {
    window.localStorage.removeItem("provider")
  }

  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [account, chainId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const provider = window.localStorage.getItem("provider")
    if (provider) {
      activate(connectors[provider])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex gap='2' wrap='wrap'>
      <Box ml={2}>
        <Logo h='32px' mb={6} mt={2} />
      </Box>
      <Spacer/>
      <Box mr={2}>
      {!active ? (
        <Button bg='white' variant='ghost' fontSize='xl' borderRadius='20' onClick={onOpen}
        leftIcon={
          <CircleIcon boxSize={3} color='red.500' />
        }>
            Connect a wallet
        </Button>              
        ) : 
        <div>
          {chainId === 1 ? (
            <Button size='lg' colorScheme='grey' variant='outline' mb={3}>Ethereum Mainnet</Button>
          ) :
            null
          }
          {chainId === 4 ? (
            <Button size='lg' colorScheme='grey' variant='outline' mb={3}>Rinkeby Testnet</Button>
          ) :
            null
          }
          {account ? (
            <Menu>
            <MenuButton as={Button} size='lg' colorScheme='messenger' mb={3} ml={3} leftIcon={<CircleIcon color='#48BB78' />}>{account ? truncateAddress(account) : "Connected"}</MenuButton>
            <MenuList className="address-menu">
              <MenuItem onClick={() => {navigator.clipboard.writeText(account)}}><CopyIcon mr={2} />Copy address</MenuItem>
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
