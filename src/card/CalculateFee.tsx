import  { FC } from "react"

import {
  Box,
  VStack,
  Select,
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
      <Box padding='6'>
            <VStack borderRadius='15px'>
              <Box mb={5} fontSize={16}>
                  Amount & Fees
              </Box>
              <Input fontSize= {14} borderRadius='15px' size='lg' placeholder={`How much ${accSymbol} will you send?`}/>
              <Select fontSize= {14} borderRadius='15px' size='lg'>
                <option value='eth'>Ethereum</option>
              </Select>
              <Divider my='20px'/>
            </VStack>
      </Box>
    )
  } else {
    return null;
  }
}
export default CalculateFee
