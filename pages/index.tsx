import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useScript from 'react-script-hook'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
    useScript({ src: '/js/home/patchy.js', checkForExisting: false, });
    useScript({ src: '/js/home/main.js', checkForExisting: false, });
    return (
        <div className={styles.container}>
            <Head>
                <title>Patchouli :D</title>
                <meta name="description" content="Patchouli :D" />
                <link rel="icon" href="/favicon/favicon.ico" />
            </Head>

            <canvas width="900" height="500" id="main-bg" className="fixed"></canvas>
        </div>
    )
}

export default Home
