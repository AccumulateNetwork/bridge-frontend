import { Box, Divider, Select, useDisclosure, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { CALCULATE_FEE_STEP, SET_ACC_SYMBOL } from "../store/actions"
import { useStore } from "../store/useStore"
import { useWeb3React } from "@web3-react/core"

type Props = {
}

// select options group
const mintOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  mintOptions.push(<CardSelectItem key= {value.accSymbol} symbol={value.accSymbol}/>)
})

export const MintTab: FC<Props> = (props) => {
  const { dispatch } = useStore();
  const { 
    active, 
  } = useWeb3React()
  const { onOpen } = useDisclosure()
  return (
    <Box>
      <Box padding='6'>
          <VStack borderRadius='15px'>
            <Box mb={5} fontSize={16}>
              Select an asset and description chain, to begin or resume a mint.
            </Box>
            <Select fontSize= {14} borderRadius='15px' size='lg' onChange={(v) => {
              dispatch({type: SET_ACC_SYMBOL, payload: v.target.value})
            }}>
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
              <CardButton title="Next" onClick={() => dispatch({type:CALCULATE_FEE_STEP})}/>
            ):(
              <CardButton title="Connect wallet" onClick={onOpen}/>
            )
            }
        </Box>  
    </Box>
        
  )
}
