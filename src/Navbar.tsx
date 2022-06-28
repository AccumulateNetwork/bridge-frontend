import { FC, useEffect } from 'react'
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
  Center
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core"
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors"
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons'

import { config }  from './config/config'
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
  const explorerURL = ''
  const tokenContract = ''  
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
    <Flex gap='0' wrap='wrap'>
      <Box>
        <Logo h='30px' mb={6} mt={2} />
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
              <Button size='lg' colorScheme='grey' variant='outline' mb={3}>Localhost</Button>
            </Tooltip>
          ) :
            null
          }
          {chainId === 4 ? (
            <Tooltip label='You are connected to testnet' fontSize='md'>
              <Button size='lg' colorScheme='grey' variant='outline' mb={3}>Rinkeby Testnet</Button>
            </Tooltip>
          ) :
            null
          }
          {account ? (
            <Menu>
            <MenuButton as={Button} size='lg' colorScheme='messenger' mb={3} ml={3} leftIcon={<CircleIcon color='#48BB78' />}>{account ? truncateAddress(account) : "Connected"}</MenuButton>
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
