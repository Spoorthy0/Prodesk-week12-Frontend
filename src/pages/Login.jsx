import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("General")

  const navigate = useNavigate()

  const handleJoin = () => {
    if (!name.trim()) return

    localStorage.setItem("name", name)
    localStorage.setItem("room", room)

    navigate("/chat")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-[var(--card)] border border-[var(--card-border)] p-6 rounded-xl w-full max-w-md">

        <h1 className="text-2xl font-semibold mb-5">
          Socket Chat
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="w-full border border-[var(--card-border)] rounded-lg p-3 mb-4 bg-[var(--input-bg)]"
        />

        <select
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-full border border-[var(--card-border)] rounded-lg p-3 mb-4 bg-[var(--input-bg)]"
        >
          <option>General</option>
          <option>Tech Support</option>
        </select>

        <button
          onClick={handleJoin}
          className="w-full bg-[var(--primary)] p-3 rounded-lg"
        >
          Join Chat
        </button>

      </div>
    </div>
  )
}

export default Login