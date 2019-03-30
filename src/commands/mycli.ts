
import { GluegunToolbox } from 'gluegun'
const figlet = require('figlet');

module.exports = {
  name: 'mycli',
  run: async (toolbox: GluegunToolbox) => {
    const { print,
      //insertInFile 
    } = toolbox

    figlet.text('MyCli', {
      font: 'Standard'
    }, function (err, data) {
      if (err) {
        print.error('Something went wrong...');
        console.dir(err);
        return;
      }
      print.warning(data)
    });
    //insertInFile(process.cwd() + '/readme.md', 'A CLI for mycli.', 'agregado desde cli')
  },
}
