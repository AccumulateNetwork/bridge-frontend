import  { FC } from "react"

import {
  Box,
  VStack,
  Select,
  Center,
  Input,
  Divider,
  HStack,
  CloseButton
} from "@chakra-ui/react"

import { Pages } from "./pages"
import { useStore } from "../store/useStore"
import { ArrowBackIcon } from "@chakra-ui/icons"

type CalculateFeeProps = {
}

export const CalculateFee: FC<CalculateFeeProps> = (props) => {
  const { page, accSymbol } = useStore();
  if (page === Pages.CALCULATE_FEE) {
    return (
      <Box>
        <HStack p={2} width="100%">
          <ArrowBackIcon mr="100px"/>
          <Center mb={5} fontSize={16}>
              Amount & Fees
          </Center>
        </HStack>
        <Box pt = {5} pl={10} pr={10} pb={5}>
          <VStack borderRadius='15px'>
            <HStack spacing='24px' borderRadius={14} width="100%" borderWidth={1}>
              <Input fontSize= {14} borderRadius={14} border={0} size='lg' placeholder={`How much ${accSymbol} will you send?`}/>
              <Center fontSize={13} w='90px' h='45px'>
                  {accSymbol}
              </Center>
            </HStack>
            <HStack spacing='24px' borderRadius={14} width="100%" borderWidth={1}>
              <Center fontSize={13} w='90px' h='45px'>
                Receiving
              </Center>
            </HStack>
          </VStack>
        </Box>
        <Divider mt={20} my='20px'/>
      </Box>
    )
  } else {
    return null;
  }
}
export default CalculateFee
