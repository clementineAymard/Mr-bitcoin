import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import './assets/scss/global.scss'

import { HomePage } from './pages/HomePage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { ContactDetailsPage } from './pages/ContactDetailsPage.jsx';
import { ContactEdit } from './pages/ContactEditPage.jsx';
import { StatisticsPage } from './pages/StatisticsPage.jsx';
import { AppHeader } from './cmps/AppHeader';

function App() {
    return (
        <Router>
            <section className="main-app">
                <AppHeader />

                <main className='main-section full'>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/contact" component={ContactPage} />
                        <Route path="/contact/edit/:id?" component={ContactEdit} />
                        <Route exact path="/contact/:id" component={ContactDetailsPage} />
                        <Route path="/statistics" component={StatisticsPage} />
                    </Switch>
                </main>

            </section>
        </Router>
    )
}

export default App;