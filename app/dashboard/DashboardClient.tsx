"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  History,
  FileText,
  Download,
  Eye,
  ChevronRight,
  Calendar,
  Globe,
  BookOpen,
  UserPenIcon,
  MailIcon
} from "lucide-react";
import Link from "next/link";
import { Dock } from "@/components/magicui/dock";
import { EnhancedDockIcon } from "@/components/magicui/enhanced-dock-icon";
import { db } from "@/lib/Firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

export default function DashboardClient() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");


  // Populate recentAudits with user firestore db

  const [recentAudits, setRecentAudits] = useState([]);

  useEffect(() => {
    async function fetchRecentAudits() {
      if (!user?.email) return;
      try {
        const recentAuditsRef = collection(db, `users/${user.email}/audit_requests`);
        const snapshot = await getDocs(recentAuditsRef);
        const audits = snapshot.docs.map((doc) => {
          const auditData = doc.data();
          const auditDate = new Date(parseInt(doc.id));
          const domainName = new URL(auditData.url).hostname;
          return {
            html: auditData.html,
            id: doc.id,
            date:auditDate.toLocaleDateString(),
            domain: domainName,
            score: auditData.score
          };
        });
        if (audits.length > 0) setRecentAudits(audits);
      } catch (error) {
        console.error("Error fetching audits:", error);
      }
    }
    if (user?.uid) {
      fetchRecentAudits();
    }
  }, [user?.uid, user?.email]);

  const purchasedTemplates = [
    { id: 1, name: "E-commerce Starter", category: "Shop", downloadUrl: "#" },
    { id: 2, name: "Agency Portfolio", category: "Business", downloadUrl: "#" }
  ];

  return (
    <div className="relative flex flex-col md:flex-row px-2 md:px-14">
      {/* Sidebar - desktop only */}
      <div className="hidden md:sticky md:top-0 md:left-0 md:z-10 md:h-full md:w-64 md:flex-col md:border-r md:p-6 md:flex">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "overview" ? "bg-muted font-medium" : "hover:bg-muted/50"}`}
            >
              <LayoutDashboard size={18} />
              Overview
            </button>

            <button
              onClick={() => setActiveTab("audits")}
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "audits" ? "bg-muted font-medium" : "hover:bg-muted/50"}`}
            >
              <FileText size={18} />
              Saved Audits
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "templates" ? "bg-muted font-medium" : "hover:bg-muted/50"}`}
            >
              <BookOpen size={18} />
              Templates
            </button>

            <button
              onClick={() => setActiveTab("history")}
              className={`w-full flex items-center gap-2 p-2 rounded-md ${activeTab === "history" ? "bg-muted font-medium" : "hover:bg-muted/50"}`}
            >
              <History size={18} />
              Activity
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dock Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-40 md:hidden flex justify-center">
        <Dock className="bg-background/90 backdrop-blur-lg border px-4 py-3 shadow-lg rounded-full">
          <EnhancedDockIcon
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<LayoutDashboard size={activeTab === "overview" ? 26 : 24} />}
          />
          <EnhancedDockIcon
            active={activeTab === "audits"}
            onClick={() => setActiveTab("audits")}
            icon={<FileText size={activeTab === "audits" ? 26 : 24} />}
          />
          <EnhancedDockIcon
            active={activeTab === "templates"}
            onClick={() => setActiveTab("templates")}
            icon={<BookOpen size={activeTab === "templates" ? 26 : 24} />}
          />
          <EnhancedDockIcon
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
            icon={<History size={activeTab === "history" ? 26 : 24} />}
          />
        </Dock>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-6 pt-6 pb-24 md:pb-6">
        {/* Account Info Header */}
        <div className="flex justify-between items-center mb-8 text-wrap">
          <h1 className="text-xl md:text-2xl font-bold">Welcome, {user?.displayName || user?.email?.split('@')[0] || "User"}!</h1>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Account Info */}
            <div className="p-5 rounded-lg bg-card border">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Account Information</h2>
                <div className="flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MailIcon size={16} className="text-muted-foreground" />
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                {user?.displayName && (
                  <div className="flex items-center gap-2">
                    <UserPenIcon size={16} className="text-muted-foreground" />
                    <span className="font-medium">Name:</span> {user.displayName}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="font-medium">Member since:</span> {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-lg bg-card border">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Audits Run</h3>
                <p className="text-2xl font-bold">{recentAudits.length}</p>
              </div>
              <div className="p-5 rounded-lg bg-card border">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Templates</h3>
                <p className="text-2xl font-bold">{purchasedTemplates.length}</p>
              </div>
              <div className="p-5 rounded-lg bg-card border sm:col-span-2 md:col-span-1">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Plan</h3>
                <p className="text-2xl font-bold">Free</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-5 rounded-lg bg-card border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Audits</h2>
                <button onClick={() => setActiveTab("audits")} className="text-sm text-primary flex items-center gap-1">
                  View All <ChevronRight size={14} />
                </button>
              </div>

              {recentAudits.length > 0 ? (
                <div className="space-y-3">
                  {recentAudits.map((audit) => (
                    <div key={audit.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-md bg-muted/30">
                      <div>
                        <div className="font-medium flex items-center gap-2 break-all">
                          <Globe size={16} className="flex-shrink-0" />
                          <span className="truncate max-w-[200px] sm:max-w-xs">{audit.domain}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{audit.date}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <div className={`px-2 py-1 rounded text-xs ${audit.score > 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          Score: {audit.score}
                        </div>
                        <button className="p-2 rounded-md hover:bg-muted">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No audits yet. Start by analyzing your first website!</p>
              )}

              <div className="mt-4">
                <Link href="/tool" className="flex items-center justify-center w-full p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                  Run New Audit
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "audits" && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-card border">
              <h2 className="text-xl font-semibold mb-4">Saved Audits</h2>

              {recentAudits.length > 0 ? (
                <div className="space-y-3">
                  {recentAudits.map((audit) => (
                    <div key={audit.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-md bg-muted/30">
                      <div>
                        <div className="font-medium flex items-center gap-2 break-all">
                          <Globe size={16} className="flex-shrink-0" />
                          <span className="truncate max-w-[200px] sm:max-w-xs">{audit.domain}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{audit.date}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <div className={`px-2 py-1 rounded text-xs ${audit.score > 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          Score: {audit.score}
                        </div>
                        <button className="p-2 rounded-md hover:bg-muted">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No saved audits found.</p>
                  <Link href="/tool" className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                    Run Your First Audit
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-card border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Templates</h2>
                <Link href="/templates" className="text-sm text-primary flex items-center gap-1">
                  Browse Templates <ChevronRight size={14} />
                </Link>
              </div>

              {purchasedTemplates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {purchasedTemplates.map((template) => (
                    <div key={template.id} className="p-4 rounded-md border bg-card">
                      <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                        <BookOpen className="text-muted-foreground" size={32} />
                      </div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.category}</p>
                      <a
                        href={template.downloadUrl}
                        className="flex items-center gap-1 text-sm text-primary"
                      >
                        <Download size={14} /> Download
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">You haven&apos;t purchased any templates yet.</p>
                  <Link href="/templates" className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                    Browse Templates
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="p-5 rounded-lg bg-card border">
              <h2 className="text-xl font-semibold mb-4">Activity History</h2>

              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">Ran website audit for example.com</p>
                  <p className="text-sm text-muted-foreground">July 10, 2025</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">Ran website audit for testsite.org</p>
                  <p className="text-sm text-muted-foreground">July 5, 2025</p>
                </div>
                <div className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">Account created</p>
                  <p className="text-sm text-muted-foreground">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
