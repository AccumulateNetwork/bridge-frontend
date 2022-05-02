import { FC, useEffect } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'
import { connectors } from './connectors'
import { useWeb3React } from '@web3-react/core'



interface NavbarProps { 
  
  appName: string
}

export const Navbar: FC<NavbarProps> = (props) => {
  const {
    account,
    activate
  } = useWeb3React();
  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
  };

  const connect = () => {
    activate(connectors.injected, (e:any) => {console.log(e)},true);
    console.log(account)

    setProvider("injected");
  }

  useEffect(() => {
    console.log(account)
    const provider = window.localStorage.getItem("provider");
    console.log(provider)
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
      <Button bg='white' variant='ghost' fontSize='xl' borderRadius='20'
      leftIcon={
        <CircleIcon boxSize={3} color='red.500' />
      } onClick={() => connect()}>
          Connect a wallet
      </Button>
      </Box>
    </Flex>
    ) 
}
