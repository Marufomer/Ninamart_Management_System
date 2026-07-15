import { useState, useEffect, useRef } from "react";
import {
  Send,
  MessageSquare,
  ArrowLeft,
  Plus,
  X,
  Inbox,
} from "lucide-react";
import StaffHeader from "../../components/staff/StaffHeader";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import { useAuth } from "../../context/AuthContext";
import {
  getConversations,
  addMessage,
  createConversation,
  markAsRead,
  formatMessageTime,
  type Conversation,
} from "../../utils/messageStorage";

const ADMIN = {
  id: "1",
  name: "Admin",
  avatar: "https://i.pravatar.cc/40?img=68",
};

export default function StaffMessages() {
  const { handleMenuClick } = useStaffLayout();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState("");
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load only this staff member's conversations
  const loadMyConversations = () => {
    const all = getConversations();
    return all.filter((c) => c.staffId === user?.id);
  };

  useEffect(() => {
    const mine = loadMyConversations();
    setConversations(mine);
    if (mine.length > 0) setActiveConv(mine[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages]);

  const handleSelectConv = (conv: Conversation) => {
    const updated = markAsRead(conv.id, "staff");
    const mine = updated.filter((c) => c.staffId === user?.id);
    setConversations(mine);
    setActiveConv(mine.find((c) => c.id === conv.id) ?? conv);
    setMobileShowDetail(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConv || !user) return;
    const updated = addMessage(
      activeConv.id,
      user.id,
      user.name,
      user.avatar ?? ADMIN.avatar,
      "staff",
      replyText.trim()
    );
    const mine = updated.filter((c) => c.staffId === user.id);
    setConversations(mine);
    setActiveConv(mine.find((c) => c.id === activeConv.id) ?? null);
    setReplyText("");
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim() || !user) return;
    const updated = createConversation(
      user.id,
      user.name,
      user.avatar ?? ADMIN.avatar,
      newSubject.trim(),
      newMessage.trim()
    );
    const mine = updated.filter((c) => c.staffId === user.id);
    setConversations(mine);
    setActiveConv(mine[0]);
    setShowNewModal(false);
    setNewSubject("");
    setNewMessage("");
    setMobileShowDetail(true);
  };

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadByStaff, 0);

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery=""
        onSearchChange={() => {}}
        title="Messages"
        titleShort="Messages"
        searchPlaceholder="Search messages..."
        showScanIcon={false}
      />

      <div className="flex flex-1 overflow-hidden p-3 sm:p-4">
        <div
          className="flex w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
          style={{ height: "calc(100vh - 170px)", minHeight: "480px" }}
        >
          {/* ── LEFT PANEL ── */}
          <div
            className={`flex flex-col border-r border-slate-100 ${
              mobileShowDetail ? "hidden lg:flex" : "flex"
            } w-full lg:w-[300px] xl:w-[340px] shrink-0`}
          >
            {/* Header */}
            <div className="border-b border-slate-100 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                    <Inbox className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">My Messages</p>
                    {totalUnread > 0 && (
                      <p className="text-[10px] font-medium text-indigo-600">{totalUnread} unread</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowNewModal(true)}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  <Plus className="h-3 w-3" />
                  New
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 p-6 gap-2">
                  <MessageSquare className="h-10 w-10" />
                  <p className="text-xs text-center text-slate-400">No messages yet</p>
                  <button
                    onClick={() => setShowNewModal(true)}
                    className="mt-1 text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Send a message to Admin →
                  </button>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConv(conv)}
                    className={`w-full flex items-start gap-3 px-3 py-3.5 text-left border-b border-slate-50 transition hover:bg-slate-50 ${
                      activeConv?.id === conv.id
                        ? "bg-indigo-50/60 border-l-2 border-l-indigo-500"
                        : ""
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={ADMIN.avatar}
                        alt="Admin"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      {conv.unreadByStaff > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                          {conv.unreadByStaff}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-700 truncate">Admin</span>
                        <span className="text-[9px] text-slate-400 shrink-0 whitespace-nowrap">
                          {formatMessageTime(conv.lastUpdated)}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 ${conv.unreadByStaff > 0 ? "font-semibold text-slate-800" : "text-slate-500"}`}>
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
                    src={ADMIN.avatar}
                    alt="Admin"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-800">Admin</h4>
                    <p className="text-[11px] text-slate-400 truncate">{activeConv.subject}</p>
                  </div>
                </div>

                {/* Messages Bubbles */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  {activeConv.messages.map((msg) => {
                    const isMe = msg.senderRole === "staff";
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <img
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          className="h-7 w-7 rounded-full object-cover shrink-0"
                        />
                        <div className={`max-w-[75%] flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                          <div
                            className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                              isMe
                                ? "rounded-br-sm bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
                                : "rounded-bl-sm bg-white text-slate-700 border border-slate-100"
                            }`}
                          >
                            {msg.content}
                          </div>
                          <span className="text-[9px] text-slate-400 px-1">
                            {isMe ? "You" : "Admin"} · {formatMessageTime(msg.timestamp)}
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
                      placeholder="Reply to Admin..."
                      className="flex-1 min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2">
                <MessageSquare className="h-12 w-12 mb-1" />
                <p className="text-sm font-medium text-slate-400">No conversation selected</p>
                <button
                  onClick={() => setShowNewModal(true)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Start a new message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── New Thread Modal ── */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">New Message to Admin</h3>
                <p className="text-xs text-slate-400 mt-0.5">Start a new conversation thread</p>
              </div>
              <button
                onClick={() => setShowNewModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateThread} className="p-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Low stock report, Overtime request..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your message to the Admin..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newSubject.trim() || !newMessage.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
