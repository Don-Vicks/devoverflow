import { Suspense } from 'react'

async function QuoteContent() {
  const response = await fetch('https://zenquotes.io/api/random', {
    cache: 'no-store',
  })
  if (!response.ok) {
    return (
      <>
        <h1 className='text-center text-4xl'>Server Side Fetching Example</h1>
        <p className='text-white text-xl'>Failed to fetch quote.</p>
      </>
    )
  }
  const body = await response.json()
  console.log(body)
  // The API returns an array of objects like [{q: "...", a: "..."}]
  const quoteObj = Array.isArray(body) && body.length > 0 ? body[0] : null

  return (
    <>
      <h1 className='text-center text-4xl'>Server Side Fetching Example</h1>
      {quoteObj ? (
        <p className='text-white text-xl'>
          "{quoteObj.q}" <br />
          <span className='text-sm text-gray-400'>- {quoteObj.a}</span>
        </p>
      ) : (
        <p className='text-white text-xl'>No quote found.</p>
      )}
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className='text-center text-xl'>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <QuoteContent />
    </Suspense>
  )
}
