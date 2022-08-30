import { FC } from "react"
import { Box } from "@chakra-ui/react"
import { useStore } from "../store/useStore"

import { Step } from "./steps"
import CardTabs from "./CardTabs"
import { TransferInstructions } from "./TransferInstructions"
import { ReleaseCompleted } from "./ReleaseCompleted"
import { useLocation, useParams } from "react-router-dom"

type Props = {
  tabIndex?: number,
}

interface LocationState {
  symbol: string
}

export const Card: FC<Props> = (props) => {
  const { step } = useStore()
  const location  = useLocation()
  const params = useParams()
  const transactionHash = params.transactionHash
  if (transactionHash && location.state) {
    const { symbol } = location.state as LocationState
    return <CardStateless children={<ReleaseCompleted symbol={ symbol } transactionHash={ transactionHash }/>}/>
  }
  switch(step) {
    case Step.INITIAL:
    return <CardStateless children={<CardTabs tabIndex={props.tabIndex}/>}/>
    case Step.TRANSFER_INSTRUCTIONS:
    return <CardStateless children={<TransferInstructions/>}/>
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
      { children }
    </Box>
)
export default Card
