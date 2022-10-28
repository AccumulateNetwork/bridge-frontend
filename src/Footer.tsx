import React from "react"
import { Flex, Text, HStack } from "@chakra-ui/react"

export const Footer = (): React.ReactElement => {
  const bridgeAddress = process.env.REACT_APP_BRIDGE_ADDRESS!

  return (
    <Flex
      width="100%"
      direction="column"
    >
      <HStack spacing={2} fontSize={14} justifyContent={'center'} mb={5} mt={-5}>
        <Text color="gray.400"><a href="https://github.com/AccumulateNetwork" target={'blank'}>GitHub</a></Text>
        <Text color="gray.400">{ bridgeAddress }</Text>
      </HStack>
    </Flex>
  )
}