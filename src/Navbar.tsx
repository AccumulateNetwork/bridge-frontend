import { FC, useState } from 'react'
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Box,
  Heading
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

interface NavbarProps {
  appName: string
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [display, changeDisplay] = useState('none')
    return (
      <Flex>
        <Box p='2'>
          <Heading my={5} size='md'> { props.appName }</Heading>
        </Box>
        <Flex
          position="fixed"
          top="1rem"
          right="1rem"
          align="center"
        >
          {/* Desktop */}
          <Flex display={['none', 'none', 'flex','flex']}>  
            <NextLink href="/connect_wallet" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Connect a Wallet"
                my={5}
                w="100%"
              >
                Connect a Wallet
              </Button>
            </NextLink>
          </Flex>
          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={
              <HamburgerIcon />
            }
            onClick={() => changeDisplay('flex')}
            display={['flex', 'flex', 'none', 'none']}
          />
          <Switch
            color="green"
            isChecked={isDark}
            onChange={toggleColorMode}
          />
        </Flex>
  
        {/* Mobile Content */}
        <Flex
          w='100vw'
          display={display}
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={
                <CloseIcon />
              }
              onClick={() => changeDisplay('none')}
            />
          </Flex>
  
          <Flex
            flexDir="column"
            align="center"
          >
            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Home
                      </Button>
            </NextLink>
  
            <NextLink href="/about" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="About"
                my={5}
                w="100%"
              >
                About
                      </Button>
            </NextLink>
  
            <NextLink href="/connect_wallet" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                Connect a wallet
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    )
}
