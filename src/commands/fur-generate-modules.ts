import { GluegunToolbox } from "gluegun";

module.exports = {
    name: "generate:module",
    desciption: "Gera um modulo para armazenar classes controllers entre outros",
    run: async(toolbox: GluegunToolbox) =>{
        const {
            print,
            parameters,
            template
        } = toolbox


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
        print.success(`Controller gerado com sucesso`)
        template.generate({
            template: "router.js.ejs",
            target: `src/modules/${moduleName}/routes/${moduleName}Router.js`,
            props: {moduleName: moduleName}
        })
        print.success(`Router gerado com sucesso`)

    }
}