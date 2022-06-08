import React, { FC, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Divider,
  Input,
  useDisclosure
} from "@chakra-ui/react"

import { config } from './config/config'
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "./Modal"
import { Token } from "./config/ConfigModel"

type CardProps = {
  tabIndex: number
}

type SelectItemProps = {
  symbol: string
}

const SelectItem: FC<SelectItemProps> = (props): JSX.Element => {
  return <option value={props.symbol}>{ props.symbol }</option>
}

export const Card: FC<CardProps> = (props) => {
  const { 
    active, 
    account,
    chainId, 
  } = useWeb3React()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const tab1Names = config.tab1Names
  const tab2Names = config.tab2Names
  const [tabIndex, setTabIndex] = React.useState(props.tabIndex)
  const tab1Name = tabIndex === 0 ? tab1Names[1] : tab1Names[0]
  const tab2Name = tabIndex === 0 ? tab2Names[0] : tab2Names[1]

  const navigate = useNavigate()
  const navigateToTab = (tabIndex: number)=> {
    setTabIndex(tabIndex)
    if (tabIndex === 0) {
      navigate(config.tab1Path)
    } else {
      navigate(config.tab2Path)
    }
  }
  // select options group
  const mintOptions: JSX.Element[] = []
  config.tokens.forEach((value:Token)=> {
    mintOptions.push(<SelectItem key= {value.accSymbol} symbol={value.accSymbol}/>)
  })

  const releaseOptions: JSX.Element[] = []
  config.tokens.forEach((value:Token)=> {
    releaseOptions.push(<SelectItem key= {value.evmSymbol} symbol={value.evmSymbol}/>)
  })

  useEffect(() => {
    // alert("test") 
  }, [account, chainId]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
    >
      <Tabs isFitted variant='unstyled' colorScheme="grey" onChange={(index) => navigateToTab(index) }>
        <TabList>
          <Tab>{ tab1Name }</Tab>
          <Tab>{ tab2Name }</Tab>  
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box padding='6'>
              <VStack borderRadius='15px'>
                <Box mb={5} fontSize={16}>
                  Select an asset and description chain, to begin or resume a mint.
                </Box>
                <Select fontSize= {14} borderRadius='15px' size='lg'>
                  {mintOptions}        
                </Select>
                <Select fontSize= {14} borderRadius='15px' size='lg'>
                  <option value='eth'>Ethereum</option>
                </Select>
              </VStack>
            </Box>
            <Divider my='20px'/>
            <Box padding='6'>
              { active ? (
                  <Button
                    colorScheme='blue' 
                    bg='#006FE8' 
                    w='100%' 
                    borderRadius='15px' 
                    mt='50px' 
                    size='lg'
                    p='7'>
                      Next
                  </Button>
                ):(
                  <Button 
                    colorScheme='blue' 
                    bg='#006FE8' 
                    w='100%' 
                    borderRadius='15px' 
                    mt='50px' 
                    size='lg'
                    p='7'
                    onClick={onOpen}>
                      Connect wallet
                  </Button>
                )
                }
            </Box>  
          </TabPanel>
          <TabPanel>
            <Box padding='6'>
              <VStack borderRadius='15px'> 
                <Input 
                  placeholder='0 acmeBTC' 
                  type='text'
                  border={0} 
                  fontSize='52px' 
                  mb={5} 
                  size='lg'
                  textAlign={"center"}
                />
                <Select isDisabled fontSize= {14} borderRadius='15px' size='lg'>
                  <option value='eth'>Ethereum</option>
                </Select>
                <Select isDisabled fontSize= {14} borderRadius='15px' size='lg'>
                  { releaseOptions }
                </Select>
              </VStack>
            </Box>
            <Box padding='6'>
              <Input 
                isDisabled
                placeholder='Enter a Destination Address' 
                type='text'
                borderRadius='15px' 
                fontSize='12px'
                size='lg'
                textAlign={"center"}
                  />   
            </Box>
            <Divider my='20px'/>
            <Box padding='6'>
              { active ? (
                <Button
                  colorScheme='blue' 
                  bg='#006FE8' 
                  w='100%' 
                  borderRadius='15px' 
                  mt='50px' 
                  size='lg'
                  p='7'>
                    Next
                </Button>
              ):(
                <Button 
                  colorScheme='blue' 
                  bg='#006FE8' 
                  w='100%' 
                  borderRadius='15px' 
                  mt='50px' 
                  size='lg'
                  p='7'>
                    Connect wallet
                </Button>
              )
              }
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SelectWalletModal  isOpen={isOpen} closeModal={onClose} />
    </Box>
    
  )
}

export default Card
