import { useNavigate } from "react-router-dom";
import ProductGrid from "../components/catalog/ProductGrid";
import MainStoreLayout from "../layouts/MainStoreLayout";
import { useCategories, useFeaturedProducts } from "../hooks/useCatalog";

export default function Home() {
  const navigate = useNavigate();
  const { categories, loading: loadingCategories } = useCategories();
  const { products: featuredProducts, loading: loadingFeatured } = useFeaturedProducts();

  return (
    <MainStoreLayout>
      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-3 inline-block rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">
            Sprint 2 · Home + Catálogo
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight">
            Descubre lo último en moda juvenil y compra desde nuestro catálogo.
          </h1>
          <p className="mt-4 max-w-xl text-slate-300">
            Explora categorías, productos destacados y navega al detalle de cada producto.
          </p>
          <button
            className="mt-6 rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-bold hover:bg-rose-400"
            onClick={() => navigate("/catalogo")}
          >
            Comprar ahora
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Categorías</h2>
          <button
            onClick={() => navigate("/catalogo")}
            className="text-sm font-semibold text-rose-600 hover:underline"
          >
            Ver catálogo completo
          </button>
        </div>

        {loadingCategories ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="rounded-xl border bg-white p-4 text-left shadow-sm hover:shadow"
                onClick={() => navigate(`/catalogo?categoryId=${category.id}`)}
              >
                <h3 className="font-bold text-slate-900">{category.name}</h3>
                <p className="text-xs text-slate-500">{category.productCount ?? 0} productos</p>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Productos destacados</h2>
        <ProductGrid
          products={featuredProducts}
          loading={loadingFeatured}
          emptyMessage="No hay destacados en este momento."
        />
      </section>
    </MainStoreLayout>
  );
}
