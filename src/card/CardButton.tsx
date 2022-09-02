import { Button } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  title: string,
  disabled?: boolean,
  onClick?: () => void,
}

export const CardButton: FC<Props> = (props) => {
  return (
    <Button disabled={props.disabled}
      colorScheme='blue' 
      bg='#006FE8' 
      w='100%' 
      borderRadius='15px' 
      mt='50px' 
      size='lg'
      p='7'
      onClick={props.onClick}>
        { props.title }
    </Button>
  )
}