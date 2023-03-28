import Link from 'next/link'

const Links = [
  { href: '/home', label: 'Home' }
]

export default function Navigation () {
  return (
    <header>
      <nav>
        <ul>
          {Links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
