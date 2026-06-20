"use client";

import { ClipboardCheck, Languages, PackageSearch, ShieldCheck, Warehouse } from "lucide-react";
import { useMemo, useState } from "react";

type LanguageCode = "en" | "vi" | "zh";

type Metric = {
  label: string;
  value: string;
  caption: string;
};

type Workflow = {
  title: string;
  description: string;
  icon: typeof Warehouse;
};

type PageCopy = {
  languageLabel: string;
  eyebrow: string;
  headline: string;
  description: string;
  focusLabel: string;
  focusText: string;
  metrics: Metric[];
  workflows: Workflow[];
};

const languageOptions: { code: LanguageCode; label: string; shortLabel: string }[] = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "vi", label: "Tiếng Việt", shortLabel: "VI" },
  { code: "zh", label: "中文", shortLabel: "中文" },
];

const copyByLanguage: Record<LanguageCode, PageCopy> = {
  en: {
    languageLabel: "Language",
    eyebrow: "WMS Version 1",
    headline: "Mobile-first warehouse accountability.",
    description: "Track who imported, requested, approved, exported, adjusted, and moved every product in the warehouse.",
    focusLabel: "Today's focus",
    focusText: "Resolve mismatches before export",
    metrics: [
      { label: "Products", value: "128", caption: "tracked SKUs" },
      { label: "Pending", value: "12", caption: "item requests" },
      { label: "Imports", value: "7", caption: "today" },
      { label: "Alerts", value: "3", caption: "need review" },
    ],
    workflows: [
      { title: "Import stock", description: "Record supplier, quantity, location, and importer.", icon: Warehouse },
      { title: "Request items", description: "Store staff create requests with full request history.", icon: ClipboardCheck },
      { title: "Find products", description: "Search SKU, barcode, category, and bin location quickly.", icon: PackageSearch },
      { title: "Approve safely", description: "Managers approve, reject, export, and audit inventory movements.", icon: ShieldCheck },
    ],
  },
  vi: {
    languageLabel: "Ngôn ngữ",
    eyebrow: "WMS Phiên bản 1",
    headline: "Quản lý trách nhiệm kho hàng ưu tiên thiết bị di động.",
    description: "Theo dõi người nhập, yêu cầu, phê duyệt, xuất, điều chỉnh và di chuyển từng sản phẩm trong kho.",
    focusLabel: "Trọng tâm hôm nay",
    focusText: "Xử lý sai lệch trước khi xuất kho",
    metrics: [
      { label: "Sản phẩm", value: "128", caption: "SKU đang theo dõi" },
      { label: "Chờ xử lý", value: "12", caption: "yêu cầu vật tư" },
      { label: "Nhập kho", value: "7", caption: "hôm nay" },
      { label: "Cảnh báo", value: "3", caption: "cần xem xét" },
    ],
    workflows: [
      { title: "Nhập hàng", description: "Ghi nhận nhà cung cấp, số lượng, vị trí và người nhập.", icon: Warehouse },
      { title: "Yêu cầu vật tư", description: "Nhân viên kho tạo yêu cầu với lịch sử đầy đủ.", icon: ClipboardCheck },
      { title: "Tìm sản phẩm", description: "Tìm nhanh SKU, mã vạch, danh mục và vị trí kệ.", icon: PackageSearch },
      { title: "Phê duyệt an toàn", description: "Quản lý phê duyệt, từ chối, xuất kho và kiểm tra luồng tồn kho.", icon: ShieldCheck },
    ],
  },
  zh: {
    languageLabel: "语言",
    eyebrow: "WMS 版本 1",
    headline: "移动优先的仓库责任管理。",
    description: "追踪仓库中每件产品的入库、申请、审批、出库、调整和移动负责人。",
    focusLabel: "今日重点",
    focusText: "出库前解决库存差异",
    metrics: [
      { label: "产品", value: "128", caption: "已追踪 SKU" },
      { label: "待处理", value: "12", caption: "物品申请" },
      { label: "入库", value: "7", caption: "今天" },
      { label: "警报", value: "3", caption: "需要审核" },
    ],
    workflows: [
      { title: "库存入库", description: "记录供应商、数量、库位和入库人员。", icon: Warehouse },
      { title: "申请物品", description: "仓库员工创建申请并保留完整历史。", icon: ClipboardCheck },
      { title: "查找产品", description: "快速搜索 SKU、条码、类别和货位。", icon: PackageSearch },
      { title: "安全审批", description: "经理可审批、拒绝、出库并审计库存流转。", icon: ShieldCheck },
    ],
  },
};

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const copy = useMemo(() => copyByLanguage[language], [language]);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="rounded-[2rem] bg-slate-950 px-5 py-8 text-white shadow-xl sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">{copy.eyebrow}</p>
            <div className="rounded-2xl bg-white/10 p-2 backdrop-blur" aria-label={copy.languageLabel}>
              <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                <Languages aria-hidden="true" className="h-4 w-4" />
                <span>{copy.languageLabel}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((option) => {
                  const isSelected = language === option.code;

                  return (
                    <button
                      key={option.code}
                      type="button"
                      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        isSelected ? "bg-brand-500 text-white shadow" : "bg-white/10 text-slate-200 hover:bg-white/20"
                      }`}
                      aria-pressed={isSelected}
                      onClick={() => setLanguage(option.code)}
                    >
                      <span className="sm:hidden">{option.shortLabel}</span>
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{copy.headline}</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{copy.description}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm text-slate-300">{copy.focusLabel}</p>
              <p className="mt-2 text-2xl font-semibold">{copy.focusText}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-500">{metric.caption}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {copy.workflows.map((workflow) => {
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
