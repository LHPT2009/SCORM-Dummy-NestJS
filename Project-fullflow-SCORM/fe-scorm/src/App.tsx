import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import UploadPage from './screens/upload';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        <Route index element={<UploadPage />} />
      </Route>
    </Routes>
  );
};

export default App;