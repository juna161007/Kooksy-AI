
/* =========================================
   WEBSITE CREATOR STATE
   ========================================= */

const websiteCreatorFiles = {
  files: {},
  activeFile: "index.html",
  projectName: "",
  description: "",
  deployment: [],
  hosting: []
};

const WEBSITE_FILE_NAMES = [
  "index.html",
  "style.css",
  "app.js"
];

/* =========================================
   HELPER FUNCTIONS
   ========================================= */

function websiteElement(id) {
  return document.getElementById(id);
}

function websiteStatus(message, isError = false) {
  const status = websiteElement("creatorStatus");

  if (!status) return;

  status.textContent = message;
  status.classList.toggle("creator-status-error", isError);
  status.classList.toggle("creator-status-success", !isError);
}

/* =========================================
   COPY GENERATED FILE
   ========================================= */

async function copyWebsiteFile(filename) {
  const content = websiteCreatorFiles.files[filename];

  if (typeof content !== "string") {
    websiteStatus("Generate a project and select a file first.", true);
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.select();

      const copied = document.execCommand("copy");
      textarea.remove();

      if (!copied) {
        throw new Error("Clipboard copy was blocked.");
      }
    }

    websiteStatus(filename + " code copied successfully!");
  } catch (error) {
    console.error("Copy file:", error);
    websiteStatus(
      "Copy failed. Please select and copy the code manually.",
      true
    );
  }
}

/* =========================================
   DOWNLOAD INDIVIDUAL FILE
   ========================================= */

function downloadWebsiteFile(filename) {
  const content = websiteCreatorFiles.files[filename];

  if (typeof content !== "string") {
    websiteStatus("Generate a project and select a file first.", true);
    return;
  }

  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);

  websiteStatus("Downloading " + filename + "...");
}

/* =========================================
   SELECT A GENERATED FILE
   ========================================= */

function showWebsiteFile(filename) {
  if (
    !Object.prototype.hasOwnProperty.call(
      websiteCreatorFiles.files,
      filename
    )
  ) {
    return;
  }

  websiteCreatorFiles.activeFile = filename;
  renderWebsiteCreator();
}

/* =========================================
   RENDER GENERATED WEBSITE FILES
   ========================================= */

