import { configureStore, createSlice } from "@reduxjs/toolkit";

// localStorage getting and storing in localStorageCart
const savedCart = localStorage.getItem("cart");
const localStorageCart = savedCart ? JSON.parse(savedCart) : [];

//create the Product Slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
       Veg: [
      { name: 'Tomato', price: 100.00, image: '/VegImages/tomato.webp' },
      { name: 'Potato', price: 40.00, image: '/VegImages/potato.jpeg' },
      { name: 'Onion', price: 60.00, image: '/VegImages/onion.avif' },
      { name: 'Carrot', price: 80.00, image: '/VegImages/carrot.avif' },
      { name: 'Broccoli', price: 120.00, image: '/VegImages/Broccoli.avif' },
      { name: 'Cabbage', price: 45.00, image: '/VegImages/Cabbage.jpeg' },
      { name: 'Cauliflower', price: 70.00, image: '/VegImages/Cauliflower.jpeg' },
      { name: 'Bell Pepper', price: 90.00, image: '/VegImages/Bell Pepper.jpeg' },
      { name: 'Brinjal', price: 75.00, image: '/VegImages/Brinjal.jpeg' },
      { name: 'Beetroot', price: 55.00, image: '/VegImages/Beetroot.jpeg' },
      { name: 'Chili', price: 50.00, image: '/VegImages/Chili.jpeg' },
      { name: 'Mushrooms', price: 150.00, image: '/VegImages/Mushrooms.jpeg' },
      { name: 'Pumpkin', price: 110.00, image: 'https://tse4.mm.bing.net/th/id/OIP.f_1Pjhdmt52DSyE7TAtW6gHaFC?rs=1&pid=ImgDetMain&o=7&rm=3' },
      { name: 'Zucchini', price: 65.00, image: 'https://thumbs.dreamstime.com/b/fresh-zucchini-vegetables-green-leaves-yellow-flowers-organic-natural-food-isolated-white-background-315224583.jpg' },
      { name: 'Sweet Corn', price: 95.00, image: 'https://tse2.mm.bing.net/th/id/OIP.L6-YcInKJkjQjXsptoYXyAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
      { name: 'Green Beans', price: 85.00, image: 'https://static.vecteezy.com/system/resources/previews/030/751/070/non_2x/fresh-green-bean-ai-generative-png.png' },
      { name: 'Radish', price: 40.00, image: 'https://tse4.mm.bing.net/th/id/OIP.tdLLqYptR0q0k6AHYzT0_gHaE9?rs=1&pid=ImgDetMain&o=7&rm=3' },
      { name: 'Leeks', price: 60.00, image: 'https://www.kindpng.com/picc/m/329-3293152_garden-leek-hd-png-download.png' },
      { name: 'Asparagus', price: 130.00, image: 'https://tse2.mm.bing.net/th/id/OIP.pKw0u6AbBmdiPhQzi4AyZwHaHa?pid=ImgDet&w=178&h=178&c=7&dpr=1.5&o=7&rm=3' },
      { name: 'Artichoke', price: 120.00, image: 'https://pngimg.com/uploads/artichoke/artichoke_PNG26.png' },
      { name: 'Fennel', price: 70.00, image: 'https://th.bing.com/th/id/OIP.RvhspJCpgABK9hotiyd1VwHaE8?w=286&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3' },
      { name: 'Sweet Potato', price: 90.00, image: 'https://img.freepik.com/premium-photo/sweet-potatoes-isolated-white-background_489827-687.jpg' },
      { name: 'Bok Choy', price: 100.00, image: 'https://static.vecteezy.com/system/resources/previews/045/147/188/non_2x/fresh-bok-choy-isolated-on-transparent-background-png.png' }
    ],
    NonVeg: [
      { name: 'Chicken', price: 220.00, image: '/NonVegImages/Chicken.jpeg' },
      { name: 'Mutton', price: 600.00, image: '/NonVegImages/Mutton.jpeg' },
      { name: 'Fish', price: 300.00, image: '/NonVegImages/Fish.jpg' },
      { name: 'Prawns', price: 450.00, image: '/NonVegImages/Prawns.jpeg' },
      { name: 'Crab', price: 500.00, image: '/NonVegImages/Crab.jpeg' },
      { name: 'Beef', price: 350.00, image: '/NonVegImages/Beef.jpg' },
      { name: 'Turkey', price: 380.00, image: '/NonVegImages/Turkey.jpg' },
      { name: 'Squid', price: 420.00, image: '/NonVegImages/Squid.JPG' },
      { name: 'Venison', price: 650.00, image: '/NonVegImages/Venison.jpg' },
      { name: 'Goat Meat', price: 320.00, image: '/NonVegImages/Goat Meat.jpg' },
      { name: 'Salmon Fillet', price: 750.00, image: '/NonVegImages/Salmon Fillet.jpeg' },
      { name: 'Tuna Steak', price: 680.00, image: '/NonVegImages/Tuna Steak.jpg' },
      { name: 'Rabbit', price: 500.00, image: '/NonVegImages/Rabbit.jpg' },
      { name: 'Chicken Thighs', price: 220.00, image: '/NonVegImages/Chicken Thighs.jpg' },
      { name: 'Chicken Wings', price: 180.00, image: '/NonVegImages/Chicken Wings.jpg' },
      { name: 'Ostrich', price: 700.00, image: '/NonVegImages/Ostrich.jpeg' }
    ],
    Milk: [
      { name: 'milk', price: 60.00, image: '/MilkImages/milk.jpeg' },
      { name: 'curd', price: 50.00, image: '/MilkImages/curd.jpeg' },
      { name: 'butter', price: 90.00, image: '/MilkImages/butter.jpeg' },
      { name: 'cheese', price: 120.00, image: '/MilkImages/cheese copy.jpeg' },
      { name: 'paneer', price: 100.00, image: '/MilkImages/paneer.jpeg' },
      { name: 'ghee', price: 500.00, image: '/MilkImages/ghee copy.jpeg' },
      { name: 'cream', price: 110.00, image: '/MilkImages/cream copy.jpeg' },
      { name: 'flavored milk', price: 70.00, image: '/MilkImages/flavored milk.jpeg' },
      { name: 'yogurt', price: 55.00, image: 'https://th.bing.com/th/id/OIP._HVeiPyHTBQTsMKwa4ibewHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3' },
      { name: 'milk powder', price: 400.00, image: '/MilkImages/milk powder.jpeg' }
    ],
    Chocolates: [
      { name: 'milk chocolate', price: 150.00, image: '/ChocolateImages/milk chocolate.jpg' },
      { name: 'dark chocolate', price: 70.00, image: '/ChocolateImages/dark chocolate.jpeg' },
      { name: 'white chocolate', price: 60.00, image: '/ChocolateImages/white chocolate.jpg' },
      { name: 'hazelnut choco', price: 90.00, image: '/ChocolateImages/hazelnut chocolate.jpg' },
      { name: 'almond chocolate', price: 85.00, image: '/ChocolateImages/almond chocolate.webp' },
      { name: 'mint chocolate', price: 65.00, image: '/ChocolateImages/mint chocolate.jpg' },
      { name: 'orange chocolate', price: 75.00, image: '/ChocolateImages/orange chocolate.jpg' },
      { name: 'caramel chocolate', price: 80.00, image: '/ChocolateImages/caramel chocolate.jpg' },
      { name: 'truffle chocolate', price: 100.00, image: '/ChocolateImages/truffle chocolate.jpg' },
      { name: 'fruit & nut chocolate', price: 95.00, image: '/ChocolateImages/fruit & nut chocolate.jpg' }
    ]
  }, 
    reducers: {}
});

