import React from "react"
import "../styles/globals.css"
import "../../node_modules/antd/dist/antd.css";
import type { AppProps } from "next/app";
import { IconlyProvider } from 'react-iconly'
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <IconlyProvider set='curved'>
            <Head>
                <link
                    rel="shortcut icon"
                    href="/images/logo.png"
                />
            </Head>

            <Component {...pageProps} />
        </IconlyProvider>
    );
}

export default App;