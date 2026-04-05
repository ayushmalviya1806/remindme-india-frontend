import { useState, useEffect } from 'react';
import { Bell, Users, Clock, TrendingUp, RefreshCw, Lock, CheckCircle, XCircle } from 'lucide-react';

const API_BASE = 'https://remindme-india.onrender.com/api/admin';

export default function AdminDashboard() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activatePhone, setActivatePhone] = useState('');
  const [activateMsg, setActivateMsg] = useState('');

  const fetchData = async (adminSecret) => {
    setLoading(true);
    try {
      const headers = { 'x-admin-secret': adminSecret };
      const [statsRes, usersRes, remindersRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers }),
        fetch(`${API_BASE}/users`, { headers }),
        fetch(`${API_BASE}/reminders`, { headers })
      ]);

      if (statsRes.status === 401) {
        alert('Wrong password!');
        setLoading(false);
        return false;
      }

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      const remindersData = await remindersRes.json();

      setStats(statsData);
      setUsers(usersData.users || []);
      setReminders(remindersData.reminders || []);
      setAuthenticated(true);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to fetch:', error);
      setLoading(false);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetchData(secret);
  };

  const handleActivatePro = async () => {
    try {
      const res = await fetch(`${API_BASE}/activate-pro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: activatePhone, secret })
      });
      const data = await res.json();
      if (data.success) {
        setActivateMsg(`✅ Pro activated for ${activatePhone}`);
        fetchData(secret);
      } else {
        setActivateMsg(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setActivateMsg('❌ Error activating pro');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatIST = (dateStr) => {
    if (!dateStr) return 'N/A';
    const ist = new Date(new Date(dateStr).getTime() + 5.5 * 60 * 60 * 1000);
    return ist.toLocaleString('en-IN', {
      day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}>
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg" style={{ color: '#006D2F' }}>RemindMe India</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-bold transition-all"
              style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}
            >
              {loading ? 'Loading...' : 'Login →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6" style={{ color: '#006D2F' }} />
          <span className="font-bold text-lg" style={{ color: '#006D2F' }}>RemindMe India Admin</span>
        </div>
        <button
          onClick={() => fetchData(secret)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-3xl font-bold" style={{ color: '#006D2F' }}>{stats.users.total}</p>
              <p className="text-xs text-gray-400 mt-1">+{stats.users.newToday} today</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Pro Users</p>
              <p className="text-3xl font-bold" style={{ color: '#25D366' }}>{stats.users.pro}</p>
              <p className="text-xs text-gray-400 mt-1">
                💳 {stats.users.paidPro || 0} paid · 🎁 {stats.users.referralPro || 0} referral
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Reminders Sent</p>
              <p className="text-3xl font-bold text-blue-600">{stats.reminders.sent}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.reminders.pending} pending</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-purple-600">₹{stats.revenue.monthly}</p>
              <p className="text-xs text-gray-400 mt-1">{stats.users.newThisWeek} new this week</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'users', 'reminders', 'activate'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
              style={activeTab === tab ? { background: 'linear-gradient(135deg, #006D2F, #25D366)' } : {}}
            >
              {tab === 'activate' ? '⚡ Activate Pro' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">All Users ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Phone</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Plan</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Reminders</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-mono">{user.whatsapp_phone_number}</td>
                      <td className="px-4 py-3 text-sm">{user.name || 'Unknown'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.plan === 'PRO'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="text-green-600">{user.sentReminders} sent</span>
                        {' · '}
                        <span className="text-blue-600">{user.pendingReminders} pending</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(user.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Recent Reminders ({reminders.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Title</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">User</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Type</th>
                    <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Next Send</th>
                  </tr>
                </thead>
                <tbody>
                  {reminders.map((reminder, i) => (
                    <tr key={reminder.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium">{reminder.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{reminder.user?.whatsapp_phone_number}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          reminder.status === 'SENT' ? 'bg-green-100 text-green-700' :
                          reminder.status === 'PENDING' ? 'bg-blue-100 text-blue-700' :
                          reminder.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {reminder.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {reminder.is_recurring ? `🔁 ${reminder.frequency}` : '1x'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatIST(reminder.next_send_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">👥 User Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-bold">{stats.users.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pro Users 🌟</span>
                  <span className="font-bold text-green-600">{stats.users.pro}</span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-gray-400 text-sm">💳 Paid Pro</span>
                  <span className="font-bold text-green-700">{stats.users.paidPro || 0}</span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-gray-400 text-sm">🎁 Referral Pro</span>
                  <span className="font-bold text-orange-500">{stats.users.referralPro || 0}</span>
                </div>
                {(stats.users.adminPro || 0) > 0 && (
                  <div className="flex justify-between items-center pl-4">
                    <span className="text-gray-400 text-sm">🔧 Admin Pro</span>
                    <span className="font-bold text-gray-500">{stats.users.adminPro}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Free Users</span>
                  <span className="font-bold">{stats.users.free}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Today</span>
                  <span className="font-bold text-blue-600">{stats.users.newToday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New This Week</span>
                  <span className="font-bold text-purple-600">{stats.users.newThisWeek}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">🔔 Reminder Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Created</span>
                  <span className="font-bold">{stats.reminders.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Successfully Sent ✅</span>
                  <span className="font-bold text-green-600">{stats.reminders.sent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending ⏳</span>
                  <span className="font-bold text-blue-600">{stats.reminders.pending}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created Today</span>
                  <span className="font-bold text-orange-600">{stats.reminders.createdToday}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2">
              <h3 className="font-bold text-gray-800 mb-4">💰 Revenue</h3>
              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <p className="text-gray-500 text-sm">Monthly Revenue</p>
                  <p className="text-4xl font-bold text-green-600">₹{stats.revenue.monthly}</p>
                  <p className="text-xs text-gray-400 mt-1">{stats.users.paidPro || 0} paying users × ₹99</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Annual Run Rate</p>
                  <p className="text-4xl font-bold text-purple-600">₹{stats.revenue.monthly * 12}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Paid Conversion</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {stats.users.total > 0 ? Math.round(((stats.users.paidPro || 0) / stats.users.total) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">paid only (excl. referral)</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Pro %</p>
                  <p className="text-4xl font-bold text-orange-500">
                    {stats.users.total > 0 ? Math.round((stats.users.pro / stats.users.total) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-400 mt-1">paid + referral</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Activate Pro Tab */}
        {activeTab === 'activate' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md">
            <h2 className="font-bold text-gray-800 mb-4">⚡ Activate Pro Plan</h2>
            <p className="text-sm text-gray-500 mb-4">Enter user's WhatsApp number to activate Pro:</p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="917470578178"
                value={activatePhone}
                onChange={(e) => setActivatePhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleActivatePro}
                className="w-full py-3 rounded-xl text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}
              >
                Activate Pro →
              </button>
              {activateMsg && (
                <p className={`text-sm font-medium ${activateMsg.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                  {activateMsg}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
