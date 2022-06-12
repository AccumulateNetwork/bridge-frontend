import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, Center, HStack } from "@chakra-ui/react"
import { FC } from "react"

import { CALCULATE_FEE_STEP } from "../store/actions"
import { useStore } from "../store/useStore"


type Props =  {
}
export const TransferInstructions: FC<Props> = (props) => {
  const {  dispatch } = useStore();

  return (
    <Box>
      <HStack p={2} width="100%">
        <ArrowBackIcon mr="100px" onClick={()=> dispatch({type: CALCULATE_FEE_STEP})}/>
        <Center mb={5} fontSize={16}>
            Transfer Instructions
        </Center>
      </HStack>
    </Box>
  )
}
