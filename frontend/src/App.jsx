import { useEffect, useState } from "react"

export default function App() {

  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => setMsg(data.msg))
  }, [])

  return (
    <h1 className="text-amber-300">GeoRacer: {msg}</h1>
  )
}

