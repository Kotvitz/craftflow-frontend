import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { JobsPage } from "./pages/jobs/JobsPage";
import { AppLayout } from "./layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          }
        />

        <Route
          path="/jobs"
          element={
            <AppLayout>
              <JobsPage />
            </AppLayout>
          }
        />

        <Route
          path="/inventory"
          element={
            <AppLayout>
              <div>(todo)</div>
            </AppLayout>
          }
        />

        <Route
          path="/customers"
          element={
            <AppLayout>
              <div>(todo)</div>
            </AppLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AppLayout>
              <div>(todo)</div>
            </AppLayout>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
