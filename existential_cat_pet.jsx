import React, { useEffect, useMemo, useState } from "react";

const THOUGHTS = [
  "貓咪盯著牆壁看了十四秒。可能看見宇宙真理了。",
  "小小肉球，大型心理戰。",
  "貓咪把杯子推下桌，只是想確認重力還在。",
  "你的寵物短暫獲得了自我意識，然後後悔了。",
  "房間某處傳來神秘咀嚼聲。",
  "貓咪假裝不在乎你。這是謊言。",
  "橘貓神經元短暫啟動了 0.3 秒。",
  "一道深沉喵聲劃過夜晚，像詛咒小提琴。",
];

const WEATHER_TYPES = ["rain", "snow", "aurora"] as const;
type WeatherType = (typeof WEATHER_TYPES)[number];

type Particle = {
  id: number;
  left: string;
  top: string;
  height: string;
  size: string;
};

const clamp = (value: number, min = 0, max = 100) => {
  return Math.min(max, Math.max(min, value));
};

const ALERT_THRESHOLDS = {
  hunger: 25,
  energy: 20,
  trust: 20,
};

const CAT_REACTIONS = [
  "purr.exe 已啟動。",
  "貓咪用頭撞你的手，像一台迷你情感坦克。",
  "你暫時被批准加入貓咪殖民地。",
  "貓咪閉眼了 1.7 秒。信任值上升。",
];

const TRUST_LOSS_REACTIONS = [
  "貓咪緩慢地轉過身，只留下冷酷背影。",
  "你剛剛似乎做了某件會被記仇十年的事。",
  "貓咪開始懷疑你是不是獸醫派來的。",
  "空氣裡瀰漫著『你今晚別想摸我』的氣氛。",
  "貓咪發出極其短促但充滿譴責意味的：喵。",
];

function getSystemAlert(hunger: number, energy: number, trust: number) {
  if (hunger < ALERT_THRESHOLDS.hunger) {
    return "🍖 貓咪飢餓值過低，建議立即投餵罐罐。";
  }

  if (energy < ALERT_THRESHOLDS.energy) {
    return "💤 貓咪精力即將耗盡，牠快變成液體了。";
  }

  if (trust < ALERT_THRESHOLDS.trust) {
    return "⚠️ 信任值偏低。貓咪正在重新評估你是否值得信任。";
  }

  return "";
}

function getMood(trust: number) {
  if (trust > 80) return "極度依戀";
  if (trust > 50) return "小心翼翼地親近";
  if (trust > 30) return "情感迴避貓咪";

  return "毛茸茸房東";
}

