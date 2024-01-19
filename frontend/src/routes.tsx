import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RouteWithNotFound from "./utils/routes-whith-not-fount";
import ProtectedRoute from "./utils/routes-protect";
import AuthProtectRoute from "./utils/auth-protect-rutes";
import { Loading } from "./components/loading";
import Login from "./auth/login";
import Register from "./auth/register";

const ChallengePage = lazy(()=> import('./pages/ChallengePage'))
const App = lazy(() => import('./App'));
const Dashboard = lazy(() => import("./pages/dashboard"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <RouteWithNotFound>
          <Route path="/" element={<App />} />

          <Route element={<AuthProtectRoute redirectTo="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<ChallengePage/>} path="/challenge/:quizId"/>
          </Route>
        </RouteWithNotFound>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
