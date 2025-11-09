interface Member {
  _id: string;
  name: string;
  status: boolean;
  avatar: string;
}

interface ServerToClientEvents {
  message: (data: string) => void;
}

interface ClientToServerEvents {
  message: (data: string) => void;
}
