import './App.css'
import '../99-css/style.min-wp-avatar.css';
import '../99-css/style.min-wp-button.css';
import '../99-css/style.min-wp-buttons.css';
import '../99-css/style.min-wp-columns.css';
import '../99-css/style.min-wp-comments.css';
import '../99-css/style.min-wp-group.css';
import '../99-css/style.min-wp-image.css';
import '../99-css/style.min-wp-list.css';
import '../99-css/style.min-wp-paragraph.css';
import '../99-css/style.min-wp-post-author-name.css';
import '../99-css/style.min-wp-post-comments-form.css';
import '../99-css/style.min-wp-post-content.css';
import '../99-css/style.min-wp-post-date.css';
import '../99-css/style.min-wp-post-title.css';
import '../99-css/style.min-wp-separator.css';
import '../99-css/style.min-wp-site-logo.css';
import '../99-css/style.min-wp-site-tagline.css';
import '../99-css/style.min-wp-site-title.css';
import '../99-css/style.min-wp-spacer.css';
import '../99-css/style.min-wp-table.css';
import '../99-css/wpAttached.css';
import '../99-css/wpAttached.css'
import 'material-symbols'
import { BrowserRouter } from 'react-router-dom';
import AppMain from './AppMain';
import AppDataCollector from './AppDataCollector';
import AppRoutesControllerRoot from '../02-AppRoutesController/AppRoutesControllerRoot';

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
