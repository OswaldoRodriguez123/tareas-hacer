require(`colors`);
const inquirer = require("inquirer");

const inquirerMenu = async() => {

    const questions = [
        {
            type: `list`,
            name: `opcion`,
            message: `¿Que desea hacer?`,
            choices: [
                {
                    value: `1`,
                    name: `${'1.'.green} Crear tarea`
                },
                {
                    value: `2`,
                    name: `${'2.'.green} Listar tareas`
                },
                {
                    value: `3`,
                    name: `${'3.'.green} Listar tareas completadas`
                },
                {
                    value: `4`,
                    name: `${'4.'.green} Listar tareas pendientes`
                },
                {
                    value: `5`,
                    name: `${'5.'.green} Completar tarea(s)`
                },
                {
                    value: `6`,
                    name: `${'6.'.green} Borrar tarea`
                },
                {
                    value: `0`,
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ];    
    
    console.clear();
    console.log(`=======================`.green);
    console.log(` Seleccione una opcion:`.white)
    console.log(`=======================\n`.green);

    const {opcion} = await inquirer.prompt(questions)

    return opcion;
}

const pausa = async() => {
    const question = [
        {
            type: `input`,
            name: `enter`,
            message: `Presione ENTER para continuar`
        }
    ];
    return await inquirer.prompt(question)
}

const leerInput = async(message) =>{
    const question = [
        {
            type: `input`,
            name: `desc`,
            message,
            validate(value){
                if(value.length === 0){
                    return `Por favor ingrese un valor`;
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareas = async(tareas = [], tipo) => {
    const choices = tareas.map((tarea,i) => {
        choice =  {
            value: tarea.id,
            name: `${(i+1+'.').green} ${tarea.desc}`
        }
        if(tipo == 0){
            choice.checked = tarea.completadoEn ? true : false;
        }
        return choice;
    })
    if(tipo == 1){
        choices.unshift({
            value: '0',
            name: '0.'.green + ' Cancelar'
        })
        const questions = [
            {
                type: `list`,
                name: `id`,
                message: `Borrar`,
                choices
            }
        ] 
        const {id} = await inquirer.prompt(questions);
        return id; 
    }else{
        const questions = [
            {
                type: `checkbox`,
                name: `ids`,
                message: `Selecciones`,
                choices
            }
        ]
        const {ids} = await inquirer.prompt(questions);
        return ids;
    }
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    return await inquirer.prompt(question);
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareas,
    confirmar
}