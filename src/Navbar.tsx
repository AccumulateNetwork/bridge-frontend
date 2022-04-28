import { FC, useState } from 'react'
import {
  Flex,
  Box,
  Spacer,
  Button,
  Icon,
  IconProps
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { FaFacebook } from 'react-icons/fa'

interface NavbarProps {
  appName: string
}

const CircleIcon: FC<IconProps> = (props) => (
  <Icon viewBox='0 0 200 200' {...props}>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
)

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
