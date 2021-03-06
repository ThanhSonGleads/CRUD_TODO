import React, { Suspense } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudTodo from "./pages/Crud-todo";
import TreeTodo from "./pages/TreeTodo";
import { ChartStatistic } from "./pages/ChartStatistic";
import SignInSide from "./pages/SignInStatistic";
import { PageNotFound } from "./pages/PageNotFound";
import MUI from "./pages/TreeTodo";
import Demo from "./pages/test";

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/mui" element={<MUI />} />
          <Route exact path="/test" element={<Demo />} />
          <Route exact path="/crud-todo" element={<CrudTodo />} />
          <Route exact path="/chart-statistic" element={<ChartStatistic />} />
          <Route exact path="/crud-todo/tree-todo" element={<TreeTodo />} />
          <Route exact path="/signin-statistic" element={<SignInSide />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route exact path="/" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
