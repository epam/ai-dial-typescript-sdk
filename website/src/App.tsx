import { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import Home from './pages/Home';

const ApiReference = lazy(() => import('./pages/ApiReference'));
const GettingStarted = lazy(() => import('./pages/GettingStarted'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense
        fallback={
          <div className="container loading-page" role="status">
            Loading documentation…
          </div>
        }
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="api" element={<ApiReference />} />
            <Route path="api/:methodName" element={<ApiReference />} />
            <Route
              path="*"
              element={
                <div className="container not-found">
                  <h1>Page not found.</h1>
                  <p>This page is not part of the SDK documentation.</p>
                  <Link to="/" className="button">
                    Back to overview
                  </Link>
                </div>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
