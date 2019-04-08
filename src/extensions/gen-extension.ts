
import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
    toolbox.genCommons = async (projectName) => {
        await toolbox.template.generate({
            template: 'README.md.ejs',
            target: `${projectName}/README.md`,
            props: { projectName },
        })
        await toolbox.template.generate({
            template: 'package.json.ejs',
            target: `${projectName}/package.json`,
            props: { projectName },
        })
    }
}
