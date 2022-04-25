export const infoTiles: InfoTile[] = [
  {
    heading: `Your Favorites All In One Place`,
    text: `Whatever you want, with the convenience you want. Discover tasty meals from local restaurants. We teamed up with the best spots in your city to bring you the food you love.`,
    imageUrl: '/assets/image/burgers.jpg',
  },
  {
    heading: `Order For Pickup Or Delivery`,
    text: `Be a little lazy and choose delivery. Or order ahead and skip the fees with pickup. The choice is yours. All we're here to do is to introduce you to your next delicious meal.`,
    imageUrl: `/assets/image/yum.jpg`,
  },
  {
    heading: `Sign Up For Mojo Rewards`,
    text: `Save an average of $5 an order with $0 delivery fees when you sign up for Mojo Rewards. Who doesn't like savings? Join now and get a 2 week free trial that you can cancel at any time.`,
    imageUrl: '/assets/image/tacos.jpg',
  },
  {
    heading: `Become A Restaurant Partner`,
    text: `We'll get you online and noticed. Thousands of hungry customers may be in your area. With our 5-star support, 95% of Meal Mojo merchants rank us as a strong business partner.`,
    imageUrl: '/assets/image/business-owner.jpg',
  },
];

export interface InfoTile {
  heading: string;
  text: string;
  imageUrl: string;
}
