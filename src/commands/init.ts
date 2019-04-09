
import { GluegunToolbox } from 'gluegun'

module.exports = {
    name: 'init',
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            prompt,
            print: { info, error },
            strings: { trim },
            dirExist,
            createProjectFolder,
            copyBoilerplate,
            genCommons,
            filesystem
        } = toolbox

        let projectName = trim(parameters.first.toLocaleLowerCase())

        if (!projectName) {
            const result = await prompt.ask({
                type: 'input',
                name: 'name',
                message: 'project name --> ',
            })
            if (result && result.name) {
                projectName = trim(result.name.toLocaleLowerCase())
            }
        }


        if (!projectName) {
            error('No  project name specified!')
            return
        } else {
            if (dirExist(projectName)) {
                error(`Ya existe un directorio con el nombre ${projectName}`)
            } else {

                createProjectFolder(projectName)
                copyBoilerplate(filesystem.path(__dirname, '../../boilerplate'), projectName, { overwrite: true })
                genCommons(projectName)

                if (dirExist(projectName)) {
                    info('proyecto creado correctamente')
                } else {
                    error('Ha ocurrido un error creando el proyecto')
                }
            }
        }
    },
}
