"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const authToken = searchParams.get("auth_token");
  const { handleLoginToken } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      if (authToken) {
        try {
          await handleLoginToken(authToken);
        } catch (err) {
          console.error("Login failed", err);
        }
      }
      setLoading(false);
    };

    processAuth();
  }, [authToken]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <div className="flex flex-col items-center space-y-4 animate-fadeIn">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-700 text-lg font-medium">
            Processing login...
          </p>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">Redirecting or login completed</p>
      )}
    </div>
  );
}
