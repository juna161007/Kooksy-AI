"use strict";

/* ============================================================
KOOKSY AI - MAIN FRONTEND JAVASCRIPT
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
newChat: "+ New Chat",
send: "Send ↑",
logout: "Log out",
welcomeTitle: "Intelligence with a Spark.",
welcomeText:
"Ask questions, continue a conversation, analyse a file, or turn your idea into a website project.",
welcomeEyebrow: "KOOKSY AI · YOUR AI WORKSPACE",
prompt: "Message Kooksy AI…",
upload: "+ Analyse a file",
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
  newChat: "+ 新对话",  
  send: "发送 ↑",  
  logout: "退出登录",  
  welcomeTitle: "智慧与灵感闪耀。",  
  welcomeText:  
    "提出问题、继续对话、分析文件，或将想法转化为网站项目。",  
  welcomeEyebrow: "KOOKSY AI · 您的 AI 工作空间",  
  prompt: "向 Kooksy AI 发送消息…",  
  upload: "+ 分析文件",  
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
  goalPlaceholder: "例如：规划一个学生作品集网站…",  
  goalButton: "生成计划 ✦",  
  creatorTitle: "网站创建器",  
  creatorDescription: "描述你的想法，生成前端、后端代码和部署说明。",  
  ideaLabel: "描述你的网站或项目想法",  
  ideaPlaceholder: "描述网站、功能、设计、前端、后端和数据库…",  
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
  newChat: "+ नई चैट",  
  send: "भेजें ↑",  
  logout: "लॉग आउट",  
  welcomeTitle: "बुद्धिमत्ता की नई चमक।",  
  welcomeText:  
    "सवाल पूछें, बातचीत जारी रखें, फ़ाइल का विश्लेषण करें या वेबसाइट का विचार बनाएँ।",  
  welcomeEyebrow: "KOOKSY AI · आपका AI कार्यक्षेत्र",  
  prompt: "Kooksy AI को संदेश भेजें…",  
  upload: "+ फ़ाइल का विश्लेषण",  
  suggestions: [  
    "AI को आसान भाषा में समझाएँ",  
    "प्रोजेक्ट की योजना बनाएँ",  
    "Python कोड लिखें और समझाएँ"  
  ],  
  historyTitle: "पुरानी बातचीत",  
  historyDescription: "पुरानी बातचीत खोलें या अनावश्यक बातचीत हटाएँ।",  
  historyLoading: "बातचीत लोड हो रही है…",  
  noHistory: "अभी कोई बातचीत सेव नहीं है।",  
  goalTitle: "लक्ष्य को योजना में बदलें",  
  goalDescription: "कार्य बताएँ। AI चरण, सफलता के मानदंड, जोखिम और सीमाएँ बताएगा।",  
  goalLabel: "आप क्या हासिल करना चाहते हैं?",  
  goalPlaceholder: "उदाहरण: छात्र पोर्टफोलियो वेबसाइट की योजना बनाएँ…",  
  goalButton: "योजना बनाएँ ✦",  
  creatorTitle: "वेबसाइट निर्माता",  
  creatorDescription: "विचार बताएँ और फ्रंटएंड, बैकएंड कोड तथा निर्देश पाएँ।",  
  ideaLabel: "अपनी वेबसाइट या प्रोजेक्ट का विचार बताएँ",  
  ideaPlaceholder: "वेबसाइट, सुविधाएँ, डिज़ाइन और डेटाबेस बताएँ…",  
  creatorButton: "प्रोजेक्ट बनाएँ ✦",  
  creatorDisclaimer:  
    "AI कोड और निर्देश देता है; वेबसाइट अपने आप प्रकाशित नहीं करता।",  
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
  feedbackSuccess: "धन्यवाद! प्रतिक्रिया भेज दी गई।",  
  feedbackFailed: "प्रतिक्रिया नहीं भेजी जा सकी।",  
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
  emptyFeedback: "कृपया प्रतिक्रिया लिखें।"  
},  

es: {  
  assistant: "Asistente de IA",  
  history: "Historial de conversaciones",  
  goal: "Objetivo del agente",  
  creator: "Creador de sitios web",  
  feedback: "Comentarios",  
  newChat: "+ Nuevo chat",  
  send: "Enviar ↑",  
  logout: "Cerrar sesión",  
  welcomeTitle: "Inteligencia con chispa.",  
  welcomeText:  
    "Haz preguntas, continúa conversaciones, analiza archivos o convierte ideas en proyectos web.",  
  welcomeEyebrow: "KOOKSY AI · TU ESPACIO DE IA",  
  prompt: "Escribe a Kooksy AI…",  
  upload: "+ Analizar un archivo",  
  suggestions: [  
    "Explica la IA de forma sencilla",  
    "Ayúdame a planificar un proyecto",  
    "Escribe y explica código Python"  
  ],  
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
/* ---------------- 4. BUSY STATE ---------------- */

const buttons = document.querySelectorAll(  
  'button[type="submit"], .send-btn, #sendBtn, #send-button'  
);  

buttons.forEach((button) => {  
  button.disabled = Boolean(value);  
  button.setAttribute("aria-busy", String(Boolean(value)));  
});  

state.busy = Boolean(value);

}

/* ---------------- 5. CSRF AND API REQUESTS ---------------- */

function readCSRFToken() {
const meta = document.querySelector('meta[name="csrf-token"]');
const input = document.querySelector(
'input[name="csrf_token"], input[name="csrf-token"]'
);

return (  
  meta?.content ||  
  input?.value ||  
  document.querySelector('[name="csrfmiddlewaretoken"]')?.value ||  
  state.csrfToken ||  
  ""  
);

}

