import  { FC } from "react"

import {
  Box,
  VStack,
  Select,
  Center,
  Input,
  Divider,
} from "@chakra-ui/react"

import { Pages } from "./pages"
import { useStore } from "../store/useStore"

type CalculateFeeProps = {
}

export const CalculateFee: FC<CalculateFeeProps> = (props) => {
  const { page, accSymbol } = useStore();
  if (page === Pages.CALCULATE_FEE) {
    return (
      <Box padding='10'>
        <VStack borderRadius='15px'>
          <Box mb={5} fontSize={16}>
              Amount & Fees
          </Box>
          <Box mb={5} fontSize={14} textAlign='left' width='95%'>
              Send
          </Box>
          <Input fontSize= {14} borderRadius='15px' size='lg' placeholder={`How much ${accSymbol} will you send?`}/>
          <Box pt={2} mb={5} fontSize={14} textAlign='left' width='95%'>
              Receiving
          </Box>
          <Input fontSize= {14} borderRadius='15px' size='lg' />
          <Divider my='20px'/>
        </VStack>
      </Box>
    )
  } else {
    return null;
  }
}
export default CalculateFee
