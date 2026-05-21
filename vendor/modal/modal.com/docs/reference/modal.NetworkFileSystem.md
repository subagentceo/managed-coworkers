# modal.NetworkFileSystem

```python
class NetworkFileSystem(modal.object.Object)
```

A shared, writable file system accessible by one or more Modal functions.

By attaching this file system as a mount to one or more functions, they can
share and persist data with each other.

**Note: `NetworkFileSystem` has been deprecated and will be removed.**

**Usage**

```python
import modal

nfs = modal.NetworkFileSystem.from_name("my-nfs", create_if_missing=True)
app = modal.App()

@app.function(network_file_systems={"/root/foo": nfs})
def f():
    pass

@app.function(network_file_systems={"/root/goo": nfs})
def g():
    pass
```

Also see the CLI methods for accessing network file systems:

```
modal nfs --help
```

A `NetworkFileSystem` can also be useful for some local scripting scenarios, e.g.:

```python notest
nfs = modal.NetworkFileSystem.from_name("my-network-file-system")
for chunk in nfs.read_file("my_db_dump.csv"):
    ...
```

## hydrate

```python
def hydrate(self, client: Optional[_Client] = None) -> Self:
```

Synchronize the local object with its identity on the Modal server.

It is rarely necessary to call this method explicitly, as most operations
will lazily hydrate when needed. The main use case is when you need to
access object metadata, such as its ID.

*Added in v0.72.39*: This method replaces the deprecated `.resolve()` method.

## from\_name

```python
@staticmethod
def from_name(
    name: str,
    *,
    environment_name: Optional[str] = None,
    create_if_missing: bool = False,
    client: Optional[_Client] = None,
) -> "_NetworkFileSystem":
```

Reference a NetworkFileSystem by its name, creating if necessary.

This is a lazy method that defers hydrating the local object with
metadata from Modal servers until the first time it is actually
used.

```python notest
nfs = NetworkFileSystem.from_name("my-nfs", create_if_missing=True)

@app.function(network_file_systems={"/data": nfs})
def f():
    pass
```

## ephemeral

```python
@classmethod
@contextmanager
def ephemeral(
    cls: type["_NetworkFileSystem"],
    client: Optional[_Client] = None,
    environment_name: Optional[str] = None,
) -> Iterator["_NetworkFileSystem"]:
```

Creates a new ephemeral network filesystem within a context manager:

Usage:

```python
with modal.NetworkFileSystem.ephemeral() as nfs:
    assert nfs.listdir("/") == []
```

```python notest
async with modal.NetworkFileSystem.ephemeral() as nfs:
    assert await nfs.listdir("/") == []
```

## delete

```python
@staticmethod
def delete(name: str, client: Optional[_Client] = None, environment_name: Optional[str] = None):
```

## write\_file

```python
@live_method
def write_file(self, remote_path: str, fp: BinaryIO, progress_cb: Optional[Callable[..., Any]] = None) -> int:
```

Write from a file object to a path on the network file system, atomically.

Will create any needed parent directories automatically.

If remote\_path ends with `/` it's assumed to be a directory and the
file will be uploaded with its current name to that directory.

## read\_file

```python
@live_method_gen
def read_file(self, path: str) -> Iterator[bytes]:
```

Read a file from the network file system

## iterdir

```python
@live_method_gen
def iterdir(self, path: str) -> Iterator[FileEntry]:
```

Iterate over all files in a directory in the network file system.

* Passing a directory path lists all files in the directory (names are relative to the directory)
* Passing a file path returns a list containing only that file's listing description
* Passing a glob path (including at least one \* or \*\* sequence) returns all files matching
  that glob path (using absolute paths)

## add\_local\_file

```python
@live_method
def add_local_file(
    self,
    local_path: Union[Path, str],
    remote_path: Optional[Union[str, PurePosixPath, None]] = None,
    progress_cb: Optional[Callable[..., Any]] = None,
):
```

## add\_local\_dir

```python
@live_method
def add_local_dir(
    self,
    local_path: Union[Path, str],
    remote_path: Optional[Union[str, PurePosixPath, None]] = None,
    progress_cb: Optional[Callable[..., Any]] = None,
):
```

## listdir

```python
@live_method
def listdir(self, path: str) -> list[FileEntry]:
```

List all files in a directory in the network file system.

* Passing a directory path lists all files in the directory (names are relative to the directory)
* Passing a file path returns a list containing only that file's listing description
* Passing a glob path (including at least one \* or \*\* sequence) returns all files matching
  that glob path (using absolute paths)

## remove\_file

```python
@live_method
def remove_file(self, path: str, recursive=False):
```

Remove a file in a network file system.
