import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Header from './Components/Header';
import Home from './Pages/Home';
import Shop from './Pages/shop';
import Meistarklase from './Pages/Meistarklase';
import Sveces from './Pages/Sveces';
import Auskari from './Pages/Auskari';
import Aromati from './Pages/Aromati';
import Ziepes from './Pages/Ziepes';
import Burti from './Pages/Burti';
import Grozs from './Pages/Grozs';
import Piegade from './Pages/Piegade';
import SuccessPage from './Pages/Success';

createInertiaApp({
    title: (title) => `${title} Sun Aroma`,
    resolve: (name) => {
        const pages = {
            'Home': Home,
            'Shop': Shop,
            'Meistarklase': Meistarklase,
            'Sveces': Sveces,
            'Auskari': Auskari,
            'Aromati': Aromati,
            'Ziepes': Ziepes,
            'Burti': Burti,
            'Piegade': Piegade,
            'Grozs': Grozs,
            'Success': SuccessPage
        };
        return pages[name];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
        <>
        	<Header />
            <App {...props} /> // Move Header inside App, Inertia handles routing
        </>
        );
    },
});
