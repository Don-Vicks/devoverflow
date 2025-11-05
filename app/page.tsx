import { Suspense } from "react";

async function QuoteContent() {
  const response = await fetch("https://zenquotes.io/api/random", {
    cache: "no-store",
  });
  if (!response.ok) {
    return (
      <>
        <h1 className="text-center text-4xl">Server Side Fetching Example</h1>
        <p className="text-xl text-white">Failed to fetch quote.</p>
      </>
    );
  }
  const body = await response.json();
  console.log(body);
  // The API returns an array of objects like [{q: "...", a: "..."}]
  const quoteObj = Array.isArray(body) && body.length > 0 ? body[0] : null;

  return (
    <>
      <h1 className="text-center text-4xl">Server Side Fetching Example</h1>
      {quoteObj ? (
        <>
          <p className="text-xl text-black">
            "{quoteObj.q}" <br />
            <span className="text-sm text-gray-400">- {quoteObj.a}</span>
          </p>
          <p className="font-space-grotesk">
            "{quoteObj.q}" <br />
          </p>
        </>
      ) : (
        <p className="text-xl text-white">No quote found.</p>
      )}
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center text-xl leading-2.5 text-red-500">Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <QuoteContent />
    </Suspense>
  );
}