async function apiRequest(url, options = {}) {
const headers = new Headers(options.headers || {});

headers.set("Accept", "application/json");  

const token = readCSRFToken();  

if (token && !["GET", "HEAD", "OPTIONS"].includes(  
  (options.method || "GET").toUpperCase()  
)) {  
  headers.set("X-CSRFToken", token);  
  headers.set("X-CSRF-Token", token);  
}  

const response = await fetch(url, {  
  ...options,  
  headers,  
  credentials: "same-origin"  
});  

const contentType = response.headers.get("content-type") || "";  
let data;  

if (contentType.includes("application/json")) {  
  data = await response.json();  
} else {  
  const text = await response.text();  
  data = { message: text };  
}  

if (response.status === 401 || response.status === 403) {  
  throw new Error(  
    data?.message || data?.error || getText("sessionExpired")  
  );  
}  

if (!response.ok) {  
  throw new Error(  
    data?.error ||  
    data?.message ||  
    `Request failed (HTTP ${response.status}).`  
  );  
}  

return data;

}

function postJSON(url, payload) {
return apiRequest(url, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
});
}

/* ---------------- 6. SAFE MARKDOWN RENDERING ---------------- */

function renderMarkdown(source) {
const text = String(source ?? "");
const codeBlocks = [];

// Escape untrusted text before adding HTML formatting.  
let safe = escapeHTML(text);  

// Protect fenced code blocks before applying Markdown formatting.  
safe = safe.replace(  
  /```([a-zA-Z0-9_+#.-]*)\n?([\s\S]*?)```/g,  
  (_, language, code) => {  
    const index = codeBlocks.length;  

    codeBlocks.push({  
      language: language || "text",  
      code: String(code ?? "")  
    });  

    return `\u0000CODEBLOCK${index}\u0000`;  
  }  
);  

// Inline code.  
safe = safe.replace(  
  /`([^`\n]+)`/g,  
  '<code class="inline-code">$1</code>'  
);  

// Basic Markdown formatting.  
safe = safe.replace(  
  /\*\*([\s\S]+?)\*\*/g,  
  "<strong>$1</strong>"  
);  

safe = safe.replace(  
  /(^|[^*])\*([^*\n]+)\*/g,  
  "$1<em>$2</em>"  
);  

safe = safe.replace(/^### (.+)$/gm, "<h3>$1</h3>");  
safe = safe.replace(/^## (.+)$/gm, "<h2>$1</h2>");  
safe = safe.replace(/^# (.+)$/gm, "<h1>$1</h1>");  

// Lists.  
safe = safe.replace(  
  /^\s*[-*] (.+)$/gm,  
  "<li>$1</li>"  
);  

safe = safe.replace(  
  /(?:<li>[\s\S]*?<\/li>\n?)+/g,  
  (items) => `<ul>${items}</ul>`  
);  

safe = safe.replace(/\n/g, "<br>");  

// Restore protected code blocks.  
safe = safe.replace(  
  /\u0000CODEBLOCK(\d+)\u0000/g,  
  (_, rawIndex) => {  
    const index = Number(rawIndex);  
    const block = codeBlocks[index];  

    if (!block) return "";  

    // Escape the original code only when inserting it into HTML.  
    const language = escapeHTML(block.language);  
    const code = escapeHTML(block.code);  

    return `  
      <div class="code-block">  
        <div class="code-block-header">  
          <span>${language}</span>  
          <button  
            type="button"  
            class="copy-code-btn"  
            data-code-index="${index}"  
          >Copy</button>  
        </div>  
        <pre><code>${code}</code></pre>  
      </div>  
    `;  
  }  
);  

return { html: safe, codeBlocks };

}


  /* ---------------- 5. CSRF AND API REQUESTS ---------------- */

  function readCSRFToken() {
    return state.csrfToken || "";
  }

  async function apiRequest(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();
    const headers = new Headers(options.headers || {});

    headers.set("Accept", "application/json");

    // Fetch a fresh token before every API write request.
    if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
      const tokenResponse = await fetch("/api/session", {
        method: "GET",
        credentials: "same-origin",
        headers: { "Accept": "application/json" }
      });

      const tokenData = await tokenResponse.json().catch(() => ({}));

      if (!tokenResponse.ok || !tokenData.csrf_token) {
        throw new Error(
          tokenData.message ||
          tokenData.error ||
          "Could not load security token. Please log in again."
        );
      }

      state.csrfToken = tokenData.csrf_token;
      headers.set("X-CSRF-Token", state.csrfToken);
    }

    const response = await fetch(url, {
      ...options,
      method,
      headers,
      credentials: "same-origin"
    });

    const contentType = response.headers.get("content-type") || "";
    let data;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(
        data.message ||
        data.error ||
        `Request failed (HTTP ${response.status}).`
      );
    }

    return data;
  }

  function postJSON(url, payload) {
    return apiRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }


/* ---------------- 8. CHAT ACTION BUTTONS ---------------- */

document.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const copyButton = target.closest(".message-copy-btn");

  if (copyButton) {
    const message = copyButton.closest(".message");

    try {
      await navigator.clipboard.writeText(message?._messageText || "");
      notify(getText("copied"), "success");
    } catch {
      notify(getText("copyFailed"), "error");
    }

    return;
  }

  const speakButton = target.closest(".message-speak-btn");

  if (speakButton) {
    const message = speakButton.closest(".message");

    if (message?._messageText) {
      speakText(message._messageText);
    }

    return;
  }

  const codeCopyButton = target.closest(".copy-code-btn");

  if (codeCopyButton) {
    const message = codeCopyButton.closest(".message");
    const index = Number(codeCopyButton.dataset.codeIndex);
    const code = message?._codeBlocks?.[index]?.code;

    if (typeof code === "string") {
      try {
        await navigator.clipboard.writeText(code);
        notify(getText("copied"), "success");
      } catch {
        notify(getText("copyFailed"), "error");
      }
    }
  }
});

/* ---------------- 9. TEXT-TO-SPEECH ---------------- */

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    notify(getText("speechUnavailable"), "error");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(
    String(text ?? "").slice(0, MAX_MESSAGE_LENGTH)
  );

  utterance.lang = LANGUAGE_VOICES[state.language] || "en-IN";
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
/* ---------------- 10. CHAT HISTORY STATE ---------------- */

function clearChatDisplay() {
const container = getChatContainer();

if (container) {  
  container.replaceChildren();  
}

}

function startNewChat() {
stopSpeaking();

state.chatHistory = [];  
state.activeHistoryId = null;  

clearChatDisplay();  

const welcome = $("welcomeScreen");  

if (welcome) {  
  welcome.hidden = false;  
  welcome.style.display = "";  
}  

const input =  
  $("messageInput") ||  
  $("chatInput") ||  
  $("userInput");  

if (input) {  
  input.value = "";  
  input.focus();  
}

}

function hideWelcomeScreen() {
const welcome = $("welcomeScreen");

if (welcome) {  
  welcome.hidden = true;  
  welcome.style.display = "none";  
}

}
/* ---------------- 11. CHAT REQUEST ---------------- */

function getSelectedMode() {
  const element =
    $("modeSelect") ||
    $("userMode") ||
    $("modeSelector") ||
$("mode") ||
    document.querySelector('[name="mode"]:checked');

  return element?.value || "normal";
}

function getSelectedLanguage() {
  const element =
    $("languageSelect") ||
    $("languageSelector") ||
    $("language");

  const value = element?.value || state.language || "en";

  return LANGUAGE_VOICES[value] ? value : "en";
}

function getMessageInput() {
  return (
    $("prompt") ||
    $("messageInput") ||
    $("chatInput") ||
    $("userInput") ||
    $("promptInput")
  );
}

function extractAIResponse(data) {
  if (typeof data === "string") {
    return data;
  }

  return (
    data?.response ||
    data?.reply ||
    data?.answer ||
    data?.message ||
    data?.content ||
    data?.result?.response ||
    data?.result?.content ||
    ""
  );
}

async function sendMessage(textOverride = null) {
  if (state.busy) return;

  const input = getMessageInput();

  const message = String(
    textOverride ?? input?.value ?? ""
  ).trim();

  if (!message) {
    notify(getText("emptyMessage"), "warning");
    return;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    notify(getText("charLimit"), "warning");
    return;
  }

  const language = getSelectedLanguage();

  state.language = language;
  localStorage.setItem("kooksy-language", language);

  hideWelcomeScreen();

  // Clear the input after capturing the message.
  if (input) {
    input.value = "";
  }

  addMessage("user", message);

  state.chatHistory.push({
    role: "user",
    content: message
  });

  setBusy(true);

  try {
    const history = state.chatHistory.slice(-20);

    const payload = {
      message,
      prompt: message,
      language,
      mode: getSelectedMode(),
      history,
      chat_history: history
    };

    const data = await postJSON(API.chat, payload);
    const response = extractAIResponse(data);

    if (!response) {
      throw new Error(
        data?.error || getText("chatFailed")
      );
    }

    addMessage("assistant", response);

    state.chatHistory.push({
      role: "assistant",
      content: response
    });

  } catch (error) {
    console.error("Kooksy AI chat error:", error);

    addMessage(
      "assistant",
      error.message || getText("chatFailed")
    );

    notify(
      error.message || getText("chatFailed"),
      "error"
    );

  } finally {
    setBusy(false);
    scrollChatToBottom();
  }
}


/* ---------------- 12. SEND BUTTON AND ENTER KEY ---------------- */

function bindChatControls() {
  const form =
    $("chatForm") ||
    $("messageForm") ||
    $("chat-form");

  const sendButton =
    $("sendBtn") ||
    $("sendButton") ||
    $("send-button") ||
    $("send-btn");

  const input = getMessageInput();

  // Form submission.
  if (form && !form.dataset.kooksyBound) {
    form.dataset.kooksyBound = "true";

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!state.busy) {
        sendMessage();
      }
    });
  }

  // Send button.
  if (sendButton && !sendButton.dataset.kooksyBound) {
    sendButton.dataset.kooksyBound = "true";

    sendButton.dataset.originalType =
      sendButton.getAttribute("type") || "";

    sendButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (!state.busy) {
        sendMessage();
      }
    });
  }

  // Enter sends; Shift + Enter creates a new line.
  if (input && !input.dataset.kooksyEnterBound) {
    input.dataset.kooksyEnterBound = "true";

    input.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.isComposing
      ) {
        event.preventDefault();

        if (!state.busy) {
          sendMessage();
        }
      }
    });
  }

  // New Chat buttons.
  document.querySelectorAll(
    "#newChatBtn, #new-chat-btn, .new-chat-btn"
  ).forEach((button) => {
    if (button.dataset.kooksyBound) return;

    button.dataset.kooksyBound = "true";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      startNewChat();
    });
  });

  // Suggested prompts.
 document.querySelectorAll(
  ".suggestion-btn, .suggestion, [data-prompt]"
).forEach((button) => {
    if (button.dataset.kooksyBound) return;

    button.dataset.kooksyBound = "true";

    button.addEventListener("click", () => {
      const prompt =
        button.dataset.prompt ||
        button.textContent.trim();

      if (prompt && !state.busy) {
        sendMessage(prompt);
      }
    });
  });
}
/* ---------------- 13. VOICE INPUT ---------------- */

function startVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    notify(
      getText("voiceUnsupported") ||
        "Voice recognition is not supported by this browser.",
      "error"
    );
    return;
  }

  // Stop any previous recognition session.
  if (state.recognition) {
    try {
      state.recognition.onend = null;
      state.recognition.stop();
    } catch (error) {
      console.warn("Previous voice session:", error);
    }

    state.recognition = null;
  }

  const recognition = new SpeechRecognition();

  const language = getSelectedLanguage();

  recognition.lang =
    LANGUAGE_VOICES[language] || "en-IN";

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  state.recognition = recognition;

  const input = getMessageInput();
  let finalTranscript = "";

  recognition.onstart = () => {
    notify(
      getText("listening") || "Listening… Speak now.",
      "info"
    );
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";

    for (
      let index = event.resultIndex;
      index < event.results.length;
      index++
    ) {
      const result = event.results[index];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }

    if (input) {
      input.value = (
        finalTranscript + interimTranscript
      ).trim();
    }
  };

  recognition.onerror = (event) => {
    console.error(
      "Kooksy voice input error:",
      event.error
    );

    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      notify(
        getText("voicePermission") ||
          "Allow microphone access and try again.",
        "error"
      );
    } if (event.error === "no-speech") {
      notify(
        "No speech detected. Please try again.",
        "warning"
      );
    } else if (event.error !== "aborted") {
      notify(
        "Voice input failed. Please try again.",
        "error"
      );
    }
  };

  recognition.onend = () => {
    if (state.recognition === recognition) {
      state.recognition = null;
    }

    if (input && finalTranscript.trim()) {
      input.value = finalTranscript.trim();
    }
  };

  try {
    recognition.start();
  } catch (error) {
    console.error(
      "Unable to start voice recognition:",
      error
    );

    if (state.recognition === recognition) {
      state.recognition = null;
    }

    notify(
      "Unable to start voice input. Please try again.",
      "error"
    );
  }
}


function bindVoiceControls() {
  const voiceButtons = document.querySelectorAll(
    "#voiceBtn, #voiceInputBtn, #micBtn, " +
    "#startVoiceBtn, .voice-input-btn, " +
    "[data-action='voice-input']"
  );

  voiceButtons.forEach((button) => {
    if (button.dataset.kooksyVoiceBound) return;

    button.dataset.kooksyVoiceBound = "true";

    button.addEventListener("click", (event) => {
      event.preventDefault();

      startVoiceInput();
    });
  });

  const stopSpeechButtons = document.querySelectorAll(
    "#stopSpeakingBtn, .stop-speaking-btn, " +
    "[data-action='stop-speaking']"
  );

  stopSpeechButtons.forEach((button) => {
    if (button.dataset.kooksySpeechBound) return;

    button.dataset.kooksySpeechBound = "true";

    button.addEventListener("click", (event) => {
      event.preventDefault();

      stopSpeaking();
    });
  });
}
/* ---------------- 14. LANGUAGE SELECTION ---------------- */

function applyTranslations() {
const dictionary =
translations[state.language] || translations.en;

document.documentElement.lang = state.language;  

document.querySelectorAll("[data-i18n]").forEach((element) => {  
  const key = element.dataset.i18n;  
  const value =  
    dictionary[key] !== undefined  
      ? dictionary[key]  
      : translations.en[key];  

  if (value !== undefined) {  
    // Preserve nested icons or other markup when present.  
    const label = element.querySelector("[data-i18n-label]");  
    if (label) {  
      label.textContent = value;  
    } else {  
      element.textContent = value;  
    }  
  }  
});  

document.querySelectorAll("[data-i18n-placeholder]").forEach(  
  (element) => {  
    const key = element.dataset.i18nPlaceholder;  
    const value =  
      dictionary[key] !== undefined  
        ? dictionary[key]  
        : translations.en[key];  

    if (value !== undefined) {  
      element.placeholder = value;  
    }  
  }  
);  

const input = getMessageInput();  

if (input) {  
  input.placeholder =  
    dictionary.prompt || translations.en.prompt;  
}  

const sendButton =  
  $("sendBtn") ||  
  $("sendButton") ||  
  $("send-button");  

if (sendButton) {  
  const label = sendButton.querySelector("[data-i18n-label]");  

  if (label) {  
    label.textContent =  
      dictionary.send || translations.en.send;  
  } else if (!sendButton.querySelector("[data-i18n]")) {  
    sendButton.textContent =  
      dictionary.send || translations.en.send;  
  }  
}  

document.querySelectorAll(".suggestion-btn").forEach(  
  (button, index) => {  
    const suggestions =  
      dictionary.suggestions || translations.en.suggestions;  

    if (suggestions[index] !== undefined) {  
      button.textContent = suggestions[index];  
    }  
  }  
);

}

function bindLanguageControls() {
const languageSelect =
$("languageSelect") ||
$("languageSelector") ||
$("language");

if (!languageSelect) {  
  applyTranslations();  
  return;  
}  

const supportedLanguages = Object.keys(LANGUAGE_VOICES);  

let storedLanguage = null;  

try {  
  storedLanguage = localStorage.getItem("kooksy-language");  
} catch (error) {  
  console.warn("Unable to read saved language:", error);  
}  

if (  
  storedLanguage &&  
  supportedLanguages.includes(storedLanguage) &&  
  Array.from(languageSelect.options || []).some(  
    (option) => option.value === storedLanguage  
  )  
) {  
  state.language = storedLanguage;  
  languageSelect.value = storedLanguage;  
} else if (  
  !supportedLanguages.includes(state.language)  
) {  
  state.language = "en";  
}  

if (!languageSelect.dataset.kooksyLanguageBound) {  
  languageSelect.dataset.kooksyLanguageBound = "true";  

  languageSelect.addEventListener("change", () => {  
    const selected = languageSelect.value;  

    if (!supportedLanguages.includes(selected)) {  
      return;  
    }  

    state.language = selected;  

    try {  
      localStorage.setItem("kooksy-language", selected);  
    } catch (error) {  
      console.warn("Unable to save language:", error);  
    }  

    if (typeof stopSpeaking === "function") {  
      stopSpeaking();  
    }  

    applyTranslations();  

    const selectedOption =  
      languageSelect.options[languageSelect.selectedIndex];  

    if (typeof notify === "function") {  
      notify(  
        `Language: ${selectedOption?.text || selected}`,  
        "success"  
      );  
    }  
  });  
}  

applyTranslations();

}

/* ---------------- 15. SIDEBAR NAVIGATION ---------------- */

function activateSection(sectionName) {
if (!sectionName) return;

const normalized = String(sectionName)  
  .replace(/^#/, "")  
  .replace(/^section-/, "");  

const aliases = {  
  dashboard: ["dashboard", "home"],  
  chat: ["chat", "ai-chat", "assistant"],  
  factory: ["factory", "agent-factory"],  
  voice: ["voice", "voice-assistant"],  
  history: ["history", "run-history"],  
  goal: ["goal", "agent-goal"],  
  creator: ["creator", "website-creator"],  
  feedback: ["feedback"]  
};  

const acceptedIds = aliases[normalized] || [normalized];  

let target = null;  

for (const id of acceptedIds) {  
  target =  
    $(id) ||  
    $(`${id}Section`) ||  
    $(`${id}-section`);  

  if (target) break;  
}  

if (target) {  
  document.querySelectorAll(  
    "[data-page], .page-section, .app-section"  
  ).forEach((section) => {  
    const isTarget = section === target;  

    section.hidden = !isTarget;  
    section.classList.toggle("active", isTarget);  
  });  

  target.hidden = false;  

  target.scrollIntoView({  
    behavior: "smooth",  
    block: "start"  
  });  
}  

document.querySelectorAll(  
  ".sidebar-link, .nav-link, [data-section]"  
).forEach((link) => {  
  const destination =  
    link.dataset.section ||  
    link.getAttribute("href")?.replace(/^#/, "");  

  const destinationNormalized = destination  
    ?.replace(/^#/, "")  
    .replace(/^section-/, "");  

  const destinationAliases =  
    aliases[destinationNormalized] || [destinationNormalized];  

  const active = destinationAliases.some(  
    (id) => acceptedIds.includes(id)  
  );  

  link.classList.toggle("active", active);  

  if (active) {  
    link.setAttribute("aria-current", "page");  
  } else {  
    link.removeAttribute("aria-current");  
  }  
});

}

function bindNavigation() {
document.querySelectorAll(
".sidebar-link, .nav-link, [data-section]"
).forEach((link) => {
if (link.dataset.kooksyNavigationBound) return;

link.dataset.kooksyNavigationBound = "true";  

  link.addEventListener("click", (event) => {  
    const section =  
      link.dataset.section ||  
      link.getAttribute("href");  

    if (!section || !section.startsWith("#")) {  
      return;  
    }  

    event.preventDefault();  
    activateSection(section);  
  });  
});

}

/* ---------------- 16. LOGOUT ---------------- */

function bindLogout() {
const logoutButtons = document.querySelectorAll(
"#logoutBtn, #logout-button, .logout-btn, " +
"[data-action='logout']"
);

logoutButtons.forEach((button) => {  
  if (button.dataset.kooksyLogoutBound) return;  

  button.dataset.kooksyLogoutBound = "true";  

  button.addEventListener("click", async (event) => {  
    event.preventDefault();  

    const originalText = button.textContent;  

    button.disabled = true;  

    try {  
      await apiRequest(API.logout, {  
        method: "POST"  
      });  

      window.location.assign("/login");  
    } catch (error) {  
      console.error("Kooksy logout error:", error);  

      notify(  
        error.message || "Unable to log out.",  
        "error"  
      );  

      button.disabled = false;  
      button.textContent = originalText;  
    }  
  });  
});

}
/* ---------------- 17. CHAT HISTORY ---------------- */

async function loadChatHistory() {
const container =
$("historyList") ||
$("chatHistoryList") ||
$("runHistoryList");

if (!container) return;  

container.textContent = getText("historyLoading");  

try {  
  const data = await apiRequest(API.history, {  
    method: "GET"  
  });  

  const items = Array.isArray(data)  
    ? data  
    : data.history || data.sessions || data.items || [];  

  container.replaceChildren();  

  if (!items.length) {  
    container.textContent = getText("noHistory");  
    return;  
  }  

  items.forEach((item, index) => {  
    const id = item.id ?? item.session_id ?? index;  
    const title =  
      item.title ||  
      item.name ||  
      item.preview ||  
      item.messages?.[0]?.content ||  
      `Conversation ${index + 1}`;  

    const row = document.createElement("div");  
    row.className = "history-item";  

    const titleButton = document.createElement("button");  
    titleButton.type = "button";  
    titleButton.className = "history-open-btn";  
    titleButton.textContent = String(title).slice(0, 100);  

    titleButton.addEventListener("click", () => {  
      openHistoryItem(item);  
    });  

    const deleteButton = document.createElement("button");  
    deleteButton.type = "button";  
    deleteButton.className = "history-delete-btn";  
    deleteButton.textContent = getText("historyDelete");  
    deleteButton.setAttribute(  
      "aria-label",  
      `${getText("historyDelete")}: ${String(title).slice(0, 50)}`  
    );  

    deleteButton.addEventListener("click", async () => {  
      await deleteHistoryItem(id);  
    });  

    row.append(titleButton, deleteButton);  
    container.appendChild(row);  
  });  
} catch (error) {  
  console.error("Kooksy history error:", error);  

  container.textContent =  
    error.message || getText("historyFailed");  
}

}

function openHistoryItem(item) {
const messages = Array.isArray(item.messages)
? item.messages
: Array.isArray(item.history)
? item.history
: [];

if (!messages.length) {  
  notify(  
    "This history item does not contain readable messages.",  
    "warning"  
  );  
  return;  
}  

stopSpeaking();  
clearChatDisplay();  
hideWelcomeScreen();  

state.activeHistoryId =  
  item.id ?? item.session_id ?? null;  

state.chatHistory = [];  

messages.forEach((message) => {  
  const role =  
    message.role === "assistant" ||  
    message.role === "ai"  
      ? "assistant"  
      : "user";  

  const content =  
    message.content ?? message.message ?? "";  

  if (typeof content !== "string" || !content.trim()) {  
    return;  
  }  

  addMessage(role, content);  

  state.chatHistory.push({  
    role,  
    content  
  });  
});  

activateSection("chat");

}

async function deleteHistoryItem(id) {
if (!window.confirm(getText("confirmDelete"))) {
return;
}

try {  
  /*  
   * This endpoint must exist in app.py.  
   * Change the URL if your Flask backend uses another route.  
   */  
  await apiRequest(  
    `${API.history}/${encodeURIComponent(String(id))}`,  
    { method: "DELETE" }  
  );  

  if (String(state.activeHistoryId) === String(id)) {  
    startNewChat();  
  }  

  notify(getText("deleteSuccess"), "success");  
  await loadChatHistory();  
} catch (error) {  
  console.error("Delete history error:", error);  

  notify(  
    error.message || getText("deleteFailed"),  
    "error"  
  );  
}

}

function bindHistoryControls() {
const button = $("refreshHistoryBtn");

if (button && !button.dataset.kooksyBound) {  
  button.dataset.kooksyBound = "true";  

  button.addEventListener("click", () => {  
    loadChatHistory();  
  });  
}  

const historyLinks = document.querySelectorAll(  
  "[data-section='history'], #historyLink, #runHistoryLink"  
);  

historyLinks.forEach((link) => {  
  if (link.dataset.kooksyHistoryBound) return;  

  link.dataset.kooksyHistoryBound = "true";  

  link.addEventListener("click", () => {  
    loadChatHistory();  
  });  
});

}

/* ---------------- 18. AGENT GOAL ---------------- */

function bindGoalForm() {
const form =
$("goalForm") ||
$("agentGoalForm");

if (!form || form.dataset.kooksyBound) return;  

form.dataset.kooksyBound = "true";  

form.addEventListener("submit", async (event) => {  
  event.preventDefault();  

  const input =  
    $("goalInput") ||  
    $("agentGoalInput") ||  
    form.querySelector("textarea, input[type='text']");  

  const output =  
    $("goalResult") ||  
    $("goalOutput") ||  
    $("agentGoalResult");  

  const goal = input?.value?.trim();  

  if (!goal) {  
    notify(getText("emptyGoal"), "warning");  
    return;  
  }  

  const submitButton = form.querySelector(  
    'button[type="submit"]'  
  );  

  if (submitButton) submitButton.disabled = true;  

  if (output) {  
    output.textContent = getText("loading");  
  }  

  try {  
    const data = await postJSON(API.goal, {  
      goal,  
      language: getSelectedLanguage(),  
      mode: getSelectedMode()  
    });  

    const result =  
      data.plan ||  
      data.response ||  
      data.result ||  
      data.answer ||  
      data.message;  

    if (!result) {  
      throw new Error(  
        data.error || getText("goalFailed")  
      );  
    }  

    if (output) {  
      const rendered = renderMarkdown(  
        typeof result === "string"  
          ? result  
          : JSON.stringify(result, null, 2)  
      );  

      output.innerHTML = rendered.html;  
    }  
  } catch (error) {  
    console.error("Agent goal error:", error);  

    if (output) {  
      output.textContent =  
        error.message || getText("goalFailed");  
    }  

    notify(  
      error.message || getText("goalFailed"),  
      "error"  
    );  
  } finally {  
    if (submitButton) submitButton.disabled = false;  
  }  
});

}

/* ---------------- 19. FILE UPLOAD ---------------- */

function validateFile(file) {
if (!file) {
return "Please choose a file first.";
}

if (file.size > MAX_FILE_SIZE) {  
  return getText("fileTooLarge");  
}  

const extension = file.name  
  .split(".")  
  .pop()  
  .toLowerCase();  

if (!ALLOWED_FILE_EXTENSIONS.includes(extension)) {  
  return getText("invalidFile");  
}  

return null;

}

function bindFileUpload() {
const fileInput =
$("fileInput") ||
$("uploadFile") ||
$("documentInput");

const uploadButton =  
  $("analyzeFileBtn") ||  
  $("uploadButton") ||  
  $("analyzeFileButton");  

const output =  
  $("fileAnalysisResult") ||  
  $("fileResult") ||  
  $("analysisResult");  

if (!fileInput) return;  

fileInput.addEventListener("change", () => {  
  const file = fileInput.files?.[0];  

  if (!file) {  
    state.currentFile = null;  
    return;  
  }  

  const error = validateFile(file);  

  if (error) {  
    state.currentFile = null;  
    fileInput.value = "";  
    notify(error, "error");  
    return;  
  }  

  state.currentFile = file;  

  notify(  
    `${getText("fileSelected")}: ${file.name}`,  
    "success"  
  );  
});  

if (!uploadButton || uploadButton.dataset.kooksyBound) {  
  return;  
}  

uploadButton.dataset.kooksyBound = "true";  

uploadButton.addEventListener("click", async (event) => {  
  event.preventDefault();  

  const file = fileInput.files?.[0];  

  const validationError = validateFile(file);  

  if (validationError) {  
    notify(validationError, "error");  
    return;  
  }  

  const formData = new FormData();  
  formData.append("file", file);  
  formData.append("language", getSelectedLanguage());  

  uploadButton.disabled = true;  

  if (output) {  
    output.textContent = getText("analyzing");  
  }  

  try {  
    /*  
     * This endpoint must accept multipart/form-data  
     * and the field name "file" in app.py.  
     */  
    const data = await apiRequest(API.analyzeFile, {  
      method: "POST",  
      body: formData  
    });  

    const result =  
      data.analysis ||  
      data.response ||  
      data.result ||  
      data.answer ||  
      data.message;  

    if (!result) {  
      throw new Error(  
        data.error || getText("fileFailed")  
      );  
    }  

    const resultText =  
      typeof result === "string"  
        ? result  
        : JSON.stringify(result, null, 2);  

    if (output) {  
      output.innerHTML = renderMarkdown(resultText).html;  
    }  

    notify(getText("fileSuccess"), "success");  
  } catch (error) {  
    console.error("File analysis error:", error);  

    if (output) {  
      output.textContent =  
        error.message || getText("fileFailed");  
    }  

    notify(  
      error.message || getText("fileFailed"),  
      "error"  
    );  
  } finally {  
    uploadButton.disabled = false;  
  }  
});

}

/* ---------------- 20. FEEDBACK FORM ---------------- */

function bindFeedbackForm() {
const form =
$("feedbackForm") ||
$("feedback-form");

if (!form || form.dataset.kooksyBound) return;  

form.dataset.kooksyBound = "true";  

form.addEventListener("submit", async (event) => {  
  event.preventDefault();  

  const name =  
    $("feedbackName")?.value?.trim() ||  
    form.querySelector('[name="name"]')?.value?.trim() ||  
    "";  

  const role =  
    $("feedbackRole")?.value?.trim() ||  
    form.querySelector('[name="role"]')?.value?.trim() ||  
    "";  

  const ratingElement =  
    form.querySelector('[name="rating"]:checked') ||  
    $("feedbackRating");  

  const rating = Number(ratingElement?.value || 0);  

  const message =  
    $("feedbackMessage")?.value?.trim() ||  
    $("feedbackText")?.value?.trim() ||  
    form.querySelector(  
      'textarea[name="feedback"], textarea[name="message"]'  
    )?.value?.trim() ||  
    "";  

  const output =  
    $("feedbackStatus") ||  
    $("feedbackResult");  

  if (!message) {  
    notify(getText("emptyFeedback"), "warning");  
    return;  
  }  

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {  
    notify(getText("chooseRating"), "warning");  
    return;  
  }  

  const submitButton = form.querySelector(  
    'button[type="submit"]'  
  );  

  if (submitButton) submitButton.disabled = true;  

  try {  
    await postJSON(API.feedback, {  
      name,  
      role,  
      rating,  
      feedback: message,  
      message,  
      language: getSelectedLanguage()  
    });  

    if (output) {  
      output.textContent = getText("feedbackSuccess");  
    }  

    form.reset();  

    notify(getText("feedbackSuccess"), "success");  
  } catch (error) {  
    console.error("Feedback submission error:", error);  

    if (output) {  
      output.textContent =  
        error.message || getText("feedbackFailed");  
    }  

    notify(  
      error.message || getText("feedbackFailed"),  
      "error"  
    );  
  } finally {  
    if (submitButton) submitButton.disabled = false;  
  }  
});

}
/* ---------------- 21. WEBSITE CREATOR ---------------- */

function bindWebsiteCreator() {
const form =
$("websiteCreatorForm") ||
$("creatorForm") ||
$("websiteForm");

if (!form || form.dataset.kooksyBound) return;  

form.dataset.kooksyBound = "true";  

form.addEventListener("submit", async (event) => {  
  event.preventDefault();  

  const input =  
    $("websiteIdea") ||  
    $("websitePrompt") ||  
    $("creatorPrompt") ||  
    form.querySelector("textarea");  

  const output =  
    $("websiteResult") ||  
    $("creatorResult") ||  
    $("generatedProject");  

  const idea = input?.value?.trim();  

  if (!idea) {  
    notify(getText("emptyIdea"), "warning");  
    return;  
  }  

  const submitButton = form.querySelector(  
    'button[type="submit"]'  
  );  

  if (submitButton) submitButton.disabled = true;  

  if (output) {  
    output.textContent = getText("loading");  
  }  

  try {  
    const data = await postJSON(API.creator, {  
      idea,  
      prompt: idea,  
      description: idea,  
      language: getSelectedLanguage(),  
      mode: getSelectedMode()  
    });  

    const result =  
      data.files ||  
      data.project ||  
      data.code ||  
      data.response ||  
      data.result ||  
      data.message;  

    if (!result) {  
      throw new Error(  
        data.error || getText("creatorFailed")  
      );  
    }  

    if (output) {  
      output.replaceChildren();  
    }  

    if (result && typeof result === "object" &&  
        !Array.isArray(result)) {  
      renderGeneratedFiles(result, output);  
    } else {  
      const resultText = String(result);  

      if (output) {  
        const pre = document.createElement("pre");  
        pre.className = "generated-code";  
        pre.textContent = resultText;  
        output.appendChild(pre);  

        addDownloadButton(  
          output,  
          "generated-project.txt",  
          resultText  
        );  
      }  
    }  

    notify("Project generated successfully.", "success");  
  } catch (error) {  
    console.error("Website Creator error:", error);  

    if (output) {  
      output.textContent =  
        error.message || getText("creatorFailed");  
    }  

    notify(  
      error.message || getText("creatorFailed"),  
      "error"  
    );  
  } finally {  
    if (submitButton) submitButton.disabled = false;  
  }  
});

}

/* ---------------- 22. GENERATED FILES ---------------- */

function renderGeneratedFiles(files, container) {
if (!container) return;

const fileEntries = Array.isArray(files)  
  ? files.map((file, index) => [  
      file.name || file.filename || `file-${index + 1}.txt`,  
      file.content ?? file.code ?? ""  
    ])  
  : Object.entries(files);  

if (!fileEntries.length) {  
  container.textContent = "No generated files were returned.";  
  return;  
}  

fileEntries.forEach(([filename, content]) => {  
  if (typeof filename !== "string") return;  

  const safeName = filename  
    .replace(/\\/g, "/")  
    .split("/")  
    .pop()  
    .replace(/[^a-zA-Z0-9_.-]/g, "_")  
    .slice(0, 120);  

  const text = typeof content === "string"  
    ? content  
    : JSON.stringify(content, null, 2);  

  const card = document.createElement("section");  
  card.className = "generated-file-card";  

  const heading = document.createElement("h3");  
  heading.textContent = safeName;  

  const pre = document.createElement("pre");  
  pre.className = "generated-code";  

  const code = document.createElement("code");  
  code.textContent = text;  

  pre.appendChild(code);  

  card.append(heading, pre);  

  addDownloadButton(card, safeName, text);  

  container.appendChild(card);  
});

}

function addDownloadButton(container, filename, content) {
const button = document.createElement("button");

button.type = "button";  
button.className = "download-generated-file";  
button.textContent = getText("download") || "Download";  

button.addEventListener("click", () => {  
  const blob = new Blob([content], {  
    type: "text/plain;charset=utf-8"  
  });  

  const url = URL.createObjectURL(blob);  
  const anchor = document.createElement("a");  

  anchor.href = url;  
  anchor.download = filename || "generated-project.txt";  

  document.body.appendChild(anchor);  
  anchor.click();  
  anchor.remove();  

  setTimeout(() => URL.revokeObjectURL(url), 1000);  
});  

container.appendChild(button);

}

/* ---------------- 23. USER PROFILE ---------------- */

function bindUserProfile() {
const usernameElement =
$("usernameDisplay") ||
$("userName") ||
$("profileUsername");

const profileMenu =  
  $("profileMenu") ||  
  $("userProfileMenu");  

const profileToggle =  
  $("profileToggle") ||  
  $("userMenuToggle");  

if (profileToggle && profileMenu &&  
    !profileToggle.dataset.kooksyBound) {  
  profileToggle.dataset.kooksyBound = "true";  

  profileToggle.addEventListener("click", () => {  
    const isExpanded =  
      profileToggle.getAttribute("aria-expanded") === "true";  

    profileToggle.setAttribute(  
      "aria-expanded",  
      String(!isExpanded)  
    );  

    profileMenu.hidden = isExpanded;  
  });  
}  

if (usernameElement) {  
  const serverUsername =  
    usernameElement.dataset.username ||  
    usernameElement.textContent.trim();  

  if (serverUsername) {  
    usernameElement.textContent = serverUsername;  
  }  
}

}

/* ---------------- 24. THEME TOGGLE ---------------- */

function bindThemeToggle() {
const button =
$("themeToggle") ||
$("theme-toggle");

if (!button) return;  

const savedTheme =  
  localStorage.getItem("kooksy-theme");  

if (savedTheme === "light" || savedTheme === "dark") {  
  document.documentElement.dataset.theme = savedTheme;  
}  

if (button.dataset.kooksyBound) return;  

button.dataset.kooksyBound = "true";  

button.addEventListener("click", () => {  
  const current =  
    document.documentElement.dataset.theme || "dark";  

  const next = current === "dark" ? "light" : "dark";  

  document.documentElement.dataset.theme = next;  

  localStorage.setItem("kooksy-theme", next);  

  button.setAttribute(  
    "aria-label",  
    next === "dark" ? "Switch to light theme" : "Switch to dark theme"  
  );  
});

}

/* ---------------- 25. ERROR HANDLING ---------------- */

window.addEventListener("unhandledrejection", (event) => {
console.error(
"Kooksy AI asynchronous error:",
event.reason
);
});

window.addEventListener("error", (event) => {
console.error(
"Kooksy AI JavaScript error:",
event.message,
event.filename,
event.lineno
);
});

/* ---------------- 26. INITIALIZATION ---------------- */

function initializeKooksyAI() {
try {
bindChatControls();
bindVoiceControls();
bindLanguageControls();
bindNavigation();
bindLogout();

bindHistoryControls();  
  bindGoalForm();  
  bindFileUpload();  
  bindFeedbackForm();  

  bindWebsiteCreator();  
  bindUserProfile();  
  bindThemeToggle();  

  const savedTheme = localStorage.getItem("kooksy-theme");  

  if (savedTheme === "dark" || savedTheme === "light") {  
    document.documentElement.dataset.theme = savedTheme;  
  }  

  console.info("Kooksy AI frontend initialized.");  
} catch (error) {  
  console.error(  
    "Kooksy AI initialization failed:",  
    error  
  );  

  notify(  
    "Kooksy AI could not initialize correctly. Check the browser console.",  
    "error"  
  );  
}

}

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
