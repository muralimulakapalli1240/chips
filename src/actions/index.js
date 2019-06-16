export const REMOVE_SEARCH ="REMOVE_SEARCH";
export const SEARCH_AUTO ="SEARCH_AUTO";

export const removesearch = (item) => ({
    type: REMOVE_SEARCH,
    item
})
export const searchauto = (search) => ({
    type: SEARCH_AUTO,
    search
})
export const addsearch = (item) => ({
    type: "ADD_SEARCH",
    item
})
