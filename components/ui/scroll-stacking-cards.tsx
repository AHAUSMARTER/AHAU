/**
 * Mutual Aid Intention Sheet Project Deck.
 * Tailored for Anhui Agricultural University Academic & Research Mutual-Aid Plaza.
 *
 * A scroll-dealt deck of academic mutual-aid intention sheets. Each card is an authentic
 * research or academic collaboration proposal edge-to-edge. As you scroll, the next card
 * rises from below leaning toward you in 3D and out of focus, and flattens and sharpens
 * as it lands in the middle of the window; the cards beneath lean back a touch, sink back
 * and dim. The bottom-right corner of each card is cut away to hold the intention inquiry
 * button.
 *
 * Scroll-linked, spring-smoothed transforms (one smoothed value drives every card), and a still,
 * sharp, straight deck under prefers-reduced-motion.
 */
"use client";

import { useRef, type ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Project = {
  name: string;
  /** One sentence for screen readers: what the intention sheet covers */
  summary: string;
  url: string;
  /** Short address or lab matching pairs shown on the button */
  display?: string;
  /** A high-fidelity visual diagram of the intention sheet, 16:9 */
  image: string;
  /** Accent colour from the domain discipline */
  accent: string;
  /** Category taxonomy */
  category?: string;
  initiator?: string;
  targetSeek?: string;
  offer?: string;
  seek?: string;
  urgency?: string;
};

/** 6 Authentic Anhui Agricultural University Academic & Research Mutual-Aid Intention Sheets */
export const DEFAULT_PROJECTS: Project[] = [
  {
    "name": "茶树叶部病斑多光谱反射率采样与端侧轻量化算法联合验证",
    "summary": "茶学重点实验室提供40GB茶园高光谱反射率与叶切片标本，寻求端侧轻量化剪枝YOLO算法验证与联合发表。",
    "url": "#intention-tea-lab",
    "display": "茶学重点实验室 ‹-› 计算机视觉组",
    "accent": "#38bdf8",
    "category": "科研实验",
    "initiator": "茶树生物学与资源利用重点实验室",
    "targetSeek": "信智学院计算机视觉团队",
    "offer": "茶园多光谱航测图谱(400-1000nm)、40GB原始点云标本、野外光谱仪设备机时",
    "seek": "针对树冠重叠叶片的轻量化 YOLOv9 / MobileNet 剪枝模型，模型体积小于15MB",
    "urgency": "急需对接",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23070a12%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2338bdf8%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2338bdf8%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2338bdf8%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%2338bdf8%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%2338bdf8%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E7%A7%91%E7%A0%94%E5%AE%9E%E9%AA%8C%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E%E8%8C%B6%E6%A0%91%E5%8F%B6%E9%83%A8%E7%97%85%E6%96%91%E5%A4%9A%E5%85%89%E8%B0%B1%E5%8F%8D%E5%B0%84%E7%8E%87%E9%87%87%E6%A0%B7%E4%B8%8E%E7%AB%AF%E4%BE%A7%E8%BD%BB%E9%87%8F%E5%8C%96%E7%AE%97%E6%B3%95%E8%81%94%E5%90%88%E9%AA%8C%E8%AF%81%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E8%8C%B6%E6%A0%91%E7%94%9F%E7%89%A9%E5%AD%A6%E4%B8%8E%E8%B5%84%E6%BA%90%E5%88%A9%E7%94%A8%E9%87%8D%E7%82%B9%E5%AE%9E%E9%AA%8C%E5%AE%A4%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%A7%86%E8%A7%89%E5%9B%A2%E9%98%9F%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E8%8C%B6%E5%9B%AD%E5%A4%9A%E5%85%89%E8%B0%B1%E8%88%AA%E6%B5%8B%E5%9B%BE%E8%B0%B1%28400-1000nm%29%E3%80%8140GB%E5%8E%9F%E5%A7%8B%E7%82%B9%E4%BA%91%E6%A0%87%E6%9C%AC%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E3%80%81%E9%87%8E%E5%A4%96%E5%85%89%E8%B0%B1%E4%BB%AA%E8%AE%BE%E5%A4%87%E6%9C%BA%E6%97%B6%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E9%92%88%E5%AF%B9%E6%A0%91%E5%86%A0%E9%87%8D%E5%8F%A0%E5%8F%B6%E7%89%87%E7%9A%84%E8%BD%BB%E9%87%8F%E5%8C%96%20YOLOv9%20/%20MobileNet%20%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%89%AA%E6%9E%9D%E6%A8%A1%E5%9E%8B%EF%BC%8C%E6%A8%A1%E5%9E%8B%E4%BD%93%E7%A7%AF%E5%B0%8F%E4%BA%8E15MB%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  },
  {
    "name": "轮式拖拉机作业振动传感器时序边缘异常预测",
    "summary": "工学院农机团队提供拖拉机底盘三轴加速度时序波形，寻求STM32边缘端异常振动实时分类微内核。",
    "url": "#intention-tractor-iot",
    "display": "智能农机装备中心 ‹-› 嵌入式物联网组",
    "accent": "#f59e0b",
    "category": "工程交叉",
    "initiator": "智能农业装备工程研究中心",
    "targetSeek": "嵌入式物联网研发组",
    "offer": "雷沃2004拖拉机深松整地三轴加速度1000Hz实测时序、机具试验场实机测试台",
    "seek": "适应STM32单片机的边缘端 TinyML 时序异常检测模型，推理延迟低于8ms",
    "urgency": "常态开放",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230d0c0a%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23261a0b%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23f59e0b%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f59e0b%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%23f59e0b%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%23f59e0b%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%23f59e0b%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E5%B7%A5%E7%A8%8B%E4%BA%A4%E5%8F%89%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E%E8%BD%AE%E5%BC%8F%E6%8B%96%E6%8B%89%E6%9C%BA%E4%BD%9C%E4%B8%9A%E6%8C%AF%E5%8A%A8%E4%BC%A0%E6%84%9F%E5%99%A8%E6%97%B6%E5%BA%8F%E8%BE%B9%E7%BC%98%E5%BC%82%E5%B8%B8%E9%A2%84%E6%B5%8B%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E6%99%BA%E8%83%BD%E5%86%9C%E4%B8%9A%E8%A3%85%E5%A4%87%E5%B7%A5%E7%A8%8B%E7%A0%94%E7%A9%B6%E4%B8%AD%E5%BF%83%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E5%B5%8C%E5%85%A5%E5%BC%8F%E7%89%A9%E8%81%94%E7%BD%91%E7%A0%94%E5%8F%91%E7%BB%84%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%23f59e0b%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E9%9B%B7%E6%B2%832004%E6%8B%96%E6%8B%89%E6%9C%BA%E6%B7%B1%E6%9D%BE%E6%95%B4%E5%9C%B0%E4%B8%89%E8%BD%B4%E5%8A%A0%E9%80%9F%E5%BA%A61000Hz%E5%AE%9E%E6%B5%8B%E6%97%B6%E5%BA%8F%E3%80%81%E6%9C%BA%E5%85%B7%E8%AF%95%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E9%AA%8C%E5%9C%BA%E5%AE%9E%E6%9C%BA%E6%B5%8B%E8%AF%95%E5%8F%B0%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%23f59e0b%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E9%80%82%E5%BA%94STM32%E5%8D%95%E7%89%87%E6%9C%BA%E7%9A%84%E8%BE%B9%E7%BC%98%E7%AB%AF%20TinyML%20%E6%97%B6%E5%BA%8F%E5%BC%82%E5%B8%B8%E6%A3%80%E6%B5%8B%E6%A8%A1%E5%9E%8B%EF%BC%8C%E6%8E%A8%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E7%90%86%E5%BB%B6%E8%BF%9F%E4%BD%8E%E4%BA%8E8ms%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  },
  {
    "name": "超分辨激光共聚焦显微镜周四晚段与近红外光谱机时互换",
    "summary": "抗逆团队出让Leica SP8共聚焦激光显微镜周四18:00-22:00机时，置换近红外高通量光谱仪测样配额。",
    "url": "#intention-instrument-share",
    "display": "作物抗逆育种团队 ‹-› 代谢组学实验室",
    "accent": "#a855f7",
    "category": "仪器机时",
    "initiator": "作物抗逆育种团队",
    "targetSeek": "茶树代谢组学实验室",
    "offer": "农科大楼生命科学中心 Leica SP8 共聚焦激光显微镜 4小时专属预约机时",
    "seek": "置换茶树代谢组学实验室近红外高通量光谱仪 20个批次的样品快测配额",
    "urgency": "本周有效",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230e0914%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23200e30%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23a855f7%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23a855f7%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23a855f7%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%23a855f7%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%23a855f7%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%23a855f7%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E4%BB%AA%E5%99%A8%E6%9C%BA%E6%97%B6%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E%E8%B6%85%E5%88%86%E8%BE%A8%E6%BF%80%E5%85%89%E5%85%B1%E8%81%9A%E7%84%A6%E6%98%BE%E5%BE%AE%E9%95%9C%E5%91%A8%E5%9B%9B%E6%99%9A%E6%AE%B5%E4%B8%8E%E8%BF%91%E7%BA%A2%E5%A4%96%E5%85%89%E8%B0%B1%E6%9C%BA%E6%97%B6%E4%BA%92%E6%8D%A2%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E4%BD%9C%E7%89%A9%E6%8A%97%E9%80%86%E8%82%B2%E7%A7%8D%E5%9B%A2%E9%98%9F%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E8%8C%B6%E6%A0%91%E4%BB%A3%E8%B0%A2%E7%BB%84%E5%AD%A6%E5%AE%9E%E9%AA%8C%E5%AE%A4%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%23a855f7%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E5%86%9C%E7%A7%91%E5%A4%A7%E6%A5%BC%E7%94%9F%E5%91%BD%E7%A7%91%E5%AD%A6%E4%B8%AD%E5%BF%83%20Leica%20SP8%20%E5%85%B1%E8%81%9A%E7%84%A6%E6%BF%80%E5%85%89%E6%98%BE%E5%BE%AE%E9%95%9C%204%E5%B0%8F%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E6%97%B6%E4%B8%93%E5%B1%9E%E9%A2%84%E7%BA%A6%E6%9C%BA%E6%97%B6%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%23a855f7%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E7%BD%AE%E6%8D%A2%E8%8C%B6%E6%A0%91%E4%BB%A3%E8%B0%A2%E7%BB%84%E5%AD%A6%E5%AE%9E%E9%AA%8C%E5%AE%A4%E8%BF%91%E7%BA%A2%E5%A4%96%E9%AB%98%E9%80%9A%E9%87%8F%E5%85%89%E8%B0%B1%E4%BB%AA%2020%E4%B8%AA%E6%89%B9%E6%AC%A1%E7%9A%84%E6%A0%B7%E5%93%81%E5%BF%AB%E6%B5%8B%E9%85%8D%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E9%A2%9D%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  },
  {
    "name": "水稻稻飞虱无人机遥感多光谱全景航测与挑战杯联合组队",
    "summary": "植保团队提供大疆M350水稻虫害航测多光谱全景数据，招募前端可视化与多智能体算法开发同学联合冲击挑战杯。",
    "url": "#intention-drone-challenge",
    "display": "植物保护学院 ‹-› 智科算法大创组",
    "accent": "#10b981",
    "category": "大创竞赛",
    "initiator": "植物保护学院昆虫团队",
    "targetSeek": "智科算法大创组",
    "offer": "合肥高刘教学科研试验基地大疆M350航测多光谱正射影像、水稻虫情实地标定集",
    "seek": "招募精通 WebGL / React 三维全景渲染或智能体算法的计算机学院本科生联合组队",
    "urgency": "加急组队",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23080f0c%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230d261e%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2310b981%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2310b981%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%2310b981%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%2310b981%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%2310b981%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E5%A4%A7%E5%88%9B%E7%AB%9E%E8%B5%9B%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E%E6%B0%B4%E7%A8%BB%E7%A8%BB%E9%A3%9E%E8%99%B1%E6%97%A0%E4%BA%BA%E6%9C%BA%E9%81%A5%E6%84%9F%E5%A4%9A%E5%85%89%E8%B0%B1%E5%85%A8%E6%99%AF%E8%88%AA%E6%B5%8B%E4%B8%8E%E6%8C%91%E6%88%98%E6%9D%AF%E8%81%94%E5%90%88%E7%BB%84%E9%98%9F%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E6%A4%8D%E7%89%A9%E4%BF%9D%E6%8A%A4%E5%AD%A6%E9%99%A2%E6%98%86%E8%99%AB%E5%9B%A2%E9%98%9F%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E6%99%BA%E7%A7%91%E7%AE%97%E6%B3%95%E5%A4%A7%E5%88%9B%E7%BB%84%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%2310b981%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E5%90%88%E8%82%A5%E9%AB%98%E5%88%98%E6%95%99%E5%AD%A6%E7%A7%91%E7%A0%94%E8%AF%95%E9%AA%8C%E5%9F%BA%E5%9C%B0%E5%A4%A7%E7%96%86M350%E8%88%AA%E6%B5%8B%E5%A4%9A%E5%85%89%E8%B0%B1%E6%AD%A3%E5%B0%84%E5%BD%B1%E5%83%8F%E3%80%81%E6%B0%B4%E7%A8%BB%E8%99%AB%E6%83%85%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%9E%E5%9C%B0%E6%A0%87%E5%AE%9A%E9%9B%86%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%2310b981%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E6%8B%9B%E5%8B%9F%E7%B2%BE%E9%80%9A%20WebGL%20/%20React%20%E4%B8%89%E7%BB%B4%E5%85%A8%E6%99%AF%E6%B8%B2%E6%9F%93%E6%88%96%E6%99%BA%E8%83%BD%E4%BD%93%E7%AE%97%E6%B3%95%E7%9A%84%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E7%94%9F%E8%81%94%E5%90%88%E7%BB%84%E9%98%9F%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  },
  {
    "name": "手持便携式微型近红外探头果品糖度无损检测校准方程",
    "summary": "果树生理组提供砀山酥梨与长丰草莓理化破坏性糖度实测数据，寻求化学计量学偏最小二乘校准方程封装。",
    "url": "#intention-fruit-sugar",
    "display": "果树生理团队 ‹-› 移动端与传感器组",
    "accent": "#ec4899",
    "category": "技术转化",
    "initiator": "园艺学院果树生理团队",
    "targetSeek": "移动端与传感器集成组",
    "offer": "500组砀山酥梨与长丰草莓可溶性固形物(糖度)折光仪破坏性真实测定值",
    "seek": "基于偏最小二乘法(PLS)的近红外吸光度校准模型及跨平台 BLE 蓝牙通信封装",
    "urgency": "产学研合作",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23130a10%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%232c0e20%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ec4899%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23ec4899%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%23ec4899%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%23ec4899%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%23ec4899%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%23ec4899%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E6%8A%80%E6%9C%AF%E8%BD%AC%E5%8C%96%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E%E6%89%8B%E6%8C%81%E4%BE%BF%E6%90%BA%E5%BC%8F%E5%BE%AE%E5%9E%8B%E8%BF%91%E7%BA%A2%E5%A4%96%E6%8E%A2%E5%A4%B4%E6%9E%9C%E5%93%81%E7%B3%96%E5%BA%A6%E6%97%A0%E6%8D%9F%E6%A3%80%E6%B5%8B%E6%A0%A1%E5%87%86%E6%96%B9%E7%A8%8B%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E5%9B%AD%E8%89%BA%E5%AD%A6%E9%99%A2%E6%9E%9C%E6%A0%91%E7%94%9F%E7%90%86%E5%9B%A2%E9%98%9F%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%B8%8E%E4%BC%A0%E6%84%9F%E5%99%A8%E9%9B%86%E6%88%90%E7%BB%84%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%23ec4899%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E500%E7%BB%84%E7%A0%80%E5%B1%B1%E9%85%A5%E6%A2%A8%E4%B8%8E%E9%95%BF%E4%B8%B0%E8%8D%89%E8%8E%93%E5%8F%AF%E6%BA%B6%E6%80%A7%E5%9B%BA%E5%BD%A2%E7%89%A9%28%E7%B3%96%E5%BA%A6%29%E6%8A%98%E5%85%89%E4%BB%AA%E7%A0%B4%E5%9D%8F%E6%80%A7%E7%9C%9F%E5%AE%9E%E6%B5%8B%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%9A%E5%80%BC%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%23ec4899%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E5%9F%BA%E4%BA%8E%E5%81%8F%E6%9C%80%E5%B0%8F%E4%BA%8C%E4%B9%98%E6%B3%95%28PLS%29%E7%9A%84%E8%BF%91%E7%BA%A2%E5%A4%96%E5%90%B8%E5%85%89%E5%BA%A6%E6%A0%A1%E5%87%86%E6%A8%A1%E5%9E%8B%E5%8F%8A%E8%B7%A8%E5%B9%B3%E5%8F%B0%20BLE%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%20%E8%93%9D%E7%89%99%E9%80%9A%E4%BF%A1%E5%B0%81%E8%A3%85%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  },
  {
    "name": "2027考研数学一与计算机408核心概念断层互助探针研讨组",
    "summary": "计算机同学讲解数据结构图论与操作系统虚拟内存内核机制，数学专业同学拆解高等数学微分中值与多元积分技巧。",
    "url": "#intention-postgrad-study",
    "display": "信智学院学业组 ‹-› 理学院应用数学组",
    "accent": "#6366f1",
    "category": "考研学业",
    "initiator": "信息与计算机学院学业互助组",
    "targetSeek": "理学院应用数学研学组",
    "offer": "计算机专业 408 核心重难点代码手写推演、操作系统内存分页管理内核思维导图",
    "seek": "数学系应用数学同学深度解析数学一多元函数微积分证明题与线性代数正交变换",
    "urgency": "每周研讨",
    "image": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%201200%20675%22%20width%3D%221200%22%20height%3D%22675%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22bg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230a0b16%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23141733%22/%3E%0A%20%20%20%20%3C/linearGradient%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22glow%22%20cx%3D%2285%25%22%20cy%3D%2215%25%22%20r%3D%2265%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%236366f1%22%20stop-opacity%3D%220.22%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%236366f1%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%20%20%3Cpattern%20id%3D%22grid%22%20width%3D%2240%22%20height%3D%2240%22%20patternUnits%3D%22userSpaceOnUse%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M%2040%200%20L%200%200%200%2040%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C%20255%2C%20255%2C%200.03%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%20%20%3C/pattern%3E%0A%20%20%3C/defs%3E%0A%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23bg%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23glow%29%22/%3E%0A%20%20%3Crect%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22url%28%23grid%29%22/%3E%0A%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221200%22%20height%3D%22675%22%20fill%3D%22none%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%222%22/%3E%0A%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22100%22%20x2%3D%221140%22%20y2%3D%22100%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Cline%20x1%3D%2260%22%20y1%3D%22520%22%20x2%3D%221140%22%20y2%3D%22520%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.08%29%22%20stroke-width%3D%221%22/%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%2244%22%20width%3D%22120%22%20height%3D%2234%22%20rx%3D%2217%22%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.15%22%20stroke%3D%22%236366f1%22%20stroke-opacity%3D%220.4%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%2261%22%20r%3D%224.5%22%20fill%3D%22%236366f1%22/%3E%0A%20%20%3Ctext%20x%3D%22120%22%20y%3D%2266%22%20fill%3D%22%236366f1%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3E%E8%80%83%E7%A0%94%E5%AD%A6%E4%B8%9A%3C/text%3E%0A%20%20%3Ctext%20x%3D%22205%22%20y%3D%2265%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2212%22%20letter-spacing%3D%222%22%3EANAU%20MUTUAL-AID%20INTENTION%20SHEET%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22175%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2232%22%20font-weight%3D%22700%22%20letter-spacing%3D%22-0.5%22%3E2027%E8%80%83%E7%A0%94%E6%95%B0%E5%AD%A6%E4%B8%80%E4%B8%8E%E8%AE%A1%E7%AE%97%E6%9C%BA408%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5%E6%96%AD%E5%B1%82%E4%BA%92%E5%8A%A9%E6%8E%A2%E9%92%88%E7%A0%94%E8%AE%A8%E7%BB%84%3C/text%3E%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22218%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.65%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2217%22%3E%E5%8D%8F%E5%90%8C%E5%AF%B9%E6%8E%A5%E7%AB%AF%EF%BC%9A%E4%BF%A1%E6%81%AF%E4%B8%8E%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E7%BB%84%20%20%E2%80%B9%E2%80%94%E2%80%BA%20%20%E7%90%86%E5%AD%A6%E9%99%A2%E5%BA%94%E7%94%A8%E6%95%B0%E5%AD%A6%E7%A0%94%E5%AD%A6%E7%BB%84%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%2260%22%20y%3D%22270%22%20width%3D%22510%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22310%22%20fill%3D%22%236366f1%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E8%B5%84%E6%BA%90%E4%BE%9B%E7%BB%99%20%C2%B7%20OFFER%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%B8%93%E4%B8%9A%20408%20%E6%A0%B8%E5%BF%83%E9%87%8D%E9%9A%BE%E7%82%B9%E4%BB%A3%E7%A0%81%E6%89%8B%E5%86%99%E6%8E%A8%E6%BC%94%E3%80%81%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%86%85%E5%AD%98%E5%88%86%E9%A1%B5%E7%AE%A1%E7%90%86%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%86%85%E6%A0%B8%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE%3C/text%3E%0A%20%20%3Ctext%20x%3D%2285%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%8A%B6%E6%80%81%EF%BC%9A%E7%A7%91%E7%A0%94%E5%AD%98%E8%AF%81%E6%A0%B8%E9%AA%8C%E9%80%9A%E8%BF%87%20%C2%B7%20%E8%B5%84%E6%BA%90%E5%8F%AF%E7%94%A8%3C/text%3E%0A%0A%20%20%3Crect%20x%3D%22600%22%20y%3D%22270%22%20width%3D%22540%22%20height%3D%22200%22%20rx%3D%2216%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.03%29%22%20stroke%3D%22rgba%28255%2C255%2C255%2C0.09%29%22%20stroke-width%3D%221%22/%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22310%22%20fill%3D%22%236366f1%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%20font-weight%3D%22600%22%20letter-spacing%3D%221%22%3E%E4%BA%92%E5%8A%A9%E5%AF%BB%E6%B1%82%20%C2%B7%20SEEK%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22355%22%20fill%3D%22%23FFFFFF%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2215%22%20font-weight%3D%22500%22%3E%E6%95%B0%E5%AD%A6%E7%B3%BB%E5%BA%94%E7%94%A8%E6%95%B0%E5%AD%A6%E5%90%8C%E5%AD%A6%E6%B7%B1%E5%BA%A6%E8%A7%A3%E6%9E%90%E6%95%B0%E5%AD%A6%E4%B8%80%E5%A4%9A%E5%85%83%E5%87%BD%E6%95%B0%E5%BE%AE%E7%A7%AF%E5%88%86%E8%AF%81%E6%98%8E%E9%A2%98%E4%B8%8E%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E6%AD%A3%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22385%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.7%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E4%BA%A4%E5%8F%98%E6%8D%A2%3C/text%3E%0A%20%20%3Ctext%20x%3D%22625%22%20y%3D%22430%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.45%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2213%22%3E%E7%9B%AE%E6%A0%87%EF%BC%9A%E8%81%94%E5%90%88%E7%94%B3%E6%8A%A5%20/%20%E5%85%B1%E5%90%8C%E7%AC%AC%E4%B8%80%E4%BD%9C%E8%80%85%20/%20%E4%BA%A4%E5%8F%89%E7%BB%93%E9%A1%B9%3C/text%3E%0A%0A%20%20%3Ctext%20x%3D%2260%22%20y%3D%22565%22%20fill%3D%22rgba%28255%2C255%2C255%2C0.4%29%22%20font-family%3D%22-apple-system%2C%20BlinkMacSystemFont%2C%20Segoe%20UI%2C%20sans-serif%22%20font-size%3D%2214%22%3E%E5%AE%89%E5%BE%BD%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%20%E7%A7%91%E7%A0%94%E4%B8%8E%E5%AD%A6%E4%B8%9A%E4%BA%92%E5%8A%A9%E6%92%AE%E5%90%88%E7%B3%BB%E7%BB%9F%20%C2%B7%20%E6%99%BA%E8%83%BD%E4%BD%93%E6%92%AE%E5%90%88%E7%BD%91%E7%BB%9C%E5%B0%B1%E7%BB%AA%20%C2%B7%20%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8B%E8%A7%92%E6%84%8F%E5%90%91%E6%8C%89%E9%92%AE%E6%9F%A5%E7%9C%8B%E8%AF%A6%E5%8D%95%3C/text%3E%0A%3C/svg%3E"
  }
];

export interface ProjectDeckProps {
  projects?: Project[];
  ground?: string;
  className?: string;
  onSelectProject?: (project: Project) => void;
  children?: ReactNode;
}

export function ProjectDeck({
  projects = DEFAULT_PROJECTS,
  ground = "#0A0C14",
  className,
  onSelectProject,
  children
}: ProjectDeckProps) {
  const deck = useRef(null as HTMLElement | null);
  const reduce = useReducedMotion() ?? false;
  const count = projects.length;
  const { scrollYProgress } = useScroll({ target: deck, offset: ["start start", "end end"] });
  // a light, critically damped smoothing: follows the wheel closely and never overshoots
  const progress = useSpring(scrollYProgress, { stiffness: 380, damping: 48, mass: 0.35 });

  return (
    <MotionConfig reducedMotion="user">
      {/* one screen of scroll per card; the stage stays pinned while they are dealt onto it */}
      <section
        ref={deck}
        className={cn("relative w-full", className)}
        style={{ height: `${Math.max(1, count) * 100}svh` }}
        aria-label="科研与学业互助意向单"
      >
        <div className="sticky top-0 grid h-[100svh] place-items-center overflow-hidden px-5 [perspective:1800px] sm:px-10 lg:px-14">
          {projects.map((p, i) => (
            <Card
              key={p.url + i}
              p={p}
              i={i}
              count={count}
              progress={progress}
              still={reduce}
              ground={ground}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>
      {children}
    </MotionConfig>
  );
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const ENTER = 0.72; // share of each card screen spent arriving; the rest it rests in place

/** How far card j has arrived (0 below the window, 1 landed) at deck progress v. */
function arrived(j: number, v: number, count: number) {
  if (j <= 0) return 1;
  const span = Math.max(1, count - 1);
  return easeOut(clamp01((v * span - (j - 1)) / ENTER));
}

function Card({
  p,
  i,
  count,
  progress,
  still,
  ground,
  onSelect
}: {
  p: Project;
  i: number;
  count: number;
  progress: MotionValue<number>;
  still: boolean;
  ground: string;
  onSelect?: (project: Project) => void;
}) {
  // cards now lying on top of this one, counted smoothly
  const above = (v: number) => {
    let n = 0;
    for (let j = i + 1; j < count; j++) n += arrived(j, v, count);
    return Math.min(3, n);
  };

  const y = useTransform(progress, (v) => `${(1 - arrived(i, v, count)) * 108 - above(v) * 5}svh`);
  const rotateX = useTransform(progress, (v) => -(1 - arrived(i, v, count)) * 30 + above(v) * 5);
  const scale = useTransform(progress, (v) => 0.9 + 0.1 * arrived(i, v, count) - above(v) * 0.05);
  const filter = useTransform(progress, (v) => `blur(${((1 - arrived(i, v, count)) ** 2 * 12 + above(v) * 1.1).toFixed(2)}px)`);
  const dim = useTransform(progress, (v) => above(v) * 0.15);
  const stillY = useTransform(progress, (v) => (arrived(i, v, count) >= 0.5 ? "0svh" : "110svh"));

  return (
    <motion.article
      aria-label={`${p.name}: ${p.summary}`}
      className="col-start-1 row-start-1 mt-[4svh] w-[min(100%,calc(84svh*16/9),1480px)] origin-[50%_25%] will-change-[transform,filter] max-sm:w-full"
      style={{ zIndex: i + 1, ...(still ? { y: stillY } : { y, rotateX, scale, filter }) }}
    >
      <div
        className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_50px_90px_-35px_rgba(0,0,0,0.8)]"
        style={{ background: ground }}
      >
        <img
          src={p.image}
          alt={`互助意向单: ${p.name}`}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          className="block aspect-[16/9] w-full object-cover object-top max-sm:aspect-[4/5]"
        />
        <Visit p={p} ground={ground} onSelect={onSelect} />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[#0A0C14]"
          style={{ opacity: still ? 0 : dim }}
        />
      </div>
    </motion.article>
  );
}

/** The visit / inquiry button, set into a corner cut out of the card. */
function Visit({
  p,
  ground,
  onSelect
}: {
  p: Project;
  ground: string;
  onSelect?: (project: Project) => void;
}) {
  const R = 18;
  const corner = (
    <svg aria-hidden width={R} height={R} viewBox={`0 0 ${R} ${R}`} className="block">
      <path d={`M${R} 0 V${R} H0 A${R} ${R} 0 0 0 ${R} 0 Z`} fill={ground} />
    </svg>
  );

  return (
    <div className="absolute right-0 bottom-0 z-10">
      <div className="absolute right-0 bottom-full">{corner}</div>
      <div className="absolute right-full bottom-0">{corner}</div>
      <button
        type="button"
        onClick={() => onSelect?.(p)}
        aria-label={`查看互助意向单：${p.name}`}
        className="group flex items-center gap-4 rounded-tl-[20px] py-3 pr-2 pl-5 text-white outline-none transition-colors duration-200 hover:text-white sm:gap-5 sm:py-4 sm:pl-7 cursor-pointer"
        style={{ background: ground }}
      >
        <span className="flex flex-col text-left leading-tight">
          <span className="text-[15px] font-semibold tracking-[-0.015em] sm:text-[18px] text-zinc-100 group-hover:text-white transition-colors">
            {p.name}
          </span>
          <span className="text-[12px] text-zinc-400 group-hover:text-zinc-200 transition-colors sm:text-[14px]">
            {p.display ?? p.url}
          </span>
        </span>
        <span
          className="grid size-11 place-items-center rounded-full text-black font-semibold transition-transform duration-200 ease-out group-hover:rotate-45 group-active:scale-90 group-focus-visible:outline-2 group-focus-visible:outline-offset-2 sm:size-[52px]"
          style={{ background: p.accent, outlineColor: p.accent }}
        >
          <ArrowUpRight className="size-5 sm:size-6 text-black" strokeWidth={2.4} />
        </span>
      </button>
    </div>
  );
}