//create the Cart Slice
let cartSlice = createSlice({
    name: 'cart',
    initialState: localStorageCart,
    reducers: {
        AddToCart: (state, inputItem) => {
            const item = state.find(item => item.name === inputItem.payload.name)
            if (item) {
                item.quantity += 1;
            }
            else {
                state.push({ ...inputItem.payload, quantity: 1 });
            }
        },
        IncCart: (state, inputItem) => {
            const item = state.find(item => item.name === inputItem.payload.name)
            if (item) {
                item.quantity += 1;
            }
        },
        DecCart: (state, inputItem) => {
            const index = state.findIndex(item => item.name === inputItem.payload.name);
            if (index !== -1) {
                state[index].quantity -= 1;
                if (state[index].quantity === 0) {
                    state.splice(index, 1); // remove the item from the array
                }
            }
        },
        RemoveCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
        },
        ClearCart: () => [],


    }
})

//export cartSlice  reducers
export let { AddToCart, IncCart, DecCart, RemoveCart, ClearCart } = cartSlice.actions;



//create the Order Slice
let orderSlice = createSlice({
    name: 'orders',
    initialState: [],
    reducers: {
        OrderDetails: (state, actions) => {
            const OrderDetails = actions.payload
            state.push(OrderDetails);
        }
    }

})

//export order slice reducrs
export let { OrderDetails } = orderSlice.actions;



//create the User Slice
let userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isAuthenticated: false,
        currentUser: null
    },
    reducers: {
        registerUser: (state, action) => {
            state.users.push(action.payload);
        },
        logInUser: (state, action) => {
            const foundUser = state.users.find(
                user =>
                    user.username === action.payload.username &&
                    user.password === action.payload.password
            );
            if (foundUser) {
                state.isAuthenticated = true;
                state.currentUser = foundUser;
            } else {
                alert("Invalid credentials");
                navigate("/SignIn");
                
            }
        },
        logOutUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        }
    }
})


//export user slice reducrs
export let { registerUser, logInUser, logOutUser } = userSlice.actions;



//configure the store
const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        orders: orderSlice.reducer,
        users: userSlice.reducer
    }
});

// save cart data to local storage
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart));
});

//export the store
export default store;
