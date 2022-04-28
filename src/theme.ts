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
 
  styles
})
export default theme
