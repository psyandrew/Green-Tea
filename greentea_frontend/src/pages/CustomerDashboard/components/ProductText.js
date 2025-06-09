const productMap = {
  0: {
    name: "Jasmine Tea",
    description: "Immerse yourself in tranquility with our Jasmine Tea, a graceful infusion of delicate green tea leaves and handpicked jasmine blossoms. With every sip, you'll experience a calming floral bouquet that soothes the senses and uplifts the spirit. Whether you're seeking a moment of peace or an elegant tea companion, this aromatic blend promises serenity in every cup.",
    ingredients: "Green tea, Jasmine blossoms",
    profile: "Floral, Sweet, Calming",
    brew: "Steep at 175°F for 2-3 minutes to allow the floral notes to fully bloom.",
    snack_pairings: "Almond cookies, vanilla sponge cake, or lightly sweetened rice crackers.",
    type: "green",
    series: "Classic"
  },
  1: {
    name: "Lemon Green Tea",
    description: "Zing into your day with our Lemon Green Tea—a lively blend of refreshing green tea and sun-dried lemon peel. This vibrant fusion awakens your palate with a tart citrus burst balanced by the grassy smoothness of high-quality green tea. It’s the perfect energizing companion for bright mornings or a refreshing mid-afternoon lift.",
    ingredients: "Green tea, Lemon peel, Natural flavors",
    profile: "Zesty, Refreshing, Bright",
    brew: "Steep at 175°F for 2 minutes for a crisp, citrusy experience.",
    snack_pairings: "Lemon tart, buttery scones, or citrus biscotti.",
    type: "green",
    series: "Classic"
  },
  2: {
    name: "Peach Green Tea",
    description: "Our Peach Green Tea blends the sweet essence of sun-ripened peaches with the fresh clarity of green tea. This juicy, fragrant brew is bursting with the taste of summer, ideal for sipping chilled on hot afternoons or warm for a cozy fruity treat. Every cup offers a refreshing escape to an orchard in bloom.",
    ingredients: "Green tea, Peach essence, Dried peaches",
    profile: "Fruity, Smooth, Juicy",
    brew: "Steep at 175°F for 2-3 minutes to extract full peach flavor.",
    snack_pairings: "Peach cobbler, vanilla wafers, or shortbread biscuits.",
    type: "green",
    series: "Classic"
  },
  3: {
    name: "White Tea",
    description: "Light and ethereal, our White Tea is crafted from the youngest tea leaves, handpicked and gently dried to preserve their natural sweetness. This delicate tea offers a whisper of floral elegance and a clean finish, making it ideal for quiet mornings or moments of mindful relaxation.",
    ingredients: "White tea leaves",
    profile: "Light, Floral, Gentle",
    brew: "Steep at 175°F for 2 minutes to maintain its subtle charm.",
    snack_pairings: "Madeleines, butter cookies, or lavender shortbread.",
    type: "green",
    series: "Classic"
  },
  4: {
    name: "Apple Green Tea",
    description: "Crisp, clean, and comforting—our Apple Green Tea captures the nostalgic flavor of fresh orchard apples paired with vibrant green tea leaves. Every sip delivers a gentle sweetness and soft tartness that feels like an autumn breeze in a cup. A versatile tea for any season.",
    ingredients: "Green tea, Apple pieces, Natural flavors",
    profile: "Crisp, Sweet, Inviting",
    brew: "Steep at 175°F for 2 minutes for a balanced apple-forward brew.",
    snack_pairings: "Apple pie, oatmeal raisin cookies, or caramel crisps.",
    type: "green",
    series: "Classic"
  },
  5: {
    name: "Japanese Sencha",
    description: "Savor the taste of tradition with our Japanese Sencha, a prized green tea known for its bold umami and vibrant green hue. This tea offers a vegetal richness and marine freshness, making it a cornerstone of Japanese tea culture. It's perfect for focused work sessions or mindful sips.",
    ingredients: "Japanese Sencha green tea",
    profile: "Vegetal, Grassy, Umami",
    brew: "Steep at 170°F for 1-2 minutes for optimal flavor and brightness.",
    snack_pairings: "Sushi, rice crackers, or savory seaweed snacks.",
    type: "green",
    series: "Classic"
  },
  6: {
    name: "English Breakfast Tea",
    description: "Start your day strong with our English Breakfast Tea, a bold and hearty blend of robust black tea leaves. Its malty depth and smooth finish make it a beloved staple for mornings, especially with a splash of milk or honey. It's the comfort brew for early risers and tea lovers alike.",
    ingredients: "Black tea leaves",
    profile: "Bold, Malty, Comforting",
    brew: "Steep at 200°F for 3-5 minutes to bring out its rich body.",
    snack_pairings: "Butter toast, jam scones, or classic English fry-up.",
    type: "black",
    series: "Classic"
  },
  7: {
    name: "Earl Grey Tea",
    description: "Refined and regal, our Earl Grey Tea is a fragrant blend of black tea and the bright, citrusy essence of bergamot. This timeless favorite delivers a layered taste with bold flavor and aromatic sophistication, making it ideal for afternoon tea or reflective evenings.",
    ingredients: "Black tea, Bergamot oil",
    profile: "Citrusy, Aromatic, Sophisticated",
    brew: "Steep at 200°F for 3-4 minutes to unlock its fragrant bouquet.",
    snack_pairings: "Tea cakes, lemon-glazed pastries, or buttery shortbread.",
    type: "black",
    series: "Classic"
  },
  8: {
    name: "Lady Grey Tea",
    description: "Elegant and refined, our Lady Grey Tea softens the boldness of traditional Earl Grey with citrus peel highlights for a lighter, brighter experience. The infusion of orange and lemon brings out a gentle floral charm, making it perfect for light sipping throughout the day.",
    ingredients: "Black tea, Orange peel, Lemon peel, Bergamot oil",
    profile: "Elegant, Light, Citrusy",
    brew: "Steep at 200°F for 3-4 minutes for delicate citrus clarity.",
    snack_pairings: "Macarons, lemon bars, or delicate sponge cakes.",
    type: "black",
    series: "Classic"
  },
  9: {
    name: "Oolong Tea",
    description: "Our Oolong Tea offers a complex balance of green tea freshness and black tea richness. Partially fermented and carefully roasted, it reveals a toasted nuttiness with floral undertones that evolve with each steep. A meditative tea for quiet contemplation.",
    ingredients: "Oolong tea leaves",
    profile: "Toasty, Floral, Smooth",
    brew: "Steep at 190°F for 3 minutes to explore its full depth.",
    snack_pairings: "Steamed dumplings, honey cakes, or almond biscotti.",
    type: "black",
    series: "Classic"
  },
  10: {
    name: "Pineapple Black Tea",
    description: "Transport yourself to a tropical paradise with our Pineapple Black Tea. This exotic blend pairs full-bodied black tea with sweet, succulent pineapple, resulting in a brew that's both bold and breezy. Great for a tropical twist on your iced tea routine.",
    ingredients: "Black tea, Dried pineapple, Natural flavors",
    profile: "Tropical, Sweet, Radiant",
    brew: "Steep at 200°F for 3-4 minutes for vibrant tropical depth.",
    snack_pairings: "Coconut macaroons, tropical fruit skewers, or mango tartlets.",
    type: "black",
    series: "Classic"
  },
  11: {
    name: "Strawberry Tea",
    description: "Bursting with berry brightness, our Strawberry Tea is a sweet celebration of summer’s favorite fruit. Blended with black tea for a bold base, this infusion offers a naturally fruity aroma and cheerful, juicy finish. Ideal hot or iced on warm days.",
    ingredients: "Black tea, Dried strawberries, Natural flavors",
    profile: "Fruity, Bright, Uplifting",
    brew: "Steep at 200°F for 3-4 minutes to highlight berry notes.",
    snack_pairings: "Strawberry scones, shortbread cookies, or berry parfaits.",
    type: "black",
    series: "Classic"
  },
  12: {
    name: "Buko Black Tea",
    description: "Savor the sweet, creamy indulgence of our Buko Black Tea—a tropical fusion of rich black tea and luscious coconut flakes. The flavor is silky and smooth, transporting you to a breezy island setting with every sip. A must for coconut lovers.",
    ingredients: "Black tea, Coconut flakes, Natural flavors",
    profile: "Creamy, Tropical, Indulgent",
    brew: "Steep at 200°F for 3-4 minutes for creamy depth.",
    snack_pairings: "Coconut macaroons, butter cookies, or cassava cake.",
    type: "black",
    series: "Premium"
  },
  13: {
    name: "Durian Black Tea",
    description: "Bold and daring, our Durian Black Tea infuses robust black tea with the unmistakable flavor of durian—a beloved fruit known for its rich, custardy complexity. This is a tea that commands attention and rewards those with adventurous palates.",
    ingredients: "Black tea, Durian essence",
    profile: "Bold, Exotic, Creamy",
    brew: "Steep at 200°F for 3-4 minutes to balance richness with aroma.",
    snack_pairings: "Sticky rice desserts, egg tarts, or pandan rolls.",
    type: "black",
    series: "Premium"
  },
  14: {
    name: "Mango Tea",
    description: "Radiant and fruity, our Mango Tea blends juicy tropical mangoes with the robust base of black tea. Each sip bursts with sunshine, balancing sweet mango notes with a gentle hint of tartness. It’s a tropical vacation in a cup.",
    ingredients: "Black tea, Dried mango, Natural flavors",
    profile: "Sweet, Tropical, Sunny",
    brew: "Steep at 200°F for 3-4 minutes for a vibrant, juicy cup.",
    snack_pairings: "Mango sticky rice, tropical fruit salad, or coconut bars.",
    type: "black",
    series: "Premium"
  },
  15: {
    name: "Sampaguita Tea",
    description: "A gentle tribute to the Philippines' national flower, our Sampaguita Tea offers a serene infusion of green tea and jasmine-like sampaguita blossoms. Light, floral, and refreshingly aromatic, it's a calming tea that nourishes the soul and celebrates heritage with grace.",
    ingredients: "Green tea, Sampaguita blossoms",
    profile: "Light, Floral, Aromatic",
    brew: "Steep at 175°F for 2 minutes to preserve delicate floral notes.",
    snack_pairings: "Rice cakes, jasmine mochi, or floral macarons.",
    type: "green",
    series: "Premium"
  }
};

  

export default productMap