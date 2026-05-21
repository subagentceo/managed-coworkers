# Getting Started

This section introduces core concepts, common workflows, and next steps for using Daytona.

## Dashboard

[Daytona Dashboard ↗](https://app.daytona.io/) is a visual user interface where you can manage sandboxes, access API keys, view usage, and more.
It serves as the primary point of control for managing your Daytona resources.

## SDKs

Daytona provides [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk.md), and [Java](https://www.daytona.io/docs/en/java-sdk.md) SDKs to programmatically interact with sandboxes. They support sandbox lifecycle management, code execution, resource access, and more.

## CLI

Daytona provides command-line access to core features for interacting with Daytona Sandboxes, including managing their lifecycle, snapshots, and more.

To interact with Daytona Sandboxes from the command line, install the Daytona CLI:


  ```bash
  brew install daytonaio/cli/daytona
  ```


  ```bash
  powershell -Command "irm https://get.daytona.io/windows | iex"
  ```


After installing the Daytona CLI, use the `daytona` command to interact with Daytona Sandboxes from the command line.

To upgrade the Daytona CLI to the latest version:


```bash
brew upgrade daytonaio/cli/daytona
```


```bash
powershell -Command "irm https://get.daytona.io/windows | iex"
```


To view all available commands and flags, see the [CLI reference](https://www.daytona.io/docs/en/tools/cli.md).

## API

Daytona provides a RESTful API for interacting with Daytona Sandboxes, including managing their lifecycle, snapshots, and more. 
It serves as a flexible and powerful way to interact with Daytona from your own applications.

To interact with Daytona Sandboxes from the API, see the [API reference](https://www.daytona.io/docs/en/tools/api.md).

## MCP server

Daytona provides a Model Context Protocol (MCP) server that enables AI agents to interact with Daytona Sandboxes programmatically. The MCP server integrates with popular AI agents including Claude, Cursor, and Windsurf.

To set up the MCP server with your AI agent:

```bash
daytona mcp init [claude/cursor/windsurf]
```

For more information, see the [MCP server documentation](https://www.daytona.io/docs/en/mcp.md).

## Multiple runtime support

The [TypeScript SDK](https://www.daytona.io/docs/en/typescript-sdk.md) ships as a dual ESM/CJS package and works out of the box in **Node.js**, **Bun**, **Next.js**, **Nuxt.js**, **Remix**, **Vite SSR**, **AWS Lambda**, and **Azure Functions** without any extra configuration.

For **Cloudflare Workers**, set the Node.js compatibility flag in your `wrangler.toml`:

```toml
compatibility_flags = ["nodejs_compat"]
```

For **Deno**, install with `deno add npm:@daytona/sdk` or import directly with the `npm:` specifier:

```typescript
import { Daytona, Image } from 'npm:@daytona/sdk'
```

For **browser apps with Vite** (or any browser bundler), install [`vite-plugin-node-polyfills`](https://www.npmjs.com/package/vite-plugin-node-polyfills) and add it to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

  plugins: [nodePolyfills({ globals: { Buffer: true, process: true, global: true } })],
})
```

The SDK uses Node's `Buffer` for binary data (downloaded files, multipart bodies). Browsers don't ship `Buffer`, so the polyfill provides it. Without it, basic operations like `Image.base()` and `daytona.list()` still work, but methods that handle binary payloads (`fs.downloadFile`, `fs.downloadFiles`) will throw.

Some runtimes don't expose the full set of Node.js APIs (browsers and edge runtimes have no filesystem, no `crypto`, etc.). Methods that depend on those APIs throw a clear runtime error instead of silently producing wrong results.

## Guides

Daytona provides a comprehensive set of [guides](https://www.daytona.io/docs/en/guides.md) to help you get started. The guides cover a wide range of topics, from basic usage to advanced topics, and showcase various types of integrations between Daytona and other tools.

## Examples

Daytona provides quick examples for common sandbox operations and best practices. <br />
The examples are based on the Daytona [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Java](https://www.daytona.io/docs/en/java-sdk.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md) references. More examples are available in our [GitHub repository](https://github.com/daytonaio/daytona/tree/main/examples).

### Create a sandbox

Create a [sandbox](https://www.daytona.io/docs/en/sandboxes.md) with default settings.


```python
from daytona import Daytona

daytona = Daytona()
sandbox = daytona.create()
print(f"Sandbox ID: {sandbox.id}")
```


```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create();
console.log(`Sandbox ID: ${sandbox.id}`);
```


```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    sandbox, err := client.Create(context.Background(), nil)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Sandbox ID: %s\n", sandbox.ID)
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create
puts "Sandbox ID: #{sandbox.id}"
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Sandbox sandbox = daytona.create();
            System.out.println("Sandbox ID: " + sandbox.getId());
        }
    }
}
```


```shell
daytona create
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{}'
```


### Create and run code in a sandbox

Create a [sandbox](https://www.daytona.io/docs/en/sandboxes.md) and run code securely in it.


```python
from daytona import Daytona

daytona = Daytona()
sandbox = daytona.create()
response = sandbox.process.exec("echo 'Hello, World!'")
print(response.result)
sandbox.delete()
```

```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create();
const response = await sandbox.process.executeCommand('echo "Hello, World!"');
console.log(response.result);
await sandbox.delete();
```


```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    sandbox, err := client.Create(context.Background(), nil)
    if err != nil {
        log.Fatal(err)
    }

    response, err := sandbox.Process.ExecuteCommand(context.Background(), "echo 'Hello, World!'")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(response.Result)
    sandbox.Delete(context.Background())
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create
response = sandbox.process.exec(command: "echo 'Hello, World!'")
puts response.result
daytona.delete(sandbox)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.ExecuteResponse;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Sandbox sandbox = daytona.create();
            ExecuteResponse response = sandbox.process.executeCommand("echo 'Hello, World!'");
            System.out.println(response.getResult());
            sandbox.delete();
        }
    }
}
```


```shell
daytona create --name my-sandbox
daytona exec my-sandbox -- echo 'Hello, World!'
daytona delete my-sandbox
```


```bash
# Create a sandbox
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{}'

