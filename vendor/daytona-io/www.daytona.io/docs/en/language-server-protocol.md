# Language Server Protocol

Daytona provides Language Server Protocol (LSP) support through sandbox instances. This enables advanced language features like code completion, diagnostics, and more.

## Create LSP servers

Daytona provides methods to create LSP servers. The `path_to_project` argument is relative to the current sandbox working directory when no leading `/` is used. The working directory is specified by WORKDIR when it is present in the Dockerfile, and otherwise falls back to the user's home directory.


```python
from daytona import Daytona, LspLanguageId

# Create Sandbox
daytona = Daytona()
sandbox = daytona.create()

# Create LSP server for Python
lsp_server = sandbox.create_lsp_server(
    language_id=LspLanguageId.PYTHON,
    path_to_project="workspace/project"
)
```


```typescript
import { Daytona, LspLanguageId } from '@daytona/sdk'

// Create sandbox
const daytona = new Daytona()
const sandbox = await daytona.create({
  language: 'typescript',
})

// Create LSP server for TypeScript
const lspServer = await sandbox.createLspServer(
  LspLanguageId.TYPESCRIPT,
  'workspace/project'
)
```


```ruby
require 'daytona'

# Create Sandbox
daytona = Daytona::Daytona.new
sandbox = daytona.create

# Create LSP server for Python
lsp_server = sandbox.create_lsp_server(
  language_id: Daytona::LspServer::Language::PYTHON,
  path_to_project: 'workspace/project'
)
```


```go
// Create sandbox
client, err := daytona.NewClient()
if err != nil {
	log.Fatal(err)
}

ctx := context.Background()
sandbox, err := client.Create(ctx, nil)
if err != nil {
	log.Fatal(err)
}

// Get LSP service for Python
lsp := sandbox.Lsp(types.LspLanguagePython, "workspace/project")
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.LspServer;
import io.daytona.sdk.Sandbox;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Sandbox sandbox = daytona.create();
            LspServer lspServer = sandbox.createLspServer(
                    LspServer.LspLanguageId.PYTHON.getValue(),
                    "workspace/project");
        }
    }
}
```


### Supported languages

The supported languages for creating LSP servers with Daytona are defined by the `LspLanguageId` enum:

| Enum Value                     | Description                            |
| ------------------------------ | -------------------------------------- |
| **`LspLanguageId.PYTHON`**     | Python language server                 |
| **`LspLanguageId.TYPESCRIPT`** | TypeScript/JavaScript language server  |

## Start LSP servers

Daytona provides methods to start LSP servers.


```python
lsp = sandbox.create_lsp_server("typescript", "workspace/project")
lsp.start()  # Initialize the server
# Now ready for LSP operations
```


```typescript
const lsp = await sandbox.createLspServer('typescript', 'workspace/project')
await lsp.start() // Initialize the server
// Now ready for LSP operations
```


```ruby
lsp = sandbox.create_lsp_server(
  language_id: Daytona::LspServer::Language::PYTHON,
  path_to_project: 'workspace/project'
)
lsp.start  # Initialize the server
# Now ready for LSP operations
```


```go
lsp := sandbox.Lsp(types.LspLanguagePython, "workspace/project")
err := lsp.Start(ctx)  // Initialize the server
if err != nil {
	log.Fatal(err)
}
// Now ready for LSP operations
```


```java
LspServer lsp = sandbox.createLspServer("typescript", "workspace/project");
lsp.start("typescript", "workspace/project");
// Now ready for LSP operations
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/start' \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "languageId": "",
  "pathToProject": ""
}'
```


## Stop LSP servers

Daytona provides methods to stop LSP servers.


```python
# When done with LSP features
lsp.stop()  # Clean up resources
```


```typescript
// When done with LSP features
await lsp.stop() // Clean up resources
```


```ruby
# When done with LSP features
lsp.stop  # Clean up resources
```


```go
// When done with LSP features
err := lsp.Stop(ctx)  // Clean up resources
if err != nil {
	log.Fatal(err)
}
```


```java
// When done with LSP features
lsp.stop("typescript", "workspace/project"); // Clean up resources
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/stop' \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "languageId": "",
  "pathToProject": ""
}'
```


## Code completions

Daytona provides methods to get code completions for a specific position in a file.


```python
completions = lsp_server.completions(
    path="workspace/project/main.py",
    position={"line": 10, "character": 15}
)
print(f"Completions: {completions}")
```


```typescript
const completions = await lspServer.completions('workspace/project/main.ts', {
  line: 10,
  character: 15,
})
console.log('Completions:', completions)
```


```ruby
completions = lsp_server.completions(
  path: 'workspace/project/main.py',
  position: { line: 10, character: 15 }
)
puts "Completions: #{completions}"
```


