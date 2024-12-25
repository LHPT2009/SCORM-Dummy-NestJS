import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import UploadPage from './screens/upload';
import ViewPage from './screens/view';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        <Route index element={<UploadPage />} />
        <Route path='/view' element={<ViewPage />} />
      </Route>
    </Routes>
  )
}

export default App
