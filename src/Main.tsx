import { Alert, AlertIcon, VStack } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Card from "./card/Card";
import { config } from "./config/config";

type Props = {}

export const Main: FC<Props> = () => {
    const { account, chainId } = useWeb3React()
    return (
      <VStack mt={-1} pt={1} minH='calc(93vh - 107px)'>
        { account && chainId !== config.evmNetwork.chainId ? 
        (
          <Alert  justifyContent='center' status='error'>
              <AlertIcon />
              Wrong network. Use chain with id {config.evmNetwork.chainId} 
          </Alert>
        ) : 
        (
          <Routes>
            <Route path="/" element={<Navigate to="mint"/>}/>
            <Route path={ config.tab1Path } element={ <Card tabIndex={0}/>}/>
            <Route path={ config.tab2Path } element={ <Card tabIndex={1}/>}/>
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Routes>      
        )
        }  
      </VStack>    
    )
}
