// src/app/(dashboard)/message/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';
import api from '@/lib/api';

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  sentAt: string;
}

interface UserProfile {
  id: number;
  name: string;
}

export default function MessagePage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const prefilledReceiverId = searchParams.get('id');
  const prefilledReceiverName = searchParams.get('user');

  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (prefilledReceiverId) {
      setReceiverId(prefilledReceiverId);
      setReceiverName(prefilledReceiverName || '');
      setSelectedUserId(prefilledReceiverId);
    }

    const fetchMessages = async () => {
      try {
        const res = await api.get<Message[]>(`/message/user/${currentUser.id}`);
        setMessages(res.data);

        // Fetch unique user IDs to map to names
        const userIds = Array.from(
          new Set(
            res.data.flatMap((msg) => [msg.senderId, msg.receiverId])
          )
        ).filter((id) => id !== String(currentUser.id));

        const nameMap: Record<string, string> = {};
        for (const id of userIds) {
          const profileRes = await api.get<UserProfile>(`/auth/profile/${id}`);
          nameMap[id] = profileRes.data.name;
        }
        setUserMap(nameMap);
      } catch (error) {
        console.error('Mesajlar alınamadı:', error);
      }
    };

    fetchMessages();
  }, [currentUser, prefilledReceiverId, prefilledReceiverName, router]);

  const handleSend = async () => {
    if (!newMessage.trim() || !receiverId) return;

    const payload = {
      senderId: String(currentUser?.id),
      receiverId,
      content: newMessage,
    };

    try {
      const res = await api.post<Message>('/message/send', payload);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
    }
  };

  const conversationUsers = Array.from(
    new Set(
      messages.map((msg) =>
        msg.senderId === String(currentUser?.id)
          ? msg.receiverId
          : msg.senderId
      )
    )
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
        {/* Navbar */}
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
            {/* Message List */}
            <div className="w-1/3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 overflow-y-auto">
              {conversationUsers.map((userId) => (
                <div
                  key={userId}
                  onClick={() => {
                    setSelectedUserId(userId);
                    setReceiverId(userId);
                    setReceiverName(userMap[userId] || '');
                  }}
                  className={`cursor-pointer p-4 mb-2 rounded-xl transition ${
                    selectedUserId === userId ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <h5 className="font-bold text-yellow-400">
                    {userMap[userId] || `Kullanıcı #${userId}`}
                  </h5>
                </div>
              ))}
            </div>

            {/* Message Viewer & Composer */}
            <div className="w-2/3 flex flex-col bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              {/* Message viewer */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {selectedUserId ? (
                [...messages]
                  .reverse()
                  .filter(
                    (msg) =>
                      (msg.senderId === String(currentUser?.id) && msg.receiverId === selectedUserId) ||
                      (msg.senderId === selectedUserId && msg.receiverId === String(currentUser?.id))
                  )
                  .map((msg) => {
                    const isCurrentUserSender = msg.senderId === String(currentUser?.id);
                    const alignment = isCurrentUserSender ? 'justify-end' : 'justify-start';
                    const bubbleColor = isCurrentUserSender ? 'bg-yellow-100 text-black' : 'bg-white/20 text-white';
                    const textAlign = isCurrentUserSender ? 'text-right' : 'text-left';

                    return (
                      <div key={msg.id} className={`flex ${alignment}`}>
                        <div className={`max-w-[70%] ${bubbleColor} ${textAlign} p-3 rounded-xl`}>
                          <p>{msg.content}</p>
                          <p className="text-xs mt-2 text-blue-200">{new Date(msg.sentAt).toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p className="text-blue-200">Bir kişi seçin...</p>
              )}
            </div>


              {/* Composer */}
              <div className="p-4 border-t border-white/20">
                <textarea
                  className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3 resize-none focus:outline-none"
                  rows={3}
                  placeholder={`Mesaj yaz...${receiverName ? ` (${receiverName})` : ''}`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSend}
                  className="mt-3 px-5 py-2 bg-yellow-400 text-black rounded-xl float-right hover:bg-yellow-300 transition"
                >
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
