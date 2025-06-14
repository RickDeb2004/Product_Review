export type Review = {
  id: string;
  user: string;
  rating: number;
  text?: string;
  image?: string;
};

export const dummyReviews: Record<string, Review[]> = {
  "1": [
    {
      id: "r1",
      user: "Rohan",
      rating: 5,
      text: "Amazing sound quality!",
    },
    {
      id: "r2",
      user: "Aanya",
      rating: 4,
      text: "Comfortable and value for money",
    },
  ],
  "2": [
    {
      id: "r3",
      user: "Tanmay",
      rating: 5,
      text: "Perfect for workouts!",
    },
  ],
};
