import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import UploadPage from './screens/upload';
import ViewPage from './screens/view';

import SCORMProvider from "./context/SCORMProvider";
import SCORM_API from "./context/SCORMApi";

function App() {
  return (
    <SCORMProvider SCORMApi={SCORM_API}>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<UploadPage />} />
          <Route path="/view" element={<ViewPage />} />
        </Route>
      </Routes>
    </SCORMProvider>
  );
}

export default App;