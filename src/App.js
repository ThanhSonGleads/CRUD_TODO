import React, { Suspense } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CrudTodo from "./pages/Crud-todo";
import MUI from "./pages/test";
import TreeTodo from "./pages/TreeTodo";
import { ChartStatistic } from "./pages/ChartStatistic";

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/mui" element={<MUI />} />
          <Route exact path="/crud-todo" element={<CrudTodo />} />
          <Route exact path="/chart-statistic" element={<ChartStatistic />} />
          <Route exact path="/crud-todo/tree-todo" element={<TreeTodo />} />
          <Route exact path="/" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
