"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardContent from "./DashboardClient";

export default function ClientWrapper() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
