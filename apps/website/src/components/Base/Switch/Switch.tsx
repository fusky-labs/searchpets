interface BiroUISwitchProps {
  checked: boolean
  default: boolean
  onChange: (
    id: string,
    checked: boolean,
    event: React.SyntheticEvent<MouseEvent | KeyboardEvent> | MouseEvent
  ) => void
}

export default function Switch(props: BiroUISwitchProps) {
  return <div role="checkbox" aria-checked={props.checked}></div>
}
