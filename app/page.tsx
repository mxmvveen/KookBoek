import "./ui/home.scss";
import Category from "./ui/elements/category/category";
import { getCategories } from "./lib/data";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="container home">
      <h1>De lekkerste gerechten op één plek</h1>
      {categories.map((category, key) => (
        <Category key={key} category={category} isHomePage={true} />
      ))}
    </div>
  );
}
