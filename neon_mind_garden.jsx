import { useState, useEffect, useRef } from "react";

export default function NeonMindGarden() {
  const [selectedThought, setSelectedThought] = useState(null);
  const [weirdMode, setWeirdMode] = useState(false);
  const [reactorPower, setReactorPower] = useState(91);
  const [bioKnowledge, setBioKnowledge] = useState(84);
  const [messages, setMessages] = useState([
    "Neural activity stable.",
    "Caffeine reserves acceptable.",
    "Reality coherence questionable."
  ]);

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [thoughtCreatures, setThoughtCreatures] = useState([]);

  const terminalRef = useRef(null);

  const philosophyQuotes = [
    {
      quote: "「人類神經系統本質上就是一團假裝情緒穩定的潮濕電子義大利麵。」",
      desc: "恭喜，你已抵達本網站的哲學地下室。由於某人忘記調節血糖，目前沒有零食供應。"
    },
    {
      quote: "「焦慮有時只是大腦把生存機制開到 debug mode。」",
      desc: "系統偵測到過量的未來模擬。建議停止在凌晨兩點推演十年後的人生。"
    },
    {
      quote: "「睡眠不足會讓靈魂看起來像被拿去微波過。」",
      desc: "REM 週期目前下落不明。若發現請歸還神經系統。"
    },
    {
      quote: "「有些人燃燒熱情活著，有些人燃燒 ATP。」",
      desc: "粒線體工會仍持續抗議中。葡萄糖配給尚未恢復。"
    },
    {
      quote: "「意識可能只是宇宙在偷偷觀察自己。」",
      desc: "警告：哲學濃度過高，現實穩定度開始下降。"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setReactorPower((prev) => {
        const next = prev + (Math.random() * 6 - 3);
        return Math.max(70, Math.min(100, Math.round(next)));
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const thoughts = [
    {
      title: "Existential Aquarium",
      desc: "漂浮在螢光液體中的微小思想體。最好在凌晨四點前阻止它們演化成哲學。",
      emoji: "🪼",
      color: "from-cyan-500 to-blue-700",
      log: "水母思想體已組成工會，並開始要求情緒認同。",
      stats: ["知覺化程度：74%", "過度思考：危急", "睡眠品質：已死亡"]
    },
    {
      title: "Dopamine Forge",
      desc: "一台把咖啡因與恐慌轉換成生產力的可疑裝置。",
      emoji: "⚙️",
      color: "from-orange-400 to-red-600",
      log: "警告：使用者可能正試圖用三份試算表與純粹恐懼最佳化人生。",
      stats: ["咖啡濃度：8mg/mL", "動機來源：人工", "鍵盤暴力值：升高"]
    },
    {
      title: "Biology Dungeon",
      desc: "粒線體需要繳房租，而轉錄因子天天發動幫派戰爭的地方。",
      emoji: "🧬",
      color: "from-emerald-400 to-teal-700",
      log: "一個核糖體因無照合成蛋白質而遭到逮捕。",
      stats: ["ATP 輸出：混亂", "突變機率：12%", "實驗室安全：理論存在"]
    },
    {
      title: "Sleep Debt Bank",
      desc: "你那正在遠方微弱尖叫的晝夜節律。",
      emoji: "🌙",
      color: "from-violet-500 to-indigo-800",
      log: "累積睡眠債務的利率仍在持續上升。",
      stats: ["REM 週期：失蹤", "妄想程度：可接受", "褪黑激素經濟：崩潰中"]
    }
  ];

  const activateThought = (item) => {
    setSelectedThought(item);
    setMessages((prev) => [item.log, ...prev.slice(0, 2)]);

    setTimeout(() => {
      terminalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 120);
  };

  const feedThought = () => {
    const creatures = ["🪼", "🧠", "👁️", "🫀", "🧬"];

    const newCreature = {
      id: Date.now(),
      emoji: creatures[Math.floor(Math.random() * creatures.length)],
      left: Math.random() * 80 + 5,
      top: Math.random() * 70 + 10,
      size: Math.random() * 2 + 2
    };

    setThoughtCreatures((prev) => [...prev.slice(-8), newCreature]);
    setReactorPower((prev) => Math.min(prev + 2, 100));
    setBioKnowledge((prev) => Math.min(prev + 1, 100));

    setMessages((prev) => [
      `思想體 ${newCreature.emoji} 已成功孵化。`,
      ...prev.slice(0, 2)
    ]);
  };

  const nextQuote = () => {
    setQuoteVisible(false);

    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % philosophyQuotes.length);
      setQuoteVisible(true);
    }, 260);
  };

  const fakeConversations = {
    "Existential Aquarium": [
      "🪼 水母思想體 #14：『如果意識只是穿著昂貴鞋子的化學反應呢？』",
      "🪼 水族箱 AI：『請停止在午夜後餵食思想體。』",
      "🪼 水質警告：哲學濃度過高。"
    ],
    "Dopamine Forge": [
      "⚙️ 生產力引擎：『使用者攝取的咖啡因已足以震穿牆壁。』",
      "⚙️ 鍛造員工：『我們又把恐慌轉換成十二頁報告了。』",
      "⚙️ 熱能警告：鍵盤溫度超出情緒安全標準。"
    ],
    "Biology Dungeon": [
      "🧬 第三號核糖體成立了地下蛋白質黑市。",
      "🧬 粒線體工會：『我們要求更多葡萄糖與更少熬夜。』",
      "🧬 CRISPR 模組不小心把辦公室植物編輯成哲學家。"
    ],
    "Sleep Debt Bank": [
      "🌙 銀行通知：你的 REM 週期已遭到查封。",
      "🌙 晝夜節律部門：『請停止與日出進行情緒談判。』",
      "🌙 夢境伺服器：正在載入奇怪的象徵性胡言亂語。"
    ]
  };

  return (
    <div
      className={`min-h-screen text-white overflow-hidden relative font-sans transition-all duration-[2500ms] ${
        weirdMode ? "bg-[#05010a]" : "bg-black"
      }`}
    >
      <div
        className={`absolute inset-0 transition-all duration-[2500ms] ${
          weirdMode ? "opacity-100" : "opacity-70"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            weirdMode
              ? "animate-pulse bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.28),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]"
              : "bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.25),transparent_40%)]"
          }`}
        />
      </div>

      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ${
          weirdMode
            ? "bg-[linear-gradient(to_bottom,rgba(255,0,128,0.08),rgba(0,0,0,0.96))]"
            : "bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.9))]"
        }`}
      />

      <header className="relative z-10 px-8 pt-10 pb-6 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              NEON MIND GARDEN
            </h1>
            <p className="mt-3 text-white/70 max-w-2xl text-lg">
              一個給過度思考生物、咖啡幽靈，以及開著六個分頁硬撐人生的生科學生居住的數位棲息地。
            </p>
          </div>

          <button
            onClick={() => setWeirdMode(!weirdMode)}
            className={`px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-2xl ${
              weirdMode
                ? "bg-fuchsia-500 text-white shadow-[0_0_40px_rgba(217,70,239,0.7)]"
                : "bg-white text-black"
            }`}
          >
            {weirdMode
              ? "Reality Corruption Active ⚡"
              : "Enter Weird Mode 🌚"}
          </button>
        </div>
      </header>

      <main className="relative z-10 px-8 py-10">
        {weirdMode && (
          <>
            <div className="pointer-events-none absolute top-20 left-[10%] text-fuchsia-400/20 text-6xl animate-pulse blur-[1px] rotate-[-8deg] select-none">
              WHAT IF THE THOUGHTS ARE REAL
            </div>

            <div className="pointer-events-none absolute top-[45%] right-[8%] text-cyan-300/10 text-5xl animate-bounce select-none">
              🪼
            </div>

            <div className="pointer-events-none absolute bottom-[18%] left-[12%] text-emerald-300/10 text-4xl animate-pulse select-none">
              reality integrity compromised
            </div>
          </>
        )}

        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm backdrop-blur-sm">
              <span className="animate-pulse">●</span>
              偵測到腦部活動
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              歡迎來到思想會長成發光生物的地方。
            </h2>

            <p className="text-white/70 text-lg leading-relaxed">
              下面每個 chamber 都像小型數位生態箱。去 hover 它們、戳它們，假裝你的焦慮已經被轉換成可再生能源。
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={feedThought}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 font-semibold hover:scale-105 hover:rotate-1 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)]"
              >
                餵食思想體 🧠
              </button>

              <button className="px-6 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
                晚點再崩潰™
              </button>
            </div>
          </div>

          <div className="relative h-[420px] flex items-center justify-center overflow-hidden">
            <div className="absolute w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />

            {thoughtCreatures.map((creature) => (
              <div
                key={creature.id}
                className="absolute animate-pulse select-none pointer-events-none transition-all duration-1000"
                style={{
                  left: `${creature.left}%`,
                  top: `${creature.top}%`,
                  fontSize: `${creature.size}rem`,
                  filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))"
                }}
              >
                {creature.emoji}
              </div>
            ))}

            <div className="relative w-[320px] h-[320px] rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden hover:rotate-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),transparent)]" />

              <div className="p-8 flex flex-col h-full justify-between">
                <div>
                  <div className="text-6xl">🫀</div>
                  <h3 className="mt-6 text-3xl font-bold">認知反應爐</h3>
                  <p className="mt-3 text-white/70 leading-relaxed">
                    目前狀態：平均每小時生產三次存在危機。
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>焦慮燃料</span>
                      <span>{reactorPower}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 transition-all duration-700"
                        style={{ width: `${reactorPower}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-white/60 mb-1">
                      <span>生物學知識</span>
                      <span>{bioKnowledge}%</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700"
                        style={{ width: `${bioKnowledge}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-3xl font-bold">互動艙室</h2>
            <div className="text-white/50 text-sm">
              Hover 卡片以提升神經閃爍效果 ✨
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {thoughts.map((item, index) => (
              <div
                key={index}
                onClick={() => activateThought(item)}
                className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] transition-all duration-500 cursor-pointer"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.color} transition-opacity duration-500`} />

                <div className="relative p-6 min-h-[260px] flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      {item.emoji}
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>

                  <button className="mt-6 self-start px-4 py-2 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md hover:bg-black/50 transition-colors">
                    開啟 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={terminalRef} className="mt-20 grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-cyan-300 tracking-widest mb-2">
                  神經檢測終端
                </div>
                <h2 className="text-3xl font-bold">
                  {selectedThought?.title || "等待思想體連線中..."}
                </h2>
              </div>

              <div className="text-4xl">
                {selectedThought?.emoji || "🧠"}
              </div>
            </div>

            {selectedThought ? (
              <>
                <p className="text-white/70 leading-relaxed text-lg">
                  {selectedThought.desc}
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  {selectedThought.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-black/30 border border-white/10 p-4"
                    >
                      <div className="text-xs text-white/40 mb-2">
                        診斷項目 #{i + 1}
                      </div>
                      <div className="font-semibold text-white/90">
                        {stat}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 animate-in fade-in duration-500">
                  <div className="text-emerald-300 text-sm mb-4 tracking-wide">
                    即時對話攔截
                  </div>

                  <div className="space-y-3 text-sm text-emerald-200/90 leading-relaxed">
                    {fakeConversations[selectedThought.title]?.map((line, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-emerald-400/20 pl-3 py-1"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-white/50 pt-8 text-lg">
                選擇一個艙室開始檢測。那些小型數位生物正在等待。🧪
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="text-sm text-fuchsia-300 tracking-widest mb-4">
                系統紀錄
              </div>

              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/70"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
              傳輸紀錄 #404
            </div>

            <h2 className={`text-4xl md:text-5xl font-black leading-tight transition-all duration-500 ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              {philosophyQuotes[quoteIndex].quote}
            </h2>

            <p className={`mt-6 text-lg text-white/70 leading-relaxed transition-all duration-500 ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              {philosophyQuotes[quoteIndex].desc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={nextQuote}
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 hover:rotate-1 transition-all duration-300"
              >
                接受命運
              </button>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                返回實驗室 🧪
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-8 py-8 text-white/40 text-sm border-t border-white/10 mt-16">
        建造於好奇心、咖啡因，以及過度活躍的前額葉皮質之間。
      </footer>
    </div>
  );
}
