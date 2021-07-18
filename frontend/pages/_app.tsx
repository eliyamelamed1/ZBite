import '../styles/globals.css';

import { store, wrapper } from '../redux/store';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
export default wrapper.withRedux(MyApp);
