"use client";

import React, { useState, useRef } from 'react';


// Default Master Accounts Data Sample
const DEFAULT_ACCOUNTS: any[] = [];
const AccountCard = ({ username, followers, following, likes, videos, openId }: any) => (
  <div className="bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-3">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-cyan-400/50 overflow-hidden bg-gray-800">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt="" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-white">@{username}</h3>
          <p className="text-[10px] text-gray-500 font-mono truncate max-w-[180px]">{openId}</p>
        </div>
      </div>
      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-bold">Active</span>
    </div>
    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-800/60 text-center text-xs">
      <div>
        <p className="text-gray-500 text-[10px]">Followers</p>
        <p className="font-bold text-white">{followers}</p>
      </div>
      <div>
        <p className="text-gray-500 text-[10px]">Following</p>
        <p className="font-bold text-white">{following}</p>
      </div>
      <div>
        <p className="text-gray-500 text-[10px]">Likes</p>
        <p className="font-bold text-white">{likes}</p>
      </div>
      <div>
        <p className="text-gray-500 text-[10px]">Videos</p>
        <p className="font-bold text-white">{videos}</p>
      </div>
    </div>
  </div>
);
export default function Dashboard() {
  // --- AUTHENTICATION & MULTI-USER STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserWa, setCurrentUserWa] = useState<string>("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [waInputModal, setWaInputModal] = useState("");

  // Storage Database Per WA Number
  const [userStore, setUserStore] = useState<Record<string, any>>({
    "6282264130288": {
      accounts: [],
      groups: [],
      proxyUrl: "Rotate: URL get-proxy API\nSticky:\nhttp://user:pass@host:port",
      proxyMode: "Rotate",
      isProxyEnabled: false
    }
  });

  // Page Navigation State ('dashboard' | 'privacy' | 'terms')
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'privacy' | 'terms'>('dashboard');

  // Dashboard Navigation Tab State
  const [activeTab, setActiveTab] = useState<'monitoring' | 'upload' | 'scheduled' | 'groups' | 'proxy'>('upload');

  // Dashboard Header & Accounts State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Monitoring Filter States
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("All groups");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Ambil akun dari pengguna yang sedang aktif (jika tidak ada, gunakan array kosong)
const currentAccounts = userStore[currentUserWa]?.accounts || [];

// Kalkulasi statistik dinamis
const totalFollowers = currentAccounts.reduce((sum: number, acc: any) => sum + (Number(acc.followers) || 0), 0);
const totalPosts = currentAccounts.reduce((sum: number, acc: any) => sum + (Number(acc.videos) || 0), 0);
const connectedAccounts = currentAccounts.length;
  
  // --- UPLOAD / POST FORM STATES ---
  const [mediaType, setMediaType] = useState<'Photo' | 'Video' | 'Carousel'>('Video');
  const [mediaSource, setMediaSource] = useState<'Upload' | 'URL'>('Upload');
  const [urlInput, setUrlInput] = useState("https://example.com/video.mp4");
  const [note, setNote] = useState("");
  const [caption, setCaption] = useState("");
  const [newHashtagInput, setNewHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState(['#fyp', '#foryou', '#viral', '#trending', '#threads', '#reels', '#explore', '#love']);
  const [selectedAiModel, setSelectedAiModel] = useState("openai/gpt-4o-mini");

  // File Upload State & Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [carouselItems, setCarouselItems] = useState<File[]>([]);

  // Select Accounts & Sort Popover
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [accountSearch, setAccountSearch] = useState("");
  const [accountQuantity, setAccountQuantity] = useState("");
  const [isSelectAccountSortOpen, setIsSelectAccountSortOpen] = useState(false);
  const [selectAccountSort, setSelectAccountSort] = useState("Highest followers");

  // Post & Distribution Mode
  const [postMode, setPostMode] = useState<'Post Now' | 'Schedule'>('Schedule');
  const [distributionMode, setDistributionMode] = useState<'Random' | 'Sequential'>('Random');

  // Schedule Date & Time Picker States
  const [scheduledDateTime, setScheduledDateTime] = useState("10/11/2026 16:51");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(11);
  const [selectedHour, setSelectedHour] = useState("16");
  const [selectedMinute, setSelectedMinute] = useState("51");

  // Scheduled Tab State
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);

  // --- GROUPS TAB STATES ---
  const [groupNameInput, setGroupNameInput] = useState("");
  const [groupInitialsInput, setGroupInitialsInput] = useState("");
  const [groupLogoFile, setGroupLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [groupsList, setGroupsList] = useState<any[]>([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);

  const [groupMemberSearch, setGroupMemberSearch] = useState("");
  const [isGroupFilterOpen, setIsGroupFilterOpen] = useState(false);
  const [groupFilterOption, setGroupFilterOption] = useState("Group priority order");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // --- PROXY TAB STATES ---
  const [isProxyEnabled, setIsProxyEnabled] = useState(false);
  const [proxyMode, setProxyMode] = useState<'Rotate' | 'Sticky'>('Rotate');
  const [proxyUrl, setProxyUrl] = useState(
    "Rotate: URL get-proxy API\nSticky:\nhttp://user:pass@host:port"
  );
  const [proxyRetry, setProxyRetry] = useState("7");
  const [proxyParallel, setProxyParallel] = useState("2");
  const [proxyLogSearch, setProxyLogSearch] = useState("");
  const [proxyLogs, setProxyLogs] = useState<any[]>([]);

  // Accounts List
  const [accounts, setAccounts] = useState<any[]>(DEFAULT_ACCOUNTS);

  // --- WHATSAPP LOGIN HANDLER ---
  const handleWaLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waInputModal.trim()) {
      alert("Please enter a WhatsApp number.");
      return;
    }

    const cleanedWa = waInputModal.trim();
    setCurrentUserWa(cleanedWa);

    // Initialize Store for new WA Number if not exists
    if (!userStore[cleanedWa]) {
      setUserStore(prev => ({
        ...prev,
        [cleanedWa]: {
          accounts: DEFAULT_ACCOUNTS,
          groups: [],
          proxyUrl: "Rotate: URL get-proxy API\nSticky:\nhttp://user:pass@host:port",
          proxyMode: "Rotate",
          isProxyEnabled: false
        }
      }));
      setAccounts(DEFAULT_ACCOUNTS);
      setGroupsList([]);
    } else {
      // Load Existing Store for this WA Number
      setAccounts(userStore[cleanedWa].accounts || DEFAULT_ACCOUNTS);
      setGroupsList(userStore[cleanedWa].groups || []);
      setProxyUrl(userStore[cleanedWa].proxyUrl || "");
      setProxyMode(userStore[cleanedWa].proxyMode || "Rotate");
      setIsProxyEnabled(userStore[cleanedWa].isProxyEnabled || false);
    }

    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserWa("");
    setIsLoginModalOpen(false);
  };

  // Trigger File Explorer for Media
  const handleDropAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (mediaType === 'Carousel') {
        const newFiles = Array.from(e.target.files);
        setCarouselItems(prev => [...prev, ...newFiles].slice(0, 10));
      } else {
        setUploadedFile(selected);
        if (selected.type.startsWith('image/')) {
          setFilePreview(URL.createObjectURL(selected));
        } else {
          setFilePreview(null);
        }
      }
    }
  };

  // Group Create / Reset Handlers
  const handleSaveGroup = () => {
    if (!groupNameInput.trim()) {
      alert("Please enter a group name");
      return;
    }
    const newGroup = {
      name: groupNameInput,
      initials: groupInitialsInput || groupNameInput.substring(0, 3).toUpperCase(),
      logo: groupLogoFile ? URL.createObjectURL(groupLogoFile) : null,
      members: []
    };
    const updatedGroups = [...groupsList, newGroup];
    setGroupsList(updatedGroups);

    if (currentUserWa) {
      setUserStore(prev => ({
        ...prev,
        [currentUserWa]: { ...prev[currentUserWa], groups: updatedGroups }
      }));
    }

    handleResetGroupForm();
  };

  const handleResetGroupForm = () => {
    setGroupNameInput("");
    setGroupInitialsInput("");
    setGroupLogoFile(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const toggleAccountSelect = (id: string) => {
    if (selectedAccountIds.includes(id)) {
      setSelectedAccountIds(selectedAccountIds.filter(item => item !== id));
    } else {
      setSelectedAccountIds([...selectedAccountIds, id]);
    }
  };

  const handleSelectAllAccounts = () => {
    if (selectedAccountIds.length === accounts.length) {
      setSelectedAccountIds([]);
    } else {
      setSelectedAccountIds(accounts.map(acc => acc.id));
    }
  };

  const handleAddCustomHashtag = () => {
    if (newHashtagInput.trim() !== "") {
      const formattedTag = newHashtagInput.startsWith("#") ? newHashtagInput : `#${newHashtagInput}`;
      if (!hashtags.includes(formattedTag)) {
        setHashtags([...hashtags, formattedTag]);
      }
      setNewHashtagInput("");
    }
  };

  const handleSelectDate = (day: number) => {
    setSelectedDay(day);
    const dayFormatted = day < 10 ? `0${day}` : day;
    setScheduledDateTime(`10/${dayFormatted}/2026 ${selectedHour}:${selectedMinute}`);
  };

  const handleSelectHour = (hr: string) => {
    setSelectedHour(hr);
    const dayFormatted = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
    setScheduledDateTime(`10/${dayFormatted}/2026 ${hr}:${selectedMinute}`);
  };

  const handleSelectMinute = (mn: string) => {
    setSelectedMinute(mn);
    const dayFormatted = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
    setScheduledDateTime(`10/${dayFormatted}/2026 ${selectedHour}:${mn}`);
  };

  // Sorting Process for Select Accounts Box
  const processedSelectAccounts = [...accounts]
    .filter(acc => acc.username.toLowerCase().includes(accountSearch.toLowerCase()))
    .sort((a, b) => {
      if (selectAccountSort === "Highest followers") return b.followers - a.followers;
      if (selectAccountSort === "Highest following") return b.following - a.following;
      if (selectAccountSort === "Highest likes") return b.likes - a.likes;
      if (selectAccountSort === "Highest videos") return b.videos - a.videos;
      if (selectAccountSort === "Account name (A-Z)") return a.username.localeCompare(b.username);
      return 0;
    });

  // ==================== PAGE VIEW 1: LANDING & WHATSAPP LOGIN ====================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#070a0f] text-white p-6 font-sans flex flex-col justify-between relative overflow-hidden">
        
        {/* HEADER LANDING */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-800/60 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">TT</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TT Connections</h1>
              <p className="text-xs text-gray-400">Business Account Dashboard</p>
            </div>
          </div>

          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-400/20"
          >
            🔑 Login
          </button>
        </header>

        {/* HERO CENTER */}
        <main className="max-w-3xl mx-auto text-center my-auto py-12 relative z-20 space-y-6">
          <div className="w-20 h-20 bg-cyan-400 rounded-2xl flex items-center justify-center text-black text-3xl font-extrabold mx-auto shadow-2xl shadow-cyan-400/40 mb-8 border border-cyan-300">
            TT
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Welcome to <span className="text-cyan-400">TT</span> Connections
          </h1>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            One dashboard to manage all your TikTok Business accounts. Upload photos & videos, schedule posts, and monitor account performance in real time — all in one place without opening the TikTok app.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-cyan-400/30 flex items-center gap-2.5 mx-auto hover:scale-105"
            >
              💬 Sign in with WhatsApp
            </button>
          </div>

          {/* THREE FEATURES ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-gray-800/60 mt-12">
            <div className="bg-[#10141d] p-5 rounded-2xl border border-gray-800/80 text-center space-y-2">
              <div className="text-cyan-400 text-xl font-bold">👥</div>
              <h3 className="text-xs font-bold text-white">Multi-Account</h3>
              <p className="text-[11px] text-gray-400">Connect multiple TikTok accounts at once</p>
            </div>

            <div className="bg-[#10141d] p-5 rounded-2xl border border-gray-800/80 text-center space-y-2">
              <div className="text-cyan-400 text-xl font-bold">✈</div>
              <h3 className="text-xs font-bold text-white">Upload & Post</h3>
              <p className="text-[11px] text-gray-400">Upload photos & videos directly to TikTok</p>
            </div>

            <div className="bg-[#10141d] p-5 rounded-2xl border border-gray-800/80 text-center space-y-2">
              <div className="text-cyan-400 text-xl font-bold">📅</div>
              <h3 className="text-xs font-bold text-white">Scheduling</h3>
              <p className="text-[11px] text-gray-400">Schedule posts for specific times</p>
            </div>
          </div>
        </main>

        {/* MODAL SIGN IN WITH WHATSAPP (MATCHING SCREENSHOT_146.PNG EXACTLY) */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#121722] border border-gray-800/80 w-full max-w-md rounded-2xl p-8 shadow-2xl relative space-y-6 text-center">
              
              {/* WHATSAPP LOGO ICON WITH GREEN GRADIENT */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-2xl mx-auto shadow-xl shadow-emerald-500/20">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>

              {/* TITLE & SUBTITLE */}
              <div>
                <h2 className="text-lg font-bold text-white mb-1">Sign in with WhatsApp</h2>
                <p className="text-xs text-gray-400 leading-relaxed px-2">
                  Enter your WhatsApp number — we&apos;ll send an OTP code to verify.
                </p>
              </div>

              {/* FORM INPUT */}
              <form onSubmit={handleWaLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-[11px] font-medium text-gray-300 block mb-1.5">
                    WhatsApp Number
                  </label>
                  <input 
                    type="text" 
                    value={waInputModal}
                    onChange={(e) => setWaInputModal(e.target.value)}
                    placeholder="example: 6281234567890"
                    className="w-full bg-[#080c12] border border-gray-800 text-xs px-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 font-mono"
                    autoFocus
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  <span>✈</span> Send OTP
                </button>
              </form>

              {/* CLOSE BUTTON */}
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* FOOTER LANDING */}
        <footer className="mt-16 border-t border-gray-800/60 pt-6 flex justify-between items-center text-xs text-gray-500 relative z-20">
          <p>© 2026 TT Connections. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-gray-300">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-gray-300">Terms of Service</button>
          </div>
        </footer>

      </div>
    );
  }

  // ==================== PAGE VIEW 2: PRIVACY POLICY ====================
  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-[#070a0f] text-white p-6 font-sans flex flex-col justify-between">
        <div>
          <header className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-800/60">
            <div 
              onClick={() => setCurrentPage('dashboard')}
              className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer"
            >
              TT
            </div>
            <h1 
              onClick={() => setCurrentPage('dashboard')}
              className="text-xl font-bold tracking-tight cursor-pointer"
            >
              TT Connections
            </h1>
          </header>

          <main className="max-w-4xl mx-auto bg-[#10141d] p-8 md:p-10 rounded-2xl border border-gray-800/80 shadow-2xl my-4">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
              Privacy Policy for TT Connections
            </h1>
            <p className="text-xs text-gray-400 mb-6">Last updated: 11 October 2026</p>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              This Privacy Policy explains how <span className="font-bold text-white">&quot;TT Connections&quot;</span> (the &quot;Service&quot;) collects, uses, and protects your data when you use this application.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-sm font-bold text-white mb-2">1. Data We Store</h2>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                  <li>
                    <span className="font-bold text-gray-200">Posting account data:</span> TikTok account ID, username, and basic profile data needed to display posting history and status.
                  </li>
                  <li>
                    <span className="font-bold text-gray-200">Posting history:</span> Captions, statuses, and posting timestamps are stored in the database to display history inside <span className="font-bold text-gray-200">TT Connections</span>.
                  </li>
                  <li>
                    <span className="font-bold text-gray-200">Uploaded files:</span> Files you upload are stored temporarily on the server only for processing and delivery to TikTok via API. We do not sell them or share them with unrelated third parties.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">2. How We Use Data</h2>
                <p className="text-xs text-gray-300 mb-2">Data collected by <span className="font-bold text-gray-200">TT Connections</span> is used only to:</p>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                  <li>Display your dashboard and posting history in <span className="font-bold text-gray-200">TT Connections</span>;</li>
                  <li>Process and send your content to TikTok through official APIs you authorize;</li>
                  <li>Monitor content upload success/failure status.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">3. Security</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We apply reasonable technical controls to protect your data from unauthorized access, including access restrictions to required systems only. API credentials and access tokens used for TikTok are stored server-side and are not shared with other parties without your consent, unless required by law.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">4. Third-Party Data Sharing</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We do not sell your personal data. Data is shared only with service providers necessary to operate <span className="font-bold text-gray-200">TT Connections</span> (for example, hosting/server providers) and with TikTok through API calls when you request content publishing.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">5. Your Rights</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  If you no longer want to use <span className="font-bold text-gray-200">TT Connections</span>, you may stop using the Service and request deletion of stored data (where technically and legally possible) through the contact channel available in the app or related site.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">6. Privacy Policy Changes</h2>
                <p className="text-xs text-gray-300 leading-relaxed mb-8">
                  This Privacy Policy may be updated from time to time. The latest version will always be available on this page, and the &quot;Last updated&quot; date above will reflect the latest revision date.
                </p>
              </section>

              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="border border-gray-800 bg-[#070a0f] hover:bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
          </main>
        </div>

        <footer className="mt-16 border-t border-gray-800/60 pt-6 flex justify-between items-center text-xs text-gray-500">
          <p>© 2026 TT Connections. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-gray-300">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-gray-300">Terms of Service</button>
          </div>
        </footer>
      </div>
    );
  }

  // ==================== PAGE VIEW 3: TERMS OF SERVICE ====================
  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-[#070a0f] text-white p-6 font-sans flex flex-col justify-between">
        <div>
          <header className="flex items-center gap-3 pb-6 mb-6 border-b border-gray-800/60">
            <div 
              onClick={() => setCurrentPage('dashboard')}
              className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold cursor-pointer"
            >
              TT
            </div>
            <h1 
              onClick={() => setCurrentPage('dashboard')}
              className="text-xl font-bold tracking-tight cursor-pointer"
            >
              TT Connections
            </h1>
          </header>

          <main className="max-w-4xl mx-auto bg-[#10141d] p-8 md:p-10 rounded-2xl border border-gray-800/80 shadow-2xl my-4">
            <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
              Terms of Service for TT Connections
            </h1>
            <p className="text-xs text-gray-400 mb-6">Last updated: 11 October 2026</p>

            <p className="text-xs text-gray-300 leading-relaxed mb-6">
              By using <span className="font-bold text-white">&quot;TT Connections&quot;</span> (the &quot;Service&quot;), you agree to be bound by these Terms of Service and the <button onClick={() => setCurrentPage('privacy')} className="text-cyan-400 hover:underline font-bold">TT Connections Privacy Policy</button>.
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-sm font-bold text-white mb-2">1. Service Description</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-bold text-gray-200">TT Connections</span> is a web application that allows you to monitor TikTok accounts and upload or schedule content to TikTok accounts you have authorized via official TikTok APIs.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">2. Relationship with TikTok</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="font-bold text-gray-200">TT Connections</span> is a third-party application and is not affiliated with, sponsored by, or officially endorsed by TikTok Pte. Ltd. or its affiliates. References to &quot;TikTok&quot; are used only to describe platform integrations through available APIs.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">3. User Responsibilities</h2>
                <p className="text-xs text-gray-300 mb-2">You agree to:</p>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                  <li>Post only content you have rights and permission to use;</li>
                  <li>Comply with TikTok&apos;s <span className="font-bold text-gray-200">Terms of Service</span> and <span className="font-bold text-gray-200">Community Guidelines</span>;</li>
                  <li>Not use the Service for spam, illegal activities, or violations of others&apos; rights;</li>
                  <li>Keep your account credentials and granted access secure.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">4. TikTok API Usage</h2>
                <p className="text-xs text-gray-300 mb-2">
                  This Service depends on TikTok APIs for publishing and account-related data. We do not control and are not responsible for:
                </p>
                <ul className="list-disc list-inside text-xs text-gray-300 space-y-2 leading-relaxed pl-1">
                  <li>Technical changes in TikTok APIs;</li>
                  <li>API rate limits or service disruptions;</li>
                  <li>Restrictions, suspension, or termination of your TikTok account by TikTok.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">5. Limitation of Liability</h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  To the maximum extent permitted by applicable law, we are not liable for direct or indirect losses, data loss, or other damages arising from the use of, or inability to use, <span className="font-bold text-gray-200">TT Connections</span>.
                </p>
              </section>

              <section>
                <h2 className="text-sm font-bold text-white mb-2">6. Changes to Terms</h2>
                <p className="text-xs text-gray-300 leading-relaxed mb-8">
                  We may update these Terms from time to time. The latest version will always be available on this page, and the &quot;Last updated&quot; date above will be revised accordingly. By continuing to use <span className="font-bold text-gray-200">TT Connections</span> after changes, you agree to the updated Terms.
                </p>
              </section>

              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="border border-gray-800 bg-[#070a0f] hover:bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
          </main>
        </div>

        <footer className="mt-16 border-t border-gray-800/60 pt-6 flex justify-between items-center text-xs text-gray-500">
          <p>© 2026 TT Connections. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-gray-300">Privacy Policy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-gray-300">Terms of Service</button>
          </div>
        </footer>
      </div>
    );
  }

  // ==================== PAGE VIEW 4: DASHBOARD MAIN ====================
  return (
    <div className="min-h-screen bg-[#070a0f] text-white p-6 font-sans relative flex flex-col justify-between">
      
      {/* HIDDEN FILE INPUT DYNAMIC ACCEPT TYPE */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        multiple={mediaType === 'Carousel'}
        accept={mediaType === 'Photo' ? 'image/*' : mediaType === 'Video' ? 'video/*' : 'image/*'} 
        className="hidden" 
      />

      {/* BACKDROP FOR CLOSE DROPDOWNS */}
      {(isGroupOpen || isSortOpen || isDropdownOpen || isSelectAccountSortOpen || isGroupFilterOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-transparent" 
          onClick={() => { 
            setIsGroupOpen(false); 
            setIsSortOpen(false); 
            setIsDropdownOpen(false); 
            setIsSelectAccountSortOpen(false); 
            setIsGroupFilterOpen(false);
          }}
        />
      )}

      <div>
        {/* HEADER UTAMA DASHBOARD */}
        <header className="flex justify-between items-center mb-6 border-b border-gray-800/60 pb-4 relative z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">TT</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TT Connections</h1>
              <p className="text-xs text-gray-400">Business Account Dashboard</p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {/* LOGGED IN WA NUMBER BADGE */}
            <div className="bg-[#10141d] border border-cyan-400/40 text-cyan-400 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2">
              <span>📱 {currentUserWa}</span>
              <button 
                onClick={handleLogout}
                className="text-[10px] bg-cyan-400/20 hover:bg-cyan-400 hover:text-black text-cyan-300 px-2 py-0.5 rounded transition-all ml-1"
                title="Ganti Akun WhatsApp"
              >
                Ganti
              </button>
            </div>

            <div className="relative z-40">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="bg-cyan-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors flex items-center gap-2 text-xs"
              >
                + Add Account ▾
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#10141d] border border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
                  <a href="/api/auth/tiktok" className="block w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#1a212e] hover:text-white">
  Login on WEB
</a>
                  <button className="w-full text-left px-4 py-3 text-xs text-gray-300 hover:bg-[#1a212e] hover:text-white">
                    Login with QR
                  </button>
                </div>
              )}
            </div>
            <button className="border border-gray-800 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 text-xs">↻ Sync Data</button>
            <button className="border border-gray-800 px-4 py-2 rounded-lg text-green-500 hover:bg-gray-800 text-xs">💳 Rp 0</button>
            <button className="border border-gray-800 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 text-xs">⏱ 3 Years</button>
            <button onClick={handleLogout} className="border border-red-900/50 px-4 py-2 rounded-lg text-red-500 hover:bg-red-900/30 text-xs">Logout</button>
          </div>
        </header>

        {/* STATISTIK UTAMA */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative z-10">
          <div className="bg-[#10141d] p-5 rounded-xl border border-gray-800/80">
            <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">TOTAL FOLLOWERS</p>
            <h2 className="text-3xl font-bold mt-1">1</h2>
          </div>
          <div className="bg-[#10141d] p-5 rounded-xl border border-gray-800/80">
            <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">TOTAL POSTS</p>
            <h2 className="text-3xl font-bold mt-1">0</h2>
          </div>
          <div className="bg-[#10141d] p-5 rounded-xl border border-gray-800/80">
            <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">CONNECTED ACCOUNTS</p>
            <h2 className="text-3xl font-bold mt-1">{accounts.length}</h2>
          </div>
        </section>

        {/* TAB NAVIGASI */}
        <section className="relative z-20">
          <div className="flex justify-between items-center border-b border-gray-800/80 mb-6 text-xs font-semibold">
            <div className="flex gap-8">
              <button 
                onClick={() => setActiveTab('monitoring')} 
                className={`pb-3 flex items-center gap-2 ${activeTab === 'monitoring' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                🎛 Account Monitoring
              </button>
              <button 
                onClick={() => setActiveTab('upload')} 
                className={`pb-3 flex items-center gap-2 ${activeTab === 'upload' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                ✈ Upload / Post
              </button>
              <button 
                onClick={() => setActiveTab('scheduled')}
                className={`pb-3 flex items-center gap-2 ${activeTab === 'scheduled' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                📅 Scheduled <span className="bg-cyan-400 text-black text-[9px] px-1.5 py-0.2 rounded-full font-bold">{scheduledPosts.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab('groups')}
                className={`pb-3 flex items-center gap-2 ${activeTab === 'groups' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                🗂 Groups
              </button>
              <button 
                onClick={() => setActiveTab('proxy')}
                className={`pb-3 flex items-center gap-2 ${activeTab === 'proxy' ? 'border-b-2 border-cyan-400 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                🛡 Proxy
              </button>
            </div>

            {activeTab === 'scheduled' && (
              <div className="flex gap-2 pb-2">
                <button 
                  onClick={() => {}} 
                  className="w-8 h-8 bg-[#10141d] border border-gray-800 hover:border-cyan-400 text-gray-300 rounded-lg flex items-center justify-center text-xs transition-colors"
                  title="Refresh scheduled posts"
                >
                  ↻
                </button>
                <button 
                  onClick={() => setScheduledPosts([])} 
                  className="w-8 h-8 bg-[#10141d] border border-gray-800 hover:border-red-500 text-gray-400 hover:text-red-400 rounded-lg flex items-center justify-center text-xs transition-colors"
                  title="Delete scheduled posts"
                >
                  🗑
                </button>
              </div>
            )}
          </div>

          {/* ==================== TAB 1: ACCOUNT MONITORING ==================== */}
          {activeTab === 'monitoring' && (
            <div>
              <div className="flex justify-end items-center gap-3 mb-6">
                <div className="relative z-40">
                  <button onClick={() => setIsGroupOpen(!isGroupOpen)} className="bg-[#10141d] border border-gray-800 text-gray-200 px-4 py-2 rounded-lg text-xs flex items-center gap-3">
                    <span>{selectedGroup}</span> <span>▲</span>
                  </button>
                </div>
                <input type="text" placeholder="Search name or @use" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-[#10141d] border border-gray-800 text-white text-xs px-4 py-2 rounded-lg w-56 focus:outline-none" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {accounts.map((acc) => (
                  <AccountCard key={acc.id} username={acc.username} followers={acc.followers} following={acc.following} likes={acc.likes} videos={acc.videos} openId={acc.openId} />
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 2: UPLOAD / POST (FORM UTAMA) ==================== */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* KOLOM KIRI: SETTING MEDIA & CAPTION (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* 1. MEDIA TYPE & NOTE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                        📷 MEDIA TYPE
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Photo', 'Video', 'Carousel'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => { setMediaType(type); setUploadedFile(null); setFilePreview(null); setCarouselItems([]); }}
                            className={`py-2 px-3 text-xs rounded-lg font-medium border transition-all ${
                              mediaType === type 
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-semibold' 
                                : 'bg-[#070a0f] border-gray-800 text-gray-400 hover:text-white'
                            }`}
                          >
                            {type === 'Photo' ? '📷 Photo' : type === 'Video' ? '🎥 Video' : '🖼 Carousel'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                        📝 NOTE (OPTIONAL)
                      </p>
                      <input
                        type="text"
                        placeholder="For your internal use — appears in History & Excel"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3 py-2.5 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  {/* 2. MEDIA SOURCE & UPLOAD AREA / URL */}
                  <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80">
                    <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      🗂 MEDIA SOURCE
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setMediaSource('Upload')}
                        className={`px-4 py-1.5 text-xs rounded-lg border font-medium ${
                          mediaSource === 'Upload' 
                            ? 'bg-cyan-400 text-black border-cyan-400 font-semibold' 
                            : 'bg-[#070a0f] border-gray-800 text-gray-400'
                        }`}
                      >
                        📤 Upload File
                      </button>
                      <button
                        onClick={() => setMediaSource('URL')}
                        className={`px-4 py-1.5 text-xs rounded-lg border font-medium ${
                          mediaSource === 'URL' 
                            ? 'bg-cyan-400 text-black border-cyan-400 font-semibold' 
                            : 'bg-[#070a0f] border-gray-800 text-gray-400'
                        }`}
                      >
                        🔗 Use URL
                      </button>
                    </div>

                    {mediaSource === 'Upload' ? (
                      <div 
                        onClick={handleDropAreaClick}
                        className="border-2 border-dashed border-gray-800 hover:border-cyan-400/80 rounded-xl p-8 text-center cursor-pointer bg-[#070a0f]/50 transition-colors group relative"
                      >
                        {mediaType === 'Carousel' && carouselItems.length > 0 ? (
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {carouselItems.map((file, idx) => (
                                <div key={idx} className="relative w-16 h-16 rounded border border-cyan-400/50 overflow-hidden bg-[#10141d]">
                                  <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); setCarouselItems(carouselItems.filter((_, i) => i !== idx)); }}
                                    className="absolute top-0 right-0 bg-black/80 text-white text-[10px] px-1 hover:text-red-400"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs font-bold text-cyan-400">{carouselItems.length} Foto Terpilih</p>
                          </div>
                        ) : uploadedFile ? (
                          <div className="space-y-3">
                            {filePreview ? (
                              <img src={filePreview} alt="Preview" className="w-24 h-24 object-cover mx-auto rounded-lg border border-cyan-400/50" />
                            ) : (
                              <div className="w-16 h-16 bg-cyan-400/10 text-cyan-400 rounded-lg flex items-center justify-center mx-auto text-2xl">🎬</div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-cyan-400">{uploadedFile.name}</p>
                              <p className="text-[10px] text-gray-500">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setFilePreview(null); }}
                              className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] px-3 py-1 rounded hover:bg-red-500/30"
                            >
                              Hapus File
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="w-10 h-10 bg-cyan-400/10 text-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-3 font-bold group-hover:bg-cyan-400 group-hover:text-black transition-colors">
                              {mediaType === 'Carousel' ? '🖼' : '⇪'}
                            </div>
                            <p className="text-xs font-bold text-white mb-1">
                              {mediaType === 'Carousel' ? 'Drag & Drop carousel images' : mediaType === 'Video' ? 'Drag & Drop video here' : 'Drag & Drop photo here'}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {mediaType === 'Carousel' ? 'or click to select (min 2, max 10)' : mediaType === 'Video' ? 'or click to choose a video file' : 'or click to choose an image file'}
                            </p>
                            <span className="inline-block bg-[#10141d] border border-gray-800 text-[10px] text-gray-400 px-2.5 py-1 rounded-md mt-3">
                              {mediaType === 'Carousel' ? 'JPG, PNG, WebP - Max 8MB' : mediaType === 'Video' ? 'MP4 - Max 500MB' : 'JPG, PNG, WebP - Max 8MB'}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="https://example.com/photo.jpg" 
                          className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3.5 py-2.5 rounded-lg text-white focus:outline-none focus:border-cyan-400 font-mono"
                        />
                        <p className="text-[11px] text-gray-500">
                          {mediaType === 'Video' ? 'Single video URL — must be downloadable by TikTok.' : 'Single image URL — must be downloadable by TikTok.'}
                        </p>
                      </div>
                    )}

                    {mediaType === 'Carousel' && (
                      <div className="mt-4 pt-3 border-t border-gray-800/80 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-gray-300">CAROUSEL ({carouselItems.length})</span>
                        </div>
                        <p className="text-[10px] text-gray-500">Minimum 2 photos — content pool is not supported.</p>
                        <button 
                          onClick={handleDropAreaClick}
                          className="w-full py-2.5 border border-dashed border-gray-800 hover:border-cyan-400 text-gray-300 text-xs rounded-lg flex justify-center items-center gap-2 hover:bg-[#070a0f] transition-colors"
                        >
                          <span className="text-cyan-400 font-bold">+</span> Add Item (min 2, max 10)
                        </button>
                      </div>
                    )}

                  </div>

                  {/* 3. CAPTION & HASHTAGS WITH ACTION BUTTONS */}
                  <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80 space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
                        ✏ CAPTION
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono">{caption.length} / 2200</span>
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Write caption... #fyp #viral"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full bg-[#070a0f] border border-gray-800 text-xs p-3 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 font-mono"
                    />

                    <div>
                      <p className="text-[10px] text-gray-500 mb-2">Hashtag saat ini:</p>
                      <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center">
                        <div className="flex-1 flex flex-wrap gap-1.5 items-center bg-[#070a0f] p-2.5 rounded-lg border border-gray-800">
                          {hashtags.map((tag, idx) => (
                            <span key={idx} className="bg-[#10141d] border border-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                              {tag}
                              <button onClick={() => setHashtags(hashtags.filter((_, i) => i !== idx))} className="text-gray-500 hover:text-white">×</button>
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-1.5 items-center">
                          <input 
                            type="text" 
                            placeholder="#new-hashtag" 
                            value={newHashtagInput}
                            onChange={(e) => setNewHashtagInput(e.target.value)}
                            className="bg-[#070a0f] border border-gray-800 text-xs px-2.5 py-2 rounded-lg text-white w-28 focus:outline-none focus:border-cyan-400"
                          />
                          <button onClick={handleAddCustomHashtag} className="bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 p-2 rounded-lg text-xs font-bold">+</button>
                          <button onClick={() => setHashtags(['#fyp', '#foryou', '#viral', '#trending', '#threads', '#reels', '#explore', '#love'])} className="bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 p-2 rounded-lg text-xs">🎲</button>
                          <button onClick={() => setHashtags([])} className="bg-[#070a0f] border border-gray-800 hover:border-red-500 text-red-400 p-2 rounded-lg text-xs">🗑</button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] text-gray-500">AI caption paraphrase:</p>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <input 
                          type="text" 
                          placeholder="OpenRouter API key (optional)" 
                          className="md:col-span-8 bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none"
                        />
                        <select 
                          value={selectedAiModel}
                          onChange={(e) => setSelectedAiModel(e.target.value)}
                          className="md:col-span-4 bg-[#070a0f] border border-cyan-400/80 text-xs px-3 py-2 rounded-lg text-white focus:outline-none font-mono cursor-pointer"
                        >
                          <option value="openai/gpt-4o-mini" className="bg-[#10141d] text-cyan-400 font-bold">openai/gpt-4o-mini</option>
                          <option value="google/gemini-3-flash-preview" className="bg-[#10141d] text-white">google/gemini-3-flash-preview</option>
                          <option value="anthropic/claude-sonnet-4.6" className="bg-[#10141d] text-white">anthropic/claude-sonnet-4.6</option>
                          <option value="openai/gpt-5.4" className="bg-[#10141d] text-white">openai/gpt-5.4</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. CONTENT POOL */}
                  <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80 space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
                        🔀 CONTENT POOL (RANDOM DISTRIBUTION)
                      </p>
                      <div className="flex bg-[#070a0f] p-1 rounded-lg border border-gray-800 text-[11px]">
                        <button 
                          onClick={() => setDistributionMode('Random')}
                          className={`px-3 py-1 rounded-md ${distributionMode === 'Random' ? 'bg-cyan-400 text-black font-semibold' : 'text-gray-400'}`}
                        >
                          🔀 Random
                        </button>
                        <button 
                          onClick={() => setDistributionMode('Sequential')}
                          className={`px-3 py-1 rounded-md ${distributionMode === 'Sequential' ? 'bg-cyan-400 text-black font-semibold' : 'text-gray-400'}`}
                        >
                          ⇇ Sequential
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 rounded-lg flex items-center justify-center text-sm font-bold">+</button>
                      <button className="w-8 h-8 bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 rounded-lg flex items-center justify-center text-xs">🎲</button>
                    </div>
                  </div>

                </div>

                {/* KOLOM KANAN: SELECT ACCOUNTS & SCHEDULE DATE PICKER (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  <div className="bg-[#10141d] p-4 rounded-xl border border-gray-800/80 space-y-4 relative z-20">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                        👥 SELECT ACCOUNTS
                      </p>
                      <span className="bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                        {selectedAccountIds.length} SELECTED
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="grid grid-cols-12 gap-2">
                        <select className="col-span-8 bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-gray-300 focus:outline-none">
                          <option>Select Group (optional)</option>
                          <option>Group A</option>
                          <option>Group B</option>
                        </select>
                        <input 
                          type="text" 
                          placeholder="Account quantity" 
                          value={accountQuantity}
                          onChange={(e) => setAccountQuantity(e.target.value)}
                          className="col-span-4 bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500">Group: auto-select; fill quantity to limit selection.</p>
                    </div>

                    <div className="flex gap-2 items-center relative z-20">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="Search accounts..." 
                          value={accountSearch}
                          onChange={(e) => setAccountSearch(e.target.value)}
                          className="w-full bg-[#070a0f] border border-gray-800 text-xs pl-8 pr-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none"
                        />
                        <span className="absolute left-2.5 top-2 text-xs text-gray-500">🔍</span>
                      </div>

                      <button 
                        onClick={handleSelectAllAccounts}
                        className="bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 text-xs px-3 py-2 rounded-lg font-medium"
                      >
                        ✓ All
                      </button>

                      <div className="relative z-40">
                        <button 
                          onClick={() => setIsSelectAccountSortOpen(!isSelectAccountSortOpen)}
                          className={`border border-gray-800 p-2 rounded-lg transition-colors flex items-center justify-center ${
                            isSelectAccountSortOpen ? 'bg-cyan-400 text-black border-cyan-400' : 'bg-[#070a0f] text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                        </button>

                        {isSelectAccountSortOpen && (
                          <div className="absolute right-0 top-full mt-2 w-72 bg-[#10141d] border border-gray-800 rounded-xl shadow-2xl z-50 p-4">
                            <h4 className="text-white font-bold text-xs mb-1">Sort accounts</h4>
                            <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                              Sort order in Select Accounts. Default: highest followers.
                            </p>
                            <div className="space-y-1.5">
                              {[
                                "Highest followers",
                                "Highest following",
                                "Highest likes",
                                "Highest videos",
                                "Account name (A-Z)"
                              ].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setSelectAccountSort(option);
                                    setIsSelectAccountSortOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                                    selectAccountSort === option
                                      ? 'bg-cyan-400 text-black font-semibold'
                                      : 'bg-[#070a0f] text-gray-300 hover:bg-gray-800 border border-gray-800/60'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* GRID KARTU AKUN SCROLLABLE */}
                    <div className="max-h-[300px] overflow-y-auto pr-1 grid grid-cols-3 gap-2">
                      {processedSelectAccounts.map((acc) => {
                        const isSelected = selectedAccountIds.includes(acc.id);
                        return (
                          <div 
                            key={acc.id}
                            onClick={() => toggleAccountSelect(acc.id)}
                            className={`p-2 rounded-lg border cursor-pointer transition-all flex flex-col justify-between text-left ${
                              isSelected 
                                ? 'bg-cyan-500/10 border-cyan-400/80' 
                                : 'bg-[#070a0f] border-gray-800/80 hover:border-gray-700'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-cyan-400/50">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${acc.username}`} alt="" />
                              </div>
                              <input 
                                type="checkbox" 
                                checked={isSelected} 
                                onChange={() => {}} 
                                className="accent-cyan-400 rounded cursor-pointer"
                              />
                            </div>
                            <p className="text-[11px] font-bold truncate text-white">@{acc.username}</p>
                            <p className="text-[9px] text-gray-500">👥 0 —</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* TOMBOL MODE POST NOW / SCHEDULE */}
                    <div className="pt-2 space-y-3">
                      <div className="grid grid-cols-2 gap-2 bg-[#070a0f] p-1 rounded-lg border border-gray-800">
                        <button 
                          onClick={() => setPostMode('Post Now')}
                          className={`py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${postMode === 'Post Now' ? 'bg-cyan-400 text-black' : 'text-gray-400'}`}
                        >
                          📄 Post Now
                        </button>
                        <button 
                          onClick={() => setPostMode('Schedule')}
                          className={`py-2 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${postMode === 'Schedule' ? 'bg-cyan-400 text-black' : 'text-gray-400'}`}
                        >
                          📅 Schedule
                        </button>
                      </div>

                      {postMode === 'Schedule' && (
                        <div className="space-y-1.5 relative">
                          <p className="text-[10px] text-gray-400">Posting Date & Time</p>
                          <div 
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className="bg-[#070a0f] border border-gray-800 rounded-lg px-3 py-2 text-xs text-white flex justify-between items-center cursor-pointer font-mono"
                          >
                            <span>{scheduledDateTime}</span>
                            <span className="text-gray-400 text-xs">📅</span>
                          </div>
                          <p className="text-[10px] text-gray-500">Minimum 5 minutes from now. Time zone: WIB(Asia/Jakarta).</p>

                          {isDatePickerOpen && (
                            <div className="bg-[#10141d] border border-gray-800 rounded-xl p-3 shadow-2xl z-50 text-xs space-y-3">
                              <div className="flex justify-between items-center border-b border-gray-800/80 pb-2">
                                <select className="bg-transparent text-white font-bold focus:outline-none cursor-pointer">
                                  <option>October 2026</option>
                                  <option>November 2026</option>
                                </select>
                                <div className="flex gap-1 text-gray-400 text-xs">
                                  <button className="p-1 hover:text-white">↑</button>
                                  <button className="p-1 hover:text-white">↓</button>
                                </div>
                              </div>

                              <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-8">
                                  <div className="grid grid-cols-7 text-center text-[10px] text-gray-500 font-bold mb-1">
                                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                                  </div>
                                  <div className="grid grid-cols-7 text-center text-[11px] gap-y-1">
                                    <span className="text-gray-600">27</span><span className="text-gray-600">28</span><span className="text-gray-600">29</span><span className="text-gray-600">30</span><span>1</span><span>2</span><span>3</span>
                                    <span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                                    {[11, 12, 13, 14, 15, 16, 17].map(d => (
                                      <button 
                                        key={d} 
                                        onClick={() => handleSelectDate(d)}
                                        className={`p-1 rounded font-medium ${selectedDay === d ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-800 text-white'}`}
                                      >
                                        {d}
                                      </button>
                                    ))}
                                    {[18, 19, 20, 21, 22, 23, 24].map(d => (
                                      <button 
                                        key={d} 
                                        onClick={() => handleSelectDate(d)}
                                        className={`p-1 rounded font-medium ${selectedDay === d ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-800 text-white'}`}
                                      >
                                        {d}
                                      </button>
                                    ))}
                                    {[25, 26, 27, 28, 29, 30, 31].map(d => (
                                      <button 
                                        key={d} 
                                        onClick={() => handleSelectDate(d)}
                                        className={`p-1 rounded font-medium ${selectedDay === d ? 'bg-cyan-400 text-black font-bold' : 'hover:bg-gray-800 text-white'}`}
                                      >
                                        {d}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="col-span-4 border-l border-gray-800 pl-2 grid grid-cols-2 gap-1 max-h-36 overflow-y-auto text-center font-mono">
                                  <div>
                                    {["16", "17", "18", "19", "20", "21", "22"].map(hr => (
                                      <div 
                                        key={hr}
                                        onClick={() => handleSelectHour(hr)}
                                        className={`py-0.5 rounded cursor-pointer ${selectedHour === hr ? 'bg-cyan-400 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                                      >
                                        {hr}
                                      </div>
                                    ))}
                                  </div>
                                  <div>
                                    {["50", "51", "52", "53", "54", "55", "56", "57"].map(mn => (
                                      <div 
                                        key={mn}
                                        onClick={() => handleSelectMinute(mn)}
                                        className={`py-0.5 rounded cursor-pointer ${selectedMinute === mn ? 'bg-cyan-400 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                                      >
                                        {mn}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-gray-800/80 text-[10px]">
                                <button onClick={() => setScheduledDateTime("")} className="text-cyan-400 hover:underline">Clear</button>
                                <button onClick={() => handleSelectDate(11)} className="text-cyan-400 hover:underline">Today</button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <button 
                        onClick={() => alert(`Penjadwalan post untuk ${selectedAccountIds.length} akun pada ${scheduledDateTime} oleh akun WA: ${currentUserWa}!`)}
                        className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 rounded-lg shadow-lg shadow-cyan-400/20 transition-colors flex justify-center items-center gap-2 text-sm"
                      >
                        {postMode === 'Schedule' ? '📅 Schedule Post' : '🚀 Send'}
                      </button>
                    </div>

                  </div>

                </div>

              </div>

              {/* TABEL POSTING HISTORY */}
              <div className="bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <p className="text-xs font-bold text-gray-300 tracking-wider uppercase flex items-center gap-2">
                    ⏱ POSTING HISTORY
                  </p>
                  <div className="flex gap-2">
                    <button className="bg-[#070a0f] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800">↻ Refresh</button>
                    <button className="bg-[#070a0f] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800">📊 Summary</button>
                    <button className="bg-[#070a0f] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800">↺ Retry</button>
                    <button className="bg-[#070a0f] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-800">📥 Download Excel</button>
                    <button className="bg-[#070a0f] border border-red-900/40 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-900/20">🗑 Delete</button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="bg-[#070a0f] border border-gray-800 text-white px-2 py-1 rounded focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <input type="text" className="bg-[#070a0f] border border-gray-800 text-white px-3 py-1 rounded focus:outline-none w-48" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-400">
                    <thead className="bg-[#070a0f] text-gray-400 font-bold uppercase tracking-wider text-[10px] border-y border-gray-800">
                      <tr>
                        <th className="p-3">TIME</th>
                        <th className="p-3">ACCOUNT</th>
                        <th className="p-3">TYPE</th>
                        <th className="p-3">NOTE</th>
                        <th className="p-3">CAPTION</th>
                        <th className="p-3">STATUS</th>
                        <th className="p-3">LINK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500 italic">
                          No data available in table
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                  <p>Showing 0 to 0 of 0 entries</p>
                  <div className="flex gap-2">
                    <button className="bg-[#070a0f] border border-gray-800 px-3 py-1 rounded text-gray-600 cursor-not-allowed">Previous</button>
                    <button className="bg-[#070a0f] border border-gray-800 px-3 py-1 rounded text-gray-600 cursor-not-allowed">Next</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==================== TAB 3: SCHEDULED POSTS ==================== */}
          {activeTab === 'scheduled' && (
            <div className="py-20 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-xl font-bold mb-4 shadow-lg shadow-cyan-400/10">
                ✕
              </div>
              <p className="text-xs text-gray-400 font-medium">No scheduled posts yet.</p>
            </div>
          )}

          {/* ==================== TAB 4: GROUPS ==================== */}
          {activeTab === 'groups' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* PANEL 1: CREATE / EDIT GROUP */}
              <div className="lg:col-span-3 bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-4 h-fit">
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-cyan-400 font-bold">⊕</span> CREATE / EDIT GROUP
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Group Name</label>
                    <input 
                      type="text" 
                      placeholder="Example: Brand A" 
                      value={groupNameInput}
                      onChange={(e) => setGroupNameInput(e.target.value)}
                      className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Initials (optional)</label>
                    <input 
                      type="text" 
                      placeholder="BRD" 
                      value={groupInitialsInput}
                      onChange={(e) => setGroupInitialsInput(e.target.value)}
                      className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Group Logo (PNG/JPG/WebP)</label>
                    <div className="flex items-center bg-[#070a0f] border border-gray-800 rounded-lg p-1">
                      <input 
                        type="file" 
                        ref={logoInputRef}
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => e.target.files?.[0] && setGroupLogoFile(e.target.files[0])}
                        className="hidden" 
                        id="logo-upload"
                      />
                      <label 
                        htmlFor="logo-upload"
                        className="bg-[#10141d] border border-gray-800 hover:border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded cursor-pointer font-medium"
                      >
                        Choose File
                      </label>
                      <span className="text-[11px] text-gray-500 ml-3 truncate">
                        {groupLogoFile ? groupLogoFile.name : "No file chosen"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleSaveGroup}
                      className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-400/10"
                    >
                      💾 Save
                    </button>
                    <button 
                      onClick={handleResetGroupForm}
                      className="bg-[#070a0f] border border-gray-800 hover:bg-gray-800 text-gray-300 text-xs px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* PANEL 2: GROUP LIST */}
              <div className="lg:col-span-4 bg-[#10141d] p-5 rounded-xl border border-gray-800/80 min-h-[320px] flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    🗂 GROUP LIST
                  </p>

                  {groupsList.length === 0 ? (
                    <div className="py-20 text-center text-xs text-gray-400 font-medium">
                      No groups yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {groupsList.map((grp, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedGroupIndex(idx)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${
                            selectedGroupIndex === idx 
                              ? 'bg-cyan-500/10 border-cyan-400 text-white' 
                              : 'bg-[#070a0f] border-gray-800 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
                              {grp.initials}
                            </div>
                            <div>
                              <p className="text-xs font-bold">{grp.name}</p>
                              <p className="text-[10px] text-gray-500">{grp.members.length} Members</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">➔</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* PANEL 3: SELECT MEMBERS */}
              <div className="lg:col-span-5 bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-4 flex flex-col justify-between min-h-[320px] relative z-20">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                      👥 SELECT MEMBERS
                    </p>
                    <span className="bg-cyan-400 text-black text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                      {selectedMemberIds.length} SELECTED
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-400">
                    Select a group first to manage members.
                  </p>

                  <div className="flex gap-2 items-center relative z-30">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="Search accounts..." 
                        value={groupMemberSearch}
                        onChange={(e) => setGroupMemberSearch(e.target.value)}
                        className="w-full bg-[#070a0f] border border-gray-800 text-xs pl-8 pr-3 py-2 rounded-lg text-white placeholder-gray-600 focus:outline-none"
                      />
                      <span className="absolute left-2.5 top-2 text-xs text-gray-500">🔍</span>
                    </div>

                    <button className="bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 text-xs px-3 py-2 rounded-lg font-medium">
                      ✓ All
                    </button>

                    <div className="relative z-40">
                      <button 
                        onClick={() => setIsGroupFilterOpen(!isGroupFilterOpen)}
                        className="bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 text-xs px-3 py-2 rounded-lg font-medium flex items-center gap-1.5"
                      >
                        <span>▾ Filter</span>
                      </button>

                      {isGroupFilterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-[#10141d] border border-gray-800 rounded-xl shadow-2xl z-50 p-2 space-y-1">
                          {[
                            "Group priority order",
                            "Recently added accounts",
                            "Active accounts",
                            "Suspended accounts"
                          ].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => {
                                setGroupFilterOption(opt);
                                setIsGroupFilterOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                groupFilterOption === opt
                                  ? 'bg-cyan-400 text-black font-semibold shadow-md shadow-cyan-400/20'
                                  : 'bg-[#070a0f] text-gray-300 hover:bg-gray-800'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="py-16 text-center text-xs text-gray-400 font-medium">
                    Select a group first.
                  </div>
                </div>

                <button 
                  onClick={() => alert("Members saved!")}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-400/10"
                >
                  💾 Save Members
                </button>
              </div>

            </div>
          )}

          {/* ==================== TAB 5: PROXY ==================== */}
          {activeTab === 'proxy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* KOLOM KIRI: PENGATURAN PROXY */}
              <div className="lg:col-span-4 bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-5 h-fit">
                <p className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  ⚙ PENGATURAN PROXY
                </p>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsProxyEnabled(!isProxyEnabled)}
                    className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                      isProxyEnabled ? 'bg-cyan-400' : 'bg-gray-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isProxyEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                  <span className="text-xs text-gray-300 font-medium">Aktifkan proxy untuk posting</span>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] text-gray-400">Mode</p>
                  <div className="flex gap-6 items-center text-xs text-gray-300 font-medium">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="proxyMode" 
                        checked={proxyMode === 'Rotate'} 
                        onChange={() => setProxyMode('Rotate')}
                        className="accent-cyan-400"
                      />
                      <span>Rotate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="proxyMode" 
                        checked={proxyMode === 'Sticky'} 
                        onChange={() => setProxyMode('Sticky')}
                        className="accent-cyan-400"
                      />
                      <span>Sticky</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">URL Proxy (</span>
                    <a href="https://lightningproxies.net" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                      LightningProxies
                    </a>
                    <span className="text-gray-400">)</span>
                  </div>
                  <textarea
                    rows={8}
                    value={proxyUrl}
                    onChange={(e) => setProxyUrl(e.target.value)}
                    className="w-full bg-[#070a0f] border border-gray-800 text-xs p-3 rounded-lg text-white focus:outline-none focus:border-cyan-400 font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-gray-500">
                    Tidak wajib — nonaktifkan jika posting direct dari server.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Proxy Retry</label>
                    <input 
                      type="text" 
                      value={proxyRetry}
                      onChange={(e) => setProxyRetry(e.target.value)}
                      className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Paralel</label>
                    <input 
                      type="text" 
                      value={proxyParallel}
                      onChange={(e) => setProxyParallel(e.target.value)}
                      className="w-full bg-[#070a0f] border border-gray-800 text-xs px-3 py-2 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => alert("Pengaturan Proxy berhasil disimpan!")}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-400/10"
                >
                  💾 Simpan Pengaturan
                </button>
              </div>

              {/* KOLOM KANAN: LOGS PROXY */}
              <div className="lg:col-span-8 bg-[#10141d] p-5 rounded-xl border border-gray-800/80 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    📑 LOGS PROXY
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {}} 
                      className="w-8 h-8 bg-[#070a0f] border border-gray-800 hover:border-cyan-400 text-gray-300 rounded-lg flex items-center justify-center text-xs transition-colors"
                      title="Refresh logs"
                    >
                      ↻
                    </button>
                    <button 
                      onClick={() => setProxyLogs([])} 
                      className="w-8 h-8 bg-[#070a0f] border border-gray-800 hover:border-red-500 text-gray-400 hover:text-red-400 rounded-lg flex items-center justify-center text-xs transition-colors"
                      title="Delete logs"
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400">
                  Data otomatis dihapus setelah 1 hari. Logs akun suspended juga dihapus.
                </p>

                <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span>Show</span>
                    <select className="bg-[#070a0f] border border-gray-800 text-white px-2 py-1 rounded focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Search:</span>
                    <input 
                      type="text" 
                      value={proxyLogSearch}
                      onChange={(e) => setProxyLogSearch(e.target.value)}
                      className="bg-[#070a0f] border border-gray-800 text-white px-3 py-1 rounded focus:outline-none w-48 text-xs" 
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-400">
                    <thead className="bg-[#070a0f] text-gray-400 font-bold uppercase tracking-wider text-[10px] border-y border-gray-800">
                      <tr>
                        <th className="p-3">WAKTU</th>
                        <th className="p-3">AKUN</th>
                        <th className="p-3">EVENT</th>
                        <th className="p-3">STATUS</th>
                        <th className="p-3">IP / LOKASI</th>
                        <th className="p-3">SID</th>
                        <th className="p-3">SISA SESSION</th>
                        <th className="p-3">PESAN</th>
                        <th className="p-3">LINK</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-gray-500 italic">
                          No data available in table
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                  <p>Showing 0 to 0 of 0 entries</p>
                  <div className="flex gap-2">
                    <button className="bg-[#070a0f] border border-gray-800 px-3 py-1 rounded text-gray-600 cursor-not-allowed">Previous</button>
                    <button className="bg-[#070a0f] border border-gray-800 px-3 py-1 rounded text-gray-600 cursor-not-allowed">Next</button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </section>
      </div>

      {/* FOOTER DASHBOARD */}
      <footer className="mt-16 border-t border-gray-800/60 pt-6 flex justify-between items-center text-xs text-gray-500">
        <p>© 2026 TT Connections. All rights reserved.</p>
        <div className="flex gap-6">
          <button onClick={() => setCurrentPage('privacy')} className="hover:text-gray-300">Privacy Policy</button>
          <button onClick={() => setCurrentPage('terms')} className="hover:text-gray-300">Terms of Service</button>
        </div>
      </footer>

    </div>
  );
}
