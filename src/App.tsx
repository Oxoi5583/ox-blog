import './App.css'
import './css/style.min-wp-avatar.css';
import './css/style.min-wp-button.css';
import './css/style.min-wp-buttons.css';
import './css/style.min-wp-columns.css';
import './css/style.min-wp-comments.css';
import './css/style.min-wp-group.css';
import './css/style.min-wp-image.css';
import './css/style.min-wp-list.css';
import './css/style.min-wp-paragraph.css';
import './css/style.min-wp-post-author-name.css';
import './css/style.min-wp-post-comments-form.css';
import './css/style.min-wp-post-content.css';
import './css/style.min-wp-post-date.css';
import './css/style.min-wp-post-title.css';
import './css/style.min-wp-separator.css';
import './css/style.min-wp-site-logo.css';
import './css/style.min-wp-site-tagline.css';
import './css/style.min-wp-site-title.css';
import './css/style.min-wp-spacer.css';
import './css/style.min-wp-table.css';
import './css/wpAttached.css';
import './css/wpAttached.css'
import 'material-symbols'
import { BrowserRouter } from 'react-router-dom';
import AppMain from './AppMain';
import AppDataCollector from './AppDataCollector';
import AppRoutesControllerRoot from './AppRoutesControllerRoot';

function App() {
  return (
    <BrowserRouter>
      <AppMain/>
      <AppDataCollector/>
      <AppRoutesControllerRoot/>
    </BrowserRouter>
  )
}

export default App
