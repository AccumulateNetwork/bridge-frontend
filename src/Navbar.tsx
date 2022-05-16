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
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core";
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors";
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';

import { config }  from './config/config';
import SelectWalletModal from './Modal';
import { toHex, truncateAddress, web3BNToFloatString } from './utils';
import WACMEERC20ABI from './WACME-ABI.json'
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

export const Navbar: FC = () => {
  const { 
    activate, 
    deactivate, 
    active, 
    account, 
    chainId, 
    library
  } = useWeb3React();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [balance, setBalance]= useState("");

  // TODO don't forget
  const explorerURL = '';
  const tokenContract = '';
  const symbol = '';
  
  const [appError, setAppError] = useState("");

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  }
  
  const disconnect = () => {
    refreshState();
    deactivate();
  }

  const refreshState = () => {
    setAppError("");
    window.localStorage.removeItem("provider");
  };

  const getContract = (library: any, abi: any, address: string) => {
    const web3 = new Web3(library.provider);
  return new web3.eth.Contract(abi, address)
  }

  const getBalance = (tokenAddress: string) => {
    const contract = getContract(library, WACMEERC20ABI, tokenAddress);
    contract.methods.balanceOf(account).call().then((_balance: number) => {
      console.log(_balance)
       const pow = new BigNumber('10').pow(new BigNumber(8));
       setBalance(web3BNToFloatString(_balance, pow, 18, BigNumber.ROUND_DOWN));
     })
 }

  useEffect(() => {
    if (account) {
      getBalance('0x3Cc66102c9155A6F6AC8dD8d8885eBbf1bF56035');
    }
  }, [account, chainId]); // eslint-disable-line react-hooks/exhaustive-deps

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
      </div>
    }
    </Box>
    <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
  </Flex>
  ) 
}
