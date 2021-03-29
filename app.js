const db = require('./helpers/db');
const inquirer = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

console.clear();

const main = async() => {
    console.log('Hola Mundo');
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = db.leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirer.inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await inquirer.leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoTareas(0);
                break;
            case '3':
                tareas.listadoTareas(1);
                break;
            case '4':
                tareas.listadoTareas(2);
                break;
            case '5':
                const ids = await inquirer.listadoTareas(tareas.listadoArr,0);
                tareas.cambiarEstadoTareas(ids);
                break;
            case '6':
                const id = await inquirer.listadoTareas(tareas.listadoArr,1);
                if(id === '0') continue;
                const ok = await inquirer.confirmar('¿Esta seguro?');
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada');
                }
                break
            default:
                break;
        }

        db.guardarDB(tareas.listadoArr);

        await inquirer.pausa();
    } while (opt !== '0');
}

main();