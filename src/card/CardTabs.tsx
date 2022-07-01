import  React, { FC, useEffect } from "react"

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"
import { config } from '../config/config'
import { ReleaseTab } from "./ReleaseTab"
import { MintTab } from "./MintTab"
import { GET_FEES, INITIAL } from "../store/actions"
import { useStore } from "../store/useStore"
import RPC from "../common/RPC"
import { Fees } from "../common/Fees"

type Props = {
  tabIndex: number
}

export const CardTabs: FC<Props> = (props) => {
  const tab1Names = config.tab1Names
  const tab2Names = config.tab2Names
  const { dispatch } = useStore()
  const [tabIndex, setTabIndex] = React.useState(props.tabIndex)

  const tab1Name = tabIndex === 0 ? tab1Names[1] : tab1Names[0]
  const tab2Name = tabIndex === 0 ? tab2Names[0] : tab2Names[1]

  const getFees = () => {
    const fees = sessionStorage.getItem("Fees")
    if (fees) {
      const data = JSON.parse(fees) as Fees
      dispatch({ type: GET_FEES, payload: data })
    } else {
      RPC.request('fees', null).then((data) => {
        const _data = {...data, received: true} as Fees 
        dispatch({ type: GET_FEES, payload: _data })
        sessionStorage.setItem("Fees", JSON.stringify(_data))
      }).catch((e) => {
        sessionStorage.removeItem("Fees")
        dispatch({ type: GET_FEES, payload: {burnFee: 0, evmFee: 0, mintFee: 0, received: false} as Fees })
      })
    }
  }

  const navigate = useNavigate()
  const navigateToTab = (tabIndex: number)=> {
    setTabIndex(tabIndex)
    if (tabIndex === 0) {
      navigate(config.tab1Path)
    } else {
      navigate(config.tab2Path)
    }
    dispatch({type: INITIAL})
    getFees()
  }

  useEffect(() => {
    getFees()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Tabs 
      defaultIndex={ tabIndex } 
      isFitted
      colorScheme="messenger" 
      onChange={(index) => navigateToTab(index) }>
    <TabList>
      <Tab _focus={{borderColor:"inherit"}} py={3}>{ tab1Name }</Tab>
      <Tab _focus={{borderColor:"inherit"}} py={3}>{ tab2Name }</Tab>  
    </TabList>
    <TabPanels>
      <TabPanel >
        <MintTab/>
      </TabPanel>
      <TabPanel>
        <ReleaseTab/>
      </TabPanel>
    </TabPanels>
  </Tabs>
  )
}
export default CardTabs
