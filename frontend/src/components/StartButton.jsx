export default function StartButton( {title, onClick} ) {
    return (
        <button onClick={onClick}>
            {title}
        </button>
    )
}