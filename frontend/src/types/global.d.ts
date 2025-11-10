import type { Socket } from "socket.io-client";

declare global {
  interface Member {
    _id: string;
    name: string;
    status: boolean;
    avatar: string;
  }

  interface ServerToClientEvents {
    message: (data: string) => void;
    member: (memberData: Member) => void;
    receive_message: (data: any) => void;
    receive_private_message: (newMessage: Message) => void;
  }

  interface ClientToServerEvents {
    message: (data: string) => void;
    "private-room": (data: string) => void;
    send_private_message: (newMessage: Message, user: string) => void;
    send_message: (newMessage: Message, user: string) => void;
    "join-room": (grpId: string) => void;
  }

  interface ChatWindowProps {
    selectedUser: Member | null;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  }

  interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date | string;
  }

  interface GroupChatWindowProps {
    selectedGroup: {
      id: string;
      name: string;
      avatar: string;
      memberCount: number;
    } | null;
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  }

  interface GroupMessage {
    id: string;
    text: string;
    sender: string;
    receiver: "_chat_room";
    timestamp: Date | string;
  }

  interface SocketContextType {
    socket: Socket | null;
    members: Member[];
  }
}
