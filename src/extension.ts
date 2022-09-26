import * as vscode from 'vscode';

// support languages
const languages = [
	"html",
	"javascript",
	"javascriptreact",
	"typescript",
	"typescriptreact",
	"vue"
];

// match like: word?
const logReg = /\b(\S*)\?/;

class Completion implements vscode.CompletionItemProvider {
	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
	): vscode.ProviderResult<vscode.CompletionItem[]> {
		const linePrefix = document.lineAt(position).text.substring(0, position.character);
		const matched = linePrefix.match(logReg);
		if(!matched) {
			return;
		}
		const [full, variable] = matched;
		const replace = `console.log('${variable}', ${variable})`;
		const completion = new vscode.CompletionItem(
			replace,
			vscode.CompletionItemKind.Snippet,
		);
		completion.label = full;
		completion.insertText = new vscode.SnippetString(replace);
		completion.range = new vscode.Range(
			position.line, 
			position.character - full.length, 
			position.line, 
			position.character
		);
		return [completion];
	}
}

export function activate(context: vscode.ExtensionContext) {
	const provider = vscode.languages.registerCompletionItemProvider(
		languages,
		new Completion(),
		'?'
	);
	context.subscriptions.push(provider);
	vscode.window.showInformationMessage('log.dot message');
	console.log('log.dot start');
}
