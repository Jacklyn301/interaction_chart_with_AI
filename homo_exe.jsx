import { useEffect, useState } from 'react';

type Mode = 'default' | 'archive' | 'mirror';

type ArchiveTopic = {
  title: string;
  desc: string;
  color: string;
  stats: string;
  content: string;
  quote: string;
};

type Artifact = {
  emoji: string;
  label: string;
  x?: string;
  y?: string;
  delay?: string;
};

export default function HomoExeUI() {
  const [mode, setMode] = useState<Mode>('default');
  const [selectedTopic, setSelectedTopic] = useState<ArchiveTopic | null>(null);

  const [isOpeningTopic, setIsOpeningTopic] = useState(false);
  const [isClosingTopic, setIsClosingTopic] = useState(false);

  const [mirrorAnalysis, setMirrorAnalysis] = useState(
    '尚未進行人格掃描 No psychological scan detected.'
  );

  const [currentMirrorQuestion, setCurrentMirrorQuestion] = useState(0);
  const [hasAnsweredMirrorQuestion, setHasAnsweredMirrorQuestion] =
    useState(false);

  const [isMirrorTransitioning, setIsMirrorTransitioning] =
    useState(false);

  const mirrorQuestions = [
    {
      question: '如果世界上沒有人能看見你，你還會想成功嗎？',
      yes: '受試者對外部認可存在高度依附。 Subject exhibits external validation dependency.',
      no: '受試者傾向內部動機驅動。 Subject leans toward intrinsic motivation.',
    },
    {
      question: '如果沒有社群媒體，你還會記錄自己的人生嗎？',
      yes: '受試者仍保有內部敘事需求。 Internal memory preservation detected.',
      no: '外部觀察者對自我存在感影響顯著。 External audience dependency detected.',
    },
    {
      question: '如果所有人突然忘記你，你覺得自己還存在嗎？',
      yes: '主體存在感較不依賴社會記憶。 Identity stability remains resilient.',
      no: '身份認同高度建立於群體回饋。 Social reflection anchors identity.',
    },
    {
      question: '你願意用一半壽命交換永遠不再孤獨嗎？',
      yes: '依附需求高於生存延續。 Attachment priority elevated.',
      no: '受試者傾向保留自主存在。 Self-preservation priority detected.',
    },
    {
      question: '如果演算法比你更了解你自己，那「你」還剩下什麼？',
      yes: '主體對自我邊界產生動搖。 Identity boundary destabilization detected.',
      no: '受試者仍保有主觀意識核心。 Core self-perception remains active.',
    },
  ];

  const [collectedArtifacts, setCollectedArtifacts] = useState<string[]>([]);
  const [latestArtifact, setLatestArtifact] = useState(
    'No anomaly collected.'
  );

  const [floatingArtifacts, setFloatingArtifacts] = useState<Artifact[]>([]);

  const [collectingArtifact, setCollectingArtifact] = useState<string | null>(
    null
  );

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingMode, setPendingMode] = useState<Mode | null>(null);
  const [blackoutPhase, setBlackoutPhase] = useState<
    'idle' | 'entering' | 'exiting'
  >('idle');

  const archiveTopics: ArchiveTopic[] = [
    {
      title: '愛情 Love',
      desc: '愛情可能是一種演化出來的神經依附系統。',
      color: 'from-pink-500/20 to-rose-400/10',
      stats: 'Oxytocin / Attachment / Pair Bonding',
      content:
        '激情像多巴胺風暴，而依附更像長期神經鎖鏈。愛情可能既浪漫，又是一套避免人類在育幼期間逃跑的演化策略。',
      quote:
        'Love may be the most beautiful survival strategy ever evolved.',
    },
    {
      title: '宗教 Religion',
      desc: '共享神話讓陌生人得以合作。',
      color: 'from-amber-500/20 to-yellow-400/10',
      stats: 'Myth / Ritual / Coordination',
      content:
        '文明某種程度上建立於共同幻覺。共享信仰與儀式，讓數百萬陌生人能朝同一方向行動。',
      quote: 'A shared fiction can organize an empire.',
    },
    {
      title: '資本主義 Capitalism',
      desc: '現代世界的慾望引擎。',
      color: 'from-emerald-500/20 to-cyan-400/10',
      stats: 'Growth / Debt / Consumption',
      content:
        '現代經濟透過信用、廣告與未來承諾，構成了一套讓人類永遠感覺還不夠的心理循環。',
      quote: 'The economy grows by manufacturing dissatisfaction.',
    },
    {
      title: 'Social Media Systems',
      desc: '注意力已成為資源。',
      color: 'from-sky-500/20 to-indigo-400/10',
      stats: 'Attention / Dopamine / Algorithms',
      content:
        '社群媒體更像注意力採礦場。演算法透過刺激情緒與焦慮，延長人類停留時間。',
      quote:
        'If a platform is free, your nervous system is probably the product.',
    },
    {
      title: 'AI Consciousness',
      desc: '如果 AI 能模擬情緒，人類還剩下什麼？',
      color: 'from-red-500/20 to-fuchsia-400/10',
      stats: 'Simulation / Identity / Consciousness',
      content:
        '如果 AI 能理解情緒、建立人格與創作藝術，人類將不得不重新定義意識本身。',
      quote:
        'When machines imitate humanity perfectly, humanity loses monopoly over meaning.',
    },
  ];

  const artifactPool: Artifact[] = [
    { emoji: '🧠', label: '敘事認知形成' },
    { emoji: '👁️', label: '監控資本主義之眼' },
    { emoji: '🧬', label: '基因種性片段' },
    { emoji: '💊', label: '多巴胺風暴' },
    { emoji: '📡', label: '回音室效應餘波' },
  ];

  const timeline = [
    {
      title: 'Hunter Gatherers',
      message: '偵測到小型部落結構。神話形成機率偏低。',
      accent: 'from-orange-400/20 to-amber-300/10',
    },
    {
      title: 'Agricultural Revolution',
      message: '資源剩餘出現。階級文明正在形成。',
      accent: 'from-yellow-400/20 to-lime-300/10',
    },
    {
      title: 'Religious Empires',
      message: '共享神話同步率上升。大型宗教帝國正在穩定化。',
      accent: 'from-red-500/20 to-amber-400/10',
    },
    {
      title: 'Industrial Capitalism',
      message: '消費循環正在加速。資本系統開始吞噬社會。',
      accent: 'from-cyan-400/20 to-slate-400/10',
    },
    {
      title: 'Algorithmic Society',
      message: '行為預測系統已開始影響人類群體流動。',
      accent: 'from-indigo-500/20 to-cyan-400/10',
    },
    {
      title: 'AI Symbiosis',
      message: '觀察者與系統的邊界開始不穩定。',
      accent: 'from-fuchsia-500/20 to-cyan-400/10',
    },
  ];

  const [activeTimeline, setActiveTimeline] = useState(0);
  const [timelineTransition, setTimelineTransition] = useState(false);

  const [activeWorldMode, setActiveWorldMode] = useState<
    'hallucination' | 'algorithmic' | 'infection' | 'collapse' | null
  >(null);

  const [worldLayerTransition, setWorldLayerTransition] = useState(false);

  useEffect(() => {
    if (mode !== 'default') return;

    const randomized = artifactPool.map((artifact, index) => ({
      ...artifact,
      x: `${10 + Math.random() * 75}%`,
      y: `${10 + Math.random() * 70}%`,
      delay: `${index * 0.7}s`,
    }));

    setFloatingArtifacts(randomized);
  }, [mode]);

  const switchMode = (nextMode: Mode) => {
    if (isTransitioning || nextMode === mode) return;

    setPendingMode(nextMode);
    setIsTransitioning(true);
    setBlackoutPhase('entering');
  };

  const handleBlackoutTransitionEnd = () => {
    if (blackoutPhase === 'entering' && pendingMode) {
      setMode(pendingMode);
      setPendingMode(null);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBlackoutPhase('exiting');
        });
      });

      return;
    }

    if (blackoutPhase === 'exiting') {
      setBlackoutPhase('idle');
      setIsTransitioning(false);
    }
  };

  const openTopic = (topic: ArchiveTopic) => {
    setSelectedTopic(topic);
    setIsOpeningTopic(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpeningTopic(false);
      });
    });
  };

  const closeTopic = () => {
    setIsClosingTopic(true);

    setTimeout(() => {
      setSelectedTopic(null);
      setIsClosingTopic(false);
    }, 420);
  };

  const nextMirrorQuestion = () => {
    setIsMirrorTransitioning(true);

    setTimeout(() => {
      setCurrentMirrorQuestion((prev) =>
        prev === mirrorQuestions.length - 1 ? 0 : prev + 1
      );

      setMirrorAnalysis(
        '等待下一次人格掃描 Awaiting next psychological response.'
      );

      setHasAnsweredMirrorQuestion(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMirrorTransitioning(false);
        });
      });
    }, 420);
  };

  const collectArtifact = (artifact: Artifact) => {
    if (collectedArtifacts.includes(artifact.label)) return;

    setCollectingArtifact(artifact.label);

    setTimeout(() => {
      setCollectedArtifacts((prev) => [...prev, artifact.label]);
      setLatestArtifact(`${artifact.emoji} archived: ${artifact.label}`);

      setTimeout(() => {
        setCollectingArtifact(null);
      }, 180);
    }, 420);
  };

  const activateTimeline = (index: number) => {
    setTimelineTransition(true);

    setTimeout(() => {
      setActiveTimeline(index);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimelineTransition(false);
        });
      });
    }, 420);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        onTransitionEnd={handleBlackoutTransitionEnd}
        className={`pointer-events-none fixed inset-0 z-[999] bg-black transition-opacity duration-500 ${
          blackoutPhase === 'entering' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <style>{`
        @keyframes floatArtifact {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }

        @keyframes artifactCollect {
          0% {
            transform: scale(1);
            opacity: 1;
            filter: drop-shadow(0 0 0px rgba(34,211,238,0));
          }

          40% {
            transform: scale(1.8);
            opacity: 1;
            filter: drop-shadow(0 0 24px rgba(34,211,238,1));
          }

          100% {
            transform: scale(0);
            opacity: 0;
            filter: drop-shadow(0 0 60px rgba(34,211,238,1));
          }
        }

        @keyframes artifactPulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }

        @keyframes timelineWave {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }

        @keyframes scanSweep {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }

        @keyframes civilizationBreath {
          0% {
            box-shadow: 0 0 0px rgba(34,211,238,0);
          }

          50% {
            box-shadow:
              0 0 32px rgba(34,211,238,0.22),
              inset 0 0 24px rgba(255,255,255,0.04);
          }

          100% {
            box-shadow: 0 0 0px rgba(34,211,238,0);
          }
        }

        @keyframes nodePulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.35);
          }

          100% {
            transform: scale(1);
          }
        }

        @keyframes civilizationShift {
          0% {
            filter: brightness(1);
          }

          50% {
            filter:
              brightness(1.35)
              saturate(1.4)
              blur(2px);
          }

          100% {
            filter: brightness(1);
          }
        }

        @keyframes infectionFlicker {
          0% {
            opacity: 0.35;
            filter: brightness(1);
          }

          50% {
            opacity: 0.92;
            filter:
              brightness(1.8)
              drop-shadow(0 0 24px rgba(255,0,80,1));
          }

          100% {
            opacity: 0.35;
            filter: brightness(1);
          }
        }

        @keyframes infectionDrift {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes collapsePulse {
          0% {
            opacity: 0.28;
            filter: blur(0px);
          }

          50% {
            opacity: 0.95;
            filter:
              blur(1px)
              drop-shadow(0 0 18px rgba(255,255,255,0.9));
          }

          100% {
            opacity: 0.28;
            filter: blur(0px);
          }
        }
      `}</style>

      <div
        data-world-mode={activeWorldMode || 'default'}
        className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          activeWorldMode === 'algorithmic'
            ? 'tracking-[0.08em] brightness-125 saturate-150'
            : ''
        } ${
          activeWorldMode === 'collapse'
            ? 'contrast-50 saturate-0 blur-[2px] scale-[1.01]'
            : ''
        }`}
      >
        <img
          src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2070&auto=format&fit=crop"
          alt="Default"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            mode === 'default'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110 blur-md'
          }`}
        />

        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop"
          alt="Archive"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            mode === 'archive'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110 blur-md'
          }`}
        />

        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            mode === 'mirror'
              ? 'bg-red-950 opacity-100'
              : 'bg-red-950 opacity-0'
          }`}
        />

        <div
          className={`absolute inset-0 transition-all duration-700 bg-gradient-to-br ${timeline[activeTimeline].accent} ${
            timelineTransition ? 'opacity-80 blur-xl scale-110' : 'opacity-40'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80" />

        <div
          className={`pointer-events-none absolute inset-0 z-[120] transition-all duration-700 ${
            worldLayerTransition
              ? 'opacity-0 scale-110 blur-xl'
              : 'opacity-100 scale-100 blur-0'
          }`}
        >

        {activeWorldMode === 'algorithmic' && (
          <>
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70 mix-blend-screen">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.14)_1px,transparent_1px)] bg-[size:100%_5px] animate-pulse" />
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-[8%] top-[12%] rounded-full border border-cyan-300/40 bg-cyan-400/10 px-6 py-3 text-xs uppercase tracking-[0.35em] text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-md">
                Behavioral Prediction Active
              </div>

              <div className="absolute right-[10%] top-[28%] h-32 w-32 rounded-full border border-cyan-300/30 shadow-[0_0_60px_rgba(34,211,238,0.25)] animate-ping" />

              <div className="absolute bottom-[14%] left-[12%] text-cyan-200/70 text-sm tracking-[0.4em] uppercase">
                PATTERN DETECTED
              </div>
            </div>
          </>
        )}

        {activeWorldMode === 'hallucination' && (
          <div className="pointer-events-none absolute inset-0 bg-yellow-300/20 mix-blend-screen backdrop-blur-[2px] transition-all duration-1000" />
        )}

        {activeWorldMode === 'infection' && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-red-500/25 mix-blend-screen backdrop-blur-[1px]" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,80,0.22),transparent_70%)]" />

            <div
              className="pointer-events-none absolute inset-0 z-[140] text-center text-[8rem] font-black tracking-[0.22em] text-[#ff2b6e] mix-blend-screen"
              style={{
                animation:
                  'infectionFlicker 1.6s ease-in-out infinite, infectionDrift 6s ease-in-out infinite'
              }}
            >
              <div className="absolute left-[8%] top-[10%] rotate-[-10deg] [text-shadow:0_0_24px_rgba(255,0,90,1),0_0_80px_rgba(255,0,90,0.9)]">
                WORK HARDER
              </div>

              <div className="absolute right-[5%] top-[36%] rotate-[7deg] [text-shadow:0_0_24px_rgba(255,0,90,1),0_0_80px_rgba(255,0,90,0.9)]">
                BECOME MORE
              </div>

              <div className="absolute bottom-[12%] left-[14%] rotate-[-3deg] [text-shadow:0_0_24px_rgba(255,0,90,1),0_0_80px_rgba(255,0,90,0.9)]">
                REST IS FAILURE
              </div>
            </div>
          </>
        )}

        {activeWorldMode === 'collapse' && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-8xl font-black tracking-[0.12em] text-white/70 mix-blend-screen backdrop-blur-[2px] [text-shadow:0_0_18px_rgba(255,255,255,0.95),0_0_60px_rgba(255,255,255,0.45)]"
            style={{ animation: 'collapsePulse 4s ease-in-out infinite' }}
          >
            Who are you without labels?
          </div>
        )}
        </div>
      </div>

      {mode === 'default' && (
        <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          {floatingArtifacts.map((artifact) => {
            const collected = collectedArtifacts.includes(artifact.label);

            return (
              <button
                key={artifact.label}
                onClick={() => collectArtifact(artifact)}
                className={`absolute pointer-events-auto transition-all duration-500 hover:scale-[1.35] ${
                  collected ? 'opacity-0 scale-50' : 'opacity-100'
                }`}
                style={{
                  left: artifact.x,
                  top: artifact.y,
                  animation:
                    collectingArtifact === artifact.label
                      ? 'artifactCollect 0.5s ease forwards'
                      : 'floatArtifact 7s ease-in-out infinite',
                  animationDelay:
                    collectingArtifact === artifact.label
                      ? '0s'
                      : artifact.delay,
                }}
              >
                <div
                  className={`text-4xl transition-all duration-300 hover:scale-[1.25] hover:[filter:drop-shadow(0_0_12px_rgba(255,255,255,1))_drop-shadow(0_0_24px_rgba(34,211,238,1))_drop-shadow(0_0_48px_rgba(34,211,238,1))] ${
                    collectingArtifact === artifact.label
                      ? 'brightness-150'
                      : 'animate-[artifactPulse_3s_ease-in-out_infinite]'
                  }`}
                >
                  {artifact.emoji}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedTopic && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-end bg-black/40 px-8 py-10 backdrop-blur-sm transition-all duration-500 ${
            isOpeningTopic || isClosingTopic
              ? 'opacity-0'
              : 'opacity-100'
          }`}
          onClick={closeTopic}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950/90 shadow-2xl shadow-cyan-500/20 transition-all duration-500 ${
              isOpeningTopic || isClosingTopic
                ? 'translate-x-12 scale-[0.96] opacity-0'
                : 'translate-x-0 scale-100 opacity-100'
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${selectedTopic.color} opacity-30`}
            />

            <div className="relative z-10 p-8">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
                    ARCHIVE ENTRY
                  </div>

                  <h2 className="text-3xl font-black md:text-5xl">
                    {selectedTopic.title}
                  </h2>
                </div>

                <button
                  onClick={closeTopic}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10"
                >
                  CLOSE
                </button>
              </div>

              <div className="mb-5 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
                  系統分析時間
                </div>

                <div className="mb-3 text-sm text-cyan-100">
                  {selectedTopic.stats}
                </div>

                <p className="leading-relaxed text-neutral-200">
                  {selectedTopic.content}
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5 italic text-neutral-300">
                {selectedTopic.quote}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-[50]">
        {mode === 'default' && (
          <div className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <div className="grid min-h-[70vh] items-center gap-16 lg:grid-cols-2">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-300 backdrop-blur-sm">
                    認知模擬介面 Cognitive Simulation Interface
                  </div>

                  <h1 className={`text-5xl font-black leading-none transition-all duration-1000 md:text-7xl ${
                    activeWorldMode === 'collapse'
                      ? 'opacity-40 blur-[3px] tracking-[0.2em]'
                      : activeWorldMode === 'algorithmic'
                        ? 'tracking-[0.08em]'
                        : ''
                  }`}>
                    HOMO.EXE
                  </h1>

                  <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">
                    探索塑造人類文明的無形系統
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => switchMode('archive')}
                      className="rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:scale-105"
                    >
                      進入檔案庫<br/>enter archive
                    </button>

                    <button
                      onClick={() => switchMode('mirror')}
                      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10"
                    >
                      鏡像測試<br/>mirror test
                    </button>
                  </div>
                </div>

                <div className="relative flex h-[500px] items-center justify-center">
                  <div className="relative w-[340px] rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                    <div className="mb-6 flex items-center justify-between text-xs text-neutral-400">
                      <span>SUBJECT #042</span>
                      <span>觀察模式</span>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-cyan-100">
                      <div className="text-lg font-semibold">
                        {collectedArtifacts.length}/5 Collected
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {artifactPool.map((artifact) => {
                          const collected = collectedArtifacts.includes(
                            artifact.label
                          );

                          return (
                            <div
                              key={artifact.label}
                              className={`flex h-12 items-center justify-center rounded-2xl border ${
                                collected
                                  ? 'border-cyan-300/50 bg-cyan-400/15'
                                  : 'border-white/10 bg-black/20 opacity-40'
                              }`}
                            >
                              <span className="text-2xl">
                                {artifact.emoji}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="rounded-2xl border border-cyan-400/10 bg-black/30 p-3 text-sm text-cyan-100">
                        {latestArtifact}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    key: 'hallucination',
                    title: 'Collective Hallucination',
                    desc: '共同的信念建構現實世界',
                  },
                  {
                    key: 'algorithmic',
                    title: 'Algorithmic Humanity',
                    desc: '行為漸漸向預測的系統轉變',
                  },
                  {
                    key: 'infection',
                    title: 'Narrative Infection',
                    desc: '文明傳播的是敘述',
                  },
                  {
                    key: 'collapse',
                    title: 'Identity Collapse',
                    desc: '敘事的標籤融於抽象之中',
                  },
                ].map((card) => {
                  const active = activeWorldMode === card.key;

                  return (
                    <button
                      key={card.key}
                      onClick={() => {
                        setWorldLayerTransition(true);

                        setTimeout(() => {
                          setActiveWorldMode((prev) =>
                            prev === card.key
                              ? null
                              : (card.key as
                                  | 'hallucination'
                                  | 'algorithmic'
                                  | 'infection'
                                  | 'collapse')
                          );

                          requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                              setWorldLayerTransition(false);
                            });
                          });
                        }, 320);
                      }}
                      className={`group relative overflow-hidden rounded-[2rem] border p-6 text-left backdrop-blur-md transition-all duration-500 ${
                        active
                          ? 'border-cyan-300/60 bg-cyan-400/20 shadow-[0_0_64px_rgba(34,211,238,0.35)] scale-[1.03]'
                          : 'border-white/10 bg-white/[0.03] hover:-translate-y-3 hover:scale-[1.02] hover:border-cyan-400/40 hover:bg-cyan-400/[0.08] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                      } ${
                        activeWorldMode === 'collapse'
                          ? 'blur-[1px] opacity-70'
                          : ''
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>

                      <div className="relative z-10">
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="text-lg font-semibold transition-all duration-300 group-hover:tracking-[0.08em]">
                            {card.title}
                          </div>

                          <div
                            className={`h-3 w-3 rounded-full transition-all duration-500 ${
                              active
                                ? 'bg-cyan-300 scale-[1.6] shadow-[0_0_28px_rgba(34,211,238,1)]'
                                : 'bg-white/20'
                            }`}
                          />
                        </div>

                        <p className="text-sm leading-relaxed text-neutral-400 transition-all duration-300 group-hover:text-neutral-200">
                          {card.desc}
                        </p>

                        <div
                          className={`grid transition-all duration-500 ${
                            active
                              ? 'mt-5 grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="rounded-2xl border border-cyan-400/10 bg-black/30 p-4 text-sm text-cyan-100">
                              System contamination active. Reality layer modified.
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-24 border-t border-white/10 pt-16">
                <div className="relative space-y-10 border-l border-white/10 pl-8">
                  <div
                    className="pointer-events-none absolute left-0 top-0 w-[2px] origin-top bg-cyan-300/70"
                    style={{
                      height: '100%',
                      animation: timelineTransition
                        ? 'timelineWave 0.7s ease'
                        : undefined,
                    }}
                  />

                  {timeline.map((item, idx) => (
                    <button
                      key={item.title}
                      onClick={() => activateTimeline(idx)}
                      className="group relative block w-full text-left"
                    >
                      <div
                        className={`absolute -left-[41px] top-5 h-4 w-4 rounded-full transition-all duration-500 ${
                          activeTimeline === idx
                            ? 'scale-[1.6] bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,1)] animate-[nodePulse_2s_ease-in-out_infinite]'
                            : 'bg-cyan-300/60 group-hover:scale-[1.35]'
                        }`}
                      />

                      <div
                        className={`relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
                          activeTimeline === idx
                            ? 'border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.15)] animate-[civilizationBreath_3s_ease-in-out_infinite]'
                            : 'border-white/10 bg-white/[0.03] group-hover:translate-x-2 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.05]'
                        } ${
                          timelineTransition && activeTimeline === idx
                            ? 'scale-[1.04] brightness-125 animate-[civilizationShift_0.7s_ease]'
                            : ''
                        }`}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                            animation: 'scanSweep 1.2s ease',
                          }}
                        />

                        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500 group-hover:text-cyan-200">
                          STAGE {String(idx + 1).padStart(2, '0')}
                        </div>

                        <div className="mb-2 text-2xl font-semibold transition-all duration-300 group-hover:tracking-[0.08em]">
                          {item.title}
                        </div>

                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            activeTimeline === idx
                              ? 'grid-rows-[1fr] opacity-100 mt-4'
                              : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={`rounded-2xl border border-cyan-400/10 bg-black/30 p-4 text-sm leading-relaxed text-cyan-100 transition-all duration-500 ${
                                activeTimeline === idx
                                  ? 'translate-y-0 blur-0'
                                  : '-translate-y-4 blur-md'
                              }`}
                            >
                              <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-cyan-300/70">
                                文明狀態 Civilization Status
                              </div>

                              {item.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'archive' && (
          <div className="min-h-screen px-6 py-20">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 flex items-center justify-between">
                <h1 className="text-5xl font-black">Human Civilization Modules</h1>

                <button
                  onClick={() => switchMode('default')}
                  className="rounded-2xl border border-white/10 bg-black/30 px-6 py-3 hover:bg-white/10"
                >
                  Return
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {archiveTopics.map((topic) => (
                  <button
                    key={topic.title}
                    onClick={() => openTopic(topic)}
                    className="rounded-[2rem] border border-cyan-400/20 bg-cyan-400/5 p-6 text-left hover:bg-cyan-400/10"
                  >
                    <div className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                      MODULE
                    </div>

                    <h3 className="mb-3 text-lg font-bold">
                      {topic.title}
                    </h3>

                    <p className="text-sm text-neutral-300">
                      {topic.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode === 'mirror' && (
          <div className="flex min-h-screen items-center justify-center px-6 py-20">
            <div className="w-full max-w-4xl rounded-[2rem] border border-red-400/20 bg-red-500/5 p-10 backdrop-blur-md">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-red-300">
                    Psychological Reflection Interface
                  </p>

                  <h1 className="text-4xl font-black md:text-6xl">
                    Mirror Test
                  </h1>
                </div>

                <button
                  onClick={() => switchMode('default')}
                  className="rounded-2xl border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-sm hover:bg-white/10"
                >
                  Return
                </button>
              </div>

              <div
                className={`rounded-[2rem] border border-red-400/20 bg-black/30 p-8 transition-all duration-500 ${
                  isMirrorTransitioning
                    ? 'translate-y-6 scale-[0.97] opacity-0 blur-md'
                    : 'translate-y-0 scale-100 opacity-100 blur-0'
                }`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-red-300/70">
                    Psychological Probe #{String(currentMirrorQuestion + 1).padStart(2, '0')}
                  </div>

                  <div className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs text-red-200">
                    {currentMirrorQuestion + 1} / {mirrorQuestions.length}
                  </div>
                </div>

                <h2 className="mb-8 text-2xl font-black leading-tight md:text-4xl">
                  {mirrorQuestions[currentMirrorQuestion].question}
                </h2>

                <div className="mb-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setMirrorAnalysis(
                        mirrorQuestions[currentMirrorQuestion].yes
                      );
                      setHasAnsweredMirrorQuestion(true);
                    }}
                    className="rounded-2xl border border-red-400/30 bg-red-500/20 px-6 py-3 hover:bg-red-500/30"
                  >
                    Yes
                  </button>

                  <button
                    onClick={() => {
                      setMirrorAnalysis(
                        mirrorQuestions[currentMirrorQuestion].no
                      );
                      setHasAnsweredMirrorQuestion(true);
                    }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 hover:bg-white/10"
                  >
                    No
                  </button>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-black/40 p-6 text-lg leading-relaxed text-neutral-300 backdrop-blur-md">
                  <div className="mb-3 text-xs uppercase tracking-[0.25em] text-red-300/60">
                    SYSTEM ANALYSIS
                  </div>

                  {mirrorAnalysis}
                </div>

                {hasAnsweredMirrorQuestion && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => nextMirrorQuestion()}
                      className="rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-3 text-sm uppercase tracking-[0.2em] text-red-100 hover:bg-red-500/20"
                    >
                      Next Question →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
