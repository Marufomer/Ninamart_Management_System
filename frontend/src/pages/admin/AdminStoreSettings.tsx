import { useState } from "react";
import { Store, Save, Building, Phone, Mail, DollarSign, Percent } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminStoreSettings() {
  const [storeName, setStoreName] = useState("NinaMart");
  const [email, setEmail] = useState("info@ninamart.com");
  const [phone, setPhone] = useState("+251 912 345678");
  const [currency, setCurrency] = useState("ETB (Br)");
  const [taxRate, setTaxRate] = useState("15");
  const [address, setAddress] = useState("Bole Road, Addis Ababa, Ethiopia");
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Store settings updated successfully");
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <AdminPageShell
      title="Store Settings"
      description={adminRoutes.storeSettings.description}
    >
      <form onSubmit={handleSave} className="mx-auto max-w-3xl space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Store className="h-5 w-5 text-indigo-500" />
            General Information
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Building className="h-3.5 w-3.5" />
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Mail className="h-3.5 w-3.5" />
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Phone className="h-3.5 w-3.5" />
                Store Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-indigo-500" />
            Financial Configuration
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="ETB (Br)">ETB (Br) - Ethiopian Birr</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Percent className="h-3.5 w-3.5" />
                Value Added Tax (VAT) Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {message && <p className="text-sm font-semibold text-emerald-600">{message}</p>}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </form>
    </AdminPageShell>
  );
}
