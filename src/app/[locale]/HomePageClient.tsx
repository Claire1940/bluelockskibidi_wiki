"use client";

import { Suspense, lazy } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  FlaskConical,
  Gift,
  Goal,
  GraduationCap,
  Keyboard,
  Newspaper,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} animate-pulse rounded-xl border border-border bg-white/5`}
  />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bluelockskibidi.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Blue Lock Skibidi Wiki",
        description:
          "Complete Blue Lock Skibidi Wiki covering codes, tier lists, characters, controls, skills, and update guides for the anime-inspired Roblox soccer game.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Blue Lock Skibidi - Chaotic Anime Soccer on Roblox",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Blue Lock Skibidi Wiki",
        alternateName: "Blue Lock: Skibidi",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Blue Lock Skibidi Wiki - Chaotic Anime Soccer on Roblox",
        },
        sameAs: [
          "https://www.roblox.com/games/77021749781226/Blue-Lock-Skibidi",
          "https://www.roblox.com/users/1350316312/profile",
          "https://www.youtube.com/watch?v=Gz6agTftZ1Y",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Blue Lock: Skibidi",
        gamePlatform: ["Roblox"],
        applicationCategory: "Game",
        genre: ["Sports", "Soccer", "Anime"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 10,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://www.roblox.com/games/77021749781226/Blue-Lock-Skibidi",
        },
      },
      {
        "@type": "VideoObject",
        name: "THIS GAME IS SO BAD ITS GOOD? | Blue Lock Skibidi",
        description:
          "Blue Lock Skibidi gameplay showcase — anime-inspired Roblox soccer with chaotic matches, character skills, and awakenings.",
        uploadDate: "2025-10-01",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/Gz6agTftZ1Y",
        url: "https://www.youtube.com/watch?v=Gz6agTftZ1Y",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Blue Lock Skibidi module data
  const codesModule = t.modules.blueLockSkibidiCodes;
  const beginnerModule = t.modules.blueLockSkibidiBeginnerGuide;
  const tierModule = t.modules.blueLockSkibidiCharacterTierList;
  const charactersModule = t.modules.blueLockSkibidiCharactersAndRarities;
  const controlsModule = t.modules.blueLockSkibidiControlsAndSkillsGuide;
  const goalkeeperModule = t.modules.blueLockSkibidiGoalkeeperGuide;
  const combosModule = t.modules.blueLockSkibidiChemicalReactionsAndCombos;
  const updatesModule = t.modules.blueLockSkibidiUpdatesAndNewCharacters;

  const workingCodes = (codesModule.items || []).filter(
    (c: any) => c.status === "Working",
  );
  const expiredCodes = (codesModule.items || []).filter(
    (c: any) => c.status === "Expired",
  );

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 text-center scroll-reveal">
            {/* Badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border
                            border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)]
                            px-3 py-1.5 md:mb-6 md:px-4 md:py-2"
            >
              <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 rounded-lg
                           bg-[hsl(var(--nav-theme))] px-6 py-3.5 font-semibold text-base text-white
                           transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)]
                           md:px-8 md:py-4 md:text-lg"
              >
                <Gift className="h-5 w-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/77021749781226/Blue-Lock-Skibidi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg
                           border border-border px-6 py-3.5 font-semibold text-base
                           transition-colors hover:bg-white/10
                           md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-5xl scroll-reveal">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="Gz6agTftZ1Y"
              title="THIS GAME IS SO BAD ITS GOOD? | Blue Lock Skibidi"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards */}
      <section className="bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8 text-center scroll-reveal md:mb-12">
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionIds = [
                "codes",
                "beginner-guide",
                "character-tier-list",
                "characters-and-rarities",
                "controls-and-skills-guide",
                "goalkeeper-guide",
                "chemical-reactions-and-combos",
                "updates-and-new-characters",
              ];
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="group scroll-reveal cursor-pointer rounded-xl border border-border
                             bg-card p-4 text-left transition-all duration-300
                             hover:border-[hsl(var(--nav-theme)/0.5)]
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]
                             md:p-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg
                                  bg-[hsl(var(--nav-theme)/0.1)] transition-colors
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  md:mb-4 md:h-12 md:w-12"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Guides / Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Codes */}
      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={<Gift className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />}
            eyebrow={codesModule.eyebrow}
            title={codesModule.title}
            subtitle={codesModule.subtitle}
            intro={codesModule.intro}
          />

          {/* Working Codes */}
          <div className="mb-8 scroll-reveal md:mb-10">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Gift className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
              Working Blue Lock Skibidi Codes
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {workingCodes.map((code: any, index: number) => (
                <div
                  key={code.code}
                  className="rounded-xl border border-[hsl(var(--nav-theme)/0.4)]
                             bg-[hsl(var(--nav-theme)/0.08)] p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <code className="rounded bg-black/30 px-2 py-1 font-mono text-sm font-bold tracking-wide">
                      {code.code}
                    </code>
                    <span className="rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.2)] px-2 py-0.5 text-xs text-[hsl(var(--nav-theme-light))]">
                      {code.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reward: {code.reward}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {code.update}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expired Codes */}
          {expiredCodes.length > 0 && (
            <div className="mb-8 scroll-reveal md:mb-10">
              <h3 className="mb-4 text-lg font-bold">Expired Codes</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {expiredCodes.map((code: any) => (
                  <div
                    key={code.code}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border bg-white/5 p-3 opacity-70"
                  >
                    <code className="font-mono text-sm text-muted-foreground line-through">
                      {code.code}
                    </code>
                    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                      {code.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Redemption Steps */}
          <div className="mb-8 scroll-reveal rounded-xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.05)] p-4 md:p-6">
            <h3 className="mb-4 text-base font-bold md:text-lg">
              {codesModule.redemption.title}
            </h3>
            <ol className="space-y-3">
              {codesModule.redemption.steps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.2)] text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Troubleshooting */}
          <div className="mb-8 scroll-reveal rounded-xl border border-border bg-white/5 p-4 md:p-6">
            <h3 className="mb-4 text-base font-bold md:text-lg">
              {codesModule.troubleshooting.title}
            </h3>
            <ul className="space-y-2">
              {codesModule.troubleshooting.checks.map((check: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-sm text-muted-foreground">{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="scroll-reveal rounded-xl border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.05)] p-4 md:p-6">
            <ul className="space-y-2">
              {codesModule.tips.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Beginner Guide */}
      <section
        id="beginner-guide"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={
              <GraduationCap className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />
            }
            eyebrow={beginnerModule.eyebrow}
            title={beginnerModule.title}
            subtitle={beginnerModule.subtitle}
            intro={beginnerModule.intro}
          />

          <div className="scroll-reveal space-y-3 md:space-y-4">
            {beginnerModule.items.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-border bg-white/5 p-4 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:gap-4 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] md:h-12 md:w-12">
                  <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                    {step.step}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1.5 text-lg font-bold md:mb-2 md:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                  {step.controls && step.controls.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {step.controls.map((c: any, ci: number) => (
                        <span
                          key={ci}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2.5 py-1 text-xs"
                        >
                          <kbd className="font-mono font-bold text-[hsl(var(--nav-theme-light))]">
                            {c.input}
                          </kbd>
                          <span className="text-muted-foreground">{c.action}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Character Tier List */}
      <section id="character-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={<Trophy className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />}
            eyebrow={tierModule.eyebrow}
            title={tierModule.title}
            subtitle={tierModule.subtitle}
            intro={tierModule.intro}
          />

          <div className="scroll-reveal space-y-6">
            {tierModule.items.map((tier: any, index: number) => {
              const tierOpacity =
                tier.tier === "S"
                  ? "1"
                  : tier.tier === "A"
                    ? "0.8"
                    : tier.tier === "B"
                      ? "0.55"
                      : "0.4";
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-white/5 p-4 md:p-6"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-lg text-xl font-extrabold text-white"
                      style={{
                        backgroundColor: `hsl(var(--nav-theme) / ${tierOpacity})`,
                      }}
                    >
                      {tier.tier}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">Tier {tier.tier}</h3>
                      <p className="text-sm text-muted-foreground">{tier.label}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {tier.characters.map((char: any, ci: number) => (
                      <div
                        key={ci}
                        className="rounded-lg border border-border bg-white/5 p-4 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <h4 className="font-bold text-[hsl(var(--nav-theme-light))]">
                            {char.name}
                          </h4>
                          <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs">
                            {char.role}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {char.strength}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 4: Characters and Rarities */}
      <section
        id="characters-and-rarities"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={<Users className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />}
            eyebrow={charactersModule.eyebrow}
            title={charactersModule.title}
            subtitle={charactersModule.subtitle}
            intro={charactersModule.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {charactersModule.items.map((char: any, index: number) => {
              const isSystem = char.rarity === "System";
              const rarityOpacity =
                char.rarity === "Secret" || char.rarity === "Legendary"
                  ? "0.18"
                  : "0.1";
              if (isSystem) {
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.05)] p-5 md:col-span-2"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                      <h3 className="font-bold text-[hsl(var(--nav-theme-light))]">
                        {char.name}
                      </h3>
                      <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs">
                        {char.rarity}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {char.signatureFocus}
                    </p>
                    <ul className="space-y-2">
                      {char.details.map((d: string, di: number) => (
                        <li key={di} className="flex items-start gap-2">
                          <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                          <span className="text-sm text-muted-foreground">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-bold">{char.name}</h3>
                    <span
                      className="rounded-full border px-2 py-0.5 text-xs"
                      style={{
                        backgroundColor: `hsl(var(--nav-theme) / ${rarityOpacity})`,
                        borderColor: `hsl(var(--nav-theme) / ${rarityOpacity === "0.18" ? "0.4" : "0.3"})`,
                      }}
                    >
                      {char.rarity}
                    </span>
                  </div>
                  <p className="mb-1 text-xs text-muted-foreground/70">
                    Role: {char.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {char.signatureFocus}
                  </p>
                  <p className="mt-2 text-xs text-[hsl(var(--nav-theme-light))]">
                    Best for: {char.bestFor}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位: 中部移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 5: Controls and Skills Guide */}
      <section
        id="controls-and-skills-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={
              <Keyboard className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />
            }
            eyebrow={controlsModule.eyebrow}
            title={controlsModule.title}
            subtitle={controlsModule.subtitle}
            intro={controlsModule.intro}
          />

          <div className="scroll-reveal overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[hsl(var(--nav-theme)/0.1)]">
                <tr className="text-[hsl(var(--nav-theme-light))]">
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">Key</th>
                  <th className="px-4 py-3 font-semibold">Function</th>
                  <th className="px-4 py-3 font-semibold">When to Use</th>
                </tr>
              </thead>
              <tbody>
                {controlsModule.items.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t border-border align-top"
                  >
                    <td className="px-4 py-3 font-semibold">{row.action}</td>
                    <td className="px-4 py-3">
                      <kbd className="rounded border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-1 font-mono text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                        {row.desktopKey}
                      </kbd>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.function}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.matchTiming}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module 6: Goalkeeper Guide */}
      <section
        id="goalkeeper-guide"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={<Goal className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />}
            eyebrow={goalkeeperModule.eyebrow}
            title={goalkeeperModule.title}
            subtitle={goalkeeperModule.subtitle}
            intro={goalkeeperModule.intro}
          />

          <div className="scroll-reveal space-y-3 md:space-y-4">
            {goalkeeperModule.items.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 rounded-xl border border-border bg-white/5 p-4 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:gap-4 md:p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)] md:h-12 md:w-12">
                  <span className="text-base font-bold text-[hsl(var(--nav-theme-light))] md:text-xl">
                    {step.step}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1.5 text-lg font-bold md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {step.instruction}
                  </p>
                  <span className="inline-flex items-center rounded-lg border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2.5 py-1 font-mono text-xs text-[hsl(var(--nav-theme-light))]">
                    {step.keyControl}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Chemical Reactions and Combos */}
      <section
        id="chemical-reactions-and-combos"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={
              <FlaskConical className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />
            }
            eyebrow={combosModule.eyebrow}
            title={combosModule.title}
            subtitle={combosModule.subtitle}
            intro={combosModule.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {combosModule.items.map((combo: any, index: number) => {
              const featured = index === 0;
              return (
                <div
                  key={index}
                  className={`rounded-xl border p-5 md:p-6 ${
                    featured
                      ? "border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.07)] md:col-span-2"
                      : "border-border bg-white/5"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-[hsl(var(--nav-theme-light))]" />
                    <h3 className="text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                      {combo.name}
                    </h3>
                    {combo.participants.map((p: string, pi: number) => (
                      <span
                        key={pi}
                        className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                        Requirements
                      </p>
                      <ul className="space-y-1.5">
                        {combo.requirements.map((r: string, ri: number) => (
                          <li key={ri} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                            <span className="text-sm text-muted-foreground">
                              {r}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                        Activation
                      </p>
                      <ol className="space-y-1.5">
                        {combo.activation.map((a: string, ai: number) => (
                          <li key={ai} className="flex items-start gap-2">
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.2)] text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                              {ai + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {a}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <p className="text-sm">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Best use:{" "}
                      </span>
                      <span className="text-muted-foreground">{combo.bestUse}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                        Positioning:{" "}
                      </span>
                      <span className="text-muted-foreground">
                        {combo.positioning}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 8: Updates and New Characters */}
      <section
        id="updates-and-new-characters"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={
              <Newspaper className="h-7 w-7 text-[hsl(var(--nav-theme-light))]" />
            }
            eyebrow={updatesModule.eyebrow}
            title={updatesModule.title}
            subtitle={updatesModule.subtitle}
            intro={updatesModule.intro}
          />

          <div className="scroll-reveal relative space-y-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] pl-6">
            {updatesModule.items.map((entry: any, index: number) => (
              <div key={index} className="relative">
                <div className="absolute -left-[1.65rem] h-4 w-4 rounded-full border-2 border-background bg-[hsl(var(--nav-theme))]" />
                <div className="rounded-xl border border-border bg-white/5 p-5 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Clock className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
                    <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs">
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="mb-2 font-bold text-[hsl(var(--nav-theme-light))]">
                    {entry.update}
                  </h3>
                  <ul className="mb-2 space-y-1">
                    {entry.newContent.map((nc: string, nci: number) => (
                      <li key={nci} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{nc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {entry.gameplayChanges}
                  </p>
                  {entry.codes && entry.codes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.codes.map((code: string, ci: number) => (
                        <code
                          key={ci}
                          className="rounded border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-1 font-mono text-xs font-bold text-[hsl(var(--nav-theme-light))]"
                        >
                          {code}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="border-t border-border bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.roblox.com/games/77021749781226/Blue-Lock-Skibidi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.roblox}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.roblox.com/users/1350316312/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.developer}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=Gz6agTftZ1Y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Shared module header (eyebrow + icon + title + subtitle + intro)
function ModuleHeader({
  icon,
  eyebrow,
  title,
  subtitle,
  intro,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
}) {
  return (
    <div className="mb-8 text-center scroll-reveal md:mb-12">
      <span className="mb-3 inline-block rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
        {eyebrow}
      </span>
      <h2 className="mb-3 flex items-center justify-center gap-3 text-3xl font-bold md:text-5xl">
        {icon}
        <span>{title}</span>
      </h2>
      <p className="mx-auto mb-4 max-w-3xl text-base text-muted-foreground md:text-lg">
        {subtitle}
      </p>
      <p className="mx-auto max-w-3xl text-sm text-muted-foreground md:text-base">
        {intro}
      </p>
    </div>
  );
}
