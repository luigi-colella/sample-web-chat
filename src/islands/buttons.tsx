import { defineClientOnlyComponent } from "../helpers/components.tsx";

interface ButtonProps {
    onClick: () => void
}

const Button = defineClientOnlyComponent<ButtonProps>((props) => (
    <button class="bg-sky-200 rounded p-1 hover:bg-sky-300 transition-colors" onClick={props.onClick}>
        { props.children }
    </button>
))

export default Button
