// src/app/page.tsx
"use client";

import { useState } from "react";
import { 
  Send, Menu, Search, Briefcase, 
  LayoutGrid, MessageSquare, Bell, Zap 
} from "lucide-react";
import FlightCard from "./components/FlightCard";

export default function AgentCopilot() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat"); // State to track active sidebar item
  const [messages, setMessages] = useState<any[]>([
    { 
        role: "agent", 
        type: "text", 
        content: "👋 Welcome back, Agent! I have the context for **Rahul Sharma's** upcoming trip to Mumbai. Shall we look for flights?" 
    }
  ]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- Mock Send Logic ---
  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", type: "text", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      if (input.toLowerCase().includes("flight")) {
        const botResponse = {
            role: "agent",
            type: "flight_result",
            content: {
                airline: "Indigo 6E-204",
                price: "₹4,500",
                origin: "DEL",
                destination: "BOM",
                departureTime: "10:00",
                arrivalTime: "12:15",
                duration: "2h 15m",
                stops: "Non-stop"
            }
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        setMessages((prev) => [...prev, { 
            role: "agent", 
            type: "text", 
            content: "Searching the TBO inventory for the best B2B rates..." 
        }]);
      }
    }, 800);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      {/* Fix 1: overflow-hidden ensures content doesn't bleed out when closed */}
      <aside className={`${isSidebarOpen ? "w-[280px]" : "w-0"} transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex flex-col relative z-20 overflow-hidden`}>
        
        {/* Fix 2: Inner width wrapper prevents content from "squashing" during animation */}
        <div className="w-[280px] h-full flex flex-col"> 
            <div className="p-5">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">TBO Copilot</span>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3 pl-2">Active Session</p>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">RS</div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Rahul Sharma</p>
                                <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-center">
                                <p className="text-[10px] text-slate-400">Budget</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">₹50k</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded text-center">
                                <p className="text-[10px] text-slate-400">Pax</p>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">2 Adults</p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="space-y-1">
                    <NavItem 
                        icon={<MessageSquare className="w-4 h-4"/>} 
                        label="Chat Assistant" 
                        active={activeTab === "chat"} 
                        onClick={() => setActiveTab("chat")}
                    />
                    <NavItem 
                        icon={<LayoutGrid className="w-4 h-4"/>} 
                        label="Itinerary Board" 
                        active={activeTab === "itinerary"}
                        onClick={() => setActiveTab("itinerary")}
                    />
                    <NavItem 
                        icon={<Briefcase className="w-4 h-4"/>} 
                        label="Bookings" 
                        active={activeTab === "bookings"}
                        onClick={() => setActiveTab("bookings")}
                    />
                </nav>
            </div>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col relative bg-white dark:bg-slate-950 min-w-0">
        
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        {/* Header */}
        <header className="h-16 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors z-50 cursor-pointer"
            >
               <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate">New Itinerary Search</h2>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-900">
                <Zap className="w-3 h-3 fill-current" /> High Speed
             </div>
             <button className="p-2 hover:bg-slate-100 rounded-full">
                 <Bell className="w-5 h-5 text-slate-400" />
             </button>
          </div>
        </header>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth relative z-10">
            <div className="max-w-3xl mx-auto space-y-8 pb-32"> {/* Added padding bottom so input doesn't hide content */}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        
                        {msg.role === "agent" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/30">
                                <Zap className="w-4 h-4 fill-white" />
                            </div>
                        )}

                        <div className={`max-w-[85%] ${msg.role === "user" ? "ml-12" : "mr-12"}`}>
                            {msg.type === "text" ? (
                                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                    msg.role === "user" 
                                    ? "bg-slate-900 text-white rounded-tr-none" 
                                    : "bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-tl-none"
                                }`}>
                                    {msg.content}
                                </div>
                            ) : (
                                <FlightCard data={msg.content} />
                            )}
                            
                            <p className={`text-[10px] text-slate-400 mt-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Floating Input Area */}
        <div className="absolute bottom-6 left-0 right-0 px-6 z-20 pointer-events-none">
            <div className="max-w-3xl mx-auto pointer-events-auto">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden border border-slate-100 dark:border-slate-800">
                        <div className="pl-4">
                            <Search className="w-5 h-5 text-slate-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Ask Copilot (e.g., 'Find flights to Mumbai under 5k')..." 
                            className="w-full bg-transparent border-0 px-4 py-4 focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button 
                            onClick={handleSend}
                            className="mr-2 p-2 bg-slate-900 dark:bg-slate-700 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

// Updated Helper for Sidebar Items
function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            active 
            ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm border border-slate-200 dark:border-slate-700" 
            : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900"
        }`}>
            {icon}
            {label}
        </button>
    )
}