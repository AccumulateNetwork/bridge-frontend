import React from "react"
import { Flex, Text, HStack } from "@chakra-ui/react"

export const Footer = (): React.ReactElement => {
  return (
    <Flex
      width="100%"
      direction="column"
    >
      <HStack spacing={4}>
        <Text color="gray.400">About</Text>
        <Text color="gray.400">Docs</Text>
        <Text color="gray.400">FAQs</Text>
        <Text color="gray.400">Wiki</Text>
      </HStack>
    </Flex>
  )
}