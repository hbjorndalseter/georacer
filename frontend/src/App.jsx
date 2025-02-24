import { useEffect, useState } from "react"

export default function App() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/players') // Endepunktet i backend
      .then(response => response.json())
      .then(data => setMsg(data.length > 0 ? `Fant ${data.length} spillere!` : "Ingen spillere funnet."))
      .catch(error => console.error("Feil ved henting av data:", error));
  }, [])

  return (
    <h1 className="text-amber-300">GeoRacer: {msg}</h1>
  )
}