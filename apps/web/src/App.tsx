import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CaseInboxPage } from "./features/cases/CaseInboxPage";
import { CaseDetailPage } from "./features/cases/CaseDetailPage";
import {
  CustomerDetailPage,
  CustomerRecordsPage,
} from "./features/customers/CustomerPages";
import {
  AuthProvider,
  canManageSettings,
  canViewReports,
  canWorkCases,
} from "./features/auth/auth";
import { LoginPage } from "./features/auth/LoginPage";
import { RequirePermission } from "./features/auth/RequirePermission";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { ReportsPage } from "./features/reports/ReportsPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import {
  CoreLandingPage,
  VerticalDemoPage,
} from "./features/portfolio/PortfolioPages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/portfolio" element={<CoreLandingPage />} />
          <Route path="/core" element={<CoreLandingPage />} />
          <Route
            path="/portfolio/clinic"
            element={<VerticalDemoPage demoKey="clinic" />}
          />
          <Route
            path="/portfolio/realty"
            element={<VerticalDemoPage demoKey="realty" />}
          />
          <Route
            path="/portfolio/finance"
            element={<VerticalDemoPage demoKey="finance" />}
          />
          <Route
            path="/demo/clinic"
            element={<VerticalDemoPage demoKey="clinic" />}
          />
          <Route
            path="/demo/realty"
            element={<VerticalDemoPage demoKey="realty" />}
          />
          <Route
            path="/demo/finance"
            element={<VerticalDemoPage demoKey="finance" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequirePermission allowed={canWorkCases}>
                <DashboardPage />
              </RequirePermission>
            }
          />
          <Route
            path="/reports"
            element={
              <RequirePermission allowed={canViewReports}>
                <ReportsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/settings"
            element={
              <RequirePermission allowed={canManageSettings}>
                <SettingsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/cases"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CaseInboxPage />
              </RequirePermission>
            }
          />
          <Route
            path="/customers"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CustomerRecordsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/customers/:customerId"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CustomerDetailPage />
              </RequirePermission>
            }
          />
          <Route
            path="/cases/:caseId"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CaseDetailPage />
              </RequirePermission>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
