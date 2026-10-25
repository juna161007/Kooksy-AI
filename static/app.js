
"use strict";

/* ============================================================
   KOOKSY AI â€” MAIN FRONTEND JAVASCRIPT
   File: static/app.js
   ============================================================ */

(() => {
  /* ---------------- 1. CONFIGURATION ---------------- */

  const API = {
    chat: "/api/chat",
    analyzeFile: "/api/analyze-file",
    history: "/api/history",
    goal: "/api/goal",
    creator: "/api/website-creator",
    feedback: "/api/feedback",
    logout: "/logout"
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_MESSAGE_LENGTH = 1_000_000;

  const ALLOWED_FILE_EXTENSIONS = [
    "csv", "txt", "md", "pdf", "docx",
    "json", "py", "html", "css", "js", "log"
  ];

  const LANGUAGE_VOICES = {
    en: "en-IN",
    "zh-CN": "zh-CN",
    hi: "hi-IN",
    es: "es-ES",
    ar: "ar-SA",
    fr: "fr-FR",
    bn: "bn-IN",
    pt: "pt-BR",
    ru: "ru-RU",
    ur: "ur-PK",
    ja: "ja-JP",
    de: "de-DE",
    ta: "ta-IN",
    te: "te-IN",
    ko: "ko-KR"
  };

  /* ---------------- 2. TRANSLATIONS ---------------- */

  const translations = {
    en: {
      assistant: "AI Assistant",
      history: "Echoes of Time",
      goal: "Agent Goal",
      creator: "Website Creator",
      feedback: "Feedback",
      newChat: "ï¼‹ New Chat",
      send: "Send â†‘",
      logout: "Log out",
      welcomeTitle: "Intelligence with a Spark.",
      welcomeText:
        "Ask questions, continue a conversation, analyse a file, or turn your idea into a website project.",
      welcomeEyebrow: "KOOKSY AI Â· YOUR AI WORKSPACE",
      prompt: "Message Kooksy AIâ€¦",
      upload: "ï¼‹ Analyse a file",
      fileHelp: "CSV, TXT, MD, PDF, DOCX, JSON, PY, HTML, CSS, JS, LOG Â· Max 10 MB",
      aiDisclaimer:
        "AI can make mistakes. Verify important information and review generated code before using it.",
      suggestions: [
        "Explain AI in simple words",
        "Help me plan a project",
        "Write and explain Python code"
      ],
      historyTitle: "Echoes of Time",
      historyDescription:
        "Open a previous conversation or delete one you no longer need.",
      historyLoading: "Loading your conversationsâ€¦",
      noHistory: "No saved conversations yet.",
      goalTitle: "Turn a goal into a plan",
      goalDescription:
        "Describe a task. Kooksy AI will outline steps, success criteria, risks and limitations.",
      goalLabel: "What do you want to achieve?",
      goalPlaceholder:
        "Example: Plan a student portfolio website and explain how to publish itâ€¦",
      goalButton: "Generate plan âœ¦",
      creatorTitle: "Website Creator",
      creatorDescription:
        "Describe your idea. Generate frontend and backend code with deployment instructions.",
      ideaLabel: "Describe your website or project idea",
      ideaPlaceholder:
        "Describe your website, required features, design, frontend, backend and databaseâ€¦",
      creatorButton: "Generate project âœ¦",
      creatorDisclaimer:
        "Kooksy AI generates code and deployment guidance. It does not deploy your website automatically. Test generated code before production use.",
      feedbackTitle: "Share your feedback",
      feedbackDescription: "Tell us about your experience with Kooksy AI.",
      name: "Name",
      role: "Role",
      state: "State",
      rating: "Star rating",
      feedbackLabel: "Feedback",
      feedbackPlaceholder: "What worked well? What could improve?",
      submitFeedback: "Submit feedback",
      loading: "Please waitâ€¦",
      listening: "Listeningâ€¦ Speak now.",
      voiceUnsupported: "Voice recognition is not supported by this browser.",
      voicePermission: "Please allow microphone access and try again.",
      emptyMessage: "Please enter a message first.",
      fileTooLarge: "The file exceeds the 10 MB limit.",
      invalidFile: "This file type is not supported.",
      fileSelected: "File selected",
      analyzing: "Analysing fileâ€¦",
      fileSuccess: "File analysis completed.",
      fileFailed: "File analysis failed.",
      chatFailed: "Unable to get an AI response. Please try again.",
      goalFailed: "Unable to generate a plan. Please try again.",
      creatorFailed: "Unable to generate the project. Please try again.",
      feedbackSuccess: "Thank you! Your feedback was submitted.",
      feedbackFailed: "Unable to submit feedback. Please try again.",
      chooseRating: "Please choose a star rating.",
      historyFailed: "Unable to load chat history.",
      historyDelete: "Delete",
      historyOpen: "Open",
      confirmDelete: "Delete this conversation?",
      deleteFailed: "Unable to delete this conversation.",
      deleteSuccess: "Conversation deleted.",
      copied: "Copied to clipboard.",
      copyFailed: "Unable to copy text.",
      speechUnavailable: "Speech output is not supported by this browser.",
      networkError: "Network error. Check your connection and try again.",
      sessionExpired: "Your session may have expired. Please log in again.",
      planOnly:
        "This feature creates a plan only. It does not independently perform external actions.",
      generatedCode: "Generated project",
      download: "Download",
      speak: "Read aloud",
      stopSpeaking: "Stop speaking",
      copy: "Copy",
      user: "You",
      ai: "Kooksy AI",
      emptyGoal: "Please describe your goal.",
      emptyIdea: "Please describe your website idea.",
      emptyFeedback: "Please enter your feedback.",
      charLimit: "Character limit reached."
    },

    "zh-CN": {
      assistant: "AI åŠ©æ‰‹",
      history: "å¯¹è¯åŽ†å²",
      goal: "ç›®æ ‡è§„åˆ’",
      creator: "ç½‘ç«™åˆ›å»ºå™¨",
      feedback: "åé¦ˆ",
      newChat: "ï¼‹ æ–°å¯¹è¯",
      send: "å‘é€ â†‘",
      logout: "é€€å‡ºç™»å½•",
      welcomeTitle: "æ™ºæ…§ï¼Œçµæ„Ÿé—ªè€€ã€‚",
      welcomeText: "æé—®ã€ç»§ç»­å¯¹è¯ã€åˆ†æžæ–‡ä»¶ï¼Œæˆ–å°†æƒ³æ³•è½¬åŒ–ä¸ºç½‘ç«™é¡¹ç›®ã€‚",
      welcomeEyebrow: "KOOKSY AI Â· æ‚¨çš„ AI å·¥ä½œç©ºé—´",
      prompt: "å‘ Kooksy AI å‘é€æ¶ˆæ¯â€¦",
      upload: "ï¼‹ åˆ†æžæ–‡ä»¶",
      suggestions: ["ç”¨ç®€å•è¯­è¨€è§£é‡Š AI", "å¸®åŠ©æˆ‘è§„åˆ’é¡¹ç›®", "ç¼–å†™å¹¶è§£é‡Š Python ä»£ç "],
      historyTitle: "å¯¹è¯åŽ†å²",
      historyDescription: "æ‰“å¼€ä»¥å‰çš„å¯¹è¯æˆ–åˆ é™¤ä¸å†éœ€è¦çš„å¯¹è¯ã€‚",
      historyLoading: "æ­£åœ¨åŠ è½½å¯¹è¯â€¦",
      noHistory: "æš‚æ— ä¿å­˜çš„å¯¹è¯ã€‚",
      goalTitle: "å°†ç›®æ ‡è½¬åŒ–ä¸ºè®¡åˆ’",
      goalDescription: "æè¿°ä»»åŠ¡ï¼ŒAI å°†åˆ—å‡ºæ­¥éª¤ã€æˆåŠŸæ ‡å‡†ã€é£Žé™©å’Œé™åˆ¶ã€‚",
      goalLabel: "ä½ æƒ³å®žçŽ°ä»€ä¹ˆç›®æ ‡ï¼Ÿ",
      goalPlaceholder: "ä¾‹å¦‚ï¼šè§„åˆ’ä¸€ä¸ªå­¦ç”Ÿä½œå“é›†ç½‘ç«™ï¼Œå¹¶è¯´æ˜Žå¦‚ä½•å‘å¸ƒâ€¦",
      goalButton: "ç”Ÿæˆè®¡åˆ’ âœ¦",
      creatorTitle: "ç½‘ç«™åˆ›å»ºå™¨",
      creatorDescription: "æè¿°ä½ çš„æƒ³æ³•ï¼Œç”Ÿæˆå‰ç«¯ã€åŽç«¯ä»£ç å’Œéƒ¨ç½²è¯´æ˜Žã€‚",
      ideaLabel: "æè¿°ä½ çš„ç½‘ç«™æˆ–é¡¹ç›®æƒ³æ³•",
      ideaPlaceholder: "æè¿°ç½‘ç«™ã€æ‰€éœ€åŠŸèƒ½ã€è®¾è®¡ã€å‰ç«¯ã€åŽç«¯å’Œæ•°æ®åº“â€¦",
      creatorButton: "ç”Ÿæˆé¡¹ç›® âœ¦",
      creatorDisclaimer: "AI ç”Ÿæˆä»£ç å’Œéƒ¨ç½²æŒ‡å—ï¼Œä½†ä¸ä¼šè‡ªåŠ¨éƒ¨ç½²ç½‘ç«™ã€‚ä¸Šçº¿å‰è¯·æµ‹è¯•ä»£ç ã€‚",
      feedbackTitle: "åˆ†äº«åé¦ˆ",
      feedbackDescription: "å‘Šè¯‰æˆ‘ä»¬ä½ ä½¿ç”¨ Kooksy AI çš„ä½“éªŒã€‚",
      name: "å§“å",
      role: "è§’è‰²",
      state: "å·ž",
      rating: "æ˜Ÿçº§è¯„åˆ†",
      feedbackLabel: "åé¦ˆ",
      feedbackPlaceholder: "å“ªäº›æ–¹é¢åšå¾—å¥½ï¼Ÿå“ªäº›éœ€è¦æ”¹è¿›ï¼Ÿ",
      submitFeedback: "æäº¤åé¦ˆ",
      loading: "è¯·ç¨å€™â€¦",
      listening: "æ­£åœ¨è†å¬â€¦è¯·è®²è¯ã€‚",
      emptyMessage: "è¯·å…ˆè¾“å…¥æ¶ˆæ¯ã€‚",
      fileTooLarge: "æ–‡ä»¶è¶…è¿‡ 10 MB é™åˆ¶ã€‚",
      invalidFile: "ä¸æ”¯æŒæ­¤æ–‡ä»¶ç±»åž‹ã€‚",
      fileSelected: "å·²é€‰æ‹©æ–‡ä»¶",
      analyzing: "æ­£åœ¨åˆ†æžæ–‡ä»¶â€¦",
      fileSuccess: "æ–‡ä»¶åˆ†æžå®Œæˆã€‚",
      chatFailed: "æ— æ³•èŽ·å– AI å›žå¤ï¼Œè¯·é‡è¯•ã€‚",
      goalFailed: "æ— æ³•ç”Ÿæˆè®¡åˆ’ï¼Œè¯·é‡è¯•ã€‚",
      creatorFailed: "æ— æ³•ç”Ÿæˆé¡¹ç›®ï¼Œè¯·é‡è¯•ã€‚",
      feedbackSuccess: "è°¢è°¢ï¼åé¦ˆå·²æäº¤ã€‚",
      feedbackFailed: "æ— æ³•æäº¤åé¦ˆï¼Œè¯·é‡è¯•ã€‚",
      chooseRating: "è¯·é€‰æ‹©æ˜Ÿçº§ã€‚",
      historyFailed: "æ— æ³•åŠ è½½èŠå¤©åŽ†å²ã€‚",
      historyDelete: "åˆ é™¤",
      historyOpen: "æ‰“å¼€",
      confirmDelete: "ç¡®å®šåˆ é™¤æ­¤å¯¹è¯å—ï¼Ÿ",
      deleteFailed: "æ— æ³•åˆ é™¤æ­¤å¯¹è¯ã€‚",
      deleteSuccess: "å¯¹è¯å·²åˆ é™¤ã€‚",
      copied: "å·²å¤åˆ¶ã€‚",
      copyFailed: "æ— æ³•å¤åˆ¶æ–‡æœ¬ã€‚",
      networkError: "ç½‘ç»œé”™è¯¯ï¼Œè¯·æ£€æŸ¥è¿žæŽ¥åŽé‡è¯•ã€‚",
      user: "ä½ ",
      ai: "Kooksy AI",
      emptyGoal: "è¯·æè¿°ä½ çš„ç›®æ ‡ã€‚",
      emptyIdea: "è¯·æè¿°ä½ çš„ç½‘ç«™æƒ³æ³•ã€‚",
      emptyFeedback: "è¯·è¾“å…¥åé¦ˆã€‚"
    },

    hi: {
      assistant: "AI à¤¸à¤¹à¤¾à¤¯à¤•",
      history: "à¤ªà¥à¤°à¤¾à¤¨à¥€ à¤¬à¤¾à¤¤à¤šà¥€à¤¤",
      goal: "à¤²à¤•à¥à¤·à¥à¤¯ à¤¯à¥‹à¤œà¤¨à¤¾",
      creator: "à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾",
      feedback: "à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾",
      newChat: "ï¼‹ à¤¨à¤ˆ à¤šà¥ˆà¤Ÿ",
      send: "à¤­à¥‡à¤œà¥‡à¤‚ â†‘",
      logout: "à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ",
      welcomeTitle: "à¤¬à¥à¤¦à¥à¤§à¤¿à¤®à¤¤à¥à¤¤à¤¾ à¤•à¥€ à¤à¤• à¤¨à¤ˆ à¤šà¤®à¤•à¥¤",
      welcomeText: "à¤¸à¤µà¤¾à¤² à¤ªà¥‚à¤›à¥‡à¤‚, à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤œà¤¾à¤°à¥€ à¤°à¤–à¥‡à¤‚, à¤«à¤¼à¤¾à¤‡à¤² à¤•à¤¾ à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£ à¤•à¤°à¥‡à¤‚ à¤¯à¤¾ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¬à¤¨à¤¾à¤à¤à¥¤",
      welcomeEyebrow: "KOOKSY AI Â· à¤†à¤ªà¤•à¤¾ AI à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤·à¥‡à¤¤à¥à¤°",
      prompt: "Kooksy AI à¤•à¥‹ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤­à¥‡à¤œà¥‡à¤‚â€¦",
      upload: "ï¼‹ à¤«à¤¼à¤¾à¤‡à¤² à¤•à¤¾ à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£",
      suggestions: ["AI à¤•à¥‹ à¤†à¤¸à¤¾à¤¨ à¤­à¤¾à¤·à¤¾ à¤®à¥‡à¤‚ à¤¸à¤®à¤à¤¾à¤à¤", "à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤•à¥€ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¬à¤¨à¤¾à¤à¤", "Python à¤•à¥‹à¤¡ à¤²à¤¿à¤–à¥‡à¤‚ à¤”à¤° à¤¸à¤®à¤à¤¾à¤à¤"],
      historyTitle: "à¤ªà¥à¤°à¤¾à¤¨à¥€ à¤¬à¤¾à¤¤à¤šà¥€à¤¤",
      historyDescription: "à¤ªà¥à¤°à¤¾à¤¨à¥€ à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤–à¥‹à¤²à¥‡à¤‚ à¤¯à¤¾ à¤¹à¤Ÿà¤¾à¤à¤à¥¤",
      historyLoading: "à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤²à¥‹à¤¡ à¤¹à¥‹ à¤°à¤¹à¥€ à¤¹à¥ˆâ€¦",
      noHistory: "à¤…à¤­à¥€ à¤•à¥‹à¤ˆ à¤¸à¥‡à¤µ à¤•à¥€ à¤—à¤ˆ à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
      goalTitle: "à¤²à¤•à¥à¤·à¥à¤¯ à¤•à¥‹ à¤¯à¥‹à¤œà¤¨à¤¾ à¤®à¥‡à¤‚ à¤¬à¤¦à¤²à¥‡à¤‚",
      goalDescription: "à¤•à¤¾à¤°à¥à¤¯ à¤¬à¤¤à¤¾à¤à¤à¥¤ AI à¤šà¤°à¤£, à¤¸à¤«à¤²à¤¤à¤¾ à¤•à¥‡ à¤®à¤¾à¤¨à¤¦à¤‚à¤¡, à¤œà¥‹à¤–à¤¿à¤® à¤”à¤° à¤¸à¥€à¤®à¤¾à¤à¤ à¤¬à¤¤à¤¾à¤à¤—à¤¾à¥¤",
      goalLabel: "à¤†à¤ª à¤•à¥à¤¯à¤¾ à¤¹à¤¾à¤¸à¤¿à¤² à¤•à¤°à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚?",
      goalPlaceholder: "à¤‰à¤¦à¤¾à¤¹à¤°à¤£: à¤›à¤¾à¤¤à¥à¤° à¤ªà¥‹à¤°à¥à¤Ÿà¤«à¥‹à¤²à¤¿à¤¯à¥‹ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤•à¥€ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¬à¤¨à¤¾à¤à¤â€¦",
      goalButton: "à¤¯à¥‹à¤œà¤¨à¤¾ à¤¬à¤¨à¤¾à¤à¤ âœ¦",
      creatorTitle: "à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¨à¤¿à¤°à¥à¤®à¤¾à¤¤à¤¾",
      creatorDescription: "à¤…à¤ªà¤¨à¤¾ à¤µà¤¿à¤šà¤¾à¤° à¤¬à¤¤à¤¾à¤à¤ à¤”à¤° à¤«à¥à¤°à¤‚à¤Ÿà¤à¤‚à¤¡, à¤¬à¥ˆà¤•à¤à¤‚à¤¡ à¤•à¥‹à¤¡ à¤¤à¤¥à¤¾ à¤¡à¤¿à¤ªà¥à¤²à¥‰à¤¯à¤®à¥‡à¤‚à¤Ÿ à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶ à¤ªà¤¾à¤à¤à¥¤",
      ideaLabel: "à¤…à¤ªà¤¨à¥€ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤¯à¤¾ à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤•à¤¾ à¤µà¤¿à¤šà¤¾à¤° à¤¬à¤¤à¤¾à¤à¤",
      ideaPlaceholder: "à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ, à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤, à¤¡à¤¿à¤œà¤¼à¤¾à¤‡à¤¨, à¤«à¥à¤°à¤‚à¤Ÿà¤à¤‚à¤¡, à¤¬à¥ˆà¤•à¤à¤‚à¤¡ à¤”à¤° à¤¡à¥‡à¤Ÿà¤¾à¤¬à¥‡à¤¸ à¤¬à¤¤à¤¾à¤à¤â€¦",
      creatorButton: "à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤¬à¤¨à¤¾à¤à¤ âœ¦",
      creatorDisclaimer: "AI à¤•à¥‹à¤¡ à¤”à¤° à¤¡à¤¿à¤ªà¥à¤²à¥‰à¤¯à¤®à¥‡à¤‚à¤Ÿ à¤¨à¤¿à¤°à¥à¤¦à¥‡à¤¶ à¤¦à¥‡à¤¤à¤¾ à¤¹à¥ˆà¥¤ à¤¯à¤¹ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤•à¥‹ à¤…à¤ªà¤¨à¥‡ à¤†à¤ª à¤ªà¥à¤°à¤•à¤¾à¤¶à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤•à¤°à¤¤à¤¾à¥¤",
      feedbackTitle: "à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¦à¥‡à¤‚",
      feedbackDescription: "Kooksy AI à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¤¾ à¤…à¤¨à¥à¤­à¤µ à¤¬à¤¤à¤¾à¤à¤à¥¤",
      name: "à¤¨à¤¾à¤®",
      role: "à¤­à¥‚à¤®à¤¿à¤•à¤¾",
      state: "à¤°à¤¾à¤œà¥à¤¯",
      rating: "à¤¸à¥à¤Ÿà¤¾à¤° à¤°à¥‡à¤Ÿà¤¿à¤‚à¤—",
      feedbackLabel: "à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾",
      feedbackPlaceholder: "à¤•à¥à¤¯à¤¾ à¤…à¤šà¥à¤›à¤¾ à¤°à¤¹à¤¾? à¤•à¥à¤¯à¤¾ à¤¬à¥‡à¤¹à¤¤à¤° à¤¹à¥‹ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆ?",
      submitFeedback: "à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤­à¥‡à¤œà¥‡à¤‚",
      loading: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚â€¦",
      listening: "à¤¸à¥à¤¨ à¤°à¤¹à¤¾ à¤¹à¥ˆâ€¦ à¤¬à¥‹à¤²à¥‡à¤‚à¥¤",
      emptyMessage: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¤¹à¤²à¥‡ à¤¸à¤‚à¤¦à¥‡à¤¶ à¤²à¤¿à¤–à¥‡à¤‚à¥¤",
      fileTooLarge: "à¤«à¤¼à¤¾à¤‡à¤² 10 MB à¤•à¥€ à¤¸à¥€à¤®à¤¾ à¤¸à¥‡ à¤¬à¤¡à¤¼à¥€ à¤¹à¥ˆà¥¤",
      invalidFile: "à¤¯à¤¹ à¤«à¤¼à¤¾à¤‡à¤² à¤ªà¥à¤°à¤•à¤¾à¤° à¤¸à¤®à¤°à¥à¤¥à¤¿à¤¤ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤",
      fileSelected: "à¤«à¤¼à¤¾à¤‡à¤² à¤šà¥à¤¨à¥€ à¤—à¤ˆ",
      analyzing: "à¤«à¤¼à¤¾à¤‡à¤² à¤•à¤¾ à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£ à¤¹à¥‹ à¤°à¤¹à¤¾ à¤¹à¥ˆâ€¦",
      fileSuccess: "à¤«à¤¼à¤¾à¤‡à¤² à¤µà¤¿à¤¶à¥à¤²à¥‡à¤·à¤£ à¤ªà¥‚à¤°à¤¾ à¤¹à¥à¤†à¥¤",
      chatFailed: "AI à¤‰à¤¤à¥à¤¤à¤° à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤² à¤ªà¤¾à¤¯à¤¾à¥¤ à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚à¥¤",
      goalFailed: "à¤¯à¥‹à¤œà¤¨à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¬à¤¨ à¤ªà¤¾à¤ˆà¥¤ à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚à¥¤",
      creatorFailed: "à¤ªà¥à¤°à¥‹à¤œà¥‡à¤•à¥à¤Ÿ à¤¨à¤¹à¥€à¤‚ à¤¬à¤¨ à¤ªà¤¾à¤¯à¤¾à¥¤ à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚à¥¤",
      feedbackSuccess: "à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦! à¤†à¤ªà¤•à¥€ à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤­à¥‡à¤œ à¤¦à¥€ à¤—à¤ˆà¥¤",
      feedbackFailed: "à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚ à¤­à¥‡à¤œà¥€ à¤œà¤¾ à¤¸à¤•à¥€à¥¤ à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚à¥¤",
      chooseRating: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¸à¥à¤Ÿà¤¾à¤° à¤°à¥‡à¤Ÿà¤¿à¤‚à¤— à¤šà¥à¤¨à¥‡à¤‚à¥¤",
      historyFailed: "à¤šà¥ˆà¤Ÿ à¤‡à¤¤à¤¿à¤¹à¤¾à¤¸ à¤²à¥‹à¤¡ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¤¾à¥¤",
      historyDelete: "à¤¹à¤Ÿà¤¾à¤à¤",
      historyOpen: "à¤–à¥‹à¤²à¥‡à¤‚",
      confirmDelete: "à¤•à¥à¤¯à¤¾ à¤¯à¤¹ à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤¹à¤Ÿà¤¾à¤¨à¥€ à¤¹à¥ˆ?",
      deleteFailed: "à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤¹à¤Ÿà¤¾à¤ˆ à¤¨à¤¹à¥€à¤‚ à¤œà¤¾ à¤¸à¤•à¥€à¥¤",
      deleteSuccess: "à¤¬à¤¾à¤¤à¤šà¥€à¤¤ à¤¹à¤Ÿà¤¾ à¤¦à¥€ à¤—à¤ˆà¥¤",
      copied: "à¤•à¥‰à¤ªà¥€ à¤¹à¥‹ à¤—à¤¯à¤¾à¥¤",
      copyFailed: "à¤Ÿà¥‡à¤•à¥à¤¸à¥à¤Ÿ à¤•à¥‰à¤ªà¥€ à¤¨à¤¹à¥€à¤‚ à¤¹à¥‹ à¤¸à¤•à¤¾à¥¤",
      networkError: "à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤¤à¥à¤°à¥à¤Ÿà¤¿à¥¤ à¤•à¤¨à¥‡à¤•à¥à¤¶à¤¨ à¤œà¤¾à¤à¤šà¤•à¤° à¤«à¤¿à¤° à¤•à¥‹à¤¶à¤¿à¤¶ à¤•à¤°à¥‡à¤‚à¥¤",
      user: "à¤†à¤ª",
      ai: "Kooksy AI",
      emptyGoal: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¤¾ à¤²à¤•à¥à¤·à¥à¤¯ à¤¬à¤¤à¤¾à¤à¤à¥¤",
      emptyIdea: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤•à¤¾ à¤µà¤¿à¤šà¤¾à¤° à¤¬à¤¤à¤¾à¤à¤à¥¤",
      emptyFeedback: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤ªà¤¨à¥€ à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾ à¤²à¤¿à¤–à¥‡à¤‚à¥¤"
    },

    es: {
      assistant: "Asistente de IA",
      history: "Historial de conversaciones",
      goal: "Objetivo del agente",
      creator: "Creador de sitios web",
      feedback: "Comentarios",
      newChat: "ï¼‹ Nuevo chat",
      send: "Enviar â†‘",
      logout: "Cerrar sesiÃ³n",
      welcomeTitle: "Inteligencia con chispa.",
      welcomeText: "Haz preguntas, continÃºa conversaciones, analiza archivos o convierte ideas en proyectos web.",
      welcomeEyebrow: "KOOKSY AI Â· TU ESPACIO DE IA",
      prompt: "Escribe a Kooksy AIâ€¦",
      upload: "ï¼‹ Analizar un archivo",
      suggestions: ["Explica la IA de forma sencilla", "AyÃºdame a planificar un proyecto", "Escribe y explica cÃ³digo Python"],
      historyTitle: "Historial de conversaciones",
      historyDescription: "Abre una conversaciÃ³n anterior o elimina las que ya no necesites.",
      historyLoading: "Cargando conversacionesâ€¦",
      noHistory: "TodavÃ­a no hay conversaciones guardadas.",
      goalTitle: "Convierte un objetivo en un plan",
      goalDescription: "Describe una tarea para obtener pasos, criterios de Ã©xito, riesgos y limitaciones.",
      goalLabel: "Â¿QuÃ© quieres conseguir?",
      goalPlaceholder: "Ejemplo: planifica un sitio web de portafolio para estudiantesâ€¦",
      goalButton: "Generar plan âœ¦",
      creatorTitle: "Creador de sitios web",
      creatorDescription: "Describe tu idea para generar cÃ³digo frontend, backend e instrucciones de implementaciÃ³n.",
      ideaLabel: "Describe tu sitio web o proyecto",
      ideaPlaceholder: "Describe las funciones, el diseÃ±o, el frontend, el backend y la base de datosâ€¦",
      creatorButton: "Generar proyecto âœ¦",
      creatorDisclaimer: "La IA genera cÃ³digo e instrucciones; no publica el sitio automÃ¡ticamente. Prueba el cÃ³digo antes de usarlo.",
      feedbackTitle: "Comparte tus comentarios",
      feedbackDescription: "CuÃ©ntanos tu experiencia con Kooksy AI.",
      name: "Nombre",
      role: "Rol",
      state: "Estado",
      rating: "CalificaciÃ³n por estrellas",
      feedbackLabel: "Comentarios",
      feedbackPlaceholder: "Â¿QuÃ© funcionÃ³ bien? Â¿QuÃ© podrÃ­a mejorar?",
      submitFeedback: "Enviar comentarios",
      loading: "Espera, por favorâ€¦",
      listening: "Escuchandoâ€¦ Habla ahora.",
      emptyMessage: "Escribe un mensaje primero.",
      fileTooLarge: "El archivo supera el lÃ­mite de 10 MB.",
      invalidFile: "Este tipo de archivo no es compatible.",
      fileSelected: "Archivo seleccionado",
      analyzing: "Analizando archivoâ€¦",
      fileSuccess: "AnÃ¡lisis del archivo completado.",
      chatFailed: "No se pudo obtener una respuesta de IA. IntÃ©ntalo de nuevo.",
      goalFailed: "No se pudo generar el plan. IntÃ©ntalo de nuevo.",
      creatorFailed: "No se pudo generar el proyecto. IntÃ©ntalo de nuevo.",
      feedbackSuccess: "Â¡Gracias! Se enviaron tus comentarios.",
      feedbackFailed: "No se pudieron enviar los comentarios.",
      chooseRating: "Selecciona una calificaciÃ³n.",
      historyFailed: "No se pudo cargar el historial.",
      historyDelete: "Eliminar",
      historyOpen: "Abrir",
      confirmDelete: "Â¿Eliminar esta conversaciÃ³n?",
      deleteFailed: "No se pudo eliminar la conversaciÃ³n.",
      deleteSuccess: "ConversaciÃ³n eliminada.",
      copied: "Copiado al portapapeles.",
      copyFailed: "No se pudo copiar el texto.",
      networkError: "Error de red. Comprueba tu conexiÃ³n e intÃ©ntalo de nuevo.",
      user: "TÃº",
      ai: "Kooksy AI",
      emptyGoal: "Describe tu objetivo.",
      emptyIdea: "Describe tu idea para el sitio web.",
      emptyFeedback: "Escribe tus comentarios."
    }
  };

   /* ---------------- 3. APPLICATION STATE ---------------- */

  const state = {
    language: localStorage.getItem("kooksy-language") || "en",
    csrfToken: "",
    busy: false,
    recognition: null,
    speaking: false,
    currentFile: null,
    chatHistory: [],
    activeHistoryId: null
  };

  const $ = (id) => document.getElementById(id);

  const getText = (key) =>
    (translations[state.language] || translations.en)[key] ??
    translations.en[key] ??
    key;

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  function notify(message, type = "info") {
    let toast = $("kooksy-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "kooksy-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      Object.assign(toast.style, {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: "99999",
        maxWidth: "min(420px, calc(100vw - 40px))",
        padding: "13px 18px",
        borderRadius: "12px",
        background: "#17172b",
        color: "#fff",
        boxShadow: "0 8px 30px #0003",
        fontSize: "14px",
        opacity: "0",
        transition: "opacity .2s"
      });
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.dataset.type = type;
    toast.style.opacity = "1";

    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
    }, 3200);
  }

  function setBusy(value) {
    state.busy = value;

    document.querySelectorAll(
      '[data-kooksy-submit], #sendButton, #send-btn, #sendBtn'
    ).forEach((button) => {
      button.disabled = value;
    });

    document.body.classList.toggle("kooksy-busy", value);
  }

  /* ---------------- 4. CSRF AND API REQUESTS ---------------- */

  async function initializeSession() {
    try {
      const response = await fetch("/api/session", {
        method: "GET",
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) return;

      const data = await response.json();
      state.csrfToken = data.csrf_token || data.csrfToken || "";
    } catch (error) {
      console.error("Session initialization failed:", error);
    }
  }

  async function apiRequest(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const headers = new Headers(options.headers || {});

    headers.set("Accept", "application/json");

    if (state.csrfToken && !["GET", "HEAD", "OPTIONS"].includes(method)) {
      headers.set("X-CSRF-Token", state.csrfToken);
    }

    const response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: "same-origin"
    });

    const contentType = response.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (response.status === 401 || response.status === 403) {
      if (
        response.status === 401 ||
        /csrf/i.test(data.message || data.error || "")
      ) {
        await initializeSession();
      }
    }

    if (!response.ok) {
      throw new Error(
        data.error || data.message ||
        `Request failed (${response.status})`
      );
    }

    return data;
  }

  async function postJSON(url, payload) {
    return apiRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  /* ---------------- 5. LANGUAGE SUPPORT ---------------- */

  const languageNames = {
    en: "English",
    "zh-CN": "ä¸­æ–‡",
    hi: "à¤¹à¤¿à¤¨à¥à¤¦à¥€",
    es: "EspaÃ±ol",
    ar: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©",
    fr: "FranÃ§ais",
    bn: "à¦¬à¦¾à¦‚à¦²à¦¾",
    pt: "PortuguÃªs",
    ru: "Ð ÑƒÑÑÐºÐ¸Ð¹",
    ur: "Ø§Ø±Ø¯Ùˆ",
    ja: "æ—¥æœ¬èªž",
    de: "Deutsch",
    ta: "à®¤à®®à®¿à®´à¯",
    te: "à°¤à±†à°²à±à°—à±",
    ko: "í•œêµ­ì–´"
  };

  function applyLanguage(language) {
    if (!languageNames[language]) language = "en";

    state.language = language;
    localStorage.setItem("kooksy-language", language);

    document.documentElement.lang = language;
    document.documentElement.dir =
      ["ar", "ur"].includes(language) ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = getText(key);
      if (value !== key) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = getText(element.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.title = getText(element.dataset.i18nTitle);
    });

    const languageSelect = $(
      "languageSelect"
    ) || $("language-select") || $("language");

    if (languageSelect) languageSelect.value = language;

    const messageInput = getMessageInput();
    if (messageInput) messageInput.placeholder = getText("prompt");

    document.dispatchEvent(new CustomEvent("kooksy:languagechange", {
      detail: { language }
    }));

    postJSON("/api/language", { language }).catch(() => {
      // The frontend language still works if the optional endpoint is absent.
    });
  }

  /* ---------------- 6. CHAT HELPERS ---------------- */

 function getMessageInput() {
  return $("prompt");
}

  function getChatContainer() {
    return $("chatMessages") ||
      $("chat-messages") ||
      $("messages") ||
      $("chatHistory");
  }

  function appendMessage(role, content) {
    const container = getChatContainer();

    if (!container) {
      console.warn("Chat message container was not found.");
      return;
    }

    const message = document.createElement("div");
    message.className = `message message-${role}`;
    message.dataset.role = role;

    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = role === "user" ? getText("user") : getText("ai");

    const body = document.createElement("div");
    body.className = "message-content";
    body.textContent = String(content ?? "");
    body.style.whiteSpace = "pre-wrap";
    body.style.overflowWrap = "anywhere";

    const actions = document.createElement("div");
    actions.className = "message-actions";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.textContent = getText("copy");
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(body.textContent);
        notify(getText("copied"), "success");
      } catch {
        notify(getText("copyFailed"), "error");
      }
    });

    actions.appendChild(copyButton);

    if (role === "assistant") {
      const speakButton = document.createElement("button");
      speakButton.type = "button";
      speakButton.textContent = getText("speak");
      speakButton.addEventListener("click", () => speakText(body.textContent));
      actions.appendChild(speakButton);
    }

    message.append(label, body, actions);
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
  }

  function clearChat() {
    const container = getChatContainer();
    if (container) container.replaceChildren();

    state.chatHistory = [];
    state.activeHistoryId = null;
  }

  function showTyping() {
    const container = getChatContainer();
    if (!container) return null;

    const typing = document.createElement("div");
    typing.className = "message message-assistant typing-indicator";
    typing.textContent = getText("loading");
    typing.setAttribute("aria-live", "polite");
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    return typing;
  }

  /* ---------------- 7. CHAT REQUEST ---------------- */

  async function sendMessage(textOverride) {
    if (state.busy) return;

    const input = getMessageInput();
    const message = String(
      textOverride !== undefined ? textOverride : input?.value || ""
    ).trim();

    if (!message && !state.currentFile) {
      notify(getText("emptyMessage"), "warning");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      notify(getText("charLimit"), "warning");
      return;
    }

    setBusy(true);

    if (input && textOverride === undefined) input.value = "";

    if (message) {
      appendMessage("user", message);
      state.chatHistory.push({ role: "user", content: message });
    }

    const typing = showTyping();

    try {
      let result;

      if (state.currentFile) {
        result = await uploadAndAnalyze(state.currentFile, message);
        state.currentFile = null;
      } else {
        result = await postJSON(API.chat, {
          message,
          prompt: message,
          language: state.language,
          history: state.chatHistory.slice(-20)
        });
      }

      const answer =
        result.response ||
        result.answer ||
        result.reply ||
        result.message ||
        result.output;

      if (typing) typing.remove();

      if (!answer || typeof answer !== "string") {
        throw new Error(result.error || getText("chatFailed"));
      }

      appendMessage("assistant", answer);
      state.chatHistory.push({ role: "assistant", content: answer });
    } catch (error) {
      if (typing) typing.remove();
      console.error("Chat request failed:", error);
      notify(`${getText("chatFailed")} ${error.message}`, "error");
    } finally {
      setBusy(false);
      if (input) input.focus();
    }
  }

  /* ---------------- 8. FILE UPLOAD ---------------- */

  async function uploadAndAnalyze(file, message = "") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("message", message);
    formData.append("language", state.language);

    // Use the configured upload endpoint.
    return apiRequest("/api/upload", {
      method: "POST",
      body: formData
    });
  }

  function handleFile(file) {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      notify(getText("fileTooLarge"), "error");
      return;
    }

    const extension = file.name.split(".").pop().toLowerCase();

    if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
      notify(getText("invalidFile"), "error");
      return;
    }

    state.currentFile = file;
    notify(`${getText("fileSelected")}: ${file.name}`, "success");

    const fileName = $("selectedFileName");
    if (fileName) fileName.textContent = file.name;
  }

  /* ---------------- 9. VOICE INPUT ---------------- */

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      notify(getText("voiceUnsupported") || "Voice recognition is not supported.", "error");
      return;
    }

    if (state.recognition) {
      state.recognition.stop();
      state.recognition = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANGUAGE_VOICES[state.language] || "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => notify(getText("listening"), "info");

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      const input = getMessageInput();
      if (input) input.value = transcript;
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      notify(getText("voicePermission") || "Microphone access failed.", "error");
    };

    recognition.onend = () => {
      state.recognition = null;
    };

    state.recognition = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error(error);
      state.recognition = null;
    }
  }

  /* ---------------- 10. VOICE OUTPUT ---------------- */

  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      notify(getText("speechUnavailable") || "Speech output is unavailable.", "error");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text || ""));
    utterance.lang = LANGUAGE_VOICES[state.language] || "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => { state.speaking = true; };
    utterance.onend = () => { state.speaking = false; };
    utterance.onerror = () => { state.speaking = false; };

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    state.speaking = false;
  }

  /* ---------------- 11. CHAT HISTORY ---------------- */

  async function loadHistory() {
    const container = $("historyList") ||
      $("history-list") ||
      $("conversationList");

    if (!container) return;

    container.textContent = getText("historyLoading");

    try {
      const result = await apiRequest(API.history);
      const items = Array.isArray(result)
        ? result
        : result.history || result.conversations || result.items || [];

      container.replaceChildren();

      if (!items.length) {
        container.textContent = getText("noHistory");
        return;
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "history-item";

        const title = document.createElement("span");
        title.textContent = item.title || item.name || "Conversation";

        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.textContent = getText("historyOpen");
        openButton.addEventListener("click", () => openHistory(item));

        row.append(title, openButton);
        container.appendChild(row);
      });
    } catch (error) {
      console.error("History loading failed:", error);
      container.textContent = getText("historyFailed");
    }
  }

  async function openHistory(item) {
    const id = item.id ?? item.conversation_id ?? item.chat_id;
    if (id == null) return;

    try {
      const result = await apiRequest(`${API.history}/${encodeURIComponent(id)}`);
      const messages = result.messages || result.history || [];

      clearChat();
      state.activeHistoryId = id;

      messages.forEach((message) => {
        const role = message.role === "user" ? "user" : "assistant";
        const content = message.content || message.message || "";
        appendMessage(role, content);
        state.chatHistory.push({ role, content });
      });
    } catch (error) {
      console.error("Opening conversation failed:", error);
      notify(getText("historyFailed"), "error");
    }
  }

  /* ---------------- 12. AGENT GOAL ---------------- */

  async function generateGoal() {
    const input = $("goalInput") || $("goal-input") || $("goalDescription");
    const goal = input?.value.trim();

    if (!goal) {
      notify(getText("emptyGoal"), "warning");
      return;
    }

    setBusy(true);

    try {
      const result = await postJSON(API.goal, {
        goal,
        task: goal,
        language: state.language
      });

     const output =
  $("goalOutput") ||
  $("goal-output") ||
  $("goalResult");

const content =
  result.plan ??
  result.response ??
  result.result ??
  result.output ??
  result.message;

if (output) {
  output.textContent =
    typeof content === "string"
      ? content
      : content != null
        ? JSON.stringify(content, null, 2)
        : "The server returned no plan. Please check the Flask backend logs.";

  output.style.display = "block";
}

if (content == null) {
  console.error("Agent Goal returned an unexpected response:", result);
  notify("No plan received from the server. Check the Flask terminal.", "error");
}

      if (output) output.textContent = typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2);

      if (!output) notify(String(content || "Plan generated."), "success");
    } catch (error) {
      console.error("Goal generation failed:", error);
      notify(`${getText("goalFailed")} ${error.message}`, "error");
    }finally {
     setBusy(false);

     const messageInput = getMessageInput();
     if (messageInput) {
       messageInput.value = "";
       messageInput.focus();
      }
    }
}
  /* ---------------- 13. WEBSITE CREATOR ---------------- */

  async function generateWebsite() {
    const input = $("websiteIdea") ||
      $("website-idea") ||
      $("ideaInput") ||
      $("creatorInput");

    const idea = input?.value.trim();

    if (!idea) {
      notify(getText("emptyIdea"), "warning");
      return;
    }

    setBusy(true);

    try {
      const result = await postJSON(API.creator, {
        idea,
        prompt: idea,
        language: state.language
      });

      const output = $("websiteOutput") ||
        $("website-output") ||
        $("creatorOutput");

      const content =
        result.code ||
        result.project ||
        result.response ||
        result.result ||
        result.output;

      if (output) output.textContent = typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2);

      if (!output) notify("Project generated.", "success");
    } catch (error) {
      console.error("Website generation failed:", error);
      notify(`${getText("creatorFailed")} ${error.message}`, "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 14. FEEDBACK FORM ---------------- */

  async function submitFeedback(event) {
    if (event) event.preventDefault();

    const form = $("feedbackForm") || $("feedback-form");
    if (!form) {
      notify("Feedback form was not found.", "error");
      return;
    }

    const formData = new FormData(form);
    const feedback = String(
      formData.get("feedback") ||
      formData.get("message") ||
      formData.get("comments") ||
      ""
    ).trim();

    const rating = Number(formData.get("rating") || formData.get("stars") || 0);

    if (!feedback) {
      notify(getText("emptyFeedback"), "warning");
      return;
    }

    if (rating < 1 || rating > 5) {
      notify(getText("chooseRating"), "warning");
      return;
    }

    setBusy(true);

    try {
      const payload = {
        name: String(formData.get("name") || "").trim(),
        role: String(formData.get("role") || "").trim(),
        state: String(formData.get("state") || "").trim(),
        rating,
        feedback,
        language: state.language
      };

      await postJSON(API.feedback, payload);
      form.reset();
      notify(getText("feedbackSuccess"), "success");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      notify(`${getText("feedbackFailed")} ${error.message}`, "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 15. COPY AND DOWNLOAD ---------------- */

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(String(text ?? ""));
      notify(getText("copied"), "success");
    } catch {
      notify(getText("copyFailed"), "error");
    }
  }

  function downloadText(text, filename = "kooksy-output.txt") {
    const blob = new Blob([String(text ?? "")], {
      type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  /* ---------------- 16. NEW CHAT AND LOGOUT ---------------- */

  function newChat() {
    stopSpeaking();
    clearChat();

    const input = getMessageInput();
    if (input) input.focus();
  }

  function logout() {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = API.logout;

    if (state.csrfToken) {
      const token = document.createElement("input");
      token.type = "hidden";
      token.name = "csrf_token";
      token.value = state.csrfToken;
      form.appendChild(token);
    }

    document.body.appendChild(form);
    form.submit();
  }

  /* ---------------- 17. EVENT BINDINGS ---------------- */

  function bindClick(ids, callback) {
    ids.forEach((id) => {
      const element = $(id);
      if (element) element.addEventListener("click", callback);
    });
  }

  function bindEvents() {
    const input = getMessageInput();

    bindClick(["sendButton", "send-btn", "sendBtn"], () => sendMessage());

    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage();
        }
      });
    }


    const feedbackForm = $("feedbackForm") || $("feedback-form");
    if (feedbackForm) {    bindClick(["newChatButton", "new-chat", "newChatBtn"], newChat);
    bindClick(["voiceButton", "voice-btn", "micButton"], startVoiceInput);
    bindClick(["stopSpeakingButton", "stop-speaking"], stopSpeaking);
    bindClick(["goalBtn", "goalButton", "generateGoalButton"], generateGoal);
    bindClick(["logoutButton", "logout-btn"], logout);
    bindClick(["loadHistoryButton", "refreshHistory"], loadHistory);

    // Website Creator + AI Coding Studio
    bindCreatorStudioEvents();
      feedbackForm.addEventListener("submit", submitFeedback);
    }

    const languageSelect = $("languageSelect") ||
      $("language-select") ||
      $("language");

    if (languageSelect) {
      languageSelect.addEventListener("change", () => {
        applyLanguage(languageSelect.value);
      });
    }

    const fileInput = $("fileInput") ||
      $("file-input") ||
      $("uploadInput");

    if (fileInput) {
      fileInput.addEventListener("change", () => {
        handleFile(fileInput.files?.[0]);
      });
    }

    bindClick(["uploadButton", "upload-btn", "chooseFileButton"], () => {
      fileInput?.click();
    });

    bindClick(["clearFileButton", "removeSelectedFile"], () => {
      state.currentFile = null;
      if (fileInput) fileInput.value = "";

      const fileName = $("selectedFileName");
      if (fileName) fileName.textContent = "";
    });

    document.querySelectorAll("[data-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        sendMessage(button.dataset.prompt);
      });
    });

    document.querySelectorAll("[data-copy-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = $(button.dataset.copyTarget);
        if (target) copyText(target.textContent);
      });
    });

    document.querySelectorAll("[data-download-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = $(button.dataset.downloadTarget);
        if (target) {
          downloadText(
            target.textContent,
            button.dataset.filename || "kooksy-output.txt"
          );
        }
      });
    });
  }

