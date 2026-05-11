import { useEffect, useMemo, useRef, useState } from 'react';

type MessageType = 'system' | 'self' | 'other';

type Message = {
  id: number;
  user: string;
  text: string;
  type: MessageType;
};

type UserProfile = {
  name: string;
  status: string;
  danger: string;
  cyberware: string;
  mental: string;
  sleep: string;
};

const USER_DATA: UserProfile[] = [
  {
    name: 'biohazard',
    status: '在線中',
    danger: '78%',
    cyberware: '機械肺葉 v2',
    mental: '極度不穩定',
    sleep: '2 小時',
  },
  {
    name: 'ghostwire.exe',
    status: '正在監聽',
    danger: '91%',
    cyberware: '視網膜干擾器',
    mental: '咖啡因成癮',
    sleep: '0 小時',
  },
  {
    name: 'rat_king',
    status: '可疑登入',
    danger: '66%',
    cyberware: '地下脊椎強化',
    mental: '正在發瘋',
    sleep: '5 分鐘',
  },
  {
    name: 'thermal_decay',
    status: '低功耗模式',
    danger: '48%',
    cyberware: '散熱義肢',
    mental: '接近冬眠',
    sleep: '17 小時',
  },
  {
    name: 'kitten',
    status: '聊天室災難源頭',
    danger: '？？？',
    cyberware: '焦慮核心',
    mental: '量子態',
    sleep: '不存在',
  },
];

