import Head from 'next/head'

export default () => (
  <>
    <Head>
      <title>You Are Offline</title>
    </Head>
    <h1>This is offline fallback page</h1>
    <h2>When offline, any page route will fallback to this page</h2>
  </>
)