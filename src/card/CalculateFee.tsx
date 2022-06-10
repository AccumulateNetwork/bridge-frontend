import  { FC } from "react"

import {
  Box,
  VStack,
  Center,
  Input,
  Divider,
  HStack,
  Flex,
  Spacer,
  Button
} from "@chakra-ui/react"

import { Step } from "./steps"
import { config } from '../config/config'

import { useStore } from "../store/useStore"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import { SELECT_ASSET_STEP } from "../store/actions"

type CalculateFeeProps = {
}

export const CalculateFee: FC<CalculateFeeProps> = (props) => {
  const { step, accSymbol, dispatch } = useStore();
  const bredgeFeeProcentage = 0.2
  const bridgeFee = 100
  const ethFee = 0
  const navigate = useNavigate()
  if (step === Step.CALCULATE_FEE) {
    return (
      <Box>
        <HStack p={2} width="100%">
          <ArrowBackIcon mr="100px" onClick={()=> {
            dispatch({type: SELECT_ASSET_STEP})
            navigate(config.tab1Path)
          }}/>
          <Center mb={5} fontSize={16}>
              Amount & Fees
          </Center>
        </HStack>
        <Box pt = {5} pl={10} pr={10} pb={5}>
          <VStack borderRadius='15px'>
            <HStack spacing='24px' borderRadius={14} width="100%" borderWidth={1}>
              <Input fontSize= {14} borderRadius={14} border={0} size='lg' placeholder={`How much ${accSymbol} will you send?`}/>
              <Center fontSize={13} w='80px' h='45px'>
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
        <Box pt = {5} pl={10} pr={10} pb={5}>
          <HStack spacing='24px' pb={2}>
            <Box fontSize= {14}>
              Details
            </Box>
          </HStack>
          <Flex fontSize={14} color={"gray.500"}>
            <Box mr={190}>
              Bridge fee
              </Box>
              <Spacer />
              <Box >
                {bridgeFee} $
            </Box>
          </Flex>
          <Flex fontSize={14} color={"gray.500"}>
            <Box mr={190}>
              Ethereum fee
              </Box>
              <Spacer />
              <Box >
                {ethFee} $
            </Box>
          </Flex> 
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
        </Box>  
      </Box>
    )
  } else {
    return null;
  }
}
export default CalculateFee
