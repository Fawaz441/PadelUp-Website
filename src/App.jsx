import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import Main from "./pages/main";
import { AuthProvider, RequiresAuth } from "./helpers";

function App() {
  return (
    <AuthProvider>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} />
      </div>
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && 
            <Route key={key} exact path={path} element={element} />
        )}

        <Route
          path="/dashboard"
          element={
            <RequiresAuth>
              <Main />
            </RequiresAuth>
          }
          exact
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
