import * as vscode from 'vscode';
import { registerSQLToolCommands } from './sqlTool/command';
export function activate(context: vscode.ExtensionContext) {
	console.log("插件已激活")
	registerSQLToolCommands(context);
    

     
     
}