import { useState, useRef, useEffect } from "react";
import { Camera, Lock, Mail, Save, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StaffHeader from "../../components/staff/StaffHeader";
import { useAuth } from "../../context/AuthContext";
import { useStaffLayout } from "../../context/StaffLayoutContext";

export default function StaffProfile() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const { handleMenuClick } = useStaffLayout();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    if (!profileMessage && !passwordMessage) return;
    const timer = setTimeout(() => {
      setProfileMessage(null);
      setPasswordMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [profileMessage, passwordMessage]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileMessage(null);

    const result = updateProfile({ name: name.trim(), email: email.trim(), avatar });
    if (!result.success) {
      setProfileError(result.error ?? "Failed to update profile");
      return;
    }

    setProfileMessage("Profile updated successfully");
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    const result = changePassword(currentPassword, newPassword);
    if (!result.success) {
      setPasswordError(result.error ?? "Failed to change password");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Password changed successfully");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title="My Profile"
        titleShort="Profile"
        searchPlaceholder="Search profile settings..."
        showScanIcon={false}
      />

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="mb-4 text-base font-semibold text-slate-800">
              Profile Picture
            </h3>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src={avatar}
                  alt={name}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-100"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700"
                  aria-label="Change profile picture"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Upload a new photo
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG or GIF. Recommended size 400x400px.
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Choose Image
                </button>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleProfileSave}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6"
          >
            <h3 className="mb-4 text-base font-semibold text-slate-800">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <Mail className="h-3.5 w-3.5" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {profileError && (
              <p className="mt-3 text-sm text-red-600">{profileError}</p>
            )}
            {profileMessage && (
              <p className="mt-3 text-sm text-emerald-600">{profileMessage}</p>
            )}

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </button>
          </form>

          <form
            onSubmit={handlePasswordSave}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6"
          >
            <h3 className="mb-4 text-base font-semibold text-slate-800">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <Lock className="h-3.5 w-3.5" />
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {passwordError && (
              <p className="mt-3 text-sm text-red-600">{passwordError}</p>
            )}
            {passwordMessage && (
              <p className="mt-3 text-sm text-emerald-600">{passwordMessage}</p>
            )}

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Lock className="h-4 w-4" />
              Update Password
            </button>
          </form>

          <div className="rounded-2xl border border-red-100 bg-red-50/30 p-4 shadow-sm sm:p-6">
            <h3 className="mb-2 text-base font-semibold text-red-800">Sign Out</h3>
            <p className="text-xs text-slate-500 mb-4">
              Sign out of your account on this device. You will need to enter your credentials to log back in.
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