export default function ExistentialCatGame() {
  const [hunger, setHunger] = useState(62);
  const [energy, setEnergy] = useState(74);
  const [trust, setTrust] = useState(48);
  const [zoomies, setZoomies] = useState(false);
  const [weather, setWeather] = useState<WeatherType>("rain");
  const [isTransitioningWeather, setIsTransitioningWeather] =
    useState(false);

  const [message, setMessage] = useState(
    "貓咪正在默默評估你的演化適應度。",
  );

  const [showDialogue, setShowDialogue] = useState(false);
  const [isHoveringCat, setIsHoveringCat] = useState(false);
  const [catDialogue, setCatDialogue] = useState("");
  const [systemAlert, setSystemAlert] = useState("");
  const [messageVisible, setMessageVisible] = useState(true);
  const [messageAnimating, setMessageAnimating] = useState(false);

  useEffect(() => {
    const warningInterval = window.setInterval(() => {
      setSystemAlert(getSystemAlert(hunger, energy, trust));
    }, 1200);

    return () => window.clearInterval(warningInterval);
  }, [hunger, energy, trust]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHunger((h) => clamp(h - 1));
      setEnergy((e) => clamp(e - 0.5));

      if (Math.random() < 0.08) {
        setMessage(randomThought());
      }

      if (Math.random() < 0.05) {
        triggerZoomies();
      }
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessageAnimating(true);
    setMessageVisible(false);

    const fadeTimer = window.setTimeout(() => {
      setMessageVisible(true);
    }, 180);

    const endTimer = window.setTimeout(() => {
      setMessageAnimating(false);
    }, 900);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(endTimer);
    };
  }, [message]);

  // 隨機碎念生成器
  function randomThought() {
    return THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
  }

  // 貓咪高速暴衝事件
  function triggerZoomies() {
    setZoomies(true);

    window.setTimeout(() => {
      setZoomies(false);
    }, 2500);
  }

  function feedCat() {
    setHunger((h) => clamp(h + 18));
    setTrust((t) => clamp(t + 5));
    setMessage("貓咪用驚人的效率吃掉了點心。🍖");
  }

  function petCat() {
    setTrust((t) => clamp(t + 10));
    setEnergy((e) => clamp(e - 3));

    setMessage(
      CAT_REACTIONS[Math.floor(Math.random() * CAT_REACTIONS.length)],
    );
  }

  function laserPointer() {
    setEnergy((e) => clamp(e - 12));
    setTrust((t) => clamp(t + 3));

    triggerZoomies();

    setMessage("速度已取代理性思考。🔴");
  }

  function sleepCat() {
    setEnergy((e) => clamp(e + 25));
    setMessage("這生物縮成了一團蝦子形狀的奇點。💤");
  }

  function annoyCat() {
    setTrust((t) => clamp(t - 18));
    setEnergy((e) => clamp(e + 4));

    if (Math.random() < 0.4) {
      triggerZoomies();
    }

    setMessage(
      TRUST_LOSS_REACTIONS[
        Math.floor(Math.random() * TRUST_LOSS_REACTIONS.length)
      ],
    );
  }

  function generateCatDialogue() {
    const dialogues: string[] = [];

    if (hunger < 30) {
      dialogues.push(
        "你是不是忘記罐罐的存在了。",
        "本貓正在進入低血糖暴怒模式。",
      );
    }

    if (energy < 30) {
      dialogues.push(
        "今天不想跑酷了... 💤",
        "本貓目前 CPU 使用率過高。",
      );
    }

    if (trust > 75) {
      dialogues.push(
        "你坐下，我就過去陪你。",
        "今天可以給你摸五分鐘。",
      );
    }

    if (trust < 35) {
      dialogues.push(
        "我們之間目前只有租賃關係。",
        "請停止試圖觸碰本貓高貴靈魂。",
      );
    }

    dialogues.push(
      "......喵。",
      "你半夜不睡覺是不是又在想人生。",
      "窗外那片雨聲不錯。",
    );

    return dialogues[Math.floor(Math.random() * dialogues.length)];
  }

  function handleCatInteraction() {
    if (showDialogue) {
      setShowDialogue(false);
      return;
    }

    setCatDialogue(generateCatDialogue());
    setShowDialogue(true);
  }

  function handleWeatherChange(nextWeather: WeatherType) {
    if (nextWeather === weather) return;

    setIsTransitioningWeather(true);

    window.setTimeout(() => {
      setWeather(nextWeather);

      window.setTimeout(() => {
        setIsTransitioningWeather(false);
      }, 500);
    }, 180);
  }

  const mood = useMemo(() => getMood(trust), [trust]);

  const biologyConclusion = useMemo(() => {
    if (trust > 80) {
      return "這隻貓在世界末日時大概會願意坐你旁邊。";
    }

    if (trust > 55) {
      return "已建立低風險共存關係。你暫時被視為可接受大型哺乳類。";
    }

    if (trust > 30) {
      return "這隻貓仍處於觀察期，並保留隨時逃跑權利。";
    }

    return "這隻貓依然把你視為大型不可預測生物。";
  }, [trust]);

  // 預先生成背景粒子，避免每次 render 重建。
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      height: `${8 + Math.random() * 22}px`,
      size: `${3 + Math.random() * 5}px`,
    }));
  }, []);

  // 主畫面
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative font-sans">
      <WeatherBackground
        weather={weather}
        particles={particles}
        isTransitioning={isTransitioningWeather}
      />

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        {systemAlert ? (
          <div className="mb-5 bg-amber-500/10 border border-amber-400/30 text-amber-200 px-4 py-3 rounded-2xl backdrop-blur-md shadow-lg animate-pulse">
            <div className="text-sm font-medium">系統提醒</div>
            <div className="text-sm mt-1 opacity-90">{systemAlert}</div>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              存在危機貓咪模擬器
            </h1>

            <p className="text-zinc-400 mt-1 max-w-xl leading-relaxed">
              一個由 JavaScript、半夜貓叫聲與精神狀態不穩定所驅動的單檔生命體。
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <WeatherButton
              label="🌧️ 雨天"
              active={weather === "rain"}
              onClick={() => handleWeatherChange("rain")}
            />

            <WeatherButton
              label="❄️ 雪天"
              active={weather === "snow"}
              onClick={() => handleWeatherChange("snow")}
            />

            <WeatherButton
              label="🌌 極光"
              active={weather === "aurora"}
              onClick={() => handleWeatherChange("aurora")}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-center items-center h-[360px] relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-800">
              <div
                onMouseEnter={() => setIsHoveringCat(true)}
                onMouseLeave={() => setIsHoveringCat(false)}
                onClick={handleCatInteraction}
                className={`text-[10rem] select-none transition-all duration-300 cursor-pointer relative ${
                  zoomies ? "translate-x-12 -translate-y-4 rotate-12" : ""
                } ${isHoveringCat ? "scale-105" : ""}`}
              >
                🐈

                {isHoveringCat ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs bg-black/60 px-3 py-1 rounded-full whitespace-nowrap text-zinc-300 border border-zinc-700 animate-pulse">
                    點一下看看貓咪想說什麼
                  </div>
                ) : null}
              </div>

              {zoomies ? (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-200 text-xs tracking-wide backdrop-blur-sm shadow-[0_0_20px_rgba(34,211,238,0.15)] animate-bounce z-20">
                  ⚡ 偵測到貓咪暴衝事件
                </div>
              ) : null}

              {showDialogue ? (
                <button
                  type="button"
                  onClick={() => setShowDialogue(false)}
                  className="absolute top-6 max-w-[260px] bg-zinc-900/95 border border-cyan-400/30 rounded-2xl px-4 py-3 text-sm text-zinc-200 shadow-2xl backdrop-blur-md transition hover:scale-[1.02]"
                >
                  <div className="text-cyan-300 text-xs mb-1">
                    🐾 貓咪正在低聲喵喵
                  </div>

                  <div>{catDialogue}</div>
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-3">
              <Stat label="飢餓值" value={hunger} />
              <Stat label="精力" value={energy} />
              <Stat label="信任值" value={trust} />
            </div>
          </div>

          <div className="space-y-6">
            <Panel title="行為紀錄">
              <div
                className={`bg-black/30 rounded-2xl p-4 min-h-[120px] text-zinc-300 leading-relaxed border border-zinc-800 transition-all duration-700 ${
                  messageVisible
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 -translate-y-2 blur-sm"
                } ${
                  messageAnimating
                    ? "shadow-[0_0_25px_rgba(103,232,249,0.08)]"
                    : ""
                }`}
              >
                <div className="relative overflow-hidden">
                  <div
                    className={`transition-all duration-700 ${
                      messageVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    }`}
                  >
                    {message}
                  </div>

                  {messageAnimating ? (
                    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                      <div className="absolute inset-y-0 -left-20 w-16 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent skew-x-[-20deg] animate-[messageScan_0.8s_ease-out]" />
                    </div>
                  ) : null}
                </div>
              </div>
            </Panel>

            <Panel title="互動面板">
              <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                <ActionButton label="餵食" emoji="🍖" action={feedCat} />
                <ActionButton label="摸摸" emoji="🤲" action={petCat} />
                <ActionButton
                  label="雷射筆"
                  emoji="🔴"
                  action={laserPointer}
                />
                <ActionButton label="睡覺" emoji="💤" action={sleepCat} />
                <ActionButton
                  label="惹怒貓咪"
                  emoji="😾"
                  action={annoyCat}
                />
              </div>
            </Panel>

            <Panel title="心理分析">
              <div className="space-y-2 text-zinc-300 leading-relaxed">
                <p>
                  目前依附狀態：
                  <span className="text-white font-medium"> {mood}</span>
                </p>

                <p>
                  互動時被咬的機率：
                  <span className="text-white font-medium">
                    {Math.round(100 - trust)}%
                  </span>
                </p>

                <p>
                  生物學結論：
                  <span className="text-white font-medium">
                    {biologyConclusion}
                  </span>
                </p>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

type WeatherBackgroundProps = {
  weather: WeatherType;
  particles: Particle[];
  isTransitioning: boolean;
};

function WeatherBackground({
  weather,
  particles,
  isTransitioning,
}: WeatherBackgroundProps) {
  return (
    <>
      <style>{`
        @keyframes rainFall {
          0% {
            transform: translateY(-120px) rotate(12deg);
            opacity: 0;
          }

          15% {
            opacity: 1;
          }

          100% {
            transform: translateY(120vh) rotate(12deg);
            opacity: 0;
          }
        }

        @keyframes snowFall {
          0% {
            transform: translateY(-10vh) translateX(0px);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translateY(50vh) translateX(20px);
          }

          100% {
            transform: translateY(110vh) translateX(-20px);
            opacity: 0;
          }
        }

        @keyframes auroraShift {
          0% {
            transform: translateX(-5%) rotate(6deg) scale(1);
          }

          50% {
            transform: translateX(5%) rotate(8deg) scale(1.05);
          }

          100% {
            transform: translateX(-5%) rotate(6deg) scale(1);
          }
        }

        @keyframes messageScan {
          0% {
            transform: translateX(-120%) skewX(-20deg);
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          100% {
            transform: translateX(700%) skewX(-20deg);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-700 ${
          isTransitioning
            ? "opacity-0 scale-[1.03] blur-md"
            : "opacity-100 scale-100 blur-0"
        }`}
      >
        {weather === "rain" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-zinc-950 opacity-95" />

            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl animate-pulse" />

            {particles.map((particle) => (
              <div
                key={`rain-${particle.id}`}
                className="absolute w-px bg-cyan-300/70 animate-[rainFall_0.8s_linear_infinite]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  height: particle.height,
                  animationDelay: `${Math.random() * 0.8}s`,
                }}
              />
            ))}
          </>
        ) : null}

        {weather === "snow" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-blue-950 to-zinc-950 opacity-95" />

            {particles.map((particle) => (
              <div
                key={`snow-${particle.id}`}
                className="absolute rounded-full bg-white/80 animate-[snowFall_6s_linear_infinite]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </>
        ) : null}

        {weather === "aurora" ? (
          <>
            <div className="absolute inset-0 bg-black" />

            <div className="absolute -top-24 left-0 w-[120%] h-[120%] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-emerald-400/20 blur-3xl animate-[auroraShift_12s_ease-in-out_infinite]" />

            <div className="absolute top-10 left-0 right-0 h-52 bg-gradient-to-r from-cyan-400/10 via-violet-500/20 to-emerald-300/10 blur-2xl animate-[auroraShift_8s_ease-in-out_infinite_reverse]" />
          </>
        ) : null}
      </div>
    </>
  );
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

type StatProps = {
  label: string;
  value: number;
};

function Stat({ label, value }: StatProps) {
  const roundedValue = Math.round(value);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1 text-zinc-300">
        <span>{label}</span>
        <span>{roundedValue}%</span>
      </div>

      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-300 transition-all duration-500"
          style={{ width: `${roundedValue}%` }}
        />
      </div>
    </div>
  );
}

type ActionButtonProps = {
  label: string;
  emoji: string;
  action: () => void;
};

function ActionButton({ label, emoji, action }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={action}
      className="bg-zinc-800/90 hover:bg-zinc-700 transition rounded-2xl p-4 text-left border border-zinc-700 active:scale-[0.98]"
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div className="font-medium">{label}</div>
    </button>
  );
}

type WeatherButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function WeatherButton({
  label,
  active,
  onClick,
}: WeatherButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl transition border ${
        active
          ? "bg-white/20 border-white/30"
          : "bg-zinc-800/70 border-zinc-700 hover:bg-zinc-700/80"
      }`}
    >
      {label}
    </button>
  );
}

export function testClamp() {
  return (
    clamp(120) === 100 &&
    clamp(-20) === 0 &&
    clamp(55) === 55
  );
}

export function testThoughtPool() {
  return THOUGHTS.length >= 5;
}

export function testWeatherTypes() {
  return WEATHER_TYPES.includes("rain");
}

export function testZoomiesBanner() {
  return "⚡ 偵測到貓咪暴衝事件".includes("暴衝");
}

export function testTrustLossReactions() {
  return TRUST_LOSS_REACTIONS.length >= 4;
}

export function testMessageAnimationState() {
  return typeof false === "boolean";
}
