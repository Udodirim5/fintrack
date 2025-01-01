import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { IncomeProvider } from "./contexts/IncomeProvider";
import { ExpensesProvider } from "./contexts/ExpensesProvider";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PageNav from "./components/PageNav";
import IncomePage from "./pages/IncomePage";
import ExpensesPage from "./pages/ExpensesPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditIncomeSuperComponent from "./components/EditIncomeSuperComponent";
import EditExpensesSuperComponent from "./components/EditExpensesSuperComponent";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <ExpensesProvider>
          <IncomeProvider>
            <div className="app">
              <PageNav />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="login" element={<LoginPage />} />

                {/* Expenses Routes */}
                <Route
                  path="expenses"
                  element={
                    <ProtectedRoute>
                      <ExpensesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="expenses/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditExpensesSuperComponent />
                    </ProtectedRoute>
                  }
                />

                {/* Income Routes */}
                <Route
                  path="incomes"
                  element={
                    <ProtectedRoute>
                      <IncomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="incomes/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditIncomeSuperComponent />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </div>
          </IncomeProvider>
        </ExpensesProvider>
      </AuthProvider>
    </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;