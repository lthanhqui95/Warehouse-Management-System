import { ClipboardCheck, PackageSearch, ShieldCheck, Warehouse } from "lucide-react";

const metrics = [
  { label: "Products", value: "128", caption: "tracked SKUs" },
  { label: "Pending", value: "12", caption: "item requests" },
  { label: "Imports", value: "7", caption: "today" },
  { label: "Alerts", value: "3", caption: "need review" },
];

const workflows = [
  { title: "Import stock", description: "Record supplier, quantity, location, and importer.", icon: Warehouse },
  { title: "Request items", description: "Store staff create requests with full request history.", icon: ClipboardCheck },
  { title: "Find products", description: "Search SKU, barcode, category, and bin location quickly.", icon: PackageSearch },
  { title: "Approve safely", description: "Managers approve, reject, export, and audit inventory movements.", icon: ShieldCheck },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="rounded-[2rem] bg-slate-950 px-5 py-8 text-white shadow-xl sm:px-8 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">WMS Version 1</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mobile-first warehouse accountability.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Track who imported, requested, approved, exported, adjusted, and moved every product in the warehouse.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-300">Today&apos;s focus</p>
              <p className="mt-2 text-2xl font-semibold">Resolve mismatches before export</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-500">{metric.caption}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {workflows.map((workflow) => {
            const Icon = workflow.icon;
            return (
              <article key={workflow.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-950">{workflow.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{workflow.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
