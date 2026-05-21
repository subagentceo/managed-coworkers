# modal.file\_io

## modal.file\_io.FileIO

```python
class FileIO(typing.Generic)
```

\[Alpha] FileIO handle, used in the Sandbox filesystem API.

Deprecated on 2026-03-09. Use the `Sandbox.filesystem` APIs instead.

The API is designed to mimic Python's io.FileIO.

Currently this API is in Alpha and is subject to change. File I/O operations
may be limited in size to 100 MiB, and the throughput of requests is
restricted in the current implementation. For our recommendations on large file transfers
see the Sandbox [filesystem access guide](https://modal.com/docs/guide/sandbox-files).

**Usage**

```python notest
import modal

app = modal.App.lookup("my-app", create_if_missing=True)

sb = modal.Sandbox.create(app=app)
f = sb.open("/tmp/foo.txt", "w")
f.write("hello")
f.close()
```

```python
def __init__(self, client: _Client, task_id: str) -> None:
```

### create

```python
@classmethod
def create(
    cls, path: str, mode: Union["_typeshed.OpenTextMode", "_typeshed.OpenBinaryMode"], client: _Client, task_id: str
) -> "_FileIO":
```

Create a new FileIO handle.

### read

```python
def read(self, n: Optional[int] = None) -> T:
```

Read n bytes from the current position, or the entire remaining file if n is None.

### readline

```python
def readline(self) -> T:
```

Read a single line from the current position.

### readlines

```python
def readlines(self) -> Sequence[T]:
```

Read all lines from the current position.

### write

```python
def write(self, data: Union[bytes, str]) -> None:
```

Write data to the current position.

Writes may not appear until the entire buffer is flushed, which
can be done manually with `flush()` or automatically when the file is
closed.

### flush

```python
def flush(self) -> None:
```

Flush the buffer to disk.

### seek

```python
def seek(self, offset: int, whence: int = 0) -> None:
```

Move to a new position in the file.

`whence` defaults to 0 (absolute file positioning); other values are 1
(relative to the current position) and 2 (relative to the file's end).

### ls

```python
@classmethod
def ls(cls, path: str, client: _Client, task_id: str) -> list[str]:
```

List the contents of the provided directory.

### mkdir

```python
@classmethod
def mkdir(cls, path: str, client: _Client, task_id: str, parents: bool = False) -> None:
```

Create a new directory.

### rm

```python
@classmethod
def rm(cls, path: str, client: _Client, task_id: str, recursive: bool = False) -> None:
```

Remove a file or directory in the Sandbox.

### watch

```python
@classmethod
def watch(
    cls,
    path: str,
    client: _Client,
    task_id: str,
    filter: Optional[list[FileWatchEventType]] = None,
    recursive: bool = False,
    timeout: Optional[int] = None,
) -> Iterator[FileWatchEvent]:
```

### close

```python
def close(self) -> None:
```

Flush the buffer and close the file.

## modal.file\_io.FileWatchEvent

```python
class FileWatchEvent(object)
```

FileWatchEvent(paths: list\[str], type: modal.file\_io.FileWatchEventType)

```python
def __init__(self, paths: list[str], type: modal.file_io.FileWatchEventType) -> None
```

## modal.file\_io.FileWatchEventType

```python
class FileWatchEventType(enum.Enum)
```

An enumeration.

The possible values are:

* `Unknown`
* `Access`
* `Create`
* `Modify`
* `Remove`

## modal.file\_io.ls

```python
async def ls(path: str, client: _Client, task_id: str) -> list[str]:
```

List the contents of the provided directory.

## modal.file\_io.mkdir

```python
async def mkdir(path: str, client: _Client, task_id: str, parents: bool = False) -> None:
```

Create a new directory.

## modal.file\_io.rm

```python
async def rm(path: str, client: _Client, task_id: str, recursive: bool = False) -> None:
```

Remove a file or directory in the Sandbox.

## modal.file\_io.watch

```python
async def watch(
    path: str,
    client: _Client,
    task_id: str,
    filter: Optional[list[FileWatchEventType]] = None,
    recursive: bool = False,
    timeout: Optional[int] = None,
) -> AsyncIterator[FileWatchEvent]:
```

Watch a file or directory for changes.
