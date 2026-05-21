# modal.Sandbox

```python
class Sandbox(modal.object.Object)
```

A `Sandbox` object lets you interact with a running sandbox. This API is similar to Python's
[asyncio.subprocess.Process](https://docs.python.org/3/library/asyncio-subprocess.html#asyncio.subprocess.Process).

Refer to the [guide](https://modal.com/docs/guide/sandbox) on how to spawn and use sandboxes.

## hydrate

```python
def hydrate(self, client: Optional[_Client] = None) -> Self:
```

Synchronize the local object with its identity on the Modal server.

It is rarely necessary to call this method explicitly, as most operations
will lazily hydrate when needed. The main use case is when you need to
access object metadata, such as its ID.

*Added in v0.72.39*: This method replaces the deprecated `.resolve()` method.

## create

```python
@staticmethod
def create(
    *args: str,  # Set the CMD of the Sandbox, overriding any CMD of the container image.
    # Associate the sandbox with an app. Required unless creating from a container.
    app: Optional["modal.app._App"] = None,
    name: Optional[str] = None,  # Optionally give the sandbox a name. Unique within an app.
    tags: Optional[dict[str, str]] = None,  # Tags to attach to the Sandbox.
    image: Optional[_Image] = None,  # The image to run as the container for the sandbox.
    env: Optional[dict[str, Optional[str]]] = None,  # Environment variables to set in the Sandbox.
    secrets: Optional[Collection[_Secret]] = None,  # Secrets to inject into the Sandbox as environment variables.
    network_file_systems: dict[Union[str, os.PathLike], _NetworkFileSystem] = {},
    timeout: int = 300,  # Maximum lifetime of the sandbox in seconds.
    # The amount of time in seconds that a sandbox can be idle before being terminated.
    idle_timeout: Optional[int] = None,
    workdir: Optional[str] = None,  # Working directory of the sandbox.
    gpu: Optional[str] = None,
    cloud: Optional[str] = None,
    region: Optional[Union[str, Sequence[str]]] = None,  # Region or regions to run the sandbox on.
    # Specify, in fractional CPU cores, how many CPU cores to request.
    # Or, pass (request, limit) to additionally specify a hard limit in fractional CPU cores.
    # CPU throttling will prevent a container from exceeding its specified limit.
    cpu: Optional[Union[float, tuple[float, float]]] = None,
    # Specify, in MiB, a memory request which is the minimum memory required.
    # Or, pass (request, limit) to additionally specify a hard limit in MiB.
    memory: Optional[Union[int, tuple[int, int]]] = None,
    block_network: bool = False,  # Whether to block network access
    # List of CIDRs the sandbox is allowed to access. If None, all CIDRs are allowed.
    outbound_cidr_allowlist: Optional[Sequence[str]] = None,
    # List of CIDRs allowed to connect inbound to the sandbox (tunnels and connection tokens).
    inbound_cidr_allowlist: Optional[Sequence[str]] = None,
    volumes: dict[
        Union[str, os.PathLike], Union[_Volume, _CloudBucketMount]
    ] = {},  # Mount points for Modal Volumes and CloudBucketMounts
    # Enable a PTY for the Sandbox entrypoint command. When enabled, all output (stdout and stderr
    # from the process) is multiplexed into stdout, and the stderr stream is effectively empty.
    pty: bool = False,
    # List of ports to tunnel into the sandbox. Encrypted ports are tunneled with TLS.
    encrypted_ports: Sequence[int] = [],
    # List of encrypted ports to tunnel into the sandbox, using HTTP/2.
    h2_ports: Sequence[int] = [],
    # List of ports to tunnel into the sandbox without encryption.
    unencrypted_ports: Sequence[int] = [],
    # Allow connections to the Sandbox via a subdomain of this parent rather than a default Modal domain.
    custom_domain: Optional[str] = None,
    # Reference to a Modal Proxy to use in front of this Sandbox.
    proxy: Optional[_Proxy] = None,
    # If True, the sandbox will receive a MODAL_IDENTITY_TOKEN env var for OIDC-based auth.
    include_oidc_identity_token: bool = False,
    # Probe used to determine when the sandbox has become ready.
    readiness_probe: Optional[Probe] = None,
    # Enable verbose logging for sandbox operations.
    verbose: bool = False,
    experimental_options: Optional[dict[str, bool]] = None,
    # Enable memory snapshots.
    _experimental_enable_snapshot: bool = False,
    client: Optional[_Client] = None,
    environment_name: Optional[str] = None,  # *DEPRECATED* Optionally override the default environment
    pty_info: Optional[api_pb2.PTYInfo] = None,  # *DEPRECATED* Use `pty` instead. `pty` will override `pty_info`.
    cidr_allowlist: Optional[Sequence[str]] = None,  # *DEPRECATED* Use outbound_cidr_allowlist instead.
) -> "_Sandbox":
```

Create a new Sandbox to run untrusted, arbitrary code.

The Sandbox's corresponding container will be created asynchronously.

**Usage**

```python
app = modal.App.lookup('sandbox-hello-world', create_if_missing=True)
sandbox = modal.Sandbox.create("echo", "hello world", app=app)
print(sandbox.stdout.read())
sandbox.wait()
```

## detach

```python
def detach(self):
```

Disconnects your client from the sandbox and cleans up resources assoicated with the connection.

Be sure to only call `detach` when you are done interacting with the sandbox. After calling `detach`,
any operation using the Sandbox object is not guaranteed to work anymore. If you want to continue interacting
with a running sandbox, use `Sandbox.from_id` to get a new Sandbox object.

## from\_name

```python
@staticmethod
def from_name(
    app_name: str,
    name: str,
    *,
    environment_name: Optional[str] = None,
    client: Optional[_Client] = None,
) -> "_Sandbox":
```

Get a running Sandbox by name from a deployed App.

Raises a modal.exception.NotFoundError if no running sandbox is found with the given name.
A Sandbox's name is the `name` argument passed to `Sandbox.create`.

## from\_id

```python
@staticmethod
def from_id(sandbox_id: str, client: Optional[_Client] = None) -> "_Sandbox":
```

Construct a Sandbox from an id and look up the Sandbox result.

The ID of a Sandbox object can be accessed using `.object_id`.

## get\_tags

```python
def get_tags(self) -> dict[str, str]:
```

Fetches any tags (key-value pairs) currently attached to this Sandbox from the server.

## set\_tags

```python
def set_tags(self, tags: dict[str, str], *, client: Optional[_Client] = None) -> None:
```

Set tags (key-value pairs) on the Sandbox. Tags can be used to filter results in `Sandbox.list`.

## snapshot\_filesystem

```python
def snapshot_filesystem(self, timeout: int = 55) -> _Image:
```

Snapshot the filesystem of the Sandbox.

Returns an [`Image`](https://modal.com/docs/reference/modal.Image) object which
can be used to spawn a new Sandbox with the same filesystem.

`timeout` If the snapshot does not return within that window, the call is cancelled
and `modal.exception.TimeoutError` is raised.

## mount\_image

```python
def mount_image(self, path: Union[PurePosixPath, str], image: _Image):
```

Mount an Image at a specified path in a running Sandbox.

`path` should be a directory that is **not** the root path (`/`). If the path doesn't exist
it will be created. If it exists and contains data, the previous directory will be replaced
by the mount.

The `image` argument supports any Image that has an object ID, including:

* Images built using `image.build()`
* Images referenced by ID, e.g. `Image.from_id(...)`
* Filesystem/directory snapshots, e.g. created by `.snapshot_directory()` or `.snapshot_filesystem()`
* Empty images created with `Image.from_scratch()`

Usage:

```py notest
user_project_snapshot: Image = sandbox_session_1.snapshot_directory("/user_project")

# You can later mount this snapshot to another Sandbox:
sandbox_session_2 = modal.Sandbox.create(...)
sandbox_session_2.mount_image("/user_project", user_project_snapshot)
sandbox_session_2.ls("/user_project")
```

## unmount\_image

```python
def unmount_image(self, path: Union[PurePosixPath, str]):
```

Unmount a previously mounted Image from a running Sandbox.

`path` must be the exact mount point that was passed to `.mount_image()`.
After unmounting, the underlying Sandbox filesystem at that path becomes
visible again.

## snapshot\_directory

```python
def snapshot_directory(self, path: Union[PurePosixPath, str]) -> _Image:
```

Snapshot a directory in a running Sandbox, creating a new Image with its content.

Directory snapshots are currently persisted for 30 days after they were created.

Usage:

```py notest
user_project_snapshot: Image = sandbox_session_1.snapshot_directory("/user_project")

# You can later mount this snapshot to another Sandbox:
sandbox_session_2 = modal.Sandbox.create(...)
sandbox_session_2.mount_image("/user_project", user_project_snapshot)
sandbox_session_2.ls("/user_project")
```

## wait

```python
def wait(self, raise_on_termination: bool = True):
```

Wait for the Sandbox to finish running.

## wait\_until\_ready

```python
def wait_until_ready(self, *, timeout: int = 300) -> None:
```

Wait for the Sandbox readiness probe to report that the Sandbox is ready.

The Sandbox must be configured with a `readiness_probe` in order to use this method.

Usage:

```py notest
app = modal.App.lookup('sandbox-wait-until-ready', create_if_missing=True)
sandbox = modal.Sandbox.create(
    "python3", "-m", "http.server", "8080",
    readiness_probe=modal.Probe.with_tcp(8080),
    app=app,
)
sandbox.wait_until_ready()
```

## tunnels

```python
def tunnels(self, timeout: int = 50) -> dict[int, Tunnel]:
```

Get Tunnel metadata for the sandbox.

Raises `SandboxTimeoutError` if the tunnels are not available after the timeout.

Returns a dictionary of `Tunnel` objects which are keyed by the container port.

NOTE: Previous to client [v0.64.153](https://modal.com/docs/reference/changelog#064153-2024-09-30), this
returned a list of `TunnelData` objects.

## create\_connect\_token

```python
def create_connect_token(
    self, user_metadata: Optional[Union[str, dict[str, Any]]] = None
) -> SandboxConnectCredentials:
```

Create a token for making HTTP connections to the Sandbox.

Also accepts an optional user\_metadata string or dict to associate with the token. This metadata
will be added to the headers by the proxy when forwarding requests to the Sandbox.

## reload\_volumes

```python
def reload_volumes(self) -> None:
```

Reload all Volumes mounted in the Sandbox.

Added in v1.1.0.

## terminate

```python
def terminate(
    self,
    *,
    wait: bool = False,  # wait for terminate to complete and return the exit code.
) -> int | None:
```

Terminate Sandbox execution.

This is a no-op if the Sandbox has already finished running.

## poll

```python
def poll(self) -> Optional[int]:
```

Check if the Sandbox has finished running.

Returns `None` if the Sandbox is still running, else returns the exit code.

## exec

```python
def exec(
    self,
    *args: str,
    stdout: StreamType = StreamType.PIPE,
    stderr: StreamType = StreamType.PIPE,
    timeout: Optional[int] = None,
    workdir: Optional[str] = None,
    env: Optional[dict[str, Optional[str]]] = None,  # Environment variables to set during command execution.
    secrets: Optional[
        Collection[_Secret]
    ] = None,  # Secrets to inject as environment variables during command execution.
    # Encode output as text.
    text: bool = True,
    # Control line-buffered output.
    # -1 means unbuffered, 1 means line-buffered (only available if `text=True`).
    bufsize: Literal[-1, 1] = -1,
    # Enable a PTY for the command. When enabled, all output (stdout and stderr from the
    # process) is multiplexed into stdout, and the stderr stream is effectively empty.
    pty: bool = False,
    _pty_info: Optional[api_pb2.PTYInfo] = None,  # *DEPRECATED* Use `pty` instead. `pty` will override `pty_info`.
    pty_info: Optional[api_pb2.PTYInfo] = None,  # *DEPRECATED* Use `pty` instead. `pty` will override `pty_info`.
):
```

Execute a command in the Sandbox and return a ContainerProcess handle.

See the [`ContainerProcess`](https://modal.com/docs/reference/modal.container_process#modalcontainer_processcontainerprocess)
docs for more information.

**Usage**

```python fixture:sandbox
process = sandbox.exec("bash", "-c", "for i in $(seq 1 3); do echo foo $i; sleep 0.1; done")
for line in process.stdout:
    print(line)
```

## filesystem

```python
filesystem: SandboxFilesystem
```

Namespace for Sandbox filesystem APIs.

### filesystem.copy\_from\_local

```python
async def copy_from_local(self, local_path: Union[str, os.PathLike], remote_path: str) -> None:
```

Copy a local file into the Sandbox.

`remote_path` must be an absolute path to a file in the Sandbox.
Parent directories for `remote_path` are created if needed.
The remote file is overwritten if it already exists.

**Raises**

* `SandboxFilesystemNotADirectoryError`: a parent path component of `remote_path` is not a directory.
* `SandboxFilesystemIsADirectoryError`: `remote_path` points to a directory.
* `SandboxFilesystemPermissionError`: write permission is denied in the Sandbox.
* `SandboxFilesystemError`: the command fails for any other reason.
* `FileNotFoundError`: `local_path` does not exist.
* `IsADirectoryError`: `local_path` is a directory.
* `PermissionError`: reading `local_path` is not permitted.

**Usage**

```python fixture:sandbox fixture:tmpdir
import tempfile
from pathlib import Path

local_path = Path(tempfile.mktemp())
local_path.write_text("Hello, world!\n")
sandbox.filesystem.copy_from_local(local_path, "/tmp/hello.txt")
```

### filesystem.copy\_to\_local

```python
async def copy_to_local(self, remote_path: str, local_path: Union[str, os.PathLike]) -> None:
```

Copy a file from the Sandbox to a local path.

`remote_path` must be an absolute path to a file in the Sandbox.
Parent directories for `local_path` are created if needed.
The local file is overwritten if it already exists.

**Raises**

* `SandboxFilesystemNotFoundError`: the remote path does not exist.
* `SandboxFilesystemIsADirectoryError`: the remote path points to a directory.
* `SandboxFilesystemPermissionError`: read permission is denied in the Sandbox.
* `SandboxFilesystemError`: the command fails for any other reason.
* `IsADirectoryError`: `local_path` points to a directory.
* `NotADirectoryError`: a component of the `local_path` parent is not a directory.
* `PermissionError`: writing `local_path` is not permitted.

**Usage**

```python fixture:sandbox fixture:tmpdir
sandbox.filesystem.write_text("Hello, world!\n", "/tmp/hello.txt")
sandbox.filesystem.copy_to_local("/tmp/hello.txt", "/tmp/local-hello.txt")
```

### filesystem.list\_files

```python
async def list_files(self, remote_path: str) -> list[FileInfo]:
```

List files and directories in a Sandbox directory.

`remote_path` must be an absolute path to a directory in the Sandbox.
Returns a list of `FileInfo` objects describing each entry.

**Raises**

* `SandboxFilesystemNotFoundError`: the path does not exist.
* `SandboxFilesystemNotADirectoryError`: the path is not a directory.
* `SandboxFilesystemPermissionError`: read permission is denied.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
entries = sandbox.filesystem.list_files("/tmp")
for entry in entries:
    print(entry.name, entry.type, entry.size)
```

### filesystem.make\_directory

```python
async def make_directory(self, remote_path: str, *, create_parents: bool = True) -> None:
```

Create a new directory in the Sandbox.

`remote_path` must be an absolute path in the Sandbox.

When `create_parents` is `True` (the default), any missing parent directories are created and the call is
idempotent (succeeds silently if the directory already exists). When `create_parents` is `False`, the
immediate parent directory must already exist and the path must not already exist.

**Raises**

* `SandboxFilesystemNotFoundError`: the parent directory does not exist and `create_parents` is `False`.
* `SandboxFilesystemPathAlreadyExistsError`: the path already exists.
* `SandboxFilesystemNotADirectoryError`: a path component is not a directory.
* `SandboxFilesystemPermissionError`: creation is not permitted.
* `InvalidError`: the operation is not supported by the mount.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.make_directory("/tmp/a/b/c")
```

### filesystem.read\_bytes

```python
async def read_bytes(self, remote_path: str) -> bytes:
```

Read a file from the Sandbox and return its contents as bytes.

`remote_path` must be an absolute path to a file in the Sandbox.

**Raises**

* `SandboxFilesystemNotFoundError`: the path does not exist.
* `SandboxFilesystemIsADirectoryError`: the path points to a directory.
* `SandboxFilesystemPermissionError`: read permission is denied.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.write_bytes(b"Hello, world!\n", "/tmp/hello.bin")
contents = sandbox.filesystem.read_bytes("/tmp/hello.bin")
print(contents.decode("utf-8"))
```

### filesystem.read\_text

```python
async def read_text(self, remote_path: str) -> str:
```

Read a file from the Sandbox and return its contents as a UTF-8 string.

`remote_path` must be an absolute path to a file in the Sandbox.

**Raises**

* `SandboxFilesystemNotFoundError`: the path does not exist.
* `SandboxFilesystemIsADirectoryError`: the path points to a directory.
* `SandboxFilesystemPermissionError`: read permission is denied.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.write_text("Hello, world!\n", "/tmp/hello.txt")
contents = sandbox.filesystem.read_text("/tmp/hello.txt")
print(contents)
```

### filesystem.remove

```python
async def remove(self, remote_path: str, *, recursive: bool = False) -> None:
```

Remove a file or directory in the Sandbox.

`remote_path` must be an absolute path in the Sandbox.

When `remote_path` is a directory and `recursive` is `False` (the
default), removes it only if it is empty. When `recursive` is `True`,
removes the directory and all its contents.

Recursive directory removal is not supported on all mounts.
In particular, `CloudBucketMount` does not support it. An
`InvalidError` is raised in that case.

**Raises**

* `SandboxFilesystemNotFoundError`: the path does not exist.
* `SandboxFilesystemDirectoryNotEmptyError`: `recursive` is `False` and the directory is not empty.
* `SandboxFilesystemPermissionError`: removal is not permitted.
* `InvalidError`: the operation is not supported by the mount.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

To remove a file:

```python fixture:sandbox
sandbox.filesystem.write_bytes(b"Hello, world!\n", "/tmp/hello.bin")
sandbox.filesystem.remove("/tmp/hello.bin")
```

To remove a directory and all its contents:

```python fixture:sandbox
sandbox.filesystem.make_directory("/tmp/mydir/subdir")
sandbox.filesystem.remove("/tmp/mydir", recursive=True)
```

### filesystem.stat

```python
async def stat(self, remote_path: str) -> FileInfo:
```

Return metadata for a single file, directory, or symlink in the Sandbox.

`remote_path` must be an absolute path in the Sandbox. If `remote_path` is a symlink, the returned
`FileInfo` object describes the symlink, not the target it points to.

**Raises**

* `SandboxFilesystemNotFoundError`: the path does not exist.
* `SandboxFilesystemNotADirectoryError`: a non-leaf component of the path is not a directory.
* `SandboxFilesystemPermissionError`: a component of the path is not searchable.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.write_text("Hello, world!\n", "/tmp/hello.txt")
info = sandbox.filesystem.stat("/tmp/hello.txt")
print(info.size, info.permissions, info.modified_time)
```

### filesystem.write\_bytes

```python
async def write_bytes(self, data: Union[bytes, bytearray, memoryview], remote_path: str) -> None:
```

Write binary content to a file in the Sandbox.

`remote_path` must be an absolute path to a file in the Sandbox.
Parent directories for `remote_path` are created if needed.
The remote file is overwritten if it already exists.

**Raises**

* `SandboxFilesystemNotADirectoryError`: a parent path component is not a directory.
* `SandboxFilesystemIsADirectoryError`: `remote_path` points to a directory.
* `SandboxFilesystemPermissionError`: write permission is denied.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.write_bytes(b"Hello, world!\n", "/tmp/hello.bin")
```

### filesystem.write\_text

```python
async def write_text(self, data: str, remote_path: str) -> None:
```

Write UTF-8 text to a file in the Sandbox.

`remote_path` must be an absolute path to a file in the Sandbox.
Parent directories for `remote_path` are created if needed.
The remote file is overwritten if it already exists.

**Raises**

* `SandboxFilesystemNotADirectoryError`: a parent path component is not a directory.
* `SandboxFilesystemIsADirectoryError`: `remote_path` points to a directory.
* `SandboxFilesystemPermissionError`: write permission is denied.
* `SandboxFilesystemError`: the command fails for any other reason.

**Usage**

```python fixture:sandbox
sandbox.filesystem.write_text("Hello, world!\n", "/tmp/hello.txt")
```

## open

```python
def open(
    self,
    path: str,
    mode: Union["_typeshed.OpenTextMode", "_typeshed.OpenBinaryMode"] = "r",
):
```

\[Alpha] Open a file in the Sandbox and return a FileIO handle.

**Deprecated (2026-03-09):** Use the `Sandbox.filesystem` APIs instead.

See the [`FileIO`](https://modal.com/docs/reference/modal.file_io#modalfile_iofileio) docs for more information.

**Usage**

```python notest
sb = modal.Sandbox.create(app=sb_app)
f = sb.open("/test.txt", "w")
f.write("hello")
f.close()
```

## ls

```python
def ls(self, path: str) -> builtins.list[str]:
```

\[Alpha] List the contents of a directory in the Sandbox.

**Deprecated (2026-04-15):** Use `Sandbox.filesystem.list_files()` instead.

## mkdir

```python
def mkdir(self, path: str, parents: bool = False) -> None:
```

\[Alpha] Create a new directory in the Sandbox.

**Deprecated (2026-04-15):** Use `Sandbox.filesystem.make_directory()` instead.

## rm

```python
def rm(self, path: str, recursive: bool = False) -> None:
```

\[Alpha] Remove a file or directory in the Sandbox.

**Deprecated (2026-04-15):** Use `Sandbox.filesystem.remove()` instead.

## watch

```python
def watch(
    self,
    path: str,
    filter: Optional[builtins.list[FileWatchEventType]] = None,
    recursive: Optional[bool] = None,
    timeout: Optional[int] = None,
) -> Iterator[FileWatchEvent]:
```

\[Alpha] Watch a file or directory in the Sandbox for changes.

## stdout

```python
@property
def stdout(self) -> _StreamReader[str]:
```

[`StreamReader`](https://modal.com/docs/reference/modal.io_streams#modalio_streamsstreamreader) for
the sandbox's stdout stream.

## stderr

```python
@property
def stderr(self) -> _StreamReader[str]:
```

[`StreamReader`](https://modal.com/docs/reference/modal.io_streams#modalio_streamsstreamreader) for
the Sandbox's stderr stream.

## stdin

```python
@property
def stdin(self) -> _StreamWriter:
```

[`StreamWriter`](https://modal.com/docs/reference/modal.io_streams#modalio_streamsstreamwriter) for
the Sandbox's stdin stream.

## returncode

```python
@property
def returncode(self) -> Optional[int]:
```

Return code of the Sandbox process if it has finished running, else `None`.

## list

```python
@staticmethod
def list(
    *, app_id: Optional[str] = None, tags: Optional[dict[str, str]] = None, client: Optional[_Client] = None
) -> AsyncGenerator["_Sandbox", None]:
```

List all Sandboxes for the current Environment or App ID (if specified). If tags are specified, only
Sandboxes that have at least those tags are returned. Returns an iterator over `Sandbox` objects.
