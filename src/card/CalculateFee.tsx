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
} from "@chakra-ui/react"

import { config } from '../config/config'
import { useStore } from "../store/useStore"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import { 
  INITIAL, 
  SET_SEND, 
  SET_SEND_AND_RECEIVING, 
  TRANSFER_INSTRUCTIONS_STEP } from "../store/actions"
import { CardButton } from "./СardButton"
import BigNumber from "bignumber.js"

type Props = {
}

export const CalculateFee: FC<Props> = (props) => {
  const { accSymbol, evmSymbol, send, receiving, nextStepDisabled, dispatch } = useStore();

  // TODO don't forget get brigde fee from config
  const bridgeFeePercentage = 0.2
  const ethFee = 10
  const navigate = useNavigate()

  const calculateFee = (inputValue: string) => {  
    const payload =  {"send": "", "receiving": ""}
    if (isNaN(Number(inputValue)) || inputValue === "") {
      dispatch({type: SET_SEND_AND_RECEIVING, payload: payload})
      return
    }
    if (inputValue.length > 1 && inputValue.endsWith(".")) {
      dispatch({type: SET_SEND, payload: inputValue})
      return
    }
    const value = new BigNumber(inputValue)
    const bridgeFee = value.div(100).multipliedBy(bridgeFeePercentage)
    let result = value.minus(bridgeFee)
    result = result.minus(ethFee)
    if (result.isGreaterThan(0)) {
     const payload =  {
      "send": value.toNumber(), 
      "receiving": result.toNumber(), 
      "nextStepDisabled": false
    }
      dispatch({type: SET_SEND_AND_RECEIVING, payload: payload})
    } else {
      const payload =  {

        "send": value.toNumber(),
        "receiving":"",
        "nextStepDisabled": true
      }
      dispatch({type: SET_SEND_AND_RECEIVING, payload: payload})
    }
  }
  return (
    <Box>
      <HStack p={2} width="100%">
        <ArrowBackIcon mr="100px" onClick={()=> {
          dispatch({type: INITIAL})
          navigate(config.tab1Path)
        }}/>
        <Center mb={5} fontSize={16}>
            Amount & Fees
        </Center>
      </HStack>
      <Box pt = {5} pl={10} pr={10} pb={5}>
        <VStack borderRadius='15px'>
          <HStack spacing='24px' borderRadius={14} width="100%" borderWidth={1}>
            <Input fontSize= {14} borderRadius={14} border={0} size='lg' placeholder={`How much ${accSymbol} will you send?`}
              onChange={(v) => 
                // TODO reqexp only numbers
                calculateFee(v.target.value)}
                value={send}
            />
            <Center fontSize={13} w='80px' h='45px'>
                {accSymbol}
            </Center>
          </HStack>
          <HStack spacing='24px' borderRadius={14} width="100%" borderWidth={1}>
            <Center fontSize={13} w='90px' h='45px'>
              Receiving
            </Center>
            <Spacer />

            <Center fontSize={13} w='60px' h='45px'>
                {receiving}
            </Center>
            { receiving ? (
              <Center fontSize={13} w='60px' h='45px'>
                {evmSymbol}
              </Center>
              ): null
            }     
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
          <Box>
            Bridge fee
            </Box>
            <Spacer />
            <Box >
              {bridgeFeePercentage} %
          </Box>
        </Flex>
        <Flex fontSize={14} color={"gray.500"}>
          <Box>
            Ethereum fee
            </Box>
            <Spacer />
            <Box >
              {ethFee} ACME
          </Box>
        </Flex> 
        <CardButton title="Next" disabled={nextStepDisabled} onClick={() =>  dispatch({type: TRANSFER_INSTRUCTIONS_STEP})}/>
      </Box>  
    </Box>
  )
}
export default CalculateFee
