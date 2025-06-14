export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Realme Narzo 60X",
    description: "5G Phone with AMOLED display",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/7/m/-original-imagt4qptrkzwmxa.jpeg?q=70",
    price: 11999,
  },
  {
    id: "2",
    name: "Samsung Galaxy M14",
    description: "Monster battery 6000 mAh",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/l/o/k/-original-imagzjhwtfthcmzz.jpeg?q=70",
    price: 13999,
  },
  {
    id: "3",
    name: "Apple iPhone 13",
    description: "128 GB - Midnight",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/q/o/y/-original-imagtc3kfyhgfcvr.jpeg?q=70",
    price: 51999,
  }
];