# Execute a command in the sandbox
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/process/execute' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "command": "echo '\''Hello, World!'\''"
}'

# Delete the sandbox
curl 'https://app.daytona.io/api/sandbox/{sandboxId}' \
  --request DELETE \
  --header 'Authorization: Bearer <API_KEY>'
```


### Create a sandbox with custom resources

Create a sandbox with [custom resources](https://www.daytona.io/docs/en/sandboxes.md#resources) (CPU, memory, disk).


```python
from daytona import Daytona, CreateSandboxFromImageParams, Image, Resources

daytona = Daytona()
sandbox = daytona.create(
    CreateSandboxFromImageParams(
        image=Image.debian_slim("3.12"),
        resources=Resources(cpu=2, memory=4, disk=8)
    )
)
```


```typescript
import { Daytona, Image } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create({
    image: Image.debianSlim('3.12'),
    resources: { cpu: 2, memory: 4, disk: 8 }
});
```


```go
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    sandbox, err := client.Create(context.Background(), types.ImageParams{
        Image: daytona.DebianSlim(nil),
        Resources: &types.Resources{
            CPU:    2,
            Memory: 4,
            Disk:   8,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create(
    Daytona::CreateSandboxFromImageParams.new(
        image: Daytona::Image.debian_slim('3.12'),
        resources: Daytona::Resources.new(cpu: 2, memory: 4, disk: 8)
    )
)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Image;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromImageParams;
import io.daytona.sdk.model.Resources;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromImageParams params = new CreateSandboxFromImageParams();
            params.setImage(Image.debianSlim("3.12"));
            Resources resources = new Resources();
            resources.setCpu(2);
            resources.setMemory(4);
            resources.setDisk(8);
            params.setResources(resources);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```shell
daytona create --class small
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "cpu": 2,
  "memory": 4,
  "disk": 8
}'
```


### Create an ephemeral sandbox

Create an [ephemeral sandbox](https://www.daytona.io/docs/en/sandboxes.md#ephemeral-sandboxes) that is automatically deleted when stopped.


```python
from daytona import Daytona, CreateSandboxFromSnapshotParams

daytona = Daytona()
sandbox = daytona.create(
    CreateSandboxFromSnapshotParams(ephemeral=True, auto_stop_interval=5)
)
```


```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create({
    ephemeral: true,
    autoStopInterval: 5
});
```


```go
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    autoStop := 5
    sandbox, err := client.Create(context.Background(), types.SnapshotParams{
        SandboxBaseParams: types.SandboxBaseParams{
            Ephemeral:        true,
            AutoStopInterval: &autoStop,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create(
    Daytona::CreateSandboxFromSnapshotParams.new(ephemeral: true, auto_stop_interval: 5)
)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromSnapshotParams;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromSnapshotParams params = new CreateSandboxFromSnapshotParams();
            params.setAutoDeleteInterval(0); // same effect as ephemeral: true
            params.setAutoStopInterval(5);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```



```shell
daytona create --auto-stop 5 --auto-delete 0
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "autoStopInterval": 5,
  "autoDeleteInterval": 0
}'
```


### Create a sandbox from a snapshot

Create a sandbox from a pre-built [snapshot](https://www.daytona.io/docs/en/snapshots.md) for faster sandbox creation with pre-installed dependencies.

```python
from daytona import Daytona, CreateSandboxFromSnapshotParams

daytona = Daytona()
sandbox = daytona.create(
    CreateSandboxFromSnapshotParams(
        snapshot="my-snapshot-name",
        language="python"
    )
)
```


```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create({
    snapshot: 'my-snapshot-name',
    language: 'typescript'
});
```


```go
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    sandbox, err := client.Create(context.Background(), types.SnapshotParams{
        Snapshot: "my-snapshot-name",
        SandboxBaseParams: types.SandboxBaseParams{
            Language: types.CodeLanguagePython,
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create(
    Daytona::CreateSandboxFromSnapshotParams.new(
        snapshot: 'my-snapshot-name',
        language: Daytona::CodeLanguage::PYTHON
    )
)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromSnapshotParams;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromSnapshotParams params = new CreateSandboxFromSnapshotParams();
            params.setSnapshot("my-snapshot-name");
            params.setLanguage("python");
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```shell
daytona create --snapshot my-snapshot-name
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "snapshot": "my-snapshot-name"
}'
```


### Create a sandbox with a declarative image

Create a sandbox with a [declarative image](https://www.daytona.io/docs/en/declarative-builder.md) that defines dependencies programmatically.


```python
from daytona import Daytona, CreateSandboxFromImageParams, Image

daytona = Daytona()
image = (
    Image.debian_slim("3.12")
    .pip_install(["requests", "pandas", "numpy"])
    .workdir("/home/daytona")
)
sandbox = daytona.create(
    CreateSandboxFromImageParams(image=image),
    on_snapshot_create_logs=print
)
```


```typescript
import { Daytona, Image } from '@daytona/sdk';

const daytona = new Daytona();
const image = Image.debianSlim('3.12')
    .pipInstall(['requests', 'pandas', 'numpy'])
    .workdir('/home/daytona');
const sandbox = await daytona.create(
    { image },
    { onSnapshotCreateLogs: console.log }
);
```


```go
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    image := daytona.DebianSlim(nil).
        PipInstall([]string{"requests", "pandas", "numpy"}).
        Workdir("/home/daytona")
    sandbox, err := client.Create(context.Background(), types.ImageParams{
        Image: image,
    })
    if err != nil {
        log.Fatal(err)
    }
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
image = Daytona::Image
    .debian_slim('3.12')
    .pip_install(['requests', 'pandas', 'numpy'])
    .workdir('/home/daytona')
sandbox = daytona.create(
    Daytona::CreateSandboxFromImageParams.new(image: image),
    on_snapshot_create_logs: proc { |chunk| puts chunk }
)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Image;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromImageParams;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Image image = Image.debianSlim("3.12")
                    .pipInstall("requests", "pandas", "numpy")
                    .workdir("/home/daytona");
            CreateSandboxFromImageParams params = new CreateSandboxFromImageParams();
            params.setImage(image);
            Sandbox sandbox = daytona.create(params, 60, System.out::println);
        }
    }
}
```


```shell
daytona create --dockerfile ./Dockerfile
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "buildInfo": {
    "dockerfileContent": "FROM python:3.12-slim\nRUN pip install requests pandas numpy\nWORKDIR /home/daytona"
  }
}'
```


### Create a sandbox with volumes

Create a sandbox with a [volume](https://www.daytona.io/docs/en/volumes.md) mounted to share data across sandboxes.


```python
from daytona import Daytona, CreateSandboxFromSnapshotParams, VolumeMount

