// src/App.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import {
  ArrowRight,
  ArrowDown,
  Github,
  Mail,
  ExternalLink,
  PenLine,
  Globe2,
  Loader2,
} from "lucide-react";

const year = new Date().getFullYear();

const CONTACT_ENDPOINT= import.meta.env.VITE_CONTACT_ENDPOINT ?? "";

/* ===== Loading Screen Component ===== */

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xs font-semibold tracking-[0.2em] text-slate-300">
          PORTFOLIO LOADING
        </span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-300" />
        <p className="text-sm font-medium text-slate-100">
          Uchiyama Ryoto&apos;s Portfolio
        </p>
        <p className="text-[11px] text-slate-400">
          少々お待ちください… エンジニア「まる」の世界を準備中です。
        </p>
      </div>
    </div>
  );
}

/* ===== data: skills ===== */

const frontEndSkills = [
  {
    name: "HTML/CSS",
    caption: "適切なタグ選択・アクセシビリティ・レスポンシブ対応を含めて実装可能。",
    percent: 80,
  },
  {
    name: "JavaScript/jQuery",
    caption: "DOM操作・非同期通信・UI制御などの基本的な実装可能。",
    percent: 80,
  },
  {
    name: "TypeScript/React",
    caption: "型安全な状態管理・コンポーネント設計・Hooks を用いた開発が可能。",
    percent: 60,
  },
  {
    name: "TailwindCSS/shadcn",
    caption: "UI/UX設計を意識したコンポーネントベースのスタイリングができる。",
    percent: 60,
  },
  {
    name: "Nuxt3/Next",
    caption: "フロントエンドフレームワークを用いた SPA/SSR 開発が可能。",
    percent: 40,
  },
];

const backendSkills = [
  {
    name: "MySQL/PostgreSQL",
    caption: "正規化/インデックス設計・複雑クエリ・パフォーマンス改善まで対応可能。",
    percent: 80,
  },
  {
    name: "Laravel/PHP",
    caption: "REST API/TDD/サービス層設計/ミドル〜中規模案件の実装経験あり。",
    percent: 80,
  },
  {
    name: "Supabase/Firebase",
    caption: "認証・ストレージ・RLS/セキュリティポリシーを含めて運用できる。",
    percent: 40,
  },
  {
    name: "Node.js",
    caption: "サーバーレス関数や CLI の作成、バックエンド処理の構築が可能。",
    percent: 40,
  },
  {
    name: "Prisma",
    caption: "型安全な ORM と Migration 運用を理解しているが経験は限定的。",
    percent: 20,
  },
];

const devopsSkills = [
  {
    name: "Docker/Compose",
    caption: "開発環境構築、CI連携まで対応可能",
    percent: 60,
  },
  {
    name: "CI/CD (GitHub Actions)",
    caption: "ビルド・テスト・デプロイの自動化パイプラインを構築できる。",
    percent: 40,
  },
  {
    name: "AWS",
    caption: "EC2/RDS/S3/ALB を中心に、個人開発レベルの本番運用が可能。",
    percent: 20,
  },
  {
    name: "Vercel/Netlify",
    caption: "フロントのデプロイ/CD・環境変数管理・サーバレス関数が扱える。",
    percent: 40,
  },
  {
    name: "Linux",
    caption: "ターミナル操作・権限・プロセス管理など運用面を理解している。",
    percent: 80,
  },
];

/* ===== data: timeline ===== */

const TIMELINE = [
  {
    period: "2018 ~ 2021 高校生時代",
    title: "プログラミングと出会う",
    body: "商業高校で情報処理を学び、HTML/CSS/JavaScriptに触れる。プログラミングの楽しさに目覚める。",
  },
  {
    period: "2021 ~ 2025 Webエンジニアとしての経験",
    title: "専門学校での学びと企業での実務経験",
    body: "専門学校でSEを専攻し、Web技術に関する技術を中心に学ぶ。IT企業でのアルバイトを2年間行い、実務経験を積み、チーム開発やプロジェクト管理のスキルも習得。",
  },
  {
    period: "2025 ~ 現在",
    title: "SIer勤務と個人開発の両立",
    body: "SIerにてシステムエンジニアとして勤務しつつ、個人開発にも注力。旅行プラン自動生成サービス「TravelWeever」をはじめとするWebアプリを開発。",
  },
  {
    period: "現在 ~",
    title: "退社・フリーランス/個人開発者への転向を目指す",
    body: "11月をもって会社との方向性の違いから退社。今後はフリーランスや個人開発者として活動予定。",
  },
];

