import { Navigate } from 'react-router-dom';

// any unmatched route will land here
export default function CatchAll() {
  // redirect back to "/"
  return <Navigate to="/" replace />;
}
