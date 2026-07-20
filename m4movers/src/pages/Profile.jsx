import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Calendar, LogOut, Package, PlusCircle, Camera, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

const MAX_FILE_SIZE_MB = 2;

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    (async () => {
      setLoadingItems(true);
      const res = await api.get('/storage/my', { auth: true });
      if (res.items) setItems(res.items);
      setLoadingItems(false);
    })();
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file later
    if (!file) return;

    setAvatarError('');

    if (!file.type.startsWith('image/')) {
      setAvatarError('Please select an image file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setAvatarError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    setUploadingAvatar(true);
    const res = await api.post('/auth/avatar', { avatar: base64 }, { auth: true });
    setUploadingAvatar(false);

    if (!res.user) {
      setAvatarError(res.message || 'Could not update your profile picture.');
      return;
    }

    updateUser({ avatar: res.user.avatar });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="h-16 w-16 rounded-full bg-brand-light flex items-center justify-center text-brand overflow-hidden border border-slate-100 hover:opacity-90 transition-opacity"
                title="Change profile picture">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <User size={28} />
                )}
              </button>

              <button
                type="button"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-accent text-white flex items-center justify-center border-2 border-white hover:bg-orange-600 transition-colors disabled:opacity-60"
                title="Change profile picture">
                {uploadingAvatar ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Camera size={13} />
                )}
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
              <h1 className="font-display font-bold text-2xl text-navy">{user.name}</h1>
              <p className="text-sm text-slate-500">Your account details</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {avatarError && (
          <p className="mt-3 text-sm text-red-600">{avatarError}</p>
        )}

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-brand shrink-0">
              <Mail size={16} />
            </span>
            <div>
              <p className="text-xs text-slate-400">Email</p>
              <p className="text-sm font-semibold text-navy">{user.email}</p>
            </div>
          </div>

          {joinedDate && (
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-brand shrink-0">
                <Calendar size={16} />
              </span>
              <div>
                <p className="text-xs text-slate-400">Member Since</p>
                <p className="text-sm font-semibold text-navy">{joinedDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-display font-bold text-xl text-navy flex items-center gap-2">
            <Package size={20} className="text-brand" />
            My Stored Products
          </h2>
          <Link
            to="/store-product"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
            <PlusCircle size={16} />
            Store New Product
          </Link>
        </div>

        {loadingItems && (
          <p className="text-sm text-slate-500 text-center py-8">Loading your products...</p>
        )}

        {!loadingItems && items.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-8">
            You haven't stored any products yet.
          </p>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <h3 className="font-semibold text-navy">{item.product_name}</h3>
                <span className="text-xs text-slate-500">
                  {new Date(item.start_date).toLocaleDateString()} →{' '}
                  {new Date(item.end_date).toLocaleDateString()}
                </span>
              </div>
              {item.product_details && (
                <p className="text-sm text-ink mb-1">{item.product_details}</p>
              )}
              {item.description && (
                <p className="text-sm text-slate-500">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
