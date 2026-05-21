# modal.container\_process

## modal.container\_process.ContainerProcess

```python
class ContainerProcess(typing.Generic)
```

Represents a running process in a container.

Container processes communicate via direct communication with
the Modal worker where the container is running.

```python
def __init__(
    self,
    process_id: str,
    task_id: str,
    client: _Client,
    command_router_client: TaskCommandRouterClient,
    stdout: StreamType = StreamType.PIPE,
    stderr: StreamType = StreamType.PIPE,
    exec_deadline: Optional[float] = None,
    text: bool = True,
    by_line: bool = False,
) -> None:
```

### stdout

```python
@property
def stdout(self) -> _StreamReader[T]:
```

StreamReader for the container process's stdout stream.

### stderr

```python
@property
def stderr(self) -> _StreamReader[T]:
```

StreamReader for the container process's stderr stream.

### stdin

```python
@property
def stdin(self) -> _StreamWriter:
```

StreamWriter for the container process's stdin stream.

### returncode

```python
@property
def returncode(self) -> int:
```

### poll

```python
def poll(self) -> Optional[int]:
```

Check if the container process has finished running.

Returns `None` if the process is still running, else returns the exit code.

### wait

```python
def wait(self) -> int:
```

Wait for the container process to finish running. Returns the exit code.
