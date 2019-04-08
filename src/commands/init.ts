
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
            copyBoilerplate
        } = toolbox

        let projectName = parameters.first;

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
                copyBoilerplate('react_boilerplate', projectName, { overwrite: true })
                if (dirExist(projectName)) {
                    info('proyecto creado correctamente')
                } else {
                    error('Ha ocurrido un error creando el proyecto')
                }
            }
        }
    },
}
