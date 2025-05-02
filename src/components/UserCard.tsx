interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface Props {
    user: User;
    onMessage?: () => void;
  }
  
  export default function UserCard({ user, onMessage }: Props) {
    return (
      <div className="border p-4 rounded shadow-sm">
        <h4 className="font-bold text-blue-700">{user.name}</h4>
        <p className="text-sm text-gray-600">{user.email}</p>
        {onMessage && (
          <button
            onClick={onMessage}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Mesaj Gönder
          </button>
        )}
      </div>
    );
  }
  