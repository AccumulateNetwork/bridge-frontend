import React, { FC } from "react";
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
  Input
} from "@chakra-ui/react";

interface CardProps {
}

export const Card: FC<CardProps> = (props) => {
  const tab1Names = ['Mint', 'Minting'];
  const tab2Names = ['Release', 'Releasing'];
  const [tabIndex, setTabIndex] = React.useState(0);
  const tab1Name = tabIndex === 0 ? tab1Names[1] : tab1Names[0];
  const tab2Name = tabIndex === 0 ? tab2Names[0] : tab2Names[1];
  return (
    <Box
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
    >
      <Tabs isFitted variant='unstyled' colorScheme="grey" onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>{ tab1Name }</Tab>
          <Tab>{ tab2Name}</Tab>  
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box padding='6'>
              <VStack borderRadius='15px'>
                <Box mb={5} fontSize={16}>
                  Select an asset and description chain, to begin or resume a mint.
                </Box>
                <Select isDisabled fontSize= {14} placeholder='Send' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
                <Select isDisabled fontSize= {14} placeholder='Destination' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </VStack>
            </Box>
            <Divider my='20px'/>
            <Box padding='6'>
              <Button  isDisabled
                colorScheme='blue' 
                bg='#006FE8' 
                w='100%' 
                borderRadius='15px' 
                mt='50px' 
                size='lg'
                p='7'>
                  Connect wallet
              </Button>
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
                <Select isDisabled fontSize= {14} placeholder='Send' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
                <Select isDisabled fontSize= {14} placeholder='Destination' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
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
              <Button isDisabled
                colorScheme='blue' 
                bg='#006FE8' 
                w='100%' 
                borderRadius='15px' 
                mt='50px' 
                size='lg'
                p='7'>
                  Connect wallet
              </Button>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Card;
