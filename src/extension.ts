import * as vscode from 'vscode';

// support languages
const languages = [
	"html",
	"javascript",
	"javascriptreact",
	"typescript",
	"typescriptreact",
	"vue"
]

// match like: log.xxx
const matchReg = /(^|\s)log.(\S*$)/

class Completion implements vscode.CompletionItemProvider {
	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
	): vscode.ProviderResult<vscode.CompletionItem[]> {
		const subline = document.lineAt(position).text.substring(0, position.character)
		const matched = subline.match(matchReg) || []
		if(!matched) {
			return
		}
		const replace = matched[0].trim()
		const keyword = matched[2]
		const completion = new vscode.CompletionItem(
			replace,
			vscode.CompletionItemKind.Snippet
		)
		completion.insertText = new vscode.SnippetString(`console.log('${keyword}', \${1})`)
		completion.range = new vscode.Range(
			new vscode.Position(position.line, position.character - replace.length),
			new vscode.Position(position.line, position.character)
		)
		completion.documentation = `console.log('${keyword}', )`
		return [completion]
	}
}

export function activate(context: vscode.ExtensionContext) {
	const provider = vscode.languages.registerCompletionItemProvider(
		languages,
		new Completion(),
		'.'
	)
	context.subscriptions.push(provider);
}
