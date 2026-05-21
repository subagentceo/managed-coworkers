# Daytona Documentation

Daytona is an open-source, secure and elastic infrastructure for running AI-generated code. Daytona provides full composable computers — [sandboxes](https://www.daytona.io/docs/en/sandboxes.md) — with complete isolation, a dedicated kernel, filesystem, network stack, and allocated vCPU, RAM, and disk.

Sandboxes are the core component of the Daytona platform, spinning up in under 90ms from code to execution and running any code in Python, TypeScript, and JavaScript. Built on OCI/Docker compatibility, massive parallelization, and unlimited persistence, sandboxes deliver consistent, predictable environments for agent workflows.

Agents and developers interact with sandboxes programmatically using the Daytona SDKs, API, and CLI. Operations span sandbox lifecycle management, filesystem operations, process and code execution, and runtime configuration. Our stateful environment snapshots enable persistent agent operations across sessions, making Daytona the ideal foundation for AI agent architectures.

- **Daytona SDKs**: [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Python](https://www.daytona.io/docs/en/python-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk.md), [Java](https://www.daytona.io/docs/en/java-sdk.md)
- **Daytona API**: [RESTful API](https://www.daytona.io/docs/en/tools/api.md#daytona) ([OpenAPI spec](https://www.daytona.io/docs/openapi.json)), [Toolbox API](https://www.daytona.io/docs/en/tools/api.md#daytona-toolbox) ([OpenAPI spec](https://www.daytona.io/docs/toolbox-openapi.json))
- **Daytona CLI**: [Mac/Linux](https://www.daytona.io/docs/en/getting-started.md#cli), [Windows](https://www.daytona.io/docs/en/getting-started.md#cli), [Reference](https://www.daytona.io/docs/en/tools/cli.md)

:::tip
For faster development with AI agents and assistants, use our LLMs context files: [llms.txt](https://www.daytona.io/docs/llms.txt) and [llms-full.txt](https://www.daytona.io/docs/llms-full.txt), [agent skills](https://github.com/daytona/skills), and markdown pages by appending `.md` to URLs.

&nbsp;

```text
npx skills add https://github.com/daytona/skills --skill daytona
```
:::

## 1. Create an account

Open the [Daytona Dashboard ↗](https://app.daytona.io/) to create your account. Daytona supports account creation using an email and password, or by connecting your Google or GitHub account.

## 2. Obtain an API key

Generate an API key from the [Daytona Dashboard ↗](https://app.daytona.io/dashboard/keys) or using the [Daytona API](https://www.daytona.io/docs/en/tools/api.md#daytona/tag/api-keys/POST/api-keys) to authenticate SDK requests and access Daytona services. Daytona supports multiple options to configure your environment and API keys: [in code](https://www.daytona.io/docs/en/configuration.md#configuration-in-code), [environment variables](https://www.daytona.io/docs/en/configuration.md#environment-variables), [.env file](https://www.daytona.io/docs/en/configuration.md#env-file), and [default values](https://www.daytona.io/docs/en/configuration.md#default-values).

## 3. Install the SDK

Install the Daytona **Python**, **TypeScript**, **Ruby**, **Go**, or **Java** SDKs to interact with sandboxes.


```bash
pip install daytona
```


```bash
npm install @daytona/sdk
```


```bash
gem install daytona
```


```bash
go get github.com/daytonaio/daytona/libs/sdk-go
```


**Gradle**

Add the Daytona SDK dependency to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("io.daytona:sdk-java:0.1.0")
}
```

**Maven**

Add the Daytona SDK dependency to your `pom.xml`:

```xml
<dependency>
  <groupId>io.daytona</groupId>
  <artifactId>sdk-java</artifactId>
  <version>0.1.0</version>
</dependency>
```


## 4. Create a Sandbox

Create a sandbox to run your code securely in an isolated environment.


```python
# Import the Daytona SDK
from daytona import Daytona, DaytonaConfig

# Define the configuration
config = DaytonaConfig(api_key="YOUR_API_KEY") # Replace with your API key

# Initialize the Daytona client
daytona = Daytona(config)

# Create the Sandbox instance
sandbox = daytona.create()
```


```typescript
// Import the Daytona SDK
import { Daytona } from '@daytona/sdk'

// Initialize the Daytona client
const daytona = new Daytona({ apiKey: 'YOUR_API_KEY' }) // Replace with your API key

// Create the Sandbox instance
const sandbox = await daytona.create()
```


```ruby
require 'daytona'

# Initialize the Daytona client
config = Daytona::Config.new(api_key: 'YOUR_API_KEY') # Replace with your API key

# Create the Daytona client
daytona = Daytona::Daytona.new(config)

# Create the Sandbox instance
sandbox = daytona.create
```


```go
package main

import (
	"context"
	"fmt"

	"github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
	config := &types.DaytonaConfig{
        APIKey: "YOUR_API_KEY", // Replace with your API key
    }
	client, _ := daytona.NewClientWithConfig(config)
	ctx := context.Background()
	sandbox, _ := client.Create(ctx, nil)
	fmt.Println(sandbox.ID)
}
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.DaytonaConfig;

public class Main {
    public static void main(String[] args) {
        DaytonaConfig config = new DaytonaConfig.Builder()
            .apiKey("YOUR_API_KEY")
            .build();

        try (Daytona daytona = new Daytona(config)) {
            Sandbox sandbox = daytona.create();
            System.out.println(sandbox.getId());
        }
    }
}
```


```bash
curl https://app.daytona.io/api/sandbox \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{}'
```


```shell
daytona create
```


## 5. Write and run code

Create a program that runs code inside a sandbox. The following snippets are examples of "Hello World" programs that run securely inside a sandbox.


```python
# Import the Daytona SDK
from daytona import Daytona, DaytonaConfig

# Define the configuration
config = DaytonaConfig(api_key="YOUR_API_KEY") # Replace with your API key

# Initialize the Daytona client
daytona = Daytona(config)

# Create the Sandbox instance
sandbox = daytona.create()

# Run the code securely inside the Sandbox
response = sandbox.process.code_run('print("Hello World")')

# Check the response
if response.exit_code != 0:
  print(f"Error: {response.exit_code} {response.result}")
else:
  print(response.result)

# Clean up
sandbox.delete()
```


```typescript
// Import the Daytona SDK
import { Daytona } from '@daytona/sdk'

// Initialize the Daytona client
const daytona = new Daytona({ apiKey: 'YOUR_API_KEY' }) // Replace with your API key

// Create the Sandbox instance
const sandbox = await daytona.create({
  language: 'typescript',
})

// Run the code securely inside the Sandbox
const response = await sandbox.process.codeRun('console.log("Hello World")')

// Check the response
if (response.exitCode !== 0) {
  console.error(`Error: ${response.exitCode} ${response.result}`)
} else {
  console.log(response.result)
}

// Clean up
await sandbox.delete()
```


```ruby
require 'daytona'

# Initialize the Daytona client
config = Daytona::Config.new(api_key: 'YOUR_API_KEY')
daytona = Daytona::Daytona.new(config)

# Create the Sandbox instance
sandbox = daytona.create

# Run the code securely inside the Sandbox
response = sandbox.process.code_run(code: 'print("Hello World")')
puts response.result
```


```go
// Import the Daytona SDK
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    // Define the configuration
    config := &types.DaytonaConfig{
        APIKey: "YOUR_API_KEY", // Replace with your API key
    }

    // Initialize the Daytona client
    client, err := daytona.NewClientWithConfig(config)
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.Background()

    // Create the Sandbox instance
    params := types.SnapshotParams{
        SandboxBaseParams: types.SandboxBaseParams{
            Language: types.CodeLanguagePython,
        },
    }
    sandbox, err := client.Create(ctx, params)
    if err != nil {
        log.Fatal(err)
    }

    // Run the code securely inside the Sandbox
    result, err := sandbox.Process.ExecuteCommand(ctx, `echo "Hello World"`)

    // Check the response
    if err != nil {
        log.Fatalf("Error: %v", err)
    }
    if result.ExitCode != 0 {
        log.Printf("Error: %d %s", result.ExitCode, result.Result)
    } else {
        log.Println(result.Result)
    }

    // Clean up
    sandbox.Delete(ctx)
}
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.DaytonaConfig;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.ExecuteResponse;

public class Main {
    public static void main(String[] args) {
        DaytonaConfig config = new DaytonaConfig.Builder()
            .apiKey("YOUR_API_KEY") // Replace with your API key
            .build();

        try (Daytona daytona = new Daytona(config)) {
            // Create the Sandbox instance
            Sandbox sandbox = daytona.create();

            // Run the code securely inside the Sandbox
            ExecuteResponse response = sandbox.getProcess().executeCommand("echo \"Hello World\"");

            // Check the response
            if (response.getExitCode() != 0) {
                System.err.println("Error: " + response.getExitCode() + " " + response.getResult());
            } else {
                System.out.println(response.getResult());
            }

            // Clean up
            sandbox.delete();
        }
    }
}
```


## Summary

By following the steps above, you successfully create a Daytona account, obtain an API key, install the SDK, create a sandbox, write code, and run it securely in a sandbox.

## Next steps

Use the following resources to interact with sandboxes:

- Learn more about Daytona with the [getting started](https://www.daytona.io/docs/en/getting-started.md) and [sandboxes](https://www.daytona.io/docs/en/sandboxes.md) guides
- View [examples](https://www.daytona.io/docs/en/getting-started.md#examples) for common sandbox operations and best practices
- Explore [guides](https://www.daytona.io/docs/en/guides.md) to connect Daytona with [Claude](https://www.daytona.io/docs/en/guides/claude.md), [OpenCode](https://www.daytona.io/docs/en/guides/opencode/opencode-web-agent.md), [Codex](https://www.daytona.io/docs/en/guides/codex/codex-sdk-interactive-terminal-sandbox.md), [LangChain](https://www.daytona.io/docs/en/guides/langchain/langchain-data-analysis.md) and more