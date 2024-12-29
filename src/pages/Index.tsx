import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// Enhanced product data with more fields
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "electronics",
    rating: 4.8,
    description: "Advanced fitness tracking with heart rate monitoring and sleep analysis.",
  },
  {
    id: 3,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "electronics",
    rating: 4.2,
    description: "Waterproof portable speaker with 20-hour battery life and deep bass.",
  },
  {
    id: 4,
    title: "Designer Leather Wallet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "fashion",
    rating: 4.6,
    description: "Handcrafted genuine leather wallet with RFID protection.",
  },
  {
    id: 5,
    title: "Aromatherapy Diffuser",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&q=80",
    category: "home",
    rating: 4.4,
    description: "Modern essential oil diffuser with LED mood lighting and timer settings.",
  },
  {
    id: 6,
    title: "Smart Home Security Camera",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80",
    category: "electronics",
    rating: 4.7,
    description: "1080p HD security camera with night vision and motion detection.",
  }
];

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { toast } = useToast();

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category");
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. Your order will be processed shortly.",
    });
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchTerm}
        cartItems={cartItems}
        onCheckout={handleCheckout}
      />
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;