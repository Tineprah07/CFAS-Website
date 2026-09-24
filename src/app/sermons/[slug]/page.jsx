export default async function SermonPage({ params }) {
  const { slug } = await params;
  return <h1>Sermon: {slug}</h1>;
}
