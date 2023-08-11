import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './features/search';
import ShowPage from './features/show/ShowPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/show/:nasa_id" element={<ShowPage />} />
          <Route path="/" element={<SearchPage />} index />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
