import { useState, useEffect, useRef, useCallback, useMemo, memo, startTransition } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Command } from 'cmdk';
import * as RadixSelect from '@radix-ui/react-select';
import {
  Bell,
  RefreshCw,
  Lock,
  LogOut,
  LayoutDashboard,
  Users as UsersIcon,
  Zap,
  Building2,
  Megaphone,
  Inbox as InboxIcon,
  Shield,
  ChevronsLeft,
  Search,
  AlertTriangle,
  Loader2,
  X,
  Check,
  ChevronDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { useCountUp } from '@/hooks/useCountUp';

const API_BASE = 'https://remindme-india.onrender.com/api/admin';
const B2B_BASE = 'https://remindme-india.onrender.com/api/business';

const SECRET_STORAGE_KEY = 'rm_admin_secret';

const ROW_PAGE = 50;

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

const formatIST = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZone: 'Asia/Kolkata'
  });
};

/* ── Form primitives (dark) ── */

const INPUT_CLASS =
  'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-rm-green/50 focus:ring-2 focus:ring-rm-green/15 transition-colors duration-200 [color-scheme:dark]';
const LABEL_CLASS = 'block text-xs font-semibold text-white/45 mb-1.5';
const BTN_PRIMARY =
  'w-full py-3 rounded-xl text-white font-heading font-bold text-sm bg-gradient-to-br from-rm-primary to-rm-green shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_14px_rgba(0,109,47,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed transition-all duration-200 ease-out inline-flex items-center justify-center gap-2';

function BtnSpinner() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

/* Shared dark select (Radix) — native <select> popups are OS-painted white on
   Windows/Chrome and can't be themed, so every dropdown goes through this.
   VALUE SEMANTICS: emits the exact same value strings as the old <option>s;
   '' (empty/placeholder) maps to undefined for Radix and never reaches setters. */
function DarkSelect({ value, onChange, options, placeholder = 'Select…', ariaLabel }) {
  return (
    <RadixSelect.Root value={value || undefined} onValueChange={onChange}>
      <RadixSelect.Trigger
        aria-label={ariaLabel || placeholder}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-left outline-none focus:border-rm-green/50 focus:ring-2 focus:ring-rm-green/15 data-[placeholder]:text-white/25 transition-colors duration-200"
      >
        <span className="truncate">
          <RadixSelect.Value placeholder={placeholder} />
        </span>
        <RadixSelect.Icon>
          <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className="z-[120] w-[var(--radix-select-trigger-width)] max-h-72 overflow-hidden rounded-xl bg-[#161A17] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_64px_rgba(0,0,0,0.6)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none"
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center h-6 text-white/30">
            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-1.5">
            {options.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="relative flex items-center rounded-lg pl-3 pr-9 py-2.5 text-sm text-white/70 outline-none cursor-pointer select-none data-[highlighted]:bg-rm-green/[0.12] data-[highlighted]:text-rm-green data-[state=checked]:text-rm-green transition-colors duration-100"
              >
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3">
                  <Check className="w-3.5 h-3.5" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-6 text-white/30">
            <ChevronDown className="w-3.5 h-3.5" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

/* Styled confirmation dialog with consequence summary — replaces window.confirm */
function ConfirmDialog({ open, title, body, consequences = [], confirmLabel, danger = false, loading = false, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/65"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md rounded-2xl bg-[#131714] border border-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-label={title}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-400' : 'bg-rm-green/10 text-rm-green'}`}>
                <AlertTriangle className="w-[18px] h-[18px]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white">{title}</h3>
                {body && <p className="text-sm text-white/50 mt-1 leading-relaxed">{body}</p>}
              </div>
            </div>
            {consequences.length > 0 && (
              <ul className="mb-5 rounded-xl bg-white/[0.03] border border-white/[0.07] divide-y divide-white/[0.05]">
                {consequences.map((c) => (
                  <li key={c} className="px-4 py-2.5 text-[13px] text-white/55 flex items-start gap-2">
                    <span className={danger ? 'text-red-400/80' : 'text-rm-green/80'}>•</span>
                    {c}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:bg-white/[0.05] transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60 ${
                  danger
                    ? 'bg-red-500/90 hover:bg-red-500 shadow-[0_4px_14px_rgba(239,68,68,0.3)]'
                    : 'bg-gradient-to-br from-rm-primary to-rm-green shadow-[0_4px_14px_rgba(0,109,47,0.35)]'
                }`}
              >
                {loading && <BtnSpinner />}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Table primitives (dark) ── */

function PlanBadge({ plan }) {
  const pro = plan === 'PRO';
  return (
    <span
      className={`px-2 py-1 rounded-full text-[11px] font-bold tracking-wide ${
        pro
          ? 'bg-rm-green/[0.12] text-rm-green shadow-[inset_0_0_0_1px_rgba(37,211,102,0.3)]'
          : 'bg-white/[0.05] text-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
      }`}
    >
      {plan}
    </span>
  );
}

const STATUS_BADGE = {
  SENT: 'bg-rm-green/[0.12] text-rm-green shadow-[inset_0_0_0_1px_rgba(37,211,102,0.3)]',
  PENDING: 'bg-[#7CC5FF]/[0.1] text-[#7CC5FF] shadow-[inset_0_0_0_1px_rgba(124,197,255,0.3)]',
  CANCELLED: 'bg-red-400/[0.1] text-red-400 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.3)]',
};

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-bold tracking-wide ${STATUS_BADGE[status] || 'bg-white/[0.05] text-white/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'}`}>
      {status}
    </span>
  );
}

const TH_CLASS = 'sticky top-0 z-10 bg-[#10140E] text-left px-4 py-3 text-[10px] font-bold tracking-[0.12em] uppercase text-white/35 border-b border-white/[0.07]';

function SortableTh({ label, sortKey, sort, onSort }) {
  const active = sort.key === sortKey;
  return (
    <th className={`${TH_CLASS} cursor-pointer select-none hover:text-white/70 transition-colors duration-150`} onClick={() => onSort(sortKey)}>
      <span className="inline-flex items-center gap-1">
        {label}
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          animate={{ rotate: active && sort.dir === 'asc' ? 180 : 0, opacity: active ? 1 : 0.25 }}
          transition={{ duration: 0.18 }}
          className={active ? 'text-rm-green' : 'text-white/40'}
        >
          <path d="M2 3.5 L5 6.5 L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </span>
    </th>
  );
}

/* Memoized rows: re-render only when their own data changes; fast 20ms entrance
   stagger capped at the first 20 rows so long pages never feel slow */
const UserRow = memo(function UserRow({ user, index, onSelect, reduce }) {
  return (
    <motion.tr
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: Math.min(index, 20) * 0.02 }}
      onClick={() => onSelect(user)}
      className="group cursor-pointer border-b border-white/[0.04] hover:bg-rm-green/[0.05] transition-colors duration-150"
    >
      <td className="px-4 py-3 text-sm font-mono text-white/80 group-hover:text-rm-green transition-colors duration-150">{user.whatsapp_phone_number}</td>
      <td className="px-4 py-3 text-sm text-white/65">{user.name || 'Unknown'}</td>
      <td className="px-4 py-3"><PlanBadge plan={user.plan} /></td>
      <td className="px-4 py-3 text-sm tabular-nums">
        <span className="text-rm-green">{user.sentReminders} sent</span>
        <span className="text-white/25">{' · '}</span>
        <span className="text-[#7CC5FF]">{user.pendingReminders} pending</span>
      </td>
      <td className="px-4 py-3 text-sm text-white/40">{formatDate(user.created_at)}</td>
    </motion.tr>
  );
});

const ReminderRow = memo(function ReminderRow({ reminder, index, reduce }) {
  return (
    <motion.tr
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: Math.min(index, 20) * 0.02 }}
      className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150"
    >
      <td className="px-4 py-3 text-sm font-medium text-white/80">{reminder.title}</td>
      <td className="px-4 py-3 text-sm font-mono text-white/45">{reminder.user?.whatsapp_phone_number}</td>
      <td className="px-4 py-3"><StatusBadge status={reminder.status} /></td>
      <td className="px-4 py-3 text-sm text-white/55">{reminder.is_recurring ? `🔁 ${reminder.frequency}` : '1x'}</td>
      <td className="px-4 py-3 text-sm text-white/40">{formatIST(reminder.next_send_at)}</td>
    </motion.tr>
  );
});

/* Inbox message card — memoized so toggling one message's expand state doesn't
   re-render the whole list. Same 120-char show-more/less truncation as before. */
const InboxCard = memo(function InboxCard({ message, index, expanded, onToggle, reduce }) {
  const body = message.message || '';
  const isLong = body.length > 120;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1], delay: Math.min(index, 20) * 0.02 }}
      className="group relative rounded-xl bg-white/[0.03] border border-white/[0.07] pl-5 pr-4 py-4 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200"
    >
      {/* unread-style left accent */}
      <span aria-hidden="true" className="absolute left-0 top-3.5 bottom-3.5 w-[3px] rounded-full bg-rm-green/40 group-hover:bg-rm-green transition-colors duration-200" />
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="font-medium text-white/85 truncate">{message.userName || 'Unknown User'}</p>
          <p className="text-xs font-mono text-white/40">+{message.phone}</p>
        </div>
        <p className="text-[11px] text-white/35 shrink-0 tabular-nums">
          {message.createdAt
            ? new Date(message.createdAt).toLocaleString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata',
              })
            : 'N/A'}{' '}
          IST
        </p>
      </div>
      <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap break-words">
        {isLong && !expanded ? body.slice(0, 120) + '…' : body}
      </p>
      {isLong && (
        <button
          onClick={() => onToggle(message.id)}
          className="mt-1.5 text-[13px] font-semibold text-rm-green hover:text-rm-green/80 transition-colors duration-150"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </motion.div>
  );
});

/* ── Overview building blocks (dark command-center) ── */

const CHART_TOOLTIP_STYLE = {
  background: '#161A17',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  color: '#fff',
  fontSize: 12,
};

function AdminPanel({ title, sub, children, className = '', testId }) {
  return (
    <div data-testid={testId} className={`relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />
      {title && (
        <div className="mb-4">
          <h3 className="font-heading font-bold text-sm text-white/90">{title}</h3>
          {sub && <p className="text-[11px] text-white/35 mt-0.5">{sub}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

function AdminStatCard({ label, value, prefix = '', suffix = '', sub, accent = '#25D366', delay = 0 }) {
  const { ref, value: display } = useCountUp(value || 0, { duration: 1.1, delay });
  return (
    <div
      ref={ref}
      className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 overflow-hidden hover:-translate-y-0.5 transition-transform duration-200 ease-out"
    >
      <div aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 14px 36px ${accent}2b, inset 0 0 0 1px ${accent}33` }}
      />
      <p className="text-xs text-white/40 font-medium mb-2">{label}</p>
      <p className="font-heading font-extrabold text-3xl tabular-nums" style={{ color: accent, letterSpacing: '-0.02em' }}>
        {prefix}
        {display.toLocaleString('en-IN')}
        {suffix}
      </p>
      {sub && <div className="mt-1.5 text-[11px] text-white/35 leading-relaxed">{sub}</div>}
    </div>
  );
}

