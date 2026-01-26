import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Send, Clock, X, Trash2, Zap, ZoomIn, ZoomOut, Loader2, 
  Download, Upload, RotateCcw, RotateCw, FileJson, Save, Eraser, Edit2, Move, Settings, RefreshCw, CheckCircle, AlertCircle, Lightbulb, Target, Sparkles, Link2, Info,
  Sidebar as SidebarIcon, Plus, FileText, FolderOpen, MoreVertical, Layout, Check, AlertTriangle, Globe, Search, BrainCircuit, Lock, Circle, Square, MousePointer2, HelpCircle, Focus, LayoutGrid, Maximize, ScrollText, Palette, ExternalLink, Grid3X3
} from 'lucide-react';

// --- 配置與全局樣式 ---
const THEMES = {
  default: {
    id: 'default',
    name: 'Default',
    bg: '#f8fafc', 
    text: '#0f172a',
    textSec: '#64748b',
    accent: '#fbbf24',
    glass: 'rgba(255, 255, 255, 0.95)',
    glassBorder: 'rgba(226, 232, 240, 0.8)',
    line: '#cbd5e1',
    grid: '#cbd5e1',
    nodeBg: 'rgba(255, 255, 255, 0.98)',
    nodeBorder: 'rgba(148, 163, 184, 0.8)',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  tech: {
    id: 'tech',
    name: 'Cyberpunk',
    bg: '#0f172a',
    text: '#e2e8f0',
    textSec: '#94a3b8',
    accent: '#06b6d4',
    glass: 'rgba(30, 41, 59, 0.9)',
    glassBorder: 'rgba(51, 65, 85, 0.8)',
    line: '#334155',
    grid: 'rgba(255, 255, 255, 0.1)',
    nodeBg: 'rgba(15, 23, 42, 0.95)',
    nodeBorder: 'rgba(6, 182, 212, 0.5)',
    shadow: '0 0 15px rgba(6, 182, 212, 0.2)',
  },
  retro: {
    id: 'retro',
    name: 'Retro Paper',
    bg: '#fdf6e3',
    text: '#5c4033',
    textSec: '#8c7b75',
    accent: '#d97706',
    glass: 'rgba(253, 246, 227, 0.95)',
    glassBorder: 'rgba(214, 211, 209, 0.8)',
    line: '#d6d3d1',
    grid: '#d6d3d1',
    nodeBg: 'rgba(255, 250, 240, 0.98)',
    nodeBorder: 'rgba(120, 53, 15, 0.4)',
    shadow: '4px 4px 0px rgba(92, 64, 51, 0.15)',
  }
};

const BRANCH_PALETTE = [
  '#fbbf24', '#f87171', '#60a5fa', '#34d399', '#a78bfa', '#f472b6', '#fb923c', '#22d3ee'
];

const generateId = () => Math.random().toString(36).substr(2, 9);
const defaultEnvApiKey = ""; 

const INITIAL_GEMINI_MODELS = [
  { id: 'gemini-2.5-flash-preview-09-2025', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
];
const INITIAL_OPENAI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
];

const NODE_SHAPES = {
  circle: { id: 'circle', name: 'Circle', icon: Circle },
  rounded: { id: 'rounded', name: 'Rounded', icon: Square },
  pill: { id: 'pill', name: 'Pill', icon: MousePointer2 }, 
};

const UI_TEXT = {
  'zh-TW': {
    title: "創意發散", subtitle: "設定目標，讓 AI 成為您的策略顧問。",
    keywordLabel: "核心主題", keywordPlaceholder: "例如：2025 行銷案...",
    contextLabel: "背景脈絡", contextPlaceholder: "目的、受眾、限制...",
    searchLabel: "網路搜尋", searchNote: "僅 Gemini 支援",
    searchCountLabel: "搜尋條目數",
    branchCountLabel: "分支數量",
    gridLabel: "顯示網格",
    startBtn: "分析並啟動", analyzing: "AI 思考中...",
    analyzingStrategy: "AI 正在制定策略...",
    analyzingStrategyWithSearch: "AI 正在搜尋並制定策略...",
    settingsTitle: "設定", workspaceLabel: "工作區", providerLabel: "模型供應商",
    modelLabel: "型號", themeLabel: "介面風格", shapeLabel: "形狀",
    themeDefault: "極簡白", themeTech: "暗黑科技", themeRetro: "復古紙張",
    helpBtn: "連線說明", refreshBtn: "重新整理",
    pathSummary: "路徑總結", deepAnalyze: "深度分析", exploreConnect: "探索關聯",
    confirmClear: "確定清空？", deleteConfirm: "確定刪除此專案？",
    saveSuccess: "已保存", errorNoKey: "請輸入 API Key",
    currentContext: "當前策略", dragMove: "拖拽", clickExpand: "點擊展開", doubleClickEdit: "雙擊編輯", rightClickSelect: "右鍵選取",
    downloadJson: "下載 JSON", importJson: "導入 JSON", importBtn: "導入",
    analyzeThinking: "AI 專家正在撰寫報告...",
    confirmClearTitle: "清空畫布", confirmClearText: "確定要清空當前畫布嗎？未保存的內容將會遺失。",
    saveBtn: "儲存設定", cancel: "取消", confirm: "確認",
    searchNoteDisabled: "不支援", newProjectBtn: "新專案", historyBtn: "歷史紀錄", libraryTitle: "專案庫",
    refreshModels: "重新整理", apiKeyPlaceholder: "API Key...", endpointLabel: "Endpoint URL",
    editContextTitle: "編輯策略與背景", strategyLabel: "AI 策略", strategyUpdating: "更新中...", regenerateStrategy: "重新生成策略", updateBtn: "更新",
    inputPlaceholder: "輸入想法...", autoLayout: "自動佈局", centerView: "置中視角", resetZoom: "重置縮放",
    strategyUpdated: "策略已更新", error405: "錯誤 405：請檢查 CORS 設定", errorMixedContent: "混合內容錯誤：無法從 HTTPS 連線到 HTTP 本地端", errorConnection: "連線失敗", errorNoContent: "無回應內容",
    modelNamePlaceholder: "輸入模型名稱",
    translationUpdating: "正在更新翻譯...", translationUpdated: "翻譯已更新", translationFailed: "翻譯失敗",
    searchSourcesTitle: "參考來源", viewSources: "檢視來源", sourcesFound: "個參考來源"
  },
  'en': {
    title: "Brainstorm AI", subtitle: "Set a goal, let AI guide you.",
    keywordLabel: "Core Topic", keywordPlaceholder: "E.g., Marketing...",
    contextLabel: "Context", contextPlaceholder: "Goal, audience...",
    searchLabel: "Web Search", searchNote: "Gemini Only",
    searchCountLabel: "Search Count",
    branchCountLabel: "Branch Count",
    gridLabel: "Show Grid",
    startBtn: "Analyze & Start", analyzing: "AI Thinking...",
    analyzingStrategy: "Analyzing Strategy...",
    analyzingStrategyWithSearch: "Searching & Analyzing...",
    settingsTitle: "Settings", workspaceLabel: "Workspace", providerLabel: "Provider",
    modelLabel: "Model", themeLabel: "Theme", shapeLabel: "Shape",
    themeDefault: "Minimal", themeTech: "Cyberpunk", themeRetro: "Retro",
    helpBtn: "Help", refreshBtn: "Refresh",
    pathSummary: "Path Summary", deepAnalyze: "Deep Analysis", exploreConnect: "Connect",
    confirmClear: "Clear Canvas?", deleteConfirm: "Delete this project?",
    saveSuccess: "Saved", errorNoKey: "Enter API Key",
    currentContext: "Strategy", dragMove: "Drag", clickExpand: "Expand", doubleClickEdit: "Edit", rightClickSelect: "Select",
    downloadJson: "Download JSON", importJson: "Import JSON", importBtn: "Import",
    analyzeThinking: "AI Expert is writing report...",
    confirmClearTitle: "Clear Canvas", confirmClearText: "Are you sure? Unsaved data will be lost.",
    saveBtn: "Save Settings", cancel: "Cancel", confirm: "Confirm",
    searchNoteDisabled: "Not Supported", newProjectBtn: "New Project", historyBtn: "History", libraryTitle: "Library",
    refreshModels: "Refresh", apiKeyPlaceholder: "API Key...", endpointLabel: "Endpoint URL",
    editContextTitle: "Edit Context & Strategy", strategyLabel: "AI Strategy", strategyUpdating: "Updating...", regenerateStrategy: "Regenerate Strategy", updateBtn: "Update",
    inputPlaceholder: "Type an idea...", autoLayout: "Auto Layout", centerView: "Center View", resetZoom: "Reset Zoom",
    strategyUpdated: "Strategy Updated", error405: "Error 405: Check CORS", errorMixedContent: "Mixed Content Error: Cannot connect to HTTP local from HTTPS", errorConnection: "Connection Failed", errorNoContent: "No Content",
    modelNamePlaceholder: "Model Name",
    translationUpdating: "Updating translation...", translationUpdated: "Translation updated", translationFailed: "Translation failed",
    searchSourcesTitle: "Search Sources", viewSources: "View Sources", sourcesFound: "Sources Found"
  }
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateLayout = (nodes, edges, iterations = 200) => {
    const simNodes = nodes.map(n => ({ ...n, vx: 0, vy: 0 }));
    // 極致緊湊且防重疊
    const REPULSION = 40000; 
    const SPRING_LENGTH = 50; 
    const SPRING_K = 0.01; 
    const DAMPING = 0.85; 
    const TIME_STEP = 0.6;

    for (let i = 0; i < iterations; i++) {
        for (let a = 0; a < simNodes.length; a++) {
            for (let b = a + 1; b < simNodes.length; b++) {
                const nodeA = simNodes[a];
                const nodeB = simNodes[b];
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const distSq = dx*dx + dy*dy || 1; 
                const dist = Math.sqrt(distSq);
                const minDist = 120; let force = REPULSION / (distSq + 500); 
                if (dist < minDist) force *= 3; 
                const fx = (dx / dist) * force; const fy = (dy / dist) * force;
                if (!nodeA.isRoot) { nodeA.vx -= fx; nodeA.vy -= fy; } if (!nodeB.isRoot) { nodeB.vx += fx; nodeB.vy += fy; }
            }
        }
        edges.forEach(edge => {
            const source = simNodes.find(n => n.id === edge.source); const target = simNodes.find(n => n.id === edge.target);
            if (!source || !target) return;
            const dx = target.x - source.x; const dy = target.y - source.y;
            const dist = Math.sqrt(dx*dx + dy*dy) || 1; const displacement = dist - SPRING_LENGTH;
            const force = displacement * SPRING_K; const fx = (dx / dist) * force; const fy = (dy / dist) * force;
            if (!source.isRoot) { source.vx += fx; source.vy += fy; } if (!target.isRoot) { target.vx -= fx; target.vy -= fy; }
        });
        simNodes.forEach(node => { if (node.isRoot) return; node.vx *= DAMPING; node.vy *= DAMPING; node.x += node.vx * TIME_STEP; node.y += node.vy * TIME_STEP; });
    }
    return simNodes;
};

// 安全的顏色轉換函式
const hexToRgb = (hex) => {
    if (!hex || typeof hex !== 'string') return '251, 191, 36'; 
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '251, 191, 36';
};

export default function App() {
  const [lang, setLang] = useState('zh-TW'); 
  const t = UI_TEXT[lang]; 
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [contextDesc, setContextDesc] = useState(""); 
  const [strategyContext, setStrategyContext] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [loadingNodeId, setLoadingNodeId] = useState(null); 
  const [history, setHistory] = useState([]); 
  const [isInitializing, setIsInitializing] = useState(false); 
  const [isRegeneratingStrategy, setIsRegeneratingStrategy] = useState(false); 
  const [currentProjectId, setCurrentProjectId] = useState(null); 
  const [projectList, setProjectList] = useState([]); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isSaved, setIsSaved] = useState(false); 
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  // 新增：專案刪除確認狀態
  const [showDeleteProjectConfirm, setShowDeleteProjectConfirm] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);

  const [showContextEditor, setShowContextEditor] = useState(false); 
  const [toast, setToast] = useState(null); 
  const [showSettings, setShowSettings] = useState(false);
  const [showOllamaHelp, setShowOllamaHelp] = useState(false); 
  
  // NEW: State for search sources
  const [searchSources, setSearchSources] = useState([]);
  const [showSearchSources, setShowSearchSources] = useState(false);

  const [aiConfig, setAiConfig] = useState({
    provider: 'gemini', apiKey: '', geminiModel: 'gemini-2.5-flash-preview-09-2025', 
    openaiApiKey: '', openaiModel: 'gpt-4o', 
    localEndpoint: 'http://localhost:11434/api/generate', localModel: 'llama3', 
    workspaceName: 'Default', enableWebSearch: false, searchCount: 3, 
    branchCount: 8, // Default 8 branches
    defaultShape: 'circle',
    theme: 'default',
    showGrid: true // NEW: Grid Visibility Toggle
  });
  
  const currentTheme = THEMES[aiConfig.theme] || THEMES.default;

  const [localModelsList, setLocalModelsList] = useState([]);
  const [geminiModelsList, setGeminiModelsList] = useState(INITIAL_GEMINI_MODELS);
  const [openAIModelsList, setOpenAIModelsList] = useState(INITIAL_OPENAI_MODELS);
  const [fetchingModels, setFetchingModels] = useState(false);
  const [fetchModelError, setFetchModelError] = useState(null);

  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [viewTransform, setViewTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isCanvasDragging, setIsCanvasDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragNode, setDragNode] = useState(null); 
  const isNodeMovedRef = useRef(false); 
  const clickTimeoutRef = useRef(null); // 新增：用於區分單擊與雙擊的計時器
  const [apiKeyFocused, setApiKeyFocused] = useState(false);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem('mindmap_ai_config');
    if (savedConfig) setAiConfig(prev => ({ ...prev, ...JSON.parse(savedConfig) }));
    const savedLang = localStorage.getItem('mindmap_lang');
    if (savedLang) setLang(savedLang);
    loadProjectList();
    setViewTransform({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1 });
  }, []);

  const saveAiConfig = (newConfig) => {
    setAiConfig(newConfig);
    localStorage.setItem('mindmap_ai_config', JSON.stringify(newConfig));
  };

  const toggleLanguage = () => {
      const newLang = lang === 'zh-TW' ? 'en' : 'zh-TW';
      setLang(newLang);
      localStorage.setItem('mindmap_lang', newLang);
  };

  const showToast = (message, type = 'info') => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 5000);
  };

  const handleCenterView = () => {
    if (nodes.length === 0) { handleResetZoom(); return; }
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const NODE_BUFFER = 150;
    nodes.forEach(n => { if (n.x < minX) minX = n.x; if (n.x > maxX) maxX = n.x; if (n.y < minY) minY = n.y; if (n.y > maxY) maxY = n.y; });
    minX -= NODE_BUFFER; maxX += NODE_BUFFER; minY -= NODE_BUFFER; maxY += NODE_BUFFER;
    const screenPadding = 60; 
    const contentWidth = maxX - minX; const contentHeight = maxY - minY;
    if (contentWidth <= 0 || contentHeight <= 0) { handleResetZoom(); return; }
    const scaleX = (window.innerWidth - screenPadding * 2) / contentWidth;
    const scaleY = (window.innerHeight - screenPadding * 2) / contentHeight;
    let newScale = Math.min(scaleX, scaleY);
    newScale = Math.min(Math.max(newScale, 0.1), 1.5); 
    const graphCenterX = (minX + maxX) / 2; const graphCenterY = (minY + maxY) / 2;
    const screenCenterX = window.innerWidth / 2; const screenCenterY = window.innerHeight / 2;
    const newX = screenCenterX - graphCenterX * newScale; const newY = screenCenterY - graphCenterY * newScale;
    setViewTransform({ x: newX, y: newY, scale: newScale });
  };

  const handleResetZoom = () => {
    const rootNode = nodes.find(n => n.isRoot) || { x: 0, y: 0 };
    setViewTransform({ x: window.innerWidth / 2 - rootNode.x, y: window.innerHeight / 2 - rootNode.y, scale: 1 });
  };

  const handleZoom = (delta) => {
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      setViewTransform(prev => {
          const newScale = Math.min(Math.max(prev.scale + delta, 0.1), 5);
          const worldX = (screenCenterX - prev.x) / prev.scale;
          const worldY = (screenCenterY - prev.y) / prev.scale;
          const newX = screenCenterX - worldX * newScale;
          const newY = screenCenterY - worldY * newScale;
          return { x: newX, y: newY, scale: newScale };
      });
  };

  const handleWheel = (e) => {
      const scaleAmount = -e.deltaY * 0.0005; 
      setViewTransform(prev => {
          const newScale = Math.min(Math.max(prev.scale + scaleAmount, 0.1), 5);
          const mouseX = e.clientX; const mouseY = e.clientY;
          const worldX = (mouseX - prev.x) / prev.scale;
          const worldY = (mouseY - prev.y) / prev.scale;
          const newX = mouseX - worldX * newScale;
          const newY = mouseY - worldY * newScale;
          return { x: newX, y: newY, scale: newScale };
      });
  };

  const handleAutoLayout = () => {
      if (nodes.length === 0) return;
      snapshot(); 
      const newLayoutNodes = simulateLayout(nodes, edges, 200); 
      setNodes(newLayoutNodes);
      showToast(t.strategyUpdated || "Layout updated", "success");
      setTimeout(handleCenterView, 100);
  };

  const snapshot = useCallback(() => {
    setUndoStack(prev => [...prev, { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), contextDesc, strategyContext }]);
    setRedoStack([]); 
  }, [nodes, edges, contextDesc, strategyContext]);

  const deleteSelected = useCallback(() => {
    const selectedIds = nodes.filter(n => n.selected).map(n => n.id);
    if (selectedIds.length === 0) return;
    snapshot(); 
    setNodes(prev => prev.filter(n => !n.selected));
    setEdges(prev => prev.filter(e => !selectedIds.includes(e.source) && !selectedIds.includes(e.target)));
  }, [nodes, snapshot]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack(prev => [{ nodes, edges, contextDesc, strategyContext }, ...prev]);
    setNodes(previous.nodes); setEdges(previous.edges);
    setContextDesc(previous.contextDesc || ""); setStrategyContext(previous.strategyContext || "");
    setUndoStack(prev => prev.slice(0, -1));
  }, [undoStack, nodes, edges, contextDesc, strategyContext]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setUndoStack(prev => [...prev, { nodes, edges, contextDesc, strategyContext }]);
    setNodes(next.nodes); setEdges(next.edges);
    setContextDesc(next.contextDesc || ""); setStrategyContext(next.strategyContext || "");
    setRedoStack(prev => prev.slice(1));
  }, [redoStack, nodes, edges, contextDesc, strategyContext]);

  const loadProjectList = () => { try { const l = localStorage.getItem('mindmap_projects_index'); if (l) setProjectList(JSON.parse(l)); } catch (e) {} };
  
  const saveCurrentProject = () => {
    if (nodes.length === 0) return; 
    const rootNode = nodes.find(n => n.isRoot);
    const projectName = rootNode ? (rootNode.zh || rootNode.text) : (contextDesc ? contextDesc.slice(0, 10) : t.title);
    const projectId = currentProjectId || generateId();
    const timestamp = new Date().toISOString();
    const projectData = { id: projectId, name: projectName, updatedAt: timestamp, data: { nodes, edges, contextDesc, strategyContext, viewTransform, history } };
    localStorage.setItem(`mindmap_proj_${projectId}`, JSON.stringify(projectData));
    setProjectList(prev => {
      const filtered = prev.filter(p => p.id !== projectId);
      const newList = [{ id: projectId, name: projectName, updatedAt: timestamp }, ...filtered];
      localStorage.setItem('mindmap_projects_index', JSON.stringify(newList));
      return newList;
    });
    setCurrentProjectId(projectId); setIsSaved(true); setTimeout(() => setIsSaved(false), 1500);
  };
  
  const loadProject = (projectId) => {
    try {
      const dataStr = localStorage.getItem(`mindmap_proj_${projectId}`);
      if (!dataStr) { showToast("Data not found", "error"); return; }
      const project = JSON.parse(dataStr);
      snapshot(); 
      setNodes(project.data.nodes || []); setEdges(project.data.edges || []);
      setContextDesc(project.data.contextDesc || ""); setStrategyContext(project.data.strategyContext || "");
      setViewTransform(project.data.viewTransform || { x: 0, y: 0, scale: 1 });
      setHistory(project.data.history || []); setCurrentProjectId(project.id); setIsSidebarOpen(false); 
    } catch (e) { showToast("Load failed", "error"); }
  };
  
  // 修改後的刪除請求函式
  const requestDeleteProject = (e, projectId) => {
    e.stopPropagation(); 
    // 不再使用 window.confirm
    setProjectToDeleteId(projectId);
    setShowDeleteProjectConfirm(true);
  };
  
  // 修改後的執行刪除函式
  const executeDeleteProject = () => {
    if (!projectToDeleteId) return;
    localStorage.removeItem(`mindmap_proj_${projectToDeleteId}`);
    setProjectList(prev => { 
        const newList = prev.filter(p => p.id !== projectToDeleteId); 
        localStorage.setItem('mindmap_projects_index', JSON.stringify(newList)); 
        return newList; 
    });
    if (currentProjectId === projectToDeleteId) executeNewProject();
    setShowDeleteProjectConfirm(false);
    setProjectToDeleteId(null);
  };
  
  const executeNewProject = () => {
    setNodes([]); setEdges([]); setContextDesc(""); setStrategyContext(""); setHistory([]);
    setUndoStack([]); setRedoStack([]); setCurrentProjectId(null); setInputValue("");
    setViewTransform({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1 });
    setShowClearConfirm(false);
  };
  const requestNewProject = () => { if (nodes.length > 0) { setShowClearConfirm(true); setIsSidebarOpen(false); } else { executeNewProject(); setIsSidebarOpen(false); } };
  
  const handleExportJSON = () => {
    const data = { nodes, edges, contextDesc, strategyContext, version: "1.3", timestamp: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${nodes.find(n=>n.isRoot)?.text || 'mindmap'}_${new Date().toISOString().slice(0,10)}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const handleImportJSON = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (d.nodes) { snapshot(); setNodes(d.nodes); setEdges(d.edges || []); setContextDesc(d.contextDesc || ""); setStrategyContext(d.strategyContext || ""); setViewTransform({ x: window.innerWidth/2, y: window.innerHeight/2, scale: 1 }); setCurrentProjectId(null); setTimeout(saveCurrentProject, 100); }
      } catch (err) { showToast("File parse error", 'error'); }
    };
    reader.readAsText(file); e.target.value = null;
  };

  useEffect(() => {
    const hk = (e) => { if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return; if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected(); if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); } if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo(); } };
    window.addEventListener('keydown', hk); return () => window.removeEventListener('keydown', hk);
  }, [deleteSelected, handleUndo, handleRedo]);

  const fetchOllamaModels = async (endpointUrl) => {
    setFetchingModels(true); setFetchModelError(null);
    try {
      const baseUrl = endpointUrl.replace(/\/api\/generate\/?$/, ''); const response = await fetch(`${baseUrl}/api/tags`);
      if (response.status === 405) throw new Error(t.error405); if (!response.ok) throw new Error('Connection failed');
      const data = await response.json();
      if (data.models) { setLocalModelsList(data.models); if (data.models.length > 0) saveAiConfig({ ...aiConfig, localModel: data.models[0].name }); showToast("Ollama list updated", "success"); }
    } catch (err) { setFetchModelError(err.message.includes("Failed to fetch") ? t.errorMixedContent : err.message); showToast(err.message, "error"); setLocalModelsList([]); } finally { setFetchingModels(false); }
  };
  const fetchGeminiModels = async () => {
    if(!aiConfig.apiKey) return; setFetchingModels(true); setFetchModelError(null);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${aiConfig.apiKey}`);
        if(!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        if(data.models) { setGeminiModelsList(data.models.filter(m => m.supportedGenerationMethods?.includes("generateContent")).map(m => ({id: m.name.replace('models/', ''), name: m.displayName || m.name}))); showToast("Gemini list updated", "success"); }
    } catch(e) { setFetchModelError(e.message); showToast(e.message, "error"); } finally { setFetchingModels(false); }
  };
  const fetchOpenAIModels = async () => {
    if(!aiConfig.openaiApiKey) return; setFetchingModels(true); setFetchModelError(null);
    try {
        const response = await fetch("https://api.openai.com/v1/models", {headers:{"Authorization":`Bearer ${aiConfig.openaiApiKey}`}});
        if(!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        if(data.data) { setOpenAIModelsList(data.data.filter(m => m.id.startsWith("gpt")).map(m => ({id: m.id, name: m.id}))); showToast("OpenAI list updated", "success"); }
    } catch(e) { setFetchModelError(e.message); showToast(e.message, "error"); } finally { setFetchingModels(false); }
  };
  
  const callAiApi = async (promptText, forceJson = true, retryCount = 0) => {
      let resultText = "";
      try {
        if (aiConfig.provider === 'gemini') {
            const model = aiConfig.geminiModel || 'gemini-2.5-flash-preview-09-2025';
            
            // FIX: Disable JSON mode enforcement when using tools (Search) to avoid API error:
            // "Tool use with a response mime type: 'application/json' is unsupported"
            const useJsonMode = forceJson && !aiConfig.enableWebSearch;
            
            const payload = { 
                contents: [{ parts: [{ text: promptText }] }], 
                generationConfig: useJsonMode ? { responseMimeType: "application/json" } : {} 
            };
            
            if (aiConfig.enableWebSearch) payload.tools = [{ google_search: {} }];
            
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${aiConfig.apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.status === 429 && retryCount < 3) { await wait(2000 * (retryCount + 1)); return callAiApi(promptText, forceJson, retryCount + 1); }
            if (!res.ok) { const e = await res.json().catch(()=>{}); throw new Error(e.error?.message || res.statusText); }
            const data = await res.json(); 
            
            const candidate = data.candidates?.[0];
            let text = candidate?.content?.parts?.[0]?.text || "";
            const sources = candidate?.groundingMetadata?.groundingAttributions || [];

            // New logic: always update global state for sources for visibility
            setSearchSources(sources);
            if (sources.length > 0) {
               // Optional: Show a subtle toast or just rely on the UI icon
               // showToast(`${t.sourcesFound}: ${sources.length}`, "info"); 
            }

            // If not strictly expecting pure JSON (e.g. Analysis or Summary), append sources
            if (!forceJson && sources.length > 0) {
                const uniqueSources = new Map();
                sources.forEach(s => {
                    if (s.web?.uri && s.web?.title) uniqueSources.set(s.web.uri, s.web.title);
                });
                
                if (uniqueSources.size > 0) {
                    text += "\n\n---\n**參考來源 (References):**\n";
                    let idx = 1;
                    uniqueSources.forEach((title, uri) => {
                        text += `${idx++}. [${title}](${uri})\n`;
                    });
                }
            }
            resultText = text;

        } else if (aiConfig.provider === 'openai') {
            const res = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${aiConfig.openaiApiKey}` }, body: JSON.stringify({ model: aiConfig.openaiModel, messages: [{ role: "system", content: "You are a creative assistant." + (forceJson ? " Output JSON." : "") }, { role: "user", content: promptText }], response_format: forceJson ? { type: "json_object" } : undefined }) });
            if (!res.ok) throw new Error((await res.json()).error?.message); resultText = (await res.json()).choices[0].message.content;
        } else if (aiConfig.provider === 'local') {
            const res = await fetch(aiConfig.localEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: aiConfig.localModel, prompt: promptText + (forceJson ? " Ensure JSON." : ""), stream: false, format: forceJson ? "json" : undefined }) });
            if (res.status === 405) throw new Error(t.error405); if (!res.ok) throw new Error(res.statusText); const d = await res.json(); resultText = d.response || d.choices?.[0]?.message?.content;
        }
      } catch (e) { if (e.message.includes("Failed to fetch")) throw new Error(window.location.protocol === 'https:' && aiConfig.provider === 'local' ? t.errorMixedContent : t.errorConnection); throw e; }
      if (!resultText) throw new Error(t.errorNoContent); return resultText;
  };

  const handleRegenerateStrategy = async () => {
    if (!contextDesc.trim()) return;
    const rootNode = nodes.find(n => n.isRoot); const topic = rootNode ? (rootNode.zh || rootNode.text) : "Brainstorming";
    setIsRegeneratingStrategy(true);
    try {
        const searchInst = aiConfig.provider==='gemini' && aiConfig.enableWebSearch ? `Use Google Search to find top ${aiConfig.searchCount || 3} insights.` : "";
        const res = await callAiApi(`Analyze topic "${topic}" with context "${contextDesc}". ${searchInst} Update strategy (max 100 words). Return JSON: {"strategy":"..."}`, true);
        let strat = ""; try { strat = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim()).strategy; } catch(e){ strat = res; }
        setStrategyContext(strat); showToast(t.strategyUpdated, "success");
    } catch (e) { showToast(e.message, "error"); } finally { setIsRegeneratingStrategy(false); }
  };

  const handlePathSummary = async () => {
      const selected = nodes.filter(n => n.selected); if (selected.length !== 1) return; const targetNode = selected[0];
      let pathNodes = [targetNode], curr = targetNode.id, depth = 0;
      while(depth < 20) { const edge = edges.find(e => e.target === curr); if (!edge) break; const parent = nodes.find(n => n.id === edge.source); if (!parent) break; pathNodes.unshift(parent); curr = parent.id; depth++; }
      const pathString = pathNodes.map(n => lang === 'zh-TW' ? (n.zh || n.text) : (n.en || n.text)).join(" → ");
      setAnalyzing(true);
      const targetText = lang === 'zh-TW' ? (targetNode.zh || targetNode.text) : (targetNode.en || targetNode.text);
      setAnalysisResult({ title: `${t.pathSummary}: ${pathString}`, content: t.analyzeThinking });
      try {
          const searchInst = aiConfig.provider === 'gemini' && aiConfig.enableWebSearch ? `Use Google Search to retrieve ${aiConfig.searchCount || 3} key facts to validate insights.` : "";
          const targetLang = lang === 'zh-TW' ? 'Traditional Chinese (繁體中文)' : 'English';
          const prompt = `Act as a top-tier Domain Expert. ${searchInst} Context: ${contextDesc}. Strategy: ${strategyContext}. Path: ${pathString}. Mission: Analyze the chain from root to "${targetText}". Output Requirements: CASE A (Problem Solving): Actionable solutions, methodology. CASE B (Innovation): Future potential, feasibility, required resources. Output strictly in ${targetLang} using Markdown. ${lang === 'zh-TW' ? "CRITICAL: The output MUST be in Traditional Chinese (繁體中文). Do NOT use English unless necessary for terms." : ""} Do not generate a reference list manually.`;
          const result = await callAiApi(prompt, false);
          setAnalysisResult({ title: `${t.pathSummary}: ${pathString}`, content: result });
      } catch (e) { setAnalysisResult({ title: "Error", content: e.message }); } finally { setAnalyzing(false); }
  };

  const fetchAssociations = async (sourceNode) => {
    snapshot(); setLoading(true); setLoadingNodeId(sourceNode.id);
    try {
      // 1. Trace Ancestors
      let pathTrace = [sourceNode.zh || sourceNode.en || sourceNode.text];
      let currentId = sourceNode.id;
      let depth = 0;
      
      // Collection of words to strictly avoid (Ancestors + Existing nodes in this branch ideally, but global is safer to avoid repetition)
      const existingTexts = new Set(nodes.map(n => [n.text, n.zh, n.en]).flat().filter(Boolean).map(s => s.toLowerCase()));

      while(depth < 10) { 
          const parentEdge = edges.find(e => e.target === currentId); 
          if (!parentEdge) break; 
          const parentNode = nodes.find(n => n.id === parentEdge.source); 
          if (!parentNode) break; 
          pathTrace.unshift(parentNode.zh || parentNode.en || parentNode.text); 
          currentId = parentNode.id; 
          depth++; 
      }
      
      const contextPathStr = pathTrace.join(" > ");
      const rootNode = nodes.find(n => n.isRoot);
      const coreTopic = rootNode ? (rootNode.zh || rootNode.text) : "Core Topic";

      // 2. Prepare Prompt
      // Configure branching settings: user defined count vs request count (3x for deduplication)
      const branchCount = aiConfig.branchCount || 8;
      const requestCount = branchCount * 3;

      const searchInst = aiConfig.provider==='gemini' && aiConfig.enableWebSearch ? `USE GOOGLE SEARCH to find top ${aiConfig.searchCount || 3} trends/facts. Infer nodes based on findings.` : "";
      
      const promptText = `
        Role: Strategic Innovation Consultant.
        
        # PROJECT CORE
        - Core Topic: "${coreTopic}"
        - Context & Constraints: "${contextDesc || "None provided"}"
        - **AI Strategic Guide**: "${strategyContext || "Pending..."}"
        
        # CURRENT STATE
        - Evolution Path: ${contextPathStr}
        - Current Focus Node: "${sourceNode.zh || sourceNode.text}"
        
        # MISSION
        ${searchInst}
        Generate **${requestCount}** strategic sub-concepts that strictly follow the "AI Strategic Guide" and "Context".
        
        # CRITICAL RULES
        1. **RELEVANCE**: Sort the output list by relevance/impact to the "Core Topic".
        2. **NO REPETITION**: Strictly avoid synonyms of [${contextPathStr}].
        3. **CONCISENESS**: Output terms must be short and punchy (Max 10 Chinese characters). No descriptions or colons.
        4. **LANGUAGE**: Output 'zh' field MUST be Traditional Chinese (Taiwan usage).
        
        # OUTPUT FORMAT (Strict JSON)
        {
          "original": { "zh": "Translation of Focus Node", "en": "Translation of Focus Node" },
          "items": [
            { "zh": "Concept 1", "en": "Concept 1", "rank": 1 },
            ...
            { "zh": "Concept ${requestCount}", "en": "Concept ${requestCount}", "rank": ${requestCount} }
          ]
        }
      `;

      const resultText = await callAiApi(promptText, true);
      const parsed = JSON.parse(resultText.replace(/```json/g, '').replace(/```/g, '').trim());
      
      // FIX: Only update translations for non-root nodes. Root node stays as user input.
      const updatedNodes = nodes.map(n => {
        // ALLOW root node to get translation updates, but TEXT stays user input via other logic
        if (n.id === sourceNode.id) {
            return { ...n, zh: parsed.original.zh || n.zh, en: parsed.original.en || n.en };
        }
        return n;
      });

      // 3. Post-processing: Filter Duplicates & Slice Top N
      let validItems = parsed.items.filter(item => {
          const zh = item.zh?.toLowerCase();
          const en = item.en?.toLowerCase();
          // Filter if EITHER Chinese or English text already exists in the graph
          if (zh && existingTexts.has(zh)) return false;
          if (en && existingTexts.has(en)) return false;
          return true;
      });

      // Take user defined branch count
      const items = validItems.slice(0, branchCount);
      
      const newNodes = [], newEdges = [];
      const baseRadius = 50; 
      let baseAngle = 0, spreadAngle = Math.PI * 2;
      if (!sourceNode.isRoot) {
          const parentEdge = edges.find(e => e.target === sourceNode.id);
          if (parentEdge) { const parentNode = nodes.find(n => n.id === parentEdge.source); if (parentNode) { baseAngle = Math.atan2(sourceNode.y - parentNode.y, sourceNode.x - parentNode.x); spreadAngle = (Math.PI * 2) / 3; } }
      }
      const startAngle = baseAngle - spreadAngle / 2;
      items.forEach((item, index) => {
        const angleStep = spreadAngle / (items.length - 1 || 1);
        const angle = sourceNode.isRoot ? (index * (spreadAngle/items.length)) : (startAngle + index * angleStep);
        const jitter = (Math.random() - 0.5) * 0.2; 
        const finalAngle = angle + jitter;
        const radius = baseRadius + (Math.random() * 20 - 10); 
        const newNodeId = generateId();
        let nodeColor = sourceNode.isRoot ? BRANCH_PALETTE[index % BRANCH_PALETTE.length] : (sourceNode.color || currentTheme.accent);
        
        // FIX: Force rank to be sequential based on the final filtered list (1 to 8)
        const displayRank = index + 1;

        newNodes.push({ id: newNodeId, text: item.zh, zh: item.zh, en: item.en, x: sourceNode.x + Math.cos(finalAngle) * radius, y: sourceNode.y + Math.sin(finalAngle) * radius, selected: false, isRoot: false, color: nodeColor, shape: aiConfig.defaultShape || 'circle', rank: displayRank }); 
        newEdges.push({ id: generateId(), source: sourceNode.id, target: newNodeId, animated: true, color: nodeColor });
      });

      const allNodes = [...updatedNodes, ...newNodes]; const allEdges = [...edges, ...newEdges];
      const optimizedNodes = simulateLayout(allNodes, allEdges, 200);
      setNodes(optimizedNodes); setEdges(allEdges);
      setTimeout(() => setEdges(prev => prev.map(e => ({...e, animated: false}))), 1500);
    } catch (error) { showToast(error.message, 'error'); } finally { setLoading(false); setLoadingNodeId(null); }
  };

  const handleAnalyzeNode = async () => {
      const selected = nodes.filter(n => n.selected); if (selected.length !== 1) return;
      setAnalyzing(true);
      const focusWord = lang === 'zh-TW' ? (selected[0].zh || selected[0].text) : (selected[0].en || selected[0].text);
      setAnalysisResult({ title: `${t.deepAnalyze}：${focusWord}`, content: t.analyzeThinking });
      try {
          const targetLang = lang === 'zh-TW' ? 'Traditional Chinese (繁體中文)' : 'English';
          const searchInst = aiConfig.provider==='gemini' && aiConfig.enableWebSearch ? `Use Google Search to retrieve top ${aiConfig.searchCount || 3} relevant sources.` : "";
          const result = await callAiApi(`Act as Expert. ${searchInst} Context: ${contextDesc}. Strategy: ${strategyContext}. Topic: "${focusWord}". Task: Structural analysis (Definition, Relevance, Factors, Insight). Output in ${targetLang} using Markdown. ${lang === 'zh-TW' ? "CRITICAL: Output in Traditional Chinese." : ""} Do not generate a reference list manually.`, false);
          setAnalysisResult({ title: `${t.deepAnalyze}：${focusWord}`, content: result });
      } catch (error) { setAnalysisResult({ title: "Error", content: error.message }); } finally { setAnalyzing(false); }
  };

  const handleConnectNodes = async () => {
      const selected = nodes.filter(n => n.selected); if (selected.length !== 2) return;
      setAnalyzing(true);
      const w1 = lang === 'zh-TW' ? (selected[0].zh || selected[0].text) : (selected[0].en || selected[0].text);
      const w2 = lang === 'zh-TW' ? (selected[1].zh || selected[1].text) : (selected[1].en || selected[1].text);
      setAnalysisResult({ title: `${t.exploreConnect}：${w1} & ${w2}`, content: t.analyzeThinking });
      try {
          const targetLang = lang === 'zh-TW' ? 'Traditional Chinese (繁體中文)' : 'English';
          const result = await callAiApi(`Relate "${w1}" & "${w2}". Context: ${contextDesc}. Output in ${targetLang} using Markdown.`, false);
          setAnalysisResult({ title: `${t.exploreConnect}：${w1} & ${w2}`, content: result });
      } catch (error) { setAnalysisResult({ title: "Error", content: error.message }); } finally { setAnalyzing(false); }
  };

  const handleInitialSetup = async (e) => {
    e.preventDefault(); if (!inputValue.trim()) return; setIsInitializing(true);
    try {
        const searchInst = aiConfig.provider==='gemini' && aiConfig.enableWebSearch ? `Perform ${aiConfig.searchCount || 3} web searches to identify key trends.` : "";
        
        // 1. Create Root Node Immediately (FIX: Never let AI replace this)
        const rootId = generateId();
        const initialText = inputValue; 
        
        snapshot();
        setNodes([{ 
            id: rootId, 
            text: initialText, 
            zh: initialText, // Always keep original input as master
            en: initialText, // Initial fallback
            x: 0, y: 0, selected: false, isRoot: true, color: currentTheme.accent, shape: aiConfig.defaultShape 
        }]);
        setInputValue(""); 
        setViewTransform({ x: window.innerWidth / 2, y: window.innerHeight / 2, scale: 1 });
        setTimeout(saveCurrentProject, 100);

        // 2. Background Analysis (Strategy Only, Translation update only for secondary props)
        showToast(t.analyzingStrategy, "info");
        const res = await callAiApi(`Analyze topic "${initialText}" with context "${contextDesc}". ${searchInst} 
        Task: 
        1. Provide "strategy" for brainstorming (max 100 words).
        2. Translate topic to Traditional Chinese (zh) and English (en).
        
        Return JSON: {"strategy":"...", "zh":"...", "en":"..."}
        
        CRITICAL: Output 'zh' MUST be Traditional Chinese.`, true);
        
        let parsed = { strategy: "", zh: initialText, en: initialText };
        try { parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim()); } catch(e){}
        
        setStrategyContext(parsed.strategy);
        
        // RESTORED: Update translations so subtitle appears, but keep text as user input
        setNodes(prev => prev.map(n => {
            if (n.id === rootId) {
                return { ...n, zh: parsed.zh || n.text, en: parsed.en || n.text };
            }
            return n;
        }));
        
        showToast(t.strategyUpdated, "success");

    } catch (error) { showToast(error.message, 'error'); } finally { setIsInitializing(false); }
  };

  const handleNodeDoubleClick = (e, node) => { 
      e.stopPropagation(); 
      e.preventDefault(); 
      
      // 雙擊時，立即清除單擊的計時器，防止觸發發想
      if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
          clickTimeoutRef.current = null;
      }

      setEditingNodeId(node.id); 
      setEditValue(lang === 'zh-TW' ? (node.zh || node.text) : (node.en || node.text)); 
  };

  // NEW: Helper to refresh root translation after edit
  const refreshRootTranslation = async (newText) => {
      try {
          showToast(t.translationUpdating, "info"); // Visual feedback
          
          // Enhanced prompt to ensure distinct translations
          const res = await callAiApi(`
            Task: Translate the core topic "${newText}" into Traditional Chinese (zh) and English (en).
            - If input is Chinese, 'en' MUST be the English translation. 'zh' remains same.
            - If input is English, 'zh' MUST be the Traditional Chinese translation. 'en' remains same.
            - Return strictly valid JSON: {"zh": "...", "en": "..."}
          `, true);
          
          const parsed = JSON.parse(res.replace(/```json/g, '').replace(/```/g, '').trim());
          
          setNodes(prev => prev.map(n => {
              if (n.isRoot) {
                  return { ...n, zh: parsed.zh, en: parsed.en }; 
              }
              return n;
          }));
          showToast(t.translationUpdated, "success");
      } catch (e) { 
          console.error("Auto-translation failed", e); 
          showToast(t.translationFailed + ": " + e.message, "error");
      }
  };

  const finishEditing = () => { 
      if (editingNodeId && editValue.trim()) { 
          snapshot(); 
          const targetNode = nodes.find(n => n.id === editingNodeId);
          const isRoot = targetNode?.isRoot;

          setNodes(prev => prev.map(n => n.id === editingNodeId ? { 
              ...n, 
              text: editValue, 
              // If root, temporarily reset translations to prevent mismatch
              // They will be updated by refreshRootTranslation shortly
              zh: isRoot ? editValue : (lang==='zh-TW'?editValue:n.zh), 
              en: isRoot ? editValue : (lang==='en'?editValue:n.en) 
          } : n)); 
          
          if (isRoot) {
              refreshRootTranslation(editValue);
          }
      } 
      setEditingNodeId(null); 
      setEditValue(""); 
  };

  const handleInputSubmit = (e) => {
    e.preventDefault(); if (!inputValue.trim()) return; snapshot(); setHistory(prev => [inputValue, ...prev]);
    const sel = nodes.filter(n => n.selected); const newNodeId = generateId();
    let newX = 0, newY = 0, nodeColor = currentTheme.accent;
    if (sel.length > 0) { const avgX = sel.reduce((s, n) => s + n.x, 0) / sel.length; const avgY = sel.reduce((s, n) => s + n.y, 0) / sel.length; newX = avgX + (Math.random() - 0.5) * 50; newY = avgY + 80; nodeColor = sel[0].color || currentTheme.accent; } 
    else { newX = (-viewTransform.x + window.innerWidth/2)/viewTransform.scale; newY = (-viewTransform.y + window.innerHeight/2)/viewTransform.scale; }
    const newNode = { id: newNodeId, text: inputValue, zh: lang==='zh-TW'?inputValue:undefined, en: lang==='en'?inputValue:undefined, x: newX, y: newY, selected: false, isRoot: nodes.length===0, color: nodeColor, shape: aiConfig.defaultShape };
    setNodes(prev => [...prev, newNode]);
    if (sel.length > 0) { const newEdges = sel.map(s => ({ id: generateId(), source: s.id, target: newNodeId, animated: true, color: nodeColor })); setEdges(prev => [...prev, ...newEdges]); }
    setInputValue("");
  };

  // --- 畫布操作 ---
  const handleCanvasMouseDown = (e) => { 
      if(e.button !== 0) return; 
      if(e.target.closest('.node-element') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) return;
      if(editingNodeId) setEditingNodeId(null); 
      setIsCanvasDragging(true); 
      setDragStart({ x: e.clientX, y: e.clientY }); 
  };
  const handleMouseMove = (e) => { 
      if(dragNode) { 
          isNodeMovedRef.current = true; 
          const dx = (e.clientX - dragStart.x)/viewTransform.scale; 
          const dy = (e.clientY - dragStart.y)/viewTransform.scale; 
          setNodes(prev => prev.map(n => n.id === dragNode.id ? {...n, x: dragNode.initialX + dx, y: dragNode.initialY + dy} : n)); 
      } else if(isCanvasDragging) { 
          const dx = e.clientX - dragStart.x; 
          const dy = e.clientY - dragStart.y; 
          setViewTransform(prev => ({...prev, x: prev.x + dx, y: prev.y + dy})); 
          setDragStart({ x: e.clientX, y: e.clientY });
      }
  };
  const handleMouseUp = () => { setDragNode(null); setIsCanvasDragging(false); };
  const handleNodeMouseDown = (e, node) => { e.stopPropagation(); if (editingNodeId) return; isNodeMovedRef.current = false; setDragNode({ id: node.id, initialX: node.x, initialY: node.y }); setDragStart({ x: e.clientX, y: e.clientY }); };
  
  const handleNodeClick = (e, node) => { 
      e.stopPropagation(); 
      if (isNodeMovedRef.current || editingNodeId === node.id) return; 
      
      // 清除可能存在的舊計時器
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      // 設定延遲，等待是否有雙擊發生
      clickTimeoutRef.current = setTimeout(() => {
          if (!loading && !analyzing) fetchAssociations(node);
          clickTimeoutRef.current = null;
      }, 250); // 250ms 延遲
  };

  const handleNodeRightClick = (e, node) => { e.preventDefault(); e.stopPropagation(); setNodes(p => p.map(n => n.id === node.id ? {...n, selected: !n.selected} : n)); };
  
  // --- 快捷鍵 (整合) ---
  useEffect(() => {
    const hk = (e) => { if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return; if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected(); if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); } if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); handleRedo(); } };
    window.addEventListener('keydown', hk); return () => window.removeEventListener('keydown', hk);
  }, [deleteSelected, handleUndo, handleRedo]);

  const getNodeShapeStyle = (shape, isRoot) => {
      const base = "absolute flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-grab active:cursor-grabbing";
      let style = { width: '6rem', height: '6rem', borderRadius: '9999px' };
      if(shape==='rounded') style = isRoot ? { width: '12rem', height: '8rem', borderRadius: '1.5rem' } : { width: '9rem', height: '5rem', borderRadius: '1rem' };
      else if(shape==='pill') style = isRoot ? { width: '15rem', height: '7rem', borderRadius: '9999px' } : { width: '10rem', height: '4rem', borderRadius: '9999px' };
      else style = isRoot ? { width: '9rem', height: '9rem', borderRadius: '9999px' } : { width: '6rem', height: '6rem', borderRadius: '9999px' };
      return { className: base, style };
  };

  // Helper logic to show controls if history exists OR nodes exist
  const showControls = nodes.length > 0 || undoStack.length > 0 || redoStack.length > 0;

  return (
    <div className="w-full h-screen overflow-hidden relative selection:bg-yellow-200" 
         style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }} 
         onMouseDown={handleCanvasMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onWheel={handleWheel}>
         
      <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />

      {/* Grid Background Layer */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
               transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.scale})`,
               transformOrigin: '0 0',
               backgroundImage: `radial-gradient(${currentTheme.grid} 1px, transparent 1px)`,
               backgroundSize: '30px 30px',
               width: '100000px', height: '100000px', left: '-50000px', top: '-50000px',
               opacity: aiConfig.showGrid ? 1 : 0 // Visibility toggle
           }} 
      />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[90] px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md border flex items-center gap-3 animate-in fade-in duration-300 ${toast.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-700' : 'bg-green-50/90 border-green-200 text-green-700'}`}>
            {toast.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle size={20} />}
            <span className="font-medium text-sm">{toast.message}</span>
            <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100"><X size={16} /></button>
        </div>
      )}

      {/* Ollama Help Modal */}
      {showOllamaHelp && (
          <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowOllamaHelp(false)} onWheel={e=>e.stopPropagation()} onMouseDown={e=>e.stopPropagation()}>
              <div className="p-6 rounded-2xl shadow-2xl max-w-lg w-full animate-in fade-in zoom-in duration-200 space-y-4" style={{ backgroundColor: currentTheme.glass, backdropFilter: 'blur(10px)', border: `1px solid ${currentTheme.glassBorder}` }} onClick={e => e.stopPropagation()}>
                  <h3 className="text-xl font-bold flex items-center gap-2"><HelpCircle size={24} className="text-blue-500" /> Ollama 連線指南</h3>
                  <div className="space-y-3 text-sm opacity-90">
                      <div className="p-3 border rounded-lg" style={{ borderColor: currentTheme.glassBorder }}>
                          <strong className="block mb-1 text-red-500">錯誤 405 (Method Not Allowed) / Network Error</strong>
                          <p>瀏覽器安全性會阻擋網頁直接連線到您的 Localhost。您必須設定 CORS。</p>
                      </div>
                      <h4 className="font-bold border-b pb-1" style={{ borderColor: currentTheme.line }}>步驟 1: 設定 OLLAMA_ORIGINS (必要)</h4>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                          <li><strong>macOS</strong>: <code className="bg-gray-100 px-1 rounded text-black">OLLAMA_ORIGINS="*" ollama serve</code></li>
                          <li><strong>Windows</strong>: 設定使用者環境變數 <code>OLLAMA_ORIGINS</code> 為 <code>*</code>，然後重啟 Ollama。</li>
                      </ul>
                      <h4 className="font-bold border-b pb-1 mt-2" style={{ borderColor: currentTheme.line }}>步驟 2: 解決 HTTPS 阻擋</h4>
                      <ul className="list-disc list-inside space-y-1 pl-2">
                          <li><strong>推薦 (Ngrok)</strong>: 安裝 ngrok 並執行 <code className="bg-gray-100 px-1 rounded text-black">ngrok http 11434 --host-header="localhost:11434"</code></li>
                      </ul>
                  </div>
                  <div className="flex justify-end pt-2">
                      <button onClick={() => setShowOllamaHelp(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">我知道了</button>
                  </div>
              </div>
          </div>
      )}

      {/* Search Sources Modal */}
      {showSearchSources && searchSources.length > 0 && (
          <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSearchSources(false)} onWheel={e=>e.stopPropagation()} onMouseDown={e=>e.stopPropagation()}>
              <div className="p-6 rounded-2xl shadow-2xl max-w-lg w-full animate-in fade-in zoom-in duration-200 flex flex-col max-h-[80vh]" style={{ backgroundColor: currentTheme.bg, border: `1px solid ${currentTheme.glassBorder}`, color: currentTheme.text }} onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4 pb-2 border-b" style={{borderColor: currentTheme.line}}>
                      <h3 className="text-xl font-bold flex items-center gap-2"><Search size={20} className="text-blue-500" /> {t.searchSourcesTitle}</h3>
                      <button onClick={() => setShowSearchSources(false)} className="p-1 hover:bg-black/10 rounded-full transition-colors"><X size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                      {searchSources.map((source, index) => {
                          const title = source.web?.title || "Unknown Source";
                          const uri = source.web?.uri;
                          if (!uri) return null;
                          return (
                              <a key={index} href={uri} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl border hover:bg-blue-50 transition-all group" style={{borderColor: currentTheme.line}}>
                                  <div className="flex items-start gap-3">
                                      <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded"><ExternalLink size={14}/></div>
                                      <div>
                                          <div className="font-bold text-sm group-hover:text-blue-600 transition-colors">{title}</div>
                                          <div className="text-xs opacity-50 truncate max-w-[250px]">{uri}</div>
                                      </div>
                                  </div>
                              </a>
                          )
                      })}
                  </div>
                  <div className="pt-4 border-t mt-4 flex justify-end" style={{borderColor: currentTheme.line}}>
                      <button onClick={() => setShowSearchSources(false)} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm">Close</button>
                  </div>
              </div>
          </div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full z-[70] backdrop-blur-xl border-r shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full pointer-events-none'}`}
        style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder }}
        onMouseDown={e=>e.stopPropagation()}
      >
          <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: currentTheme.glassBorder }}>
              <div className="flex items-center gap-2 font-bold"><FolderOpen className="text-yellow-500"/>{t.libraryTitle}</div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-black/10 rounded-lg pointer-events-auto"><X size={18}/></button>
          </div>
          <div className="p-4"><button onClick={requestNewProject} className="w-full py-3 flex items-center justify-center gap-2 bg-black text-white rounded-xl hover:bg-yellow-500 hover:text-black transition-all shadow-md font-medium text-sm"><Plus size={18} /> {t.newProjectBtn}</button></div>
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
              <div className="text-xs font-bold opacity-50 uppercase tracking-wider mb-2 mt-2">{t.workspaceLabel}: {aiConfig.workspaceName}</div>
              {projectList.map(p => (
                  <div key={p.id} onClick={() => loadProject(p.id)} className={`group p-3 rounded-xl border transition-all cursor-pointer relative ${currentProjectId === p.id ? 'bg-yellow-50/50 border-yellow-400 shadow-sm' : 'hover:border-yellow-300 hover:shadow-md'}`} style={{ borderColor: currentProjectId === p.id ? '#fbbf24' : currentTheme.glassBorder }}>
                      <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0"><h4 className="font-bold truncate text-sm">{p.name}</h4><p className="text-xs opacity-60 mt-0.5 flex items-center gap-1"><Clock size={10} /> {new Date(p.updatedAt).toLocaleDateString()}</p></div>
                          <button onClick={(e) => requestDeleteProject(e, p.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all absolute right-2 top-2" title="Delete"><Trash2 size={14} /></button>
                      </div>
                  </div>
              ))}
          </div>
          <div className="p-4 border-t" style={{ borderColor: currentTheme.glassBorder }}>
               <button onClick={() => setShowSettings(true)} className="flex items-center justify-center gap-2 text-xs opacity-70 hover:opacity-100 w-full transition-opacity"><Settings size={14} /> {t.settingsTitle}</button>
          </div>
      </div>

      <button onClick={() => setIsSidebarOpen(true)} className={`fixed top-4 left-4 z-[70] p-3 backdrop-blur-md border rounded-xl shadow-lg hover:bg-yellow-50 transition-all ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder, color: currentTheme.text }}><SidebarIcon size={20} /></button>

      {/* Main Canvas */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full origin-top-left pointer-events-none" style={{ transform: `translate(${viewTransform.x}px, ${viewTransform.y}px) scale(${viewTransform.scale})` }}>
        <svg className="absolute top-[-50000px] left-[-50000px] w-[100000px] h-[100000px] pointer-events-none z-0">{edges.map(e=><line key={e.id} x1={nodes.find(n=>n.id===e.source)?.x+50000} y1={nodes.find(n=>n.id===e.source)?.y+50000} x2={nodes.find(n=>n.id===e.target)?.x+50000} y2={nodes.find(n=>n.id===e.target)?.y+50000} stroke={e.color||currentTheme.line} strokeWidth={e.animated?4:2} className={e.animated?"animate-pulse-flow":"transition-colors duration-500"} style={{opacity:0.6}}/>)}</svg>
        {nodes.map(node => {
            const rgb = hexToRgb(node.color || currentTheme.accent);
            
            // --- Unified Render Logic (Fix: Allow Root Node to swap languages) ---
            const isZh = lang === 'zh-TW';
            
            // Determine primary and secondary text based on current language
            // Fallback to node.text (User Input) if specific language field is missing
            const primaryContent = isZh ? (node.zh || node.text) : (node.en || node.text);
            const secondaryContent = isZh ? (node.en || node.text) : (node.zh || node.text);

            const mainText = primaryContent;
            // Only show subtitle if it differs from main title to avoid duplication
            const subText = secondaryContent !== mainText ? secondaryContent : "";

            const { className: shapeClass, style: shapeStyle } = getNodeShapeStyle(node.shape || aiConfig.defaultShape || 'circle', node.isRoot || node.selected);
            const isNodeLoading = loadingNodeId === node.id;

            return (
              <div key={node.id} 
                onMouseDown={(e)=>handleNodeMouseDown(e,node)} 
                onClick={(e)=>handleNodeClick(e,node)} 
                onDoubleClick={(e)=>handleNodeDoubleClick(e,node)} 
                onContextMenu={(e)=>handleNodeRightClick(e,node)}
                className={`node-element ${shapeClass} pointer-events-auto`} 
                style={{ 
                    left:node.x, 
                    top:node.y, 
                    transform:'translate(-50%,-50%)', 
                    borderWidth:'2px', 
                    backgroundColor: node.selected ? (node.color||currentTheme.accent) : currentTheme.nodeBg, 
                    borderColor: node.color || currentTheme.accent, 
                    boxShadow: isNodeLoading ? 'none' : (node.selected ? `0 0 30px rgba(${rgb},0.6)` : currentTheme.shadow),
                    color: node.selected ? '#fff' : currentTheme.text, 
                    backdropFilter:'blur(12px)', 
                    ...shapeStyle 
                }}
              >
                {/* NEW: Independent CSS-driven Halo Animation Layer (The Pulse) */}
                {isNodeLoading && (
                    <div className="absolute inset-0 rounded-[inherit] pointer-events-none -z-10 animate-ping-slow"
                         style={{
                             backgroundColor: `rgba(${rgb}, 0.2)`, 
                             border: `2px solid rgba(${rgb}, 0.8)`, 
                             boxShadow: `0 0 20px 5px rgba(${rgb}, 0.5)`
                         }}
                    />
                )}

                {node.rank && <div className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md z-20 border border-white">{node.rank}</div>}
                {editingNodeId===node.id ? 
                    <input ref={editInputRef} value={editValue} onChange={(e)=>setEditValue(e.target.value)} onBlur={finishEditing} onKeyDown={(e)=>e.key==='Enter'&&finishEditing()} className="w-full bg-transparent text-center font-bold outline-none border-b-2" style={{ borderColor: currentTheme.textSec, color: currentTheme.text }} onMouseDown={e=>e.stopPropagation()} /> : 
                    <div className="px-3 pointer-events-none max-w-full overflow-hidden">
                        <span className={`block font-bold leading-tight break-words ${node.isRoot||node.selected?'text-lg':'text-sm'}`}>{mainText}</span>
                        {subText && <span className="block mt-1 font-light opacity-60 italic truncate text-[10px]">{subText}</span>}
                    </div>
                }
              </div>
            );
        })}
      </div>

      <div className="fixed inset-0 pointer-events-none z-50">
         <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-[60]">
            <div className="flex gap-2 backdrop-blur-xl border p-2 rounded-2xl shadow-lg items-center pointer-events-auto" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder }} onMouseDown={e=>e.stopPropagation()}>
               {showControls && (
                   <>
                       <button onClick={saveCurrentProject} disabled={nodes.length===0} className={`p-2 rounded-lg font-bold transition-all disabled:opacity-30 ${isSaved ? 'text-green-600 bg-green-100' : 'hover:bg-yellow-100 text-yellow-700'}`}>{isSaved ? <Check size={18} /> : <Save size={18} />}</button>
                       <button onClick={requestNewProject} disabled={nodes.length===0} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors disabled:opacity-30"><Eraser size={18} /></button>
                       <div className="w-px h-6 bg-gray-300 mx-1"></div>
                       <button onClick={handleUndo} disabled={undoStack.length === 0} className="p-2 hover:bg-black/5 rounded-lg disabled:opacity-30"><RotateCcw size={18} /></button>
                       <button onClick={handleRedo} disabled={redoStack.length === 0} className="p-2 hover:bg-black/5 rounded-lg disabled:opacity-30"><RotateCw size={18} /></button>
                       <div className="w-px h-6 bg-gray-300 mx-1"></div>
                   </>
               )}
               {/* NEW: Search Sources Button */}
               {searchSources.length > 0 && (
                   <button onClick={() => setShowSearchSources(true)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors flex items-center gap-1" title={t.viewSources}>
                       <Link2 size={18} />
                       <span className="text-[10px] font-bold bg-blue-100 px-1 rounded">{searchSources.length}</span>
                   </button>
               )}
               <button onClick={toggleLanguage} className="p-2 hover:bg-black/5 rounded-lg flex items-center gap-1 font-bold"><Globe size={18} /><span className="text-xs">{lang === 'zh-TW' ? 'EN' : '中'}</span></button>
               <button onClick={handleExportJSON} className="p-2 hover:bg-black/5 rounded-lg"><Download size={18} /></button>
               <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-black/5 rounded-lg"><Upload size={18} /></button>
            </div>

            {contextDesc && showControls && (
                <div className="backdrop-blur-md border p-3 rounded-2xl max-w-xs text-xs shadow-sm text-right pointer-events-auto cursor-pointer hover:opacity-80 transition-opacity" 
                     style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder, color: currentTheme.textSec }}
                     onClick={() => setShowContextEditor(true)} 
                     onMouseDown={e=>e.stopPropagation()}
                >
                    <strong className="block mb-1 flex items-center justify-end gap-1" style={{ color: currentTheme.text }}>{t.currentContext} <Target size={10}/></strong>
                    <p className="line-clamp-2 opacity-80 mb-1">{contextDesc}</p>
                </div>
            )}
         </div>

         {/* Bottom Center Controls */}
         {showControls && (
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 flex flex-col gap-3 items-center pointer-events-none z-[50]">
               {/* Action Buttons */}
               {(nodes.filter(n=>n.selected).length===1 || nodes.filter(n=>n.selected).length===2) && (
                   <div className="flex items-center gap-2 backdrop-blur-xl border p-2 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-2 pointer-events-auto" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder }} onMouseDown={e=>e.stopPropagation()}>
                       {nodes.filter(n=>n.selected).length===1 && (
                           <>
                               <button onClick={handleAnalyzeNode} disabled={analyzing} className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-xl text-sm font-bold transition-colors">{analyzing?<Loader2 size={16} className="animate-spin"/>:<Sparkles size={16}/>} {t.deepAnalyze}</button>
                               <button onClick={handlePathSummary} disabled={analyzing} className="flex items-center gap-2 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl text-sm font-bold transition-colors">{analyzing?<Loader2 size={16} className="animate-spin"/>:<ScrollText size={16}/>} {t.pathSummary}</button>
                           </>
                       )}
                       {nodes.filter(n=>n.selected).length===2 && <button onClick={handleConnectNodes} disabled={analyzing} className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold transition-colors">{analyzing?<Loader2 size={16} className="animate-spin"/>:<Link2 size={16}/>} {t.exploreConnect}</button>}
                   </div>
               )}
               
               <div className="text-xs backdrop-blur px-3 py-1 rounded-full shadow-sm mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-auto" style={{ backgroundColor: currentTheme.glass, color: currentTheme.textSec }} onMouseDown={e=>e.stopPropagation()}>
                   {t.dragMove} | {t.clickExpand} | {t.doubleClickEdit} | {t.rightClickSelect}
               </div>
               
               <form onSubmit={handleInputSubmit} className="w-full relative group pointer-events-auto" onMouseDown={e=>e.stopPropagation()}>
                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-100 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <div className="relative flex items-center backdrop-blur-xl border rounded-full shadow-2xl p-2 pl-6 transition-all focus-within:ring-2 focus-within:ring-yellow-400/50" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.glassBorder }}>
                       <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder={t.inputPlaceholder} className="flex-1 bg-transparent outline-none font-medium text-lg" style={{ color: currentTheme.text }} />
                       <div className="flex items-center gap-2 pr-1">
                           {nodes.some(n=>n.selected)&&<button type="button" onClick={deleteSelected} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={20}/></button>}
                           <button type="submit" disabled={!inputValue.trim()} className="p-3 bg-black text-white rounded-full hover:bg-yellow-500 hover:text-black">{loading?<Loader2 size={20} className="animate-spin"/>:<Send size={20}/>}</button>
                       </div>
                   </div>
               </form>
           </div>
         )}
         
         <div className="absolute bottom-8 right-8 flex flex-col gap-2 pointer-events-auto z-[50]" onMouseDown={e=>e.stopPropagation()}>
            {nodes.length > 0 && <button onClick={handleAutoLayout} className="p-2 backdrop-blur rounded-lg shadow hover:bg-yellow-100 transition-colors" style={{ backgroundColor: currentTheme.glass, color: currentTheme.text }} title={t.autoLayout}><LayoutGrid size={20}/></button>}
            <button onClick={handleCenterView} className="p-2 backdrop-blur rounded-lg shadow hover:bg-yellow-100 transition-colors" style={{ backgroundColor: currentTheme.glass, color: currentTheme.text }} title={t.centerView}><Maximize size={20}/></button>
            <button onClick={()=>handleZoom(0.1)} className="p-2 backdrop-blur rounded-lg shadow hover:bg-yellow-100 transition-colors" style={{ backgroundColor: currentTheme.glass, color: currentTheme.text }}><ZoomIn size={20}/></button>
            <button onClick={()=>handleZoom(-0.1)} className="p-2 backdrop-blur rounded-lg shadow hover:bg-yellow-100 transition-colors" style={{ backgroundColor: currentTheme.glass, color: currentTheme.text }}><ZoomOut size={20}/></button>
            <button onClick={handleResetZoom} className="p-2 backdrop-blur rounded-lg shadow hover:bg-yellow-100 text-xs font-bold transition-colors" style={{ backgroundColor: currentTheme.glass, color: currentTheme.text }} title={t.resetZoom}>1:1</button>
         </div>
      </div>

      {showClearConfirm && <div className="fixed inset-0 z-[80] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}><div className="p-6 rounded-2xl shadow-xl max-w-sm" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.glassBorder}` }} onClick={e=>e.stopPropagation()}><h3 className="font-bold text-red-600 flex gap-2 mb-2"><AlertTriangle/>{t.confirmClearTitle}</h3><p className="text-sm opacity-80 mb-4">{t.confirmClearText}</p><div className="flex justify-end gap-2"><button onClick={()=>setShowClearConfirm(false)} className="px-4 py-2 rounded-lg opacity-70 hover:opacity-100" style={{ backgroundColor: currentTheme.line }}>{t.cancel}</button><button onClick={executeNewProject} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">{t.confirm}</button></div></div></div>}
      
      {/* 新增：專案刪除確認 Modal */}
      {showDeleteProjectConfirm && (
        <div className="fixed inset-0 z-[80] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}>
            <div className="p-6 rounded-2xl shadow-xl max-w-sm" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.glassBorder}` }} onClick={e=>e.stopPropagation()}>
                <h3 className="font-bold text-red-600 flex gap-2 mb-2"><AlertTriangle/>{t.deleteConfirm}</h3>
                <p className="text-sm opacity-80 mb-4">{t.confirmClearText}</p>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowDeleteProjectConfirm(false)} className="px-4 py-2 rounded-lg opacity-70 hover:opacity-100" style={{ backgroundColor: currentTheme.line }}>{t.cancel}</button>
                    <button onClick={executeDeleteProject} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">{t.confirm}</button>
                </div>
            </div>
        </div>
      )}

      {showContextEditor && <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowContextEditor(false)} onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}><div className="p-6 rounded-2xl shadow-xl max-w-md w-full" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.glassBorder}` }} onClick={e=>e.stopPropagation()}><h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Target size={20} className="text-blue-500"/>{t.editContextTitle}</h3><div className="space-y-4"><div><label className="block text-sm font-semibold mb-1">{t.contextLabel}</label><textarea className="w-full p-3 border rounded-xl h-24 text-sm" value={contextDesc} onChange={e=>setContextDesc(e.target.value)} placeholder={t.contextPlaceholder} style={{ backgroundColor: currentTheme.glass, color: currentTheme.text, borderColor: currentTheme.line }}/></div><div><label className="block text-sm font-semibold mb-1 flex justify-between">{t.strategyLabel}<button onClick={handleRegenerateStrategy} disabled={isRegeneratingStrategy||!contextDesc.trim()} className="text-xs text-blue-600 flex items-center gap-1">{isRegeneratingStrategy?<Loader2 size={12} className="animate-spin"/>:<Sparkles size={12}/>}{isRegeneratingStrategy?t.strategyUpdating:t.regenerateStrategy}</button></label><textarea className="w-full p-3 border rounded-xl h-24 text-sm bg-yellow-50" value={strategyContext} onChange={e=>setStrategyContext(e.target.value)} placeholder="AI Strategy..." style={{ backgroundColor: currentTheme.id === 'tech' ? '#1e293b' : '#fefce8', color: currentTheme.text, borderColor: currentTheme.line }}/></div></div><div className="flex justify-end gap-2 mt-6"><button onClick={()=>setShowContextEditor(false)} className="px-4 py-2 rounded-lg opacity-70 hover:opacity-100" style={{ backgroundColor: currentTheme.line }}>{t.cancel}</button><button onClick={()=>{setShowContextEditor(false);saveCurrentProject()}} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">{t.updateBtn}</button></div></div></div>}
      
      {nodes.length===0 && <div className="fixed inset-0 z-[55] flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm" onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}><div className="border shadow-2xl rounded-3xl p-8 max-w-lg w-full" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, borderColor: currentTheme.glassBorder }} onClick={e=>e.stopPropagation()}><h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Lightbulb className="text-yellow-500 fill-yellow-500"/>{t.title}</h2><p className="text-sm opacity-60 mb-6">{t.subtitle}</p><form onSubmit={handleInitialSetup} className="space-y-4"><div><label className="block text-sm font-bold mb-1">{t.keywordLabel}</label><input className="w-full p-4 border rounded-xl text-lg font-bold outline-none" value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder={t.keywordPlaceholder} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }} /></div><div><label className="block text-sm font-bold mb-1">{t.contextLabel}</label><textarea className="w-full p-4 border rounded-xl h-24 resize-none text-sm outline-none" value={contextDesc} onChange={e=>setContextDesc(e.target.value)} placeholder={t.contextPlaceholder} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }} /></div><div className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: currentTheme.line }}>{aiConfig.provider==='gemini'?(<><button type="button" onClick={()=>setAiConfig(p=>({...p,enableWebSearch:!p.enableWebSearch}))} className={`w-10 h-6 rounded-full relative transition ${aiConfig.enableWebSearch?'bg-blue-500':'bg-gray-300'}`}><div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${aiConfig.enableWebSearch?'translate-x-4':''}`}/></button><div className="flex-1"><label className="block text-sm font-bold flex gap-1"><Search size={14}/>{t.searchLabel}</label><p className="text-[10px] opacity-60">{t.searchNote}</p></div></>):(<div className="flex gap-2 opacity-50"><Lock size={16}/><span className="text-sm">{t.searchNoteDisabled}</span></div>)}</div><button type="submit" disabled={!inputValue.trim()||isInitializing} className="w-full py-4 bg-black text-white rounded-xl font-bold flex justify-center gap-2 hover:bg-gray-800 transition-colors">{isInitializing?<Loader2 className="animate-spin"/>:null}{isInitializing?(aiConfig.enableWebSearch?t.analyzingStrategyWithSearch:t.analyzingStrategy):t.startBtn}</button><div className="flex justify-center gap-4 text-xs mt-4 opacity-60"><button type="button" onClick={()=>fileInputRef.current?.click()} className="flex gap-1 hover:text-black"><Upload size={12}/>{t.importBtn}</button><button type="button" onClick={()=>setIsSidebarOpen(true)} className="flex gap-1 hover:text-black"><FolderOpen size={12}/>{t.historyBtn}</button></div></form></div></div>}

      {showSettings && <div className="fixed inset-0 z-[80] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}><div className="p-6 rounded-3xl shadow-2xl w-full max-w-md" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.glassBorder}` }} onClick={e=>e.stopPropagation()}><div className="flex justify-between items-center mb-6"><h2 className="font-bold text-xl">{t.settingsTitle}</h2><button onClick={()=>setShowSettings(false)}><X/></button></div><div className="space-y-4"><div><label className="text-sm font-bold block mb-1">{t.workspaceLabel}</label><input value={aiConfig.workspaceName} onChange={e=>saveAiConfig({...aiConfig,workspaceName:e.target.value})} className="w-full p-2 border rounded-xl" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }} /></div><div><label className="text-sm font-bold block mb-1">{t.shapeLabel}</label><div className="grid grid-cols-3 gap-2">{Object.entries(NODE_SHAPES).map(([k,s])=><button key={k} onClick={()=>saveAiConfig({...aiConfig,defaultShape:k})} className={`p-2 border rounded-xl flex flex-col items-center transition-all ${aiConfig.defaultShape===k?'border-blue-500 bg-blue-50/10':''}`} style={{ borderColor: aiConfig.defaultShape===k ? '#3b82f6' : currentTheme.line }}><s.icon size={20}/><span className="text-[10px]">{s.name.split(' ')[0]}</span></button>)}</div></div><div><label className="text-sm font-bold block mb-1">{t.themeLabel}</label><div className="grid grid-cols-3 gap-2">{Object.values(THEMES).map(th=><button key={th.id} onClick={()=>saveAiConfig({...aiConfig,theme:th.id})} className={`p-2 border rounded-xl text-xs font-bold transition-all ${aiConfig.theme===th.id?'ring-2 ring-blue-500':''}`} style={{ backgroundColor: th.bg, color: th.text, borderColor: th.glassBorder }}>{t[`theme${th.name.split(' ')[0]}`]||th.name}</button>)}</div></div>
      
      {/* Global Branch Count */}
      <div>
          <div className="flex justify-between text-sm font-bold mb-1">
              <label>{t.branchCountLabel}</label>
              <span>{aiConfig.branchCount || 8}</span>
          </div>
          <input 
              type="range" 
              min="4" 
              max="12" 
              value={aiConfig.branchCount || 8} 
              onChange={(e) => saveAiConfig({ ...aiConfig, branchCount: parseInt(e.target.value) })} 
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
          />
      </div>
      
      {/* NEW: Global Grid Toggle */}
      <div className="flex items-center justify-between">
          <label className="text-sm font-bold">{t.gridLabel}</label>
          <button 
              onClick={() => saveAiConfig({ ...aiConfig, showGrid: !aiConfig.showGrid })}
              className={`w-12 h-7 rounded-full transition-colors relative ${aiConfig.showGrid ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${aiConfig.showGrid ? 'translate-x-5' : ''}`}></div>
          </button>
      </div>

      <hr style={{ borderColor: currentTheme.line }} /><div><label className="text-sm font-bold block mb-2">{t.providerLabel}</label><div className="flex p-1 rounded-xl" style={{ backgroundColor: currentTheme.line }}><button onClick={()=>saveAiConfig({...aiConfig,provider:'gemini'})} className={`flex-1 py-1 rounded-lg text-xs ${aiConfig.provider==='gemini'?'shadow':''}`} style={{ backgroundColor: aiConfig.provider==='gemini' ? currentTheme.bg : 'transparent' }}>Gemini</button><button onClick={()=>saveAiConfig({...aiConfig,provider:'openai'})} className={`flex-1 py-1 rounded-lg text-xs ${aiConfig.provider==='openai'?'shadow':''}`} style={{ backgroundColor: aiConfig.provider==='openai' ? currentTheme.bg : 'transparent' }}>OpenAI</button><button onClick={()=>saveAiConfig({...aiConfig,provider:'local'})} className={`flex-1 py-1 rounded-lg text-xs ${aiConfig.provider==='local'?'shadow':''}`} style={{ backgroundColor: aiConfig.provider==='local' ? currentTheme.bg : 'transparent' }}>Local</button></div></div>{aiConfig.provider==='gemini'&&<div className="space-y-2"><input type={apiKeyFocused?"text":"password"} onFocus={()=>setApiKeyFocused(true)} onBlur={()=>setApiKeyFocused(false)} value={!apiKeyFocused&&aiConfig.apiKey?"***":aiConfig.apiKey} onChange={e=>saveAiConfig({...aiConfig,apiKey:e.target.value})} placeholder="Gemini Key" className="w-full p-2 border rounded-xl" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}/><div className="flex justify-between items-center"><label className="text-xs font-bold">{t.modelLabel}</label><button onClick={fetchGeminiModels} className="text-[10px] text-blue-500 flex gap-1 items-center">{fetchingModels?<Loader2 className="animate-spin" size={10}/>:<RefreshCw size={10}/>}{t.refreshModels}</button></div><select className="w-full p-2 border rounded-xl" value={aiConfig.geminiModel} onChange={e=>saveAiConfig({...aiConfig,geminiModel:e.target.value})} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}>{geminiModelsList.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select><div className={`p-3 rounded-xl border space-y-3`} style={{ borderColor: currentTheme.line }}><div className="flex items-center justify-between"><div><label className="block text-sm font-semibold flex items-center gap-1"><Search size={14}/> {t.searchLabel}</label><p className="text-[10px] opacity-60">{t.searchNote}</p></div><button onClick={() => saveAiConfig({ ...aiConfig, enableWebSearch: !aiConfig.enableWebSearch })} className={`w-12 h-7 rounded-full transition-colors relative ${aiConfig.enableWebSearch?'bg-blue-600':'bg-gray-300'}`}><div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${aiConfig.enableWebSearch?'translate-x-5':''}`}></div></button></div>{aiConfig.enableWebSearch && (<div><div className="flex justify-between text-xs mb-1"><span>{t.searchCountLabel}</span><span>{aiConfig.searchCount}</span></div><input type="range" min="1" max="30" value={aiConfig.searchCount} onChange={(e) => saveAiConfig({ ...aiConfig, searchCount: parseInt(e.target.value) })} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" /></div>)}</div></div>}
      {aiConfig.provider==='openai'&&<div className="space-y-2"><input type={apiKeyFocused?"text":"password"} onFocus={()=>setApiKeyFocused(true)} onBlur={()=>setApiKeyFocused(false)} value={!apiKeyFocused&&aiConfig.openaiApiKey?"***":aiConfig.openaiApiKey} onChange={e=>saveAiConfig({...aiConfig,openaiApiKey:e.target.value})} placeholder="OpenAI Key" className="w-full p-2 border rounded-xl" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}/><div className="flex justify-between items-center"><label className="text-xs font-bold">{t.modelLabel}</label><button onClick={fetchOpenAIModels} className="text-[10px] text-blue-500 flex gap-1 items-center">{fetchingModels?<Loader2 className="animate-spin" size={10}/>:<RefreshCw size={10}/>}{t.refreshModels}</button></div><select className="w-full p-2 border rounded-xl" value={aiConfig.openaiModel} onChange={e=>saveAiConfig({...aiConfig,openaiModel:e.target.value})} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}>{openAIModelsList.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></div>}
      {aiConfig.provider==='local'&&<div className="space-y-2"><input value={aiConfig.localEndpoint} onChange={e=>saveAiConfig({...aiConfig,localEndpoint:e.target.value})} className="w-full p-2 border rounded-xl" style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}/><div className="flex justify-between items-center"><button onClick={()=>setShowOllamaHelp(true)} className="text-[10px] text-blue-500 flex gap-1"><HelpCircle size={10}/> {t.helpBtn}</button><button onClick={()=>fetchOllamaModels(aiConfig.localEndpoint)} className="text-[10px] text-blue-500 flex gap-1">{fetchingModels?<Loader2 className="animate-spin" size={10}/>:<RefreshCw size={10}/>} {t.refreshBtn}</button></div>{localModelsList.length>0?<select className="w-full p-2 border rounded-xl" value={aiConfig.localModel} onChange={e=>saveAiConfig({...aiConfig,localModel:e.target.value})} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}>{localModelsList.map(m=><option key={m.name} value={m.name}>{m.name}</option>)}</select>:<input className="w-full p-2 border rounded-xl" value={aiConfig.localModel} onChange={e=>saveAiConfig({...aiConfig,localModel:e.target.value})} placeholder={t.modelNamePlaceholder} style={{ backgroundColor: currentTheme.glass, borderColor: currentTheme.line }}/>}</div>}</div><div className="mt-6 flex justify-end"><button onClick={()=>setShowSettings(false)} className="px-6 py-2 bg-black text-white rounded-full">{t.saveBtn}</button></div></div></div>}
      
      {analysisResult && <div className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-md flex items-center justify-center p-4" onClick={()=>!analyzing&&setAnalysisResult(null)} onMouseDown={e=>e.stopPropagation()} onWheel={e=>e.stopPropagation()}><div className="p-6 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, border: `1px solid ${currentTheme.glassBorder}` }} onClick={e=>e.stopPropagation()}><div className="flex justify-between items-center mb-4 pb-2 border-b" style={{ borderColor: currentTheme.line }}><h3 className="font-bold text-lg">{analysisResult.title}</h3>{!analyzing&&<button onClick={()=>setAnalysisResult(null)}><X/></button>}</div><div className="flex-1 overflow-y-auto whitespace-pre-line text-sm leading-relaxed">{analyzing?<div className="flex flex-col items-center justify-center py-10 gap-4 opacity-50"><Loader2 className="animate-spin w-8 h-8 text-yellow-500"/><p className="text-sm font-medium animate-pulse">{t.analyzeThinking}</p></div>:analysisResult.content}</div></div></div>}

      <style>{`
        @keyframes halo-pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow { animation: halo-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
}