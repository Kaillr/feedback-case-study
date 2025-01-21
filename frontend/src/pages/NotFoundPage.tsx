import { useEffect } from 'react'
import Header from "../components/Header";

export default function NotFoundPage() {
    useEffect(() => {
        document.title = "404 - Protector Forsikring"
    })

    return (
        <>
            <Header />
            <main>
                <h1>Beklager, vi finner ikke siden (404)</h1>
            </main>
        </>
    )
}