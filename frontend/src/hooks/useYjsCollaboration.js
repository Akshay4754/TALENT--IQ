import { useEffect, useRef, useState, useCallback } from "react";
import * as Y from "yjs";

const COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#7c3aed", "#0891b2"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// Build the WebSocket URL for Yjs sync
function getWsUrl(roomId) {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    // Production: derive WS URL from the backend API URL (e.g. https://backend.onrender.com/api -> wss://backend.onrender.com/yjs/room)
    const url = new URL(apiUrl);
    const protocol = url.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${url.host}/yjs/${roomId}`;
  }
  // Dev: use Vite proxy on same host
  const loc = window.location;
  const protocol = loc.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${loc.host}/yjs/${roomId}`;
}

export default function useYjsCollaboration(roomId, userInfo) {
  const ydocRef = useRef(null);
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [peers, setPeers] = useState(1);
  const [ready, setReady] = useState(false);
  const reconnectTimer = useRef(null);
  const userColor = useRef(getRandomColor());

  useEffect(() => {
    if (!roomId) return;

    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // Listen for local doc updates and send to server
    const onUpdate = (update, origin) => {
      if (origin === "remote") return; // don't echo back
      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "update", data: Array.from(update) }));
      }
    };
    ydoc.on("update", onUpdate);

    function connect() {
      const ws = new WebSocket(getWsUrl(roomId));
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        // Send awareness info
        ws.send(
          JSON.stringify({
            type: "awareness",
            data: {
              name: userInfo?.name || "Anonymous",
              color: userColor.current,
              id: userInfo?.id || "unknown",
            },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "sync") {
            // Initial full state from server
            const state = new Uint8Array(msg.data);
            Y.applyUpdate(ydoc, state, "remote");
            setReady(true);
          } else if (msg.type === "update") {
            // Incremental update from another user
            const update = new Uint8Array(msg.data);
            Y.applyUpdate(ydoc, update, "remote");
          } else if (msg.type === "awareness") {
            // Could track remote users here if needed
            setPeers((p) => Math.max(p, 2));
          }
        } catch {}
      };

      ws.onclose = () => {
        setConnected(false);
        // Auto-reconnect after 2s
        reconnectTimer.current = setTimeout(() => {
          if (ydocRef.current) connect();
        }, 2000);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer.current);
      ydoc.off("update", onUpdate);
      if (wsRef.current) {
        wsRef.current.onclose = null; // prevent reconnect on intentional close
        wsRef.current.close();
        wsRef.current = null;
      }
      ydoc.destroy();
      ydocRef.current = null;
      setConnected(false);
      setReady(false);
      setPeers(1);
    };
  }, [roomId, userInfo?.id]);

  const setSharedCode = useCallback((newCode) => {
    const ydoc = ydocRef.current;
    if (!ydoc) return;
    const ytext = ydoc.getText("monacoContent");
    ydoc.transact(() => {
      ytext.delete(0, ytext.length);
      if (newCode) ytext.insert(0, newCode);
    });
  }, []);

  const getSharedCode = useCallback(() => {
    const ydoc = ydocRef.current;
    if (!ydoc) return "";
    return ydoc.getText("monacoContent").toString();
  }, []);

  return {
    ydoc: ydocRef.current,
    provider: null, // no provider needed — awareness handled via WS
    connected,
    peers,
    ready,
    setSharedCode,
    getSharedCode,
  };
}