function renderWebsiteCreator() {
  const output = websiteElement("creatorResult");

  if (!output) return;

  const files = websiteCreatorFiles.files;
  const active = websiteCreatorFiles.activeFile;

  if (!Object.keys(files).length) {
    output.textContent = "Generate a project to view your files.";
    return;
  }

  if (typeof files[active] !== "string") {
    websiteCreatorFiles.activeFile =
      WEBSITE_FILE_NAMES.find(
        (name) => typeof files[name] === "string"
      ) || Object.keys(files)[0];
  }

  const activeFile = websiteCreatorFiles.activeFile;

  const projectHead = document.createElement("div");
  projectHead.className = "creator-project-head";

  const title = document.createElement("h3");
  title.textContent =
    websiteCreatorFiles.projectName || "Your Website";

  const description = document.createElement("p");
  description.className = "muted";
  description.textContent = websiteCreatorFiles.description || "";

  const projectActions = document.createElement("div");
  projectActions.className = "creator-actions";

  const zipButton = document.createElement("button");
  zipButton.type = "button";
  zipButton.className = "primary";
  zipButton.textContent = "Download All (ZIP)";
  zipButton.addEventListener("click", downloadWebsiteZip);

  const previewButton = document.createElement("button");
  previewButton.type = "button";
  previewButton.className = "ghost";
  previewButton.textContent = "Live Preview";
  previewButton.addEventListener("click", previewGeneratedWebsite);

  projectActions.append(zipButton, previewButton);
  projectHead.append(title, description, projectActions);

  const fileCard = document.createElement("div");
  fileCard.className = "creator-file";

  const fileHead = document.createElement("div");
  fileHead.className = "creator-file-head";

  const tabs = document.createElement("div");
  tabs.className = "creator-file-actions";

  WEBSITE_FILE_NAMES
    .filter((name) => typeof files[name] === "string")
    .forEach((filename) => {
      const tab = document.createElement("button");

      tab.type = "button";
      tab.textContent = filename;
      tab.dataset.fileTab = filename;
      tab.className = filename === activeFile ? "active" : "";

      tab.addEventListener("click", () => {
        showWebsiteFile(filename);
      });

      tabs.appendChild(tab);
    });

  const actions = document.createElement("div");
  actions.className = "creator-file-actions";

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "ghost";
  copyButton.textContent = "Copy Code";
  copyButton.addEventListener("click", () => {
    copyWebsiteFile(activeFile);
  });

  const downloadButton = document.createElement("button");
  downloadButton.type = "button";
  downloadButton.className = "ghost";
  downloadButton.textContent = "Download File";
  downloadButton.addEventListener("click", () => {
    downloadWebsiteFile(activeFile);
  });

  actions.append(copyButton, downloadButton);
  fileHead.append(tabs, actions);

  const pre = document.createElement("pre");
  const code = document.createElement("code");

  code.textContent = files[activeFile] || "";

  pre.appendChild(code);
  fileCard.append(fileHead, pre);

  output.replaceChildren(projectHead, fileCard);

  if (websiteCreatorFiles.deployment.length) {
    const guide = document.createElement("div");
    guide.className = "creator-guide";

    const heading = document.createElement("h3");
    heading.textContent = "Deployment Guide";

    const list = document.createElement("ol");

    websiteCreatorFiles.deployment.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = String(step);
      list.appendChild(item);
    });

    guide.append(heading, list);
    output.appendChild(guide);
  }

  if (websiteCreatorFiles.hosting.length) {
    const guide = document.createElement("div");
    guide.className = "creator-guide";

    const heading = document.createElement("h3");
    heading.textContent = "Hosting Suggestions";

    const list = document.createElement("ul");

    websiteCreatorFiles.hosting.forEach((item) => {
      const li = document.createElement("li");

      const name =
        item && typeof item === "object"
          ? String(item.name || "Hosting option")
          : String(item);

      const reason =
        item && typeof item === "object"
          ? String(item.reason || "")
          : "";

      li.textContent = reason ? name + ": " + reason : name;
      list.appendChild(li);
    });

    guide.append(heading, list);
    output.appendChild(guide);
  }
}

/* =========================================
   GENERATE WEBSITE
   ========================================= */

async function generateWebsite() {
  const input = websiteElement("ideaInput");
  const button = websiteElement("createWebsiteBtn");

  if (!input || !button) {
    console.error("Website Creator HTML elements are missing.");
    websiteStatus("Website Creator HTML elements were not found.", true);
    return;
  }

  const idea = input.value.trim();

  if (!idea) {
    websiteStatus("Please describe your website idea.", true);
    input.focus();
    return;
  }

  button.disabled = true;
  button.textContent = "Generating...";
  websiteStatus("Kooksy AI is generating your website files...");

  try {
    const response = await apiRequest("/api/website-creator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idea: idea,
        language: websiteElement("language")?.value || "en"
      })
    });

    if (!response || !response.files || typeof response.files !== "object") {
      throw new Error("The server did not return separate website files.");
    }

    for (const filename of WEBSITE_FILE_NAMES) {
      if (
        typeof response.files[filename] !== "string" ||
        !response.files[filename].trim()
      ) {
        throw new Error("Generated file missing: " + filename);
      }
    }

    websiteCreatorFiles.files = {};

    WEBSITE_FILE_NAMES.forEach((filename) => {
      websiteCreatorFiles.files[filename] = response.files[filename];
    });

    websiteCreatorFiles.activeFile = "index.html";
    websiteCreatorFiles.projectName = response.project_name || "Kooksy Website";
    websiteCreatorFiles.description = response.description || "";

    websiteCreatorFiles.deployment =
      Array.isArray(response.deployment_instructions)
        ? response.deployment_instructions
        : [];

    websiteCreatorFiles.hosting =
      Array.isArray(response.hosting_suggestions)
        ? response.hosting_suggestions
        : [];

    renderWebsiteCreator();
    websiteStatus("Website generated successfully!");
  } catch (error) {
    console.error("Website Creator:", error);
    websiteStatus(error.message || "Website generation failed.", true);
  } finally {
    button.disabled = false;
    button.textContent = "Generate Project ✦";
  }
}

