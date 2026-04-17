import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed Sprint 1 + Sprint 2...");

  const adminEmail = "admin@vibepulse.com";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "AdminPassword123!";
  const clientEmail = "cliente@vibepulse.com";
  const clientPassword = process.env.CLIENT_SEED_PASSWORD || "Cliente123!";

  const adminHash = await bcrypt.hash(adminPassword, 10);
  const clientHash = await bcrypt.hash(clientPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin Principal",
      password: adminHash,
      role: "ADMIN",
    },
    create: {
      name: "Admin Principal",
      email: adminEmail,
      password: adminHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: clientEmail },
    update: {
      name: "Cliente Demo",
      password: clientHash,
      role: "CLIENT",
    },
    create: {
      name: "Cliente Demo",
      email: clientEmail,
      password: clientHash,
      role: "CLIENT",
    },
  });

  const categoriesSeed = [
    {
      name: "Moda",
      slug: "moda",
      imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
      description: "Tendencias juveniles para todos los días",
    },
    {
      name: "Accesorios",
      slug: "accesorios",
      imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
      description: "Complementos para elevar tu outfit",
    },
    {
      name: "Calzado",
      slug: "calzado",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
      description: "Sneakers y botas para estilo urbano",
    },
    {
      name: "Deporte",
      slug: "deporte",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
      description: "Prendas activas para tu rutina",
    },
  ];

  const categories = [];
  for (const category of categoriesSeed) {
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        imageUrl: category.imageUrl,
        description: category.description,
      },
      create: category,
    });
    categories.push(record);
  }

  const [moda, accesorios, calzado, deporte] = categories;

  const productsSeed = [
    {
      name: "Chaqueta Oversize Vibe",
      description: "Chaqueta estilo urbano con acabado premium y ajuste oversize.",
      price: 219900,
      comparePrice: 279900,
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80",
      stock: 14,
      featured: true,
      badge: "Nuevo",
      categoryId: moda.id,
    },
    {
      name: "Hoodie Street Pulse",
      description: "Hoodie unisex de algodón pesado, ideal para clima fresco.",
      price: 169900,
      imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=700&q=80",
      stock: 30,
      featured: true,
      categoryId: moda.id,
    },
    {
      name: "Gorra Urban Classic",
      description: "Gorra ajustable con logo bordado y visera curva.",
      price: 59900,
      imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=700&q=80",
      stock: 50,
      featured: false,
      categoryId: accesorios.id,
    },
    {
      name: "Mochila Tech Nomad",
      description: "Mochila resistente al agua con compartimento para portátil.",
      price: 139900,
      comparePrice: 179900,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80",
      stock: 20,
      featured: true,
      badge: "Oferta",
      categoryId: accesorios.id,
    },
    {
      name: "Sneakers Aero X",
      description: "Zapatillas livianas con suela de alto agarre y amortiguación.",
      price: 289900,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=80",
      stock: 18,
      featured: true,
      badge: "Top",
      categoryId: calzado.id,
    },
    {
      name: "Jogger Motion Fit",
      description: "Pantalón jogger flexible para entrenamiento y uso diario.",
      price: 129900,
      imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80",
      stock: 24,
      featured: false,
      categoryId: deporte.id,
    },
  ];

  for (const product of productsSeed) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          description: product.description,
          price: product.price,
          comparePrice: product.comparePrice,
          imageUrl: product.imageUrl,
          stock: product.stock,
          featured: product.featured,
          badge: product.badge,
          categoryId: product.categoryId,
        },
      });
    } else {
      await prisma.product.create({ data: product });
    }
  }

  console.log("✅ Usuarios, categorías y productos listos.");
  console.log(`Admin: ${adminEmail}`);
  console.log(`Cliente demo: ${clientEmail}`);
  console.log("Seed completada.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
