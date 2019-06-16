import { names } from './constant';
const defaultdata = {
    loading: false,
    data: names,
    main: names,
    error: null,
    Selected: []
};


export const autocomplete = (state = defaultdata, action) => {
    switch (action.type) {
        case 'SEARCH_AUTO_START':
            return {
                ...state,
                loading: true
            }
        case 'REMOVE_SEARCH': {
            let {main } = state;
            if (main.findIndex(val => val.id === action.item.id) < 0)
                main.push(action.item)
            return {
                ...state,
                loading: false,
                error: null,
                Selected: state.Selected.filter(val => val.id !== action.item.id),
                main: main,
                data: []
            }
        }
        case 'ADD_SEARCH': {
            let { Selected, main } = state;
            if (Selected.findIndex(val => val.id === action.item.id) < 0)
                Selected.push(action.item)
            main = main.filter(val => val.id !== action.item.id)
            return {
                ...state,
                loading: false,
                error: null,
                Selected: Selected,
                main: main,
                data: []
            }
        }
        case 'SEARCH_AUTO':
            return {
                ...state,
                loading: false,
                error: null,
                data: searchby(state.main, action.search),
            }
        default:
            return state
    }
}
const searchby = (items, searchText) => {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    let j = items.filter(item => {
        if (item.text.toLowerCase().includes(searchText))
            return true
        else
            return false
    });
    return j
}
