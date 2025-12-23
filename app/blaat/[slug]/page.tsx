const Category = async ({ params }: { params: { slug: string } }) => {
  const parameters = await params;
  console.log(parameters.slug);

  return <p>test</p>;
};

export default Category;
