"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles, CheckCircle2, X, ArrowUpRight, ShieldCheck, Clock, Users, Database } from "lucide-react";
import { DEFAULT_PROJECTS, ProjectDeck, type Project } from "@/components/ui/scroll-stacking-cards";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { id: "all", label: "全部意向" },
  { id: "科研实验", label: "科研实验" },
  { id: "仪器机时", label: "仪器机时" },
  { id: "大创竞赛", label: "大创竞赛" },
  { id: "技术转化", label: "技术转化" },
  { id: "考研学业", label: "考研学业" },
];

export default function MutualAidPlazaDeckDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [matchSuccess, setMatchSuccess] = useState(false);

  const filteredProjects = useMemo(() => {
    return DEFAULT_PROJECTS.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.display && p.display.toLowerCase().includes(q)) ||
        (p.offer && p.offer.toLowerCase().includes(q)) ||
        (p.seek && p.seek.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleApplyMatch = (p: Project) => {
    setMatchSuccess(true);
    setTimeout(() => {
      setMatchSuccess(false);
      setSelectedProject(null);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#050608] text-zinc-100 selection:bg-zinc-800 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050608]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 shadow-inner">
              <Sparkles className="size-4 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold tracking-tight text-white">科研与学业互助广场</span>
                <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-400">
                  意向单撮合网络
                </span>
              </div>
              <p className="text-[12px] text-zinc-400">跨学院课题组仪器机时、点云数据集与大创研讨 P2P 智能匹配</p>
            </div>
          </div>

          <div className="hidden items-center gap-4 text-[13px] text-zinc-400 sm:flex">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-400" />
              安农科研数字身份核验
            </span>
            <span className="h-3 w-px bg-zinc-800" />
            <span className="flex items-center gap-1.5">
              <Database className="size-4 text-sky-400" />
              当前存证意向 {DEFAULT_PROJECTS.length} 份
            </span>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="搜索意向单关键词，如：茶树多光谱、Leica共聚焦机时、拖拉机时序、408考研..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 rounded-full border-white/10 bg-zinc-900/70 pl-10 pr-24 text-[13px] text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-sky-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:text-white"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                      active
                        ? "border border-white/20 bg-zinc-100 text-zinc-950 shadow-sm"
                        : "border border-white/5 bg-zinc-900/60 text-zinc-400 hover:border-white/10 hover:text-zinc-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main 3D Scroll Stacking Deck */}
      {filteredProjects.length > 0 ? (
        <ProjectDeck
          projects={filteredProjects}
          ground="#090B10"
          className="pb-24"
          onSelectProject={(p) => setSelectedProject(p)}
        >
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-zinc-900/90 px-4 py-2 text-[12px] text-zinc-400 shadow-2xl backdrop-blur-xl">
            向下滚动展开下一张意向单 · 点击意向角标查看对接详情
          </div>
        </ProjectDeck>
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center px-4">
          <div className="size-12 rounded-full border border-white/10 bg-zinc-900/50 flex items-center justify-center text-zinc-500 mb-3">
            <Search className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-zinc-300">未检索到匹配的互助意向单</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-sm">
            尝试更换关键词搜索，或重置分类筛选条件查看全部存证意向。
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 rounded-full border-white/10 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
          >
            重置筛选条件
          </Button>
        </div>
      )}

      {/* Detail Modal for Selected Intention Sheet */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#0C0E14] p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      background: `${selectedProject.accent}20`,
                      color: selectedProject.accent,
                      border: `1px solid ${selectedProject.accent}40`,
                    }}
                  >
                    {selectedProject.category ?? "学术互助"}
                  </span>
                  <span className="text-[11px] text-zinc-400">存证编号：ANAU-INT-202611-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-white">{selectedProject.name}</h2>
                <p className="mt-1 text-xs text-zinc-400">{selectedProject.display}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 py-5 text-xs text-zinc-300">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <span className="font-semibold text-zinc-200">意向摘要说明</span>
                <p className="mt-1 leading-relaxed text-zinc-400">{selectedProject.summary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.03] p-4">
                  <span className="font-semibold text-sky-400">资源供给 · OFFER</span>
                  <p className="mt-1.5 leading-relaxed text-zinc-300">{selectedProject.offer}</p>
                </div>
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.03] p-4">
                  <span className="font-semibold text-indigo-400">需求寻求 · SEEK</span>
                  <p className="mt-1.5 leading-relaxed text-zinc-300">{selectedProject.seek}</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-zinc-400" />
                  发起团队：{selectedProject.initiator ?? "安徽农业大学相关课题组"}
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Clock className="size-3.5" />
                  对接状态：{selectedProject.urgency ?? "常态开放"}
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProject(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                关闭
              </Button>
              <Button
                size="sm"
                onClick={() => handleApplyMatch(selectedProject)}
                disabled={matchSuccess}
                className="gap-2 rounded-full px-5 text-xs font-semibold text-black"
                style={{ background: selectedProject.accent }}
              >
                {matchSuccess ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    对接申请已提交至校园智能体
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="size-4" />
                    发起学术互助对接
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
