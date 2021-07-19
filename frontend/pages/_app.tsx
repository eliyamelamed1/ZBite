import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { wrapperStore } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapperStore.withRedux(MyApp);
