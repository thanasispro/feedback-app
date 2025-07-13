import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeedbackPage } from "./pages/FeedbackPage";
import { FeedbackFormPage } from "./pages/FeedbackFormPage";

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedbackPage />} />
        <Route path="/feedback/new" element={<FeedbackFormPage />} />
        <Route path="/feedback/edit/:id" element={<FeedbackFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;