export default function CyberChatroom() {
  const [theme, setTheme] = useState(0);
  const [showAttackPanel, setShowAttackPanel] = useState(false);
  const [selectedProfile, setSelectedProfile] =
    useState<UserProfile | null>(null);
  const [emojiStorm, setEmojiStorm] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('kitten');
  const [pendingUsername, setPendingUsername] = useState('kitten');

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messageId = useRef(100);

  const themes = [
    {
      bg: 'bg-black text-cyan-200',
      panel: 'bg-cyan-950/10 border-cyan-500/20',
      title: 'text-cyan-300',
      glow: 'rgba(0,255,255,0.16)',
      room: '標準模式 🔵',
    },
    {
      bg: 'bg-[#190014] text-pink-200',
      panel: 'bg-pink-950/10 border-pink-500/20',
      title: 'text-pink-300',
      glow: 'rgba(255,0,170,0.18)',
      room: '霓虹模式 🔴',
    },
    {
      bg: 'bg-[#04120a] text-green-200',
      panel: 'bg-green-950/10 border-green-500/20',
      title: 'text-green-300',
      glow: 'rgba(0,255,120,0.16)',
      room: '避難模式 🟢',
    },
  ];

  const currentTheme = themes[theme];

  const displayedUsers = USER_DATA.map((user) => {
    if (user.name === 'kitten') {
      return {
        ...user,
        name: username,
      };
    }

    return user;
  });

  const baseMessages = useMemo<Message[]>(() => {
    if (theme === 0) {
      return [
        {
          id: 1,
          user: 'SYSTEM',
          text: '神經連線已建立。📡',
          type: 'system',
        },
        {
          id: 2,
          user: 'biohazard',
          text: '今晚的企業監控濃度有點高。☕',
          type: 'other',
        },
      ];
    }

    if (theme === 1) {
      return [
        {
          id: 3,
          user: 'SYSTEM',
          text: '夜店模式啟動。城市霓虹亮度提升至危險等級。🌆',
          type: 'system',
        },
        {
          id: 4,
          user: 'ghostwire.exe',
          text: '有人把腦波同步器接到 DJ 台上了。🤣',
          type: 'other',
        },
      ];
    }

    return [
      {
        id: 5,
        user: 'SYSTEM',
        text: '避難模式啟動。城市能源剩餘 12%。⚠️',
        type: 'system',
      },
      {
        id: 6,
        user: 'thermal_decay',
        text: '今天第七次停電了。💀',
        type: 'other',
      },
    ];
  }, [theme]);

  const [messages, setMessages] = useState<Message[]>(baseMessages);

  useEffect(() => {
    setMessages(baseMessages);
  }, [baseMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!emojiStorm.length) {
      return;
    }

    const timer = setTimeout(() => {
      setEmojiStorm([]);
    }, 3500);

    return () => clearTimeout(timer);
  }, [emojiStorm]);

  const createMessage = (
    user: string,
    text: string,
    type: MessageType
  ): Message => {
    return {
      id: messageId.current++,
      user,
      text,
      type,
    };
  };

  const appendMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev.slice(-18), ...newMessages]);
  };

  const triggerTheme = (index: number) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setTheme(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 250);
  };

  const launchEmojiStorm = () => {
    setEmojiStorm(Array.from({ length: 35 }, (_, i) => i));

    appendMessages([
      createMessage(
        'SYSTEM',
        '聊天室情緒模組失控，emoji 正在滿天亂飛。🤣',
        'system'
      ),
    ]);
  };

  const attackUser = (target: string) => {
    const attacks = [
      `${target}：你的人生規劃像損壞的 Git commit。💀`,
      `${target}：企業 AI 看了你的發言都想辭職。🌚`,
      `${target}：你的 CPU 散熱器是不是拿泡麵盒做的？🤣`,
    ];

    const retaliation = [
      `${target} 對你發射精神污染 meme 彈幕。📡`,
      `${target} 駭入你的冰箱並刪除所有優格。💀`,
      `${target} 在你家窗外播放土味 EDM。🔊`,
      `${target} 把你的搜尋紀錄投影到市中心。🤣`,
    ];

    const systemChaos = [
      'SYSTEM：聊天室信任值下降 17%。⚠️',
      'SYSTEM：偵測到高濃度情緒污染。🌚',
      'SYSTEM：企業監控 AI 開始偷偷記錄對話。📡',
    ];

    appendMessages([
      createMessage(username, `我正式攻擊 ${target}。🌚💥`, 'self'),
      createMessage(
        target,
        attacks[Math.floor(Math.random() * attacks.length)],
        'other'
      ),
      createMessage(
        target,
        retaliation[Math.floor(Math.random() * retaliation.length)],
        'other'
      ),
      createMessage(
        'SYSTEM',
        systemChaos[Math.floor(Math.random() * systemChaos.length)],
        'system'
      ),
    ]);

    setShowAttackPanel(false);
  };

  const sendMessage = () => {
    const trimmed = inputText.trim();

    if (!trimmed) {
      return;
    }

    const npcReplies = [
      'ghostwire.exe：這聊天室快變成精神病院 MMO。🧠',
      'biohazard：企業 AI 正在偷偷分析你的情緒。📡',
      'rat_king：笑死，這地方遲早被企業炸掉。🤣💣',
    ];

    const randomReply =
      npcReplies[Math.floor(Math.random() * npcReplies.length)];

    appendMessages([
      createMessage(username, trimmed, 'self'),
      createMessage(
        randomReply.split('：')[0],
        randomReply.split('：')[1],
        'other'
      ),
    ]);

    const chaosTriggers = ['🤣', 'lol', '幹', 'wtf', '🌚', '💀'];

    const shouldTriggerChaos = chaosTriggers.some((trigger) =>
      trimmed.toLowerCase().includes(trigger.toLowerCase())
    );

    if (shouldTriggerChaos && Math.random() < 0.7) {
      setTimeout(() => {
        launchEmojiStorm();
      }, 400);
    }

    setInputText('');
  };

  const displayedProfile = selectedProfile
    ? selectedProfile.name === 'kitten'
      ? {
          ...selectedProfile,
          name: username,
        }
      : selectedProfile
    : null;

  return (
    <div
      className={`min-h-screen overflow-hidden relative font-mono transition-all duration-1000 ${currentTheme.bg} ${
        isTransitioning
          ? 'opacity-0 scale-[1.04] blur-md'
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at top, ${currentTheme.glow}, transparent 50%)`,
      }}
    >
      <style>{`
        @keyframes emojiThrow {
          0% {
            transform: translateY(0);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          50% {
            transform: translateY(-65vh) rotate(180deg);
          }

          100% {
            transform: translateY(20vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes profileFade {
          0% {
            opacity: 0;
            transform: translateX(-10px) scale(0.96);
          }

          100% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }
      `}</style>

      {emojiStorm.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          {emojiStorm.map((item) => (
            <div
              key={item}
              className="absolute text-4xl animate-[emojiThrow_3s_ease-in-out_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-40px',
              }}
            >
              {
                ['🤣', '💀', '🔥', '☠️', '📡', '🤖'][
                  Math.floor(Math.random() * 6)
                ]
              }
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex h-screen">
        <aside
          className={`w-80 border-r hidden md:flex flex-col p-4 backdrop-blur-xl transition-all duration-1000 ${currentTheme.panel}`}
        >
          <h1 className={`text-3xl font-bold mb-2 ${currentTheme.title}`}>
            NEON//ROOM
          </h1>

          <p className="text-xs opacity-70 mb-4">
            閒雜人等請迅速進入
          </p>

          <div className="mb-5 rounded-2xl border border-cyan-500/20 bg-black/30 p-3 space-y-2">
            <div className="text-xs opacity-70">你的代號</div>

            <input
              value={pendingUsername}
              onChange={(event) => setPendingUsername(event.target.value)}
              placeholder="輸入你的代號⋯⋯"
              className="w-full rounded-xl border border-cyan-500/20 bg-black/40 px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={() => {
                const trimmed = pendingUsername.trim();
                const finalName = trimmed || 'kitten';

                setUsername(finalName);
                setPendingUsername(finalName);

                appendMessages([
                  createMessage(
                    'SYSTEM',
                    `使用者代號已更新為 ${finalName}。📡`,
                    'system'
                  ),
                ]);
              }}
              className="w-full rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm hover:bg-cyan-500/20 transition-all"
            >
              確認代號
            </button>
          </div>

          <div className="space-y-3 overflow-auto pr-1">
            {displayedUsers.map((user, index) => (
              <button
                key={user.name}
                onClick={() => setSelectedProfile(user)}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left hover:bg-white/10 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        index % 2 === 0 ? 'bg-green-400' : 'bg-pink-400'
                      } animate-pulse`}
                    />

                    <span>{user.name}</span>
                  </div>

                  <span className="text-xs opacity-60">
                    {user.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {displayedProfile && (
            <div className="mt-4 rounded-3xl border border-cyan-500/20 bg-black/40 p-4 text-xs space-y-2 animate-[profileFade_0.4s_ease]">
              <div className="text-sm font-bold text-cyan-300">
                {displayedProfile.name} 的人物資料
              </div>

              <div>危險程度：{displayedProfile.danger}</div>
              <div>義體改造：{displayedProfile.cyberware}</div>
              <div>精神狀態：{displayedProfile.mental}</div>
              <div>睡眠時間：{displayedProfile.sleep}</div>
            </div>
          )}
        </aside>

        <main className="flex-1 flex flex-col backdrop-blur-md">
          <header className="border-b border-white/10 bg-black/40 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-bold ${currentTheme.title}`}>
                {currentTheme.room}
              </h2>

              <p className="text-xs opacity-70">加密都市聊天室</p>
            </div>

            <div className="flex gap-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => triggerTheme(index)}
                  className="rounded-xl bg-cyan-500/10 px-3 py-2 text-xs hover:scale-105 transition-all"
                >
                  {themes[index].room}
                </button>
              ))}
            </div>
          </header>

          <section
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 space-y-4 scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-2xl rounded-3xl border p-4 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-500 ${
                  msg.type === 'self'
                    ? 'ml-auto bg-cyan-400/10 border-cyan-300/30'
                    : msg.type === 'system'
                    ? 'bg-yellow-500/10 border-yellow-300/20 text-yellow-100'
                    : 'bg-fuchsia-500/10 border-fuchsia-300/20'
                }`}
              >
                <div className="flex justify-between mb-2 text-xs opacity-70">
                  <span>{msg.user}</span>
                  <span>{msg.id}</span>
                </div>

                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </section>

          <footer className="border-t border-white/10 bg-black/40 p-4 relative">
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowAttackPanel((prev) => !prev)}
                className="rounded-2xl border border-red-500/20 px-4 py-3 hover:bg-red-500/20 transition-all"
              >
                +
              </button>

              {showAttackPanel && (
                <div className="absolute bottom-20 left-4 w-80 rounded-3xl border border-red-500/20 bg-black/90 p-4 backdrop-blur-xl z-50">
                  <div className="mb-3 text-sm text-red-300 font-bold">
                    選擇攻擊對象 🌚
                  </div>

                  <div className="space-y-2">
                    {displayedUsers
                      .filter((u) => u.name !== username)
                      .map((user) => (
                        <button
                          key={user.name}
                          onClick={() => attackUser(user.name)}
                          className="w-full rounded-2xl border border-white/10 bg-red-500/10 px-3 py-2 text-left hover:bg-red-500/20 transition-all"
                        >
                          ⚠️ {user.name}
                        </button>
                      ))}
                  </div>

                  <button
                    onClick={launchEmojiStorm}
                    className="mt-4 w-full rounded-2xl border border-pink-500/20 bg-pink-500/10 py-2 hover:scale-[1.02] transition-all"
                  >
                    啟動 Emoji 風暴 🤣
                  </button>
                </div>
              )}

              <input
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage();
                  }
                }}
                placeholder="將思緒投射進虛空⋯⋯"
                className="flex-1 rounded-2xl border border-cyan-500/20 bg-black/30 px-5 py-3 outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 hover:bg-cyan-500/20 transition-all"
              >
                發送
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
