import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ShowMovies from './components/ShowMovies.tsx';
import CreateMovie from './components/CreateMovie.tsx';
import EditMovie from './components/EditMovie.tsx';
import Auth from './components/Auth.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import { editMovieLoader } from './config/loaders.ts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<h1 className='mt-auto'>Welcome to Movies App</h1>} />
      <Route path="/login" element={<Auth />} />
      <Route path="/show-movies" element={<ShowMovies />} />
      <Route path="/create-movie" element={<CreateMovie />} />
      <Route path="/edit-movie/:id" element={<EditMovie />}
        loader={editMovieLoader} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
