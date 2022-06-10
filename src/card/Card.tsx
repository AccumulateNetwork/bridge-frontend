import { FC } from "react"

import { Box } from "@chakra-ui/react"

import CalculateFee from "./CalculateFee"
import CardTabs from "./CardTabs"

type CardProps = {
  tabIndex: number
}

export const Card: FC<CardProps> = (props) => {
  return (
    <Box
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
    >
      <CardTabs tabIndex={props.tabIndex}/>
      <CalculateFee/>
    </Box>
  )
}
export default Card
