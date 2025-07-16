import { michroma } from "@/assets/fonts";

const Jumbotron = () => {
  return (
    <section className="mt-10 space-y-3 text-center">
      <h1 className={`md:text-6xl1 text-4xl font-bold ${michroma.className}`}>
        The Blog<span className="text-orange-600"> Hub</span>
      </h1>
      <p className="text-lg md:text-xl">
        A blog about food,experiences,and recipes
      </p>
    </section>
  );
};

export default Jumbotron;

//container digunakan untuk pembuatan yang sudah dibuat sesuai layar
