
"use strict";

/* ============================================================
   KOOKSY AI — MAIN FRONTEND JAVASCRIPT
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
      newChat: "＋ New Chat",
      send: "Send ↑",
      logout: "Log out",
      welcomeTitle: "Intelligence with a Spark.",
      welcomeText:
        "Ask questions, continue a conversation, analyse a file, or turn your idea into a website project.",
      welcomeEyebrow: "KOOKSY AI · YOUR AI WORKSPACE",
      prompt: "Message Kooksy AI…",
      upload: "＋ Analyse a file",
      fileHelp: "CSV, TXT, MD, PDF, DOCX, JSON, PY, HTML, CSS, JS, LOG · Max 10 MB",
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
      historyLoading: "Loading your conversations…",
      noHistory: "No saved conversations yet.",
      goalTitle: "Turn a goal into a plan",
      goalDescription:
        "Describe a task. Kooksy AI will outline steps, success criteria, risks and limitations.",
      goalLabel: "What do you want to achieve?",
      goalPlaceholder:
        "Example: Plan a student portfolio website and explain how to publish it…",
      goalButton: "Generate plan ✦",
      creatorTitle: "Website Creator",
      creatorDescription:
        "Describe your idea. Generate frontend and backend code with deployment instructions.",
      ideaLabel: "Describe your website or project idea",
      ideaPlaceholder:
        "Describe your website, required features, design, frontend, backend and database…",
      creatorButton: "Generate project ✦",
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
      loading: "Please wait…",
      listening: "Listening… Speak now.",
      voiceUnsupported: "Voice recognition is not supported by this browser.",
      voicePermission: "Please allow microphone access and try again.",
      emptyMessage: "Please enter a message first.",
      fileTooLarge: "The file exceeds the 10 MB limit.",
      invalidFile: "This file type is not supported.",
      fileSelected: "File selected",
      analyzing: "Analysing file…",
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
      assistant: "AI 助手",
      history: "对话历史",
      goal: "目标规划",
      creator: "网站创建器",
      feedback: "反馈",
      newChat: "＋ 新对话",
      send: "发送 ↑",
      logout: "退出登录",
      welcomeTitle: "智慧，灵感闪耀。",
      welcomeText: "提问、继续对话、分析文件，或将想法转化为网站项目。",
      welcomeEyebrow: "KOOKSY AI · 您的 AI 工作空间",
      prompt: "向 Kooksy AI 发送消息…",
      upload: "＋ 分析文件",
      suggestions: ["用简单语言解释 AI", "帮助我规划项目", "编写并解释 Python 代码"],
      historyTitle: "对话历史",
      historyDescription: "打开以前的对话或删除不再需要的对话。",
      historyLoading: "正在加载对话…",
      noHistory: "暂无保存的对话。",
      goalTitle: "将目标转化为计划",
      goalDescription: "描述任务，AI 将列出步骤、成功标准、风险和限制。",
      goalLabel: "你想实现什么目标？",
      goalPlaceholder: "例如：规划一个学生作品集网站，并说明如何发布…",
      goalButton: "生成计划 ✦",
      creatorTitle: "网站创建器",
      creatorDescription: "描述你的想法，生成前端、后端代码和部署说明。",
      ideaLabel: "描述你的网站或项目想法",
      ideaPlaceholder: "描述网站、所需功能、设计、前端、后端和数据库…",
      creatorButton: "生成项目 ✦",
      creatorDisclaimer: "AI 生成代码和部署指南，但不会自动部署网站。上线前请测试代码。",
      feedbackTitle: "分享反馈",
      feedbackDescription: "告诉我们你使用 Kooksy AI 的体验。",
      name: "姓名",
      role: "角色",
      state: "州",
      rating: "星级评分",
      feedbackLabel: "反馈",
      feedbackPlaceholder: "哪些方面做得好？哪些需要改进？",
      submitFeedback: "提交反馈",
      loading: "请稍候…",
      listening: "正在聆听…请讲话。",
      emptyMessage: "请先输入消息。",
      fileTooLarge: "文件超过 10 MB 限制。",
      invalidFile: "不支持此文件类型。",
      fileSelected: "已选择文件",
      analyzing: "正在分析文件…",
      fileSuccess: "文件分析完成。",
      chatFailed: "无法获取 AI 回复，请重试。",
      goalFailed: "无法生成计划，请重试。",
      creatorFailed: "无法生成项目，请重试。",
      feedbackSuccess: "谢谢！反馈已提交。",
      feedbackFailed: "无法提交反馈，请重试。",
      chooseRating: "请选择星级。",
      historyFailed: "无法加载聊天历史。",
      historyDelete: "删除",
      historyOpen: "打开",
      confirmDelete: "确定删除此对话吗？",
      deleteFailed: "无法删除此对话。",
      deleteSuccess: "对话已删除。",
      copied: "已复制。",
      copyFailed: "无法复制文本。",
      networkError: "网络错误，请检查连接后重试。",
      user: "你",
      ai: "Kooksy AI",
      emptyGoal: "请描述你的目标。",
      emptyIdea: "请描述你的网站想法。",
      emptyFeedback: "请输入反馈。"
    },

    hi: {
      assistant: "AI सहायक",
      history: "पुरानी बातचीत",
      goal: "लक्ष्य योजना",
      creator: "वेबसाइट निर्माता",
      feedback: "प्रतिक्रिया",
      newChat: "＋ नई चैट",
      send: "भेजें ↑",
      logout: "लॉग आउट",
      welcomeTitle: "बुद्धिमत्ता की एक नई चमक।",
      welcomeText: "सवाल पूछें, बातचीत जारी रखें, फ़ाइल का विश्लेषण करें या वेबसाइट बनाएँ।",
      welcomeEyebrow: "KOOKSY AI · आपका AI कार्यक्षेत्र",
      prompt: "Kooksy AI को संदेश भेजें…",
      upload: "＋ फ़ाइल का विश्लेषण",
      suggestions: ["AI को आसान भाषा में समझाएँ", "प्रोजेक्ट की योजना बनाएँ", "Python कोड लिखें और समझाएँ"],
      historyTitle: "पुरानी बातचीत",
      historyDescription: "पुरानी बातचीत खोलें या हटाएँ।",
      historyLoading: "बातचीत लोड हो रही है…",
      noHistory: "अभी कोई सेव की गई बातचीत नहीं है।",
      goalTitle: "लक्ष्य को योजना में बदलें",
      goalDescription: "कार्य बताएँ। AI चरण, सफलता के मानदंड, जोखिम और सीमाएँ बताएगा।",
      goalLabel: "आप क्या हासिल करना चाहते हैं?",
      goalPlaceholder: "उदाहरण: छात्र पोर्टफोलियो वेबसाइट की योजना बनाएँ…",
      goalButton: "योजना बनाएँ ✦",
      creatorTitle: "वेबसाइट निर्माता",
      creatorDescription: "अपना विचार बताएँ और फ्रंटएंड, बैकएंड कोड तथा डिप्लॉयमेंट निर्देश पाएँ।",
      ideaLabel: "अपनी वेबसाइट या प्रोजेक्ट का विचार बताएँ",
      ideaPlaceholder: "वेबसाइट, सुविधाएँ, डिज़ाइन, फ्रंटएंड, बैकएंड और डेटाबेस बताएँ…",
      creatorButton: "प्रोजेक्ट बनाएँ ✦",
      creatorDisclaimer: "AI कोड और डिप्लॉयमेंट निर्देश देता है। यह वेबसाइट को अपने आप प्रकाशित नहीं करता।",
      feedbackTitle: "अपनी प्रतिक्रिया दें",
      feedbackDescription: "Kooksy AI के बारे में अपना अनुभव बताएँ।",
      name: "नाम",
      role: "भूमिका",
      state: "राज्य",
      rating: "स्टार रेटिंग",
      feedbackLabel: "प्रतिक्रिया",
      feedbackPlaceholder: "क्या अच्छा रहा? क्या बेहतर हो सकता है?",
      submitFeedback: "प्रतिक्रिया भेजें",
      loading: "कृपया प्रतीक्षा करें…",
      listening: "सुन रहा है… बोलें।",
      emptyMessage: "कृपया पहले संदेश लिखें।",
      fileTooLarge: "फ़ाइल 10 MB की सीमा से बड़ी है।",
      invalidFile: "यह फ़ाइल प्रकार समर्थित नहीं है।",
      fileSelected: "फ़ाइल चुनी गई",
      analyzing: "फ़ाइल का विश्लेषण हो रहा है…",
      fileSuccess: "फ़ाइल विश्लेषण पूरा हुआ।",
      chatFailed: "AI उत्तर नहीं मिल पाया। फिर कोशिश करें।",
      goalFailed: "योजना नहीं बन पाई। फिर कोशिश करें।",
      creatorFailed: "प्रोजेक्ट नहीं बन पाया। फिर कोशिश करें।",
      feedbackSuccess: "धन्यवाद! आपकी प्रतिक्रिया भेज दी गई।",
      feedbackFailed: "प्रतिक्रिया नहीं भेजी जा सकी। फिर कोशिश करें।",
      chooseRating: "कृपया स्टार रेटिंग चुनें।",
      historyFailed: "चैट इतिहास लोड नहीं हो सका।",
      historyDelete: "हटाएँ",
      historyOpen: "खोलें",
      confirmDelete: "क्या यह बातचीत हटानी है?",
      deleteFailed: "बातचीत हटाई नहीं जा सकी।",
      deleteSuccess: "बातचीत हटा दी गई।",
      copied: "कॉपी हो गया।",
      copyFailed: "टेक्स्ट कॉपी नहीं हो सका।",
      networkError: "नेटवर्क त्रुटि। कनेक्शन जाँचकर फिर कोशिश करें।",
      user: "आप",
      ai: "Kooksy AI",
      emptyGoal: "कृपया अपना लक्ष्य बताएँ।",
      emptyIdea: "कृपया वेबसाइट का विचार बताएँ।",
      emptyFeedback: "कृपया अपनी प्रतिक्रिया लिखें।"
    },

    es: {
      assistant: "Asistente de IA",
      history: "Historial de conversaciones",
      goal: "Objetivo del agente",
      creator: "Creador de sitios web",
      feedback: "Comentarios",
      newChat: "＋ Nuevo chat",
      send: "Enviar ↑",
      logout: "Cerrar sesión",
      welcomeTitle: "Inteligencia con chispa.",
      welcomeText: "Haz preguntas, continúa conversaciones, analiza archivos o convierte ideas en proyectos web.",
      welcomeEyebrow: "KOOKSY AI · TU ESPACIO DE IA",
      prompt: "Escribe a Kooksy AI…",
      upload: "＋ Analizar un archivo",
      suggestions: ["Explica la IA de forma sencilla", "Ayúdame a planificar un proyecto", "Escribe y explica código Python"],
      historyTitle: "Historial de conversaciones",
      historyDescription: "Abre una conversación anterior o elimina las que ya no necesites.",
      historyLoading: "Cargando conversaciones…",
      noHistory: "Todavía no hay conversaciones guardadas.",
      goalTitle: "Convierte un objetivo en un plan",
      goalDescription: "Describe una tarea para obtener pasos, criterios de éxito, riesgos y limitaciones.",
      goalLabel: "¿Qué quieres conseguir?",
      goalPlaceholder: "Ejemplo: planifica un sitio web de portafolio para estudiantes…",
      goalButton: "Generar plan ✦",
      creatorTitle: "Creador de sitios web",
      creatorDescription: "Describe tu idea para generar código frontend, backend e instrucciones de implementación.",
      ideaLabel: "Describe tu sitio web o proyecto",
      ideaPlaceholder: "Describe las funciones, el diseño, el frontend, el backend y la base de datos…",
      creatorButton: "Generar proyecto ✦",
      creatorDisclaimer: "La IA genera código e instrucciones; no publica el sitio automáticamente. Prueba el código antes de usarlo.",
      feedbackTitle: "Comparte tus comentarios",
      feedbackDescription: "Cuéntanos tu experiencia con Kooksy AI.",
      name: "Nombre",
      role: "Rol",
      state: "Estado",
      rating: "Calificación por estrellas",
      feedbackLabel: "Comentarios",
      feedbackPlaceholder: "¿Qué funcionó bien? ¿Qué podría mejorar?",
      submitFeedback: "Enviar comentarios",
      loading: "Espera, por favor…",
      listening: "Escuchando… Habla ahora.",
      emptyMessage: "Escribe un mensaje primero.",
      fileTooLarge: "El archivo supera el límite de 10 MB.",
      invalidFile: "Este tipo de archivo no es compatible.",
      fileSelected: "Archivo seleccionado",
      analyzing: "Analizando archivo…",
      fileSuccess: "Análisis del archivo completado.",
      chatFailed: "No se pudo obtener una respuesta de IA. Inténtalo de nuevo.",
      goalFailed: "No se pudo generar el plan. Inténtalo de nuevo.",
      creatorFailed: "No se pudo generar el proyecto. Inténtalo de nuevo.",
      feedbackSuccess: "¡Gracias! Se enviaron tus comentarios.",
      feedbackFailed: "No se pudieron enviar los comentarios.",
      chooseRating: "Selecciona una calificación.",
      historyFailed: "No se pudo cargar el historial.",
      historyDelete: "Eliminar",
      historyOpen: "Abrir",
      confirmDelete: "¿Eliminar esta conversación?",
      deleteFailed: "No se pudo eliminar la conversación.",
      deleteSuccess: "Conversación eliminada.",
      copied: "Copiado al portapapeles.",
      copyFailed: "No se pudo copiar el texto.",
      networkError: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
      user: "Tú",
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
    "zh-CN": "中文",
    hi: "हिन्दी",
    es: "Español",
    ar: "العربية",
    fr: "Français",
    bn: "বাংলা",
    pt: "Português",
    ru: "Русский",
    ur: "اردو",
    ja: "日本語",
    de: "Deutsch",
    ta: "தமிழ்",
    te: "తెలుగు",
    ko: "한국어"
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

    bindClick(["newChatButton", "new-chat", "newChatBtn"], newChat);
    bindClick(["voiceButton", "voice-btn", "micButton"], startVoiceInput);
    bindClick(["stopSpeakingButton", "stop-speaking"], stopSpeaking);
 bindClick(["goalBtn", "goalButton", "generateGoalButton"], generateGoal);
    bindClick(["websiteButton", "generateWebsiteButton"], generateWebsite);
    bindClick(["logoutButton", "logout-btn"], logout);
    bindClick(["loadHistoryButton", "refreshHistory"], loadHistory);

    const feedbackForm = $("feedbackForm") || $("feedback-form");
    if (feedbackForm) {
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
