# Sandboxes

Daytona provides **full composable computers** &mdash; **sandboxes** &mdash; for AI agents. Sandboxes are isolated runtime environments you can manage programmatically to run code. Each sandbox runs in isolation, giving it a dedicated kernel, filesystem, network stack, and allocated vCPU, RAM, and disk. Agents get access to a full composable computer environment where they can install packages, run servers, compile code, and manage processes.

Sandboxes have **1 vCPU**, **1GB RAM**, and **3GiB disk** by default. [Organizations](https://www.daytona.io/docs/en/organizations.md) get a maximum sandbox resource limit of **4 vCPUs**, **8GB RAM**, and **10GB disk**. For more power, see [resources](#resources) or contact [support@daytona.io](mailto:support@daytona.io).

Sandboxes use [snapshots](https://www.daytona.io/docs/en/snapshots.md) to capture a fully configured environment (base OS, installed packages, dependencies, and configuration) to create new sandboxes.

Each sandbox has its own network stack with per-sandbox firewall rules. By default, sandboxes follow standard network policies, but you can restrict egress to a specific set of allowed destinations or block all outbound traffic entirely. For details on configuring network access, see [network limits](https://www.daytona.io/docs/en/network-limits.md).

A detailed overview of the Daytona platform is available in the [architecture](https://www.daytona.io/docs/en/architecture.md) section.

## Sandbox lifecycle

A sandbox can have several different states. Each state reflects the current status of your sandbox.

- [**Creating**](#create-sandboxes): the sandbox is provisioning and will be ready to use
- [**Starting**](#start-sandboxes): the sandbox is starting and will be ready to use
- [**Started**](#start-sandboxes): the sandbox has started and is ready to use
- [**Stopping**](#stop-sandboxes): the sandbox is stopping and will no longer accept requests
- [**Stopped**](#stop-sandboxes): the sandbox has stopped and is no longer running
- [**Deleting**](#delete-sandboxes): the sandbox is deleting and will be removed
- [**Deleted**](#delete-sandboxes): the sandbox has been deleted and no longer exists
- [**Archiving**](#archive-sandboxes): the sandbox is archiving and its state will be preserved
- [**Archived**](#archive-sandboxes): the sandbox has been archived and its state is preserved
- [**Resizing**](#resize-sandboxes): the sandbox is being resized to a new set of resources
- [**Error**](#recover-sandboxes): the sandbox is in an error state and needs to be recovered
- **Restoring**: the sandbox is being restored from archive and will be ready to use shortly
- **Unknown**: the default sandbox state before it is created
- **Pulling Snapshot**: the sandbox is pulling a [snapshot](https://www.daytona.io/docs/en/snapshots.md) to provide a base environment
- **Building Snapshot**: the sandbox is building a [snapshot](https://www.daytona.io/docs/en/snapshots.md) to provide a base environment
- **Build Pending**: the sandbox build is pending and will start shortly
- **Build Failed**: the sandbox build failed and needs to be retried

To view or update the current state of a sandbox, navigate to the [sandbox details page](#sandbox-details-page) or access the sandbox `state` attribute using the [SDKs](https://www.daytona.io/docs/en/getting-started.md#sdks), [API](https://www.daytona.io/docs/en/tools/api.md#daytona/tag/sandbox/GET/sandbox/{sandboxIdOrName}), or [CLI](https://www.daytona.io/docs/en/tools/cli.md#daytona-info).

The diagram below demonstrates the states and possible transitions between them.

<SandboxDiagram />

## Multiple runtime support

Daytona sandboxes support Python, TypeScript, and JavaScript programming language runtimes for direct code execution inside the sandbox. The `language` parameter controls which programming language runtime is used for the sandbox:

- **`python`**
- **`typescript`**
- **`javascript`**

If omitted, the Daytona SDK will default to `python`. To override this, explicitly set the `language` value when creating the sandbox.

## Create Sandboxes

Daytona provides methods to create sandboxes using the [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the Daytona [Python](https://www.daytona.io/docs/en/python-sdk/sync/sandbox.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk/sandbox.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk/sandbox.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md#type-sandbox), [Java](https://www.daytona.io/docs/en/java-sdk/sandbox.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md#daytona-create), or [API](https://www.daytona.io/docs/en/tools/api.md#daytona/tag/sandbox).

You can specify [programming language runtime](https://www.daytona.io/docs/en/sandboxes.md#multiple-runtime-support), [snapshots](https://www.daytona.io/docs/en/snapshots.md), [resources](https://www.daytona.io/docs/en/sandboxes.md#resources), [regions](https://www.daytona.io/docs/en/regions.md), [environment variables](https://www.daytona.io/docs/en/configuration.md), and [volumes](https://www.daytona.io/docs/en/volumes.md) for each sandbox.

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click **Create Sandbox**
3. Click **Create** to create a sandbox

Optionally, specify more parameters when creating a sandbox:

- **Name**: enter the name of the sandbox
- **Source**: select the source of the sandbox; [snapshot](https://www.daytona.io/docs/en/snapshots.md) (a pre-configured sandbox template) or image (an OCI-compliant container image: [public](https://www.daytona.io/docs/en/snapshots.md#using-public-images), [local](https://www.daytona.io/docs/en/snapshots.md#using-local-images), [private registries](https://www.daytona.io/docs/en/snapshots.md#using-images-from-private-registries)).
- **Region**: select the region for the sandbox
- **Lifecycle**: define [sandbox lifecycle management](#automated-lifecycle-management) or set as an [ephemeral sandbox](#ephemeral-sandboxes)
- **Environment variables**: set in key-value pairs or import them from a **`.env`** file
- **Labels**: set in key-value pairs to categorize and organize sandboxes
- **Network settings**: [public HTTP preview](https://www.daytona.io/docs/en/preview.md) or [block all network access](https://www.daytona.io/docs/en/network-limits.md)


```python
from daytona import Daytona

daytona = Daytona()
sandbox = daytona.create()
```


```typescript
import { Daytona } from '@daytona/sdk'

const daytona = new Daytona()
const sandbox = await daytona.create()
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create
```


```go
package main

import (
	"context"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
)

func main() {
	client, _ := daytona.NewClient()
	ctx := context.Background()
	_, _ = client.Create(ctx, nil)
}
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            Sandbox sandbox = daytona.create();
        }
    }
}
```


```bash
daytona create [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{}'
```


### Resources

Sandboxes have **1 vCPU**, **1GB RAM**, and **3GiB disk** by default. Organizations get a maximum sandbox resource limit of **4 vCPUs**, **8GB RAM**, and **10GB disk**.

| **Resource** | **Unit** | **Default** | **Minimum** | **Maximum** |
| ------------ | -------- | ----------- | ----------- | ----------- |
| CPU          | vCPU     | **`1`**     | **`1`**     | **`4`**     |
| Memory       | GiB      | **`1`**     | **`1`**     | **`8`**     |
| Disk         | GiB      | **`3`**     | **`1`**     | **`10`**    |

To set custom sandbox resources, use the `Resources` class. All resource parameters are optional and must be integers. If not specified, Daytona will use the default values. Maximum values are per-sandbox limits set at the organization level. Contact [support@daytona.io](mailto:support@daytona.io) to increase limits.


```python
from daytona import Daytona, CreateSandboxFromImageParams, Image, Resources

daytona = Daytona()
sandbox = daytona.create(
    CreateSandboxFromImageParams(
        image=Image.debian_slim("3.12"),
        resources=Resources(cpu=2, memory=4, disk=8),
    )
)
```


```typescript
import { Daytona, Image } from "@daytona/sdk";

const daytona = new Daytona();
const sandbox = await daytona.create({
  image: Image.debianSlim("3.12"),
  resources: { cpu: 2, memory: 4, disk: 8 },
});
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create(
  Daytona::CreateSandboxFromImageParams.new(
    image: Daytona::Image.debian_slim('3.12'),
    resources: Daytona::Resources.new(
      cpu: 2,
      memory: 4,
      disk: 8
    )
  )
)
```


```go
package main

import (
	"context"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
	client, _ := daytona.NewClient()
	ctx := context.Background()
	_, _ = client.Create(ctx, types.ImageParams{
		Image: "python:3.12",
		Resources: &types.Resources{
			CPU:    2,
			Memory: 4,
			Disk:   8,
		},
	})
}
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromImageParams;
import io.daytona.sdk.model.Resources;

final class CreateSandboxResources {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromImageParams params = new CreateSandboxFromImageParams();
            params.setImage("python:3.12");
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


```bash
# --memory is in MB; --disk is in GB
daytona create --cpu 2 --memory 4096 --disk 8
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "cpu": 2,
  "memory": 4,
  "disk": 8
}'
```


### GPU Sandboxes

:::caution[Experimental]
This feature is experimental. To request access, contact [support@daytona.io](mailto:support@daytona.io).
:::

Daytona provides methods to create GPU sandboxes using the [Daytona Dashboard ↗](https://app.daytona.io/dashboard/sandboxes) or programmatically using the Daytona [Python](https://www.daytona.io/docs/en/python-sdk/sync/sandbox.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk/sandbox.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk/sandbox.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md#type-sandbox), [Java](https://www.daytona.io/docs/en/java-sdk/sandbox.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md#daytona-create), or [API](https://www.daytona.io/docs/en/tools/api.md#daytona/tag/sandbox).

Daytona supports NVIDIA GPU devices for snapshot-based sandbox creation. This allows you to run GPU workloads such as model inference, fine-tuning, and CUDA-accelerated compute inside a sandbox created from a [GPU snapshot](https://www.daytona.io/docs/en/snapshots.md#gpu-snapshots). GPU sandboxes must be ephemeral.

1. Create a [GPU Snapshot](https://www.daytona.io/docs/en/snapshots.md#gpu-snapshots)
2. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
3. Click **Create Sandbox**
4. Select your GPU snapshot
5. Click **Create** to create a GPU sandbox


```python
from daytona import Daytona, CreateSandboxFromSnapshotParams

daytona = Daytona()
sandbox = daytona.create(
    CreateSandboxFromSnapshotParams(
        snapshot="my-gpu-snapshot",
        ephemeral=True,
    )
)
```


```typescript
import { Daytona } from "@daytona/sdk";

const daytona = new Daytona();
const sandbox = await daytona.create({
  snapshot: "my-gpu-snapshot",
  ephemeral: true,
});
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
sandbox = daytona.create(
  Daytona::CreateSandboxFromSnapshotParams.new(
    snapshot: 'my-gpu-snapshot',
    ephemeral: true
  )
)
```


```go
package main

import (
	"context"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
	client, _ := daytona.NewClient()
	ctx := context.Background()
	params := types.SnapshotParams{
		Snapshot: "my-gpu-snapshot",
		SandboxBaseParams: types.SandboxBaseParams{
			Ephemeral: true,
		},
	}
	_, _ = client.Create(ctx, params)
}
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromSnapshotParams;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromSnapshotParams params = new CreateSandboxFromSnapshotParams();
            params.setSnapshot("my-gpu-snapshot");
            params.setAutoDeleteInterval(0);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```bash
daytona create --snapshot my-gpu-snapshot --auto-delete 0
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "snapshot": "my-gpu-snapshot",
  "autoDeleteInterval": 0
}'
```


### Ephemeral Sandboxes

Ephemeral sandboxes are automatically deleted once they are stopped. They are useful for short-lived tasks or testing purposes.

To create an ephemeral sandbox, set the `ephemeral` parameter to `True` when creating a sandbox. Setting [**`autoDeleteInterval: 0`**](#auto-delete-interval) has the same effect as setting `ephemeral` to `True`.


```python
from daytona import Daytona, CreateSandboxFromSnapshotParams

daytona = Daytona()
params = CreateSandboxFromSnapshotParams(
    ephemeral=True,
    auto_stop_interval=5,  # delete after 5 minutes of inactivity
)
sandbox = daytona.create(params)
```


```typescript
import { Daytona } from "@daytona/sdk";

const daytona = new Daytona();
const sandbox = await daytona.create({
  ephemeral: true,
  autoStopInterval: 5, // delete after 5 minutes of inactivity
});
```


```ruby
require 'daytona'

daytona = Daytona::Daytona.new
params = Daytona::CreateSandboxFromSnapshotParams.new(
  ephemeral: true,
  auto_stop_interval: 5 # delete after 5 minutes of inactivity
)
sandbox = daytona.create(params)
```


```go
package main

import (
	"context"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/daytona"
	"github.com/daytonaio/daytona/libs/sdk-go/pkg/types"
)

func main() {
	client, _ := daytona.NewClient()
	ctx := context.Background()

	autoStopInterval := 5 // delete after 5 minutes of inactivity
	params := types.SnapshotParams{
		SandboxBaseParams: types.SandboxBaseParams{
			Language:         types.CodeLanguagePython,
			Ephemeral:        true,
			AutoStopInterval: &autoStopInterval,
		},
	}
	_, _ = client.Create(ctx, params)
}
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
            params.setAutoStopInterval(5); // delete after 5 minutes of inactivity
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


## Start Sandboxes

Daytona provides methods to start sandboxes in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md#type-sandbox), [Java](https://www.daytona.io/docs/en/java-sdk/sandbox.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md#daytona/).

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click the start icon (**▶**) next to the sandbox you want to start

```text
Starting sandbox with ID: <sandbox-id>
```


```python
sandbox.start()
```


```typescript
await sandbox.start()
```


```ruby
sandbox.start
```


```go
sandbox.Start(ctx)
```


```java
sandbox.start();
```


```bash
daytona start [SANDBOX_ID] | [SANDBOX_NAME] [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/start' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


## List Sandboxes

Daytona provides methods to list sandboxes and view their details in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) via the [sandbox details page](#sandbox-details-page) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md), [Java](https://www.daytona.io/docs/en/java-sdk/daytona.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).


```python
daytona.list()
```


```typescript
await daytona.list()
```


```ruby
daytona.list
```


```go
result, err := client.List(ctx, nil, nil, nil)
```


```java
daytona.list();
```


```bash
daytona list [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox' \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


##### Sandbox details page

[Daytona Dashboard ↗](https://app.daytona.io/dashboard/) provides a sandbox details page to view detailed information about a sandbox and interact with it directly.

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click on a sandbox you want to view the details of
3. Click **View** to open the sandbox details page

The sandbox details page provides a summary of the sandbox information and actions to perform on the sandbox:

- **Name**: the name of the sandbox
- **UUID**: the unique identifier of the sandbox
- **State**: the sandbox state with a visual indicator
- **Actions**: [start](#start-sandboxes), [stop](#stop-sandboxes), [recover](#recover-sandboxes), [archive](#archive-sandboxes), [delete](#delete-sandboxes), refresh, [SSH access](https://www.daytona.io/docs/en/ssh-access.md), [screen recordings](https://www.daytona.io/docs/en/computer-use.md#screen-recording)
- [**Region**](https://www.daytona.io/docs/en/regions.md): the target region where the sandbox is running
- [**Snapshot**](https://www.daytona.io/docs/en/snapshots.md): the snapshot used to create the sandbox
- [**Resources**](#resources): allocated sandbox CPU, memory, and disk
- [**Lifecycle**](#sandbox-lifecycle): [auto-stop](#auto-stop-interval), [auto-archive](#auto-archive-interval), and [auto-delete](#auto-delete-interval) intervals
- **Labels**: key-value pairs assigned to the sandbox
- **Timestamps**: when the sandbox was created and when the last event occurred
- [**Web terminal**](https://www.daytona.io/docs/en/web-terminal.md): an embedded web terminal session directly in the browser
- **Filesystem**: sandbox filesystem tree for viewing and managing files and directories: create, upload, download, copy, refresh, collapse, search, and delete capabilities
- [**VNC**](https://www.daytona.io/docs/en/vnc-access.md): a graphical desktop session for sandboxes that have a desktop environment
- [**Logs**](https://www.daytona.io/docs/en/observability/otel-collection.md): a detailed record of user and system activity for the sandbox
- **Metrics**: sandbox metrics data displayed as charts
- **Traces**: distributed traces and spans collected from the sandbox
- **Spending**: usage and cost over time

## Stop Sandboxes

Daytona provides methods to stop sandboxes in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md), [Java](https://www.daytona.io/docs/en/java-sdk/daytona.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).

Stopped sandboxes maintain filesystem persistence while their memory state is cleared. They incur only disk usage costs and can be started again when needed. The stopped state should be used when a sandbox is expected to be started again. Otherwise, it is recommended to stop and then archive the sandbox to eliminate disk usage costs.

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click the stop icon (**⏹**) next to the sandbox you want to stop

```text
Stopping sandbox with ID: <sandbox-id>
```


```python
sandbox.stop()
```


```typescript
await sandbox.stop()
```


```ruby
sandbox.stop
```


```go
sandbox.Stop(ctx)
```


```java
sandbox.stop();
```


```bash
daytona stop [SANDBOX_ID] | [SANDBOX_NAME] [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/stop' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


If you need a faster shutdown, use force stop (`force=true` / `--force`) to terminate the sandbox immediately. Force stop is ungraceful and should be used when quick termination is more important than process cleanup. Avoid force stop for normal shutdowns where the process should flush buffers, write final state, or run cleanup hooks.

Common use cases for force stop include:

- you need to reduce stop time and can accept immediate termination
- the entrypoint ignores termination signals or hangs during shutdown

## Pause Sandboxes

:::caution[Experimental]
This feature is experimental. To request access, contact [support@daytona.io](mailto:support@daytona.io).
:::

Daytona provides methods to pause sandboxes. Pausing a sandbox keeps both filesystem state and memory persistence, so sandboxes can resume from in-memory runtime state. Compared to regular stop behavior, pause is useful for workloads with active in-memory context and state continuity.

Daytona supports pause functionality through VM-based runners. Pause is handled through the existing stop action. This means stop behaves as pause and preserves memory state, while force stop performs a full shutdown without preserving memory state.

## Archive Sandboxes

Daytona provides methods to archive sandboxes in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).

A sandbox must be stopped before it can be archived. When a sandbox is archived, the entire filesystem state is moved to a cost-effective object storage, making it available for an extended period. Starting an archived sandbox takes more time than starting a stopped sandbox, depending on its size. It can be started again in the same way as a stopped sandbox.


```python
sandbox.archive()
```


```typescript
await sandbox.archive()
```


```ruby
sandbox.archive
```


```go
sandbox.Archive(ctx)
```


```bash
daytona archive [SANDBOX_ID] | [SANDBOX_NAME] [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/archive' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


## Recover Sandboxes

Daytona provides methods to recover sandboxes in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md) **SDKs**, and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).


```python
sandbox.recover()
```


```typescript
await sandbox.recover()
```


```ruby
sandbox.recover
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/recover' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


##### Recover from error state

When a sandbox enters an error state, it can sometimes be recovered using the `recover` method, depending on the underlying error reason. The `recoverable` flag indicates whether the error state can be resolved through an automated recovery procedure.

Recovery actions are not performed automatically because they address errors that require **further user intervention**, such as freeing up storage space.


```python
# Check if the sandbox is recoverable
if sandbox.recoverable:
    sandbox.recover()
```


```typescript
// Check if the sandbox is recoverable
if (sandbox.recoverable) {
  await sandbox.recover()
}
```


```ruby
# Check if the sandbox is in an error state before recovering
if sandbox.state == 'error'
  sandbox.recover
end
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/recover' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


## Resize Sandboxes

Daytona provides methods to resize [sandbox resources](#resources) after creation using [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md) **SDKs**, and [API](https://www.daytona.io/docs/en/tools/api.md#daytona). On a running sandbox, you can increase CPU and memory without interruption. To decrease CPU or memory, or to increase disk capacity, stop the sandbox first. Disk size can only be increased and cannot be decreased.

Resizing updates the sandbox resource allocation (`cpu`, `memory`, and `disk`) for that sandbox only. CPU and memory control compute capacity for running workloads, while disk controls persistent filesystem capacity. Values must be integers and stay within your organization's per-sandbox resource limits.


```python
# Resize a started sandbox (CPU and memory can be increased)
sandbox.resize(Resources(cpu=2, memory=4))

# Resize a stopped sandbox (CPU and memory can change, disk can only increase)
sandbox.stop()
sandbox.resize(Resources(cpu=4, memory=8, disk=20))
sandbox.start()
```


```typescript
// Resize a started sandbox (CPU and memory can be increased)
await sandbox.resize({ cpu: 2, memory: 4 })

// Resize a stopped sandbox (CPU and memory can change, disk can only increase)
await sandbox.stop()
await sandbox.resize({ cpu: 4, memory: 8, disk: 20 })
await sandbox.start()
```


```ruby
# Resize a started sandbox (CPU and memory can be increased)
sandbox.resize(Daytona::Resources.new(cpu: 2, memory: 4))

# Resize a stopped sandbox (CPU and memory can change, disk can only increase)
sandbox.stop
sandbox.resize(Daytona::Resources.new(cpu: 4, memory: 8, disk: 20))
sandbox.start
```


```go
// Resize a started sandbox (CPU and memory can be increased)
err := sandbox.Resize(ctx, &types.Resources{CPU: 2, Memory: 4})

// Resize a stopped sandbox (CPU and memory can change, disk can only increase)
err = sandbox.Stop(ctx)
err = sandbox.Resize(ctx, &types.Resources{CPU: 4, Memory: 8, Disk: 20})
err = sandbox.Start(ctx)
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/resize' \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "cpu": 2,
  "memory": 4,
  "disk": 20
}'
```


## Fork Sandboxes

:::caution[Experimental]
This feature is experimental. To request access, contact [support@daytona.io](mailto:support@daytona.io).
:::

Daytona provides methods to fork sandboxes. Forking creates a duplicate of your sandbox's filesystem and memory, and copies it into a new sandbox. The new sandbox is fully independent: it can be started, stopped, and deleted without affecting the original. The sandbox must be in started state before forking.

Daytona tracks the parent-child relationship in a fork tree, so you can always trace a fork's lineage back to the sandbox it was created from. You can fork a fork, building out branches as needed. The parent sandbox cannot be deleted while it has active fork children.

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click the three-dot menu (**⋮**) next to the sandbox you want to fork
3. Select **Fork**


```python
# Fork sandbox through the Sandbox instance
forked = sandbox._experimental_fork(name="my-forked-sandbox")
```


```typescript
// Fork sandbox through the Sandbox instance
const forkedSandbox = await sandbox._experimental_fork({ name: "my-forked-sandbox" });

// Or use the Daytona helper method
const forkedSandbox = await daytona._experimental_fork(sandbox, { name: "my-forked-sandbox" });
```


```ruby
# Fork sandbox through the Sandbox instance
forkedSandbox = sandbox.experimental_fork(name: "my-forked-sandbox")
```


```go
// Fork sandbox through the Sandbox instance
name := "my-forked-sandbox"
forkedSandbox, err := sandbox.ExperimentalFork(ctx, &name)
if err != nil {
    return err
}
```


```java
// Fork sandbox through the Sandbox instance
Sandbox forkedSandbox = sandbox.experimentalFork("my-forked-sandbox", 60);
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/fork' \
  --request POST \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "my-forked-sandbox"
}'
```


##### View Forks

Daytona provides methods to view forks. You can view the fork tree for a sandbox and all its related sandboxes.

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click the three-dot menu (**⋮**) next to a forked sandbox
3. Select **View Forks**

The fork tree displays each sandbox in the hierarchy along with its current state and creation time, allowing you to trace the lineage of any fork back to its origin.

## Create Snapshot from Sandbox

:::caution[Experimental]
This feature is experimental. To request access, contact [support@daytona.io](mailto:support@daytona.io).
:::

Daytona provides methods to create [snapshots](https://www.daytona.io/docs/en/snapshots.md) from sandboxes. A snapshot captures an immutable, point-in-time copy of a sandbox's filesystem and memory that you can use as a base to create new sandboxes, effectively templating a known-good environment for reuse. You can think of it as a checkpoint you can restore from whenever you need a clean, identical starting point.


```python
# Create snapshot from sandbox
sandbox._experimental_create_snapshot("my-sandbox-snapshot")
```


```typescript
// Create snapshot from sandbox
await sandbox._experimental_createSnapshot("my-sandbox-snapshot");
```


```ruby
# Create snapshot from sandbox
sandbox.experimental_create_snapshot(name: "my-sandbox-snapshot")
```


```go
// Create snapshot from sandbox
err := sandbox.ExperimentalCreateSnapshot(ctx, "my-sandbox-snapshot")
if err != nil {
    return err
}
```


```java
// Create snapshot from sandbox
sandbox.experimentalCreateSnapshot("my-sandbox-snapshot");
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/snapshot' \
  --request POST \
  --header 'X-Daytona-Organization-ID: YOUR_ORGANIZATION_ID' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --data '{
  "name": "my-sandbox-snapshot"
}'
```


## Delete Sandboxes

Daytona provides methods to delete sandboxes in [Daytona Dashboard ↗](https://app.daytona.io/dashboard/) or programmatically using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md), [Java](https://www.daytona.io/docs/en/java-sdk/daytona.md) **SDKs**, [CLI](https://www.daytona.io/docs/en/tools/cli.md), and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).

1. Navigate to [Daytona Sandboxes ↗](https://app.daytona.io/dashboard/sandboxes)
2. Click the **Delete** button next to the sandbox you want to delete.

```text
Deleting sandbox with ID: <sandbox-id>
```


```python
sandbox.delete()
```


```typescript
await sandbox.delete()
```


```ruby
sandbox.delete
```


```go
err = sandbox.Delete(ctx)
```


```java
sandbox.delete();
```


```bash
daytona delete [SANDBOX_ID] | [SANDBOX_NAME] [flags]
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}' \
  --request DELETE \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


## Automated lifecycle management

Daytona sandboxes can be automatically stopped, archived, and deleted based on user-defined intervals.

### Auto-stop interval

The auto-stop interval parameter sets the amount of time after which a running sandbox will be automatically stopped.

The auto-stop interval triggers even if there are internal processes running in the sandbox. The system differentiates between "internal processes" and "active user interaction". Merely having a script or background task running is not sufficient to keep the sandbox alive.

- [What resets the timer](#what-resets-the-timer)
- [What does not reset the timer](#what-does-not-reset-the-timer)

The parameter can either be set to:

- a time interval in minutes
- `0`: disables the auto-stop functionality, allowing the sandbox to run indefinitely

If the parameter is not set, the default interval of `15 minutes` will be used.


```python
sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    snapshot="my-snapshot-name",
    # Disables the auto-stop feature - default is 15 minutes
    auto_stop_interval=0,
))
```


```typescript
const sandbox = await daytona.create({
  snapshot: 'my-snapshot-name',
  // Disables the auto-stop feature - default is 15 minutes
  autoStopInterval: 0,
})
```


```ruby
sandbox = daytona.create(
  Daytona::CreateSandboxFromSnapshotParams.new(
    snapshot: 'my-snapshot-name',
    # Disables the auto-stop feature - default is 15 minutes
    auto_stop_interval: 0
  )
)
```


```go
// Create a sandbox with auto-stop disabled
autoStopInterval := 0
params := types.SnapshotParams{
    Snapshot: "my-snapshot-name",
    SandboxBaseParams: types.SandboxBaseParams{
        AutoStopInterval: &autoStopInterval,
    },
}
sandbox, err := client.Create(ctx, params)
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
            // Disables the auto-stop feature - default is 15 minutes
            params.setAutoStopInterval(0);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/autostop/{interval}' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


##### What resets the timer

The inactivity timer resets only for specific external interactions:

- Updates to [sandbox lifecycle states](#sandbox-lifecycle)
- Network requests through [sandbox previews](https://www.daytona.io/docs/en/preview.md)
- Active [SSH connections](https://www.daytona.io/docs/en/ssh-access.md)
- API requests to the [Daytona Toolbox SDK](https://www.daytona.io/docs/en/tools/api.md#daytona-toolbox)

##### What does not reset the timer

The following do not reset the timer:

- SDK requests that are not toolbox actions
- Background scripts (e.g., `npm run dev` run as a fire-and-forget command)
- Long-running tasks without external interaction
- Processes that don't involve active monitoring

If you run a long-running task like LLM inference that takes more than 15 minutes to complete without any external interaction, the sandbox may auto-stop mid-process because the process itself doesn't count as "activity", therefore the timer is not reset.

### Auto-archive interval

Daytona provides methods to set the auto-archive interval using the [Python SDK](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript SDK](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby SDK](https://www.daytona.io/docs/en/ruby-sdk.md), and [Java SDK](https://www.daytona.io/docs/en/java-sdk/sandbox.md).

The auto-archive interval parameter sets the amount of time after which a continuously stopped sandbox will be automatically archived. The parameter can either be set to:

- a time interval in minutes
- `0`: the maximum interval of `30 days` will be used

If the parameter is not set, the default interval of `7 days` will be used.


```python
sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    snapshot="my-snapshot-name",
    # Auto-archive after a sandbox has been stopped for 1 hour
    auto_archive_interval=60,
))
```


```typescript
const sandbox = await daytona.create({
  snapshot: 'my-snapshot-name',
  // Auto-archive after a sandbox has been stopped for 1 hour
  autoArchiveInterval: 60,
})
```


```ruby
sandbox = daytona.create(
  Daytona::CreateSandboxFromSnapshotParams.new(
    snapshot: 'my-snapshot-name',
    # Auto-archive after a sandbox has been stopped for 1 hour
    auto_archive_interval: 60
  )
)
```


```go
// Create a sandbox with auto-archive after 1 hour
autoArchiveInterval := 60
params := types.SnapshotParams{
    Snapshot: "my-snapshot-name",
    SandboxBaseParams: types.SandboxBaseParams{
        AutoArchiveInterval: &autoArchiveInterval,
    },
}
sandbox, err := client.Create(ctx, params)
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
            // Auto-archive after a sandbox has been stopped for 1 hour
            params.setAutoArchiveInterval(60);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/autoarchive/{interval}' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


### Auto-delete interval

Daytona provides methods to set the auto-delete interval using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md), [Java](https://www.daytona.io/docs/en/java-sdk/daytona.md) **SDKs**, and [API](https://www.daytona.io/docs/en/tools/api.md#daytona).

The auto-delete interval parameter sets the amount of time after which a continuously stopped sandbox will be automatically deleted. By default, sandboxes will never be automatically deleted. The parameter can either be set to:

- a time interval in minutes
- `-1`: disables the auto-delete functionality
- `0`: the sandbox will be deleted immediately after stopping

If the parameter is not set, the sandbox will not be deleted automatically.


```python
sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    snapshot="my-snapshot-name",
    # Auto-delete after a sandbox has been stopped for 1 hour
    auto_delete_interval=60,
))

# Delete the sandbox immediately after it has been stopped
sandbox.set_auto_delete_interval(0)

# Disable auto-deletion
sandbox.set_auto_delete_interval(-1)
```


```typescript
const sandbox = await daytona.create({
  snapshot: 'my-snapshot-name',
  // Auto-delete after a sandbox has been stopped for 1 hour
  autoDeleteInterval: 60,
})

// Delete the sandbox immediately after it has been stopped
await sandbox.setAutoDeleteInterval(0)

// Disable auto-deletion
await sandbox.setAutoDeleteInterval(-1)
```


```ruby
sandbox = daytona.create(
  Daytona::CreateSandboxFromSnapshotParams.new(
    snapshot: 'my-snapshot-name',
    # Auto-delete after a sandbox has been stopped for 1 hour
    auto_delete_interval: 60
  )
)

# Delete the sandbox immediately after it has been stopped
sandbox.auto_delete_interval = 0

# Disable auto-deletion
sandbox.auto_delete_interval = -1
```


```go
// Create a sandbox with auto-delete after 1 hour
autoDeleteInterval := 60
params := types.SnapshotParams{
    Snapshot: "my-snapshot-name",
    SandboxBaseParams: types.SandboxBaseParams{
        AutoDeleteInterval: &autoDeleteInterval,
    },
}
sandbox, err := client.Create(ctx, params)

// Delete the sandbox immediately after it has been stopped
zeroInterval := 0
err = sandbox.SetAutoDeleteInterval(ctx, &zeroInterval)

// Disable auto-deletion
disableInterval := -1
err = sandbox.SetAutoDeleteInterval(ctx, &disableInterval)
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
            // Auto-delete after a sandbox has been stopped for 1 hour
            params.setAutoDeleteInterval(60);
            Sandbox sandbox = daytona.create(params);

            // Delete the sandbox immediately after it has been stopped
            sandbox.setAutoDeleteInterval(0);

            // Disable auto-deletion
            sandbox.setAutoDeleteInterval(-1);
        }
    }
}
```


```bash
curl 'https://app.daytona.io/api/sandbox/{sandboxIdOrName}/autodelete/{interval}' \
  --request POST \
  --header 'Authorization: Bearer YOUR_API_KEY'
```


### Running indefinitely

Daytona provides methods to run sandboxes indefinitely using the [Python](https://www.daytona.io/docs/en/python-sdk.md), [TypeScript](https://www.daytona.io/docs/en/typescript-sdk.md), [Ruby](https://www.daytona.io/docs/en/ruby-sdk.md), [Go](https://www.daytona.io/docs/en/go-sdk/daytona.md), and [Java](https://www.daytona.io/docs/en/java-sdk/daytona.md) **SDKs**.

By default, Daytona Sandboxes auto-stop after 15 minutes of inactivity. To keep a sandbox running without interruption, set the auto-stop interval to `0` when creating a new sandbox:


```python
sandbox = daytona.create(CreateSandboxFromSnapshotParams(
    snapshot="my_awesome_snapshot",
    # Disables the auto-stop feature - default is 15 minutes
    auto_stop_interval=0,
))
```


```typescript
const sandbox = await daytona.create({
  snapshot: 'my_awesome_snapshot',
  // Disables the auto-stop feature - default is 15 minutes
  autoStopInterval: 0,
})
```


```ruby
sandbox = daytona.create(
  Daytona::CreateSandboxFromSnapshotParams.new(
    snapshot: 'my_awesome_snapshot',
    # Disables the auto-stop feature - default is 15 minutes
    auto_stop_interval: 0
  )
)
```


```go
// Disables the auto-stop feature - default is 15 minutes
autoStopInterval := 0
params := types.SnapshotParams{
    Snapshot: "my_awesome_snapshot",
    SandboxBaseParams: types.SandboxBaseParams{
        AutoStopInterval: &autoStopInterval,
    },
}
sandbox, err := client.Create(ctx, params)
```


```java
import io.daytona.sdk.Daytona;
import io.daytona.sdk.Sandbox;
import io.daytona.sdk.model.CreateSandboxFromSnapshotParams;

public class App {
    public static void main(String[] args) {
        try (Daytona daytona = new Daytona()) {
            CreateSandboxFromSnapshotParams params = new CreateSandboxFromSnapshotParams();
            params.setSnapshot("my_awesome_snapshot");
            // Disables the auto-stop feature - default is 15 minutes
            params.setAutoStopInterval(0);
            Sandbox sandbox = daytona.create(params);
        }
    }
}
```