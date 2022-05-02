import { FC, useEffect } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'
import { useWeb3React } from "@web3-react/core";
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from "./connectors";


interface NavbarProps {
  appName: string
}

export const Navbar: FC<NavbarProps> = (props) => {

  const { activate, account} = useWeb3React();

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
    
  }
  
  const connect = () => {
    activate(connectors.injected);
    setProvider("injected");
  }

  useEffect(() => {
    console.log(account,
      )
    const provider = window.localStorage.getItem("provider");
    console.log(provider,
      )
    window.localStorage.clear()
     console.log(provider,
      )
    
  }, []);
  return (
    <Flex>
      <Logo w='40px' mx = '10px'/>
    <Box>
      { props.appName }
    </Box>
    <Spacer/>
    <Box>
    <Button bg='white' variant='ghost' fontSize='xl' borderRadius='20' onClick={() => connect()}
    leftIcon={
      <CircleIcon boxSize={3} color='red.500' />
    }>
        Connect a wallet
    </Button>
    </Box>
  </Flex>
  ) 
}
