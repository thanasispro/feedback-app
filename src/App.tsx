import { FeedbackPage } from "./pages/FeedbackPage";

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

export default function App() {
  return <FeedbackPage />;
}