import React from 'react'
import Link from 'next/link';


export default function Header() {
  return (
    <>
        <header>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/new">New</Link>
            </li>
        </header>
    </>
  )
}