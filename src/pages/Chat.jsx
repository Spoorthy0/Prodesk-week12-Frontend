import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000")

function Chat() {
  const navigate = useNavigate()

  const name = localStorage.getItem("name")

  const [room, setRoom] = useState(
    localStorage.getItem("room") || "General"
  )

  const [message, setMessage] = useState("")
  const [typing, setTyping] = useState("")

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages")

    return saved
      ? JSON.parse(saved)
      : {
          General: [],
          "Tech Support": []
        }
  })

  useEffect(() => {
    if (!name) {
      navigate("/")
      return
    }

    socket.emit("join-room", room)
  }, [room, name, navigate])

  useEffect(() => {
    localStorage.setItem(
      "chatMessages",
      JSON.stringify(messages)
    )
  }, [messages])

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => ({
        ...prev,
        [data.room]: [...prev[data.room], data]
      }))
    })

    socket.on("typing", (data) => {
      setTyping(`${data.name} is typing...`)

      const timer = setTimeout(() => {
        setTyping("")
      }, 1000)

      return () => clearTimeout(timer)
    })

    return () => {
      socket.off("message")
      socket.off("typing")
    }
  }, [])

  const sendMessage = () => {
    const text = message.trim()

    if (!text) return

    socket.emit("message", {
      name,
      room,
      text
    })

    setMessage("")
  }

  const handleTyping = (e) => {
    setMessage(e.target.value)

    socket.emit("typing", {
      name,
      room
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const switchRoom = (newRoom) => {
    setRoom(newRoom)
    localStorage.setItem("room", newRoom)
    setTyping("")
  }

  const logout = () => {
    localStorage.removeItem("name")
    localStorage.removeItem("room")

    navigate("/")
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">
            Welcome {name}
          </h2>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => switchRoom("General")}
            className={`px-4 py-2 rounded-lg ${
              room === "General"
                ? "bg-[var(--primary)]"
                : "bg-[var(--bg-alt)]"
            }`}
          >
            General
          </button>

          <button
            onClick={() => switchRoom("Tech Support")}
            className={`px-4 py-2 rounded-lg ${
              room === "Tech Support"
                ? "bg-[var(--primary)]"
                : "bg-[var(--bg-alt)]"
            }`}
          >
            Tech Support
          </button>
        </div>

        <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl h-[500px] overflow-y-auto p-4 mb-4 scrollbar-thin">
          {messages[room].length === 0 ? (
            <p className="text-[var(--text-muted)]">
              No messages yet
            </p>
          ) : (
            messages[room].map((msg, index) => (
              <div
                key={index}
                className="mb-3 p-3 rounded-lg bg-[var(--bg-alt)]"
              >
                <strong>[{msg.name}]</strong> : {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="h-6 text-sm text-[var(--text-muted)] mb-2">
          {typing}
        </div>

        <div className="flex gap-3">
          <input
            value={message}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            placeholder="Type message..."
            className="flex-1 border border-[var(--card-border)] rounded-lg p-3 bg-[var(--input-bg)]"
          />

          <button
            onClick={sendMessage}
            className="bg-[var(--primary)] px-6 rounded-lg"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}

export default Chat