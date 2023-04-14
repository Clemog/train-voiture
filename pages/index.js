import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from 'src/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Une app pour choisir entre train et voiture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {' '}
          Visitez la première page du site pour comparer train et voiture:
        </div>
        <Link href="/trajet">J'y vais !</Link>
      </main>
    </>
  )
}
