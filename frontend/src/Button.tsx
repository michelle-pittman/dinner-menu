type Props = {
    text:string;
    onClick:() => void;
}

export function Button(props:Props){
    return (
        <button type="button" onClick={props.onClick}>
            {props.text}
        </button>
      );
}