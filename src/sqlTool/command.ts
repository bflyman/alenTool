import * as vscode from 'vscode';



export function registerSQLToolCommands(context: vscode.ExtensionContext) {
    registerCommand(context, 'alenTool.SqlTool.convertToIntInQueryParams', ConvertToIntInQueryParamsCallback);
    registerCommand(context, 'alenTool.SqlTool.convertToVarcharQueryParams', ConvertToVarcharQueryParamsCallback);   
}
// 定义并导出你的命令处理函数
function registerCommand(context: vscode.ExtensionContext, commandId: string, callback: (...args: any[]) => void) {
    const disposable = vscode.commands.registerCommand(commandId, callback);
     
    // 将其加入到订阅中，确保插件卸载时正确销毁
    context.subscriptions.push(disposable);
}

function ConvertToIntInQueryParamsCallback(){
     const docText=getAllTextDocuments();
     const list=splitLine(docText).map(x => `${x}`).join(",");
     const result = `in (${list})`;
    appendTextToDocument(result)
}

function ConvertToVarcharQueryParamsCallback(){
     const docText=getAllTextDocuments();
     const list=splitLine(docText).map(x => `${x}`).join(",");
     const result = `in (${list})`;
    appendTextToDocument(result)
}   

function splitLine(text: string): string[]{
   return text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
}

function getAllTextDocuments(): string  {
    const documents = vscode.window.activeTextEditor?.document;
    if (!documents) {
        return '';

    }
    return documents.getText();
}
function appendTextToDocument(text: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('没有打开的编辑器');
    return;
  }

  const document = editor.document;

  // 文档末尾位置：总字符长度对应的位置
  const endPosition = document.positionAt(document.getText().length);

  editor.edit((editBuilder) => {
    // 在末尾插入；如果想换行后再加，text 前面加 '\n'
    editBuilder.insert(endPosition, '\n' + text);
 
  }).then((success) => {
    if (success) {
      vscode.window.showInformationMessage('已追加到文档末尾');
   
    } else {
      vscode.window.showErrorMessage('追加失败');
    }
  });
}