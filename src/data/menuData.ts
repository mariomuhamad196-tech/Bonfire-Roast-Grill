import imgSteak from "../assets/images/bonfire_steak3d_1782203586973.jpg";
import imgBurger from "../assets/images/bonfire_burger_1782203617911.jpg";
import imgDory from "../assets/images/bonfire_dory_1782203631701.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  spicyLevel?: number; // 0 to 3
}

export const CATEGORIES = [
  { id: "all", name: "Semua Menu" },
  { id: "signature", name: "Panggangan Khas" },
  { id: "steak", name: "Steak" },
  { id: "burger", name: "Burger" },
  { id: "pasta", name: "Pasta" },
  { id: "quesadillas", name: "Quesadillas" },
  { id: "appetizer", name: "Makanan Pembuka" },
  { id: "soup", name: "Sup" },
  { id: "salad", name: "Salad" },
  { id: "dessert", name: "Makanan Penutup" },
  { id: "waffle", name: "Wafel" },
  { id: "icecream", name: "Es Krim & Parfait" },
  { id: "milkshake", name: "Milkshake" },
  { id: "drink", name: "Minuman" }
];

export const MENU_ITEMS: MenuItem[] = [
  // === 1. SIGNATURE GRILL (Panggangan Khas) ===
  {
    id: "sg-1",
    name: "Ayam Peri-Peri",
    description: "Ayam segar dipanggang dengan bumbu khas Peri-Peri Afrika Selatan yang pedas menyegarkan, disajikan dengan kentang goreng dan saus garlic mayo.",
    price: 90000,
    category: "signature",
    image: imgDory, // Using a solid placeholder/asset
    isFeatured: true,
    isBestSeller: true,
    spicyLevel: 2
  },
  {
    id: "sg-2",
    name: "Iga Bakar BBQ",
    description: "Iga sapi premium Bandung pilihan yang dimasak lambat hingga empuk, dibalur saus BBQ spesial buatan rumah, disajikan dengan jagung bakar manis.",
    price: 155000,
    category: "signature",
    image: imgSteak,
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "sg-3",
    name: "Daging Sandung Lamur Panggang 12 Jam",
    description: "Wagyu Beef Brisket yang diasap dan dipanggang selama 12 jam dengan kayu buah persik untuk rasa smoky sejati. Meleleh di mulut.",
    price: 138000,
    category: "signature",
    image: imgSteak,
    isFeatured: true
  },
  {
    id: "sg-4",
    name: "Sapi Asap Sambal Matah",
    description: "Daging sapi asap premium khas Bonfire disajikan hangat dengan sambal matah Bali yang segar dan aromatik di atas nasi daun jeruk.",
    price: 98000,
    category: "signature",
    isBestSeller: true,
    spicyLevel: 2
  },
  {
    id: "sg-5",
    name: "Ayam Panggang Rosemary",
    description: "Setengah ekor ayam panggang herba rosemary segar, butter bawang putih, madu hutan, disajikan dengan tumis buncis muda.",
    price: 85000,
    category: "signature"
  },

  // === 2. STEAK ===
  {
    id: "st-1",
    name: "Steak Sirloin Australia",
    description: "200 gram Australian Grain-Fed Sirloin Steak premium yang juicy dengan lapisan lemak gurih di tepinya. Disajikan dengan pilihan saus dan kentang.",
    price: 198000,
    category: "steak",
    image: imgSteak,
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "st-2",
    name: "Steak Tenderloin Australia",
    description: "200 gram Australian Grass-Fed Tenderloin Steak yang sangat lembut, rendah lemak, dengan kelezatan mentega terbaik.",
    price: 210000,
    category: "steak",
    image: imgSteak,
    isFeatured: true
  },
  {
    id: "st-3",
    name: "Sir & Turf",
    description: "Kombinasi mewah antara Canadian Lobster Tail berlapis butter garlic dengan 150 gram Australian Sirloin, saus bearnaise premium.",
    price: 218000,
    category: "steak",
    isFeatured: true,
    isNew: true
  },
  {
    id: "st-4",
    name: "Steak T-Bone Black Angus",
    description: "450 gram T-Bone Angus🥩 premium menggabungkan kelembutan tenderloin dan sirloin dalam satu potongan raksasa beraroma kayu arang.",
    price: 330000,
    category: "steak",
    image: imgSteak,
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "st-5",
    name: "Wagyu Ribeye MB5+",
    description: "250 gram Wagyu Ribeye dengan marbling score MB5+ yang luar biasa empuk dan juicy, meleleh saat disantap.",
    price: 295000,
    category: "steak",
    isNew: true
  },

  // === 3. BURGER ===
  {
    id: "bg-1",
    name: "On Fire Burger",
    description: "Burger dengan keju meleleh, tumpukan patty wagyu tebal, bawang bombay karamel, disajikan dengan saus pedas rahasia Bonfire.",
    price: 95000,
    category: "burger",
    image: imgBurger,
    isFeatured: true,
    isBestSeller: true,
    spicyLevel: 1
  },
  {
    id: "bg-2",
    name: "Burger Iga Bakar",
    description: "Burger unik dengan suwiran iga bakar BBQ yang empuk melimpah, coleslaw segar, acar timun rumahan, kentang wedges.",
    price: 88000,
    category: "burger",
    image: imgBurger,
    isFeatured: true
  },
  {
    id: "bg-3",
    name: "Burger Daging Sandung Lamur",
    description: "Burger dngan isian double slow-smoked brisket, onion ring renyah, saus keju cheddar hangat, dan saus BBQ klasik.",
    price: 95000,
    category: "burger",
    image: imgBurger,
    isBestSeller: true
  },
  {
    id: "bg-4",
    name: "Burger Ayam Khas Selatan",
    description: "Ayam goreng renyah buttermilk ala Southern, saus mustard madu, keju cheddar, sayur segar dalam bun brioche empuk.",
    price: 75000,
    category: "burger",
    image: imgBurger
  },
  {
    id: "bg-5",
    name: "Classic Truffle Beef Burger",
    description: "Single beef patty, keju Swiss, saus aioli truffle hitam aromatik premium yang memanjakan selera.",
    price: 85000,
    category: "burger",
    isNew: true
  },

  // === 4. PASTA ===
  {
    id: "ps-1",
    name: "Spageti Bolognese",
    description: "Pasta spageti klasik dialiri saus daging sapi cincang renyah asam manis tomat segar, parutan keju Grana Padano.",
    price: 72000,
    category: "pasta"
  },
  {
    id: "ps-2",
    name: "Pasta Carbonara Truffle",
    description: "Fettuccine lembut dengan krim parmesan bermentega premium, potongan daging asap, dan minyak truffle hitam yang wangi melimpah.",
    price: 85000,
    category: "pasta",
    isBestSeller: true
  },
  {
    id: "ps-3",
    name: "Pasta Ayam Khas Selatan",
    description: "Penne pasta dipadu ayam krispi pedas hangat dengan saus krim cajun, paprika manis, dan daun peterseli.",
    price: 78000,
    category: "pasta",
    spicyLevel: 1
  },
  {
    id: "ps-4",
    name: "Salmon Aglio Olio",
    description: "Spaghetti klasik aglio olio disajikan dengan keju parmesan, potongan ikan salmon panggang segar berempah, minyak zaitun murni.",
    price: 98000,
    category: "pasta",
    isFeatured: true,
    isBestSeller: true,
    spicyLevel: 1
  },
  {
    id: "ps-5",
    name: "Mac & Cheese Smoked Brisket",
    description: "Makaroni panggang krim keju melimpah dengan taburan daging brisket asap wangi di atasnya.",
    price: 82000,
    category: "pasta"
  },

  // === 5. QUESADILLAS ===
  {
    id: "qd-1",
    name: "Spicy Beef Quesadillas",
    description: "Tortilla panggang lipat rasa meksiko dengan isian daging sapi pedas, jagung manis, mozzarella molor, guac segar, dan salsa tomat bumbu ketumbar.",
    price: 78000,
    category: "quesadillas",
    isBestSeller: true,
    spicyLevel: 1
  },
  {
    id: "qd-2",
    name: "BBQ Chicken Quesadillas",
    description: "Tortilla panggang isi ayam BBQ smoky melimpah, paprika, bawang merah, lumeran keju mozarela dan cheddar impor.",
    price: 72000,
    category: "quesadillas"
  },
  {
    id: "qd-3",
    name: "Three-Cheese Veggie Quesadilla",
    description: "Paduan keju Mozzarella, Cheddar, dan Monterey Jack dicampur bayam merah aromatik segar dlm lipatan tortilla renyah.",
    price: 68000,
    category: "quesadillas"
  },

  // === 6. APPETIZERS (Makanan Pembuka) ===
  {
    id: "ap-1",
    name: "Garlic Butter Escargot",
    description: "Escargot panggang hangat dalam mentega bawang putih perancis premium dan herba, disajikan dengan roti baguette renyah.",
    price: 65000,
    category: "appetizer",
    isNew: true
  },
  {
    id: "ap-2",
    name: "Bonfire Chicken Wings",
    description: "Sayap ayam renyah dilumuri saus pedas manis rahasia, disantap bersama saus cocolan keju biru aromatik.",
    price: 58000,
    category: "appetizer",
    isBestSeller: true,
    spicyLevel: 1
  },
  {
    id: "ap-3",
    name: "Onion Ring Tower",
    description: "Tumpukan bawang bombay krispi dilapisi tepung roti renyah keemasan gurih, dengan saus tartar pedas.",
    price: 45000,
    category: "appetizer"
  },
  {
    id: "ap-4",
    name: "Truffle Fries with Parmesan",
    description: "Kentang goreng renyah wangi minyak truffle, ditaburi keju parmesan melimpah dan rempah peterseli segar.",
    price: 48000,
    category: "appetizer"
  },
  {
    id: "ap-5",
    name: "Smoked Brisket Nachos",
    description: "Keripik tortilla jagung renyah dilapisi daging brisket asap cincang, saus keju cheddar hangat, salsa segar, jalapeño, dan sour cream.",
    price: 75000,
    category: "appetizer"
  },

  // === 7. SOUPS (Sup) ===
  {
    id: "sp-1",
    name: "Sup Ikan Dory Lemon",
    description: "Sup kaldu hangat gurih asam segar berisi potongan filet dory lembut, tomat ceri, wangi daun ketumbar.",
    price: 65000,
    category: "soup"
  },
  {
    id: "sp-2",
    name: "Wild Mushroom Cream Soup",
    description: "Sup krim kental dari aneka jamur liar segar pilihan, aroma minyak truffle, dan roti panggang mentega.",
    price: 55000,
    category: "soup",
    isBestSeller: true
  },
  {
    id: "sp-3",
    name: "Roasted Pumpkin Soup",
    description: "Sup krim labu kuning manis panggang yang kaya rasa, disajikan hangat dengan krim asam segar di atasnya.",
    price: 48000,
    category: "soup"
  },

  // === 8. SALAD ===
  {
    id: "sl-1",
    name: "Classic Caesar Salad",
    description: "Daun selada romaine segar renyah, serutan keju parmesan, telur rebus, crouton roti prancis, disiram saus Caesar lembut.",
    price: 58000,
    category: "salad"
  },
  {
    id: "sl-2",
    name: "Caesar Salad with Grilled Chicken",
    description: "Caesar salad klasik berbalur ayam dada filet bakar berempah yang melimpah protein.",
    price: 68000,
    category: "salad",
    isBestSeller: true
  },
  {
    id: "sl-3",
    name: "Bonfire Grilled Peach Salad",
    description: "Kombinasi salad hijau organik dengan potongan buah persik yang dipanggang manis, keju feta gurih asid, kacang kenari panggang caramel.",
    price: 62000,
    category: "salad",
    isNew: true
  },
  {
    id: "sl-4",
    name: "Smoked Salmon & Avocado Salad",
    description: "Irisan ikan salmon asap lembut premium, buah alpukat mentega segar, tomat ceri, saus dressing lemon ketumbar zesty.",
    price: 78000,
    category: "salad"
  },

  // === 9. DESSERTS (Makanan Penutup) ===
  {
    id: "ds-1",
    name: "Molten Chocolate Lava Cake",
    description: "Kue cokelat panggang hangat dengan pusat cokelat Belgia cair meleleh dramatis, disajikan dengan es krim vanila manis dingin.",
    price: 48000,
    category: "dessert",
    isBestSeller: true
  },
  {
    id: "ds-2",
    name: "Classic New York Cheesecake",
    description: "Cheesecake panggang tekstur beludru krimi berpadu dengan siraman saus stroberi merah asam manis menyegarkan.",
    price: 52000,
    category: "dessert"
  },
  {
    id: "ds-3",
    name: "Apple Crumble Tart",
    description: "Pai apel panggang kayu manis hangat bertabur crumble renyah gurih, sesendok es krim karamel garam.",
    price: 45000,
    category: "dessert",
    isNew: true
  },
  {
    id: "ds-4",
    name: "S'mores Skillet Dip",
    description: "Marshmallow panggang meleleh kecokelatan di wajan besi panas di atas limpahan cokelat pekat cair hangat, disajikan bersama biskuit graham.",
    price: 45000,
    category: "dessert"
  },

  // === 10. WAFFLES (Wafel) ===
  {
    id: "wf-1",
    name: "Buttermilk Waffle Classic",
    description: "Wafel buttermilk renyah dan empuk buatan segar, disajikan dengan salted butter impor dan sirup maple asli.",
    price: 42000,
    category: "waffle"
  },
  {
    id: "wf-2",
    name: "Nutella & Banana Waffle",
    description: "Wafel renyah hangat bercampur siraman cokelat Nutella melimpah, irisan buah pisang ambon segar, dan kacang almond iris panggang.",
    price: 48000,
    category: "waffle",
    isBestSeller: true
  },
  {
    id: "wf-3",
    name: "Buttermilk Fried Chicken & Waffle",
    description: "Kombinasi legendaris wafel gurih dengan ayam goreng renyah buttermilk khas Amerika Selatan, disiram sirup saus manis pedas.",
    price: 78000,
    category: "waffle",
    isNew: true
  },

  // === 11. ICE CREAM & PARFAIT (Es Krim) ===
  {
    id: "ic-1",
    name: "Bonfire Signature Berries Parfait",
    description: "Lapisan es krim yogurt stroberi dingin, remahan granola madu gurih renyah, saus buah beri liar asam segar dlm gelas elegan.",
    price: 45000,
    category: "icecream",
    isBestSeller: true
  },
  {
    id: "ic-2",
    name: "Warm Salted Caramel Parfait",
    description: "Es krim vanila premium, es krim cokelat, siraman karamel asin hangat gurih manis, kacang hazelnut panggang, whipped cream lembut.",
    price: 42000,
    category: "icecream"
  },
  {
    id: "ic-3",
    name: "Triple Scoop Gelato Selection",
    description: "Pilihan 3 rasa gelato premium Italia (Cokelat hitam pedas manis, Matcha kelapa muda, Strawberry sorbet segar).",
    price: 46000,
    category: "icecream"
  },

  // === 12. MILKSHAKES ===
  {
    id: "ms-1",
    name: "Double Chocolate Brownie Milkshake",
    description: "Minuman kocok cokelat kental melimpah diblender dengan kue brownies cokelat, whipped cream tinggi, sirup cokelat hitam.",
    price: 45000,
    category: "milkshake",
    isBestSeller: true
  },
  {
    id: "ms-2",
    name: "Lotus Biscoff Speculoos Shake",
    description: "Kombinasi speculoos manis hangat, es krim karamel kocok, biskuit renyah Lotus Biscoff utuh di atasnya.",
    price: 48000,
    category: "milkshake",
    isNew: true
  },
  {
    id: "ms-3",
    name: "Strawberry Cream Cheese Shake",
    description: "Es krim stroberi premium diblender dengan krim keju gurih lembut, saus stroberi segar asam manis menggelitik lidah.",
    price: 45000,
    category: "milkshake"
  },
  {
    id: "ms-4",
    name: "Matcha Mint Shake",
    description: "Bubuk teh hijau Jepang asli, es krim vanila premium, ekstrak daun mint segar mendinginkan tenggorokan.",
    price: 42000,
    category: "milkshake"
  },

  // === 13. DRINKS (Minuman) ===
  {
    id: "dr-1",
    name: "Flamin' Sunset Mocktail",
    description: "Kombinasi segar sari jus buah jeruk, markisa matang manis, sirup delima merah delima, soda berkarbonasi dingin.",
    price: 38000,
    category: "drink",
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: "dr-2",
    name: "Smoked Rosemary Lemonade",
    description: "Minuman perasan jus lemon segar dengan madu organik yang diinfus asap herba rosemary segar dibakar langsung di depan Anda.",
    price: 36000,
    category: "drink",
    isNew: true
  },
  {
    id: "dr-3",
    name: "Bandung Iced Lychee Tea",
    description: "Teh hitam dingin klasik berkualitas beraroma manis buah leci, berisi buah leci manis utuh melimpah.",
    price: 32000,
    category: "drink"
  },
  {
    id: "dr-4",
    name: "Warm Spiced Ginger Tea",
    description: "Teh rempah hangat berisikan sari jahe merah bakar Bandung, sereh harum, batang kayu manis, gula aren asli.",
    price: 28000,
    category: "drink"
  },
  {
    id: "dr-5",
    name: "Eksotis Avocado Coffee Iced",
    description: "Jus buah alpukat mentega segar kental dipadu espresso arabika murni, es krim cokelat Belgia gelap.",
    price: 42000,
    category: "drink",
    isBestSeller: true
  },
  {
    id: "dr-6",
    name: "Kopi Gula Aren Sekali",
    description: "Signature double espresso murni dicampur susu segar krimi dan siraman gula aren premium lokal Bandung.",
    price: 32000,
    category: "drink"
  },
  {
    id: "dr-7",
    name: "Air Mineral Premium",
    description: "Satu botol air mineral Equil murni dingin yang menyegarkan dahaga.",
    price: 25000,
    category: "drink"
  }
];
