"use strict";

/* ============================================================
   KOOKSY AI — MAIN FRONTEND JAVASCRIPT
   File: static/app.js

   Features:
   - 15-language interface support
   - Normal User / Developer modes
   - AI chat and follow-up messages
   - Voice input and spoken AI replies
   - File upload and analysis
   - Echoes of Time chat history
   - Agent Goal planning
   - Website Creator
   - Star ratings and feedback
   - Responsive sidebar
   - API error handling
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
  const MAX_MESSAGE_LENGTH = 1000000;

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
      fileHelp:
        "CSV, TXT, MD, PDF, DOCX, JSON, PY, HTML, CSS, JS, LOG · Max 10 MB",

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
      feedbackDescription:
        "Tell us about your experience with Kooksy AI.",

      name: "Name",
      role: "Role",
      state: "State",
      rating: "Star rating",
      feedbackLabel: "Feedback",
      feedbackPlaceholder:
        "What worked well? What could improve?",
      submitFeedback: "Submit feedback",

      loading: "Please wait…",
      listening: "Listening… Speak now.",
      voiceUnsupported:
        "Voice recognition is not supported by this browser.",
      voicePermission:
        "Please allow microphone access and try again.",

      emptyMessage: "Please enter a message first.",
      fileTooLarge: "The file exceeds the 10 MB limit.",
      invalidFile: "This file type is not supported.",
      fileSelected: "File selected",
      analyzing: "Analysing file…",
      fileSuccess: "File analysis completed.",
      fileFailed: "File analysis failed.",

      chatFailed:
        "Unable to get an AI response. Please try again.",
      goalFailed:
        "Unable to generate a plan. Please try again.",
      creatorFailed:
        "Unable to generate the project. Please try again.",

      feedbackSuccess:
        "Thank you! Your feedback was submitted.",
      feedbackFailed:
        "Unable to submit feedback. Please try again.",
      chooseRating: "Please choose a star rating.",

      historyFailed: "Unable to load chat history.",
      historyDelete: "Delete",
      historyOpen: "Open",
      confirmDelete: "Delete this conversation?",
      deleteFailed: "Unable to delete this conversation.",
      deleteSuccess: "Conversation deleted.",

      copied: "Copied to clipboard.",
      copyFailed: "Unable to copy text.",
      speechUnavailable:
        "Speech output is not supported by this browser.",
      networkError:
        "Network error. Check your connection and try again.",
      sessionExpired:
        "Your session may have expired. Please log in again.",

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
      welcomeText:
        "提问、继续对话、分析文件，或将想法转化为网站项目。",
      welcomeEyebrow: "KOOKSY AI · 您的 AI 工作空间",

      prompt: "向 Kooksy AI 发送消息…",
      upload: "＋ 分析文件",

      suggestions: [
        "用简单语言解释 AI",
        "帮助我规划项目",
        "编写并解释 Python 代码"
      ],

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

      creatorDisclaimer:
        "AI 生成代码和部署指南，但不会自动部署网站。上线前请测试代码。",

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
      feedbackSuccess: "谢谢！您的反馈已提交。",
      feedbackFailed: "无法提交反馈，请重试。",
      chooseRating: "请选择星级评分。",

      historyFailed: "无法加载聊天记录。",
      historyDelete: "删除",
      historyOpen: "打开",
      confirmDelete: "确定删除此对话吗？",
      deleteFailed: "无法删除此对话。",
      deleteSuccess: "对话已删除。",

      copied: "已复制到剪贴板。",
      copyFailed: "无法复制文本。",
      speechUnavailable: "此浏览器不支持语音输出。",
      networkError: "网络错误，请检查网络后重试。",
      sessionExpired: "登录可能已过期，请重新登录。",

      planOnly: "此功能仅创建计划，不会独立执行外部操作。",
      generatedCode: "生成的项目",
      download: "下载",
      speak: "朗读",
      stopSpeaking: "停止朗读",
      copy: "复制",
      user: "你",
      ai: "Kooksy AI",

      emptyGoal: "请描述你的目标。",
      emptyIdea: "请描述你的网站想法。",
      emptyFeedback: "请输入反馈。",
      charLimit: "已达到字符限制。"
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

      welcomeTitle: "बुद्धिमत्ता की एक चमक।",
      welcomeText:
        "सवाल पूछें, बातचीत जारी रखें, फ़ाइल का विश्लेषण करें या अपने विचार को वेबसाइट प्रोजेक्ट में बदलें।",
      welcomeEyebrow: "KOOKSY AI · आपका AI कार्यक्षेत्र",

      prompt: "Kooksy AI को संदेश भेजें…",
      upload: "＋ फ़ाइल का विश्लेषण करें",

      suggestions: [
        "AI को आसान शब्दों में समझाएँ",
        "मेरे प्रोजेक्ट की योजना बनाने में मदद करें",
        "Python कोड लिखें और समझाएँ"
      ],

      historyTitle: "पुरानी बातचीत",
      historyDescription: "पुरानी बातचीत खोलें या अनावश्यक बातचीत हटाएँ।",
      historyLoading: "बातचीत लोड हो रही है…",
      noHistory: "अभी कोई बातचीत सेव नहीं है।",

      goalTitle: "लक्ष्य को योजना में बदलें",
      goalDescription:
        "कार्य बताएँ। Kooksy AI चरण, सफलता के मानदंड, जोखिम और सीमाएँ बताएगा।",
      goalLabel: "आप क्या हासिल करना चाहते हैं?",
      goalPlaceholder: "उदाहरण: छात्र पोर्टफोलियो वेबसाइट की योजना बनाएँ…",
      goalButton: "योजना बनाएँ ✦",

      creatorTitle: "वेबसाइट निर्माता",
      creatorDescription: "अपना विचार बताएँ और कोड तथा डिप्लॉयमेंट निर्देश प्राप्त करें।",
      ideaLabel: "अपनी वेबसाइट या प्रोजेक्ट का विचार बताएँ",
      ideaPlaceholder: "वेबसाइट, सुविधाएँ, डिज़ाइन और तकनीक बताएँ…",
      creatorButton: "प्रोजेक्ट बनाएँ ✦",

      creatorDisclaimer:
        "AI कोड और निर्देश बनाता है, लेकिन वेबसाइट अपने आप प्रकाशित नहीं करता।",

      feedbackTitle: "अपनी प्रतिक्रिया साझा करें",
      feedbackDescription: "Kooksy AI के साथ अपना अनुभव बताएँ।",
      name: "नाम",
      role: "भूमिका",
      state: "राज्य",
      rating: "स्टार रेटिंग",
      feedbackLabel: "प्रतिक्रिया",
      feedbackPlaceholder: "क्या अच्छा रहा? क्या बेहतर हो सकता है?",
      submitFeedback: "प्रतिक्रिया भेजें",

      loading: "कृपया प्रतीक्षा करें…",
      listening: "सुन रहा है… अब बोलें।",
      emptyMessage: "कृपया पहले संदेश लिखें।",
      fileTooLarge: "फ़ाइल 10 MB की सीमा से बड़ी है।",
      invalidFile: "यह फ़ाइल प्रकार समर्थित नहीं है।",
      fileSelected: "फ़ाइल चुनी गई",
      analyzing: "फ़ाइल का विश्लेषण हो रहा है…",
      fileSuccess: "फ़ाइल विश्लेषण पूरा हुआ।",

      chatFailed: "AI उत्तर नहीं मिल सका। फिर कोशिश करें।",
      goalFailed: "योजना नहीं बन सकी। फिर कोशिश करें।",
      creatorFailed: "प्रोजेक्ट नहीं बन सका। फिर कोशिश करें।",
      feedbackSuccess: "धन्यवाद! आपकी प्रतिक्रिया भेज दी गई।",
      feedbackFailed: "प्रतिक्रिया नहीं भेजी जा सकी।",
      chooseRating: "कृपया स्टार रेटिंग चुनें।",

      historyFailed: "चैट इतिहास लोड नहीं हुआ।",
      historyDelete: "हटाएँ",
      historyOpen: "खोलें",
      confirmDelete: "क्या यह बातचीत हटानी है?",
      deleteFailed: "बातचीत हटाई नहीं जा सकी।",
      deleteSuccess: "बातचीत हटा दी गई।",

      copied: "क्लिपबोर्ड पर कॉपी किया गया।",
      copyFailed: "टेक्स्ट कॉपी नहीं हुआ।",
      speechUnavailable: "इस ब्राउज़र में आवाज़ समर्थित नहीं है।",
      networkError: "नेटवर्क त्रुटि। कनेक्शन जाँचें।",
      sessionExpired: "लॉगिन समाप्त हो सकता है। फिर लॉगिन करें।",

      planOnly: "यह सुविधा केवल योजना बनाती है, बाहरी कार्य अपने आप नहीं करती।",
      generatedCode: "बनाया गया प्रोजेक्ट",
      download: "डाउनलोड",
      speak: "आवाज़ में सुनें",
      stopSpeaking: "आवाज़ रोकें",
      copy: "कॉपी",
      user: "आप",
      ai: "Kooksy AI",

      emptyGoal: "कृपया अपना लक्ष्य बताएँ।",
      emptyIdea: "कृपया वेबसाइट का विचार बताएँ।",
      emptyFeedback: "कृपया प्रतिक्रिया लिखें।",
      charLimit: "अक्षर सीमा पूरी हो गई।"
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

      welcomeTitle: "Inteligencia con una chispa.",
      welcomeText:
        "Haz preguntas, continúa conversaciones, analiza archivos o convierte una idea en un proyecto web.",
      welcomeEyebrow: "KOOKSY AI · TU ESPACIO DE IA",

      prompt: "Escribe un mensaje a Kooksy AI…",
      upload: "＋ Analizar un archivo",

      suggestions: [
        "Explica la IA con palabras sencillas",
        "Ayúdame a planificar un proyecto",
        "Escribe y explica código Python"
      ],

      historyTitle: "Historial de conversaciones",
      historyDescription: "Abre una conversación anterior o elimina una que ya no necesites.",
      historyLoading: "Cargando conversaciones…",
      noHistory: "Todavía no hay conversaciones guardadas.",

      goalTitle: "Convierte un objetivo en un plan",
      goalDescription:
        "Describe una tarea. Kooksy AI organizará los pasos, criterios de éxito, riesgos y limitaciones.",
      goalLabel: "¿Qué quieres conseguir?",
      goalPlaceholder: "Ejemplo: planificar un sitio web de portafolio para estudiantes…",
      goalButton: "Generar plan ✦",

      creatorTitle: "Creador de sitios web",
      creatorDescription: "Describe tu idea para generar código e instrucciones de publicación.",
      ideaLabel: "Describe tu sitio web o proyecto",
      ideaPlaceholder: "Describe el sitio web, sus funciones, diseño y tecnología…",
      creatorButton: "Generar proyecto ✦",

      creatorDisclaimer:
        "La IA genera código e instrucciones, pero no publica el sitio automáticamente.",

      feedbackTitle: "Comparte tus comentarios",
      feedbackDescription: "Cuéntanos tu experiencia con Kooksy AI.",
      name: "Nombre",
      role: "Rol",
      state: "Estado",
      rating: "Valoración por estrellas",
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

      chatFailed: "No se pudo obtener una respuesta. Inténtalo de nuevo.",
      goalFailed: "No se pudo generar el plan. Inténtalo de nuevo.",
      creatorFailed: "No se pudo generar el proyecto. Inténtalo de nuevo.",
      feedbackSuccess: "¡Gracias! Se enviaron tus comentarios.",
      feedbackFailed: "No se pudieron enviar los comentarios.",
      chooseRating: "Selecciona una valoración por estrellas.",

      historyFailed: "No se pudo cargar el historial.",
      historyDelete: "Eliminar",
      historyOpen: "Abrir",
      confirmDelete: "¿Eliminar esta conversación?",
      deleteFailed: "No se pudo eliminar la conversación.",
      deleteSuccess: "Conversación eliminada.",

      copied: "Copiado al portapapeles.",
      copyFailed: "No se pudo copiar el texto.",
      speechUnavailable: "Este navegador no admite voz.",
      networkError: "Error de red. Comprueba la conexión.",
      sessionExpired: "Es posible que tu sesión haya caducado. Inicia sesión de nuevo.",

      planOnly: "Esta función solo crea un plan; no realiza acciones externas automáticamente.",
      generatedCode: "Proyecto generado",
      download: "Descargar",
      speak: "Leer en voz alta",
      stopSpeaking: "Detener voz",
      copy: "Copiar",
      user: "Tú",
      ai: "Kooksy AI",

      emptyGoal: "Describe tu objetivo.",
      emptyIdea: "Describe tu idea para el sitio web.",
      emptyFeedback: "Escribe tus comentarios.",
      charLimit: "Se alcanzó el límite de caracteres."
    },

        /* ---------------- OTHER LANGUAGE DICTIONARIES ---------------- */

    ar: {
      assistant: "مساعد الذكاء الاصطناعي",
      history: "سجل المحادثات",
      goal: "خطة الهدف",
      creator: "منشئ المواقع",
      feedback: "الملاحظات",
      newChat: "＋ محادثة جديدة",
      send: "إرسال ↑",
      logout: "تسجيل الخروج",
      welcomeTitle: "ذكاء يتألق بالإبداع.",
      welcomeText: "اطرح الأسئلة، وحلل الملفات، وحوّل أفكارك إلى مشاريع مواقع ويب.",
      welcomeEyebrow: "KOOKSY AI · مساحة عملك للذكاء الاصطناعي",
      prompt: "اكتب رسالة إلى Kooksy AI…",
      upload: "＋ تحليل ملف",
      historyTitle: "سجل المحادثات",
      historyDescription: "افتح محادثة سابقة أو احذف محادثة لم تعد تحتاج إليها.",
      historyLoading: "جارٍ تحميل المحادثات…",
      noHistory: "لا توجد محادثات محفوظة حتى الآن.",
      goalTitle: "حوّل هدفك إلى خطة",
      goalDescription: "صف المهمة للحصول على خطوات ومعايير نجاح ومخاطر وحدود.",
      goalLabel: "ما الذي تريد تحقيقه؟",
      goalPlaceholder: "صف هدفك هنا…",
      goalButton: "إنشاء خطة ✦",
      creatorTitle: "منشئ المواقع",
      creatorDescription: "صف فكرتك للحصول على التعليمات والشفرة.",
      ideaLabel: "صف موقعك أو فكرتك",
      ideaPlaceholder: "صف الموقع والميزات والتصميم والتقنيات…",
      creatorButton: "إنشاء المشروع ✦",
      creatorDisclaimer: "تُنشأ الشفرة والتعليمات فقط؛ لا يتم نشر الموقع تلقائيًا.",
      feedbackTitle: "شارك ملاحظاتك",
      feedbackDescription: "أخبرنا عن تجربتك مع Kooksy AI.",
      name: "الاسم",
      role: "الدور",
      state: "الولاية",
      rating: "التقييم بالنجوم",
      feedbackLabel: "الملاحظات",
      feedbackPlaceholder: "ما الذي كان جيدًا؟ وما الذي يحتاج إلى تحسين؟",
      submitFeedback: "إرسال الملاحظات",
      loading: "يرجى الانتظار…",
      listening: "جارٍ الاستماع… تحدث الآن.",
      emptyMessage: "يرجى كتابة رسالة أولًا.",
      fileTooLarge: "حجم الملف أكبر من 10 ميغابايت.",
      invalidFile: "نوع الملف غير مدعوم.",
      fileSelected: "تم تحديد الملف",
      analyzing: "جارٍ تحليل الملف…",
      fileSuccess: "اكتمل تحليل الملف.",
      chatFailed: "تعذر الحصول على رد. حاول مرة أخرى.",
      goalFailed: "تعذر إنشاء الخطة.",
      creatorFailed: "تعذر إنشاء المشروع.",
      feedbackSuccess: "شكرًا! تم إرسال ملاحظاتك.",
      feedbackFailed: "تعذر إرسال الملاحظات.",
      chooseRating: "يرجى اختيار تقييم بالنجوم.",
      historyFailed: "تعذر تحميل سجل المحادثات.",
      historyDelete: "حذف",
      historyOpen: "فتح",
      confirmDelete: "هل تريد حذف هذه المحادثة؟",
      deleteFailed: "تعذر حذف المحادثة.",
      deleteSuccess: "تم حذف المحادثة.",
      copied: "تم النسخ.",
      copyFailed: "تعذر نسخ النص.",
      speechUnavailable: "المتصفح لا يدعم إخراج الصوت.",
      networkError: "خطأ في الشبكة. تحقق من الاتصال.",
      sessionExpired: "قد تكون الجلسة منتهية. سجّل الدخول مجددًا.",
      planOnly: "تنشئ هذه الميزة خطة فقط ولا تنفذ إجراءات خارجية تلقائيًا.",
      generatedCode: "المشروع الذي تم إنشاؤه",
      download: "تنزيل",
      speak: "قراءة بصوت عالٍ",
      stopSpeaking: "إيقاف الصوت",
      copy: "نسخ",
      user: "أنت",
      ai: "Kooksy AI",
      emptyGoal: "يرجى وصف هدفك.",
      emptyIdea: "يرجى وصف فكرة موقعك.",
      emptyFeedback: "يرجى كتابة ملاحظاتك.",
      charLimit: "تم بلوغ الحد الأقصى للأحرف."
    },

    fr: {
      assistant: "Assistant IA",
      history: "Historique des conversations",
      goal: "Objectif de l'agent",
      creator: "Créateur de sites web",
      feedback: "Commentaires",
      newChat: "＋ Nouvelle discussion",
      send: "Envoyer ↑",
      logout: "Déconnexion",
      welcomeTitle: "L'intelligence avec une étincelle.",
      welcomeText: "Posez des questions, analysez des fichiers ou transformez vos idées en projets web.",
      welcomeEyebrow: "KOOKSY AI · VOTRE ESPACE IA",
      prompt: "Écrivez un message à Kooksy AI…",
      upload: "＋ Analyser un fichier",
      historyTitle: "Historique des conversations",
      historyDescription: "Ouvrez une ancienne conversation ou supprimez celle dont vous n'avez plus besoin.",
      historyLoading: "Chargement des conversations…",
      noHistory: "Aucune conversation enregistrée.",
      goalTitle: "Transformez un objectif en plan",
      goalDescription: "Décrivez une tâche pour obtenir des étapes, des critères de réussite, des risques et des limites.",
      goalLabel: "Que souhaitez-vous accomplir ?",
      goalPlaceholder: "Décrivez votre objectif…",
      goalButton: "Générer un plan ✦",
      creatorTitle: "Créateur de sites web",
      creatorDescription: "Décrivez votre idée pour générer du code et des instructions.",
      ideaLabel: "Décrivez votre site ou votre projet",
      ideaPlaceholder: "Décrivez le site, ses fonctionnalités, son design et ses technologies…",
      creatorButton: "Générer le projet ✦",
      creatorDisclaimer: "Le code est généré, mais le site n'est pas publié automatiquement.",
      feedbackTitle: "Partagez vos commentaires",
      feedbackDescription: "Parlez-nous de votre expérience avec Kooksy AI.",
      name: "Nom",
      role: "Rôle",
      state: "État",
      rating: "Note en étoiles",
      feedbackLabel: "Commentaires",
      feedbackPlaceholder: "Qu'est-ce qui fonctionne bien ? Que faut-il améliorer ?",
      submitFeedback: "Envoyer les commentaires",
      loading: "Veuillez patienter…",
      listening: "Écoute en cours… Parlez maintenant.",
      emptyMessage: "Veuillez d'abord saisir un message.",
      fileTooLarge: "Le fichier dépasse la limite de 10 Mo.",
      invalidFile: "Ce type de fichier n'est pas pris en charge.",
      fileSelected: "Fichier sélectionné",
      analyzing: "Analyse du fichier…",
      fileSuccess: "Analyse terminée.",
      chatFailed: "Impossible d'obtenir une réponse. Réessayez.",
      goalFailed: "Impossible de générer le plan.",
      creatorFailed: "Impossible de générer le projet.",
      feedbackSuccess: "Merci ! Votre commentaire a été envoyé.",
      feedbackFailed: "Impossible d'envoyer le commentaire.",
      chooseRating: "Veuillez choisir une note.",
      historyFailed: "Impossible de charger l'historique.",
      historyDelete: "Supprimer",
      historyOpen: "Ouvrir",
      confirmDelete: "Supprimer cette conversation ?",
      deleteFailed: "Impossible de supprimer la conversation.",
      deleteSuccess: "Conversation supprimée.",
      copied: "Copié dans le presse-papiers.",
      copyFailed: "Impossible de copier le texte.",
      speechUnavailable: "Ce navigateur ne prend pas en charge la synthèse vocale.",
      networkError: "Erreur réseau. Vérifiez votre connexion.",
      sessionExpired: "Votre session a peut-être expiré. Reconnectez-vous.",
      planOnly: "Cette fonctionnalité crée un plan sans effectuer automatiquement d'actions externes.",
      generatedCode: "Projet généré",
      download: "Télécharger",
      speak: "Lire à voix haute",
      stopSpeaking: "Arrêter la lecture",
      copy: "Copier",
      user: "Vous",
      ai: "Kooksy AI",
      emptyGoal: "Veuillez décrire votre objectif.",
      emptyIdea: "Veuillez décrire votre idée de site web.",
      emptyFeedback: "Veuillez saisir votre commentaire.",
      charLimit: "Limite de caractères atteinte."
    },

    bn: {
      assistant: "AI সহকারী",
      history: "কথোপকথনের ইতিহাস",
      goal: "লক্ষ্য পরিকল্পনা",
      creator: "ওয়েবসাইট নির্মাতা",
      feedback: "মতামত",
      newChat: "＋ নতুন চ্যাট",
      send: "পাঠান ↑",
      logout: "লগ আউট",
      welcomeTitle: "সৃজনশীলতার সঙ্গে বুদ্ধিমত্তা।",
      welcomeText: "প্রশ্ন করুন, ফাইল বিশ্লেষণ করুন অথবা আপনার ধারণাকে ওয়েবসাইট প্রকল্পে রূপান্তর করুন।",
      welcomeEyebrow: "KOOKSY AI · আপনার AI কর্মক্ষেত্র",
      prompt: "Kooksy AI-কে বার্তা লিখুন…",
      upload: "＋ ফাইল বিশ্লেষণ করুন",
      historyTitle: "কথোপকথনের ইতিহাস",
      historyDescription: "আগের কথোপকথন খুলুন অথবা অপ্রয়োজনীয় কথোপকথন মুছুন।",
      historyLoading: "কথোপকথন লোড হচ্ছে…",
      noHistory: "এখনও কোনো সংরক্ষিত কথোপকথন নেই।",
      goalTitle: "লক্ষ্যকে পরিকল্পনায় রূপান্তর করুন",
      goalDescription: "কাজের বিবরণ দিন। AI ধাপ, সাফল্যের মানদণ্ড, ঝুঁকি ও সীমাবদ্ধতা সাজাবে।",
      goalLabel: "আপনি কী অর্জন করতে চান?",
      goalPlaceholder: "আপনার লক্ষ্য লিখুন…",
      goalButton: "পরিকল্পনা তৈরি করুন ✦",
      creatorTitle: "ওয়েবসাইট নির্মাতা",
      creatorDescription: "আপনার ধারণা থেকে কোড এবং প্রকাশের নির্দেশনা তৈরি করুন।",
      ideaLabel: "আপনার ওয়েবসাইট বা প্রকল্পের ধারণা লিখুন",
      ideaPlaceholder: "ওয়েবসাইট, বৈশিষ্ট্য, ডিজাইন এবং প্রযুক্তি বর্ণনা করুন…",
      creatorButton: "প্রকল্প তৈরি করুন ✦",
      creatorDisclaimer: "AI কোড তৈরি করে, কিন্তু ওয়েবসাইট স্বয়ংক্রিয়ভাবে প্রকাশ করে না।",
      feedbackTitle: "আপনার মতামত জানান",
      feedbackDescription: "Kooksy AI ব্যবহারের অভিজ্ঞতা জানান।",
      name: "নাম",
      role: "ভূমিকা",
      state: "রাজ্য",
      rating: "স্টার রেটিং",
      feedbackLabel: "মতামত",
      feedbackPlaceholder: "কী ভালো হয়েছে? কী উন্নত করা যায়?",
      submitFeedback: "মতামত পাঠান",
      loading: "অনুগ্রহ করে অপেক্ষা করুন…",
      listening: "শোনা হচ্ছে… এখন কথা বলুন।",
      emptyMessage: "প্রথমে একটি বার্তা লিখুন।",
      fileTooLarge: "ফাইলটি ১০ MB সীমা অতিক্রম করেছে।",
      invalidFile: "এই ফাইলের ধরন সমর্থিত নয়।",
      fileSelected: "ফাইল নির্বাচন করা হয়েছে",
      analyzing: "ফাইল বিশ্লেষণ হচ্ছে…",
      fileSuccess: "ফাইল বিশ্লেষণ সম্পন্ন হয়েছে।",
      chatFailed: "AI উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।",
      goalFailed: "পরিকল্পনা তৈরি করা যায়নি।",
      creatorFailed: "প্রকল্প তৈরি করা যায়নি।",
      feedbackSuccess: "ধন্যবাদ! আপনার মতামত পাঠানো হয়েছে।",
      feedbackFailed: "মতামত পাঠানো যায়নি।",
      chooseRating: "একটি স্টার রেটিং নির্বাচন করুন।",
      historyFailed: "চ্যাটের ইতিহাস লোড করা যায়নি।",
      historyDelete: "মুছুন",
      historyOpen: "খুলুন",
      confirmDelete: "এই কথোপকথনটি মুছবেন?",
      deleteFailed: "কথোপকথন মুছতে ব্যর্থ হয়েছে।",
      deleteSuccess: "কথোপকথন মুছে ফেলা হয়েছে।",
      copied: "ক্লিপবোর্ডে কপি করা হয়েছে।",
      copyFailed: "টেক্সট কপি করা যায়নি।",
      speechUnavailable: "এই ব্রাউজারে স্পিচ আউটপুট সমর্থিত নয়।",
      networkError: "নেটওয়ার্ক সমস্যা। সংযোগ পরীক্ষা করুন।",
      sessionExpired: "আপনার সেশন শেষ হয়ে থাকতে পারে। আবার লগইন করুন।",
      planOnly: "এই ফিচারটি শুধু পরিকল্পনা তৈরি করে; বাহ্যিক কাজ নিজে থেকে করে না।",
      generatedCode: "তৈরি করা প্রকল্প",
      download: "ডাউনলোড",
      speak: "জোরে পড়ুন",
      stopSpeaking: "পড়া বন্ধ করুন",
      copy: "কপি",
      user: "আপনি",
      ai: "Kooksy AI",
      emptyGoal: "আপনার লক্ষ্য বর্ণনা করুন।",
      emptyIdea: "আপনার ওয়েবসাইটের ধারণা বর্ণনা করুন।",
      emptyFeedback: "আপনার মতামত লিখুন।",
      charLimit: "অক্ষরের সীমা পূর্ণ হয়েছে।"
    },

    pt: {
      assistant: "Assistente de IA",
      history: "Histórico de conversas",
      goal: "Objetivo do agente",
      creator: "Criador de sites",
      feedback: "Comentários",
      newChat: "＋ Nova conversa",
      send: "Enviar ↑",
      logout: "Sair",
      welcomeTitle: "Inteligência com uma faísca.",
      welcomeText: "Faça perguntas, analise arquivos ou transforme ideias em projetos web.",
      welcomeEyebrow: "KOOKSY AI · SEU ESPAÇO DE IA",
      prompt: "Envie uma mensagem para Kooksy AI…",
      upload: "＋ Analisar arquivo",
      historyTitle: "Histórico de conversas",
      historyDescription: "Abra conversas anteriores ou exclua as que não precisa.",
      historyLoading: "Carregando conversas…",
      noHistory: "Nenhuma conversa salva ainda.",
      goalTitle: "Transforme uma meta em um plano",
      goalDescription: "Descreva uma tarefa para organizar etapas, critérios de sucesso, riscos e limitações.",
      goalLabel: "O que você quer alcançar?",
      goalPlaceholder: "Descreva sua meta…",
      goalButton: "Gerar plano ✦",
      creatorTitle: "Criador de sites",
      creatorDescription: "Descreva sua ideia para gerar código e instruções de publicação.",
      ideaLabel: "Descreva seu site ou projeto",
      ideaPlaceholder: "Descreva o site, os recursos, o design e as tecnologias…",
      creatorButton: "Gerar projeto ✦",
      creatorDisclaimer: "A IA gera código, mas não publica o site automaticamente.",
      feedbackTitle: "Compartilhe sua opinião",
      feedbackDescription: "Conte sua experiência com o Kooksy AI.",
      name: "Nome",
      role: "Função",
      state: "Estado",
      rating: "Avaliação por estrelas",
      feedbackLabel: "Comentários",
      feedbackPlaceholder: "O que funcionou bem? O que pode melhorar?",
      submitFeedback: "Enviar comentários",
      loading: "Aguarde…",
      listening: "Ouvindo… Fale agora.",
      emptyMessage: "Digite uma mensagem primeiro.",
      fileTooLarge: "O arquivo ultrapassa o limite de 10 MB.",
      invalidFile: "Este tipo de arquivo não é compatível.",
      fileSelected: "Arquivo selecionado",
      analyzing: "Analisando arquivo…",
      fileSuccess: "Análise concluída.",
      chatFailed: "Não foi possível obter uma resposta. Tente novamente.",
      goalFailed: "Não foi possível gerar o plano.",
      creatorFailed: "Não foi possível gerar o projeto.",
      feedbackSuccess: "Obrigado! Seu comentário foi enviado.",
      feedbackFailed: "Não foi possível enviar o comentário.",
      chooseRating: "Escolha uma avaliação por estrelas.",
      historyFailed: "Não foi possível carregar o histórico.",
      historyDelete: "Excluir",
      historyOpen: "Abrir",
      confirmDelete: "Excluir esta conversa?",
      deleteFailed: "Não foi possível excluir a conversa.",
      deleteSuccess: "Conversa excluída.",
      copied: "Copiado para a área de transferência.",
      copyFailed: "Não foi possível copiar o texto.",
      speechUnavailable: "Este navegador não oferece suporte à fala.",
      networkError: "Erro de rede. Verifique sua conexão.",
      sessionExpired: "Sua sessão pode ter expirado. Entre novamente.",
      planOnly: "Este recurso cria apenas um plano; não executa ações externas automaticamente.",
      generatedCode: "Projeto gerado",
      download: "Baixar",
      speak: "Ler em voz alta",
      stopSpeaking: "Parar leitura",
      copy: "Copiar",
      user: "Você",
      ai: "Kooksy AI",
      emptyGoal: "Descreva sua meta.",
      emptyIdea: "Descreva sua ideia de site.",
      emptyFeedback: "Digite seus comentários.",
      charLimit: "Limite de caracteres atingido."
    },

    ru: {
      assistant: "ИИ-ассистент",
      history: "История разговоров",
      goal: "План цели",
      creator: "Создатель сайтов",
      feedback: "Отзывы",
      newChat: "＋ Новый чат",
      send: "Отправить ↑",
      logout: "Выйти",
      welcomeTitle: "Интеллект с искрой.",
      welcomeText: "Задавайте вопросы, анализируйте файлы и превращайте идеи в веб-проекты.",
      welcomeEyebrow: "KOOKSY AI · ВАШЕ ПРОСТРАНСТВО ИИ",
      prompt: "Напишите сообщение для Kooksy AI…",
      upload: "＋ Анализировать файл",
      historyTitle: "История разговоров",
      historyDescription: "Открывайте прошлые разговоры или удаляйте ненужные.",
      historyLoading: "Загрузка разговоров…",
      noHistory: "Сохранённых разговоров пока нет.",
      goalTitle: "Превратите цель в план",
      goalDescription: "Опишите задачу, чтобы получить шаги, критерии успеха, риски и ограничения.",
      goalLabel: "Чего вы хотите достичь?",
      goalPlaceholder: "Опишите свою цель…",
      goalButton: "Создать план ✦",
      creatorTitle: "Создатель сайтов",
      creatorDescription: "Опишите идею, чтобы получить код и инструкции по публикации.",
      ideaLabel: "Опишите сайт или проект",
      ideaPlaceholder: "Опишите функции, дизайн и технологии…",
      creatorButton: "Создать проект ✦",
      creatorDisclaimer: "ИИ создаёт код и инструкции, но не публикует сайт автоматически.",
      feedbackTitle: "Оставьте отзыв",
      feedbackDescription: "Расскажите о своём опыте использования Kooksy AI.",
      name: "Имя",
      role: "Роль",
      state: "Штат",
      rating: "Оценка звёздами",
      feedbackLabel: "Отзыв",
      feedbackPlaceholder: "Что было хорошо? Что можно улучшить?",
      submitFeedback: "Отправить отзыв",
      loading: "Пожалуйста, подождите…",
      listening: "Слушаю… Говорите.",
      emptyMessage: "Сначала введите сообщение.",
      fileTooLarge: "Размер файла превышает 10 МБ.",
      invalidFile: "Этот тип файла не поддерживается.",
      fileSelected: "Файл выбран",
      analyzing: "Анализ файла…",
      fileSuccess: "Анализ завершён.",
      chatFailed: "Не удалось получить ответ. Попробуйте ещё раз.",
      goalFailed: "Не удалось создать план.",
      creatorFailed: "Не удалось создать проект.",
      feedbackSuccess: "Спасибо! Ваш отзыв отправлен.",
      feedbackFailed: "Не удалось отправить отзыв.",
      chooseRating: "Выберите оценку звёздами.",
      historyFailed: "Не удалось загрузить историю.",
      historyDelete: "Удалить",
      historyOpen: "Открыть",
      confirmDelete: "Удалить этот разговор?",
      deleteFailed: "Не удалось удалить разговор.",
      deleteSuccess: "Разговор удалён.",
      copied: "Скопировано в буфер обмена.",
      copyFailed: "Не удалось скопировать текст.",
      speechUnavailable: "Этот браузер не поддерживает озвучивание.",
      networkError: "Ошибка сети. Проверьте подключение.",
      sessionExpired: "Возможно, срок сессии истёк. Войдите снова.",
      planOnly: "Эта функция создаёт план, но не выполняет внешние действия автоматически.",
      generatedCode: "Созданный проект",
      download: "Скачать",
      speak: "Прочитать вслух",
      stopSpeaking: "Остановить озвучивание",
      copy: "Копировать",
      user: "Вы",
      ai: "Kooksy AI",
      emptyGoal: "Опишите свою цель.",
      emptyIdea: "Опишите идею сайта.",
      emptyFeedback: "Введите отзыв.",
      charLimit: "Достигнут предел символов."
    },

    ur: {
      assistant: "AI اسسٹنٹ",
      history: "گفتگو کی تاریخ",
      goal: "مقصد کا منصوبہ",
      creator: "ویب سائٹ بنانے والا",
      feedback: "رائے",
      newChat: "＋ نئی گفتگو",
      send: "بھیجیں ↑",
      logout: "لاگ آؤٹ",
      welcomeTitle: "چمک کے ساتھ ذہانت۔",
      welcomeText: "سوالات پوچھیں، فائلوں کا تجزیہ کریں اور اپنے خیالات کو ویب منصوبوں میں تبدیل کریں۔",
      welcomeEyebrow: "KOOKSY AI · آپ کا AI ورک اسپیس",
      prompt: "Kooksy AI کو پیغام لکھیں…",
      upload: "＋ فائل کا تجزیہ کریں",
      historyTitle: "گفتگو کی تاریخ",
      historyDescription: "پچھلی گفتگو کھولیں یا غیر ضروری گفتگو حذف کریں۔",
      historyLoading: "گفتگو لوڈ ہو رہی ہے…",
      noHistory: "ابھی کوئی محفوظ گفتگو نہیں ہے۔",
      goalTitle: "مقصد کو منصوبے میں تبدیل کریں",
      goalDescription: "کام بیان کریں تاکہ مراحل، کامیابی کے معیار، خطرات اور حدود معلوم ہوں۔",
      goalLabel: "آپ کیا حاصل کرنا چاہتے ہیں؟",
      goalPlaceholder: "اپنا مقصد بیان کریں…",
      goalButton: "منصوبہ بنائیں ✦",
      creatorTitle: "ویب سائٹ بنانے والا",
      creatorDescription: "اپنے خیال کی وضاحت کریں تاکہ کوڈ اور ہدایات تیار ہوں۔",
      ideaLabel: "اپنی ویب سائٹ یا منصوبے کی وضاحت کریں",
      ideaPlaceholder: "ویب سائٹ، خصوصیات، ڈیزائن اور ٹیکنالوجی بیان کریں…",
      creatorButton: "منصوبہ بنائیں ✦",
      creatorDisclaimer: "AI کوڈ تیار کرتا ہے، لیکن ویب سائٹ خودکار طور پر شائع نہیں کرتا۔",
      feedbackTitle: "اپنی رائے دیں",
      feedbackDescription: "Kooksy AI کے بارے میں اپنا تجربہ بتائیں۔",
      name: "نام",
      role: "کردار",
      state: "ریاست",
      rating: "ستاروں کی درجہ بندی",
      feedbackLabel: "رائے",
      feedbackPlaceholder: "کیا اچھا تھا؟ کیا بہتر ہو سکتا ہے؟",
      submitFeedback: "رائے بھیجیں",
      loading: "براہ کرم انتظار کریں…",
      listening: "سن رہا ہے… اب بولیں۔",
      emptyMessage: "پہلے پیغام لکھیں۔",
      fileTooLarge: "فائل 10 MB کی حد سے بڑی ہے۔",
      invalidFile: "یہ فائل فارمیٹ معاونت یافتہ نہیں ہے۔",
      fileSelected: "فائل منتخب ہو گئی",
      analyzing: "فائل کا تجزیہ ہو رہا ہے…",
      fileSuccess: "فائل کا تجزیہ مکمل ہو گیا۔",
      chatFailed: "AI جواب حاصل نہیں ہو سکا۔ دوبارہ کوشش کریں۔",
      goalFailed: "منصوبہ تیار نہیں ہو سکا۔",
      creatorFailed: "منصوبہ تیار نہیں ہو سکا۔",
      feedbackSuccess: "شکریہ! آپ کی رائے بھیج دی گئی ہے۔",
      feedbackFailed: "رائے بھیجی نہیں جا سکی۔",
      chooseRating: "ستاروں کی درجہ بندی منتخب کریں۔",
      historyFailed: "گفتگو کی تاریخ لوڈ نہیں ہو سکی۔",
      historyDelete: "حذف کریں",
      historyOpen: "کھولیں",
      confirmDelete: "کیا یہ گفتگو حذف کرنی ہے؟",
      deleteFailed: "گفتگو حذف نہیں ہو سکی۔",
      deleteSuccess: "گفتگو حذف ہو گئی۔",
      copied: "کلپ بورڈ پر کاپی ہو گیا۔",
      copyFailed: "متن کاپی نہیں ہو سکا۔",
      speechUnavailable: "یہ براؤزر آواز کی سہولت فراہم نہیں کرتا۔",
      networkError: "نیٹ ورک کی خرابی۔ اپنا کنکشن چیک کریں۔",
      sessionExpired: "سیشن ختم ہو سکتا ہے۔ دوبارہ لاگ ان کریں۔",
      planOnly: "یہ خصوصیت صرف منصوبہ بناتی ہے؛ بیرونی کام خودکار طور پر نہیں کرتی۔",
      generatedCode: "تیار کردہ منصوبہ",
      download: "ڈاؤن لوڈ",
      speak: "بلند آواز سے پڑھیں",
      stopSpeaking: "آواز بند کریں",
      copy: "کاپی",
      user: "آپ",
      ai: "Kooksy AI",
      emptyGoal: "اپنا مقصد بیان کریں۔",
      emptyIdea: "ویب سائٹ کا خیال بیان کریں۔",
      emptyFeedback: "اپنی رائے لکھیں۔",
      charLimit: "حروف کی حد پوری ہو گئی۔"
    },

    ja: {
      assistant: "AIアシスタント",
      history: "会話履歴",
      goal: "目標プラン",
      creator: "ウェブサイト作成",
      feedback: "フィードバック",
      newChat: "＋ 新しいチャット",
      send: "送信 ↑",
      logout: "ログアウト",
      welcomeTitle: "ひらめきのある知性。",
      welcomeText: "質問、ファイル分析、アイデアからのウェブプロジェクト作成ができます。",
      welcomeEyebrow: "KOOKSY AI · あなたのAIワークスペース",
      prompt: "Kooksy AIにメッセージを入力…",
      upload: "＋ ファイルを分析",
      historyTitle: "会話履歴",
      historyDescription: "以前の会話を開いたり、不要な会話を削除したりできます。",
      historyLoading: "会話を読み込み中…",
      noHistory: "保存された会話はありません。",
      goalTitle: "目標を計画に変える",
      goalDescription: "タスクを説明すると、手順、成功基準、リスク、制限を整理します。",
      goalLabel: "何を達成したいですか？",
      goalPlaceholder: "目標を入力してください…",
      goalButton: "計画を作成 ✦",
      creatorTitle: "ウェブサイト作成",
      creatorDescription: "アイデアを説明してコードと公開手順を作成します。",
      ideaLabel: "ウェブサイトまたはプロジェクトの説明",
      ideaPlaceholder: "機能、デザイン、技術などを説明してください…",
      creatorButton: "プロジェクトを作成 ✦",
      creatorDisclaimer: "コードを生成しますが、ウェブサイトは自動公開されません。",
      feedbackTitle: "フィードバックを送る",
      feedbackDescription: "Kooksy AIの使用感を教えてください。",
      name: "名前",
      role: "役割",
      state: "州",
      rating: "星評価",
      feedbackLabel: "フィードバック",
      feedbackPlaceholder: "良かった点や改善点を教えてください。",
      submitFeedback: "送信",
      loading: "お待ちください…",
      listening: "聞き取り中…話してください。",
      emptyMessage: "最初にメッセージを入力してください。",
      fileTooLarge: "ファイルが10MBの上限を超えています。",
      invalidFile: "このファイル形式には対応していません。",
      fileSelected: "ファイルを選択しました",
      analyzing: "ファイルを分析中…",
      fileSuccess: "ファイル分析が完了しました。",
      chatFailed: "回答を取得できませんでした。もう一度お試しください。",
      goalFailed: "計画を作成できませんでした。",
      creatorFailed: "プロジェクトを作成できませんでした。",
      feedbackSuccess: "ありがとうございます。フィードバックを送信しました。",
      feedbackFailed: "フィードバックを送信できませんでした。",
      chooseRating: "星評価を選択してください。",
      historyFailed: "履歴を読み込めませんでした。",
      historyDelete: "削除",
      historyOpen: "開く",
      confirmDelete: "この会話を削除しますか？",
      deleteFailed: "会話を削除できませんでした。",
      deleteSuccess: "会話を削除しました。",
      copied: "クリップボードにコピーしました。",
      copyFailed: "テキストをコピーできませんでした。",
      speechUnavailable: "このブラウザは音声読み上げに対応していません。",
      networkError: "ネットワークエラーです。接続を確認してください。",
      sessionExpired: "セッションが切れた可能性があります。再ログインしてください。",
      planOnly: "この機能は計画を作成しますが、外部操作は自動実行しません。",
      generatedCode: "生成されたプロジェクト",
      download: "ダウンロード",
      speak: "読み上げ",
      stopSpeaking: "読み上げを停止",
      copy: "コピー",
      user: "あなた",
      ai: "Kooksy AI",
      emptyGoal: "目標を説明してください。",
      emptyIdea: "ウェブサイトのアイデアを説明してください。",
      emptyFeedback: "フィードバックを入力してください。",
      charLimit: "文字数の上限に達しました。"
    },

    de: {
      assistant: "KI-Assistent",
      history: "Gesprächsverlauf",
      goal: "Zielplanung",
      creator: "Website-Ersteller",
      feedback: "Feedback",
      newChat: "＋ Neuer Chat",
      send: "Senden ↑",
      logout: "Abmelden",
      welcomeTitle: "Intelligenz mit einem Funken.",
      welcomeText: "Stelle Fragen, analysiere Dateien oder verwandle Ideen in Webprojekte.",
      welcomeEyebrow: "KOOKSY AI · DEIN KI-ARBEITSPLATZ",
      prompt: "Nachricht an Kooksy AI…",
      upload: "＋ Datei analysieren",
      historyTitle: "Gesprächsverlauf",
      historyDescription: "Öffne frühere Gespräche oder lösche nicht mehr benötigte.",
      historyLoading: "Gespräche werden geladen…",
      noHistory: "Noch keine gespeicherten Gespräche.",
      goalTitle: "Ein Ziel in einen Plan verwandeln",
      goalDescription: "Beschreibe eine Aufgabe, um Schritte, Erfolgskriterien, Risiken und Grenzen zu erhalten.",
      goalLabel: "Was möchtest du erreichen?",
      goalPlaceholder: "Beschreibe dein Ziel…",
      goalButton: "Plan erstellen ✦",
      creatorTitle: "Website-Ersteller",
      creatorDescription: "Beschreibe deine Idee, um Code und Bereitstellungshinweise zu erhalten.",
      ideaLabel: "Beschreibe deine Website oder dein Projekt",
      ideaPlaceholder: "Beschreibe Funktionen, Design und Technologien…",
      creatorButton: "Projekt erstellen ✦",
      creatorDisclaimer: "Die KI erstellt Code, veröffentlicht die Website aber nicht automatisch.",
      feedbackTitle: "Feedback geben",
      feedbackDescription: "Teile deine Erfahrungen mit Kooksy AI.",
      name: "Name",
      role: "Rolle",
      state: "Bundesland",
      rating: "Sternebewertung",
      feedbackLabel: "Feedback",
      feedbackPlaceholder: "Was war gut? Was kann verbessert werden?",
      submitFeedback: "Feedback senden",
      loading: "Bitte warten…",
      listening: "Höre zu… Sprich jetzt.",
      emptyMessage: "Bitte gib zuerst eine Nachricht ein.",
      fileTooLarge: "Die Datei überschreitet die Grenze von 10 MB.",
      invalidFile: "Dieser Dateityp wird nicht unterstützt.",
      fileSelected: "Datei ausgewählt",
      analyzing: "Datei wird analysiert…",
      fileSuccess: "Dateianalyse abgeschlossen.",
      chatFailed: "Keine Antwort erhalten. Bitte versuche es erneut.",
      goalFailed: "Der Plan konnte nicht erstellt werden.",
      creatorFailed: "Das Projekt konnte nicht erstellt werden.",
      feedbackSuccess: "Danke! Dein Feedback wurde gesendet.",
      feedbackFailed: "Feedback konnte nicht gesendet werden.",
      chooseRating: "Bitte wähle eine Sternebewertung.",
      historyFailed: "Verlauf konnte nicht geladen werden.",
      historyDelete: "Löschen",
      historyOpen: "Öffnen",
      confirmDelete: "Dieses Gespräch löschen?",
      deleteFailed: "Gespräch konnte nicht gelöscht werden.",
      deleteSuccess: "Gespräch gelöscht.",
      copied: "In die Zwischenablage kopiert.",
      copyFailed: "Text konnte nicht kopiert werden.",
      speechUnavailable: "Dieser Browser unterstützt keine Sprachausgabe.",
      networkError: "Netzwerkfehler. Prüfe deine Verbindung.",
      sessionExpired: "Deine Sitzung ist möglicherweise abgelaufen. Melde dich erneut an.",
      planOnly: "Diese Funktion erstellt nur einen Plan und führt keine externen Aktionen automatisch aus.",
      generatedCode: "Erstelltes Projekt",
      download: "Herunterladen",
      speak: "Vorlesen",
      stopSpeaking: "Vorlesen stoppen",
      copy: "Kopieren",
      user: "Du",
      ai: "Kooksy AI",
      emptyGoal: "Bitte beschreibe dein Ziel.",
      emptyIdea: "Bitte beschreibe deine Website-Idee.",
      emptyFeedback: "Bitte gib Feedback ein.",
      charLimit: "Zeichenlimit erreicht."
    },

    ta: {
      assistant: "AI உதவியாளர்",
      history: "முந்தைய உரையாடல்கள்",
      goal: "Agent இலக்கு",
      creator: "Website உருவாக்கி",
      feedback: "கருத்து",
      newChat: "＋ புதிய Chat",
      send: "அனுப்பு ↑",
      logout: "வெளியேறு",

      welcomeTitle: "அறிவாற்றலுடன் ஒரு சிறு மின்னல்.",
      welcomeText:
        "கேள்விகள் கேளுங்கள், கோப்புகளைப் பகுப்பாய்வு செய்யுங்கள் அல்லது உங்கள் யோசனையை Website project-ஆக மாற்றுங்கள்.",
      welcomeEyebrow: "KOOKSY AI · உங்கள் AI பணியிடம்",

      prompt: "Kooksy AI-க்கு message எழுதுங்கள்…",
      upload: "＋ கோப்பைப் பகுப்பாய்வு செய்",

      suggestions: [
        "AI-ஐ எளிமையாக விளக்கு",
        "என் project-ஐ திட்டமிட உதவு",
        "Python code எழுதி விளக்கு"
      ],

      historyTitle: "முந்தைய உரையாடல்கள்",
      historyDescription: "முந்தைய உரையாடலைத் திறக்கலாம் அல்லது தேவையில்லாததை நீக்கலாம்.",
      historyLoading: "உரையாடல்கள் ஏற்றப்படுகின்றன…",
      noHistory: "இதுவரை சேமிக்கப்பட்ட உரையாடல்கள் இல்லை.",

      goalTitle: "உங்கள் இலக்கைத் திட்டமாக மாற்றுங்கள்",
      goalDescription:
        "ஒரு task-ஐ விவரியுங்கள். Kooksy AI படிகள், வெற்றி அளவுகோல்கள், அபாயங்கள் மற்றும் வரம்புகளைத் தரும்.",
      goalLabel: "நீங்கள் என்ன சாதிக்க விரும்புகிறீர்கள்?",
      goalPlaceholder: "உங்கள் இலக்கை இங்கே எழுதுங்கள்…",
      goalButton: "திட்டத்தை உருவாக்கு ✦",

      creatorTitle: "Website உருவாக்கி",
      creatorDescription: "உங்கள் யோசனையை விவரித்து code மற்றும் deployment வழிமுறைகளைப் பெறுங்கள்.",
      ideaLabel: "உங்கள் Website அல்லது project யோசனையை விவரிக்கவும்",
      ideaPlaceholder: "Website, features, design மற்றும் technology-ஐ விவரிக்கவும்…",
      creatorButton: "Project உருவாக்கு ✦",

      creatorDisclaimer:
        "AI code மற்றும் வழிமுறைகளை உருவாக்கும்; Website-ஐ தானாக publish செய்யாது.",

      feedbackTitle: "உங்கள் கருத்தைப் பகிருங்கள்",
      feedbackDescription: "Kooksy AI பயன்படுத்திய அனுபவத்தைப் பகிருங்கள்.",

      name: "பெயர்",
      role: "பங்கு",
      state: "மாநிலம்",
      rating: "Star மதிப்பீடு",
      feedbackLabel: "கருத்து",
      feedbackPlaceholder: "எது நன்றாக இருந்தது? எதை மேம்படுத்தலாம்?",
      submitFeedback: "கருத்தை அனுப்பு",

      loading: "தயவுசெய்து காத்திருக்கவும்…",
      listening: "கேட்கிறது… இப்போது பேசுங்கள்.",
      voiceUnsupported: "இந்த browser-ல் voice recognition ஆதரிக்கப்படவில்லை.",
      voicePermission: "Microphone permission கொடுத்து மீண்டும் முயற்சி செய்யுங்கள்.",

      emptyMessage: "முதலில் ஒரு message எழுதுங்கள்.",
      fileTooLarge: "File 10 MB வரம்பை மீறுகிறது.",
      invalidFile: "இந்த file type ஆதரிக்கப்படவில்லை.",
      fileSelected: "File தேர்ந்தெடுக்கப்பட்டது",
      analyzing: "File பகுப்பாய்வு செய்யப்படுகிறது…",
      fileSuccess: "File பகுப்பாய்வு முடிந்தது.",
      fileFailed: "File பகுப்பாய்வு தோல்வியடைந்தது.",

      chatFailed: "AI பதிலைப் பெற முடியவில்லை. மீண்டும் முயற்சி செய்யுங்கள்.",
      goalFailed: "திட்டத்தை உருவாக்க முடியவில்லை. மீண்டும் முயற்சி செய்யுங்கள்.",
      creatorFailed: "Project உருவாக்க முடியவில்லை. மீண்டும் முயற்சி செய்யுங்கள்.",

      feedbackSuccess: "நன்றி! உங்கள் கருத்து அனுப்பப்பட்டது.",
      feedbackFailed: "கருத்தை அனுப்ப முடியவில்லை.",
      chooseRating: "தயவுசெய்து Star மதிப்பீட்டைத் தேர்ந்தெடுக்கவும்.",

      historyFailed: "Chat history-ஐ ஏற்ற முடியவில்லை.",
      historyDelete: "நீக்கு",
      historyOpen: "திற",
      confirmDelete: "இந்த உரையாடலை நீக்க வேண்டுமா?",
      deleteFailed: "உரையாடலை நீக்க முடியவில்லை.",
      deleteSuccess: "உரையாடல் நீக்கப்பட்டது.",

      copied: "Clipboard-க்கு copy செய்யப்பட்டது.",
      copyFailed: "Text-ஐ copy செய்ய முடியவில்லை.",
      speechUnavailable: "இந்த browser-ல் speech output ஆதரிக்கப்படவில்லை.",
      networkError: "Network பிழை. Internet connection-ஐ சரிபார்க்கவும்.",
      sessionExpired: "உங்கள் session முடிந்திருக்கலாம். மீண்டும் login செய்யவும்.",

      planOnly:
        "இந்த feature திட்டத்தை மட்டுமே உருவாக்கும்; வெளிப்புற செயல்களைத் தானாகச் செய்யாது.",

      generatedCode: "உருவாக்கப்பட்ட project",
      download: "Download",
      speak: "குரலில் கேள்",
      stopSpeaking: "குரலை நிறுத்து",
      copy: "Copy",
      user: "நீங்கள்",
      ai: "Kooksy AI",

      emptyGoal: "உங்கள் இலக்கை விவரிக்கவும்.",
      emptyIdea: "உங்கள் Website யோசனையை விவரிக்கவும்.",
      emptyFeedback: "உங்கள் கருத்தை எழுதவும்.",
      charLimit: "எழுத்து வரம்பு முடிந்துவிட்டது."
    },

    te: {
      assistant: "AI సహాయకుడు",
      history: "సంభాషణ చరిత్ర",
      goal: "లక్ష్య ప్రణాళిక",
      creator: "వెబ్‌సైట్ సృష్టికర్త",
      feedback: "అభిప్రాయం",
      newChat: "＋ కొత్త చాట్",
      send: "పంపు ↑",
      logout: "లాగ్ అవుట్",
      welcomeTitle: "సృజనాత్మకతతో కూడిన మేధస్సు.",
      welcomeText: "ప్రశ్నలు అడగండి, ఫైళ్లను విశ్లేషించండి లేదా మీ ఆలోచనను వెబ్ ప్రాజెక్ట్‌గా మార్చండి.",
      welcomeEyebrow: "KOOKSY AI · మీ AI వర్క్‌స్పేస్",
      prompt: "Kooksy AIకి సందేశం రాయండి…",
      upload: "＋ ఫైల్‌ను విశ్లేషించండి",
      historyTitle: "సంభాషణ చరిత్ర",
      historyDescription: "గత సంభాషణను తెరవండి లేదా అవసరం లేనిదాన్ని తొలగించండి.",
      historyLoading: "సంభాషణలు లోడ్ అవుతున్నాయి…",
      noHistory: "ఇంకా సేవ్ చేసిన సంభాషణలు లేవు.",
      goalTitle: "లక్ష్యాన్ని ప్రణాళికగా మార్చండి",
      goalDescription: "పని వివరాలను ఇవ్వండి. AI దశలు, విజయ ప్రమాణాలు, ప్రమాదాలు, పరిమితులను అందిస్తుంది.",
      goalLabel: "మీరు ఏమి సాధించాలనుకుంటున్నారు?",
      goalPlaceholder: "మీ లక్ష్యాన్ని వివరించండి…",
      goalButton: "ప్రణాళిక రూపొందించు ✦",
      creatorTitle: "వెబ్‌సైట్ సృష్టికర్త",
      creatorDescription: "మీ ఆలోచన ఆధారంగా కోడ్ మరియు ప్రచురణ సూచనలు పొందండి.",
      ideaLabel: "మీ వెబ్‌సైట్ లేదా ప్రాజెక్ట్ ఆలోచనను వివరించండి",
      ideaPlaceholder: "వెబ్‌సైట్, ఫీచర్లు, డిజైన్, టెక్నాలజీలను వివరించండి…",
      creatorButton: "ప్రాజెక్ట్ రూపొందించు ✦",
      creatorDisclaimer: "AI కోడ్‌ను రూపొందిస్తుంది; వెబ్‌సైట్‌ను ఆటోమేటిక్‌గా ప్రచురించదు.",
      feedbackTitle: "మీ అభిప్రాయాన్ని పంచుకోండి",
      feedbackDescription: "Kooksy AIతో మీ అనుభవాన్ని తెలియజేయండి.",
      name: "పేరు",
      role: "పాత్ర",
      state: "రాష్ట్రం",
      rating: "స్టార్ రేటింగ్",
      feedbackLabel: "అభిప్రాయం",
      feedbackPlaceholder: "ఏది బాగుంది? ఏది మెరుగుపరచాలి?",
      submitFeedback: "అభిప్రాయాన్ని పంపండి",
      loading: "దయచేసి వేచి ఉండండి…",
      listening: "వింటోంది… ఇప్పుడు మాట్లాడండి.",
      emptyMessage: "ముందుగా సందేశాన్ని నమోదు చేయండి.",
      fileTooLarge: "ఫైల్ 10 MB పరిమితిని మించింది.",
      invalidFile: "ఈ ఫైల్ రకం మద్దతు లేదు.",
      fileSelected: "ఫైల్ ఎంచుకోబడింది",
      analyzing: "ఫైల్ విశ్లేషణ జరుగుతోంది…",
      fileSuccess: "ఫైల్ విశ్లేషణ పూర్తయింది.",
      chatFailed: "AI సమాధానం పొందలేకపోయాం. మళ్లీ ప్రయత్నించండి.",
      goalFailed: "ప్రణాళిక రూపొందించలేకపోయాం.",
      creatorFailed: "ప్రాజెక్ట్ రూపొందించలేకపోయాం.",
      feedbackSuccess: "ధన్యవాదాలు! మీ అభిప్రాయం పంపబడింది.",
      feedbackFailed: "అభిప్రాయాన్ని పంపలేకపోయాం.",
      chooseRating: "స్టార్ రేటింగ్‌ను ఎంచుకోండి.",
      historyFailed: "చాట్ చరిత్రను లోడ్ చేయలేకపోయాం.",
      historyDelete: "తొలగించు",
      historyOpen: "తెరువు",
      confirmDelete: "ఈ సంభాషణను తొలగించాలా?",
      deleteFailed: "సంభాషణను తొలగించలేకపోయాం.",
      deleteSuccess: "సంభాషణ తొలగించబడింది.",
      copied: "క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది.",
      copyFailed: "టెక్స్ట్‌ను కాపీ చేయలేకపోయాం.",
      speechUnavailable: "ఈ బ్రౌజర్‌లో వాయిస్ అవుట్‌పుట్ మద్దతు లేదు.",
      networkError: "నెట్‌వర్క్ సమస్య. కనెక్షన్‌ను తనిఖీ చేయండి.",
      sessionExpired: "సెషన్ ముగిసివుండవచ్చు. మళ్లీ లాగిన్ చేయండి.",
      planOnly: "ఈ ఫీచర్ ప్రణాళికను మాత్రమే రూపొందిస్తుంది; బాహ్య పనులను ఆటోమేటిక్‌గా చేయదు.",
      generatedCode: "రూపొందించిన ప్రాజెక్ట్",
      download: "డౌన్‌లోడ్",
      speak: "గట్టిగా చదువు",
      stopSpeaking: "వాయిస్ ఆపు",
      copy: "కాపీ",
      user: "మీరు",
      ai: "Kooksy AI",
      emptyGoal: "మీ లక్ష్యాన్ని వివరించండి.",
      emptyIdea: "మీ వెబ్‌సైట్ ఆలోచనను వివరించండి.",
      emptyFeedback: "మీ అభిప్రాయాన్ని నమోదు చేయండి.",
      charLimit: "అక్షర పరిమితి చేరుకుంది."
    },

    ko: {
      assistant: "AI 어시스턴트",
      history: "대화 기록",
      goal: "목표 계획",
      creator: "웹사이트 제작기",
      feedback: "피드백",
      newChat: "＋ 새 채팅",
      send: "보내기 ↑",
      logout: "로그아웃",
      welcomeTitle: "반짝이는 지능.",
      welcomeText: "질문하고, 파일을 분석하고, 아이디어를 웹 프로젝트로 바꿔 보세요.",
      welcomeEyebrow: "KOOKSY AI · 나만의 AI 작업 공간",
      prompt: "Kooksy AI에 메시지 입력…",
      upload: "＋ 파일 분석",
      historyTitle: "대화 기록",
      historyDescription: "이전 대화를 열거나 필요 없는 대화를 삭제하세요.",
      historyLoading: "대화를 불러오는 중…",
      noHistory: "저장된 대화가 없습니다.",
      goalTitle: "목표를 계획으로 바꾸기",
      goalDescription: "작업을 설명하면 단계, 성공 기준, 위험 및 한계를 정리합니다.",
      goalLabel: "무엇을 달성하고 싶으신가요?",
      goalPlaceholder: "목표를 설명하세요…",
      goalButton: "계획 만들기 ✦",
      creatorTitle: "웹사이트 제작기",
      creatorDescription: "아이디어를 설명하고 코드와 배포 안내를 받아 보세요.",
      ideaLabel: "웹사이트 또는 프로젝트 아이디어",
      ideaPlaceholder: "웹사이트 기능, 디자인 및 기술을 설명하세요…",
      creatorButton: "프로젝트 만들기 ✦",
      creatorDisclaimer: "AI는 코드를 생성하지만 웹사이트를 자동으로 배포하지는 않습니다.",
      feedbackTitle: "피드백 보내기",
      feedbackDescription: "Kooksy AI 사용 경험을 알려 주세요.",
      name: "이름",
      role: "역할",
      state: "주",
      rating: "별점",
      feedbackLabel: "피드백",
      feedbackPlaceholder: "무엇이 좋았나요? 무엇을 개선할 수 있나요?",
      submitFeedback: "피드백 제출",
      loading: "잠시 기다려 주세요…",
      listening: "듣는 중… 말씀하세요.",
      emptyMessage: "먼저 메시지를 입력하세요.",
      fileTooLarge: "파일이 10MB 제한을 초과했습니다.",
      invalidFile: "지원되지 않는 파일 형식입니다.",
      fileSelected: "파일이 선택되었습니다",
      analyzing: "파일 분석 중…",
      fileSuccess: "파일 분석이 완료되었습니다.",
      chatFailed: "답변을 가져오지 못했습니다. 다시 시도하세요.",
      goalFailed: "계획을 생성하지 못했습니다.",
      creatorFailed: "프로젝트를 생성하지 못했습니다.",
      feedbackSuccess: "감사합니다! 피드백이 제출되었습니다.",
      feedbackFailed: "피드백을 제출하지 못했습니다.",
      chooseRating: "별점을 선택하세요.",
      historyFailed: "대화 기록을 불러오지 못했습니다.",
      historyDelete: "삭제",
      historyOpen: "열기",
      confirmDelete: "이 대화를 삭제할까요?",
      deleteFailed: "대화를 삭제하지 못했습니다.",
      deleteSuccess: "대화가 삭제되었습니다.",
      copied: "클립보드에 복사되었습니다.",
      copyFailed: "텍스트를 복사하지 못했습니다.",
      speechUnavailable: "이 브라우저는 음성 출력을 지원하지 않습니다.",
      networkError: "네트워크 오류입니다. 연결을 확인하세요.",
      sessionExpired: "세션이 만료되었을 수 있습니다. 다시 로그인하세요.",
      planOnly: "이 기능은 계획만 생성하며 외부 작업을 자동으로 수행하지 않습니다.",
      generatedCode: "생성된 프로젝트",
      download: "다운로드",
      speak: "소리 내어 읽기",
      stopSpeaking: "음성 중지",
      copy: "복사",
      user: "사용자",
      ai: "Kooksy AI",
      emptyGoal: "목표를 설명하세요.",
      emptyIdea: "웹사이트 아이디어를 설명하세요.",
      emptyFeedback: "피드백을 입력하세요.",
      charLimit: "글자 수 제한에 도달했습니다."
    }
  };

  /* ---------------- 3. APPLICATION STATE ---------------- */

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const state = {
    language: localStorage.getItem("kooksyLanguage") || "en",
    mode: localStorage.getItem("kooksyMode") || "normal",
    busy: false,
    recognition: null,
    listening: false,
    speaking: false,
    currentFile: null,
    chatHistory: [],
    currentConversationId: null,
    abortController: null
  };

  function t(key) {
    const languagePack = translations[state.language] || translations.en;

    return languagePack[key] !== undefined
      ? languagePack[key]
      : (translations.en[key] !== undefined
          ? translations.en[key]
          : key);
  }

  function getVoiceLanguage() {
    return LANGUAGE_VOICES[state.language] || "en-IN";
  }

  /* ---------------- 4. SAFE DOM HELPERS ---------------- */

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showToast(message, type = "info") {
    let container = $("#toast-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("toast-hide");
      window.setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function setBusy(value, button = null) {
    state.busy = Boolean(value);

    if (button) {
      button.disabled = state.busy;

      if (state.busy) {
        button.dataset.originalText = button.textContent;
        button.textContent = t("loading");
      } else if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
    }

    document.body.classList.toggle("is-busy", state.busy);
  }

  function setElementText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
  }

  function setElementPlaceholder(selector, value) {
    const element = $(selector);
    if (element) element.setAttribute("placeholder", value);
  }

  function getCSRFToken() {
    const meta = $('meta[name="csrf-token"]');

    if (meta?.content) {
      return meta.content;
    }

    const input = $('input[name="csrf_token"]');

    if (input?.value) {
      return input.value;
    }

    return "";
  }

  /* ---------------- 5. API REQUEST HELPER ---------------- */

  async function apiRequest(url, options = {}) {
    const headers = new Headers(options.headers || {});

    if (!(options.body instanceof FormData)) {
      if (!headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
      }
    }

    const csrfToken = getCSRFToken();

    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
      headers.set("X-CSRF-Token", csrfToken);
    }

    const requestOptions = {
      ...options,
      headers,
      credentials: "same-origin"
    };

    let response;

    try {
      response = await fetch(url, requestOptions);
    } catch (error) {
      console.error("Kooksy network error:", error);
      throw new Error(t("networkError"));
    }

    if (response.status === 401 || response.status === 403) {
      const bodyText = await response.clone().text().catch(() => "");

      if (/login|session|unauthorized/i.test(bodyText)) {
        showToast(t("sessionExpired"), "error");
      }
    }

    const contentType = response.headers.get("content-type") || "";

    let result;

    if (contentType.includes("application/json")) {
      result = await response.json().catch(() => ({}));
    } else {
      result = await response.text().catch(() => "");
    }

    if (!response.ok) {
      const message =
        result && typeof result === "object"
          ? result.error || result.message || result.detail
          : null;

      throw new Error(message || `Request failed (${response.status})`);
    }

    return result;
  }

  /* ---------------- 6. LANGUAGE SWITCHING ---------------- */

  function applyTranslations() {
    document.documentElement.lang = state.language;

    document.documentElement.dir =
      state.language === "ar" || state.language === "ur"
        ? "rtl"
        : "ltr";

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = t(key);

      if (value !== key) {
        element.textContent = value;
      }
    });

    $$("[data-i18n-placeholder]").forEach((element) => {
      const key = element.dataset.i18nPlaceholder;
      const value = t(key);

      if (value !== key) {
        element.setAttribute("placeholder", value);
      }
    });

    $$("[data-i18n-title]").forEach((element) => {
      const key = element.dataset.i18nTitle;
      const value = t(key);

      if (value !== key) {
        element.setAttribute("title", value);
      }
    });

    setElementPlaceholder(
      "#chat-input",
      t("prompt")
    );

    setElementPlaceholder(
      "#message-input",
      t("prompt")
    );

    setElementPlaceholder(
      "#goal-input",
      t("goalPlaceholder")
    );

    setElementPlaceholder(
      "#website-idea",
      t("ideaPlaceholder")
    );

    setElementPlaceholder(
      "#feedback-message",
      t("feedbackPlaceholder")
    );

    const languageSelect = $("#language-select");

    if (languageSelect) {
      languageSelect.value = state.language;
    }

    document.dispatchEvent(
      new CustomEvent("kooksy:language-changed", {
        detail: {
          language: state.language,
          direction: document.documentElement.dir
        }
      })
    );
  }

  function changeLanguage(language) {
    if (!Object.prototype.hasOwnProperty.call(translations, language)) {
      language = "en";
    }

    state.language = language;

    localStorage.setItem("kooksyLanguage", language);

    applyTranslations();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      state.speaking = false;
    }

    showToast(
      language === "ta"
        ? "மொழி மாற்றப்பட்டது."
        : language === "hi"
          ? "भाषा बदल दी गई।"
          : language === "zh-CN"
            ? "语言已更改。"
            : "Language updated.",
      "success"
    );
  }

  /* ---------------- 7. MARKDOWN RENDERING ---------------- */

  function renderMarkdown(text) {
    const safe = escapeHTML(text);

    const blocks = [];

    let output = safe.replace(
      /```([a-zA-Z0-9_+-]*)\n?([\s\S]*?)```/g,
      (_, language, code) => {
        const index = blocks.length;

        blocks.push(
          `<pre class="code-block"><code class="language-${escapeHTML(language || "text")}">${code}</code></pre>`
        );

        return `@@KOOKSY_BLOCK_${index}@@`;
      }
    );

    output = output
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
      .replace(/\n/g, "<br>");

    output = output.replace(
      /@@KOOKSY_BLOCK_(\d+)@@/g,
      (_, index) => blocks[Number(index)] || ""
    );

    return output;
  }

  /* ---------------- 8. CLIPBOARD SUPPORT ---------------- */

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.select();

        const success = document.execCommand("copy");
        textarea.remove();

        if (!success) {
          throw new Error("Copy operation failed");
        }
      }

      showToast(t("copied"), "success");
    } catch (error) {
      console.error("Copy error:", error);
      showToast(t("copyFailed"), "error");
    }
  }

  /* ---------------- 9. VOICE OUTPUT ---------------- */

  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      showToast(t("speechUnavailable"), "error");
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = String(text || "")
      .replace(/```[\s\S]*?```/g, " Code block omitted. ")
      .replace(/[#*_`]/g, " ")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.lang = getVoiceLanguage();
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      state.speaking = true;
    };

    utterance.onend = () => {
      state.speaking = false;
    };

    utterance.onerror = () => {
      state.speaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    state.speaking = false;
  }

  /* ---------------- 10. CHAT MESSAGE DISPLAY ---------------- */

  function findChatContainer() {
    return (
      $("#chat-messages") ||
      $("#messages-container") ||
      $("#chat-history") ||
      $("#conversation")
    );
  }

  function scrollChatToBottom() {
    const container = findChatContainer();

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  function addMessage(role, content, options = {}) {
    const container = findChatContainer();

    if (!container) {
      console.warn("Chat message container was not found.");
      return null;
    }

    const isUser = role === "user";

    const message = document.createElement("article");

    message.className = [
      "chat-message",
      isUser ? "user-message" : "assistant-message"
    ].join(" ");

    message.dataset.role = role;

    const heading = document.createElement("div");
    heading.className = "message-author";
    heading.textContent = isUser ? t("user") : t("ai");

    const body = document.createElement("div");
    body.className = "message-content";

    body.innerHTML = renderMarkdown(content);

    message.appendChild(heading);
    message.appendChild(body);

    if (!isUser && options.actions !== false) {
      const actions = document.createElement("div");
      actions.className = "message-actions";

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "message-copy";
      copyButton.textContent = t("copy");
      copyButton.addEventListener("click", () => copyText(content));

      const speakButton = document.createElement("button");
      speakButton.type = "button";
      speakButton.className = "message-speak";
      speakButton.textContent = t("speak");
      speakButton.addEventListener("click", () => speakText(content));

      actions.append(copyButton, speakButton);
      message.appendChild(actions);
    }

    container.appendChild(message);

    scrollChatToBottom();

    return message;
  }

  function clearChatDisplay() {
    const container = findChatContainer();

    if (container) {
      container.replaceChildren();
    }

    state.chatHistory = [];
    state.currentConversationId = null;
  }

  function setChatInputEnabled(enabled) {
    const input = $("#chat-input") || $("#message-input");
    const sendButton = $("#send-button") || $("#send-btn");

    if (input) input.disabled = !enabled;
    if (sendButton) sendButton.disabled = !enabled;
  }

  /* ---------------- 11. AI CHAT API ---------------- */

  function getSelectedMode() {
    const modeSelect =
      $("#mode-select") ||
      $("#user-mode") ||
      $("#assistant-mode");

    const selected = modeSelect?.value || state.mode || "normal";

    return /developer|dev/i.test(selected)
      ? "developer"
      : "normal";
  }

  function getChatInput() {
    return $("#chat-input") || $("#message-input");
  }

  async function sendMessage(messageOverride = null) {
    if (state.busy) return;

    const input = getChatInput();

    const message = String(
      messageOverride !== null
        ? messageOverride
        : input?.value || ""
    ).trim();

    if (!message) {
      showToast(t("emptyMessage"), "info");
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      showToast(t("charLimit"), "error");
      return;
    }

    if (input && messageOverride === null) {
      input.value = "";
      input.style.height = "auto";
    }

    const mode = getSelectedMode();

    state.mode = mode;
    localStorage.setItem("kooksyMode", mode);

    state.chatHistory.push({
      role: "user",
      content: message
    });

    addMessage("user", message);

    const sendButton = $("#send-button") || $("#send-btn");

    setBusy(true, sendButton);
    setChatInputEnabled(false);

    const loadingMessage = addMessage(
      "assistant",
      t("loading"),
      { actions: false }
    );

    try {
      const payload = {
        message,
        prompt: message,
        language: state.language,
        mode,
        user_mode: mode,
        conversation_id: state.currentConversationId,
        history: state.chatHistory.slice(-20)
      };

      const result = await apiRequest(API.chat, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (loadingMessage) {
        loadingMessage.remove();
      }

      const answer =
        typeof result === "string"
          ? result
          : result.response ||
            result.answer ||
            result.message ||
            result.reply ||
            result.content ||
            "";

      if (!String(answer).trim()) {
        throw new Error(t("chatFailed"));
      }

      state.chatHistory.push({
        role: "assistant",
        content: String(answer)
      });

      if (result.conversation_id !== undefined) {
        state.currentConversationId = result.conversation_id;
      } else if (result.chat_id !== undefined) {
        state.currentConversationId = result.chat_id;
      }

      addMessage("assistant", String(answer));

      if (
        result.conversation_id ||
        result.chat_id
      ) {
        await loadChatHistory().catch((error) => {
          console.warn("History refresh failed:", error);
        });
      }
    } catch (error) {
      if (loadingMessage) {
        loadingMessage.remove();
      }

      console.error("Chat request failed:", error);

      addMessage(
        "assistant",
        `${t("chatFailed")}\n\n${error.message || ""}`
      );

      showToast(t("chatFailed"), "error");
    } finally {
      setBusy(false);
      setChatInputEnabled(true);
      input?.focus();
    }
  }

  function startNewChat() {
    stopSpeaking();
    clearChatDisplay();

    const welcome = $("#welcome-screen");

    if (welcome) {
      welcome.hidden = false;
    }

    const input = getChatInput();

    if (input) {
      input.value = "";
      input.focus();
    }

    document.dispatchEvent(
      new CustomEvent("kooksy:new-chat")
    );
  }

  /* ---------------- 12. VOICE INPUT ---------------- */

  function createSpeechRecognition() {
    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!Recognition) {
      showToast(t("voiceUnsupported"), "error");
      return null;
    }

    const recognition = new Recognition();

    recognition.lang = getVoiceLanguage();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      state.listening = true;

      const voiceButton =
        $("#voice-button") ||
        $("#mic-button") ||
        $("#voice-input-button");

      voiceButton?.classList.add("is-listening");

      if (voiceButton) {
        voiceButton.setAttribute("aria-pressed", "true");
      }

      showToast(t("listening"), "info");
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index++
      ) {
        transcript += event.results[index][0].transcript;
      }

      const input = getChatInput();

      if (input) {
        input.value = transcript.trim();
        input.dispatchEvent(
          new Event("input", { bubbles: true })
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        showToast(t("voicePermission"), "error");
      }
    };

    recognition.onend = () => {
      state.listening = false;

      const voiceButton =
        $("#voice-button") ||
        $("#mic-button") ||
        $("#voice-input-button");

      voiceButton?.classList.remove("is-listening");

      if (voiceButton) {
        voiceButton.setAttribute("aria-pressed", "false");
      }
    };

    return recognition;
  }

  function toggleVoiceInput() {
    if (state.listening && state.recognition) {
      state.recognition.stop();
      return;
    }

    const recognition = createSpeechRecognition();

    if (!recognition) return;

    state.recognition = recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error("Unable to start voice input:", error);
      showToast(t("voicePermission"), "error");
    }
  }

  /* ---------------- 13. FILE ANALYSIS ---------------- */

  function getFileInput() {
    return (
      $("#file-input") ||
      $("#upload-file") ||
      $("#document-input")
    );
  }

  function validateFile(file) {
    if (!file) {
      return {
        valid: false,
        message: t("invalidFile")
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        message: t("fileTooLarge")
      };
    }

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {
      return {
        valid: false,
        message: t("invalidFile")
      };
    }

    return { valid: true };
  }

  function showSelectedFile(file) {
    const fileLabel =
      $("#selected-file-name") ||
      $("#file-name") ||
      $("#upload-file-name");

    if (fileLabel) {
      fileLabel.textContent = file
        ? `${t("fileSelected")}: ${file.name}`
        : "";
    }
  }

  async function analyzeFile(file) {
    if (state.busy) return;

    const validation = validateFile(file);

    if (!validation.valid) {
      showToast(validation.message, "error");
      return;
    }

    state.currentFile = file;

    showSelectedFile(file);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("language", state.language);
    formData.append("mode", getSelectedMode());

    const sendButton =
      $("#analyze-file-button") ||
      $("#upload-analyze-button");

    setBusy(true, sendButton);

    addMessage(
      "user",
      `${t("analyzing")}\n\n${file.name}`
    );

    const loadingMessage = addMessage(
      "assistant",
      t("loading"),
      { actions: false }
    );

    try {
      const result = await apiRequest(API.analyzeFile, {
        method: "POST",
        body: formData
      });

      if (loadingMessage) {
        loadingMessage.remove();
      }

      const answer =
        typeof result === "string"
          ? result
          : result.analysis ||
            result.response ||
            result.answer ||
            result.message ||
            result.summary ||
            "";

      if (!String(answer).trim()) {
        throw new Error(t("fileFailed"));
      }

      state.chatHistory.push(
        {
          role: "user",
          content: `${t("analyzing")}: ${file.name}`
        },
        {
          role: "assistant",
          content: String(answer)
        }
      );

      addMessage("assistant", String(answer));

      showToast(t("fileSuccess"), "success");
    } catch (error) {
      if (loadingMessage) {
        loadingMessage.remove();
      }

      console.error("File analysis error:", error);

      addMessage(
        "assistant",
        `${t("fileFailed")}\n\n${error.message || ""}`
      );

      showToast(t("fileFailed"), "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 14. CHAT HISTORY ---------------- */

  function getHistoryContainer() {
    return (
      $("#history-list") ||
      $("#chat-history-list") ||
      $("#conversation-list")
    );
  }

  function normalizeHistory(data) {
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.history)) {
      return data.history;
    }

    if (Array.isArray(data.conversations)) {
      return data.conversations;
    }

    if (Array.isArray(data.items)) {
      return data.items;
    }

    return [];
  }

  async function loadChatHistory() {
    const container = getHistoryContainer();

    if (!container) return;

    container.textContent = t("historyLoading");

    try {
      const result = await apiRequest(API.history, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });

      const items = normalizeHistory(result);

      container.replaceChildren();

      if (!items.length) {
        const empty = document.createElement("p");
        empty.className = "history-empty";
        empty.textContent = t("noHistory");

        container.appendChild(empty);
        return;
      }

      items.forEach((item) => {
        const id =
          item.id ??
          item.conversation_id ??
          item.chat_id;

        const title =
          item.title ||
          item.name ||
          item.preview ||
          item.message ||
          "Conversation";

        const row = document.createElement("div");
        row.className = "history-item";

        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.className = "history-open";
        openButton.textContent = String(title);
        openButton.title = String(title);

        openButton.addEventListener("click", () => {
          openHistoryItem(item);
        });

        row.appendChild(openButton);

        if (id !== undefined && id !== null) {
          const deleteButton = document.createElement("button");

          deleteButton.type = "button";
          deleteButton.className = "history-delete";
          deleteButton.textContent = t("historyDelete");
          deleteButton.setAttribute(
            "aria-label",
            `${t("historyDelete")}: ${title}`
          );

          deleteButton.addEventListener("click", () => {
            deleteHistoryItem(id);
          });

          row.appendChild(deleteButton);
        }

        container.appendChild(row);
      });
    } catch (error) {
      console.error("History loading error:", error);

      container.textContent = t("historyFailed");
    }
  }

  async function openHistoryItem(item) {
    stopSpeaking();
    clearChatDisplay();

    const id =
      item.id ??
      item.conversation_id ??
      item.chat_id ??
      null;

    state.currentConversationId = id;

    const messages =
      Array.isArray(item.messages)
        ? item.messages
        : Array.isArray(item.history)
          ? item.history
          : [];

    if (messages.length) {
      state.chatHistory = messages
        .filter(
          (message) =>
            ["user", "assistant"].includes(message.role) &&
            typeof message.content === "string"
        )
        .map((message) => ({
          role: message.role,
          content: message.content
        }));

      state.chatHistory.forEach((message) => {
        addMessage(message.role, message.content);
      });

      return;
    }

    if (typeof item.content === "string" && item.content) {
      state.chatHistory = [
        {
          role: "assistant",
          content: item.content
        }
      ];

      addMessage("assistant", item.content);
      return;
    }

    showToast(t("noHistory"), "info");
  }

  async function deleteHistoryItem(id) {
    if (!window.confirm(t("confirmDelete"))) {
      return;
    }

    try {
      await apiRequest(
        `${API.history}/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "Accept": "application/json"
          }
        }
      );

      showToast(t("deleteSuccess"), "success");

      await loadChatHistory();
    } catch (error) {
      console.error("History deletion error:", error);

      showToast(t("deleteFailed"), "error");
    }
  }
   /* ---------------- 15. AGENT GOAL ---------------- */

  async function generateAgentGoal() {
    if (state.busy) return;

    const input =
      $("#goal-input") ||
      $("#agent-goal-input") ||
      $("#goal-description");

    const goal = String(input?.value || "").trim();

    if (!goal) {
      showToast(t("emptyGoal"), "info");
      return;
    }

    const button =
      $("#generate-goal-button") ||
      $("#goal-generate-button") ||
      $("#goal-submit");

    const resultContainer =
      $("#goal-result") ||
      $("#goal-output") ||
      $("#agent-goal-result");

    setBusy(true, button);

    if (resultContainer) {
      resultContainer.textContent = t("loading");
    }

    try {
      const result = await apiRequest(API.goal, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({
          goal,
          description: goal,
          language: state.language,
          mode: getSelectedMode()
        })
      });

      const output =
        typeof result === "string"
          ? result
          : result.plan ||
            result.response ||
            result.result ||
            result.answer ||
            result.message ||
            "";

      if (!String(output).trim()) {
        throw new Error(t("goalFailed"));
      }

      if (resultContainer) {
        resultContainer.innerHTML = renderMarkdown(String(output));
      }

      showToast(
        state.language === "ta"
          ? "திட்டம் உருவாக்கப்பட்டது."
          : "Goal plan generated.",
        "success"
      );
    } catch (error) {
      console.error("Agent Goal error:", error);

      if (resultContainer) {
        resultContainer.textContent =
          `${t("goalFailed")} ${error.message || ""}`;
      }

      showToast(t("goalFailed"), "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 16. WEBSITE CREATOR ---------------- */

  async function generateWebsite() {
    if (state.busy) return;

    const input =
      $("#website-idea") ||
      $("#website-prompt") ||
      $("#creator-input");

    const idea = String(input?.value || "").trim();

    if (!idea) {
      showToast(t("emptyIdea"), "info");
      return;
    }

    const button =
      $("#generate-website-button") ||
      $("#create-website-button") ||
      $("#website-generate-button");

    const resultContainer =
      $("#website-result") ||
      $("#website-output") ||
      $("#creator-result");

    setBusy(true, button);

    if (resultContainer) {
      resultContainer.textContent = t("loading");
    }

    try {
      const result = await apiRequest(API.creator, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({
          idea,
          prompt: idea,
          description: idea,
          language: state.language,
          mode: getSelectedMode()
        })
      });

      const output =
        typeof result === "string"
          ? result
          : result.code ||
            result.project ||
            result.response ||
            result.result ||
            result.answer ||
            result.message ||
            "";

      if (!String(output).trim()) {
        throw new Error(t("creatorFailed"));
      }

      if (resultContainer) {
        resultContainer.replaceChildren();

        const rendered = document.createElement("div");
        rendered.className = "website-generated-content";
        rendered.innerHTML = renderMarkdown(String(output));

        resultContainer.appendChild(rendered);

        const downloadButton = document.createElement("button");

        downloadButton.type = "button";
        downloadButton.className = "download-generated-project";
        downloadButton.textContent = t("download");

        downloadButton.addEventListener("click", () => {
          downloadTextFile(
            "kooksy-generated-project.txt",
            String(output)
          );
        });

        resultContainer.appendChild(downloadButton);
      }

      showToast(
        state.language === "ta"
          ? "Website project உருவாக்கப்பட்டது."
          : "Website project generated.",
        "success"
      );
    } catch (error) {
      console.error("Website Creator error:", error);

      if (resultContainer) {
        resultContainer.textContent =
          `${t("creatorFailed")} ${error.message || ""}`;
      }

      showToast(t("creatorFailed"), "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 17. DOWNLOAD GENERATED FILE ---------------- */

  function downloadTextFile(filename, content) {
    try {
      const blob = new Blob(
        [String(content ?? "")],
        { type: "text/plain;charset=utf-8" }
      );

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = filename;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error("Download error:", error);

      showToast(
        "Unable to download the generated file.",
        "error"
      );
    }
  }

  /* ---------------- 18. FEEDBACK SUBMISSION ---------------- */

  async function submitFeedback() {
    if (state.busy) return;

    const nameInput = $("#feedback-name");
    const roleInput = $("#feedback-role");
    const stateInput = $("#feedback-state");

    const feedbackInput =
      $("#feedback-message") ||
      $("#feedback-text") ||
      $("#feedback-input");

    const ratingInput =
      $('input[name="rating"]:checked') ||
      $('input[name="feedback-rating"]:checked') ||
      $("#feedback-rating");

    const feedback = String(feedbackInput?.value || "").trim();

    const rating = Number(
      ratingInput?.value ||
      $("#rating-value")?.value ||
      0
    );

    if (!feedback) {
      showToast(t("emptyFeedback"), "info");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      showToast(t("chooseRating"), "info");
      return;
    }

    const button =
      $("#submit-feedback-button") ||
      $("#feedback-submit") ||
      $("#submit-feedback");

    setBusy(true, button);

    try {
      await apiRequest(API.feedback, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: String(nameInput?.value || "").trim(),
          role: String(roleInput?.value || "").trim(),
          state: String(stateInput?.value || "").trim(),
          rating,
          feedback,
          message: feedback,
          language: state.language
        })
      });

      if (feedbackInput) {
        feedbackInput.value = "";
      }

      showToast(t("feedbackSuccess"), "success");
    } catch (error) {
      console.error("Feedback error:", error);

      showToast(t("feedbackFailed"), "error");
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- 19. SIDEBAR NAVIGATION ---------------- */

  function closeSidebar() {
    const sidebar =
      $("#sidebar") ||
      $(".sidebar");

    const overlay =
      $("#sidebar-overlay") ||
      $(".sidebar-overlay");

    sidebar?.classList.remove("sidebar-open", "open");
    overlay?.classList.remove("visible", "active");

    document.body.classList.remove("sidebar-visible");
  }

  function toggleSidebar() {
    const sidebar =
      $("#sidebar") ||
      $(".sidebar");

    const overlay =
      $("#sidebar-overlay") ||
      $(".sidebar-overlay");

    if (!sidebar) return;

    const willOpen = !(
      sidebar.classList.contains("sidebar-open") ||
      sidebar.classList.contains("open")
    );

    sidebar.classList.toggle("sidebar-open", willOpen);
    sidebar.classList.toggle("open", willOpen);

    overlay?.classList.toggle("visible", willOpen);
    overlay?.classList.toggle("active", willOpen);

    document.body.classList.toggle("sidebar-visible", willOpen);
  }

  function navigateToSection(sectionName) {
    const section = String(sectionName || "")
      .replace(/^#/, "")
      .trim();

    if (!section) return;

    const target =
      document.getElementById(section) ||
      document.querySelector(`[data-section="${section}"]`);

    if (target) {
      $$(".app-section, .dashboard-section, .page-section").forEach(
        (element) => {
          element.classList.remove("active");
        }
      );

      target.classList.add("active");

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      const url = new URL(window.location.href);

      url.hash = section;

      history.replaceState(null, "", url);
    }

    $$(".sidebar-link, .nav-link, [data-navigation]").forEach(
      (link) => {
        const linkSection =
          link.dataset.section ||
          link.dataset.navigation ||
          link.getAttribute("href")?.replace(/^#/, "");

        link.classList.toggle(
          "active",
          linkSection === section
        );
      }
    );

    closeSidebar();

    document.dispatchEvent(
      new CustomEvent("kooksy:navigate", {
        detail: { section }
      })
    );
  }

  /* ---------------- 20. THEME TOGGLE ---------------- */

  function initializeTheme() {
    const savedTheme =
      localStorage.getItem("kooksyTheme") || "dark";

    document.documentElement.dataset.theme = savedTheme;

    document.body.classList.toggle(
      "light-theme",
      savedTheme === "light"
    );
  }

  function toggleTheme() {
    const current =
      document.documentElement.dataset.theme || "dark";

    const next = current === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;

    document.body.classList.toggle(
      "light-theme",
      next === "light"
    );

    localStorage.setItem("kooksyTheme", next);
  }

  /* ---------------- 21. USER PROFILE ---------------- */

  function initializeUserProfile() {
    const usernameElement =
      $("#username-display") ||
      $("#user-name") ||
      $(".username-display");

    const profileElement =
      $("#user-profile") ||
      $(".user-profile");

    const username =
      document.body.dataset.username ||
      document.body.dataset.user ||
      usernameElement?.dataset.username ||
      "";

    if (usernameElement && username) {
      usernameElement.textContent = username;
    }

    if (profileElement && username) {
      profileElement.setAttribute(
        "aria-label",
        `User profile: ${username}`
      );
    }
  }

  /* ---------------- 22. LOGOUT ---------------- */

  async function logoutUser() {
    const confirmed = window.confirm(
      state.language === "ta"
        ? "Logout செய்ய வேண்டுமா?"
        : "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    try {
      const formData = new FormData();

      const csrfToken = getCSRFToken();

      if (csrfToken) {
        formData.append("csrf_token", csrfToken);
      }

      await apiRequest(API.logout, {
        method: "POST",
        body: formData
      });

      stopSpeaking();

      if (state.recognition && state.listening) {
        state.recognition.stop();
      }

      localStorage.removeItem("kooksyMode");
      localStorage.removeItem("kooksyLanguage");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);

      showToast(
        state.language === "ta"
          ? "Logout செய்ய முடியவில்லை. மீண்டும் முயற்சி செய்யுங்கள்."
          : "Logout failed. Please try again.",
        "error"
      );
    }
  }

  /* ---------------- 23. CHAT INPUT EVENTS ---------------- */

  function initializeChatInput() {
    const input = getChatInput();

    if (!input) return;

    input.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.isComposing
      ) {
        event.preventDefault();
        sendMessage();
      }
    });

    input.addEventListener("input", () => {
      input.style.height = "auto";

      input.style.height =
        `${Math.min(input.scrollHeight, 200)}px`;
    });

    const sendButton =
      $("#send-button") ||
      $("#send-btn");

    sendButton?.addEventListener("click", () => {
      sendMessage();
    });

    $$(".suggestion-card, [data-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        const prompt =
          button.dataset.prompt ||
          button.textContent.trim();

        if (prompt) {
          sendMessage(prompt);
        }
      });
    });

    const newChatButton =
      $("#new-chat-button") ||
      $("#new-chat") ||
      $("[data-action='new-chat']");

    newChatButton?.addEventListener("click", startNewChat);
  }

  /* ---------------- 24. LANGUAGE AND MODE EVENTS ---------------- */

  function initializeLanguageSelector() {
    const selector =
      $("#language-select") ||
      $("#language-selector");

    if (!selector) return;

    selector.value = state.language;

    selector.addEventListener("change", (event) => {
      changeLanguage(event.target.value);
    });
  }

  function initializeModeSelector() {
    const selector =
      $("#mode-select") ||
      $("#user-mode") ||
      $("#assistant-mode");

    if (!selector) return;

    const savedMode = localStorage.getItem("kooksyMode");

    if (savedMode) {
      selector.value = savedMode;
      state.mode = savedMode;
    }

    selector.addEventListener("change", (event) => {
      state.mode = /developer|dev/i.test(event.target.value)
        ? "developer"
        : "normal";

      localStorage.setItem("kooksyMode", state.mode);
    });
  }

  /* ---------------- 25. FILE INPUT EVENTS ---------------- */

  function initializeFileInput() {
    const fileInput = getFileInput();

    const uploadButton =
      $("#upload-button") ||
      $("#choose-file-button");

    const analyzeButton =
      $("#analyze-file-button") ||
      $("#upload-analyze-button");

    uploadButton?.addEventListener("click", () => {
      fileInput?.click();
    });

    fileInput?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];

      if (file) {
        const validation = validateFile(file);

        if (!validation.valid) {
          showToast(validation.message, "error");
          event.target.value = "";
          return;
        }

        state.currentFile = file;
        showSelectedFile(file);

        const label =
          $("#selected-file-name") ||
          $("#file-name") ||
          $("#upload-file-name");

        if (label) {
          label.title = file.name;
        }
      }
    });

    analyzeButton?.addEventListener("click", async () => {
      const file =
        state.currentFile ||
        fileInput?.files?.[0];

      if (!file) {
        showToast(t("invalidFile"), "info");
        return;
      }

      await analyzeFile(file);
    });
  }

  /* ---------------- 26. VOICE AND HISTORY EVENTS ---------------- */

  function initializeVoiceControls() {
    const voiceButton =
      $("#voice-button") ||
      $("#mic-button") ||
      $("#voice-input-button");

    voiceButton?.addEventListener("click", toggleVoiceInput);

    const stopVoiceButton =
      $("#stop-speaking-button") ||
      $("#stop-voice-button");

    stopVoiceButton?.addEventListener("click", stopSpeaking);
  }

  function initializeHistoryControls() {
    const historyButton =
      $("#history-refresh-button") ||
      $("#refresh-history");

    historyButton?.addEventListener("click", loadChatHistory);

    const historyNavigation =
      $('[href="#history"]') ||
      $('[data-navigation="history"]');

    historyNavigation?.addEventListener("click", () => {
      loadChatHistory();
    });
  }

  /* ---------------- 27. GOAL / CREATOR / FEEDBACK EVENTS ---------------- */

  function initializeFeatureControls() {
    const goalButton =
      $("#generate-goal-button") ||
      $("#goal-generate-button") ||
      $("#goal-submit");

    goalButton?.addEventListener("click", generateAgentGoal);

    const goalInput =
      $("#goal-input") ||
      $("#agent-goal-input") ||
      $("#goal-description");

    goalInput?.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.isComposing
      ) {
        event.preventDefault();
        generateAgentGoal();
      }
    });

    const creatorButton =
      $("#generate-website-button") ||
      $("#create-website-button") ||
      $("#website-generate-button");

    creatorButton?.addEventListener("click", generateWebsite);

    const feedbackButton =
      $("#submit-feedback-button") ||
      $("#feedback-submit") ||
      $("#submit-feedback");

    feedbackButton?.addEventListener("click", submitFeedback);
  }

  /* ---------------- 28. SIDEBAR / THEME / LOGOUT EVENTS ---------------- */

  function initializeNavigationControls() {
    const sidebarToggle =
      $("#sidebar-toggle") ||
      $("#menu-toggle") ||
      $("#mobile-menu-button");

    sidebarToggle?.addEventListener("click", toggleSidebar);

    const sidebarOverlay =
      $("#sidebar-overlay") ||
      $(".sidebar-overlay");

    sidebarOverlay?.addEventListener("click", closeSidebar);

    $$("[data-navigation], .sidebar-link, .nav-link").forEach(
      (link) => {
        link.addEventListener("click", (event) => {
          const target =
            link.dataset.navigation ||
            link.dataset.section ||
            link.getAttribute("href");

          if (target && target.startsWith("#")) {
            event.preventDefault();
            navigateToSection(target);
          } else if (
            link.dataset.navigation ||
            link.dataset.section
          ) {
            event.preventDefault();
            navigateToSection(target);
          }
        });
      }
    );

    const themeButton =
      $("#theme-toggle") ||
      $("#toggle-theme");

    themeButton?.addEventListener("click", toggleTheme);

    const logoutButton =
      $("#logout-button") ||
      $("#logout-btn") ||
      $("[data-action='logout']");

    logoutButton?.addEventListener("click", (event) => {
      event.preventDefault();
      logoutUser();
    });
  }

  /* ---------------- 29. KEYBOARD SHORTCUTS ---------------- */

  function initializeKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      const isMac = navigator.platform
        .toLowerCase()
        .includes("mac");

      const modifier = isMac
        ? event.metaKey
        : event.ctrlKey;

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();

        const input = getChatInput();

        if (input) {
          input.focus();
        }
      }

      if (event.key === "Escape") {
        closeSidebar();
        stopSpeaking();
      }
    });
  }

  /* ---------------- 30. INITIALIZATION ---------------- */

  function initializeKooksyAI() {
    initializeTheme();

    applyTranslations();

    initializeUserProfile();

    initializeChatInput();

    initializeLanguageSelector();

    initializeModeSelector();

    initializeFileInput();

    initializeVoiceControls();

    initializeHistoryControls();

    initializeFeatureControls();

    initializeNavigationControls();

    initializeKeyboardShortcuts();

    const initialSection = window.location.hash;

    if (initialSection) {
      navigateToSection(initialSection);
    }

    console.info("Kooksy AI initialized successfully.");
  }

  /* ---------------- 31. EXPOSE PUBLIC METHODS ---------------- */

  window.KooksyAI = {
    sendMessage,
    startNewChat,
    changeLanguage,
    toggleVoiceInput,
    speakText,
    stopSpeaking,
    analyzeFile,
    loadChatHistory,
    generateAgentGoal,
    generateWebsite,
    submitFeedback,
    navigateToSection,
    toggleTheme,
    logoutUser,
    copyText,
    getLanguage: () => state.language,
    getMode: () => state.mode
  };

  /* ---------------- 32. START APP ---------------- */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeKooksyAI,
      { once: true }
    );
  } else {
    initializeKooksyAI();
  }

})();
