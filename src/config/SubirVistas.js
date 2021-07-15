import db from './db.js'

export  const subirVistas = async (data) => {
    const consulta = await db.firestore.collection("Usuarios").where("id", "==", data.idUsuario).get()
    const id = consulta.docs[0].id
    const idUser = consulta.docs[0].data().id
    const name = consulta.docs[0].data().name
    const playList = consulta.docs[0].data().playList
    const songs = consulta.docs[0].data().songs
    let cancion = {}
    consulta.docs.forEach(element => 
        cancion = element.data().songs.find(dato => dato.name === data.name)
    )

    const newViews = parseInt(cancion.views) + 1
    const songView = {
        author: cancion.author,
        description: cancion.description,
        gender: cancion.gender,
        idUsuario: cancion.idUsuario,
        imagen: cancion.imagen,
        imagenNombre: cancion.imagenNombre,
        music: cancion.music,
        musicNombre: cancion.musicNombre,
        name: cancion.name,
        views : newViews
    }

    const Songs = songs.filter(dato =>  dato.name !== data.name) 
    Songs.push(songView)
    const newDatos = {
        id : idUser,
        name : name,
        playList : playList,
        songs : Songs
    }

    db.firestore.collection("Usuarios").doc(id).update(newDatos)
}