import { GluegunToolbox } from "gluegun";

module.exports = {
  name: "generate:module",
  desciption: "Gera um modulo para armazenar classes controllers entre outros",
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters, template, filesystem } = toolbox;
    const fs = filesystem;

    const moduleName: string = parameters.first;

    if (!moduleName) {
      print.error("Module name must be provided");
      return;
    }

    const controllerTarget = `src/modules/${moduleName}/controllers/${moduleName}Controller.js`;
    const routerTarget = `src/modules/${moduleName}/routes/${moduleName}Router.js`;

    template.generate({
      template: "controller.js.ejs",
      target: controllerTarget,
      props: { moduleName: moduleName },
    });
    print.info(`${print.checkmark} Controller gerado com sucesso`);

    template.generate({
      template: "router.js.ejs",
      target: routerTarget,
      props: { moduleName: moduleName },
    });
    print.info(`${print.checkmark} Rota gerada com sucesso`);

    const appFile: string = "src/app.js";
    const appFileContent = fs.read(appFile);

    const importStatement = `import ${moduleName}Router from "./modules/${moduleName}/routes/${moduleName}Router.js";`;

    // Adiciona o importStatement após a linha 15 do arquivo app.js
    const updatedAppFileContent = `${importStatement}\n${appFileContent}`;

    // Adiciona o app.use na linha 6 do arquivo app.js
    const addUse = `app.use("/${moduleName}", ${moduleName}Router);`;
    const lines = updatedAppFileContent.split("\n");
    lines.splice(7, 0, addUse);

    const updatedAppWithUse = lines.join("\n");

    fs.write(appFile, updatedAppWithUse);

    print.success("Modulo gerado e importado com sucesso");
  },
};
