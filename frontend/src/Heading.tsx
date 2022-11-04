
type Props = {
    text: string
}

export function Heading(props: Props) {
    return (
        <h1>
            {props.text}
        </h1>
    )
}