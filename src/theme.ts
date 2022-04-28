import { extendTheme } from '@chakra-ui/react'
import { Styles } from '@chakra-ui/theme-tools';
import { mode } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: (props) => ({
    body: { 
      bg: mode('#f2f2f2', 'black')(props)}
  })
};

const theme = extendTheme({
  styles,
  layerStyles: {
    base: {
      bg: 'blue.50',
      border: '10px solid',
      borderColor: 'red.500',
    }
  }
})
export default theme
