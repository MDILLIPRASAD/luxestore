import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Enhanced product data with more items and categories
const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "electronics",
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    stock: 15
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "electronics",
    rating: 4.8,
    description: "Advanced fitness tracking with heart rate monitoring and sleep analysis.",
    stock: 20
  },
  {
    id: 3,
    title: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "electronics",
    rating: 4.2,
    description: "Waterproof portable speaker with 20-hour battery life and deep bass.",
    stock: 30
  },
  {
    id: 4,
    title: "Designer Leather Wallet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "fashion",
    rating: 4.6,
    description: "Handcrafted genuine leather wallet with RFID protection.",
    stock: 25
  },
  {
    id: 5,
    title: "Aromatherapy Diffuser",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&q=80",
    category: "home",
    rating: 4.4,
    description: "Modern essential oil diffuser with LED mood lighting and timer settings.",
    stock: 40
  },
  {
    id: 6,
    title: "Smart Home Security Camera",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80",
    category: "electronics",
    rating: 4.7,
    description: "1080p HD security camera with night vision and motion detection.",
    stock: 18
  },
  {
    id: 7,
    title: "Organic Green Tea Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&q=80",
    category: "food",
    rating: 4.3,
    description: "Premium organic green tea collection with ceramic teapot.",
    stock: 50
  },
  {
    id: 8,
    title: "Vintage Polaroid Camera",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=500&q=80",
    category: "electronics",
    rating: 4.1,
    description: "Classic instant camera with modern features and vintage aesthetics.",
    stock: 12
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { toast } = useToast();

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory]);

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

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSearch={setSearchTerm}
        cartItems={cartItems}
        onCheckout={handleCheckout}
      />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="md:hidden mb-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </ScrollArea>
      </main>
    </div>
  );
};

export default Index;