function RevenueFigure({ monthly }) {
  const { ref, value } = useCountUp(monthly || 0, { duration: 1.4 });
  return (
    <div ref={ref}>
      <p className="text-[11px] text-white/35 mb-1">Monthly revenue</p>
      <p
        className="font-heading font-extrabold text-5xl tabular-nums"
        style={{
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #7CF2A8, #25D366)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 32px rgba(37,211,102,0.25)',
        }}
      >
        ₹{value.toLocaleString('en-IN')}
      </p>
    </div>
  );
}

function SegmentedBar({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (total === 0) {
    return <p className="text-xs text-white/30">No subscribers yet — pehla paid user aane wala hai 💪</p>;
  }
  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-white/[0.06]">
        {segments.map(
          (s) =>
            s.value > 0 && (
              <motion.div
                key={s.label}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                style={{ width: `${(s.value / total) * 100}%`, background: s.color, transformOrigin: 'left center' }}
              />
            )
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
            <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
            {s.label}: <span className="text-white/80 font-semibold tabular-nums">{s.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function AdminSkeleton({ className = '' }) {
  return <div className={`admin-skeleton ${className}`} />;
}

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: UsersIcon },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'activate', label: 'Activate Pro', icon: Zap },
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'broadcast', label: 'Broadcast', icon: Megaphone },
  { id: 'inbox', label: 'Inbox', icon: InboxIcon },
  { id: 'security', label: 'Security', icon: Shield },
];

/* Broadcast audience segments. `noun` feeds the confirm-dialog consequence copy;
   `statsKey` reads the live count straight from existing /stats aggregates —
   value strings ('all'|'free'|'pro') are byte-identical to the old radios. */
const BROADCAST_FILTERS = [
  { value: 'all', label: 'All Users', icon: '🌍', noun: 'all users', statsKey: 'total' },
  { value: 'free', label: 'Free Users', icon: '🆓', noun: 'free users', statsKey: 'free' },
  { value: 'pro', label: 'Pro Users', icon: '🌟', noun: 'Pro users', statsKey: 'pro' },
];

export default function AdminDashboard() {
  const reducedMotion = useReducedMotion();
  const [secret, setSecret] = useState(() => sessionStorage.getItem(SECRET_STORAGE_KEY) || '');
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const searchInputRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activatePhone, setActivatePhone] = useState('');
  const [activatePaidRecovery, setActivatePaidRecovery] = useState(true);
  const [activateMsg, setActivateMsg] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // B2B Business states
  const [businesses, setBusinesses] = useState([]);
  // REMOVED: businessMembers, selectedBusiness, showMemberList
  // Per Privacy Policy, founder cannot browse member lists
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
  const [addMemberForm, setAddMemberForm] = useState({
    businessId: '',
    memberWhatsapp: '',
    memberName: '',
    subscriptionEndDate: ''
  });
  const [addMemberMsg, setAddMemberMsg] = useState('');
  // Standalone update expiry form state (no member browsing)
  const [standaloneUpdateExpiry, setStandaloneUpdateExpiry] = useState({
    businessId: '',
    memberWhatsapp: '',
    newExpiryDate: ''
  });
  const [standaloneUpdateMsg, setStandaloneUpdateMsg] = useState('');
  const [csvBusinessId, setCsvBusinessId] = useState('');
  const [csvData, setCsvData] = useState('');
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvResults, setCsvResults] = useState(null);
  
  // Broadcast states
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastFilter, setBroadcastFilter] = useState('all');
  const [broadcastLoading, setBroadcastLoading] = useState(false);
  const [broadcastResult, setBroadcastResult] = useState(null);
  const [broadcastError, setBroadcastError] = useState('');
  
  // Inbox states
  const [inboxMessages, setInboxMessages] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [inboxError, setInboxError] = useState('');
  const [inboxSkip, setInboxSkip] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState({});

  // Security tab states
  const [securityStatus, setSecurityStatus] = useState(null);
  const [securityStatusLoading, setSecurityStatusLoading] = useState(false);
  const [securityStatusError, setSecurityStatusError] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedLoading, setBlockedLoading] = useState(false);
  const [blockedError, setBlockedError] = useState('');
  const [blockPhone, setBlockPhone] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [unblockPhone, setUnblockPhone] = useState('');
  const [blocking, setBlocking] = useState(false);
  const [unblocking, setUnblocking] = useState(false);
  const [unblockingPhone, setUnblockingPhone] = useState(null);
  const [blockConfirmOpen, setBlockConfirmOpen] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (activeTab === 'inbox' && authenticated && inboxMessages.length === 0) {
      fetchInbox();
    }
  }, [activeTab, authenticated]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (activeTab === 'security' && authenticated) {
      fetchSecurityStatus();
      fetchSecurityBlocked();
    }
  }, [activeTab, authenticated]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Toggle message expansion (stable ref so memoized InboxCards skip re-render)
  const toggleMessage = useCallback((id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);
  
  // QR Code modal states
  const [qrModal, setQrModal] = useState({
    show: false,
    businessName: '',
    qrCode: '',
    joinUrl: ''
  });

  // Dialog + button-loading states (Phase 4)
  const [bulkDialog, setBulkDialog] = useState({ open: false, businessId: '', businessName: '' });
  const [bulkSending, setBulkSending] = useState(false);
  const [deactivateDialog, setDeactivateDialog] = useState({ open: false, businessId: '', businessName: '' });
  const [deactivating, setDeactivating] = useState(false);
  const [creatingBusiness, setCreatingBusiness] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [updatingExpiry, setUpdatingExpiry] = useState(false);
  const [activating, setActivating] = useState(false);

  const [broadcastConfirmOpen, setBroadcastConfirmOpen] = useState(false);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem(SECRET_STORAGE_KEY);
    setAuthenticated(false);
    setSecret('');
    setStats(null);
    setUsers([]);
    setReminders([]);
    setBusinesses([]);
    setInboxMessages([]);
    setSecurityStatus(null);
    setBlockedUsers([]);
    setPaletteOpen(false);
  }, []);

  /* Central 401 guard — any expired/invalid secret kicks back to login */
  const handle401 = useCallback(() => {
    toast.error('Session expired — please log in again');
    handleLogout();
  }, [handleLogout]);

  /* Tab switches are non-urgent renders: the sidebar click paints immediately,
     heavy section mounts (big tables) render interruptibly behind it */
  const switchTab = useCallback((id) => {
    startTransition(() => setActiveTab(id));
  }, []);

  /* Opens the styled confirmation — same validations as before */
  const requestBroadcast = () => {
    if (!secret) {
      setBroadcastError('Please login first');
      return;
    }
    if (!broadcastMessage.trim()) {
      setBroadcastError('Message cannot be empty');
      return;
    }
    setBroadcastError('');
    setBroadcastConfirmOpen(true);
  };

  const sendBroadcast = async () => {
    setBroadcastLoading(true);
    setBroadcastError('');
    setBroadcastResult(null);

    try {
      const res = await fetch(`${API_BASE}/broadcast`, {
        method: 'POST',
        headers: {
          'x-admin-secret': secret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: broadcastMessage.trim(),
          filter: broadcastFilter
        })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        setBroadcastResult(data);
        setBroadcastMessage('');
        toast.success('Broadcast accepted by server');
      } else {
        setBroadcastError(data.error || 'Failed to send broadcast');
      }
    } catch (error) {
      setBroadcastError('Error sending broadcast');
    } finally {
      setBroadcastLoading(false);
      setBroadcastConfirmOpen(false);
    }
  };

  const fetchInbox = useCallback(async (loadMore = false) => {
    if (!secret) {
      setInboxError('Please login first');
      return;
    }
    setInboxLoading(true);
    setInboxError('');
    try {
      const url = loadMore ? `${API_BASE}/inbox?skip=${inboxSkip}` : `${API_BASE}/inbox`;
      const res = await fetch(url, {
        headers: { 'x-admin-secret': secret }
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        if (loadMore) {
          setInboxMessages(prev => [...prev, ...(data.messages || [])]);
          setInboxSkip(prev => prev + (data.messages?.length || 0));
          setHasMoreMessages(data.messages?.length === 10);
        } else {
          setInboxMessages(data.messages || []);
          setInboxSkip(0);
          setHasMoreMessages((data.messages?.length || 0) === 10);
        }
      } else {
        setInboxError(data.error || 'Failed to fetch inbox');
      }
    } catch (error) {
      setInboxError('Error fetching inbox');
    } finally {
      setInboxLoading(false);
    }
  }, [secret, inboxSkip, handle401]);

  const fetchSecurityStatus = useCallback(async () => {
    if (!secret) return;
    setSecurityStatusLoading(true);
    setSecurityStatusError('');
    try {
      const res = await fetch(`${API_BASE}/security/status`, {
        headers: { 'x-admin-secret': secret }
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (!res.ok) {
        setSecurityStatusError(data.error || 'Failed to fetch security status');
        return;
      }
      setSecurityStatus(data);
    } catch {
      setSecurityStatusError('Error fetching security status');
    } finally {
      setSecurityStatusLoading(false);
    }
  }, [secret, handle401]);

  const fetchSecurityBlocked = useCallback(async () => {
    if (!secret) return;
    setBlockedLoading(true);
    setBlockedError('');
    try {
      const res = await fetch(`${API_BASE}/security/blocked`, {
        headers: { 'x-admin-secret': secret }
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (!res.ok) {
        setBlockedError(data.error || 'Failed to fetch blocked users');
        return;
      }
      setBlockedUsers(data.blocked || []);
    } catch {
      setBlockedError('Error fetching blocked users');
    } finally {
      setBlockedLoading(false);
    }
  }, [secret, handle401]);

  const refreshSecurityData = useCallback(async () => {
    await Promise.all([fetchSecurityStatus(), fetchSecurityBlocked()]);
  }, [fetchSecurityStatus, fetchSecurityBlocked]);

  const handleBlockSubmit = () => {
    if (!blockPhone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }
    setBlockConfirmOpen(true);
  };

  const executeBlock = async () => {
    setBlocking(true);
    try {
      const res = await fetch(`${API_BASE}/security/block`, {
        method: 'POST',
        headers: {
          'x-admin-secret': secret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: blockPhone.trim(),
          reason: blockReason.trim() || 'manual_admin_block'
        })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        toast.success(`+${blockPhone.trim()} blocked`);
        setBlockPhone('');
        setBlockReason('');
        setBlockConfirmOpen(false);
        await refreshSecurityData();
      } else {
        toast.error(data.error || 'Failed to block number');
      }
    } catch {
      toast.error('Error blocking number');
    } finally {
      setBlocking(false);
    }
  };

  const handleUnblock = async (phone) => {
    const target = (phone || '').trim();
    if (!target) {
      toast.error('Please enter a phone number');
      return;
    }
    setUnblocking(true);
    setUnblockingPhone(target);
    try {
      const res = await fetch(`${API_BASE}/security/unblock`, {
        method: 'POST',
        headers: {
          'x-admin-secret': secret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: target })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        toast.success(`+${target} unblocked`);
        if (unblockPhone.trim() === target) setUnblockPhone('');
        await refreshSecurityData();
      } else {
        toast.error(data.error || 'Failed to unblock number');
      }
    } catch {
      toast.error('Error unblocking number');
    } finally {
      setUnblocking(false);
      setUnblockingPhone(null);
    }
  };

  
  const sendBulkMessage = async (businessId, message) => {
    if (!secret) {
      toast.error('Please login first');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    setBulkSending(true);
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
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        toast.success(`Message sent to ${data.sent} members (${data.failed} failed)`);
        setBulkMessage('');
        setBulkDialog({ open: false, businessId: '', businessName: '' });
        fetchData(secret, { silent: true });
      } else {
        toast.error(`Failed: ${data.error}`);
      }
    } catch (error) {
      toast.error('Error sending bulk message');
    } finally {
      setBulkSending(false);
    }
  };

  // REMOVED: fetchBusinessMembers function
  // Per Privacy Policy, founder cannot fetch member lists

const fetchQRCode = async (businessId, businessName) => {
  if (!secret) return;
  try {
    const headers = { 'x-admin-secret': secret };
    const res = await fetch(`${B2B_BASE}/${businessId}/qr`, { headers });
    if (res.status === 401) { handle401(); return; }
    const data = await res.json();
    if (data.success) {
      setQrModal({
        show: true,
        businessName,
        qrCode: data.qrCode,
        joinUrl: data.joinUrl
      });
    } else {
      toast.error('Failed to generate QR code');
    }
  } catch (error) {
    console.error('Failed to fetch QR code:', error);
    toast.error('Failed to generate QR code');
  }
};

  /* Deactivate — request byte-identical to the original confirm() flow */
  const handleDeactivateBusiness = async () => {
    setDeactivating(true);
    try {
      const headers = { 'x-admin-secret': secret };
      const res = await fetch(`${B2B_BASE}/${deactivateDialog.businessId}`, {
        method: 'DELETE',
        headers
      });
      if (res.status === 401) { handle401(); return; }
      toast.success(`${deactivateDialog.businessName} deactivated`);
      setDeactivateDialog({ open: false, businessId: '', businessName: '' });
      fetchData(secret, { silent: true });
    } catch (error) {
      toast.error('Error deactivating business');
    } finally {
      setDeactivating(false);
    }
  };

  const handleCreateBusiness = async () => {
    const headers = { 'x-admin-secret': secret };
    setCreatingBusiness(true);
    try {
      const res = await fetch(`${B2B_BASE}/create`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(businessForm)
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        toast.success(`Business created! Code: ${data.business.businessCode} — welcome WhatsApp sent to owner.`);
        setBusinessForm({
          businessName: '',
          ownerWhatsapp: '',
          industryType: 'gym',
          plan: 'small'
        });
        fetchData(secret, { silent: true });
      } else {
        toast.error(`Failed: ${data.error}`);
      }
    } catch (error) {
      toast.error('Error creating business');
    } finally {
      setCreatingBusiness(false);
    }
  };

  const handleSendReminder = async () => {
    if (!individualMessage.memberWhatsapp || !individualMessage.message || !individualMessage.businessId) {
      toast.error('Please fill all fields');
      return;
    }
    const headers = { 'x-admin-secret': secret };
    setSendingReminder(true);
    try {
      const res = await fetch(`${B2B_BASE}/send-reminder`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(individualMessage)
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        toast.success('Message sent successfully!');
        setIndividualMessage({ memberWhatsapp: '', message: '', businessId: '' });
      } else {
        toast.error(`Failed: ${data.error}`);
      }
    } catch (error) {
      toast.error('Error sending message');
    } finally {
      setSendingReminder(false);
    }
  };

  const handleAddMember = async () => {
    if (!addMemberForm.businessId || !addMemberForm.memberWhatsapp) {
      setAddMemberMsg('Business aur WhatsApp number required hai');
      return;
    }
    if (addMemberForm.memberWhatsapp.length < 10) {
      setAddMemberMsg('Valid WhatsApp number enter karein (with country code)');
      return;
    }
    setAddingMember(true);
    try {
      const res = await fetch(`${B2B_BASE}/members/add`, {
        method: 'POST',
        headers: {
          'x-admin-secret': secret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addMemberForm)
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        setAddMemberMsg('Member added! Welcome WhatsApp sent.');
        toast.success('Member added — welcome WhatsApp sent');
        setAddMemberForm({
          businessId: '',
          memberWhatsapp: '',
          memberName: '',
          subscriptionEndDate: ''
        });
        fetchData(secret, { silent: true });
      } else {
        setAddMemberMsg(`Failed: ${data.error}`);
      }
    } catch (error) {
      setAddMemberMsg('Error adding member');
    } finally {
      setAddingMember(false);
    }
  };

  const handleUpdateExpiry = async () => {
    if (!standaloneUpdateExpiry.businessId || !standaloneUpdateExpiry.memberWhatsapp || !standaloneUpdateExpiry.newExpiryDate) {
      setStandaloneUpdateMsg('❌ Sab fields fill karein');
      return;
    }
    if (standaloneUpdateExpiry.memberWhatsapp.length < 10) {
      setStandaloneUpdateMsg('❌ Valid WhatsApp number enter karein (with country code)');
      return;
    }
    setUpdatingExpiry(true);
    try {
      const res = await fetch(`${B2B_BASE}/members/update-expiry`, {
        method: 'POST',
        headers: {
          'x-admin-secret': secret,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessId: standaloneUpdateExpiry.businessId,
          memberWhatsapp: standaloneUpdateExpiry.memberWhatsapp,
          subscriptionEndDate: standaloneUpdateExpiry.newExpiryDate
        })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        setStandaloneUpdateMsg('✅ Expiry updated successfully');
        toast.success('Expiry updated — member notified');
        setStandaloneUpdateExpiry({ businessId: '', memberWhatsapp: '', newExpiryDate: '' });
      } else {
        setStandaloneUpdateMsg(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setStandaloneUpdateMsg('❌ Error updating expiry');
    } finally {
      setUpdatingExpiry(false);
    }
  };

const fetchData = async (adminSecret, { silent = false } = {}) => {
    setLoading(true);
    try {
      const headers = { 'x-admin-secret': adminSecret };
      const [statsRes, usersRes, remindersRes, businessRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers }),
        fetch(`${API_BASE}/users`, { headers }),
        fetch(`${API_BASE}/reminders`, { headers }),
        fetch(`${B2B_BASE}/list`, { headers })
      ]);
      if ([statsRes, usersRes, remindersRes, businessRes].some((r) => r.status === 401)) {
        if (authenticated) {
          handle401();
        } else {
          toast.error('Wrong password');
        }
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
      sessionStorage.setItem(SECRET_STORAGE_KEY, adminSecret);
      setLastUpdated(new Date());
      setLoading(false);
      if (!silent) toast.success('Data refreshed');
      return true;
    } catch (error) {
      console.error('Failed to fetch:', error);
      toast.error('Network error — could not reach the server');
      setLoading(false);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetchData(secret, { silent: true });
  };

  /* Auto-login: secret survives refresh in sessionStorage (dies with the tab) */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const stored = sessionStorage.getItem(SECRET_STORAGE_KEY);
    if (stored) fetchData(stored, { silent: true });
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* Keyboard: Ctrl/Cmd+K palette · '/' focuses user search · Esc closes palette */
  useEffect(() => {
    if (!authenticated) return undefined;
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setPaletteOpen(false);
        setSelectedUser(null);
        setQrModal((q) => (q.show ? { show: false, businessName: '', qrCode: '', joinUrl: '' } : q));
        setBulkDialog((b) => (b.open ? { open: false, businessId: '', businessName: '' } : b));
        setDeactivateDialog((d) => (d.open ? { open: false, businessId: '', businessName: '' } : d));
        setBroadcastConfirmOpen(false);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) &&
        !e.target.isContentEditable
      ) {
        e.preventDefault();
        switchTab('users');
        setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 80);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [authenticated, switchTab]);

  const handleCsvImport = async () => {
    if (!csvBusinessId || !csvData.trim()) return;
    setCsvImporting(true);
    setCsvResults(null);
    try {
      const res = await fetch(`${B2B_BASE}/members/bulk-import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret
        },
        body: JSON.stringify({
          businessId: csvBusinessId,
          csvData: csvData.trim()
        })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      setCsvResults(data);
      if (data.success && data.results.success > 0) {
        toast.success(`Import complete! ${data.results.success} members added successfully.`);
      }
    } catch (err) {
      toast.error('Import failed. Check console for details.');
      console.error('CSV import error:', err);
    } finally {
      setCsvImporting(false);
    }
  };

  const handleActivatePro = async () => {
    setActivating(true);
    try {
      const res = await fetch(`${API_BASE}/activate-pro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret
        },
        body: JSON.stringify({
          phone: activatePhone,
          mode: activatePaidRecovery ? 'payment_recovery' : 'gift'
        })
      });
      if (res.status === 401) { handle401(); return; }
      const data = await res.json();
      if (data.success) {
        setActivateMsg(
          data.countsInRevenue
            ? `✅ Pro activated (paid recovery — counts in ₹ revenue) for ${activatePhone}`
            : `✅ Pro activated (free admin gift — not in ₹ revenue) for ${activatePhone}`
        );
        fetchData(secret, { silent: true });
      } else {
        setActivateMsg(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setActivateMsg('❌ Error activating pro');
    } finally {
      setActivating(false);
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter(u => {
        const matchesPlan = userFilter === 'all' ? true : userFilter === 'pro' ? u.plan === 'PRO' : u.plan !== 'PRO';
        const matchesSearch = searchPhone.trim() === '' ? true : u.whatsapp_phone_number.includes(searchPhone.trim());
        return matchesPlan && matchesSearch;
      }),
    [users, userFilter, searchPhone]
  );

  /* Sorting */
  const [userSort, setUserSort] = useState({ key: null, dir: 'asc' });
  const [reminderSort, setReminderSort] = useState({ key: null, dir: 'asc' });

  const toggleUserSort = useCallback((key) => {
    setUserSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }, []);
  const toggleReminderSort = useCallback((key) => {
    setReminderSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }, []);

  const sortRows = (rows, { key, dir }, accessors) => {
    if (!key) return rows;
    const acc = accessors[key];
    const mul = dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = acc(a);
      const bv = acc(b);
      if (av < bv) return -1 * mul;
      if (av > bv) return 1 * mul;
      return 0;
    });
  };

  const sortedUsers = useMemo(
    () =>
      sortRows(filteredUsers, userSort, {
        phone: (u) => u.whatsapp_phone_number || '',
        name: (u) => (u.name || '').toLowerCase(),
        plan: (u) => u.plan || '',
        reminders: (u) => u.sentReminders || 0,
        created_at: (u) => new Date(u.created_at || 0).getTime(),
      }),
    [filteredUsers, userSort]
  );

  const sortedReminders = useMemo(
    () =>
      sortRows(reminders, reminderSort, {
        title: (r) => (r.title || '').toLowerCase(),
        status: (r) => r.status || '',
        next_send_at: (r) => new Date(r.next_send_at || 0).getTime(),
      }),
    [reminders, reminderSort]
  );

  /* Windowed rendering: only ROW_PAGE rows mount at once — keeps section
     switches instant even with hundreds of users/reminders */
  const [userRowLimit, setUserRowLimit] = useState(ROW_PAGE);
  const [reminderRowLimit, setReminderRowLimit] = useState(ROW_PAGE);

  useEffect(() => {
    setUserRowLimit(ROW_PAGE);
  }, [userFilter, searchPhone]);

  const visibleUsers = useMemo(() => sortedUsers.slice(0, userRowLimit), [sortedUsers, userRowLimit]);
  const visibleReminders = useMemo(() => sortedReminders.slice(0, reminderRowLimit), [sortedReminders, reminderRowLimit]);

  /* Live broadcast audience size from existing /stats aggregates (no new fetch).
     null until stats load — UI then labels the count as "unavailable". */
  const broadcastMeta = BROADCAST_FILTERS.find((f) => f.value === broadcastFilter) || BROADCAST_FILTERS[0];
  const broadcastTargetCount = stats?.users ? (stats.users[broadcastMeta.statsKey] ?? null) : null;

  if (!authenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#0B0E0C] overflow-hidden">
        <Toaster theme="dark" position="bottom-right" richColors />
        {/* Ambient green bloom + grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(37, 211, 102, 0.08), transparent 70%)' }}
        />
        <div aria-hidden="true" className="aurora-grain" style={{ opacity: 0.04 }} />

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-sm mx-4 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rm-primary to-rm-green shadow-[0_0_24px_rgba(37,211,102,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-lg text-white">RemindMe India</h1>
              <p className="text-xs text-white/40">Mission Control</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              autoFocus
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-rm-green/60 focus:ring-2 focus:ring-rm-green/20 transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={loading || !secret}
              className="w-full py-3 rounded-xl text-white font-heading font-bold bg-gradient-to-br from-rm-primary to-rm-green shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_16px_rgba(0,109,47,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_rgba(37,211,102,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200 ease-out"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Authenticating…
                </span>
              ) : (
                'Enter Mission Control →'
              )}
            </button>
          </form>
          <p className="mt-5 text-[11px] text-white/25 text-center">
            Secret is kept in this tab only and cleared when it closes.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E0C] text-white flex">
      <Toaster theme="dark" position="bottom-right" richColors />

      {/* Grain texture over the whole cockpit */}
      <div aria-hidden="true" className="fixed inset-0 aurora-grain pointer-events-none z-0" style={{ opacity: 0.03 }} />

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 76 : 232 }}
        transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
        className="relative z-30 shrink-0 min-h-screen border-r border-white/[0.07] bg-[#0E120F] flex flex-col"
        style={{ width: sidebarCollapsed ? 76 : 232 }}
      >
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/[0.06]">
          <div className="w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center shadow-[0_0_16px_rgba(37,211,102,0.3)]">
            <Bell className="w-4 h-4 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="font-heading font-extrabold text-sm text-white leading-tight truncate">RemindMe India</p>
              <p className="text-[10px] text-rm-green/80 font-semibold tracking-[0.12em] uppercase">Mission Control</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => switchTab(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-rm-green' : 'text-white/50 hover:text-white/90'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="admin-nav-glow"
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-rm-green/[0.09] border border-rm-green/25 shadow-[inset_0_1px_0_rgba(37,211,102,0.15),0_0_20px_rgba(37,211,102,0.12)]"
                  />
                )}
                <Icon className="relative w-[18px] h-[18px] shrink-0" />
                {!sidebarCollapsed && <span className="relative truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <button
            onClick={() => setSidebarCollapsed((c) => !c)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-white/40 hover:text-white/80 hover:bg-white/[0.04] text-sm transition-colors duration-200"
          >
            <ChevronsLeft className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main column ── */}
      <div className="flex-1 min-w-0 flex flex-col relative z-10">
        {/* Sticky glass header */}
        <header className="sticky top-0 z-40 h-16 px-6 flex items-center justify-between border-b border-white/[0.07] bg-[#0B0E0C]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-extrabold text-lg text-white">
              {(NAV_ITEMS.find((n) => n.id === activeTab) || {}).label || 'Dashboard'}
            </h1>
            {lastUpdated && (
              <span className="hidden sm:inline text-[11px] text-white/30">
                Updated {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/40 border border-white/10 hover:border-white/20 hover:text-white/70 transition-colors duration-200"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search…</span>
              <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono">Ctrl K</kbd>
            </button>
            <button
              onClick={() => { fetchData(secret); if (activeTab === 'inbox') fetchInbox(); }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 border border-white/10 hover:border-rm-green/40 hover:text-rm-green disabled:opacity-50 transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/50 border border-white/10 hover:border-red-400/40 hover:text-red-400 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        {/* Enter-only transition: no exit phase, so a sidebar click swaps content
            immediately and the new section fades in — never blocks on unmount */}
        <motion.div
          key={activeTab}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
        >

        {/* ═══ OVERVIEW TAB ═══ */}
        {activeTab === 'overview' && loading && !stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <AdminSkeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <AdminSkeleton className="h-64 rounded-2xl lg:col-span-2" />
              <AdminSkeleton className="h-64 rounded-2xl" />
            </div>
          </div>
        )}

        {activeTab === 'overview' && !loading && !stats && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-10 text-center">
            <AlertTriangle className="w-7 h-7 text-[#FF9933] mx-auto mb-3" />
            <p className="text-white/70 font-medium mb-1">Stats load nahi hue</p>
            <p className="text-sm text-white/35 mb-5">Server tak request nahi pahunchi ya response invalid tha.</p>
            <button
              onClick={() => fetchData(secret)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-rm-green border border-rm-green/30 hover:bg-rm-green/10 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        )}

        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/*
              BACKEND TODO — real trend charts need time-series the /api/admin/stats
              endpoint doesn't expose yet. To upgrade the aggregates below into
              line/area trends, expose:
                - signupsPerDay:   [{ date, count }]            (last 30 days)
                - remindersPerDay: [{ date, created, sent }]    (last 30 days)
                - revenuePerMonth: [{ month, amount }]          (last 12 months)
              Until then, everything rendered here uses ONLY existing aggregates.
            */}

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <AdminStatCard
                label="Total Users"
                value={stats.users.total}
                accent="#FFFFFF"
                delay={0}
                sub={<span className="text-rm-green">+{stats.users.newToday} today · +{stats.users.newThisWeek} this week</span>}
              />
              <AdminStatCard
                label="Pro Users"
                value={stats.users.pro}
                accent="#25D366"
                delay={0.08}
                sub={<span>💳 {stats.users.paidPro || 0} paid · 🎁 {stats.users.referralPro || 0} referral{(stats.users.adminPro || 0) > 0 ? ` · 🔧 ${stats.users.adminPro} admin` : ''}</span>}
              />
              <AdminStatCard
                label="Reminders Sent"
                value={stats.reminders.sent}
                accent="#7CC5FF"
                delay={0.16}
                sub={<span>{stats.reminders.pending} pending · {stats.reminders.createdToday} created today</span>}
              />
              <AdminStatCard
                label="Monthly Revenue"
                value={stats.revenue.monthly}
                prefix="₹"
                accent="#FF9933"
                delay={0.24}
                sub={<span>{stats.revenue.paidSubscribers ?? stats.users.paidPro ?? 0} paid × ₹99</span>}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue centerpiece */}
              <AdminPanel
                title="💰 Revenue"
                sub="Paid subscriptions only — gifts and referrals excluded from ₹"
                className="lg:col-span-2"
              >
                <div className="flex flex-wrap items-end gap-x-10 gap-y-5 mb-6">
                  <RevenueFigure monthly={stats.revenue.monthly} />
                  <div>
                    <p className="text-[11px] text-white/35 mb-1">Annual run rate</p>
                    <p className="font-heading font-extrabold text-2xl text-white/85 tabular-nums">₹{(stats.revenue.monthly * 12).toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/35 mb-1">Paid conversion</p>
                    <p className="font-heading font-extrabold text-2xl text-[#7CC5FF] tabular-nums">
                      {stats.users.total > 0 ? Math.round(((stats.users.paidPro || 0) / stats.users.total) * 100) : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/35 mb-1">Total Pro %</p>
                    <p className="font-heading font-extrabold text-2xl text-[#FF9933] tabular-nums">
                      {stats.users.total > 0 ? Math.round((stats.users.pro / stats.users.total) * 100) : 0}%
                    </p>
                  </div>
                </div>
                <SegmentedBar
                  segments={[
                    { label: '💳 Paid', value: stats.revenue.paidSubscribers ?? stats.users.paidPro ?? 0, color: '#25D366' },
                    { label: '🎁 Referral (not in ₹)', value: stats.revenue.referralGranted ?? stats.users.referralPro ?? 0, color: '#FF9933' },
                    { label: '🔧 Admin gift (not in ₹)', value: stats.revenue.adminGranted ?? stats.users.adminPro ?? 0, color: '#5B6660' },
                  ]}
                />
              </AdminPanel>

              {/* User composition donut */}
              <AdminPanel title="👥 User Composition" sub={`${stats.users.total.toLocaleString('en-IN')} total users`}>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Free', value: stats.users.free || 0 },
                          { name: 'Paid Pro', value: stats.users.paidPro || 0 },
                          { name: 'Referral Pro', value: stats.users.referralPro || 0 },
                          { name: 'Admin Pro', value: stats.users.adminPro || 0 },
                        ].filter((d) => d.value > 0)}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="62%"
                        outerRadius="92%"
                        paddingAngle={3}
                        stroke="none"
                        isAnimationActive={!reducedMotion}
                      >
                        <Cell fill="#3D453F" />
                        <Cell fill="#25D366" />
                        <Cell fill="#FF9933" />
                        <Cell fill="#7CC5FF" />
                      </Pie>
                      <RechartsTooltip contentStyle={CHART_TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {[
                    { label: 'Free', value: stats.users.free || 0, color: '#3D453F' },
                    { label: 'Paid', value: stats.users.paidPro || 0, color: '#25D366' },
                    { label: 'Referral', value: stats.users.referralPro || 0, color: '#FF9933' },
                    { label: 'Admin', value: stats.users.adminPro || 0, color: '#7CC5FF' },
                  ].map((d) => (
                    <span key={d.label} className="inline-flex items-center gap-1.5 text-[11px] text-white/50">
                      <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      {d.label}: <span className="text-white/80 font-semibold tabular-nums">{d.value}</span>
                    </span>
                  ))}
                </div>
              </AdminPanel>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Reminder pipeline bars */}
              <AdminPanel title="🔔 Reminder Pipeline" sub="Aggregates from /stats" className="lg:col-span-2">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Created', value: stats.reminders.total, fill: '#3D453F' },
                        { name: 'Sent', value: stats.reminders.sent, fill: '#25D366' },
                        { name: 'Pending', value: stats.reminders.pending, fill: '#7CC5FF' },
                        { name: 'Today', value: stats.reminders.createdToday, fill: '#FF9933' },
                      ]}
                      margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={64}
                        tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <RechartsTooltip contentStyle={CHART_TOOLTIP_STYLE} itemStyle={{ color: '#fff' }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18} isAnimationActive={!reducedMotion} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </AdminPanel>

              {/* Growth pulse */}
              <AdminPanel title="📈 Growth Pulse" sub="New signups">
                <div className="flex items-end justify-around h-44 pb-2">
                  {[
                    { label: 'Today', value: stats.users.newToday, color: '#25D366' },
                    { label: 'This week', value: stats.users.newThisWeek, color: '#FF9933' },
                  ].map((g) => {
                    const max = Math.max(stats.users.newToday, stats.users.newThisWeek, 1);
                    return (
                      <div key={g.label} className="flex flex-col items-center gap-2 w-20">
                        <span className="font-heading font-extrabold text-xl text-white/90 tabular-nums">{g.value}</span>
                        <motion.div
                          className="w-full rounded-t-lg"
                          style={{ background: `linear-gradient(180deg, ${g.color}, ${g.color}55)`, transformOrigin: 'bottom center' }}
                          initial={reducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                        >
                          <div style={{ height: `${Math.max((g.value / max) * 110, 8)}px` }} />
                        </motion.div>
                        <span className="text-[11px] text-white/40">{g.label}</span>
                      </div>
                    );
                  })}
                </div>
              </AdminPanel>
            </div>
          </div>
        )}

        {/* ═══ USERS TAB ═══ */}
        {activeTab === 'users' && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            {/* Filter + Search Header */}
            <div className="p-4 border-b border-white/[0.07] flex flex-wrap items-center gap-3">
              <h2 className="font-heading font-bold text-white/90 mr-1">
                Users <span className="text-rm-green tabular-nums">({filteredUsers.length})</span>
              </h2>
              <div className="flex gap-1.5">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pro', label: '🌟 Pro Only' },
                  { key: 'free', label: 'Free Only' }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setUserFilter(f.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 ${
                      userFilter === f.key
                        ? 'bg-rm-green/[0.14] text-rm-green shadow-[inset_0_0_0_1px_rgba(37,211,102,0.35)]'
                        : 'bg-white/[0.04] text-white/45 hover:text-white/75 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="ml-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search phone…  ( / )"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="w-60 bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-rm-green/50 focus:ring-2 focus:ring-rm-green/15 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-auto max-h-[62vh]">
              <table className="w-full">
                <thead>
                  <tr>
                    <SortableTh label="Phone" sortKey="phone" sort={userSort} onSort={toggleUserSort} />
                    <SortableTh label="Name" sortKey="name" sort={userSort} onSort={toggleUserSort} />
                    <SortableTh label="Plan" sortKey="plan" sort={userSort} onSort={toggleUserSort} />
                    <SortableTh label="Reminders" sortKey="reminders" sort={userSort} onSort={toggleUserSort} />
                    <SortableTh label="Joined" sortKey="created_at" sort={userSort} onSort={toggleUserSort} />
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((user, i) => (
                    <UserRow key={user.id} user={user} index={i} onSelect={setSelectedUser} reduce={reducedMotion} />
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-14 text-center">
                        <p className="text-3xl mb-2">🔍</p>
                        <p className="text-white/60 text-sm font-medium">Koi user nahi mila</p>
                        <p className="text-white/30 text-xs mt-1">Filter dheela karo ya number dobara check karo.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {sortedUsers.length > userRowLimit && (
              <div className="p-4 border-t border-white/[0.07] text-center">
                <button
                  onClick={() => setUserRowLimit((l) => l + 100)}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:border-rm-green/40 hover:text-rm-green transition-colors duration-200"
                >
                  Show more ({sortedUsers.length - userRowLimit} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ REMINDERS TAB ═══ */}
        {activeTab === 'reminders' && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="p-4 border-b border-white/[0.07]">
              <h2 className="font-heading font-bold text-white/90">
                Recent Reminders <span className="text-rm-green tabular-nums">({reminders.length})</span>
              </h2>
            </div>
            <div className="overflow-auto max-h-[65vh]">
              <table className="w-full">
                <thead>
                  <tr>
                    <SortableTh label="Title" sortKey="title" sort={reminderSort} onSort={toggleReminderSort} />
                    <th className={TH_CLASS}>User</th>
                    <SortableTh label="Status" sortKey="status" sort={reminderSort} onSort={toggleReminderSort} />
                    <th className={TH_CLASS}>Type</th>
                    <SortableTh label="Next Send" sortKey="next_send_at" sort={reminderSort} onSort={toggleReminderSort} />
                  </tr>
                </thead>
                <tbody>
                  {visibleReminders.map((reminder, i) => (
                    <ReminderRow key={reminder.id} reminder={reminder} index={i} reduce={reducedMotion} />
                  ))}
                  {reminders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-14 text-center">
                        <p className="text-3xl mb-2">🧘</p>
                        <p className="text-white/60 text-sm font-medium">Sab shaant hai</p>
                        <p className="text-white/30 text-xs mt-1">Abhi koi reminder nahi — jab aayega, yahan dikhega.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {reminders.length > reminderRowLimit && (
              <div className="p-4 border-t border-white/[0.07] text-center">
                <button
                  onClick={() => setReminderRowLimit((l) => l + 100)}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:border-rm-green/40 hover:text-rm-green transition-colors duration-200"
                >
                  Show more ({reminders.length - reminderRowLimit} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══ ACTIVATE PRO TAB ═══ */}
        {activeTab === 'activate' && (
          <AdminPanel title="⚡ Activate Pro Plan" sub="Enter user WhatsApp number. Choose why you are activating:" className="max-w-md">
            <div className="space-y-3">
              <div>
                <label className={LABEL_CLASS}>WhatsApp number</label>
                <input
                  type="text"
                  placeholder="917470578178"
                  value={activatePhone}
                  onChange={(e) => setActivatePhone(e.target.value)}
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>
              <label className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors duration-200 ${
                activatePaidRecovery
                  ? 'border-rm-green/35 bg-rm-green/[0.07]'
                  : 'border-white/10 bg-white/[0.03]'
              }`}>
                <input
                  type="checkbox"
                  checked={activatePaidRecovery}
                  onChange={(e) => setActivatePaidRecovery(e.target.checked)}
                  className="mt-1 accent-[#25D366]"
                />
                <span className="text-sm text-white/65 leading-relaxed">
                  <strong className="text-white/90">User already paid</strong> (Razorpay / website — webhook failed). Counts in ₹ revenue.
                  <br />
                  <span className="text-white/40">Uncheck for a free admin gift (Admin Pro, not in revenue).</span>
                </span>
              </label>
              <button onClick={handleActivatePro} disabled={activating || !activatePhone} className={BTN_PRIMARY}>
                {activating && <BtnSpinner />}
                {activating ? 'Activating…' : 'Activate Pro →'}
              </button>
              {activateMsg && (
                <p className={`text-sm font-medium ${activateMsg.includes('✅') ? 'text-rm-green' : 'text-red-400'}`}>
                  {activateMsg}
                </p>
              )}
            </div>
          </AdminPanel>
        )}

        {/* Business Tab */}
        {activeTab === 'business' && (
          <div className="space-y-6">

            {/* Create Business Form */}
            <AdminPanel title="🏢 Create New Business" sub="Welcome WhatsApp goes to the owner automatically" testId="panel-create-business">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={LABEL_CLASS}>Business Name</label>
                  <input
                    type="text"
                    value={businessForm.businessName}
                    onChange={(e) => setBusinessForm({...businessForm, businessName: e.target.value})}
                    className={INPUT_CLASS}
                    placeholder="Fitness First Gym"
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Owner WhatsApp</label>
                  <input
                    type="text"
                    value={businessForm.ownerWhatsapp}
                    onChange={(e) => setBusinessForm({...businessForm, ownerWhatsapp: e.target.value})}
                    className={`${INPUT_CLASS} font-mono`}
                    placeholder="917470578178"
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Industry Type</label>
                  <DarkSelect
                    value={businessForm.industryType}
                    onChange={(v) => setBusinessForm({...businessForm, industryType: v})}
                    ariaLabel="Industry Type"
                    options={[
                      { value: 'gym', label: 'Gym' },
                      { value: 'clinic', label: 'Clinic' },
                      { value: 'coaching', label: 'Coaching' },
                      { value: 'salon', label: 'Salon' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Plan</label>
                  <DarkSelect
                    value={businessForm.plan}
                    onChange={(v) => setBusinessForm({...businessForm, plan: v})}
                    ariaLabel="Plan"
                    options={[
                      { value: 'small', label: 'Small - 999/month (100 customers)' },
                      { value: 'professional', label: 'Professional - 1999/month (500 customers)' },
                      { value: 'enterprise', label: 'Enterprise - 2999/month (unlimited)' },
                    ]}
                  />
                </div>
              </div>
              <button
                onClick={handleCreateBusiness}
                disabled={creatingBusiness || !secret || !businessForm.businessName || !businessForm.ownerWhatsapp}
                className={BTN_PRIMARY}
              >
                {creatingBusiness && <BtnSpinner />}
                {creatingBusiness ? 'Creating…' : 'Create Business & Send Welcome WhatsApp'}
              </button>
            </AdminPanel>

            {/* Business List Table */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <div className="p-4 border-b border-white/[0.07]">
                <h2 className="font-heading font-bold text-white/90">
                  All Businesses <span className="text-rm-green tabular-nums">({businesses.length})</span>
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className={TH_CLASS}>Business Name</th>
                      <th className={TH_CLASS}>Industry</th>
                      <th className={TH_CLASS}>Plan</th>
                      <th className={TH_CLASS}>Members</th>
                      <th className={TH_CLASS}>Code</th>
                      <th className={TH_CLASS}>Status</th>
                      <th className={TH_CLASS}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businesses.map((business) => (
                      <tr key={business.id} className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-150">
                        <td className="px-4 py-3 text-sm text-white/80 font-medium">{business.businessName}</td>
                        <td className="px-4 py-3 text-sm text-white/50 capitalize">{business.industryType || '-'}</td>
                        <td className="px-4 py-3 text-sm text-white/50 capitalize">{business.plan}</td>
                        <td className="px-4 py-3 text-sm font-bold text-white/85 tabular-nums">{business.memberCount || 0}</td>
                        <td className="px-4 py-3 text-sm font-mono text-rm-green/90">{business.businessCode}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-[11px] font-bold ${
                            business.isActive
                              ? 'bg-rm-green/[0.12] text-rm-green shadow-[inset_0_0_0_1px_rgba(37,211,102,0.3)]'
                              : 'bg-red-400/[0.1] text-red-400 shadow-[inset_0_0_0_1px_rgba(248,113,113,0.3)]'
                          }`}>
                            {business.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-1.5">
                            {/* REMOVED: View Members button — founder cannot browse member lists per Privacy Policy */}
                            <button
                              onClick={() => setBulkDialog({ open: true, businessId: business.id, businessName: business.businessName })}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#C4A5FF] bg-[#C4A5FF]/[0.08] shadow-[inset_0_0_0_1px_rgba(196,165,255,0.25)] hover:bg-[#C4A5FF]/[0.16] transition-colors duration-150"
                            >
                              Send Bulk
                            </button>
                            <button
                              onClick={() => {
                                fetchQRCode(business.id, business.businessName);
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rm-green bg-rm-green/[0.08] shadow-[inset_0_0_0_1px_rgba(37,211,102,0.25)] hover:bg-rm-green/[0.16] transition-colors duration-150"
                            >
                              QR Code
                            </button>
                            <button
                              onClick={() => setDeactivateDialog({ open: true, businessId: business.id, businessName: business.businessName })}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-400/[0.08] shadow-[inset_0_0_0_1px_rgba(248,113,113,0.25)] hover:bg-red-400/[0.16] transition-colors duration-150"
                            >
                              Deactivate
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {businesses.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-12 text-center">
                          <p className="text-3xl mb-2">🏢</p>
                          <p className="text-white/60 text-sm font-medium">Abhi koi business nahi</p>
                          <p className="text-white/30 text-xs mt-1">Upar se pehla business create karo.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Send Reminder to Any Member */}
            <AdminPanel title="📤 Send Reminder to Member" sub="One member, one message — owner-requested only" testId="panel-send-reminder">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={LABEL_CLASS}>Select Business</label>
                  <DarkSelect
                    value={individualMessage.businessId}
                    onChange={(v) => setIndividualMessage({...individualMessage, businessId: v})}
                    placeholder="Select Business"
                    options={businesses.map(business => ({ value: business.id, label: business.businessName }))}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Member WhatsApp</label>
                  <input
                    type="text"
                    value={individualMessage.memberWhatsapp}
                    onChange={(e) => setIndividualMessage({...individualMessage, memberWhatsapp: e.target.value})}
                    className={`${INPUT_CLASS} font-mono`}
                    placeholder="916269915175"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className={LABEL_CLASS}>Message</label>
                <textarea
                  value={individualMessage.message}
                  onChange={(e) => setIndividualMessage({...individualMessage, message: e.target.value})}
                  className={`${INPUT_CLASS} resize-y min-h-[100px]`}
                  rows={4}
                  placeholder="Enter message..."
                />
              </div>
              <button
                onClick={handleSendReminder}
                disabled={sendingReminder}
                className={BTN_PRIMARY}
              >
                {sendingReminder && <BtnSpinner />}
                {sendingReminder ? 'Sending…' : 'Send Message'}
              </button>
            </AdminPanel>

            {/* CSV Bulk Import Section */}
            <AdminPanel title="📥 Bulk Import Members (CSV)" sub="Upload a CSV file or paste CSV data. Format: Name, WhatsApp, Expiry Date (expiry optional)" testId="panel-csv-import">
              <div className="space-y-4">
                <div>
                  <label className={LABEL_CLASS}>Select Business *</label>
                  <DarkSelect
                    value={csvBusinessId}
                    onChange={(v) => setCsvBusinessId(v)}
                    placeholder="-- Select Business --"
                    options={businesses.map(b => ({ value: b.id, label: b.businessName }))}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Paste CSV Data *</label>
                  <textarea
                    value={csvData}
                    onChange={e => setCsvData(e.target.value)}
                    placeholder={`Name,WhatsApp,ExpiryDate\nRahul Sharma,9876543210,2026-07-01\nPriya Singh,919876543211,2026-08-15\nAmit Kumar,9123456789`}
                    rows={8}
                    className={`${INPUT_CLASS} font-mono text-[13px] resize-y`}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Or Upload CSV File</label>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = ev => setCsvData(ev.target.result);
                      reader.readAsText(file);
                    }}
                    className="text-[13px] text-white/60 file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-rm-green/[0.12] file:text-rm-green file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-rm-green/[0.2]"
                  />
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 text-xs text-white/45 leading-relaxed">
                  <strong className="text-white/70">📋 Supported formats:</strong><br/>
                  • <code className="text-rm-green/80">Name, Phone, YYYY-MM-DD</code> — with expiry<br/>
                  • <code className="text-rm-green/80">Name, Phone</code> — no expiry<br/>
                  • <code className="text-rm-green/80">Phone, Name, YYYY-MM-DD</code> — phone first<br/>
                  • Phone can be 10 digits (91 added automatically) or full 91XXXXXXXXXX<br/>
                  • Header row is auto-detected and skipped<br/>
                  • Supports comma (,) or semicolon (;) separator
                </div>
                <button
                  onClick={handleCsvImport}
                  disabled={csvImporting || !csvBusinessId || !csvData.trim()}
                  className={BTN_PRIMARY}
                >
                  {csvImporting && <BtnSpinner />}
                  {csvImporting ? 'Importing…' : '📥 Import Members'}
                </button>

                {/* Import results — animated stat strip */}
                {csvResults && csvResults.results && (
                  <motion.div
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className={`rounded-xl border p-4 ${
                      csvResults.results.failed > 0 ? 'border-red-400/30 bg-red-400/[0.04]' : 'border-rm-green/30 bg-rm-green/[0.04]'
                    }`}
                  >
                    <h4 className="text-sm font-heading font-bold text-white/85 mb-3">📊 Import Results</h4>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: 'Total', value: csvResults.results.total, color: 'text-white/85' },
                        { label: '✅ Success', value: csvResults.results.success, color: 'text-rm-green' },
                        { label: '❌ Failed', value: csvResults.results.failed, color: 'text-red-400' },
                        { label: '⏭️ Skipped', value: csvResults.results.skipped, color: 'text-[#FF9933]' },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: 0.08 * i, ease: [0.23, 1, 0.32, 1] }}
                          className="text-center py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                        >
                          <div className={`font-heading font-extrabold text-xl tabular-nums ${item.color}`}>{item.value}</div>
                          <div className="text-[10px] text-white/35 mt-0.5">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                    {csvResults.results.errors.length > 0 && (
                      <div className="text-xs text-red-400">
                        <strong>Errors:</strong>
                        <ul className="mt-1 pl-4 list-disc space-y-0.5 text-red-400/80">
                          {csvResults.results.errors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </AdminPanel>

            {/* Add Member Form */}
            <AdminPanel title="➕ Add Member to Business" sub="Add member directly - no Supabase needed. Welcome WhatsApp sent automatically." testId="panel-add-member">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={LABEL_CLASS}>Select Business *</label>
                  <DarkSelect
                    value={addMemberForm.businessId}
                    onChange={(v) => setAddMemberForm({ ...addMemberForm, businessId: v })}
                    placeholder="Select Business"
                    options={businesses.map(b => ({ value: b.id, label: b.businessName }))}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Member WhatsApp * (with country code)</label>
                  <input
                    type="text"
                    value={addMemberForm.memberWhatsapp}
                    onChange={(e) => setAddMemberForm({
                      ...addMemberForm,
                      memberWhatsapp: e.target.value.replace(/\D/g, '')
                    })}
                    className={`${INPUT_CLASS} font-mono`}
                    placeholder="919876543210"
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Member Name (optional)</label>
                  <input
                    type="text"
                    value={addMemberForm.memberName}
                    onChange={(e) => setAddMemberForm({
                      ...addMemberForm, memberName: e.target.value
                    })}
                    className={INPUT_CLASS}
                    placeholder="Rahul Sharma"
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Subscription End Date (optional)</label>
                  <input
                    type="date"
                    value={addMemberForm.subscriptionEndDate}
                    onChange={(e) => setAddMemberForm({
                      ...addMemberForm, subscriptionEndDate: e.target.value
                    })}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
              <button
                onClick={handleAddMember}
                disabled={addingMember || !addMemberForm.businessId || !addMemberForm.memberWhatsapp}
                className={BTN_PRIMARY}
              >
                {addingMember && <BtnSpinner />}
                {addingMember ? 'Adding…' : 'Add Member & Send Welcome WhatsApp →'}
              </button>
              {addMemberMsg && (
                <p className={`mt-3 text-sm font-medium ${
                  addMemberMsg.includes('sent') ? 'text-rm-green' : 'text-red-400'
                }`}>
                  {addMemberMsg}
                </p>
              )}
            </AdminPanel>

            {/* Standalone Update Member Expiry — no member browsing */}
            <AdminPanel
              title="🔧 Update Member Expiry"
              sub="Owner-requested only. Type the member's WhatsApp number provided by the business owner. No browsing — founder cannot see member lists."
              testId="panel-update-expiry"
            >
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={LABEL_CLASS}>Select Business *</label>
                  <DarkSelect
                    value={standaloneUpdateExpiry.businessId}
                    onChange={(v) => setStandaloneUpdateExpiry({...standaloneUpdateExpiry, businessId: v})}
                    placeholder="Select Business"
                    options={businesses.map(b => ({ value: b.id, label: b.businessName }))}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Member WhatsApp *</label>
                  <input
                    type="text"
                    value={standaloneUpdateExpiry.memberWhatsapp}
                    onChange={(e) => setStandaloneUpdateExpiry({...standaloneUpdateExpiry, memberWhatsapp: e.target.value.replace(/\D/g, '')})}
                    className={`${INPUT_CLASS} font-mono`}
                    placeholder="919876543210"
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS}>New Expiry Date *</label>
                  <input
                    type="date"
                    value={standaloneUpdateExpiry.newExpiryDate}
                    onChange={(e) => setStandaloneUpdateExpiry({...standaloneUpdateExpiry, newExpiryDate: e.target.value})}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateExpiry}
                disabled={updatingExpiry || !standaloneUpdateExpiry.businessId || !standaloneUpdateExpiry.memberWhatsapp || !standaloneUpdateExpiry.newExpiryDate}
                className={BTN_PRIMARY}
              >
                {updatingExpiry && <BtnSpinner />}
                {updatingExpiry ? 'Updating…' : 'Update Expiry & Notify Member'}
              </button>
              {standaloneUpdateMsg && (
                <p className={`mt-3 text-sm font-medium ${
                  standaloneUpdateMsg.includes('✅') ? 'text-rm-green' : 'text-red-400'
                }`}>
                  {standaloneUpdateMsg}
                </p>
              )}
            </AdminPanel>
          </div>
        )}

      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              key="user-panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setSelectedUser(null)}
            />
            <motion.aside
              key="user-panel"
              initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 340, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#101410] border-l border-white/[0.08] shadow-[-24px_0_64px_rgba(0,0,0,0.5)] overflow-y-auto"
              role="dialog"
              aria-label="User details"
            >
              <div className="sticky top-0 bg-[#101410]/95 backdrop-blur-sm border-b border-white/[0.07] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center font-heading font-bold text-white shadow-[0_0_16px_rgba(37,211,102,0.25)]">
                    {(selectedUser.name || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white leading-tight">{selectedUser.name || 'Unknown'}</h3>
                    <p className="text-xs font-mono text-white/40">{selectedUser.whatsapp_phone_number}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  aria-label="Close panel"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 text-center">
                    <p className="font-heading font-extrabold text-2xl text-rm-green tabular-nums">{selectedUser.sentReminders || 0}</p>
                    <p className="text-[11px] text-white/35 mt-0.5">Reminders sent</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 text-center">
                    <p className="font-heading font-extrabold text-2xl text-[#7CC5FF] tabular-nums">{selectedUser.pendingReminders || 0}</p>
                    <p className="text-[11px] text-white/35 mt-0.5">Pending</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] divide-y divide-white/[0.05]">
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-white/40">Plan</span>
                    <PlanBadge plan={selectedUser.plan} />
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-white/40">Phone</span>
                    <span className="font-mono text-white/80">{selectedUser.whatsapp_phone_number}</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-white/40">Joined</span>
                    <span className="text-white/70">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString('en-IN') : 'N/A'}</span>
                  </div>
                  {selectedUser.plan_expires_at && (
                    <div className="flex justify-between items-center px-4 py-3 text-sm">
                      <span className="text-white/40">Pro expires</span>
                      <span className="text-[#FF9933] font-medium">{new Date(selectedUser.plan_expires_at).toLocaleDateString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-white/25 text-center">Esc ya bahar click karke band karo</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

        {/* Broadcast Tab */}
        {activeTab === 'broadcast' && (
          <AdminPanel title="📢 Broadcast Message" sub="WhatsApp template blast to a whole user segment — handle with care" className="max-w-2xl" testId="panel-broadcast">
            {/* Audience — segmented radio cards (native radios render OS-light).
                Each card surfaces the live segment size from /stats aggregates. */}
            <div className="mb-6" role="radiogroup" aria-label="Audience">
              <label className={LABEL_CLASS}>Audience</label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {BROADCAST_FILTERS.map((option) => {
                  const active = broadcastFilter === option.value;
                  const count = stats?.users ? (stats.users[option.statsKey] ?? null) : null;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setBroadcastFilter(option.value)}
                      className={`group relative flex flex-col gap-2 rounded-xl px-4 py-3.5 text-left transition-colors duration-150 ${
                        active
                          ? 'bg-rm-green/[0.1] shadow-[inset_0_0_0_1px_rgba(37,211,102,0.4)]'
                          : 'bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-150 ${active ? 'border-rm-green' : 'border-white/25'}`}>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-rm-green" />}
                        </span>
                        <span className={`text-sm font-semibold transition-colors duration-150 ${active ? 'text-rm-green' : 'text-white/70 group-hover:text-white/90'}`}>
                          {option.icon} {option.label}
                        </span>
                      </span>
                      <span className={`pl-[22px] text-[11px] tabular-nums transition-colors duration-150 ${active ? 'text-rm-green/70' : 'text-white/35'}`}>
                        {count !== null ? `${count.toLocaleString('en-IN')} recipient${count === 1 ? '' : 's'}` : 'count unavailable'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className={`${LABEL_CLASS} mb-0`}>Message</label>
                <span className="text-[11px] text-white/30 tabular-nums">{broadcastMessage.length} chars</span>
              </div>
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type your message here…  (paste-friendly — line breaks preserved)"
                className={`${INPUT_CLASS} min-h-[140px] resize-y leading-relaxed`}
              />
            </div>

            {/* Danger note — saffron, mirrors the Business warning language */}
            <div className="mb-5 flex items-start gap-2.5 p-4 rounded-xl bg-[#FF9933]/[0.06] border border-[#FF9933]/25">
              <AlertTriangle className="w-4 h-4 text-[#FF9933] shrink-0 mt-0.5" />
              <p className="text-sm text-[#FFB366] leading-relaxed">
                <span className="font-bold text-[#FF9933]">Irreversible.</span> This sends a WhatsApp template to{' '}
                {broadcastTargetCount !== null
                  ? <><strong className="tabular-nums">~{broadcastTargetCount.toLocaleString('en-IN')}</strong> {broadcastMeta.noun}</>
                  : <>every <strong>{broadcastMeta.noun}</strong></>}
                {' '}and cannot be undone once it starts.
              </p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {broadcastError && (
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="mb-4 p-3 rounded-xl bg-red-400/[0.06] border border-red-400/25"
                >
                  <p className="text-sm text-red-400">{broadcastError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result — designed cards for started / complete / zero-sent */}
            <AnimatePresence>
              {broadcastResult && (
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  className={`mb-5 p-4 rounded-xl border ${
                    broadcastResult.status === 'started'
                      ? 'bg-[#7CC5FF]/[0.06] border-[#7CC5FF]/25'
                      : broadcastResult.sent === 0
                      ? 'bg-red-400/[0.06] border-red-400/25'
                      : 'bg-rm-green/[0.06] border-rm-green/25'
                  }`}
                >
                  {broadcastResult.status === 'started' ? (
                    <div className="flex items-start gap-3">
                      <Loader2 className="w-4 h-4 text-[#7CC5FF] shrink-0 mt-0.5 animate-spin motion-reduce:animate-none" />
                      <div>
                        <p className="font-heading font-bold text-sm text-[#7CC5FF] mb-1">Broadcast started</p>
                        <p className="text-sm text-[#7CC5FF]/85">
                          Sending to <strong className="tabular-nums">{(broadcastResult.total ?? 0).toLocaleString('en-IN')} users</strong> via WhatsApp template.
                        </p>
                        <p className="text-xs text-[#7CC5FF]/60 mt-2 leading-relaxed">
                          ETA ~{Math.max(1, Math.ceil((broadcastResult.total ?? 0) / 60))} min to complete. You'll get a WhatsApp message when it finishes.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className={`font-heading font-bold text-sm mb-3 ${broadcastResult.sent === 0 ? 'text-red-400' : 'text-rm-green'}`}>
                        {broadcastResult.sent === 0 ? 'No messages sent' : 'Broadcast complete'}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Sent', value: broadcastResult.sent ?? 0, color: 'text-rm-green' },
                          { label: 'Failed', value: broadcastResult.failed ?? 0, color: 'text-red-400' },
                          { label: 'Total', value: broadcastResult.total ?? 0, color: 'text-white/85' },
                        ].map((chip, i) => (
                          <motion.div
                            key={chip.label}
                            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25, delay: 0.07 * i, ease: [0.23, 1, 0.32, 1] }}
                            className="text-center py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                          >
                            <div className={`font-heading font-extrabold text-xl tabular-nums ${chip.color}`}>{chip.value.toLocaleString('en-IN')}</div>
                            <div className="text-[10px] text-white/35 mt-0.5">{chip.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Send Button — opens the styled danger confirmation */}
            <button
              onClick={requestBroadcast}
              disabled={broadcastLoading || !broadcastMessage.trim()}
              className={BTN_PRIMARY}
            >
              {broadcastLoading && <BtnSpinner />}
              {broadcastLoading ? 'Sending…' : 'Send Broadcast'}
            </button>
          </AdminPanel>
        )}

        {/* Inbox Tab */}
        {activeTab === 'inbox' && (
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="overflow-auto max-h-[72vh]">
              {/* Sticky header — refresh wired to fetchInbox() (no args) so it does a
                  fresh load, not an accidental load-more from passing the click event */}
              <div className="sticky top-0 z-10 bg-[#10140E] px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <h2 className="font-heading font-bold text-white/90">
                  Inbox <span className="text-rm-green">— last 30</span>
                </h2>
                <button
                  onClick={() => fetchInbox()}
                  disabled={inboxLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 border border-white/10 hover:border-rm-green/40 hover:text-rm-green disabled:opacity-50 transition-colors duration-200"
                >
                  <RefreshCw className={`w-4 h-4 ${inboxLoading ? 'animate-spin' : ''}`} /> Refresh
                </button>
              </div>

              <div className="p-4">
                {/* Error */}
                {inboxError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-400/[0.06] border border-red-400/25">
                    <p className="text-sm text-red-400">{inboxError}</p>
                  </div>
                )}

                {/* Shimmer skeleton only on the initial load — load-more keeps the
                    existing list visible and spins the button instead */}
                {inboxLoading && inboxMessages.length === 0 ? (
                  <div className="space-y-3">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-2">
                            <AdminSkeleton className="h-3.5 w-32 rounded" />
                            <AdminSkeleton className="h-3 w-24 rounded" />
                          </div>
                          <AdminSkeleton className="h-3 w-24 rounded" />
                        </div>
                        <AdminSkeleton className="h-3 w-full rounded mb-1.5" />
                        <AdminSkeleton className="h-3 w-3/4 rounded" />
                      </div>
                    ))}
                  </div>
                ) : inboxMessages.length === 0 ? (
                  <div className="px-4 py-14 text-center">
                    <p className="text-3xl mb-2">📭</p>
                    <p className="text-white/60 text-sm font-medium">Inbox khaali hai</p>
                    <p className="text-white/30 text-xs mt-1">Jab koi user reply karega, woh yahan dikhega.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inboxMessages.map((message, i) => (
                      <InboxCard
                        key={message.id}
                        message={message}
                        index={i}
                        expanded={!!expandedMessages[message.id]}
                        onToggle={toggleMessage}
                        reduce={reducedMotion}
                      />
                    ))}

                    {/* Load More — styled dark button; keeps hasMoreMessages logic */}
                    {hasMoreMessages && (
                      <div className="text-center pt-3">
                        <button
                          onClick={() => fetchInbox(true)}
                          disabled={inboxLoading}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:border-rm-green/40 hover:text-rm-green disabled:opacity-50 transition-colors duration-200"
                        >
                          {inboxLoading && <BtnSpinner />}
                          {inboxLoading ? 'Loading…' : 'Load More'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

    {/* QR Code Modal */}
    <AnimatePresence>
    {qrModal.show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 bg-black/65 flex items-center justify-center z-[80] px-4"
        onClick={() => setQrModal({ show: false, businessName: '', qrCode: '', joinUrl: '' })}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-md rounded-2xl bg-[#131714] border border-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-bold text-white">{qrModal.businessName}</h3>
            <button
              onClick={() => setQrModal({ show: false, businessName: '', qrCode: '', joinUrl: '' })}
              aria-label="Close QR modal"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center">
            {/* White plate so the QR stays scannable on the dark theme */}
            <div className="inline-block bg-white rounded-2xl p-3 mb-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <img
                src={qrModal.qrCode}
                alt="QR Code"
                className="w-[280px] h-[280px]"
              />
            </div>

            <div className="mb-4 p-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-left">
              <p className="text-[11px] text-white/35 mb-1">Join URL:</p>
              <p className="text-xs font-mono break-all text-rm-green/90">{qrModal.joinUrl}</p>
            </div>

            <p className="text-xs text-white/40 mb-4">
              Print this QR code and place it at your front desk
            </p>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrModal.qrCode;
                  link.download = `${qrModal.businessName.replace(/[^a-zA-Z0-9]/g, '-')}-join-qr.png`;
                  link.click();
                }}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-br from-rm-primary to-rm-green shadow-[0_4px_14px_rgba(0,109,47,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
              >
                Download QR
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:bg-white/[0.05] transition-colors duration-150"
              >
                Print
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>

        {/* ═══ SECURITY TAB ═══ */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4">
              <div className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-rm-green/10 text-rm-green">
                <Shield className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-heading font-bold text-white/90">Security Center</h2>
                  <button
                    onClick={() => refreshSecurityData()}
                    disabled={securityStatusLoading || blockedLoading}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-white/60 border border-white/10 hover:border-rm-green/40 hover:text-rm-green disabled:opacity-50 transition-colors duration-200"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${(securityStatusLoading || blockedLoading) ? 'animate-spin' : ''}`} /> Refresh
                  </button>
                </div>
                <p className="text-sm text-white/45 mt-1 leading-relaxed">
                  Manage paused numbers and monitor abuse protections — mirrors WhatsApp admin BLOCK / UNBLOCK / SECURITY STATUS.
                </p>
              </div>
            </div>

            {/* System Status */}
            <div>
              <h3 className="font-heading font-bold text-sm text-white/90 mb-3">System Status</h3>
              {securityStatusError && (
                <div className="mb-4 p-3 rounded-xl bg-red-400/[0.06] border border-red-400/25 flex items-center justify-between gap-3">
                  <p className="text-sm text-red-400">{securityStatusError}</p>
                  <button
                    onClick={() => fetchSecurityStatus()}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Blocked Numbers', accent: '#F87171', value: securityStatus?.pausedUsers },
                  { label: 'Auto-Paused Users', accent: '#FF9933', value: securityStatus?.autoPausedUsers },
                  { label: '24h Messages', accent: '#7CC5FF', value: securityStatus?.last24hMessages },
                ].map((card) => (
                  <div key={card.label} className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 overflow-hidden">
                    <div aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-white/40 font-medium">{card.label}</p>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accent, opacity: 0.7 }} />
                    </div>
                    {securityStatusLoading && securityStatus === null ? (
                      <AdminSkeleton className="h-9 w-16 rounded" />
                    ) : (
                      <p className="font-heading font-extrabold text-3xl tabular-nums text-white/90" style={{ letterSpacing: '-0.02em' }}>
                        {card.value ?? '—'}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Blocked Numbers table */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
              <div className="p-4 border-b border-white/[0.07] flex items-center justify-between">
                <h3 className="font-heading font-bold text-white/90">Blocked Numbers</h3>
                <span className="text-[11px] text-white/30 tabular-nums">
                  {blockedLoading && blockedUsers.length === 0 ? 'Loading…' : `${blockedUsers.length} paused`}
                </span>
              </div>
              {blockedError && (
                <div className="mx-4 mt-4 p-3 rounded-xl bg-red-400/[0.06] border border-red-400/25 flex items-center justify-between gap-3">
                  <p className="text-sm text-red-400">{blockedError}</p>
                  <button
                    onClick={() => fetchSecurityBlocked()}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className={TH_CLASS}>Phone</th>
                      <th className={TH_CLASS}>Reason</th>
                      <th className={TH_CLASS}>Blocked At</th>
                      <th className={TH_CLASS}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockedLoading && blockedUsers.length === 0 ? (
                      [0, 1, 2].map((i) => (
                        <tr key={i} className="border-b border-white/[0.04]">
                          <td className="px-4 py-3"><AdminSkeleton className="h-4 w-28 rounded" /></td>
                          <td className="px-4 py-3"><AdminSkeleton className="h-4 w-36 rounded" /></td>
                          <td className="px-4 py-3"><AdminSkeleton className="h-4 w-24 rounded" /></td>
                          <td className="px-4 py-3"><AdminSkeleton className="h-7 w-20 rounded-lg" /></td>
                        </tr>
                      ))
                    ) : blockedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-sm text-white/35">
                          No blocked numbers right now.
                        </td>
                      </tr>
                    ) : (
                      blockedUsers.map((row) => (
                        <tr key={row.whatsapp_phone_number} className="border-b border-white/[0.04]">
                          <td className="px-4 py-3 text-sm font-mono text-white/75">
                            +{row.whatsapp_phone_number}
                          </td>
                          <td className="px-4 py-3 text-sm text-white/55">
                            {row.auto_paused_reason || row.reason || '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-white/40 tabular-nums">
                            {(row.manually_blocked_at || row.timestamp) ? formatIST(row.manually_blocked_at || row.timestamp) : '—'}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleUnblock(row.whatsapp_phone_number)}
                              disabled={unblocking && unblockingPhone === row.whatsapp_phone_number}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rm-green bg-rm-green/[0.08] shadow-[inset_0_0_0_1px_rgba(37,211,102,0.25)] hover:bg-rm-green/[0.14] disabled:opacity-50 transition-colors inline-flex items-center gap-1.5"
                            >
                              {unblocking && unblockingPhone === row.whatsapp_phone_number ? <BtnSpinner /> : null}
                              Unblock
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Block / Unblock controls */}
            <div className="grid lg:grid-cols-2 gap-6">
              <AdminPanel title="🚫 Block a Number" sub="Hard-block — bot goes silent. RESUME cannot restore access; only admin unblock does.">
                <div className="space-y-3">
                  <div>
                    <label className={LABEL_CLASS}>WhatsApp number</label>
                    <input
                      type="text"
                      value={blockPhone}
                      onChange={(e) => setBlockPhone(e.target.value)}
                      placeholder="919876543210"
                      className={`${INPUT_CLASS} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Reason</label>
                    <input
                      type="text"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      placeholder="Spam / abuse"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <button
                    onClick={handleBlockSubmit}
                    disabled={blocking}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-red-500/90 shadow-[0_4px_14px_rgba(239,68,68,0.25)] hover:bg-red-500 disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    {blocking ? <BtnSpinner /> : <Lock className="w-4 h-4" />}
                    Block Number
                  </button>
                </div>
              </AdminPanel>

              <AdminPanel title="✅ Unblock a Number" sub="Restores bot access for a previously blocked number">
                <div className="space-y-3">
                  <div>
                    <label className={LABEL_CLASS}>WhatsApp number</label>
                    <input
                      type="text"
                      value={unblockPhone}
                      onChange={(e) => setUnblockPhone(e.target.value)}
                      placeholder="919876543210"
                      className={`${INPUT_CLASS} font-mono`}
                    />
                  </div>
                  <button
                    onClick={() => handleUnblock(unblockPhone)}
                    disabled={unblocking}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white/80 border border-white/15 hover:border-rm-green/40 hover:text-rm-green disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    {unblocking && unblockingPhone === unblockPhone.trim() ? <BtnSpinner /> : <Check className="w-4 h-4" />}
                    Unblock
                  </button>
                </div>
              </AdminPanel>
            </div>

            {/* Security Status — policy cards */}
            <div>
              <h3 className="font-heading font-bold text-sm text-white/90 mb-3">Security Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: '🔒',
                    title: 'Permanent blocks',
                    desc: securityStatus?.protections?.autoPause
                      || 'Blocked numbers stay blocked across restarts until manually unblocked.'
                  },
                  {
                    icon: '⏱️',
                    title: 'Per-user rate limit',
                    desc: securityStatus?.protections?.rateLimit
                      || 'Each number is throttled to a safe message rate; abusers are auto-paused.'
                  },
                  {
                    icon: '📏',
                    title: 'Message size limit',
                    desc: securityStatus?.protections?.sizeLimit
                      || 'Oversized inbound payloads are rejected before they reach the handler.'
                  },
                  {
                    icon: '🛡️',
                    title: 'DDoS protection',
                    desc: securityStatus?.protections?.ipTracking
                      || 'Burst traffic is shed at the edge to keep the bot responsive for everyone.'
                  },
                ].map((p) => (
                  <div key={p.title} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                    <div className="text-2xl mb-2">{p.icon}</div>
                    <p className="font-heading font-bold text-sm text-white/85 mb-1">{p.title}</p>
                    <p className="text-[12px] text-white/40 leading-relaxed">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-bold tracking-wide text-rm-green/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-rm-green/70" /> ACTIVE POLICY
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        </motion.div>
        </main>
      </div>

      {/* ── Bulk message dialog (replaces window.prompt) ── */}
      <AnimatePresence>
        {bulkDialog.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 bg-black/65"
            onClick={() => setBulkDialog({ open: false, businessId: '', businessName: '' })}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-md rounded-2xl bg-[#131714] border border-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Send bulk message"
            >
              <h3 className="font-heading font-bold text-white mb-1">📢 Bulk message — {bulkDialog.businessName}</h3>
              <p className="text-sm text-white/45 mb-4">Sabhi members ko ek saath WhatsApp jayega.</p>
              <textarea
                value={bulkMessage}
                onChange={(e) => setBulkMessage(e.target.value)}
                rows={4}
                autoFocus
                placeholder="Message likho…"
                className={`${INPUT_CLASS} resize-y mb-1`}
              />
              <p className="text-[11px] text-white/30 text-right mb-4 tabular-nums">{bulkMessage.length} chars</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBulkDialog({ open: false, businessId: '', businessName: '' })}
                  disabled={bulkSending}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:bg-white/[0.05] transition-colors duration-150"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendBulkMessage(bulkDialog.businessId, bulkMessage)}
                  disabled={bulkSending || !bulkMessage.trim()}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-br from-rm-primary to-rm-green shadow-[0_4px_14px_rgba(0,109,47,0.35)] disabled:opacity-50 inline-flex items-center justify-center gap-2 transition-all duration-150"
                >
                  {bulkSending && <BtnSpinner />}
                  {bulkSending ? 'Sending…' : 'Send to all members'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Broadcast confirmation (replaces window.confirm) — fires the SAME
            /api/admin/broadcast request only after explicit confirm ── */}
      <ConfirmDialog
        open={broadcastConfirmOpen}
        title="Send this broadcast?"
        body="A WhatsApp template message goes out to the selected segment."
        consequences={[
          broadcastTargetCount !== null
            ? `Sends to ~${broadcastTargetCount.toLocaleString('en-IN')} ${broadcastMeta.noun}.`
            : `Sends to every ${broadcastMeta.noun}.`,
          'Delivery runs in the background and cannot be stopped once started.',
          'Counts toward your WhatsApp template messaging limits.',
        ]}
        confirmLabel={broadcastLoading ? 'Sending…' : 'Send broadcast'}
        danger
        loading={broadcastLoading}
        onConfirm={sendBroadcast}
        onCancel={() => setBroadcastConfirmOpen(false)}
      />

      {/* ── Deactivate confirmation (replaces window.confirm) ── */}
      <ConfirmDialog
        open={deactivateDialog.open}
        title={`Deactivate ${deactivateDialog.businessName}?`}
        body="Yeh business ke saare automatic reminders rok dega."
        consequences={[
          'Members ko expiry reminders milna band ho jayenge',
          'Owner ka WhatsApp console kaam karna band kar dega',
          'Business list mein Inactive dikhega — data delete nahi hota',
        ]}
        confirmLabel="Deactivate"
        danger
        loading={deactivating}
        onConfirm={handleDeactivateBusiness}
        onCancel={() => setDeactivateDialog({ open: false, businessId: '', businessName: '' })}
      />

      {/* ── Block number confirmation ── */}
      <ConfirmDialog
        open={blockConfirmOpen}
        title={`Block +${blockPhone.trim()}?`}
        body="Permanent hard-block — the bot will ignore this number completely until you unblock it here."
        consequences={[
          'All bot engagement stops immediately (no replies, no reminders)',
          'Sending RESUME will NOT restore access — only admin unblock can',
          blockReason.trim() ? `Reason: ${blockReason.trim()}` : 'Reason: manual_admin_block',
        ]}
        confirmLabel={blocking ? 'Blocking…' : 'Block number'}
        danger
        loading={blocking}
        onConfirm={executeBlock}
        onCancel={() => setBlockConfirmOpen(false)}
      />

      {/* ── Command Palette (Ctrl/Cmd+K) ── */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[16vh] px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Command
                loop
                className="rounded-2xl overflow-hidden bg-[#131714] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center gap-2.5 px-4 border-b border-white/[0.07]">
                  <Search className="w-4 h-4 text-white/30 shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="Jump to a section or run an action…"
                    className="w-full bg-transparent py-3.5 text-sm text-white placeholder:text-white/30 outline-none"
                  />
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-white/40 shrink-0">Esc</kbd>
                </div>
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-white/30">
                    Kuch nahi mila — try another word.
                  </Command.Empty>
                  <Command.Group
                    heading="Sections"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-white/25"
                  >
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Command.Item
                          key={item.id}
                          value={item.label}
                          onSelect={() => {
                            switchTab(item.id);
                            setPaletteOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer data-[selected=true]:bg-rm-green/[0.12] data-[selected=true]:text-rm-green data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(37,211,102,0.25)]"
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                  <Command.Group
                    heading="Actions"
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-[0.15em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-white/25"
                  >
                    <Command.Item
                      value="Refresh data"
                      onSelect={() => {
                        setPaletteOpen(false);
                        fetchData(secret);
                        if (activeTab === 'inbox') fetchInbox();
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer data-[selected=true]:bg-rm-green/[0.12] data-[selected=true]:text-rm-green data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(37,211,102,0.25)]"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh data
                    </Command.Item>
                    <Command.Item
                      value="Focus user search"
                      onSelect={() => {
                        setPaletteOpen(false);
                        switchTab('users');
                        setTimeout(() => searchInputRef.current && searchInputRef.current.focus(), 80);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer data-[selected=true]:bg-rm-green/[0.12] data-[selected=true]:text-rm-green data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(37,211,102,0.25)]"
                    >
                      <Search className="w-4 h-4" />
                      Focus user search
                      <kbd className="ml-auto px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-white/40">/</kbd>
                    </Command.Item>
                    <Command.Item
                      value="Logout"
                      onSelect={handleLogout}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 cursor-pointer data-[selected=true]:bg-red-500/[0.12] data-[selected=true]:text-red-400 data-[selected=true]:shadow-[inset_0_0_0_1px_rgba(248,113,113,0.25)]"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
