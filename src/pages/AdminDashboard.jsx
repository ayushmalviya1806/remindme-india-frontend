import { useState } from 'react';
import { Bell, RefreshCw, Lock } from 'lucide-react';

const API_BASE = 'https://remindme-india.onrender.com/api/admin';
const B2B_BASE = 'https://remindme-india.onrender.com/api/business';

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
  const [userFilter, setUserFilter] = useState('all');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // B2B Business states
  const [businesses, setBusinesses] = useState([]);
  const [businessMembers, setBusinessMembers] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showMemberList, setShowMemberList] = useState(false);
  const [businessForm, setBusinessForm] = useState({
    businessName: '',
    ownerWhatsapp: '',
    industryType: 'gym',
    plan: 'small'
  });
  const [bulkMessage, setBulkMessage] = useState('');
  const [individualMessage, setIndividualMessage] = useState({
    memberWhatsapp: '',
    message: '',
    businessId: ''
  });

  const sendBulkMessage = async (businessId, message) => {
    if (!secret) {
      alert('Please login first');
      return;
    }
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    try {
      const headers = { 'x-admin-secret': secret };
      const res = await fetch(`${B2B_BASE}/send-bulk`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ businessId, message })
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Message sent to ${data.sent} members (${data.failed} failed)`);
        setBulkMessage('');
        fetchData(secret);
      } else {
        alert(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      alert('❌ Error sending bulk message');
    }
  };

  const fetchBusinessMembers = async (businessId) => {
  if (!secret) return;
  try {
    const headers = { 'x-admin-secret': secret };
    const res = await fetch(`${B2B_BASE}/${businessId}/members`, { headers });
    const data = await res.json();
    setBusinessMembers(data.members || []);
  } catch (error) {
    console.error('Failed to fetch business members:', error);
  }
};

const fetchData = async (adminSecret) => {
    setLoading(true);
    try {
      const headers = { 'x-admin-secret': adminSecret };
      const [statsRes, usersRes, remindersRes, businessRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers }),
        fetch(`${API_BASE}/users`, { headers }),
        fetch(`${API_BASE}/reminders`, { headers }),
        fetch(`${B2B_BASE}/list`, { headers })
      ]);
      if (statsRes.status === 401 || businessRes.status === 401) {
        alert('Wrong password!');
        setLoading(false);
        return false;
      }
      setStats(await statsRes.json());
      const usersData = await usersRes.json();
      const remindersData = await remindersRes.json();
      const businessData = await businessRes.json();
      setUsers(usersData.users || []);
      setReminders(remindersData.reminders || []);
      setBusinesses(businessData.businesses || []);
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
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret
        },
        body: JSON.stringify({ phone: activatePhone })
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

  const filteredUsers = users.filter(u => {
    const matchesPlan = userFilter === 'all' ? true : userFilter === 'pro' ? u.plan === 'PRO' : u.plan !== 'PRO';
    const matchesSearch = searchPhone.trim() === '' ? true : u.whatsapp_phone_number.includes(searchPhone.trim());
    return matchesPlan && matchesSearch;
  });

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
              <p className="text-xs text-gray-400 mt-1">💳 {stats.users.paidPro || 0} paid · 🎁 {stats.users.referralPro || 0} referral</p>
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
        <div className="flex gap-2 mb-6 flex-wrap">
          {['overview', 'users', 'reminders', 'activate', 'business'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'
              }`}
              style={activeTab === tab ? { background: 'linear-gradient(135deg, #006D2F, #25D366)' } : {}}
            >
              {tab === 'activate' ? '⚡ Activate Pro' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && stats && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">👥 User Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-600">Total Users</span><span className="font-bold">{stats.users.total}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Pro Users 🌟</span><span className="font-bold text-green-600">{stats.users.pro}</span></div>
                <div className="flex justify-between items-center pl-4"><span className="text-gray-400 text-sm">💳 Paid Pro</span><span className="font-bold text-green-700">{stats.users.paidPro || 0}</span></div>
                <div className="flex justify-between items-center pl-4"><span className="text-gray-400 text-sm">🎁 Referral Pro</span><span className="font-bold text-orange-500">{stats.users.referralPro || 0}</span></div>
                {(stats.users.adminPro || 0) > 0 && (
                  <div className="flex justify-between items-center pl-4"><span className="text-gray-400 text-sm">🔧 Admin Pro</span><span className="font-bold text-gray-500">{stats.users.adminPro}</span></div>
                )}
                <div className="flex justify-between items-center"><span className="text-gray-600">Free Users</span><span className="font-bold">{stats.users.free}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">New Today</span><span className="font-bold text-blue-600">{stats.users.newToday}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">New This Week</span><span className="font-bold text-purple-600">{stats.users.newThisWeek}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">🔔 Reminder Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-gray-600">Total Created</span><span className="font-bold">{stats.reminders.total}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Successfully Sent ✅</span><span className="font-bold text-green-600">{stats.reminders.sent}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Pending ⏳</span><span className="font-bold text-blue-600">{stats.reminders.pending}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-600">Created Today</span><span className="font-bold text-orange-600">{stats.reminders.createdToday}</span></div>
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

        {/* ═══ USERS TAB ═══ */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Filter + Search Header */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
              <h2 className="font-bold text-gray-800 mr-2">Users ({filteredUsers.length})</h2>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pro', label: '🌟 Pro Only' },
                  { key: 'free', label: 'Free Only' }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setUserFilter(f.key)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      userFilter === f.key ? 'text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    style={userFilter === f.key ? { background: 'linear-gradient(135deg, #006D2F, #25D366)' } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="🔍 Search phone number..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="ml-auto border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-green-500 w-56"
              />
            </div>

            {/* Users Table */}
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
                  {filteredUsers.map((user, i) => (
                    <tr
                      key={user.id}
                      className={`cursor-pointer hover:bg-green-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="px-4 py-3 text-sm font-mono">{user.whatsapp_phone_number}</td>
                      <td className="px-4 py-3 text-sm">{user.name || 'Unknown'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.plan === 'PRO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
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
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">
                        No users found matching your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ REMINDERS TAB ═══ */}
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
                      <td className="px-4 py-3 text-sm">{reminder.is_recurring ? `🔁 ${reminder.frequency}` : '1x'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatIST(reminder.next_send_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ ACTIVATE PRO TAB ═══ */}
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

        {/* Business Tab */}
        {activeTab === 'business' && (
          <div className="space-y-6">

            {/* Create Business Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">Create New Business</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm({...businessForm, businessName: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                    placeholder="Fitness First Gym"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner WhatsApp</label>
                  <input
                    type="text"
                    value={businessForm.ownerWhatsapp}
                    onChange={(e) => setBusinessForm({...businessForm, ownerWhatsapp: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                    placeholder="917470578178"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
                  <select
                    value={businessForm.industryType}
                    onChange={(e) => setBusinessForm({...businessForm, industryType: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                  >
                    <option value="gym">Gym</option>
                    <option value="clinic">Clinic</option>
                    <option value="coaching">Coaching</option>
                    <option value="salon">Salon</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                  <select
                    value={businessForm.plan}
                    onChange={(e) => setBusinessForm({...businessForm, plan: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                  >
                    <option value="small">Small - 999/month (100 customers)</option>
                    <option value="professional">Professional - 1999/month (500 customers)</option>
                    <option value="enterprise">Enterprise - 2999/month (unlimited)</option>
                  </select>
                </div>
              </div>
              <button
                onClick={async () => {
                  const headers = { 'x-admin-secret': secret };
                  try {
                    const res = await fetch(`${B2B_BASE}/create`, {
                      method: 'POST',
                      headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(businessForm)
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert(`✅ Business created! Code: ${data.business.businessCode}\nWelcome WhatsApp sent to owner.`);
                      setBusinessForm({
                        businessName: '',
                        ownerWhatsapp: '',
                        industryType: 'gym',
                        plan: 'small'
                      });
                      fetchData(secret);
                    } else {
                      alert(`❌ Failed: ${data.error}`);
                    }
                  } catch (error) {
                    alert('❌ Error creating business');
                  }
                }}
                disabled={!secret || !businessForm.businessName || !businessForm.ownerWhatsapp}
                className="w-full py-3 rounded-xl text-white font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}
              >
                Create Business & Send Welcome WhatsApp
              </button>
            </div>

            {/* Business List Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">All Businesses ({businesses.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business, i) => (
                      <tr key={business.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm">{business.businessName}</td>
                        <td className="px-4 py-3 text-sm">{business.industryType || '-'}</td>
                        <td className="px-4 py-3 text-sm">{business.plan}</td>
                        <td className="px-4 py-3 text-sm font-bold">{business.memberCount || 0}</td>
                        <td className="px-4 py-3 text-sm font-mono">{business.businessCode}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            business.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {business.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                setSelectedBusiness(business);
                                fetchBusinessMembers(business.id);
                              }}
                              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
                            >
                              View Members
                            </button>
                            <button
                              onClick={() => {
                                const message = prompt('Enter bulk message:');
                                if (message) {
                                  sendBulkMessage(business.id, message);
                                }
                              }}
                              className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs hover:bg-purple-600"
                            >
                              Send Bulk
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Deactivate ${business.businessName}?`)) {
                                  const headers = { 'x-admin-secret': secret };
                                  await fetch(`${B2B_BASE}/${business.id}`, {
                                    method: 'DELETE',
                                    headers
                                  });
                                  fetchData(secret);
                                }
                              }}
                              className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                            >
                              Deactivate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Send Reminder to Any Member */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">📤 Send Reminder to Member</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Business</label>
                  <select
                    value={individualMessage.businessId}
                    onChange={(e) => setIndividualMessage({...individualMessage, businessId: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select Business</option>
                    {businesses.map(business => (
                      <option key={business.id} value={business.id}>{business.businessName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member WhatsApp</label>
                  <input
                    type="text"
                    value={individualMessage.memberWhatsapp}
                    onChange={(e) => setIndividualMessage({...individualMessage, memberWhatsapp: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                    placeholder="916269915175"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={individualMessage.message}
                  onChange={(e) => setIndividualMessage({...individualMessage, message: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
                  rows={4}
                  placeholder="Enter message..."
                />
              </div>
              <button
                onClick={async () => {
                  if (!individualMessage.memberWhatsapp || !individualMessage.message || !individualMessage.businessId) {
                    alert('Please fill all fields');
                    return;
                  }
                  const headers = { 'x-admin-secret': secret };
                  try {
                    const res = await fetch(`${B2B_BASE}/send-reminder`, {
                      method: 'POST',
                      headers: {
                        ...headers,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(individualMessage)
                    });
                    const data = await res.json();
                    if (data.success) {
                      alert('✅ Message sent successfully!');
                      setIndividualMessage({ memberWhatsapp: '', message: '', businessId: '' });
                    } else {
                      alert(`❌ Failed: ${data.error}`);
                    }
                  } catch (error) {
                    alert('❌ Error sending message');
                  }
                }}
                className="w-full py-3 rounded-xl text-white font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Member List Modal */}
      {showMemberList && selectedBusiness && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowMemberList(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-96 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Members of {selectedBusiness.businessName}</h3>
              <button onClick={() => setShowMemberList(false)} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">WhatsApp</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription End</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Opted In</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody>
                {businessMembers.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">No members yet.</td></tr>
                )}
                {businessMembers.map(member => (
                  <tr key={member.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{member.memberName || '-'}</td>
                    <td className="px-4 py-3 text-sm font-mono">{member.memberWhatsapp}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(member.subscriptionEndDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${member.optedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {member.optedIn ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(member.joinedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
