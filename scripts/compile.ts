import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {
    console.log(
        "========================================="
    );
    console.log("compile script is running,let find funC code to compile...")
    
    const compileResult = await compileFunc({
        targets:["./contracts/main.fc"],
        sources:(x)=>fs.readFileSync(x).toString("utf8")
    });


    if(compileResult.status === "error"){
        console.log("- OH No:Compilation errors ! The compiler output was:")
        console.log()
        process.exit(1)
    }

   const hexArtifact ="build/main.compiled.json"
   fs.writeFileSync(
    hexArtifact, JSON.stringify({
        hex:Cell.fromBoc(Buffer.from(compileResult.codeBoc,"base64"))[0]
        .toBoc()
        .toString("hex")
    })
   )

   console.log("----Compiled code saved to " + hexArtifact)
}

compileScript()