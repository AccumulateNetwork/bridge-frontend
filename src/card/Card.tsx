import { FC } from "react"
import { Box } from "@chakra-ui/react"
import { useStore } from "../store/useStore"

import { Step } from "./steps"
import CalculateFee from "./CalculateFee"
import CardTabs from "./CardTabs"

type CardProps = {
  tabIndex: number
}

export const Card: FC<CardProps> = (props) => {
  const { step } = useStore();
  switch(step) {
    case Step.SELECT_ASSET:
    return <CardStateless children={<CardTabs tabIndex={props.tabIndex}/>}/>
    case Step.CALCULATE_FEE:
      return <CardStateless children={<CalculateFee/>}/> 
    default: return null
  }
}

type CardStatelessProps = {
  children: 
    JSX.Element 
    | JSX.Element[]
};

const CardStateless = ({ children }: CardStatelessProps) => (
    <Box
      maxW= '400px'
      minW= '400px'
      borderWidth={1}
      boxShadow='0px 1px 20px rgb(0 27 58 / 5%)'
      borderRadius='20px'
      bg='white'
    >
      {children}
    </Box>
)
export default Card
