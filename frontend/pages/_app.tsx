// import '../styles/main.scss';

import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <h2>
                <ToastContainer position='top-right' autoClose={5000} newestOnTop={false} pauseOnFocusLoss={false} />
            </h2>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
