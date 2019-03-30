
import { GluegunToolbox } from 'gluegun'
import { filesystem as fs } from 'gluegun/filesystem'


// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
    toolbox.foo = () => {
        toolbox.print.info('called foo extension')
    }

    // enable this if you want to read configuration in from
    // the current folder's package.json (in a "mycli" property),
    // mycli.config.json, etc.
    // toolbox.config = {
    //   ...toolbox.config,
    //   ...toolbox.config.loadConfig(process.cwd(), "mycli")
    // }
    toolbox.insertInFile = (filePath, findPattern, content, insertAfter = true) => {
        // read full file - Not a great idea if we ever touch large files
        const data = fs.read(filePath, 'utf8')
        let newContents = ''
        // get the full line of first occurance
        const finder = new RegExp(`.*${findPattern}.*`, '')
        const matches = data.match(finder)

        // Quick error check
        if (matches === null) throw new Error(`'${findPattern}' was not found in file ${filePath}.`)

        if (insertAfter) {
            newContents = data.replace(finder, `${matches[0]}\n${content}`)
        } else {
            newContents = data.replace(finder, `${content}\n${matches[0]}`)
        }

        // overwrite file with modified contents
        fs.write(filePath, newContents)
    }

    toolbox.prependToFile = (filePath, prependString) => {
        const data = fs.read(filePath, 'utf8')
        fs.write(filePath, prependString + data)
    }


    toolbox.replaceInFile = (filePath, findPattern, content) => {
        // read full file - Not a great idea if we ever touch large files
        let data = fs.read(filePath, 'utf8')
        // get the full line of first occurance
        let finder = new RegExp(`.*${findPattern}.*`, '')
        let matches = data.match(finder)
        // Quick error check
        if (matches && matches.length > 0) {
            // replace contents
            const newContents = data.replace(finder, `${content}`)

            // overwrite file with modified contents
            fs.write(filePath, newContents)
        } else {
            console.warn(`${findPattern} not found`)
        }
    }

    toolbox.isInFile = (filePath, findPattern) => {
        let data = fs.read(filePath, 'utf8')
        let finder = new RegExp(`.*${findPattern}.*`, '')
        return !!data.match(finder)
    }
}


