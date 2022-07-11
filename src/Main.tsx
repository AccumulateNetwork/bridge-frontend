import { Alert, AlertIcon, VStack } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Card from "./card/Card";
import { Fees } from "./common/Fees";
import RPC from "./common/RPC";
import { config } from "./config/config";
import { GET_FEES, GET_TOKENS, SET_GLOBAL_NETWORK_ERROR, SET_GLOBAL_SERVER_NOT_RESPONDED } from "./store/actions";
import { useStore } from "./store/useStore";

type Props = {}

export const Main: FC<Props> = () => {
  return  (
    <VStack mt={-16} pt={1} minH='calc(93vh - 107px)'>
      <Routing/>
    </VStack>
  )
}

export const Routing: FC<Props> = () => {
  const { account, chainId  } = useWeb3React()
  const { tokensChainId, globalNetworkError, globalServerNotResponded, dispatch } = useStore()

  const getFees = () => {
    RPC.request('fees').then((data) => {
      const _data = {...data, received: true} as Fees 
      dispatch({ type: GET_FEES, payload: _data }) 
    }).catch((e) => {
      dispatch({ type: GET_FEES, payload: {burnFee: 0, evmFee: 0, mintFee: 0, received: false} as Fees })
    })
  }

  const getTokens = () => {
    RPC.request('tokens').then((data) => {
      if (chainId && data.chainId !== chainId) {
        dispatch({type:SET_GLOBAL_NETWORK_ERROR, payload: true})
      } else {
        dispatch({type:SET_GLOBAL_NETWORK_ERROR, payload: false})
      }
      dispatch({ type: GET_TOKENS, payload: data })
    }).catch((e) => {
       dispatch({type:SET_GLOBAL_SERVER_NOT_RESPONDED, payload: true})
    })
  }

  useEffect(() => {
    getTokens()  
    getFees()
  }, [account, chainId]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (globalServerNotResponded) {
    return (
      <Alert justifyContent='center' status='error'>
        <AlertIcon />
        Can not connect to bridge node
      </Alert>
    )
  } else if (globalNetworkError || (account && chainId !== tokensChainId) || (account && chainId === undefined)) {
    return (
      <Alert justifyContent='center' status='error'>
      <AlertIcon />
        Please choose chain id {tokensChainId}
      </Alert>
    )
  } else {
    return (
      <Routes>
      <Route path="/" element={<Navigate to="mint"/>}/>
      <Route path={ config.tab1Path } element={ <Card tabIndex={0}/>}/>
      <Route path={ config.tab2Path } element={ <Card tabIndex={1}/>}/>
      <Route
        path="*"
        element={
          <div>
            <h1><strong>404</strong></h1>
            <h2>Page not found</h2>
          </div>
        }
      />
    </Routes> 
    )     
  }
}
