import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";

export default function SelectWalletModal({ isOpen, closeModal } : any) {
  const { activate } = useWeb3React();

  const setProvider = (type: string) => {
    window.localStorage.setItem("provider", type);
    
  }
  const connectMetamask = () => {
    activate(connectors.injected);
    setProvider("injected");
  }

  const connectWalletConnect = () => {
    activate(connectors.walletConnect, (error: Error) => {
      console.log(error);
    });
    setProvider("walletConnect");
  }
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none"
          }}
        />
        <ModalBody paddingBottom="3.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                connectMetamask();
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/mm.png"
                  alt="Metamask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Metamask</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                connectWalletConnect();
                closeModal();
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/wc.png"
                  alt="Wallet Connect Logo"
                  width={26}
                  height={26}
                  borderRadius="3px"
                />
                <Text>Wallet Connect</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