/* ===== data: works ===== */
type WorkItem = {
  id: string;
  title: string;
  titleClassName?: string;
  badgeText: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  badgeClassName?: string;
  description: string;
  body: string;
  detailLabel: string;
  detailText: string;
  backLabel: string;
  backText: string;
  footerLabel?: string;
  footerHref?: string;
  footerIcon?: "external" | "pen";
  footerClassName?: string;
};

const WORKS: WorkItem[] = [
  {
    id: "travelweever",
    title: "TravelWeever",
    titleClassName: "text-white",
    badgeText: "デプロイ済み",
    badgeVariant: "default",
    badgeClassName: "bg-cyan-600/80",
    description:
      "複数都市の観光・ホテル・移動プランをまとめて自動で生成するトラベルプランナー。",
    body: "Nuxt3+Supabase構成で、ドラッグ＆ドロップ編集やPro/Freeプランの切り替え、Stripe課金連携などを実装。",
    detailLabel: "技術",
    detailText:
      "Nuxt3, TypeScript, Supabase, Tailwind, Stripe, Netlify, googleMapsAPI",
    backLabel: "作成の背景",
    backText:
      "直感的な操作を通じて、旅行計画の手間を大幅に削減したいと考え開発。外部APIの仕様や仕組みを調査し、効率的なプラン生成ロジックを設計。",
    footerLabel: "サイトを見る",
    footerHref: "https://travelweever.com",
    footerIcon: "external",
    footerClassName: "text-cyan-300",
  },
  {
    id: "transPiece",
    title: "TransPiece",
    titleClassName: "text-white",
    badgeText: "未デプロイ",
    badgeVariant: "default",
    badgeClassName: "bg-amber-600/80",
    description:
      "名著の英文を読みながら翻訳トレーニングができる学習支援アプリ。",
    body: "Laravel + Next.js + OpenAI API で、 ユーザーの訳文に対する AI フィードバックや復習スケジューラなどを実装。",
    detailLabel: "技術",
    detailText:
      "Laravel, Next.js, Docker, OpenAI API, MySQL, AWS, Jest, PHPUnit, Cypress, Lighthouse",
    backLabel: "作成の背景",
    backText:
      "翻訳を通しての英語学習をスムーズに行いたいと考え開発。AIを活用したフィードバックやFSRSアルゴリズムによる反復学習機能を実装。",
    footerLabel: "サイトを見る",
    footerHref: "https://develop.d19hc3rqpf44ck.amplifyapp.com/",
    footerIcon: "external",
    footerClassName: "text-cyan-300",
  },
  {
    id: "qaiz",
    title: "QAIZ",
    titleClassName: "text-white",
    badgeText: "githubのみ",
    badgeVariant: "default",
    badgeClassName: "bg-violet-600/80",
    description:
      "長文を登録することユーザ独自のクイズを自動生成・出題する学習ツール。",
    body: "Laravelをメインに作成したWebアプリ。自然言語処理の実装や、GPT APIを用いたクイズ生成機能を実装。",
    detailLabel: "技術",
    detailText:
      "Laravel, Google Colaboratory, OracleDB, Ubuntu, Docker, Apache, PHPMyAdmin, github",
    backLabel: "作成の背景",
    backText:
      "チーム開発のリーダーとしてマネジメントを実施し、自然言語処理によるクイズ作成アプリを開発。push時の競合やコードレビューの大変さ、メンバー管理の大変さを認識。",
    footerLabel: "githubを見る",
    footerHref: "https://github.com/UchiyamaRyoto/sotukensaisin",
    footerIcon: "pen",
    footerClassName: "text-cyan-300",
  },
];

/* ===== Radar Chart Component ===== */

type SkillRadarCardProps = {
  title: string;
  subtitle: string;
  skills: { name: string; caption: string; percent: number }[];
};