/* ============================================================
   17A. WEBSITE CREATOR + AI CODING STUDIO
   Add inside the existing KooksyAI IIFE, before initialization.
   ============================================================ */

const studioState = {
  files: {},
  activeFile: "",
  previewWindow: null
};

const STUDIO_API = {
  website: "/api/website-creator",
  coding: "/api/coding-studio",
  saveFile: "/api/coding-studio/save",
  zip: "/api/website-creator/export-zip"
};

function getFirstElement(ids) {
  for (const id of ids) {
    const element = $(id);
    if (element) return element;
  }
  return null;
}

function setStudioText(ids, text) {
  const element = getFirstElement(ids);
  if (element) {
    element.textContent =
      typeof text === "string" ? text : JSON.stringify(text, null, 2);
  }
}

function getStudioValue(ids) {
  return String(getFirstElement(ids)?.value || "").trim();
}

function downloadStudioFile(filename, content) {
  const blob = new Blob([String(content ?? "")], {
    type: "text/plain;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getWebsiteFiles(result) {
  if (result && result.files && typeof result.files === "object") {
    return result.files;
  }

  // Supports AI responses that return files as a JSON string.
  if (typeof result?.response === "string") {
    try {
      const parsed = JSON.parse(result.response);
      if (parsed.files && typeof parsed.files === "object") {
        return parsed.files;
      }
    } catch {
      // The backend may return ordinary text instead of structured files.
    }
  }

  return {};
}


function showWebsiteFiles(files) {
  studioState.files = {};

  const select = $("creatorFileSelect");
  const workspace = $("creatorWorkspace");

  // Accept only safe filenames and string file contents.
  for (const [name, content] of Object.entries(files || {})) {
   const safeName = String(name).replace(/\\/g, "/");

    if (
      !safeName ||
      safeName.startsWith("/") ||
      safeName.split("/").includes("..") ||
      typeof content !== "string"
    ) {
      continue;
    }

    studioState.files[safeName] = content;
  }

  const names = Object.keys(studioState.files);

  if (!names.length) {
    if (workspace) workspace.hidden = true;

    notify(
      "The server returned no usable website files.",
      "warning"
    );
    return;
  }

  if (workspace) {
    workspace.hidden = false;
  }

  const firstFile = names.includes("index.html")
    ? "index.html"
    : names[0];

  studioState.activeFile = firstFile;

  if (select) {
    select.replaceChildren();

    names.forEach((filename) => {
      const option = document.createElement("option");
      option.value = filename;
      option.textContent = filename;
      select.appendChild(option);
    });

    select.value = firstFile;
  }

  const editor = $("creatorCodeEditor");

  if (editor) {
    editor.value = studioState.files[firstFile] || "";
  }

  const techStack = $("creatorTechStack");

  if (techStack) {
    techStack.textContent = "Files: " + names.join(", ");
  }

  buildWebsitePreview(studioState.files);
}

function buildWebsitePreview(files) {
  const iframe = $("creatorPreview");

  if (!iframe) {
    console.warn("Website preview iframe not found: creatorPreview");
    return;
  }

  const fileMap = files || {};

  const htmlFile =
    fileMap["index.html"] ||
    fileMap["index.htm"] ||
    "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Website Preview</title></head><body><h1>Website Preview</h1><p>No index.html file was found.</p></body></html>";

  const cssFile =
    fileMap["style.css"] ||
    fileMap["styles.css"] ||
    "";

  const jsFile =
    fileMap["app.js"] ||
    fileMap["script.js"] ||
    "";

  let previewHTML = htmlFile;

  // Add CSS to the generated HTML.
  if (cssFile.trim()) {
    const styleTag = "<style>\n" + cssFile + "\n</style>";

    if (/<\/head>/i.test(previewHTML)) {
      previewHTML = previewHTML.replace(
        /<\/head>/i,
        styleTag + "\n</head>"
      );
    } else {
      previewHTML = styleTag + "\n" + previewHTML;
    }
  }

  // Add JavaScript before the closing body tag.
  if (jsFile.trim()) {
    const scriptTag =
      "<script>\n" +
      jsFile.replace(/<\/script/gi, "<\\/script") +
      "\n</scr" + "ipt>";

    if (/<\/body>/i.test(previewHTML)) {
      previewHTML = previewHTML.replace(
        /<\/body>/i,
        scriptTag + "\n</body>"
      );
    } else {
      previewHTML += "\n" + scriptTag;
    }
  }

  iframe.srcdoc = previewHTML;
}


  // Safely encode generated source before placing it inside srcdoc.
  const safeString = (value) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  let preview = html;

  // Remove external generated-file references; inject local generated CSS/JS.
  preview = preview.replace(
    /<link\b[^>]*href\s*=\s*["'][^"']*(?:style\.css|styles\.css)[^"']*["'][^>]*>/gi,
    ""
  );

  preview = preview.replace(
    /<script\b[^>]*src\s*=\s*["'][^"']*(?:app\.js|script\.js)[^"']*["'][^>]*>\s*<\/script>/gi,
    ""
  );

  const injection = `
    <script>
      (() => {
        const css = ${safeString(css)};
        const code = ${safeString(js)};

        const style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);

        window.addEventListener("DOMContentLoaded", () => {
          try {
            const script = document.createElement("script");
            script.textContent = code;
            document.body.appendChild(script);
          } catch (error) {
            console.error("Generated website JavaScript failed:", error);
          }
        });
      })();
    <\/script>
  `;

  if (/<\/body\s*>/i.test(preview)) {
    preview = preview.replace(/<\/body\s*>/i, `${injection}</body>`);
  } else {
    preview += injection;
  }

  iframe.setAttribute("sandbox", "allow-scripts");
  iframe.srcdoc = preview;
}


async function generateWebsite() {
  const idea = getStudioValue([
    "websiteIdea", "website-idea", "ideaInput", "creatorInput"
  ]);

  if (!idea) {
    notify(getText("emptyIdea"), "warning");
    return;
  }

  setBusy(true);

  try {
    const result = await postJSON(API.creator, {
  idea,
  prompt: idea,
  language: state.language
});

const files = getWebsiteFiles(result);

if (!files || Object.keys(files).length === 0) {
  throw new Error(
    result?.error || "No website files returned by the server."
  );
}

showWebsiteFiles(files);

    const files = getWebsiteFiles(result);

    if (Object.keys(files).length) {
      showWebsiteFiles(files);
      buildWebsitePreview(files);

      setStudioText(
        ["creatorExplanation", "websiteExplanation"],
        result.explanation || result.message || "Website files generated."
      );
      setStudioText(
        ["creatorDeployment", "websiteDeployment"],
        result.deployment_guide || result.setup_instructions || ""
      );
      setStudioText(
        ["creatorHosting", "websiteHosting"],
        result.hosting_suggestions || result.hosting || ""
      );

      notify("Website files generated.", "success");
    } else {
      const output = getFirstElement([
        "websiteOutput", "website-output", "creatorOutput"
      ]);

      if (output) {
        output.textContent = result.response ||
          result.result ||
          result.output ||
          result.message ||
          "The server did not return structured website files.";
      }

      notify(
        "AI response received, but separate HTML/CSS/JS files were not returned. Check the backend response format.",
        "warning"
      );
    }
  } catch (error) {
    console.error("Website Creator failed:", error);
    notify(`${getText("creatorFailed")} ${error.message}`, "error");
  } finally {
    setBusy(false);
  }
}

function openWebsitePreviewInNewTab() {
  const files = studioState.files;

  if (!Object.keys(files).length) {
    notify("Generate a website first.", "warning");
    return;
  }

  // Open a blank page synchronously to reduce popup-blocker issues.
  const previewWindow = window.open("about:blank", "_blank");

  if (!previewWindow) {
    notify("Allow pop-ups to open the preview.", "warning");
    return;
  }

  const html = files["index.html"] || "";
  const css = files["style.css"] || files["styles.css"] || "";
  const js = files["script.js"] || files["app.js"] || "";

  const previewHTML = html
    .replace(/<\/head>/i, `<style>${css.replace(/<\/style/gi, "<\\/style")}</style></head>`)
    .replace(/<\/body>/i, `<script>${js.replace(/<\/script/gi, "<\\/script")}<\/script></body>`);

  previewWindow.document.open();
  previewWindow.document.write(previewHTML);
  previewWindow.document.close();
  studioState.previewWindow = previewWindow;
}

async function exportWebsiteZip() {
  if (!Object.keys(studioState.files).length) {
    notify("Generate a website before exporting ZIP.", "warning");
    return;
  }

  try {
    const result = await apiRequest(STUDIO_API.zip, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        files: studioState.files,
        language: state.language
      })
    });

    if (result.download_url) {
      window.open(result.download_url, "_blank", "noopener");
    } else if (result.zip_base64) {
      const binary = atob(result.zip_base64);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const blob = new Blob([bytes], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "kooksy-website.zip";
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      throw new Error("ZIP endpoint did not return a download URL or ZIP data.");
    }
  } catch (error) {
    console.error("ZIP export failed:", error);
    notify(`ZIP export failed: ${error.message}`, "error");
  }
}

/* ---------------- AI CODING STUDIO ---------------- */

function selectCodingFile(filename, content) {
  studioState.activeFile = filename;

  const editor = getFirstElement([
    "codingEditor", "coding-editor", "codeEditor"
  ]);

  if (editor) editor.value = String(content ?? "");

  setStudioText(["codingActiveFilename", "coding-active-filename"], filename);
}

function renderCodingFiles(files) {
  const list = getFirstElement([
    "codingFileList", "coding-file-list", "projectFileList"
  ]);

  if (!list) return;

  list.replaceChildren();

  Object.entries(files || {}).forEach(([filename, content]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "coding-file-button";
    button.textContent = filename;
    button.addEventListener("click", () => {
      selectCodingFile(filename, content);
    });
    list.appendChild(button);
  });
}

async function runCodingAction(action) {
  const code = getStudioValue([
    "codingEditor", "coding-editor", "codeEditor"
  ]);
  const instruction = getStudioValue([
    "codingInstruction", "coding-instruction", "codingPrompt"
  ]);
  const language = getStudioValue([
    "codingLanguage", "coding-language"
  ]) || "python";

  if (!code && action !== "open-project") {
    notify("Enter or open code first.", "warning");
    return;
  }

  setBusy(true);

  try {
    const result = await postJSON(STUDIO_API.coding, {
      action,
      code,
      instruction,
      language,
      filename: studioState.activeFile,
      project_files: studioState.files,
      response_language: state.language
    });

    const updatedCode =
      result.code ?? result.updated_code ?? result.output_code;

    if (typeof updatedCode === "string" && updatedCode) {
      const editor = getFirstElement([
        "codingEditor", "coding-editor", "codeEditor"
      ]);
      if (editor) editor.value = updatedCode;
    }

    setStudioText(
      ["codingAIResult", "coding-ai-result", "codingOutput"],
      result.explanation ||
      result.review ||
      result.response ||
      result.result ||
      result.message ||
      updatedCode ||
      "The server returned no coding result."
    );

    if (result.files && typeof result.files === "object") {
      studioState.files = result.files;
      renderCodingFiles(result.files);
    }

    const preview = getFirstElement([
      "codingPreview", "coding-preview"
    ]);

    if (preview && preview.tagName === "IFRAME" && result.preview_html) {
      preview.setAttribute("sandbox", "allow-scripts");
      preview.srcdoc = result.preview_html;
    }

    notify("Coding Studio request completed.", "success");
  } catch (error) {
    console.error("Coding Studio request failed:", error);
    notify(`Coding Studio failed: ${error.message}`, "error");
  } finally {
    setBusy(false);
  }
}

async function saveCodingFile() {
  const editor = getFirstElement([
    "codingEditor", "coding-editor", "codeEditor"
  ]);
  const filename = studioState.activeFile;

  if (!editor || !filename) {
    notify("Open a project file before saving.", "warning");
    return;
  }

  const content = editor.value;

  try {
    await postJSON(STUDIO_API.saveFile, {
      filename,
      content
    });

    studioState.files[filename] = content;
    notify("File saved.", "success");
  } catch (error) {
    // Local download is a safe fallback; it does not overwrite a remote file.
    downloadStudioFile(filename, content);
    notify(
      `Server save failed. Downloaded a local copy instead: ${error.message}`,
      "warning"
    );
  }
}

function bindCreatorStudioEvents() {
  bindClick(
    ["websiteButton", "generateWebsiteButton"],
    generateWebsite
  );

  bindClick(
    ["websitePreviewNewTab", "creatorNewTabPreview"],
    openWebsitePreviewInNewTab
  );

  bindClick(
    ["websiteZipButton", "creatorZipButton"],
    exportWebsiteZip
  );

  bindClick(
    ["codingDebugButton", "codingFixButton"],
    () => runCodingAction("debug")
  );

  bindClick(
    ["codingExplainButton"],
    () => runCodingAction("explain")
  );

  bindClick(
    ["codingReviewButton"],
    () => runCodingAction("review")
  );

  bindClick(
    ["codingFeatureButton", "codingAddFeatureButton"],
    () => runCodingAction("add-feature")
  );

  bindClick(
    ["codingConvertButton"],
    () => runCodingAction("convert-language")
  );

  bindClick(
    ["codingPreviewButton"],
    () => runCodingAction("preview")
  );

  bindClick(
    ["codingSaveButton"],
    saveCodingFile
  );

  const editor = getFirstElement([
    "codingEditor", "coding-editor", "codeEditor"
  ]);

  if (editor) {
    editor.addEventListener("input", () => {
      if (studioState.activeFile) {
        studioState.files[studioState.activeFile] = editor.value;
      }
    });
  }

  const fileInput = getFirstElement([
    "codingProjectInput", "coding-project-input"
  ]);

  if (fileInput) {
    fileInput.addEventListener("change", async () => {
      const files = Array.from(fileInput.files || []);

      if (!files.length) return;

      const projectFiles = {};

      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          notify(`${file.name} exceeds the 10 MB limit.`, "warning");
          continue;
        }

        // Keep project paths relative and reject traversal attempts.
        const filename = file.webkitRelativePath || file.name;
        if (
          filename.startsWith("/") ||
          filename.split(/[\\/]/).includes("..")
        ) {
          continue;
        }

        projectFiles[filename] = await file.text();
      }

      studioState.files = projectFiles;
      renderCodingFiles(projectFiles);

      const first = Object.keys(projectFiles)[0];
      if (first) selectCodingFile(first, projectFiles[first]);

      notify("Project files opened locally.", "success");
    });
  }
}

  /* ---------------- 18. INITIALIZATION ---------------- */

  async function initializeApp() {
    await initializeSession();

    bindEvents();
    applyLanguage(state.language);

    if (
      $("historyList") ||
      $("history-list") ||
      $("conversationList")
    ) {
      loadHistory();
    }

    document.dispatchEvent(new CustomEvent("kooksy:ready", {
      detail: { language: state.language }
    }));

    console.info("Kooksy AI initialized.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp, {
      once: true
    });
  } else {
    initializeApp();
  }

  /* ---------------- 19. PUBLIC API ---------------- */

  window.KooksyAI = Object.freeze({
    sendMessage,
    newChat,
    applyLanguage,
    startVoiceInput,
    speakText,
    stopSpeaking,
    loadHistory,
    generateGoal,
    generateWebsite,
    submitFeedback,
    copyText,
    downloadText,
    getState: () => ({
      language: state.language,
      busy: state.busy,
      activeHistoryId: state.activeHistoryId
    })
  });

})();

