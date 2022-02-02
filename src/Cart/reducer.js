
export const initialState = {
    basket: [],
    itemCount: 0,
    total: 0,
};



export const sumItems = basket => {

    return {
        basket: JSON.parse(localStorage.getItem('cart')),
        itemCount: basket.reduce((total, prod) => total + prod.quantity , 0),
        total: basket.reduce((total, prod) => total + (parseFloat(prod.currentPrice) * prod.quantity), 0)
    }
}

const reducer = (state, action) => {
    //console.log(action);

    switch (action.type) {
        case "ADD_TO_BASKET":

            if (!state.basket.find((prod) => prod.productId === action.item.productId)) {
                state.basket.push({
                    ...action.item,
                    quantity: 1,
                })
            }

            return {
                ...state,
                basket: [...state.basket],
                ...sumItems(state.basket)
            }


        case 'EMPTY_BASKET':
            localStorage.removeItem('cart');
            return {
                ...state,
                basket: [],
                itemCount: 0,
                total: 0,
            }

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.productId === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket,
                ...sumItems(newBasket),
            }

        case 'INCREASE':
            const increaseIndex = state.basket.findIndex((prod) => prod.productId === action.id);
            let newBasket2 = [...state.basket];
            newBasket2[increaseIndex].quantity++;

            return {
                ...state,
                basket: newBasket2,
                ...sumItems(newBasket2),
            }

        case 'DECREASE':
            const decreaseIndex = state.basket.findIndex((prod) => prod.productId === action.id);
            let newBasket3 = [...state.basket];
            newBasket3[decreaseIndex].quantity--;

            if(newBasket3[decreaseIndex].quantity === 0){
                newBasket3.splice(decreaseIndex, 1);
            }

            return {
                ...state,
                basket: newBasket3,
                ...sumItems(newBasket3),
            }

        default:
            return state;
    }
};

export default reducer;