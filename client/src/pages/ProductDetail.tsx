import { Link, useNavigate, useParams } from "react-router-dom";
import MainStoreLayout from "../layouts/MainStoreLayout";
import { useProduct } from "../hooks/useCatalog";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const parsedId = Number(id);
  const { product, loading, error } = useProduct(parsedId);

  return (
    <MainStoreLayout>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 text-sm text-slate-600">
          <Link to="/home" className="hover:underline">
            Inicio
          </Link>{" "}
          /{" "}
          <Link to="/catalogo" className="hover:underline">
            Catálogo
          </Link>
        </div>

        {loading && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-slate-200" />
            <div className="space-y-3 rounded-xl border bg-white p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-slate-200" />
              ))}
            </div>
          </div>
        )}

        {!loading && (error || !product) && (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Producto no encontrado</h2>
            <p className="mt-2 text-slate-600">{error ?? "No existe este producto."}</p>
            <button
              className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => navigate("/catalogo")}
            >
              Volver al catálogo
            </button>
          </div>
        )}

        {product && (
          <div className="grid gap-6 md:grid-cols-2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-[4/3] w-full rounded-xl border object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=700&q=80";
              }}
            />

            <div className="rounded-xl border bg-white p-6">
              {product.category?.name && (
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                  {product.category.name}
                </p>
              )}
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{product.name}</h1>
              {product.description && <p className="mt-3 text-slate-600">{product.description}</p>}

              <div className="mt-5 flex items-center gap-3">
                <p className="text-3xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
                {product.comparePrice && (
                  <p className="text-lg text-slate-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                Stock disponible: <strong>{product.stock}</strong>
              </div>

              <button
                className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white opacity-70"
                disabled
              >
                Agregar al carrito (Sprint 3)
              </button>
            </div>
          </div>
        )}
      </section>
    </MainStoreLayout>
  );
}
