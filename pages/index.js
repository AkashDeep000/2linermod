import Head from 'next/head'

import Link from 'next/link'
export default function Home() {
  return (
    <>
    <a href="https://f000.backblazeb2.com/file/2liner/imgplay-mod.apk" download="ImgPlayMod">
     <button className="download">Download</button>
       </a>
      <br />
<hr />
    
        <br />
  <Link href="/db">
    <a>DB</a>
          </Link>
          <br />
  <Link href="/client">
          <a>Client</a>
        </Link>
          <br />
  <Link href="/time">
          <a>Time</a>
        </Link>
    </>
  )
}
