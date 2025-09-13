"use client";

import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const localStreamRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // ✅ Save the stream so we can stop it later
        streamRef.current = stream;

        if (localStreamRef.current) {
          localStreamRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        toast.error(
          "Please allow access to your media devices to join the class"
        );
      }
    };

    fetchUserMedia();

    return () => {
      // ✅ Stop all tracks on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <div className="p-6 flex flex-col justify-center items-center text-center">
      <h1 className="text-lg sm:text-2xl font-bold mb-4">Lecture Call</h1>
      <video
        ref={localStreamRef}
        autoPlay
        playsInline
        muted
        className="h-64 border rounded-lg"
      />
      <div className="flex flex-col gap-4 mt-6">
        <Button className="bg-blue-800 w-[300px] py-2 px-6 hover:bg-blue-900">
          Join class
        </Button>
        <Link href={`/student/my-learning`}>
          <Button className="bg-white text-black hover:bg-white hover:text-black">
            Back to learning
          </Button>
        </Link>
      </div>
    </div>
  );
}
