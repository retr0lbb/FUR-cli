import { GluegunToolbox } from "gluegun";

module.exports ={
    name: "start",
    description: "start your nodejs project",
    run: async(toolbox: GluegunToolbox) =>{
        const {
            template,
            print,
            filesystem,
            prompt
        } = toolbox;
        const fs = filesystem
        const projectName = await prompt.ask({
            type: "input",
            name: "projectName",
            message: "Nome do projeto: ?"
        })
        const projectVersion = await prompt.ask({
            type: "input",
            name: "projectVersion",
            message: "Versão do projeto"
        })
        console.log(projectName.projectName)
        await toolbox.system.spawn("npm install express");

        const packageJsonContent = {
            name: projectName.projectName,
            version: projectVersion.projectVersion,
            description: "no description",
            main: "src/app.js",
            type: "module",
            scripts: {
                dev: "node ."
            },
            dependencies: {
                express: '^4.17.1'
            },
            devDependencies: {},
        };
        


        fs.write('package.json', JSON.stringify(packageJsonContent, null, 2));
        fs.write('.gitignore', 'node_modules\n');
        



        template.generate({
            template: "app.js.ejs",
            target: "src/app.js"
        })


        print.success("Projeto iniciado")


    }
}