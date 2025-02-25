import { useEffect } from 'react';

export default function PlayPage() {

    useEffect(() => {
        fetch('http://localhost:3000/api/node/1')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));
    }
    , []);

    return (
        <div>
            **FYLL INN**
        </div>
    )
}