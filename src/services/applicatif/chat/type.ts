export type Message = {
  _id: string;
  text: string;
  createdAt: number;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  files?: string;
};

export type IAPIMessage = {
  id: string;
  date: {
    value: string;
    label: string;
  };
  owner: {
    cs: boolean;
    label: string;
  };
  content: {
    value: string;
  };
}[];
