import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ExpensePage from "../components/expense/ExpensePage";
import IncomePage from "../components/income/IncomePage";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import IncExpReport from "../components/IncExpReport/IncExpReport";
import RegistrationForm from "../components/userData/RegistrationForm";
import LoginForm from "../components/userData/LoginForm";

const AppRouter = ({ loggedIn, setLoggedIn }) => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginForm setLoggedIn={setLoggedIn} />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm setLoggedIn={setLoggedIn} />} />
      {loggedIn ? (
        <Route element={<MainLayout />}>
          <Route index element={<ExpensePage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/report" element={<IncExpReport />} />
          <Route path="/" element={<IncExpReport />} />
        </Route>
      ) : (
        <Route path="*" element={<NotFoundPage />} />
      )}
    </Routes>
  </Router>
);

export default AppRouter;
