import { HtmlHTMLAttributes } from "react"

import '../styles/button.scss'

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button className="button" {...props} />
    )
}