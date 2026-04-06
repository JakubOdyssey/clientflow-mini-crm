import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  Flag,
  LayoutDashboard,
} from "lucide-react";

const STATUS_OPTIONS = ["New", "Contacted", "In Progress", "Won", "Lost"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const initialClients = [
  {
    id: crypto.randomUUID(),
    name: "Northstar Studio",
    email: "hello@northstarstudio.co.uk",
    phone: "+44 7400 123456",
    status: "New",
    priority: "High",
    followUp: "2026-04-10",
    notes: "Interested in branding and a 5-page website.",
    company: "Northstar Studio",
  },
  {
    id: crypto.randomUUID(),
    name: "Olivia Carter",
    email: "olivia@oaklane.co.uk",
    phone: "+44 7700 555444",
    status: "In Progress",
    priority: "Medium",
    followUp: "2026-04-14",
    notes: "Waiting for final quote approval.",
    company: "Oaklane Interiors",
  },
  {
    id: crypto.randomUUID(),
    name: "Mason Reed",
    email: "mason@reedfitness.co.uk",
    phone: "+44 7900 888111",
    status: "Won",
    priority: "Low",
    followUp: "2026-04-18",
    notes: "Signed for landing page + ads management.",
    company: "Reed Fitness",
  },
];

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

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-zinc-500/15 text-zinc-300 border-zinc-400/20",
    Medium: "bg-orange-500/15 text-orange-300 border-orange-400/20",
    High: "bg-red-500/15 text-red-300 border-red-400/20",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority} Priority
    </span>
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
    followUp: "",
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
        followUp: "",
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
    onSave({ ...form, id: editingClient?.id || crypto.randomUUID() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {editingClient ? "Edit Client" : "Add New Client"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Track leads, follow-ups and client notes in one place.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-2xl border border-white/10 p-2 text-zinc-300 transition hover:bg-white/5"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Contact Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Company" name="company" value={form.company} onChange={handleChange} />
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />

          <label>
            <span className="mb-2 block text-sm font-medium text-zinc-300">Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="bg-zinc-900">
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-zinc-300">Priority</span>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-white/20"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority} className="bg-zinc-900">
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <Input
            label="Follow-up Date"
            name="followUp"
            value={form.followUp}
            onChange={handleChange}
            type="date"
          />

          <div className="hidden md:block" />

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
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-5 py-3 text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
            >
              {editingClient ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
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

function formatDate(date) {
  if (!date) return "No date";
  return new Date(date).toLocaleDateString();
}

export default function App() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("clientflow-mini-crm");
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      setClients(initialClients);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clientflow-mini-crm", JSON.stringify(clients));
  }, [clients]);

  const filteredClients = useMemo(() => {
    const priorityRank = { High: 0, Medium: 1, Low: 2 };

    const result = clients.filter((client) => {
      const matchesSearch = [
        client.name,
        client.company,
        client.email,
        client.phone,
        client.notes,
        client.followUp,
        client.priority,
      ]
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
      return 0;
    });

    return result;
  }, [clients, search, filter, sortBy]);

  const stats = useMemo(() => {
    return {
      total: clients.length,
      newCount: clients.filter((c) => c.status === "New").length,
      progress: clients.filter((c) => c.status === "In Progress").length,
      won: clients.filter((c) => c.status === "Won").length,
      followUps: clients.filter((c) => c.followUp).length,
    };
  }, [clients]);

  const handleSave = (clientData) => {
    setClients((prev) => {
      const exists = prev.some((client) => client.id === clientData.id);
      return exists
        ? prev.map((client) => (client.id === clientData.id ? clientData : client))
        : [clientData, ...prev];
    });
  };

  const handleDelete = (id) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const openNewClientModal = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const exportToCSV = () => {
    const headers = ["Name", "Company", "Email", "Phone", "Status", "Priority", "FollowUp", "Notes"];
    const rows = clients.map((client) => [
      client.name,
      client.company,
      client.email,
      client.phone,
      client.status,
      client.priority,
      client.followUp,
      client.notes,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value || "").replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clientflow-leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]"
        >
          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
            <div className="mb-8">
              <div className="mb-3 inline-flex rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-black">
                ClientFlow
              </div>
              <h2 className="text-2xl font-semibold">Mini CRM</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Clean lead tracking for service businesses.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                <LayoutDashboard size={16} /> Dashboard
              </div>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-zinc-400">
                <Briefcase size={16} /> Leads
              </div>
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-zinc-400">
                <CalendarDays size={16} /> Follow-ups
              </div>
            </div>
          </aside>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-400">
                  ClientFlow Mini CRM
                </p>
                <h1 className="text-3xl font-semibold md:text-4xl">
                  Track leads like a real business.
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
                  A premium, modern lead manager with follow-up dates, priorities and CSV export.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/5"
                >
                  <Download size={18} /> Export CSV
                </button>
                <button
                  onClick={openNewClientModal}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
                >
                  <Plus size={18} /> Add Client
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Leads" value={stats.total} icon={Briefcase} hint="All saved contacts" />
          <StatCard title="New Leads" value={stats.newCount} icon={Building2} hint="Fresh opportunities" />
          <StatCard title="In Progress" value={stats.progress} icon={TrendingUp} hint="Active conversations" />
          <StatCard title="Follow-ups" value={stats.followUps} icon={CalendarDays} hint="Dates already scheduled" />
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur md:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, company, email, phone..."
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-11 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none"
              >
                <option value="newest">Sort: Default</option>
                <option value="name">Sort: Name</option>
                <option value="priority">Sort: Priority</option>
                <option value="followUp">Sort: Follow-up</option>
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-white/10 bg-zinc-950 p-5"
                >
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
                        <p className="flex items-center gap-2">
                          <Mail size={16} className="text-zinc-500" /> {client.email || "No email"}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={16} className="text-zinc-500" /> {client.phone || "No phone"}
                        </p>
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-zinc-500" /> Follow-up: {formatDate(client.followUp)}
                        </p>
                        <p className="flex items-start gap-2">
                          <FileText size={16} className="mt-0.5 text-zinc-500" />
                          <span>{client.notes || "No notes yet."}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/5"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-zinc-950 p-10 text-center text-zinc-400">
                No leads found. Try another search or add your first client.
              </div>
            )}
          </div>
        </div>
      </div>

      <ClientFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingClient={editingClient}
      />
    </div>
  );
}