daytona = Daytona()
volume = daytona.volume.get("my-volume", create=True)
sandbox = daytona.create(
    CreateSandboxFromSnapshotParams(
        volumes=[VolumeMount(volume_id=volume.id, mount_path="/home/daytona/data")]
    )
)
```


```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const volume = await daytona.volume.get('my-volume', true);
const sandbox = await daytona.create({
    volumes: [{ volumeId: volume.id, mountPath: '/home/daytona/data' }]
});
```


```go
package main

import (
    "context"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
    "github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    volume, err := client.Volume.Get(context.Background(), "my-volume")
    if err != nil {
        volume, err = client.Volume.Create(context.Background(), "my-volume")
        if err != nil {
            log.Fatal(err)
        }
    }

    sandbox, err := client.Create(context.Background(), types.SnapshotParams{
        SandboxBaseParams: types.SandboxBaseParams{
            Volumes: []types.VolumeMount{{
                VolumeID:  volume.ID,
                MountPath: "/home/daytona/data",
            }},
        },
    })
    if err != nil {
        log.Fatal(err)
    }
}
```

```ruby
require 'daytona'

daytona = Daytona::Daytona.new
volume = daytona.volume.get('my-volume', create: true)
sandbox = daytona.create(
    Daytona::CreateSandboxFromSnapshotParams.new(
        volumes: [DaytonaApiClient::SandboxVolume.new(
            volume_id: volume.id,
            mount_path: '/home/daytona/data'
        )]
    )
)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.exception.DaytonaNotFoundException;
import io.daytona.sdk.model.CreateSandboxFromSnapshotParams;
import io.daytona.sdk.model.Volume;
import io.daytona.sdk.model.VolumeMount;

