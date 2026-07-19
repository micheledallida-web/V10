import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  Github,
  Settings,
  Clock,
  FileCode2,
  FolderOpen,
  Sparkles,
  ExternalLink,
  Activity,
  Cpu,
  HardDrive,
  Check,
  X,
  CornerDownRight
} from 'lucide-react';

export default function App() {
  // States for deployment resolution tool
  const [packageJson, setPackageJson] = useState(
`{
  "name": "quickstart-ai",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`
  );

  const [rootDir, setRootDir] = useState('/');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState([
    { type: 'info', text: 'Initializing Vercel deployment simulation for QuickStart.Ai...' },
    { type: 'info', text: 'Clone repository: micheledallida-web/V10 (branch: main)' },
    { type: 'info', text: 'Analyzing project structure...' },
    { type: 'error', text: 'Vercel build failure: No Next.js version detected. Next.js is missing from package.json dependencies/devDependencies, or the Root Directory configuration is incorrect.' },
    { type: 'system', text: '💡 Action needed: Update package.json to include "next" in dependencies, or check root directory configuration.' }
  ]);
  const [buildStatus, setBuildStatus] = useState('failed'); // failed, compiling, success
  const [logTriggerCount, setLogTriggerCount] = useState(0);
  const [showConfigHelper, setShowConfigHelper] = useState(true);

  // Active active deployment plan updated list from user target
  const [projectEvents, setProjectEvents] = useState([
    {
      id: 1,
      timestamp: "2026-07-19T04:26:34Z",
      type: "vercel_deployment_troubleshooting",
      project: "QuickStart.Ai",
      repo: "micheledallida-web/V10",
      branch: "main",
      status: "active_development",
      issue: "Vercel build failure: No Next.js version detected. Next.js is missing from package.json dependencies/devDependencies, or the Root Directory configuration is incorrect.",
      resolution: "Investigating package.json dependencies and verifying Vercel project Root Directory settings to ensure correct path tracking."
    },
    {
      id: 2,
      timestamp: "2026-07-18T15:30:00Z",
      type: "repository_migration",
      project: "QuickStart.Ai",
      repo: "micheledallida-web/V10",
      branch: "main",
      status: "setup",
      issue: "Migrating legacy V9 pipeline config files to high performance V10 structure",
      resolution: "Re-aligned serverless edge routes to matching Vercel runtime config schemas"
    }
  ]);

  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [buildLogs]);

  // Quick fix presets
  const applyPresetFix = () => {
    const corrected = `{
  "name": "quickstart-ai",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`;
    setPackageJson(corrected);
    setBuildLogs(prev => [
      ...prev,
      { type: 'success', text: '🔧 Automatically added "next": "^14.2.3" to package.json dependencies!' }
    ]);
  };

  // Run simulation build pipeline
  const triggerBuild = () => {
    setIsBuilding(true);
    setBuildStatus('compiling');
    setBuildLogs([
      { type: 'info', text: '🔄 Restarting deployment build trigger for QuickStart.Ai...' },
      { type: 'info', text: 'Fetching repository head commit on micheledallida-web/V10:main' },
      { type: 'info', text: `Root Directory targets: "${rootDir}"` },
      { type: 'info', text: 'Running validation parser on package.json content...' }
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        // Inspect package.json
        try {
          const parsed = JSON.parse(packageJson);
          const hasNext = (parsed.dependencies && parsed.dependencies.next) || 
                          (parsed.devDependencies && parsed.devDependencies.next);
          
          if (hasNext) {
            setBuildLogs(prev => [
              ...prev,
              { type: 'success', text: `✔ Next.js dependency found: "${parsed.dependencies?.next || parsed.devDependencies?.next}"` },
              { type: 'info', text: 'Executing build runner: "npm run build"' },
              { type: 'info', text: 'Creating an optimized production build...' }
            ]);
          } else {
            setBuildLogs(prev => [
              ...prev,
              { type: 'error', text: '❌ Vercel build failure: No Next.js version detected. Next.js is missing from package.json dependencies/devDependencies.' },
              { type: 'system', text: '💡 Action: Please add "next" dependency into package.json before triggering re-deployment.' }
            ]);
            setBuildStatus('failed');
            setIsBuilding(false);
            clearInterval(interval);
          }
        } catch (e) {
          setBuildLogs(prev => [
            ...prev,
            { type: 'error', text: '❌ Invalid JSON inside package.json file configuration.' },
            { type: 'error', text: e.message }
          ]);
          setBuildStatus('failed');
          setIsBuilding(false);
          clearInterval(interval);
        }
      } else if (step === 2) {
        // If we reach step 2, check if root directory is valid
        if (rootDir !== '/') {
          setBuildLogs(prev => [
            ...prev,
            { type: 'warning', text: `⚠ Warning: Next.js configured project root is set to '${rootDir}', verify directory existence.` },
            { type: 'error', text: `❌ Vercel build failure: Root Directory path tracking mismatch for '${rootDir}'. Next.js is not initialized inside this folder.` }
          ]);
          setBuildStatus('failed');
          setIsBuilding(false);
          clearInterval(interval);
        } else {
          setBuildLogs(prev => [
            ...prev,
            { type: 'info', text: '✓ Compile successful' },
            { type: 'info', text: '✓ Route Manifest generation complete' },
            { type: 'info', text: '✓ Edge Handlers loaded successfully' }
          ]);
        }
      } else if (step === 3) {
        // Success
        setBuildLogs(prev => [
          ...prev,
          { type: 'success', text: '🎉 Vercel Deployment successful! Live link generated.' },
          { type: 'success', text: '🚀 Project Live: https://quickstart-ai-v10.vercel.app' }
        ]);
        setBuildStatus('success');
        setIsBuilding(false);
        clearInterval(interval);

        // Append a success history trace dynamically
        setProjectEvents(prev => [
          {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            type: "vercel_deployment_success",
            project: "QuickStart.Ai",
            repo: "micheledallida-web/V10",
            branch: "main",
            status: "deployed_live",
            issue: "None - Clean build execution",
            resolution: "Fixed package.json dependencies and aligned path tracking."
          },
          ...prev
        ]);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] pb-16">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800 bg-[#0c0c0e] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight">QuickStart.Ai</h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  V10
                </span>
              </div>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <Github className="w-3.5 h-3.5" />
                micheledallida-web/V10
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                <GitBranch className="w-3.5 h-3.5" />
                main
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  buildStatus === 'success' ? 'bg-emerald-400' : buildStatus === 'failed' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  buildStatus === 'success' ? 'bg-emerald-500' : buildStatus === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></span>
              </span>
              <span className="text-zinc-300 font-mono">
                Status: {buildStatus.toUpperCase()}
              </span>
            </div>

            <button
              onClick={triggerBuild}
              disabled={isBuilding}
              className={`ml-auto md:ml-0 flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-md ${
                isBuilding 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10 hover:shadow-indigo-600/20'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isBuilding ? 'animate-spin' : ''}`} />
              {isBuilding ? 'Simulating Deployment...' : 'Re-Deploy project'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Build Error Details & Resolution Playground */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Error Information Banner */}
          <div className="border border-red-500/30 bg-red-950/20 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <AlertTriangle className="w-48 h-48 text-red-500" />
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-red-950/50 border border-red-500/30 rounded-lg text-red-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/20">
                    Deployment Incident
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">2026-07-19T04:26:34Z</span>
                </div>
                <h3 className="text-lg font-bold text-red-200 mt-2">
                  Vercel Build Failure: Next.js Missing
                </h3>
                <p className="text-sm text-zinc-300 mt-2 leading-relaxed font-mono bg-zinc-950/80 p-3 rounded-lg border border-zinc-800 text-zinc-300">
                  "Vercel build failure: No Next.js version detected. Next.js is missing from package.json dependencies/devDependencies, or the Root Directory configuration is incorrect."
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    Repo: micheledallida-web/V10
                  </span>
                  <span className="text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    Target Directory: Root (/) 
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Playground Workspace */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
            <div className="border-b border-zinc-800 bg-[#0f0f11] px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-sm">Interactive Resolution Environment</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={applyPresetFix}
                  className="text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Quick Fix package.json
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                    <span>📦 package.json Workspace</span>
                  </label>
                  <span className="text-[11px] text-zinc-500">Edit dynamically to simulate resolution</span>
                </div>
                <textarea
                  value={packageJson}
                  onChange={(e) => setPackageJson(e.target.value)}
                  rows={13}
                  className="w-full bg-[#070708] text-emerald-400 font-mono text-xs p-4 rounded-lg border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed resize-none"
                  placeholder="{
  'dependencies': {}
}"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                    🗂 Vercel Root Directory Config
                  </label>
                  <select
                    value={rootDir}
                    onChange={(e) => setRootDir(e.target.value)}
                    className="w-full bg-[#070708] border border-zinc-800 text-zinc-300 text-xs rounded-lg p-2.5 outline-none focus:border-indigo-500"
                  >
                    <option value="/">/ (Root Directory - Recommended)</option>
                    <option value="/subfolder">/subfolder (Path Mismatch Error)</option>
                    <option value="/apps/web">/apps/web (Path Mismatch Error)</option>
                  </select>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Misconfigured project directories trigger resolution blockage.
                  </p>
                </div>
                
                <div className="flex flex-col justify-end">
                  <button
                    onClick={triggerBuild}
                    disabled={isBuilding}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Test Configuration & Build
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Terminal Log Viewer */}
          <div className="bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden flex flex-col">
            <div className="border-b border-zinc-850 bg-zinc-900/40 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-mono font-semibold text-zinc-300">Vercel Deployment Logs</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            </div>
            
            <div className="p-4 font-mono text-[11px] space-y-2 h-[220px] overflow-y-auto bg-zinc-950">
              {buildLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-zinc-600 shrink-0 select-none">[{new Date().toLocaleTimeString()}]</span>
                  <span className={`
                    ${log.type === 'error' ? 'text-rose-400' : ''}
                    ${log.type === 'success' ? 'text-emerald-400' : ''}
                    ${log.type === 'warning' ? 'text-amber-400' : ''}
                    ${log.type === 'info' ? 'text-zinc-300' : ''}
                    ${log.type === 'system' ? 'text-indigo-400 font-bold bg-indigo-950/40 px-2 py-0.5 rounded' : ''}
                  `}>
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>

        </div>

        {/* Right Hand Sidebar: Activity log, target configuration & metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Active Target Specifications Code Info */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-zinc-400" />
              <h3 className="font-bold text-sm text-zinc-200">Target Specifications Tracker</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-850 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-500">Active Target</div>
                  <div className="text-sm font-semibold text-zinc-200 font-mono">user_profile</div>
                </div>
                <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-1 rounded">
                  Synced
                </span>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-zinc-400">Profile Data Mapped</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 bg-zinc-950/60 rounded border border-zinc-850">
                    <span className="text-zinc-500">Project Key</span>
                    <span className="font-mono text-zinc-300">QuickStart.Ai</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-zinc-950/60 rounded border border-zinc-850">
                    <span className="text-zinc-500">Repository Target</span>
                    <span className="font-mono text-zinc-300">micheledallida-web/V10</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-zinc-950/60 rounded border border-zinc-850">
                    <span className="text-zinc-500">Active Branch</span>
                    <span className="font-mono text-zinc-300">main</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-zinc-950/60 rounded border border-zinc-850">
                    <span className="text-zinc-500">Status Path</span>
                    <span className="font-mono text-amber-400">active_development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Timeline Dated Events */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold text-sm text-zinc-200">Dated Events &amp; Plans</h3>
              </div>
              <span className="text-xs text-indigo-400 font-semibold bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900">
                {projectEvents.length} Recorded
              </span>
            </div>

            <div className="space-y-5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
              {projectEvents.map((event, idx) => (
                <div key={event.id} className="relative pl-8 group">
                  {/* Bullet */}
                  <span className={`absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 ${ 
                    event.type === 'vercel_deployment_success' 
                      ? 'bg-emerald-500 border-emerald-900' 
                      : 'bg-amber-500 border-amber-900'
                  }`} />
                  
                  <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-850 hover:border-zinc-700 transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-semibold text-zinc-500 font-mono">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${ 
                        event.type === 'vercel_deployment_success' 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                          : 'bg-rose-950/80 text-rose-400 border border-rose-900/40'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-xs text-zinc-200 mt-2 flex items-center gap-1.5">
                      {event.project}
                      <span className="text-zinc-500">|</span>
                      <span className="text-[11px] text-zinc-400 font-mono">{event.repo}</span>
                    </h4>

                    <div className="mt-3 pt-3 border-t border-zinc-900 space-y-2 text-xs">
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-rose-400 tracking-wider block">Issue Detected</span>
                        <p className="text-zinc-400 mt-0.5 font-mono text-[11px] leading-relaxed">
                          {event.issue}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase text-emerald-400 tracking-wider block">Resolution Action</span>
                        <p className="text-zinc-300 mt-0.5 leading-relaxed">
                          {event.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DevOps Diagnostic metrics */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-zinc-200 mb-4">Vercel Integration Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-850">
                <span className="text-xs text-zinc-500">Estimated Resolution</span>
                <div className="text-xl font-bold mt-1 text-emerald-400">Instant</div>
                <span className="text-[10px] text-zinc-600">With dynamic fix presets</span>
              </div>
              <div className="p-3.5 bg-zinc-950 rounded-lg border border-zinc-850">
                <span className="text-xs text-zinc-500">Deployment Status</span>
                <div className={`text-xl font-bold mt-1 ${buildStatus === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {buildStatus === 'success' ? 'ACTIVE' : 'BLOCKED'}
                </div>
                <span className="text-[10px] text-zinc-600">NextJS auto-detection state</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}