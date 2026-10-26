import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Edit2, Trash2, RefreshCw, LogOut, CheckCircle, ExternalLink, ShieldCheck, Database } from 'lucide-react';

const API_BASE = 'http://localhost:5050/api';

export default function AdminPortal() {
  const [token, setToken] = useState(() => localStorage.getItem('mod7_admin_token') || '');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mod7_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@mod-7.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Services state
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Edit / Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    number: '',
    title: '',
    subtitle: '',
    description: '',
    tags: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('mod7_admin_token', data.token);
        localStorage.setItem('mod7_admin_user', JSON.stringify(data.user));
        showMessage('Successfully logged into MOD-7 Admin Panel');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Cannot connect to backend server. Make sure port 5050 is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('mod7_admin_token');
    localStorage.removeItem('mod7_admin_user');
  };

  // Fetch Services from API
  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await fetch(`${API_BASE}/services`);
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchServices();
    }
  }, [token]);

  const showMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 4000);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingService(null);
    const nextNum = services.length < 9 ? `0${services.length + 1}` : `${services.length + 1}`;
    setFormData({
      number: nextNum,
      title: '',
      subtitle: '',
      description: '',
      tags: ''
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      number: srv.number || '01',
      title: srv.title || '',
      subtitle: srv.subtitle || '',
      description: srv.description || '',
      tags: Array.isArray(srv.tags) ? srv.tags.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  // Submit Create or Edit
  const handleSaveService = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      number: formData.number,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingService) {
        // Update
        const id = editingService._id || editingService.id || editingService.number;
        res = await fetch(`${API_BASE}/services/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create
        res = await fetch(`${API_BASE}/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const result = await res.json();
      if (res.ok && result.success) {
        setIsModalOpen(false);
        await fetchServices();
        window.dispatchEvent(new Event('servicesUpdated'));
        showMessage(editingService ? '✓ Service updated! Main UI will reflect changes.' : '✓ New Service added to website!');
      } else {
        alert(result.message || 'Error saving service');
      }
    } catch (err) {
      alert('Network error while saving service');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Service
  const handleDeleteService = async (srv) => {
    if (!window.confirm(`Are you sure you want to delete "${srv.title}"?`)) return;

    try {
      const id = srv._id || srv.id || srv.number;
      const res = await fetch(`${API_BASE}/services/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();
      if (res.ok && result.success) {
        await fetchServices();
        window.dispatchEvent(new Event('servicesUpdated'));
        showMessage('✓ Service deleted from website.');
      } else {
        alert(result.message || 'Error deleting service');
      }
    } catch (err) {
      alert('Network error while deleting service');
    }
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all services to the original 6 MOD-7 default services?')) return;

    try {
      const res = await fetch(`${API_BASE}/services/reset`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();
      if (res.ok && result.success) {
        await fetchServices();
        window.dispatchEvent(new Event('servicesUpdated'));
        showMessage('✓ Restored original 6 default services.');
      }
    } catch (err) {
      alert('Network error during reset');
    }
  };

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-[#e3ebd2] text-[#262523] flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-[#262523] selection:text-[#e3ebd2]">
        {/* Top bar */}
        <div className="flex items-center justify-between max-w-4xl w-full mx-auto">
          <div className="flex items-center gap-3">
            <span className="bg-[#262523] text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-sm uppercase">
              MOD-7
            </span>
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase">
              Admin Portal
            </span>
          </div>

          <a
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#262523] hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Website</span>
          </a>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md mx-auto my-12 bg-[#262523] text-white p-8 sm:p-12 shadow-2xl relative">
          <div className="mb-8">
            <span className="text-xs font-mono tracking-widest text-[#b3b2ae] uppercase block mb-1">
              // RESTRICTED ACCESS
            </span>
            <h1 className="text-3xl font-light tracking-tight uppercase">
              ADMIN SIGN IN
            </h1>
            <p className="text-xs text-[#b3b2ae] mt-2 leading-relaxed">
              Sign in with authorized administrator credentials to manage services, architectural content, and client quotes.
            </p>
          </div>

          {/* Quick Demo Credentials Tip */}
          <div className="mb-6 p-3.5 bg-white/5 border border-white/10 text-xs">
            <span className="text-[#b3b2ae] font-mono block mb-1 text-[11px] uppercase">
              Authorized Admin Credentials:
            </span>
            <div className="font-mono text-xs text-white">
              Email: <span className="text-[#e3ebd2]">admin@mod-7.com</span><br />
              Password: <span className="text-[#e3ebd2]">admin123</span>
            </div>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-900/40 border border-red-500/50 text-red-200 text-xs font-mono">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#b3b2ae] mb-2 font-mono">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@mod-7.com"
                className="w-full bg-white/10 border border-white/20 rounded-none px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#b3b2ae] mb-2 font-mono">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 rounded-none px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-[#e3ebd2] text-[#262523] rounded-full py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {isLoggingIn ? 'AUTHENTICATING...' : 'ENTER ADMIN PANEL'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#81817d] font-mono">
          MOD-7 Modular Architecture Systems · Secured with JWT & MongoDB Atlas
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. ADMIN DASHBOARD (When authenticated)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#e3ebd2] text-[#262523] flex flex-col font-sans selection:bg-[#262523] selection:text-[#e3ebd2]">
      {/* Top Admin Header */}
      <header className="w-full bg-[#262523] text-white px-6 sm:px-12 py-4 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-white text-[#262523] text-xs font-bold tracking-widest px-3 py-1 rounded-sm uppercase">
              MOD-7
            </span>
            <span className="text-xs font-mono tracking-widest text-[#b3b2ae] uppercase">
              // ADMIN CONTROL CENTER
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-emerald-400">
              <Database className="w-3 h-3" />
              <span>MongoDB Atlas Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <span className="font-mono text-[#b3b2ae] hidden sm:inline">
              User: <strong className="text-white">{user?.email || 'admin@mod-7.com'}</strong>
            </span>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white hover:text-[#e3ebd2] transition-colors uppercase tracking-wider font-semibold"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 md:px-12 py-8 sm:py-12">
        {/* Toast Action Message */}
        <AnimatePresence>
          {actionMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-[#262523] text-white flex items-center justify-between border-l-4 border-emerald-400 shadow-md"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{actionMessage}</span>
              </div>
              <span className="text-[11px] font-mono text-[#b3b2ae]">Live in database</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262523]/20 mb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
              // CONTENT MANAGEMENT
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight uppercase text-[#262523]">
              SERVICES & CAPABILITIES
            </h1>
            <p className="text-xs sm:text-sm text-[#81817d] mt-1 max-w-xl">
              Changes made here immediately update the Services section on the live homepage. You can edit existing services, add new ones, or delete outdated items.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="border border-[#262523]/30 hover:border-[#262523] text-[#262523] px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="bg-[#262523] text-white hover:bg-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loadingServices ? (
          <div className="py-20 text-center text-sm font-mono text-[#81817d]">
            Loading services from MongoDB Atlas...
          </div>
        ) : (
          /* Services Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, index) => (
              <div
                key={srv._id || srv.id || index}
                className="bg-white/60 border border-[#262523]/20 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#262523] text-white rounded">
                      {srv.number || `0${index + 1}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        title="Edit Service"
                        className="p-1.5 text-[#262523] hover:bg-[#262523]/10 rounded cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv)}
                        title="Delete Service"
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-light tracking-tight uppercase text-[#262523] mb-1">
                    {srv.title}
                  </h3>
                  {srv.subtitle && (
                    <p className="text-xs font-mono text-[#81817d] uppercase tracking-wider mb-3">
                      {srv.subtitle}
                    </p>
                  )}

                  <p className="text-xs leading-relaxed text-[#262523]/80 mb-4 line-clamp-4">
                    {srv.description}
                  </p>
                </div>

                {srv.tags && srv.tags.length > 0 && (
                  <div className="pt-3 border-t border-[#262523]/10 flex flex-wrap gap-1.5">
                    {srv.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#262523]/5 border border-[#262523]/15 text-[#262523]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          3. EDIT / CREATE SERVICE MODAL
      ------------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#262523]/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#e3ebd2] border border-[#262523]/30 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-2xl font-light text-[#262523] hover:opacity-60 cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
                  // {editingService ? 'EDIT SERVICE' : 'NEW SERVICE'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light tracking-tight uppercase text-[#262523]">
                  {editingService ? `EDIT: ${editingService.title}` : 'CREATE NEW SERVICE'}
                </h2>
                <p className="text-xs text-[#81817d] mt-1">
                  When you save, this service is automatically updated in MongoDB Atlas and reflected on the live homepage.
                </p>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-1 font-mono">
                      Number
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                      placeholder="01"
                      className="w-full bg-white/50 border border-[#262523]/30 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#262523]"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-1 font-mono">
                      Service Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="E.g. Passive House & Solar Integration"
                      className="w-full bg-white/50 border border-[#262523]/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#262523]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-1 font-mono">
                    Subtitle / Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="E.g. Self-sufficient luxury living"
                    className="w-full bg-white/50 border border-[#262523]/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#262523]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-1 font-mono">
                    Description
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this service provides, materials used, turnaround time..."
                    className="w-full bg-white/50 border border-[#262523]/30 rounded-lg p-3 text-xs leading-relaxed focus:outline-none focus:border-[#262523]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-1 font-mono">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="BIM 3D, Solar PV, CLT Timber, Permit Docs"
                    className="w-full bg-white/50 border border-[#262523]/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#262523]"
                  />
                  <span className="text-[10px] text-[#81817d] font-mono mt-0.5 block">
                    Separate tags with commas. E.g. "Robotic Joinery, Austrian Timber, Net-Zero"
                  </span>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#262523]/15">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#262523] hover:opacity-60 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#262523] text-white hover:bg-black px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? 'SAVING TO DATABASE...' : (editingService ? 'UPDATE SERVICE' : 'CREATE SERVICE')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
