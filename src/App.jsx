import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Pencil,
  X,
  Building2,
  Phone,
  Mail,
  FileText,
  Briefcase,
  TrendingUp,
  CircleCheck,
  CircleX,
  CalendarDays,
  Download,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Flag,
  Filter,
  PanelLeft,
  CheckCircle2,
  Clock3,
  Sparkles,
  UserCircle2,
  ChevronRight,
} from "lucide-react";

const STATUS_OPTIONS = ["New", "Contacted", "In Progress", "Won", "Lost"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];
const SOURCE_OPTIONS = ["Website", "Facebook", "Instagram", "Referral", "Email"];

const initialClients = [
  {
    id: crypto.randomUUID(),
    name: "Northstar Studio",
    email: "hello@northstarstudio.co.uk",
    phone: "+44 7400 123456",
    status: "New",
    priority: "High",
    source: "Website",
    dealValue: 2400,
    followUp: "2026-04-10",
    notes: "Interested in branding, landing page and ad creatives.",
    company: "Northstar Studio",
    lastContact: "2026-04-05",
  },
  {
    id: crypto.randomUUID(),
    name: "Olivia Carter",
    email: "olivia@oaklane.co.uk",
    phone: "+44 7700 555444",
    status: "In Progress",
    priority: "Medium",
    source: "Instagram",
    dealValue: 1800,
    followUp: "2026-04-14",
    notes: "Waiting for final quote approval and service scope confirmation.",
    company: "Oaklane Interiors",
    lastContact: "2026-04-03",
  },
  {
    id: crypto.randomUUID(),
    name: "Mason Reed",
    email: "mason@reedfitness.co.uk",
    phone: "+44 7900 888111",
    status: "Won",
    priority: "Low",
    source: "Referral",
    dealValue: 3200,
    followUp: "2026-04-18",
    notes: "Signed for landing page, paid ads and monthly management.",
    company: "Reed Fitness",
    lastContact: "2026-04-01",
  },
  {
    id: crypto.randomUUID(),
    name: "Emily Stone",
    email: "emily@stoneclinic.co.uk",
    phone: "+44 7700 111222",
    status: "Contacted",
    priority: "High",
    source: "Facebook",
    dealValue: 1500,
    followUp: "2026-04-08",
    notes: "Requested a simple website refresh and Google reviews workflow.",
    company: "Stone Clinic",
    lastContact: "2026-04-06",
  },
];

function formatDate(date) {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function StatCard({ title, value, icon: Icon, hint }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">{value}</h3>
          {hint ? <p className="mt-2 text-xs text-zinc-500">{hint}</p> : null}
        </div>
        <div className="rounded-2xl bg-white/10 p-3 text-zinc-200">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    New: "bg-sky-500/15 text-sky-300 border-sky-400/20",
    Contacted: "bg-amber-500/15 text-amber-300 border-amber-400/20",
    "In Progress": "bg-violet-500/15 text-violet-300 border-violet-400/20",
    Won: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20",
    Lost: "bg-rose-500/15 text-rose-300 border-rose-400/20",
  };

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>{status}</span>;
}

