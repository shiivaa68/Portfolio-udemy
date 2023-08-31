import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCatch = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const catchResult = await fileCatch.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (catchResult) {
          return catchResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // console.log("on Load", args);
        // tabdil be balaei shod code ro kotah kard
        // if (args.path === "index.js") {
        //   return {
        //     loader: "jsx",
        //     contents: inputCode,
        //   };
        // }
        // check to see if we have already fetched this file
        // and if it is in the catch
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
        const style =document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style)
        `;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store data in catch
        await fileCatch.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log("on Load", args);
        // tabdil be balaei shod code ro kotah kard
        // if (args.path === "index.js") {
        //   return {
        //     loader: "jsx",
        //     contents: inputCode,
        //   };
        // }
        // check to see if we have already fetched this file
        // and if it is in the catch
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // store data in catch
        await fileCatch.setItem(args.path, result);
        return result;
      });
    },
  };
};
