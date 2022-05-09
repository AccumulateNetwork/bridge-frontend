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
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core";
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors";
import { disconnect } from 'process';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';

interface NavbarProps {
  appName: string
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    chainId, 
    error
  } = useWeb3React();

  // TODO don't forget
  const explorerURL = '';
  const tokenContract = '';
  const balance2 = '';
  const symbol = '';
  
  const [appError, setAppError] = useState("");

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  }
  
  const connect = () => {
    activate(connectors.injected);
    setProvider("injected");
  }

  const disconnect = () => {
    refreshState();
    deactivate();
  }

  const refreshState = () => {
    setAppError("");
    window.localStorage.removeItem("provider");
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) {
      activate(connectors[provider]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex>
      <Logo w='40px' mx = '10px'/>
    <Box>
      { props.appName }
    </Box>
    <Spacer/>
    <Box>
    {!active ? (
      <Button bg='white' variant='ghost' fontSize='xl' borderRadius='20' onClick={() => connect()}
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
            <Button size='lg' colorScheme='gray' variant='outline' mb={3} ml={3}>{balance2} {symbol}</Button>
          ) :
            <Tooltip label='View in explorer' fontSize='md'>
              <Link href={explorerURL + '/token/' + tokenContract + '?a=' + account} isExternal>
                {/* <Button size='lg' colorScheme='gray' variant='outline' mb={3} ml={chainId === 3 ? ( 3 ) : null}>{balance2} {symbol}<ExternalLinkIcon ml={2} /></Button> */}
              </Link>
            </Tooltip>
          }
        {/* <Menu>
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
        </Menu> */}
      </div>
    }
    </Box>
  </Flex>
  ) 
}
