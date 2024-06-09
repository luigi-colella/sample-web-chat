import { FunctionComponent } from "preact";
import { defineClientOnlyComponent } from "../helpers/components.tsx";

interface ButtonProps {
    onClick: () => void
}

const Button: FunctionComponent<ButtonProps> = defineClientOnlyComponent((props) => (
    <button class="bg-sky-200 rounded p-1 hover:bg-sky-300 transition-colors" onClick={props.onClick}>
        { props.children }
    </button>
))

export default Button
