type Props = {
    number:number
    text:string
}

export function DateSquare(props:Props){
    return(
        <>
            <p>
                {props.number}
            </p>
            <p>
                {props.text}
            </p>
        </>
    )
}