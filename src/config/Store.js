import { createStore } from "redux"

const initialState={
    user : {},
    music : [],
    number : 1,
    song : {},
    relacionados : [],
    playSong : ""
}

const reducer = (state = initialState , action) => {
    const {type, user, number, music , song , relacionados } = action
    if(type === "@agregarSesion"){
        if(!user){
            return {
                ...state,
                user : false,
            }
        }else{
            return {
                ...state,
                user : user,
            }
        }
    }

    if(type === "@cambiarInterfaz"){
        return {
            ...state,
            number : number
        }
    }

    if(type === "@agregarMusic"){
        if(music.length > 0){
            return {
                ...state,
                music : music
            }
        }else{
            return state
        }
    }

    if(type === "@reproducirMusic"){
        const genero = song.gender.toUpperCase()
        const Autor = song.author.toUpperCase()
        const name = song.name
        const filtroGenero = music.filter(data => data.gender.toUpperCase() === genero && data.name !== name )
        const filtroAutor = music.filter(data => data.author.toUpperCase() === Autor && data.name !== name )
        const relacionados = filtroGenero.concat(filtroAutor)
        if(relacionados.length > 0){
            let musicRecomend = []
            for (let i = 0; i < 5; i++) {
                const element = relacionados[i];
                if(element !== undefined){
                    musicRecomend.push(element)
                }
            }
            return {
                ...state,
                song : song,
                relacionados : musicRecomend,
                playSong : song.music
            }
        }else{

            const allMusic = music.filter(data => data.name !== name)
            let musicRecomend = []
            for (let i = 0; i < 5; i++) {
                const element = allMusic[i];
                if(element !== undefined){
                    musicRecomend.push(element)
                }
            }
            return {
                ...state,
                song : song,
                relacionados : musicRecomend,
                playSong : song.music
            }
        }

    }

    if(type === "@agregarRelacionados"){
        return {
            ...state,
            relacionados : relacionados
        }
    }

    if(type === "@eliminarCancion"){
        const newMusic = music.filter(data => data.name !== song.name)
        return {
            ...state,
            music : newMusic,
            user : user
        }
    }

    
    return state
}


export default createStore(reducer)