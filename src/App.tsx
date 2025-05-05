import { BrowserRouter } from 'react-router';

import { Routes } from '@/routes';

import { MessagesProvider } from './hook/useMessages';

function App() {
  return (
    <MessagesProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MessagesProvider>
  );
}

export default App;
