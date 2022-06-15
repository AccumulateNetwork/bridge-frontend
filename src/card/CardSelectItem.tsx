import { FC } from "react"

type Props = {
  symbol: string
}

export const CardSelectItem: FC<Props> = (props): JSX.Element => {
  return <option value={props.symbol}>{ props.symbol }</option>
}