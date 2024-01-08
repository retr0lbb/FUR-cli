import { GluegunToolbox } from "gluegun";

module.exports = {
    name: "generate:module",
    desciption: "Gera um modulo para armazenar classes controllers entre outros",
    run: async(toolbox: GluegunToolbox) =>{
        const {
            print,
            parameters,
            template,
            filesystem
        } = toolbox
        const fs = filesystem


        const moduleName: string = parameters.first;

        if(!moduleName){
            print.error("Module name must be provided");
            return;
        }
        template.generate({
            template: "controller.js.ejs",
            target: `src/modules/${moduleName}/controllers/${moduleName}Controller.js`,
            props: {moduleName: moduleName}
        })
        print.info(`${print.checkmark} Controller gerado com sucesso`)
        template.generate({
            template: "router.js.ejs",
            target: `src/modules/${moduleName}/routes/${moduleName}Router.js`,
            props: {moduleName: moduleName}
        })
        print.info(`${print.checkmark} Rota gerada com sucesso`)


        const appFile: string = "src/app.js";
        const appFileContent = fs.read(appFile);

        const importStatement = `const usersRouter = require(\'./modules/${moduleName}/routes/${moduleName}Router\');`;
        const updatedAppFileContent = `${importStatement}\n${appFileContent}`;

        fs.write(appFile, updatedAppFileContent);

        print.success("Modulo gerado e importado com sucesso");
        
    }
}