import { FC } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { CircleIcon } from './CircleIcon'

interface NavbarProps {
  appName: string
}

export const Navbar: FC<NavbarProps> = (props) => {
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
      }>
          Connect a wallet
      </Button>
      </Box>
    </Flex>
    ) 
}
