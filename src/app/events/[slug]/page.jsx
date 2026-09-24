export default async function EventPage({ params }) {
  const { slug } = await params;
  return <h1>Event: {slug}</h1>;
}