function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-zinc-500/15 text-zinc-300 border-zinc-400/20",
    Medium: "bg-orange-500/15 text-orange-300 border-orange-400/20",
    High: "bg-red-500/15 text-red-300 border-red-400/20",
  };

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[priority]}`}>{priority} Priority</span>;
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20"
      />
    </label>
  );
}

function SelectField({ label, children, ...props }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <select
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20"
      >
        {children}
      </select>
    </label>
  );
}

function ClientFormModal({ open, onClose, onSave, editingClient }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
    priority: "Medium",
    source: "Website",
    dealValue: "",
    followUp: "",
    lastContact: "",
    notes: "",
  });

  useEffect(() => {
    if (editingClient) {
      setForm(editingClient);
    } else {
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        status: "New",
        priority: "Medium",
        source: "Website",
        dealValue: "",
        followUp: "",
        lastContact: "",
        notes: "",
      });
    }
  }, [editingClient, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ ...form, dealValue: Number(form.dealValue || 0), id: editingClient?.id || crypto.randomUUID() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">{editingClient ? "Edit Lead" : "Add New Lead"}</h2>
            <p className="mt-1 text-sm text-zinc-400">A polished CRM-style form for demo and portfolio use.</p>
          </div>
          <button onClick={onClose} className="rounded-2xl border border-white/10 p-2 text-zinc-300 transition hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Contact Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Company" name="company" value={form.company} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />

          <SelectField label="Status" name="status" value={form.status} onChange={handleChange}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="bg-zinc-900">{status}</option>
            ))}
          </SelectField>

          <SelectField label="Priority" name="priority" value={form.priority} onChange={handleChange}>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority} className="bg-zinc-900">{priority}</option>
            ))}
          </SelectField>

          <SelectField label="Lead Source" name="source" value={form.source} onChange={handleChange}>
            {SOURCE_OPTIONS.map((source) => (
              <option key={source} value={source} className="bg-zinc-900">{source}</option>
            ))}
          </SelectField>

          <Input label="Deal Value (£)" name="dealValue" value={form.dealValue} onChange={handleChange} type="number" />
          <Input label="Follow-up Date" name="followUp" value={form.followUp} onChange={handleChange} type="date" />
          <Input label="Last Contact" name="lastContact" value={form.lastContact} onChange={handleChange} type="date" />

          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-zinc-300">Notes</span>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20"
              placeholder="Add context, next steps, offer details..."
            />
          </label>

          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-3 text-zinc-300 transition hover:bg-white/5">Cancel</button>
            <button type="submit" className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90">{editingClient ? "Save Changes" : "Add Lead"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("demo@clientflow.co.uk");
  const [password, setPassword] = useState("password123");

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="mb-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black">ClientFlow Demo</div>
          <h1 className="text-4xl font-semibold leading-tight">A premium mini CRM your agency could build for clients.</h1>
          <p className="mt-4 max-w-xl text-zinc-400">This is a polished front-end demo designed for portfolio use, sales presentations and marketing showcases.</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <Sparkles className="mb-3 text-zinc-200" size={20} />
              <h3 className="font-medium">Sales-ready demo</h3>
              <p className="mt-2 text-sm text-zinc-400">Built to impress potential clients with a real SaaS feel.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <TrendingUp className="mb-3 text-zinc-200" size={20} />
              <h3 className="font-medium">Interactive views</h3>
              <p className="mt-2 text-sm text-zinc-400">Dashboard, leads, follow-ups and settings with premium UI.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-3xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-zinc-400">Demo access for showcase purposes.</p>

          <div className="mt-8 space-y-4">
            <Input label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={onLogin} className="w-full rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90">Enter Demo App</button>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
            Suggested demo credentials are pre-filled to keep the experience smooth.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardView({ stats, clients }) {
  const upcoming = [...clients]
    .filter((client) => client.followUp)
    .sort((a, b) => a.followUp.localeCompare(b.followUp))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Leads" value={stats.total} icon={Briefcase} hint="All saved contacts" />
        <StatCard title="Open Pipeline" value={formatCurrency(stats.pipelineValue)} icon={TrendingUp} hint="Estimated total lead value" />
        <StatCard title="Won Deals" value={stats.won} icon={CircleCheck} hint="Closed successfully" />
        <StatCard title="Follow-ups" value={stats.followUps} icon={CalendarDays} hint="Scheduled next actions" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Pipeline overview</h3>
              <p className="mt-1 text-sm text-zinc-400">Current distribution of your leads across the sales journey.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {STATUS_OPTIONS.map((status) => {
              const count = clients.filter((client) => client.status === status).length;
              return (
                <div key={status} className="rounded-3xl border border-white/10 bg-zinc-950 p-4">
                  <StatusBadge status={status} />
                  <div className="mt-4 text-3xl font-semibold">{count}</div>
                  <div className="mt-1 text-sm text-zinc-500">active leads</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
          <h3 className="text-xl font-semibold">Upcoming follow-ups</h3>
          <p className="mt-1 text-sm text-zinc-400">What needs attention next.</p>
          <div className="mt-5 space-y-3">
            {upcoming.map((client) => (
              <div key={client.id} className="rounded-3xl border border-white/10 bg-zinc-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-zinc-500">{client.company}</p>
                  </div>
                  <ChevronRight className="text-zinc-500" size={18} />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={client.priority} />
                  <StatusBadge status={client.status} />
                </div>
                <p className="mt-3 text-sm text-zinc-400">{formatDate(client.followUp)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadsView({ filteredClients, onEdit, onDelete, onOpenNew, search, setSearch, filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur md:p-5">
      <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email, phone..."
            className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-11 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none">
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none">
            <option value="newest">Sort: Default</option>
            <option value="name">Sort: Name</option>
            <option value="priority">Sort: Priority</option>
            <option value="followUp">Sort: Follow-up</option>
            <option value="value">Sort: Deal value</option>
          </select>

          <button onClick={onOpenNew} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90">
            <Plus size={18} /> Add Lead
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <motion.div key={client.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-zinc-950 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{client.name}</h3>
                      <StatusBadge status={client.status} />
                      <PriorityBadge priority={client.priority} />
                    </div>
                    <p className="text-sm text-zinc-400">{client.company || "No company added"}</p>
                  </div>

                  <div className="grid gap-2 text-sm text-zinc-300">
                    <p className="flex items-center gap-2"><Mail size={16} className="text-zinc-500" /> {client.email || "No email"}</p>
                    <p className="flex items-center gap-2"><Phone size={16} className="text-zinc-500" /> {client.phone || "No phone"}</p>
                    <p className="flex items-center gap-2"><Flag size={16} className="text-zinc-500" /> Source: {client.source || "Unknown"}</p>
                    <p className="flex items-center gap-2"><CalendarDays size={16} className="text-zinc-500" /> Follow-up: {formatDate(client.followUp)}</p>
                    <p className="flex items-center gap-2"><Briefcase size={16} className="text-zinc-500" /> Deal value: {formatCurrency(client.dealValue)}</p>
                    <p className="flex items-start gap-2"><FileText size={16} className="mt-0.5 text-zinc-500" /> <span>{client.notes || "No notes yet."}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(client)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"><Pencil size={16} /> Edit</button>
                  <button onClick={() => onDelete(client.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"><Trash2 size={16} /> Delete</button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-zinc-950 p-10 text-center text-zinc-400">No leads found. Try another filter or add a new lead.</div>
        )}
      </div>
    </div>
  );
}

function FollowUpsView({ clients }) {
  const followUps = [...clients]
    .filter((client) => client.followUp)
    .sort((a, b) => a.followUp.localeCompare(b.followUp));

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {followUps.map((client) => (
        <div key={client.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{client.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{client.company}</p>
            </div>
            <Bell className="text-zinc-500" size={18} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge status={client.status} />
            <PriorityBadge priority={client.priority} />
          </div>
          <div className="mt-5 space-y-2 text-sm text-zinc-300">
            <p className="flex items-center gap-2"><CalendarDays size={16} className="text-zinc-500" /> {formatDate(client.followUp)}</p>
            <p className="flex items-center gap-2"><Clock3 size={16} className="text-zinc-500" /> Last contact: {formatDate(client.lastContact)}</p>
            <p className="flex items-center gap-2"><Flag size={16} className="text-zinc-500" /> {client.source}</p>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm text-zinc-400">{client.notes}</div>
        </div>
      ))}
    </div>
  );
}

function SettingsView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
        <h3 className="text-xl font-semibold">Profile</h3>
        <p className="mt-1 text-sm text-zinc-400">Demo agency account information.</p>
        <div className="mt-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-zinc-950 p-4">
          <UserCircle2 size={48} className="text-zinc-400" />
          <div>
            <p className="font-medium">Jakub / ClientFlow Demo</p>
            <p className="text-sm text-zinc-500">Agency dashboard preview account</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
        <h3 className="text-xl font-semibold">About this demo</h3>
        <p className="mt-1 text-sm text-zinc-400">Built to showcase what a service-based CRM product can look like for a client.</p>
        <div className="mt-6 space-y-3 text-sm text-zinc-300">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">Interactive multi-view layout</div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">Modern lead cards and follow-up management</div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">Demo login experience and portfolio-ready presentation</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("clientflow-mini-crm-demo");
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      setClients(initialClients);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clientflow-mini-crm-demo", JSON.stringify(clients));
  }, [clients]);

  const filteredClients = useMemo(() => {
    const priorityRank = { High: 0, Medium: 1, Low: 2 };
    const result = clients.filter((client) => {
      const matchesSearch = [client.name, client.company, client.email, client.phone, client.notes, client.followUp, client.priority, client.source]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = filter === "All" ? true : client.status === filter;
      return matchesSearch && matchesFilter;
    });

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "priority") return priorityRank[a.priority] - priorityRank[b.priority];
      if (sortBy === "followUp") return (a.followUp || "9999-12-31").localeCompare(b.followUp || "9999-12-31");
      if (sortBy === "value") return Number(b.dealValue || 0) - Number(a.dealValue || 0);
      return 0;
    });

    return result;
  }, [clients, search, filter, sortBy]);

  const stats = useMemo(() => ({
    total: clients.length,
    won: clients.filter((c) => c.status === "Won").length,
    followUps: clients.filter((c) => c.followUp).length,
    pipelineValue: clients.reduce((sum, client) => sum + Number(client.dealValue || 0), 0),
  }), [clients]);

  const handleSave = (clientData) => {
    setClients((prev) => {
      const exists = prev.some((client) => client.id === clientData.id);
      return exists ? prev.map((client) => (client.id === clientData.id ? clientData : client)) : [clientData, ...prev];
    });
  };

  const handleDelete = (id) => setClients((prev) => prev.filter((client) => client.id !== id));
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };
  const openNewClientModal = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Company", "Email", "Phone", "Status", "Priority", "Source", "DealValue", "FollowUp", "LastContact", "Notes"];
    const rows = clients.map((client) => [client.name, client.company, client.email, client.phone, client.status, client.priority, client.source, client.dealValue, client.followUp, client.lastContact, client.notes]);
    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value || "").replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clientflow-demo-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "leads", label: "Leads", icon: Briefcase },
    { id: "followups", label: "Follow-ups", icon: CalendarDays },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <div>
            <div className="inline-flex rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-black">ClientFlow</div>
          </div>
          <button onClick={() => setMobileSidebarOpen((prev) => !prev)} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <PanelLeft size={18} />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <AnimatePresence>
            {(mobileSidebarOpen || typeof window === "undefined" || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur lg:block"
              >
                <div className="mb-8">
                  <div className="mb-3 inline-flex rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-black">ClientFlow</div>
                  <h2 className="text-2xl font-semibold">Mini CRM</h2>
                  <p className="mt-2 text-sm text-zinc-400">A polished sales demo app for service businesses.</p>
                </div>

                <div className="space-y-3 text-sm">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveView(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? "border border-white/10 bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}
                      >
                        <Icon size={16} /> {item.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-950 p-4">
                  <p className="text-sm font-medium">Portfolio Demo Mode</p>
                  <p className="mt-2 text-xs text-zinc-500">Front-end only experience made for agency presentations and ads.</p>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <main className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-400">ClientFlow Mini CRM</p>
                  <h1 className="text-3xl font-semibold md:text-4xl">Professional demo CRM with premium UI.</h1>
                  <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">Designed to showcase what your business can build for service brands, agencies and local companies.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={exportToCSV} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/5">
                    <Download size={18} /> Export CSV
                  </button>
                  <button onClick={openNewClientModal} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90">
                    <Plus size={18} /> Add Lead
                  </button>
                  <button onClick={() => setIsLoggedIn(false)} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/5">
                    <LogOut size={18} /> Demo Logout
                  </button>
                </div>
              </div>
            </div>

            {activeView === "dashboard" && <DashboardView stats={stats} clients={clients} />}
            {activeView === "leads" && (
              <LeadsView
                filteredClients={filteredClients}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onOpenNew={openNewClientModal}
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}
            {activeView === "followups" && <FollowUpsView clients={clients} />}
            {activeView === "settings" && <SettingsView />}
          </main>
        </div>
      </div>

      <ClientFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingClient={editingClient} />
    </div>
  );
}
