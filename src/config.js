let loadedModule;

if(process.env.NODE_ENV === "development"){
    loadedModule = require('../client.config.dev.json')
}else{
    loadedModule = require('../client.config.prod.json')
}

export const config = loadedModule;