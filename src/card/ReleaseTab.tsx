import { Box, Divider, Input, Select, TabPanel, useDisclosure, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { CardButton } from "./СardButton"
import { config } from '../config/config'
import { Token } from "../config/ConfigModel"
import { CardSelectItem } from "./CardSelectItem"
import { useWeb3React } from "@web3-react/core"

type Props = {
}

const releaseOptions: JSX.Element[] = []
config.tokens.forEach((value:Token)=> {
  releaseOptions.push(<CardSelectItem key= {value.evmSymbol} symbol={value.evmSymbol}/>)
})

export const ReleaseTab: FC<Props> = (props) => {
  const { active } = useWeb3React()
  const { onOpen } = useDisclosure()
  return (
    <Box>
      <Box padding='6'>
        <VStack borderRadius='15px'> 
          <Input 
            placeholder='0 acmeBTC' 
            type='text'
            border={0} 
            fontSize='52px' 
            mb={5} 
            size='lg'
            textAlign={"center"}
          />
          <Select isDisabled fontSize= {14} borderRadius='15px' size='lg'>
            <option value='eth'>Ethereum</option>
          </Select>
          <Select isDisabled fontSize= {14} borderRadius='15px' size='lg'>
            { releaseOptions }
          </Select>
        </VStack>
      </Box>
      <Box padding='6'>
        <Input 
          isDisabled
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
          <CardButton title="Next"/>
        ):(
          <CardButton title="Connect wallet" onClick={onOpen}/>
        )
      }
      </Box>
  </Box>
  )
}
