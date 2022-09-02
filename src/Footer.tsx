import React from "react"
import { Flex, Text, HStack } from "@chakra-ui/react"

export const Footer = (): React.ReactElement => {
  return (
    <Flex
      width="100%"
      direction="column"
    >
      <HStack spacing={2} fontSize={14} justifyContent={'center'} mb={5} mt={-5}>
        <Text color="gray.400"><a href="https://github.com/AccumulateNetwork" target={'blank'}>GitHub</a></Text>
      </HStack>
    </Flex>
  )
}