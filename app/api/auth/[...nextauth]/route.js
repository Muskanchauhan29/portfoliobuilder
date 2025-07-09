// NextAuth removed. Return 404 for all requests.

export function GET() {
  return new Response('Not Found', { status: 404 });
}

export function POST() {
  return new Response('Not Found', { status: 404 });
}
