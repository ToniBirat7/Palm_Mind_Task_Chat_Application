// Types
interface UserPayload {
  email: string;
  password: string;
}

interface FormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  address: string;
}

interface Member {
  _id: string;
  name: string;
  status: boolean;
  avatar: string;
}
