export const Host = "https://erugo-world-api.appzero.services"
export let country = {
    ko: {
        
    },
    eng: {

    }
}

export const changeLang = (code) => {
    lang.selection = country[code]
}

export const lang = {
    selection: country.ko
}
