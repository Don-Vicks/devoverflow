type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return <div className="text-4xl text-black">page: {id}</div>;
};

export default page;