```go
completions, err := lsp.Completions(ctx, "workspace/project/main.py",
	types.Position{Line: 10, Character: 15},
)
if err != nil {
	log.Fatal(err)
}
fmt.Printf("Completions: %v\n", completions)
```


```java
var completions = lsp.completions(
    "typescript",
    "workspace/project",
    "workspace/project/Main.java",
    10,
    15);
System.out.println("Completions: " + completions);
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/completions' \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "context": {
    "triggerCharacter": "",
    "triggerKind": 1
  },
  "languageId": "",
  "pathToProject": "",
  "position": {
    "character": 1,
    "line": 1
  },
  "uri": ""
}'
```


## File notifications

Daytona provides methods to notify the LSP server when files are opened or closed. This enables features like diagnostics and completion tracking for the specified files.

### Open file

Notifies the language server that a file has been opened for editing.


```python
# Notify server that a file is open
lsp_server.did_open("workspace/project/main.py")
```


```typescript
// Notify server that a file is open
await lspServer.didOpen('workspace/project/main.ts')
```


```ruby
# Notify server that a file is open
lsp_server.did_open('workspace/project/main.py')
```


```go
// Notify server that a file is open
err := lsp.DidOpen(ctx, "workspace/project/main.py")
if err != nil {
	log.Fatal(err)
}
```


```java
// Notify server that a file is open
lsp.didOpen("typescript", "workspace/project", "workspace/project/Main.java");
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/did-open' \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "languageId": "",
  "pathToProject": "",
  "uri": ""
}'
```


### Close file

Notifies the language server that a file has been closed. This allows the server to clean up resources associated with that file.


```python
# Notify server that a file is closed
lsp_server.did_close("workspace/project/main.py")
```


```typescript
// Notify server that a file is closed
await lspServer.didClose('workspace/project/main.ts')
```


```ruby
# Notify server that a file is closed
lsp_server.did_close('workspace/project/main.py')
```


```go
// Notify server that a file is closed
err := lsp.DidClose(ctx, "workspace/project/main.py")
if err != nil {
	log.Fatal(err)
}
```


```java
// Notify server that a file is closed
lsp.didClose("typescript", "workspace/project", "workspace/project/Main.java");
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/did-close' \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{
  "languageId": "",
  "pathToProject": "",
  "uri": ""
}'
```


## Document symbols

Daytona provides methods to retrieve symbols (functions, classes, variables, etc.) from a document.


```python
symbols = lsp_server.document_symbols("workspace/project/main.py")
for symbol in symbols:
    print(f"Symbol: {symbol.name}, Kind: {symbol.kind}")
```


```typescript
const symbols = await lspServer.documentSymbols('workspace/project/main.ts')
symbols.forEach((symbol) => {
  console.log(`Symbol: ${symbol.name}, Kind: ${symbol.kind}`)
})
```


```ruby
symbols = lsp_server.document_symbols('workspace/project/main.py')
symbols.each do |symbol|
  puts "Symbol: #{symbol.name}, Kind: #{symbol.kind}"
end
```


```go
symbols, err := lsp.DocumentSymbols(ctx, "workspace/project/main.py")
if err != nil {
	log.Fatal(err)
}
for _, symbol := range symbols {
	fmt.Printf("Symbol: %v\n", symbol)
}
```


```java
var symbols = lsp.documentSymbols(
    "typescript",
    "workspace/project",
    "workspace/project/Main.java");
for (var symbol : symbols) {
    System.out.println("Symbol: " + symbol.getName() + ", Kind: " + symbol.getKind());
}
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/document-symbols?languageId=&pathToProject=&uri='
```


## Sandbox symbols

Daytona provides methods to search for symbols across all files in the sandbox.


```python
symbols = lsp_server.sandbox_symbols("MyClass")
for symbol in symbols:
    print(f"Found: {symbol.name} at {symbol.location}")
```


```typescript
const symbols = await lspServer.sandboxSymbols('MyClass')
symbols.forEach((symbol) => {
  console.log(`Found: ${symbol.name} at ${symbol.location}`)
})
```


```ruby
symbols = lsp_server.sandbox_symbols('MyClass')
symbols.each do |symbol|
  puts "Found: #{symbol.name} at #{symbol.location}"
end
```


```go
symbols, err := lsp.SandboxSymbols(ctx, "MyClass")
if err != nil {
	log.Fatal(err)
}
for _, symbol := range symbols {
	fmt.Printf("Found: %v\n", symbol)
}
```


```java
var symbols = lsp.workspaceSymbols("MyClass", "typescript", "workspace/project");
for (var symbol : symbols) {
    System.out.println("Found: " + symbol.getName() + " at " + symbol.getLocation());
}
```


```bash
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/lsp/workspacesymbols?query=&languageId=&pathToProject='
```