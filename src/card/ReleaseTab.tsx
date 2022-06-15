import { Box, Button, Divider, HStack, Input, Link, Select, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { FC, useState } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { useWeb3React } from "@web3-react/core"
import SelectWalletModal from "../Modal"

const releaseOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  releaseOptions.push(<CardSelectItem key= {value.evmSymbol} symbol={value.evmSymbol}/>)
})

type Props = {
}
export const ReleaseTab: FC<Props> = (props) => {
  const { active } = useWeb3React()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ amount, setAmount ] = useState(0)
  const [ balance, setBalance ] = useState(0)

  const calculateACMEValue = (v: number) => {
    let val = Number(v) || 0;
    if (val > balance) {
      // setAppError("Not enough tokens");
    } else {
      // setAppError("");
    }
    // const pow = new BigNumber('10').pow(new BigNumber(8));
    // setACMEValue(web3BNToFloatString(val*5*1e8, pow, 0, BigNumber.ROUND_DOWN));
  }
 
  return (
    <Box>
      <Box padding='6'>
        <VStack borderRadius='15px'>
          <Select fontSize= {14} borderRadius='15px' size='lg'>
            { releaseOptions }
          </Select>
          <Select fontSize= {14} borderRadius='15px' size='lg'>
            <option value='eth'>Ethereum</option>
          </Select>
        </VStack>
      </Box>
      <Box padding='6'>
        <Input borderColor={"red"} placeholder="Amount"  borderRadius='15px' 
          fontSize='12px'
          size='lg'/>
        <Text color={"red.400"} my={2} fontSize='sm'>Not enough tokens </Text>
        <Link color='#3182ce' 
          onClick={() => { setAmount(balance); calculateACMEValue(balance); }}>
          <Text my={2} fontSize='sm'>Available balance: { balance } </Text>
        </Link>
      </Box>
      <Box padding='6'>
        <Input 
          placeholder='Enter a Destination Address' 
          type='text'
          borderRadius='15px' 
          fontSize='12px'
          size='lg'
          textAlign={"center"}
          />   
      </Box>
      <Divider my='20px'/>
      <Box padding='6'>
        { active ? (
          <HStack>
           <Button
              colorScheme='blue' 
              bg='#006FE8' 
              w='100%' 
              borderRadius='15px' 
              size='lg'
              p='7'>
              Approve
           </Button>
          <Button
              colorScheme='blue' 
              bg='#006FE8' 
              w='100%' 
              borderRadius='15px' 
              size='lg'
              p='7'>
              Burn
           </Button>
        </HStack>
        ):(
          <CardButton title="Connect wallet" onClick={onOpen}/>
        )
      }
      </Box>
      <SelectWalletModal  isOpen={isOpen} closeModal={onClose} />
  </Box>
  )
}
