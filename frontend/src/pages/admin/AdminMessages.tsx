import { useState } from "react";
import { Mail, Send, Search, Trash2 } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";

interface MessageItem {
  id: string;
  sender: string;
  avatar: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<MessageItem[]>([
    { id: "1", sender: "Ahmed Hassan", avatar: "https://i.pravatar.cc/40?img=12", subject: "Registering new category request", preview: "Hi Admin, can you please add 'Smart Home' category to categories? We have new smart devices arriving.", time: "10 mins ago", read: false },
    { id: "2", sender: "Sara Ali", avatar: "https://i.pravatar.cc/40?img=5", subject: "Low stock items alert", preview: "iPhone 15 Pro stock is currently at 3 units. We need a replenishment order immediately.", time: "1 hour ago", read: false },
    { id: "3", sender: "Omar Khalid", avatar: "https://i.pravatar.cc/40?img=33", subject: "Return processed confirmation", preview: "Return for invoice INV-003 has been verified and processed back into inventory.", time: "3 hours ago", read: true },
  ]);

  const [activeMsg, setActiveMsg] = useState<MessageItem | null>(messages[0]);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMsg) return;

    // Simulate reply message sending
    setReplyText("");
    alert(`Reply sent to ${activeMsg.sender}!`);
  };

  const markAsRead = (msg: MessageItem) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
    );
    setActiveMsg({ ...msg, read: true });
  };

  const deleteMessage = (id: string) => {
    const remaining = messages.filter((m) => m.id !== id);
    setMessages(remaining);
    if (activeMsg?.id === id) {
      setActiveMsg(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const filtered = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Team Messages"
      description={adminRoutes.messages.description}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Side: Message List */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-5 flex flex-col h-[500px]">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filtered.map((msg) => (
              <button
                key={msg.id}
                onClick={() => markAsRead(msg)}
                className={`w-full flex items-start gap-3 rounded-xl p-3 text-left border transition ${
                  activeMsg?.id === msg.id
                    ? "border-indigo-200 bg-indigo-50/20"
                    : "border-slate-50 hover:bg-slate-50/50"
                }`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="h-9 w-9 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${msg.read ? "text-slate-700" : "text-slate-900"}`}>
                      {msg.sender}
                    </span>
                    <span className="text-[9px] text-slate-400 shrink-0">{msg.time}</span>
                  </div>
                  <h4 className={`text-xs truncate ${!msg.read ? "font-bold text-slate-900" : "text-slate-655"}`}>
                    {msg.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{msg.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Message Details & Actions */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-7 flex flex-col h-[500px]">
          {activeMsg ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeMsg.avatar}
                      alt={activeMsg.sender}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-indigo-50"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{activeMsg.sender}</h4>
                      <p className="text-xs text-slate-400">to me</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteMessage(activeMsg.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                <div className="py-4">
                  <h3 className="text-sm font-bold text-slate-800">{activeMsg.subject}</h3>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                    {activeMsg.preview}
                  </p>
                </div>
              </div>

              {/* Reply Field */}
              <form onSubmit={handleSendMessage} className="border-t border-slate-100 pt-4 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${activeMsg.sender}...`}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-indigo-300 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-650 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-750 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-350">
              <Mail className="h-10 w-10 mb-2" />
              <p className="text-xs">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </AdminPageShell>
  );
}
