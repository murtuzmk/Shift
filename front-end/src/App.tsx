import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import { LandingLayout } from "./components/layout/landing-layout";
import useRefineProps from "./config/refine";
import titleHandler from "./config/title-handler";
import { useAuthProvider } from "./context/auth";
import Authenticate from "./pages/authenticate";
import { Landing } from "./pages/landing";
import { Dashboard } from "./pages/dashboard";
import { Messages } from "./pages/messages";
import { AppLayout } from "./components/layout/app-layout";
import { Onboarding } from "./pages/onboarding";
import { LoadingCard } from "./components/ui/loading-card";
import Settings from "./pages/Settings";
import RAWelcome from "./pages/RAWelcome";
import CreateRAAccount from "./components/CreateRAAccount";
import { MyAvailability } from "./pages/MyAvailability";
import Coworkers from "./pages/Coworkers";
import ExecutivePage from "./pages/ExecutivePage";
import { Employees } from "./pages/Employees/employees";

function App() {
  const { isLoading, authProvider } = useAuthProvider();
  const refineProps = useRefineProps();

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <BrowserRouter>
      <Refine {...refineProps}>
        <Routes>
          {/* Routes that require authentication */}
          {/* These routes aren't wrapped in a layout */}
          <Route
            element={
              <Authenticated
                key="protected-1"
                fallback={<CatchAllNavigate to="/" />}>
                {/* If authenticated, render the child routes */}
                <Outlet />
              </Authenticated>
            }>
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Route>
          <Route
            element={
              <Authenticated
                key="protected-2"
                fallback={<CatchAllNavigate to="/" />}>
                {/* If authenticated, render the child routes */}
                <AppLayout>
                  <Outlet />
                </AppLayout>
              </Authenticated>
            }>
            {/* <Route element={<NavigateToResource resource="dashboard" />} /> */}
            {/* Authenticated child routes */}
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/employees">
              <Route index element={<Employees />} />
            </Route>
            <Route path="/executivepage">
              <Route index element={<ExecutivePage />} />
            </Route>
            <Route path="/co-workers">
              <Route index element={<Coworkers />} />
            </Route>
            <Route path="/availability">
              <Route index element={<MyAvailability />} />
            </Route>
            <Route path="/create-ra-account">
              <Route index element={<CreateRAAccount />} />
            </Route>
            <Route path="/ra-welcome">
              <Route index element={<RAWelcome />} />
            </Route>
            <Route path="/messages">
              <Route index element={<Messages />} />
            </Route>
            <Route path="/settings">
              <Route index element={<Settings />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>
          {/* Routes that don't require authentication */}
          <Route
            element={
              <Authenticated
                key="auth-pages"
                fallback={
                  <LandingLayout>
                    <Outlet />
                  </LandingLayout>
                }>
                {/* Redirect to app if authenticated*/}
                {/* <NavigateToResource resource="dashboard" /> */}
                <Navigate to="/authenticate" />
              </Authenticated>
            }>
            {/* Unauthenticated child routes */}
            <Route index element={<Landing />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler handler={titleHandler} />
      </Refine>
    </BrowserRouter>
  );
}

export default App;
