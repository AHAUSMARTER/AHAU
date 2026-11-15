"use client"

import * as React from "react"
import {
  MessageSquare,
  Plus,
  ChevronDown,
  ChevronRight,
  Search,
  CreditCard,
  Award,
  FileText,
  GraduationCap,
  Wrench,
  BookOpen,
  Calendar,
  Grid,
  Send,
  Wifi,
  Sparkles,
  User,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 历史办事任务（用户与 AI 对话记录）
const SESSIONS = [
  {
    id: "session_live",
    title: "正在咨询: 农芯智AI创新大赛参赛指引",
    time: "刚刚",
    status: "进行中",
    statusVariant: "active",
    unread: false
  },
  {
    id: "session_1",
    title: "2026春季国家励志奖学金申请审核",
    time: "今天 14:20",
    status: "已归档",
    statusVariant: "success",
    unread: false
  },
  {
    id: "session_2",
    title: "西区8号宿舍楼空调报修加急单",
    time: "昨天 19:40",
    status: "派工中",
    statusVariant: "warning",
    unread: false
  },
  {
    id: "session_3",
    title: "勤学楼302研讨室借用预约批复",
    time: "周二",
    status: "已完成",
    statusVariant: "success",
    unread: false
  },
  {
    id: "session_4",
    title: "校园卡跨校区挂失与临时乘车补办",
    time: "周一",
    status: "已办结",
    statusVariant: "success",
    unread: false
  },
  {
    id: "session_5",
    title: "全日制本科生中英文成绩单打印授权",
    time: "上周",
    status: "已存根",
    statusVariant: "neutral",
    unread: false
  }
]

// 10项常见高频校园直达应用
const COMMON_APPS = [
  { name: "一卡通充值", icon: CreditCard, category: "生活服务", badge: "即时" },
  { name: "奖助学金申请", icon: Award, category: "学工事务", badge: "进行中" },
  { name: "英语四六级成绩", icon: FileText, category: "教务服务", badge: "新" },
  { name: "学分绩点换算", icon: GraduationCap, category: "教务服务", badge: "热" },
  { name: "宿舍物业报修", icon: Wrench, category: "后勤服务", badge: "快办" },
  { name: "图书馆借阅与续借", icon: BookOpen, category: "图资服务", badge: "常驻" },
  { name: "空闲研讨教室查询", icon: Calendar, category: "教务服务", badge: "实时" },
  { name: "学期智能课表", icon: Grid, category: "教务服务", badge: "高频" },
  { name: "出校请假备案审批", icon: Send, category: "学工服务", badge: "快批" },
  { name: "校园网故障与缴费", icon: Wifi, category: "网信服务", badge: "在线" },
]

export function AhauSidebar() {
  const [activeSession, setActiveSession] = React.useState("session_live")
  const [appsOpen, setAppsOpen] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredApps = COMMON_APPS.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Sidebar className="border-r border-emerald-900/10 bg-white/70 backdrop-blur-2xl">
      {/* 侧边栏顶部品牌区 */}
      <SidebarHeader className="p-4 border-b border-emerald-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-emerald-950">
              安农智办 · AHAU
            </span>
            <span className="text-[11px] text-emerald-700/80 font-medium">
              数智校园办事工作台
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 space-y-4">
        {/* 第一部分：任务（用户与 AI 的历史/活跃对话记录） */}
        <SidebarGroup>
          <div className="flex items-center justify-between px-2 mb-2">
            <SidebarGroupLabel className="text-xs font-semibold text-emerald-900/70 tracking-wider">
              办事任务 (对话记录)
            </SidebarGroupLabel>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 px-2 rounded-lg gap-1 font-medium"
              onClick={() => setActiveSession("session_live")}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新建任务</span>
            </Button>
          </div>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {SESSIONS.map((session) => {
                const isActive = activeSession === session.id
                return (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSession(session.id)}
                      isActive={isActive}
                      className={`h-auto py-2.5 px-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-emerald-700 text-white shadow-sm shadow-emerald-900/15 font-medium"
                          : "hover:bg-emerald-900/5 text-gray-800"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 w-full">
                        <MessageSquare className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? "text-emerald-200" : "text-emerald-700"}`} />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-xs truncate text-left">{session.title}</span>
                          <div className="flex items-center justify-between mt-1 text-[10px]">
                            <span className={isActive ? "text-emerald-100/80" : "text-gray-400"}>
                              {session.time}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded-full font-medium ${
                              isActive
                                ? "bg-white/20 text-white"
                                : session.statusVariant === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2 bg-emerald-900/10" />

        {/* 第二部分：常见应用（支持展开/折叠，展开展示校园高频应用） */}
        <SidebarGroup>
          <div
            className="flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer hover:bg-emerald-900/5 transition-colors"
            onClick={() => setAppsOpen(!appsOpen)}
          >
            <div className="flex items-center gap-2">
              <SidebarGroupLabel className="text-xs font-semibold text-emerald-900/70 tracking-wider cursor-pointer">
                常见应用 ({filteredApps.length})
              </SidebarGroupLabel>
            </div>
            <button className="text-emerald-800/70 p-1 rounded hover:bg-emerald-900/10">
              {appsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {appsOpen && (
            <SidebarGroupContent className="mt-2 space-y-2">
              {/* 应用搜索框 */}
              <div className="relative px-1 mb-2">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索校内办事或高频应用..."
                  className="h-8 pl-8 text-xs bg-white/80 border-emerald-900/15 focus-visible:ring-emerald-600 rounded-lg"
                />
              </div>

              {/* 10项高频应用列表 */}
              <SidebarMenu className="gap-1 max-h-[320px] overflow-y-auto pr-1">
                {filteredApps.map((app) => (
                  <SidebarMenuItem key={app.name}>
                    <SidebarMenuButton
                      className="h-10 px-3 rounded-lg hover:bg-emerald-50 text-gray-800 transition-colors justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                          <app.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-medium text-gray-800 group-hover:text-emerald-900">
                            {app.name}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {app.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-medium">
                        {app.badge}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      {/* 底部用户信息 */}
      <SidebarFooter className="p-3 border-t border-emerald-900/10">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white/60 hover:bg-white/90 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              农
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-900">
                洪同学 (20224018)
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">
                安徽农业大学 · 校园认证用户
              </span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
