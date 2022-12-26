import { $authHost, $host } from "./index";

export const fetchBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const deleteProductInBasket = async (productBasket) => {
    const {data} = await $authHost.delete('api/basket'+`/${productBasket}`)
    return data
}