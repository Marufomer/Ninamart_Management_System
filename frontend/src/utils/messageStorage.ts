export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: "admin" | "staff";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  staffId: string;
  staffName: string;
  staffAvatar: string;
  subject: string;
  messages: ChatMessage[];
  unreadByAdmin: number;
  unreadByStaff: number;
  lastUpdated: string;
}

const STORAGE_KEY = "ninamart_messages";

const defaultConversations: Conversation[] = [
  {
    id: "conv-1",
    staffId: "2",
    staffName: "Ahmed Hassan",
    staffAvatar: "https://i.pravatar.cc/40?img=12",
    subject: "Registering new category request",
    unreadByAdmin: 1,
    unreadByStaff: 0,
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-1-1",
        senderId: "2",
        senderName: "Ahmed Hassan",
        senderAvatar: "https://i.pravatar.cc/40?img=12",
        senderRole: "staff",
        content:
          "Hi Admin, can you please add 'Smart Home' category to categories? We have new smart devices arriving next week and need it ready.",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "conv-2",
    staffId: "3",
    staffName: "Sara Ali",
    staffAvatar: "https://i.pravatar.cc/40?img=5",
    subject: "Low stock items alert",
    unreadByAdmin: 1,
    unreadByStaff: 0,
    lastUpdated: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-2-1",
        senderId: "3",
        senderName: "Sara Ali",
        senderAvatar: "https://i.pravatar.cc/40?img=5",
        senderRole: "staff",
        content:
          "iPhone 15 Pro stock is currently at 3 units. We need a replenishment order immediately before the weekend rush.",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: "conv-3",
    staffId: "4",
    staffName: "Omar Khalid",
    staffAvatar: "https://i.pravatar.cc/40?img=33",
    subject: "Return processed confirmation",
    unreadByAdmin: 0,
    unreadByStaff: 0,
    lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: "msg-3-1",
        senderId: "4",
        senderName: "Omar Khalid",
        senderAvatar: "https://i.pravatar.cc/40?img=33",
        senderRole: "staff",
        content:
          "Return for invoice INV-003 has been verified and processed back into inventory. Customer has been notified.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "msg-3-2",
        senderId: "1",
        senderName: "Admin",
        senderAvatar: "https://i.pravatar.cc/40?img=68",
        senderRole: "admin",
        content:
          "Thank you Omar. Good work processing that return promptly. Let me know if any similar cases arise.",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
      },
    ],
  },
];

export function getConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConversations));
      return defaultConversations;
    }
    return JSON.parse(raw) as Conversation[];
  } catch {
    return defaultConversations;
  }
}

export function saveConversations(conversations: Conversation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    /* ignore */
  }
}

export function addMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  senderRole: "admin" | "staff",
  content: string
): Conversation[] {
  const conversations = getConversations();
  const updated = conversations.map((conv) => {
    if (conv.id !== conversationId) return conv;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      senderAvatar,
      senderRole,
      content,
      timestamp: new Date().toISOString(),
    };
    return {
      ...conv,
      messages: [...conv.messages, newMsg],
      unreadByAdmin: senderRole === "staff" ? conv.unreadByAdmin + 1 : conv.unreadByAdmin,
      unreadByStaff: senderRole === "admin" ? conv.unreadByStaff + 1 : conv.unreadByStaff,
      lastUpdated: new Date().toISOString(),
    };
  });
  saveConversations(updated);
  return updated;
}

export function createConversation(
  staffId: string,
  staffName: string,
  staffAvatar: string,
  subject: string,
  messageContent: string
): Conversation[] {
  const conversations = getConversations();
  const newConv: Conversation = {
    id: `conv-${Date.now()}`,
    staffId,
    staffName,
    staffAvatar,
    subject,
    unreadByAdmin: 1,
    unreadByStaff: 0,
    lastUpdated: new Date().toISOString(),
    messages: [
      {
        id: `msg-${Date.now()}`,
        senderId: staffId,
        senderName: staffName,
        senderAvatar: staffAvatar,
        senderRole: "staff",
        content: messageContent,
        timestamp: new Date().toISOString(),
      },
    ],
  };
  const updated = [newConv, ...conversations];
  saveConversations(updated);
  return updated;
}

export function markAsRead(
  conversationId: string,
  readerRole: "admin" | "staff"
): Conversation[] {
  const conversations = getConversations();
  const updated = conversations.map((conv) => {
    if (conv.id !== conversationId) return conv;
    return {
      ...conv,
      unreadByAdmin: readerRole === "admin" ? 0 : conv.unreadByAdmin,
      unreadByStaff: readerRole === "staff" ? 0 : conv.unreadByStaff,
    };
  });
  saveConversations(updated);
  return updated;
}

export function deleteConversation(conversationId: string): Conversation[] {
  const conversations = getConversations();
  const updated = conversations.filter((c) => c.id !== conversationId);
  saveConversations(updated);
  return updated;
}

export function getUnreadCount(
  role: "admin" | "staff",
  staffId?: string
): number {
  const conversations = getConversations();
  if (role === "admin") {
    return conversations.reduce((sum, c) => sum + c.unreadByAdmin, 0);
  }
  return conversations
    .filter((c) => c.staffId === staffId)
    .reduce((sum, c) => sum + c.unreadByStaff, 0);
}

export function formatMessageTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
