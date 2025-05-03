// src/app/(dashboard)/message/page.tsx
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
}

export default function MessagePage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const dummyMessages: Message[] = [
      { id: 1, sender: 'John Doe', subject: 'Job Application Inquiry', content: 'Hello, I am interested in the Full Stack Developer position...', timestamp: '2023-03-01 14:30' },
      { id: 2, sender: 'Jane Smith', subject: 'Follow-up on Interview', content: 'Thank you for the interview opportunity. I wanted to follow up...', timestamp: '2023-03-02 10:15' },
      { id: 3, sender: 'Michael Brown', subject: 'Request for More Information', content: 'Could you provide more details about the Data Analyst role?', timestamp: '2023-03-03 09:45' },
    ];

    setMessages(dummyMessages);
    setSelectedMessage(dummyMessages[dummyMessages.length - 1]);
  }, [currentUser, router]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Floating Nav */}
        <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
          <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
            <button onClick={() => router.back()} className="text-white hover:text-yellow-400 transition flex items-center">
              <FiArrowLeft className="mr-1" /> Geri
            </button>
            <div className="text-xl font-bold">Mesajlar</div>
          </div>
        </nav>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <div className="flex h-[calc(100vh-12rem)] gap-6">
            {/* Left: Message List */}
            <div className="w-1/3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`cursor-pointer p-4 mb-2 rounded-xl transition ${
                    selectedMessage?.id === msg.id ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <h5 className="font-bold text-yellow-400">{msg.subject}</h5>
                  <p className="text-sm text-blue-200">{msg.sender}</p>
                  <p className="text-xs text-blue-200 mt-1">{msg.timestamp}</p>
                </div>
              ))}
            </div>

            {/* Right: Message Content & Composer */}
            <div className="w-2/3 flex flex-col bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              {/* Message flow */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {selectedMessage ? (
                  <div>
                    <h4 className="text-2xl font-bold text-yellow-400 mb-4">{selectedMessage.subject}</h4>
                    <div className="space-y-4">
                      {/* Simulated conversation flow: for now, only single message */}
                      <div className="p-4 bg-white/20 rounded-lg">
                        <p className="text-blue-900"><strong>{selectedMessage.sender}:</strong> {selectedMessage.content}</p>
                        <p className="text-xs mt-2 text-blue-200 text-right">{selectedMessage.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-200">Mesaj seçiniz.</p>
                )}
              </div>

              {/* Composer */}
              <div className="p-4 border-t border-white/20">
                <textarea
                  className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 resize-none focus:outline-none"
                  rows={3}
                  placeholder="Mesaj yaz..."
                />
                <button className="mt-3 px-5 py-2 bg-yellow-400 text-black rounded-xl float-right hover:bg-yellow-300 transition">
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
