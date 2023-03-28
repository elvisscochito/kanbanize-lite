import Link from 'next/link'

export default function LinkButton ({ href, text }) {
  return (
    <>
      <Link href={href}>{text}</Link>
    </>
  )
}
