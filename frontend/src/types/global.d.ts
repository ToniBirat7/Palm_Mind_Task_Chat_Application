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
}

interface ClientToServerEvents {
  message: (data: string) => void;
}
