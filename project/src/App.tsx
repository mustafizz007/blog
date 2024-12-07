import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout";
import { Toaster } from "./components/ui";
import { HomePage, LoginPage, RegisterPage, NewPostPage } from "./pages";
import { PostPage } from "./pages/blog/post";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/new-post" element={<NewPostPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
