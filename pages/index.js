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
          name='description'
          content='Une app pour choisir entre train et voiture'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src='/next.svg'
            alt='Next.js Logo'
            width={180}
            height={37}
            priority
          />
        </div>
        <p>
          {' '}
          Visitez la première page du site sur les{' '}
          <Link href='trajet'>"Trajets"</Link>
        </p>
      </main>
    </>
  )
}
