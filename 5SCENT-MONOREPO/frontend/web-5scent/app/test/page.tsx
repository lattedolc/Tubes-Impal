"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TestPage() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/test")
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Gagal terhubung ke Laravel API 😭");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">🔗 Test Koneksi ke Laravel</h1>
      <div className="bg-white p-6 rounded-2xl shadow-md text-lg">
        {message}
      </div>
    </main>
  );
}
