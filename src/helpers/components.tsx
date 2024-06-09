import { IS_BROWSER } from "$fresh/runtime.ts";
import { FunctionComponent } from "preact";

export function defineClientOnlyComponent<P>(component: FunctionComponent<P>) {
    if (IS_BROWSER) {
        return component
    } else {
        return () => <>This component is not meant to render on server side.</>
    }
}
