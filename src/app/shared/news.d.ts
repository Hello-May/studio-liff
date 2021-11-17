declare interface Message {
  userId: LineUser['userId'],
  message: string;
  likeOrNot: boolean;
  createdAt: Date;
  updatedAt: Date;
}

declare interface News {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

