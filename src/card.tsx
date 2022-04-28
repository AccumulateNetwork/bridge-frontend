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
  TabPanel
} from "@chakra-ui/react";

interface CardProps {
 
}

export const Card: FC<CardProps> = (props) => {
  

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
      margin={5}
    >
        <Tabs isFitted variant='unstyled'>
        <TabList>
          <Tab>Mint</Tab>
          <Tab>Release</Tab>  
        </TabList>
        <TabPanels>
          <TabPanel>
          <Box padding='4' maxW='md'>
              Select an asset and description chain, to begin or resume a mint
          </Box>
          </TabPanel>
          <TabPanel>
          <Box padding='4' maxW='md'>
              Select an asset and description chain, to begin or resume a mint
          </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Card;
