import { useEffect } from 'react';

export default function useFetch() {
    useEffect(() => {
        fetch('http://localhost:3000/api/feedback')
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
    });

    return(null);
}