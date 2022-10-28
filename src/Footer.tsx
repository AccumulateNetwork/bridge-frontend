import React from "react"
import { Flex, Text, VStack } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

export const Footer = (): React.ReactElement => {
  const bridgeAddress = process.env.REACT_APP_BRIDGE_ADDRESS!

  return (
    <Flex
      width="100%"
      direction="column"
    >
      <VStack spacing={2} fontSize={14} justifyContent={'center'} mb={5} mt={-5}>
        <Text color="gray.400">Bridge contract:<br />{ bridgeAddress }</Text>
        <Text color="gray.500"><a href="https://github.com/AccumulateNetwork" target={'blank'}>GitHub<ExternalLinkIcon marginTop={-1} marginLeft={1} /></a></Text>
      </VStack>
    </Flex>
  )
}