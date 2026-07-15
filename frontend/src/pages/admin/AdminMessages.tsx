import { useState, useEffect, useRef } from "react";
import { Mail, Send, Search, Trash2, ArrowLeft, MessageSquare, CheckCheck } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";
import { useAuth } from "../../context/AuthContext";
import {
  getConversations,
  addMessage,
  markAsRead,
  deleteConversation,
  formatMessageTime,
  type Conversation,
} from "../../utils/messageStorage";

export default function AdminMessages() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from storage on mount
  useEffect(() => {
    const loaded = getConversations();
    setConversations(loaded);
    if (loaded.length > 0) setActiveConv(loaded[0]);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages]);

  const handleSelectConv = (conv: Conversation) => {
    const updated = markAsRead(conv.id, "admin");
    setConversations(updated);
    const fresh = updated.find((c) => c.id === conv.id) ?? conv;
    setActiveConv(fresh);
    setMobileShowDetail(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConv || !user) return;
    const updated = addMessage(
      activeConv.id,
      user.id,
      user.name,
      user.avatar ?? "https://i.pravatar.cc/40?img=68",
      "admin",
      replyText.trim()
    );
    setConversations(updated);
    setActiveConv(updated.find((c) => c.id === activeConv.id) ?? null);
    setReplyText("");
  };

  const handleDelete = (id: string) => {
    const updated = deleteConversation(id);
    setConversations(updated);
    if (activeConv?.id === id) {
      setActiveConv(updated.length > 0 ? updated[0] : null);
      setMobileShowDetail(false);
    }
  };

  const filtered = conversations.filter(
    (c) =>
      c.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadByAdmin, 0);

  return (
    <AdminPageShell
      title="Team Messages"
      description={adminRoutes.messages.description}
    >
      <div className="flex gap-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>

        {/* ── LEFT PANEL: Conversation List ── */}
        <div
          className={`flex flex-col border-r border-slate-100 ${
            mobileShowDetail ? "hidden lg:flex" : "flex"
          } w-full lg:w-[320px] xl:w-[360px] shrink-0`}
        >
          {/* Search bar */}
          <div className="border-b border-slate-100 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Inbox</p>
                  {totalUnread > 0 && (
                    <p className="text-[10px] text-indigo-600 font-medium">{totalUnread} unread</p>
                  )}
                </div>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 p-6">
                <Mail className="h-10 w-10 mb-2" />
                <p className="text-xs text-center">No messages found</p>
              </div>
            ) : (
              filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConv(conv)}
                  className={`w-full flex items-start gap-3 px-3 py-3.5 text-left border-b border-slate-50 transition hover:bg-slate-50 ${
                    activeConv?.id === conv.id ? "bg-indigo-50/60 border-l-2 border-l-indigo-500" : ""
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.staffAvatar}
                      alt={conv.staffName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {conv.unreadByAdmin > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                        {conv.unreadByAdmin}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-semibold truncate ${conv.unreadByAdmin > 0 ? "text-slate-900" : "text-slate-700"}`}>
                        {conv.staffName}
                      </span>
                      <span className="text-[9px] text-slate-400 shrink-0 whitespace-nowrap">
                        {formatMessageTime(conv.lastUpdated)}
                      </span>
                    </div>
                    <p className={`text-[11px] truncate mt-0.5 ${conv.unreadByAdmin > 0 ? "font-semibold text-slate-800" : "text-slate-500"}`}>
                      {conv.subject}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {conv.messages[conv.messages.length - 1]?.content}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Chat Detail ── */}
        <div
          className={`flex flex-col flex-1 min-w-0 ${
            mobileShowDetail ? "flex" : "hidden lg:flex"
          }`}
        >
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 bg-white">
                <button
                  onClick={() => setMobileShowDetail(false)}
                  className="lg:hidden shrink-0 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 transition"
                  aria-label="Back to list"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <img
                  src={activeConv.staffAvatar}
                  alt={activeConv.staffName}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{activeConv.staffName}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{activeConv.subject}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      const updated = markAsRead(activeConv.id, "admin");
                      setConversations(updated);
                      setActiveConv(updated.find((c) => c.id === activeConv.id) ?? null);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition"
                    title="Mark all as read"
                  >
                    <CheckCheck className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(activeConv.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Bubbles */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                {activeConv.messages.map((msg) => {
                  const isAdmin = msg.senderRole === "admin";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${isAdmin ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="h-7 w-7 rounded-full object-cover shrink-0"
                      />
                      <div className={`max-w-[75%] ${isAdmin ? "items-end" : "items-start"} flex flex-col gap-1`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                            isAdmin
                              ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                              : "rounded-bl-sm bg-white text-slate-700 border border-slate-100"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <span className="text-[9px] text-slate-400 px-1">
                          {isAdmin ? "You" : msg.senderName} · {formatMessageTime(msg.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply Box */}
              <div className="border-t border-slate-100 bg-white p-3">
                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeConv.staffName}...`}
                    className="flex-1 min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-300">
              <MessageSquare className="h-12 w-12 mb-3" />
              <p className="text-sm font-medium text-slate-400">Select a conversation</p>
              <p className="text-xs text-slate-300 mt-1">Choose from the list on the left</p>
            </div>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