function SkillRadarCard({ title, subtitle, skills }: SkillRadarCardProps) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = 80;
  const angleStep = (Math.PI * 2) / skills.length;
  const levels = [25, 50, 75, 100];

  const getPoint = (percent: number, index: number) => {
    const angle = -Math.PI / 2 + angleStep * index; // 上を起点に反時計回り
    const r = (percent / 100) * maxRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y };
  };

  // ラベル用に、レーダー図より少し外側の位置を取得する関数
  const getLabelPoint = (index: number) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const labelRadius = maxRadius + 22; // ちょっと外側に出す
    const x = cx + labelRadius * Math.cos(angle);
    const y = cy + labelRadius * Math.sin(angle);
    return { x, y, angle };
  };

  // 評価値の多角形パス
  const polygonPath =
    skills
      .map((s, i) => {
        const { x, y } = getPoint(s.percent, i);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z";

  return (
    <Card className="border-slate-700/80 bg-slate-900/70 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-cyan-500/60 hover:shadow-[0_18px_45px_rgba(8,47,73,0.7)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white">{title}</CardTitle>
        <CardDescription className="text-[11px] text-slate-300">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Radar SVG */}
        <div className="flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="text-slate-500"
          >
            {/* グリッドの同心多角形 */}
            {levels.map((level, li) => {
              const r = (level / 100) * maxRadius;
              const d =
                skills
                  .map((_, i) => {
                    const angle = -Math.PI / 2 + angleStep * i;
                    const x = cx + r * Math.cos(angle);
                    const y = cy + r * Math.sin(angle);
                    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                  })
                  .join(" ") + " Z";
              return (
                <path
                  key={level}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.5}
                  opacity={0.3 - li * 0.05}
                />
              );
            })}

            {/* 軸線 */}
            {skills.map((_, i) => {
              const { x, y } = getPoint(100, i);
              return (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  opacity={0.4}
                />
              );
            })}

            {/* 値の多角形 */}
            <path
              d={polygonPath}
              fill="url(#skillFill)"
              stroke="url(#skillStroke)"
              strokeWidth={1.2}
            />

            {/* 頂点の丸 */}
            {skills.map((s, i) => {
              const { x, y } = getPoint(s.percent, i);
              return (
                <circle
                  key={s.name}
                  cx={x}
                  cy={y}
                  r={3}
                  className="fill-cyan-300"
                  stroke="rgba(15,23,42,0.9)"
                  strokeWidth={1}
                />
              );
            })}

            {/* 各辺（軸）の先にスキル名ラベル */}
            {skills.map((s, i) => {
              const { x, y, angle } = getLabelPoint(i);

              // 角度に応じてアンカーを少し調整（左側は右寄せ、右側は左寄せに）
              const cos = Math.cos(angle);
              let textAnchor: "start" | "middle" | "end" = "middle";
              if (cos > 0.2) textAnchor = "start";
              else if (cos < -0.2) textAnchor = "end";

              return (
                <text
                  key={s.name}
                  x={x}
                  y={y}
                  fontSize={9}
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  fill="#e5e7eb" // slate-200 相当
                  style={{ pointerEvents: "none" }}
                >
                  {s.name}
                </text>
              );
            })}

            {/* グラデーション定義 */}
            <defs>
              <linearGradient id="skillFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.15} />
              </linearGradient>
              <linearGradient id="skillStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 説明リスト */}
        <ul className="space-y-1.5 text-[11px] text-slate-400">
          {skills.map((skill) => (
            <li key={skill.name} className="flex gap-1.5">
              <span className="mt-[4px] inline-block h-[6px] w-[6px] flex-none rounded-full bg-cyan-400/80" />
              <span className="flex-1">
                <span className="font-medium text-slate-200">{skill.name}</span>
                <span className="text-slate-400"> — {skill.caption}</span>
                <span className="ml-1 text-slate-500">({skill.percent}%)</span>
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/* ===== form ===== */
type ContactStatus = "idle" | "success" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ContactStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("全ての項目を入力してください。");
      return;
    }

    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!res.ok) throw new Error("submit failed");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-3 text-xs" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-[11px] text-slate-200">お名前</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-8 border-slate-600/80 bg-slate-900 text-slate-300"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-200">メールアドレス</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-8 border-slate-600/80 bg-slate-900 text-slate-300"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[11px] text-slate-200">ご用件</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="ご相談内容・簡単な背景などをお書きください。"
          className="min-h-[90px] border-slate-600/80 bg-slate-900 text-slate-300"
        />
      </div>

      {status === "success" && (
        <p className="text-[11px] text-emerald-400">
          送信しました。折り返しご連絡いたします！
        </p>
      )}
      {status === "error" && (
        <p className="text-[11px] text-rose-400">
          送信に失敗しました。もう一度お試しください。
        </p>
      )}

      <Button type="submit" size="sm" disabled={submitting} className="gap-1.5">
        {submitting ? "送信中..." : "送信する"}
        <Mail className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
}

/* ===== Main Portfolio Component ===== */
function PortfolioMain() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* ===== Animation ===== */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-72 w-72
                    rounded-full bg-cyan-500/20 blur-3xl
                    animate-blob-24s"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72
                    rounded-full bg-emerald-500/15 blur-3xl
                    animate-blob-30s"
      />
      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
            <span className="text-sm font-semibold tracking-wide">
              Uchiyama Ryoto
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-xs text-slate-300 md:flex">
            <a href="#about" className="hover:text-cyan-300">
              ABOUT
            </a>
            <a href="#works" className="hover:text-cyan-300">
              WORKS
            </a>
            <a href="#skills" className="hover:text-cyan-300">
              SKILLS
            </a>
            <a href="#profile" className="hover:text-cyan-300">
              PROFILE
            </a>
            <a href="#contact" className="hover:text-cyan-300">
              CONTACT
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
        {/* ===== About ===== */}
        <section id="about" className="scroll-mt-24">
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:items-start">
            {/* Left side */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-slate-400">
                PORTFOLIO
              </p>
              <h1 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
                エンジニア「まる」のポートフォリオサイトです。
                <br />
                フルスタック寄りのエンジニアです。
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                旅行プラン自動生成サービス「TravelWeever」をはじめとした
                Webアプリを個人開発しています。
                新しい技術を取り込んだサービスを作成するのが好きです。
                <br />
                このポートフォリオはReact/Vite/Tailwind/shadcn/Github Pagesで作成しています。
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <Badge variant="outline" className="text-gray-400">
                  Laravel/PHP
                </Badge>
                <Badge variant="outline" className="text-gray-400">
                  Nuxt3/Vue
                </Badge>
                <Badge variant="outline" className="text-gray-400">
                  Next.js/React
                </Badge>
                <Badge variant="outline" className="text-gray-400">
                  Supabase
                </Badge>
                <Badge variant="outline" className="text-gray-400">
                  個人SaaS
                </Badge>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="sm"
                  className="gap-1.5 transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
                >
                  <a href="#works">
                    制作物を見る
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="gap-1.5 transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
                >
                  <a href="#contact">
                    相談したい案件があります
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>

              <dl className="mt-6 grid gap-3 text-[11px] text-slate-300 md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-200">得意分野</dt>
                  <dd>バックエンド</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-200">活動拠点</dt>
                  <dd>日本（リモート中心で活動中）</dd>
                </div>
              </dl>
              <dl className="mt-6 grid gap-3 text-[11px] text-slate-300 md:grid-cols-2">
                <div>
                  <dt className="font-semibold text-slate-200">保有資格</dt>
                  <dd>基本情報技術者試験合格</dd>
                  <dd>応用情報技術者試験合格</dd>
                  <dd>情報処理安全確保支援士試験合格</dd>
                  <dd>Oracle DBA Silver合格</dd>
                </div>
              </dl>
            </div>

            {/* Right side (profile card) */}
            <Card className="border-slate-700/80 bg-slate-900/60 shadow-xl">
              <CardContent className="flex gap-4 pt-6">
                <div className="relative h-20 w-20 flex-none overflow-hidden rounded-full border border-slate-600 bg-gradient-to-br from-slate-200 via-slate-400 to-slate-700">
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900/90">
                    <img
                      src="/user.ico"
                      alt="Uchiyama Ryoto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-100">
                      Uchiyama Ryoto
                    </p>
                    <Badge
                      variant="outline"
                      className="border-slate-600 bg-slate-900/70 text-[10px] text-gray-400"
                    >
                      Web Engineer
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300">
                    Web Engineer / 個人開発者
                    <br />
                    読書とゲームが好きです。一人海外旅行に行きたい。
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1.5 text-[11px]">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 border-slate-600/80 transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
                      asChild
                    >
                      <a
                        href="https://github.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 border-slate-600/80 transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
                      asChild
                    >
                      <a
                        href="mailto:maru11.nan09@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Mail"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 border-slate-600/80 transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
                      asChild
                    >
                      <a
                        href="https://qiita.com/mar11tre"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Website"
                      >
                        <Globe2 className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ===== Works ===== */}
        <section id="works" className="scroll-mt-24 pt-12">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-slate-400">
                WORKS
              </p>
              <h2 className="mt-2 text-xl font-semibold">主な制作物</h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-300">
                個人開発で取り組んできた Web アプリやツールの一部です。
                「自分が使いたいか」「説明なしでも触れるか」を大事にしつつ、
                企画から実装・デプロイまでひと通り担当しています。
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {WORKS.map((work) => (
              <Card
                key={work.id}
                className="border-slate-700/80 bg-slate-900/70 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-cyan-500/60 hover:shadow-[0_18px_45px_rgba(8,47,73,0.7)]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle
                      className={`text-sm ${work.titleClassName ?? ""}`}
                    >
                      {work.title}
                    </CardTitle>
                    <Badge
                      variant={work.badgeVariant ?? "default"}
                      className={`${work.badgeClassName ?? ""} text-[10px]`}
                    >
                      {work.badgeText}
                    </Badge>
                  </div>
                  <CardDescription className="text-[11px] text-slate-300">
                    {work.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-[11px] text-slate-300">
                  <p>{work.body}</p>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      {work.detailLabel}
                    </p>
                    <p>{work.detailText}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400">
                      {work.backLabel}
                    </p>
                    <p>{work.backText}</p>
                  </div>
                </CardContent>
                {work.footerLabel && work.footerHref && (
                  <CardFooter className="pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className={`gap-1 px-0 text-[11px] ${
                        work.footerClassName ?? ""
                      } group`}
                    >
                      <a
                        href={work.footerHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {work.footerLabel}
                        {work.footerIcon === "pen" ? (
                          <PenLine className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        ) : (
                          <ExternalLink className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        )}
                      </a>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* ===== Skills (Radar) ===== */}
        <section id="skills" className="scroll-mt-24 pt-12">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-slate-400">
            SKILLS
          </p>
          <h2 className="mt-2 text-xl font-semibold">スキルセット</h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-300">
            個人開発が完結することを意識して、フロントエンド〜バックエンド〜インフラまで
            幅広く触ってきました。レーダーチャートは自己評価（★5 相当で
            100%）です。
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SkillRadarCard
              title="Frontend"
              subtitle="UI / 体験設計まわり。"
              skills={frontEndSkills}
            />
            <SkillRadarCard
              title="Backend"
              subtitle="API・DB 設計とサーバサイド実装。"
              skills={backendSkills}
            />
            <SkillRadarCard
              title="DevOps / Infra"
              subtitle="個人開発を本番運用するための下回り。"
              skills={devopsSkills}
            />
          </div>
        </section>

        {/* ===== Timeline ===== */}
        <section id="timeline" className="scroll-mt-24 pt-12">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-slate-400">
            TIMELINE
          </p>
          <h2 className="mt-2 text-xl font-semibold">これまでの歩み</h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-300">
            「なぜこの分野でやっていきたいのか」という背景も含めて、
            簡単にまとめています。詳細な職務経歴は別途資料でご用意しています。
          </p>

          <div className="mt-6 space-y-5 border-l border-slate-700/80 pl-4 text-xs">
            {TIMELINE.map((item) => (
              <div
                key={item.period}
                className="group relative -ml-3 space-y-1.5 rounded-md px-3 py-2
                 transition duration-300 ease-out
                 hover:-translate-y-0.5 hover:bg-slate-900/70
                 hover:shadow-[0_12px_32px_rgba(8,47,73,0.65)]"
              >
                <span className="absolute -left-[9px] top-1 flex h-5 w-8 items-center justify-center">
                  <span
                    className="h-2 w-2 rounded-full bg-slate-400
                     shadow-[0_0_12px_rgba(34,211,238,0.9)]
                     transition-transform duration-300
                     group-hover:scale-110
                     group-hover:shadow-[0_0_20px_rgba(34,211,238,1)]
                     group-hover:bg-cyan-400"
                  />
                </span>
                <p
                  className="ml-3 text-[11px] font-medium text-slate-400
                   transition-colors duration-300
                   group-hover:text-cyan-300"
                >
                  {item.period}
                </p>
                <p
                  className="text-sm font-medium text-slate-100
                   transition-colors duration-300
                   group-hover:text-slate-50"
                >
                  {item.title}
                </p>
                <p
                  className="max-w-xl text-slate-300
                   transition-colors duration-300
                   group-hover:text-slate-200"
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contact" className="scroll-mt-24 pt-12">
          <Separator className="mb-8 border-slate-800/80" />
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-slate-400">
                CONTACT
              </p>
              <h2 className="mt-2 text-xl font-semibold">お問い合わせ</h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                開発のご相談・技術的な質問・カジュアルな雑談など、お気軽にご連絡ください。
              </p>
            </div>

            <Card className="border-slate-700/80 bg-slate-900/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">
                  お問い合わせフォーム
                </CardTitle>
                <CardDescription className="text-[11px] text-slate-300">
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="mt-10 border-t border-slate-800/80 pt-4 text-center text-[11px] text-slate-500">
          © {year} Uchiyama Ryoto. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

function IntroScreen({ onFinish }: { onFinish?: () => void }) {
  type DotPoint = {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  };

  const [points, setPoints] = useState<DotPoint[]>([]);
  const [started, setStarted] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const width = 900;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = "ENGINEER MARU";
    const fontSize = 70;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;

    const textX = (width - textWidth) / 2;
    const textY = height / 2;

    ctx.fillText(text, textX, textY);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const rawPoints: DotPoint[] = [];
    const step = 2; // 小さいほど点が増える（4〜6 くらいが軽くてちょうどいい）

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const idx = (y * width + x) * 4 + 3; // alpha
        const alpha = data[idx];
        if (alpha > 128) {
          // キャンバス座標を [-0.5, 0.5] に正規化
          const nx = (x - width / 2) / width;
          const ny = (y - height / 2) / height;

          // 文字を少し小さめに & 中央寄せ（はみ出し防止）
          const SCALE_X = 0.7;
          const SCALE_Y = 0.6;

          let endX = 50 + nx * SCALE_X * 100;
          let endY = 50 + ny * SCALE_Y * 100;

          // 万が一のはみ出しを防ぐために 0〜100 に clamp
          endX = Math.max(0, Math.min(100, endX));
          endY = Math.max(0, Math.min(100, endY));

          // スタート位置は画面全体にランダム散布
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;

          rawPoints.push({
            id: rawPoints.length,
            startX,
            startY,
            endX,
            endY,
          });
        }
      }
    }

    // 点が多すぎる場合は間引き
    const MAX_POINTS = 2500;
    const filtered =
      rawPoints.length > MAX_POINTS
        ? rawPoints.filter(
            (_, i) => i % Math.ceil(rawPoints.length / MAX_POINTS) === 0
          )
        : rawPoints;

    setPoints(filtered);

    // 次のフレームで「収束開始」フラグを立てる
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, 50);

    // scroll表示開始
    const scrollTimer = setTimeout(() => {
      setShowScroll(true);
    }, 1750);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    if (!onFinish) return;

    let touchStartY = 0;
    let finished = false;

    const finishOnce = () => {
      if (finished) return;
      finished = true;
      onFinish();
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        finishOnce();
      } 
    };

    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Enter"
      ) {
        finishOnce();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY ?? 0;
      // 上方向にスワイプ（=スクロールダウン）したら終了
      if (touchStartY - currentY > 10) {
        finishOnce();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onFinish]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      {/* 点たち */}
      <div className="pointer-events-none absolute inset-0">
        {points.map((p) => (
          <span
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-cyan-300/80"
            style={
              {
                left: `${started ? p.endX : p.startX}%`,
                top: `${started ? p.endY : p.startY}%`,
                opacity: started ? 1 : 0,
                transition:
                  "left 1.6s ease-out, top 1.6s ease-out, opacity 1.6s ease-out",
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* 中央のタイトル（テキスト本体） */}
      {showScroll && (
        <div className="relative text-center">
          <div className="mt-50 flex justify-center">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 animate-bounce">
              <ArrowDown className="h-3 w-3" />
              Scroll
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showIntro) {
    return <IntroScreen onFinish={() => setShowIntro(false)} />;
  }

  return <PortfolioMain />;
}
