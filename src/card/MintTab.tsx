import { Box, Select, useDisclosure, VStack, FormControl, FormLabel, Alert, AlertIcon } from "@chakra-ui/react"
import { FC } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { CALCULATE_FEE_STEP, SET_ACC_SYMBOL } from "../store/actions"
import { useStore } from "../store/useStore"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"

type Props = {
}

// select options group
const mintOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  mintOptions.push(<CardSelectItem key= {value.accSymbol} symbol={value.accSymbol}/>)
})

export const MintTab: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { dispatch } = useStore()
  const { 
    active, 
  } = useWeb3React()
  return (
    <Box>
      <Box padding='6' pt={4}>
        <Alert status='info' fontSize='sm' textAlign='left'>
          <AlertIcon />
          Select an asset and destination chain, to begin a mint
        </Alert>
      </Box>
      <Box padding='6' pt={2} pb={0}>
        <VStack borderRadius='15px'>
          <FormControl pb={3}>
            <FormLabel htmlFor='token'>Token</FormLabel>
            <Select id='token' fontSize={14} borderRadius='15px' size='lg' onChange={(v) => {
              dispatch({type: SET_ACC_SYMBOL, payload: v.target.value})
            }}>
              {mintOptions}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='destination'>Destination</FormLabel>
            <Select id='destination' fontSize={14} borderRadius='15px' size='lg'>
              <option value='eth'>Ethereum</option>
            </Select>
          </FormControl>
        </VStack>
        </Box>
        <Box padding='6' pt={0}>
          {active ? (
              <CardButton title="Next" onClick={() => dispatch({type:CALCULATE_FEE_STEP})}/>
            ) : (
              <CardButton title="Connect wallet" onClick={onOpen}/>
            )
           }
        </Box> 
        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </Box>  
  )
}
