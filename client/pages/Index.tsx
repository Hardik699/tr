import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  X,
} from "lucide-react";
import AppNav from "@/components/Navigation";

export default function Index() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Check authentication status
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("userRole");
    const user = localStorage.getItem("currentUser");
    const lastUser = localStorage.getItem("lastAuthenticatedUser");

    setIsAuthenticated(!!auth);
    setUserRole(role || "");
    setCurrentUser(user || "");

    // Show welcome modal only on new login
    if (auth && user && user !== lastUser) {
      setShowWelcomeModal(true);
      localStorage.setItem("lastAuthenticatedUser", user);
    }

    setHasSeenWelcome(true);
  }, []);

  // Get role-specific welcome data
  const getRoleWelcomeData = () => {
    switch (userRole) {
      case "admin":
        return {
          title: "Welcome, Admin!",
          subtitle: "You have full system access",
          icon: Shield,
          color: "purple",
          gradient: "from-purple-600 to-blue-600",
          message: `All systems operational. You have ${isAuthenticated ? "administrative privileges" : "standard access"}.`,
        };
      case "hr":
        return {
          title: "Welcome, HR Manager!",
          subtitle: "Ready to manage your team",
          icon: Users,
          color: "green",
          gradient: "from-green-600 to-blue-600",
          message: "All employee data is synced and ready. Start managing your team today!",
        };
      case "it":
        return {
          title: "Welcome, IT Specialist!",
          subtitle: "System management ready",
          icon: Zap,
          color: "orange",
          gradient: "from-orange-600 to-red-600",
          message: "All systems connected. You're ready to manage IT infrastructure.",
        };
      default:
        return {
          title: "Welcome Back!",
          subtitle: "You're logged in",
          icon: Sparkles,
          color: "blue",
          gradient: "from-blue-600 to-cyan-600",
          message: "Your account is active and ready to use.",
        };
    }
  };

  const welcomeData = getRoleWelcomeData();
  const WelcomeIcon = welcomeData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-deep-900 via-blue-deep-800 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

        {/* Animated Grid Background */}
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h60v60H0z\" fill=\"none\"/><path d=\"M0 0h60v1H0z\" stroke=\"rgba(100,116,139,0.1)\" stroke-width=\"1\"/><path d=\"M0 0v60h1V0z\" stroke=\"rgba(100,116,139,0.1)\" stroke-width=\"1\"/><circle cx=\"30\" cy=\"30\" r=\"1\" fill=\"rgba(100,116,139,0.1)\"/></svg>')] opacity-30"}></div>
      </div>

      {/* Navigation */}
      <AppNav />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            User Management
            <span className="block text-blue-400">System</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {isAuthenticated
              ? `Welcome back, ${currentUser}! ${userRole === "admin" ? "Manage users and system settings." : "Your account is active and ready to use."}`
              : "A modern solution for user authentication and management. Secure, simple, and efficient."}
          </p>

          {!isAuthenticated && (
            <p className="text-slate-400 text-lg">
              Use the navigation above to login or contact an administrator for
              access.
            </p>
          )}
        </div>

        {/* Features/Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
          {/* Authentication Status */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-400 group-hover:animate-spin" />
                <span>Authentication</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                {isAuthenticated ? "You are logged in" : "Secure login system"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                    isAuthenticated
                      ? "bg-green-500/20 border border-green-500/30 animate-pulse"
                      : "bg-slate-700/50 border border-slate-600"
                  }`}
                >
                  <User
                    className={`h-8 w-8 transition-all ${isAuthenticated ? "text-green-400 animate-bounce" : "text-slate-400"}`}
                  />
                </div>
                <p
                  className={`font-medium transition-colors ${isAuthenticated ? "text-green-400" : "text-slate-300"}`}
                >
                  {isAuthenticated ? "Active Session" : "Not Authenticated"}
                </p>
                {isAuthenticated && (
                  <p className="text-slate-400 text-sm mt-2 animate-fade-in">
                    Logged in as: <span className="text-blue-400 font-semibold">{currentUser}</span>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admin Access */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group animation-delay-100">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Shield className={`h-5 w-5 text-purple-400 ${userRole === "admin" ? "animate-pulse" : ""}`} />
                <span>Admin Access</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                {userRole === "admin"
                  ? "Full system access"
                  : "Administrative features"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                    userRole === "admin"
                      ? "bg-purple-500/20 border border-purple-500/30 animate-pulse shadow-lg shadow-purple-500/20"
                      : "bg-slate-700/50 border border-slate-600"
                  }`}
                >
                  <Shield
                    className={`h-8 w-8 transition-all ${userRole === "admin" ? "text-purple-400 animate-bounce" : "text-slate-400"}`}
                  />
                </div>
                <p
                  className={`font-medium transition-colors ${userRole === "admin" ? "text-purple-400" : "text-slate-300"}`}
                >
                  {userRole === "admin"
                    ? "Admin Privileges"
                    : "Standard Access"}
                </p>
                {userRole === "admin" && (
                  <p className="text-slate-400 text-sm mt-2 animate-fade-in">
                    <span className="text-purple-400 font-semibold">✓</span> Create and manage users
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/60 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-400" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                {userRole === "admin"
                  ? "Manage system users"
                  : "User account features"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
                <p className="text-orange-400 font-medium">
                  {userRole === "admin" ? "Full Control" : "Account Access"}
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {userRole === "admin"
                    ? "Add, edit, delete users"
                    : "View your account info"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {isAuthenticated
                ? "Welcome to Your Dashboard"
                : "Getting Started"}
            </h3>
            <div className="space-y-3 text-slate-400 max-w-3xl mx-auto">
              {isAuthenticated ? (
                userRole === "admin" ? (
                  <>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span>
                        Use the navigation above to create new users or manage
                        existing ones
                      </span>
                    </p>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span>Click "New User" to add users to the system</span>
                    </p>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-blue-400" />
                      <span>
                        Click "View Users" to see and manage existing users
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-green-400" />
                      <span>You're successfully logged into the system</span>
                    </p>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-green-400" />
                      <span>
                        Contact an administrator for additional permissions
                      </span>
                    </p>
                    <p className="flex items-center justify-center space-x-2">
                      <ArrowRight className="h-4 w-4 text-green-400" />
                      <span>
                        Use the profile menu in the navigation to manage your
                        account
                      </span>
                    </p>
                  </>
                )
              ) : (
                <>
                  <p className="flex items-center justify-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                    <span>
                      Click "Login" in the navigation above to sign in
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                    <span>
                      Admin credentials: username "admin", password "admin"
                    </span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                    <span>
                      Contact an administrator to create your user account
                    </span>
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
