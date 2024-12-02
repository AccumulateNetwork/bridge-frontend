import { Alert, AlertIcon, Box, VStack, Button, ButtonGroup } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import Card from "./card/Card";
import { Chains } from "./chains";
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
  const { tokensChainId, globalServerNotResponded, dispatch } = useStore()

  const switchNetwork = async (chainId: any) => {    
      try {
        await  (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(chainId) }],
          });
      } catch (switchError) {
        console.log(switchError)
      }
  }

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
      <>
      { tokensChainId &&
      <ButtonGroup gap='4' mb='10'>
        <Button as='a' href='https://bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 1 ? 'solid' : 'outline'}>Ethereum</Button>
        <Button as='a' href='https://bnb-bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 56 ? 'solid' : 'outline'}>BNB Chain</Button>
        <Button as='a' href='https://arb-bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 42161 ? 'solid' : 'outline'}>Arbitrum</Button>
      </ButtonGroup>
      }
      <Alert justifyContent='center' status='error'>
        <AlertIcon />
        Can not connect to bridge node
      </Alert>
      </>
    )
  } else {
    const chainLabel = Chains.get(tokensChainId)
    return (
      <Box>
        { tokensChainId &&
        <ButtonGroup gap='4' mb='10'>
          <Button as='a' href='https://bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 1 ? 'solid' : 'outline'}>Ethereum</Button>
          <Button as='a' href='https://bnb-bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 56 ? 'solid' : 'outline'}>BNB Chain</Button>
          <Button as='a' href='https://arb-bridge.accumulatenetwork.io' colorScheme='blue' size='lg' variant={tokensChainId === 42161 ? 'solid' : 'outline'}>Arbitrum</Button>
        </ButtonGroup>
        }

        { tokensChainId && chainId !== tokensChainId ? 
         <Alert mb={10} maxWidth={400} justifyContent='center' status='error' variant='subtle' flexDirection='column' alignItems='center' textAlign='center'>
           <p>Please connect to <strong>{chainLabel}</strong> to use the bridge</p>
           <Button size={'lg'} colorScheme='red' mt={3} mb={1} onClick={() => switchNetwork(tokensChainId)}>Switch network</Button>
         </Alert> : null
        }
        <Routes>
          <Route path="/" element={<Navigate to="mint"/>}/>
          <Route path={ config.tab1Path } element={ <Card tabIndex={0}/>}/>
          <Route path={ config.tab2Path } element={ <Card tabIndex={1}/>}/>
          <Route path={ "/tx/:transactionHash" } element={ <Card/>}/>
          <Route
            path="*"
            element={
              <Alert mb={10} maxWidth={400} justifyContent='center' status='error' alignItems='center' textAlign='center'>
                <AlertIcon />
                <p>Page Not Found</p>
              </Alert>
            }
          />
        </Routes> 
      </Box>
    )     
  }
}
