import {  configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Usado para hacer state persistente en disco


import userSlice from './usuario';  //Importar userSlice.reducer creado en usuario.js
import videoSlice from './videos';  //Importar videoSlice.reducer creado en videos.js
import tareaSlice from './tareas';  //importar tareaSlice.reducer 


//Definir REDUX STORE === STATE GLOBAL
const slices = combineReducers({
    sliceUsuario : userSlice,   // userSlice es el substore de usuario
    sliceVideos  : videoSlice,  // videoSlice es el substore de videos.   Ambos se conbinan en "reducer" para hacerlos persisitir con redux-persist: 
    sliceTareas  : tareaSlice,  // tareaSlice es el substore de videos.
})

//Opcional. Configuracion de Persistencia de estados en disco creando un objeto persistConfig
// y combinandolo con los reducers de los slices
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [ 'sliceUsuario']//slices del state que se persisten en storage (nombres de los atributos del objeto reducer combinado)
    // blacklist: [ status ]  //Lista de atributos del state que no se persisten en el storage
}
const persistedReducer = persistReducer(persistConfig, slices);

//CREAR EL STORE con el reducer raiz resultante de combinar los slices(usuarios, videos, tareas)
// y la configuracion de persistencia
const store = configureStore( {   
    reducer: persistedReducer,
    middleware: getDefaultMiddleware ({
        serializableCheck: false,  //Evitar el error redux "non-serializable value was detected in an action..."
      })
});
console.log("STORE: ",store);
console.log("USER SLICE reducer:", userSlice);


export const persistor = persistStore(store);
export default store;