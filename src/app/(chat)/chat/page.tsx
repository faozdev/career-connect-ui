// src/app/(chat)/chat/page.tsx

'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
}

export default function ChatPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!currentUser) {
      router.push('/(auth)/login');
      return;
    }

    // Dummy kişiler
    const dummyContacts: Contact[] = currentUser.type === 'employer'
      ? [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]
      : [{ id: 3, name: 'Acme Inc.' }, { id: 4, name: 'Tech Solutions' }];

    const dummyMessages: Message[] = [
      { id: 1, senderId: currentUser.id, receiverId: dummyContacts[0].id, content: 'Merhaba!', timestamp: '10:00' },
      { id: 2, senderId: dummyContacts[0].id, receiverId: currentUser.id, content: 'Selam, nasıl yardımcı olabilirim?', timestamp: '10:02' }
    ];

    setContacts(dummyContacts);
    setMessages(dummyMessages);
    setActiveContact(dummyContacts[0]);
  }, [currentUser, router]);

  const handleSend = () => {
    if (!input.trim() || !activeContact) return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: currentUser!.id,
      receiverId: activeContact.id,
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

  const activeMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser?.id && m.receiverId === activeContact?.id) ||
      (m.senderId === activeContact?.id && m.receiverId === currentUser?.id)
  );

  return (
    <div className="flex max-w-6xl mx-auto mt-10 border rounded shadow h-[600px] overflow-hidden">
      {/* Sol Panel */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="font-bold mb-4 text-blue-600">Sohbetler</h3>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-3 rounded cursor-pointer mb-2 ${activeContact?.id === contact.id ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
            onClick={() => setActiveContact(contact)}
          >
            {contact.name}
          </div>
        ))}
      </div>

      {/* Sağ Panel */}
      <div className="w-2/3 flex flex-col bg-white">
        <div className="p-4 border-b font-semibold text-blue-700">
          {activeContact?.name || 'Kişi Seçin'}
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] p-2 rounded ${
                msg.senderId === currentUser?.id
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] mt-1 text-right opacity-80">{msg.timestamp}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Mesaj yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