import java.util.Collections;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Volume volume;
            try {
                volume = daytona.volume().getByName("my-volume");
            } catch (DaytonaNotFoundException e) {
                volume = daytona.volume().create("my-volume");
            }

            VolumeMount mount = new VolumeMount();
            mount.setVolumeId(volume.getId());
            mount.setMountPath("/home/daytona/data");

            CreateSandboxFromSnapshotParams params = new CreateSandboxFromSnapshotParams();
            params.setVolumes(Collections.singletonList(mount));

            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```shell
daytona volume create my-volume
daytona create --volume my-volume:/home/daytona/data
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "volumes": [
    {
      "volumeId": "<VOLUME_ID>",
      "mountPath": "/home/daytona/data"
    }
  ]
}'
```


### Create a sandbox with a Git repository cloned

Create a sandbox with a [Git repository](https://www.daytona.io/docs/en/typescript-sdk/git.md) cloned to manage version control.


```python
from daytona import Daytona

daytona = Daytona()
sandbox = daytona.create()

sandbox.git.clone("https://github.com/daytonaio/daytona.git", "/home/daytona/daytona")
status = sandbox.git.status("/home/daytona/daytona")
print(f"Branch: {status.current_branch}")
```


```typescript
import { Daytona } from '@daytona/sdk';

const daytona = new Daytona();
const sandbox = await daytona.create();

await sandbox.git.clone('https://github.com/daytonaio/daytona.git', '/home/daytona/daytona');
const status = await sandbox.git.status('/home/daytona/daytona');
console.log(`Branch: ${status.currentBranch}`);
```


```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
)

func main() {
    client, err := daytona.NewClient()
    if err != nil {
        log.Fatal(err)
    }

    sandbox, err := client.Create(context.Background(), nil)
    if err != nil {
        log.Fatal(err)
    }

    sandbox.Git.Clone(context.Background(), "https://github.com/daytonaio/daytona.git", "/home/daytona/daytona")
    status, err := sandbox.Git.Status(context.Background(), "/home/daytona/daytona")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Branch: %s\n", status.CurrentBranch)
}
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create

sandbox.git.clone(url: "https://github.com/daytonaio/daytona.git", path: "/home/daytona/daytona")
status = sandbox.git.status("/home/daytona/daytona")
puts "Branch: #{status.current_branch}"
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.GitStatus;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Sandbox sandbox = daytona.create();
            sandbox.git.clone("https://github.com/daytonaio/daytona.git", "/home/daytona/daytona");
            GitStatus status = sandbox.git.status("/home/daytona/daytona");
            System.out.println("Branch: " + status.getCurrentBranch());
        }
    }
}
```


```bash
# Create a sandbox
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{}'

# Clone a Git repository in the sandbox
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/git/clone' \
  --request POST \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "url": "https://github.com/daytonaio/daytona.git",
  "path": "/home/daytona/daytona"
}'

# Get repository status
curl 'https://proxy.app.daytona.io/toolbox/{sandboxId}/git/status?path=/home/daytona/daytona' \
  --header 'Authorization: Bearer <API_KEY>'
```