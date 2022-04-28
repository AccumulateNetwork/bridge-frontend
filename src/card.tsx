import React, { FC } from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Divider
} from "@chakra-ui/react";

interface CardProps {
 
}

export const Card: FC<CardProps> = (props) => {
  

  return (
    <Box
      display={{ md: "flex" }}
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
    >
        <Tabs isFitted variant='unstyled'>
        <TabList>
          <Tab>Mint</Tab>
          <Tab>Release</Tab>  
        </TabList>
        <TabPanels>
          <TabPanel>
          <Box padding='10' maxW='md'>
            <VStack borderRadius='15px'>
                <Box maxW='md' mb={5}>
                  Select an asset and description chain, to begin or resume a mint.
                </Box>
                <Select placeholder='Send' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
                <Select placeholder='Destination' borderRadius='15px' size='lg'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </VStack>
              
          </Box>
          <Divider my='20px'/>
          <Box padding='10' maxW='md'>
            <Button colorScheme='blue' bg='#006FE8' size='md' w='100%' borderRadius='15px' mt='50px'>
                Connect wallet
            </Button>
          </Box>  
          </TabPanel>
          <TabPanel>
           
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Card;