/* =========================================
   DOWNLOAD COMPLETE WEBSITE AS ZIP
   ========================================= */

async function downloadWebsiteZip() {
  if (!Object.keys(websiteCreatorFiles.files).length) {
    websiteStatus("Generate a project first.", true);
    return;
  }

  websiteStatus("Preparing your ZIP file...");

  try {
    const sessionResponse = await fetch("/api/session", {
      credentials: "same-origin"
    });

    if (!sessionResponse.ok) {
      throw new Error(
        "Could not verify your session. Please refresh and try again."
      );
    }

    const sessionData = await sessionResponse.json();

    const headers = {
      "Content-Type": "application/json"
    };

    if (sessionData.csrf_token) {
      headers["X-CSRF-Token"] = sessionData.csrf_token;
    }

    const zipResponse = await fetch(
      "/api/website-creator/export-zip",
      {
        method: "POST",
        credentials: "same-origin",
        headers: headers,
        body: JSON.stringify({
          files: websiteCreatorFiles.files
        })
      }
    );

    if (!zipResponse.ok) {
      let message = "Could not download ZIP.";

      try {
        const data = await zipResponse.json();
        message = data.error || data.message || message;
      } catch (_) {
        // The response may not be JSON.
      }

      throw new Error(message);
    }

    const blob = await zipResponse.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "kooksy-website.zip";

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
    websiteStatus("ZIP downloaded successfully!");
  } catch (error) {
    console.error("ZIP export:", error);
    websiteStatus(error.message || "ZIP download failed.", true);
  }
}

/* =========================================
   LIVE WEBSITE PREVIEW
   ========================================= */

function previewGeneratedWebsite() {
  const files = websiteCreatorFiles.files;

  if (!files["index.html"]) {
    websiteStatus("Generate a project before previewing.", true);
    return;
  }

  const output = websiteElement("creatorResult");

  if (!output) {
    websiteStatus("Website preview area was not found.", true);
    return;
  }

  let frame = websiteElement("websitePreviewFrame");

  if (!frame) {
    frame = document.createElement("iframe");
    frame.id = "websitePreviewFrame";
    frame.title = "Generated website preview";
    frame.setAttribute("sandbox", "allow-scripts");
    frame.style.width = "100%";
    frame.style.minHeight = "480px";
    frame.style.border = "1px solid #30313e";
    frame.style.borderRadius = "12px";
    frame.style.marginTop = "16px";

    output.appendChild(frame);
  }

  let html = files["index.html"];

  const cssText = String(files["style.css"] || "")
    .replace(/<\/style/gi, "<\\/style");

  const jsText = String(files["app.js"] || "")
    .replace(/<\/script/gi, "<\\/script");

  const styleTag = "<style>" + cssText + "</style>";
  const scriptTag = "<script>" + jsText + "<\\/script>";

  if (/<\/head\s*>/i.test(html)) {
    html = html.replace(/<\/head\s*>/i, styleTag + "</head>");
  } else {
    html = "<head>" + styleTag + "</head>" + html;
  }

  if (/<\/body\s*>/i.test(html)) {
    html = html.replace(/<\/body\s*>/i, scriptTag + "</body>");
  } else {
    html += scriptTag;
  }

  frame.srcdoc = html;

  frame.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  websiteStatus("Preview updated. Check the preview below.");
}

/* =========================================
   GENERATE PROJECT BUTTON
   ========================================= */

const createWebsiteButton = websiteElement("createWebsiteBtn");

if (createWebsiteButton) {
  createWebsiteButton.addEventListener("click", generateWebsite);
}

/* Character counter (optional HTML element) */

const websiteIdeaInput = websiteElement("ideaInput");

if (websiteIdeaInput) {
  websiteIdeaInput.addEventListener("input", () => {
    const counter = websiteElement("ideaCount");

    if (counter) {
      counter.textContent = websiteIdeaInput.value.length + " / 12000";
    }
  });
}
