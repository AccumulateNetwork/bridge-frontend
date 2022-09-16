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
  AlertDescription,
  Link
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core"
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors"
import { CopyIcon } from '@chakra-ui/icons'

import SelectWalletModal from './Modal'
import { truncateAddress } from './utils'
import { toast } from 'react-toastify'
import { useStore } from "./store/useStore"

type Props = {
}

export const Navbar: FC<Props> = () => {

  const { tokensChainId } = useStore();

  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    chainId, 
    error
  } = useWeb3React()

  const { isOpen, onOpen, onClose } = useDisclosure();
  
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
      <Box ml={2} mb={4}>
        <Link href="/">
        <Logo h='32px' mb={2} mt={2} />
        </Link>
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
          {tokensChainId && chainId !== tokensChainId ? (
            <Button size='lg' colorScheme='red' variant='outline' mb={3}>Unsupported Network</Button>
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
