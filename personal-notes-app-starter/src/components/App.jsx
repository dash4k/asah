import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Heading from './Heading';
import Navigation from './Navigation';
import HomePageWrapper from '../pages/HomePage';
import ArchivePageWrapper from '../pages/ArchivePage';
import DetailPageWrapper from '../pages/DetailPage';
import CreatePageWrapper from '../pages/CreatePage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  return (
    <div className='app-container'>
      <header>
        <Heading />
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePageWrapper />} />
          <Route path='/archive' element={<ArchivePageWrapper />} />
          <Route path='/create' element={<CreatePageWrapper />} />
          <Route path='/notes/:id' element={<DetailPageWrapper />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;