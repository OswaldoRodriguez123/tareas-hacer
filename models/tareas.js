const Tarea = require('./tarea')

class Tareas{

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })


        return listado;
    }

    crearTarea(desc = ''){
        const tarea = new Tarea;
        tarea.desc = desc;
        this._listado[tarea.id] = tarea;
    }

    listadoTareas(estado = 0){
        let mostrar = false;
        let i = 0;
        this.listadoArr.forEach(tarea => {
            mostrar = false;
            if(estado == 0){
                mostrar = true;
                i++;
            }else if(estado == 1 && tarea.completadoEn){
                mostrar = true;
                i++;
            }else if(estado == 2 && !tarea.completadoEn){
                mostrar = true;
                i++;
            } 
            if(mostrar){
                let mensaje = `${(i+'.').green} ${tarea.desc}`;
                if(estado == 0){
                    mensaje += `:: ${tarea.completadoEn != null ? 'Completada'.green : 'Pendiente'.red}`
                }else if(estado == 1){
                    mensaje += `:: ${tarea.completadoEn.green}`
                }
                console.log(mensaje);
            }
        })
    }

    cambiarEstadoTareas(ids = {}){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })
        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                tarea.completadoEn = null;
            }
        })
    }
    
    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;