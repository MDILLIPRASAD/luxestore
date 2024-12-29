import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-primary text-primary" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-primary text-primary" />);
    }

    return stars;
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-2">{product.title}</CardTitle>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            {renderRating(product.rating)}
            <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;