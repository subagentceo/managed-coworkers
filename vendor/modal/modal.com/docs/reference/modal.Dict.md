# modal.Dict

```python
class Dict(modal.object.Object)
```

Distributed dictionary for storage in Modal apps.

Dict contents can be essentially any object so long as they can be serialized by
`cloudpickle`. This includes other Modal objects. If writing and reading in different
environments (eg., writing locally and reading remotely), it's necessary to have the
library defining the data type installed, with compatible versions, on both sides.
Additionally, cloudpickle serialization is not guaranteed to be deterministic, so it is
generally recommended to use primitive types for keys.

**Lifetime of a Dict and its items**

An individual Dict entry will expire after 7 days of inactivity (no reads or writes). The
Dict entries are written to durable storage.

Legacy Dicts (created before 2025-05-20) will still have entries expire 30 days after being
last added. Additionally, contents are stored in memory on the Modal server and could be lost
due to unexpected server restarts. Eventually, these Dicts will be fully sunset.

**Usage**

```python
from modal import Dict

my_dict = Dict.from_name("my-persisted_dict", create_if_missing=True)

my_dict["some key"] = "some value"
my_dict[123] = 456

assert my_dict["some key"] == "some value"
assert my_dict[123] == 456
```

The `Dict` class offers a few methods for operations that are usually accomplished
in Python with operators, such as `Dict.put` and `Dict.contains`. The advantage of
these methods is that they can be safely called in an asynchronous context by using
the `.aio` suffix on the method, whereas their operator-based analogues will always
run synchronously and block the event loop.

For more examples, see the [guide](https://modal.com/docs/guide/dicts-and-queues#modal-dicts).

## hydrate

```python
def hydrate(self, client: Optional[_Client] = None) -> Self:
```

Synchronize the local object with its identity on the Modal server.

It is rarely necessary to call this method explicitly, as most operations
will lazily hydrate when needed. The main use case is when you need to
access object metadata, such as its ID.

*Added in v0.72.39*: This method replaces the deprecated `.resolve()` method.

## objects

```python
objects: DictManager
```

Namespace with methods for managing named Dict objects.

### objects.create

```python
def create(
    self,
    name: str,  # Name to use for the new Dict
    *,
    allow_existing: bool = False,  # If True, no-op when the Dict already exists
    environment_name: Optional[str] = None,  # Uses active environment if not specified
    client: Optional[_Client] = None,  # Optional client with Modal credentials
) -> None:
```

Create a new Dict object.

**Examples:**

```python notest
modal.Dict.objects.create("my-dict")
```

Dicts will be created in the active environment, or another one can be specified:

```python notest
modal.Dict.objects.create("my-dict", environment_name="dev")
```

By default, an error will be raised if the Dict already exists, but passing
`allow_existing=True` will make the creation attempt a no-op in this case.

```python notest
modal.Dict.objects.create("my-dict", allow_existing=True)
```

Note that this method does not return a local instance of the Dict. You can use
`modal.Dict.from_name` to perform a lookup after creation.

Added in v1.1.2.

### objects.list

```python
def list(
    self,
    *,
    max_objects: Optional[int] = None,  # Limit results to this size
    created_before: Optional[Union[datetime, str]] = None,  # Limit based on creation date
    environment_name: str = "",  # Uses active environment if not specified
    client: Optional[_Client] = None,  # Optional client with Modal credentials
) -> builtins.list["_Dict"]:
```

Return a list of hydrated Dict objects.

**Examples:**

```python
dicts = modal.Dict.objects.list()
print([d.name for d in dicts])
```

Dicts will be retreived from the active environment, or another one can be specified:

```python notest
dev_dicts = modal.Dict.objects.list(environment_name="dev")
```

By default, all named Dict are returned, newest to oldest. It's also possible to limit the
number of results and to filter by creation date:

```python
dicts = modal.Dict.objects.list(max_objects=10, created_before="2025-01-01")
```

Added in v1.1.2.

### objects.delete

```python
def delete(
    self,
    name: str,  # Name of the Dict to delete
    *,
    allow_missing: bool = False,  # If True, don't raise an error if the Dict doesn't exist
    environment_name: Optional[str] = None,  # Uses active environment if not specified
    client: Optional[_Client] = None,  # Optional client with Modal credentials
):
```

Delete a named Dict.

Warning: This deletes an *entire Dict*, not just a specific key.
Deletion is irreversible and will affect any Apps currently using the Dict.

**Examples:**

```python notest
await modal.Dict.objects.delete("my-dict")
```

Dicts will be deleted from the active environment, or another one can be specified:

```python notest
await modal.Dict.objects.delete("my-dict", environment_name="dev")
```

Added in v1.1.2.

## name

```python
@property
def name(self) -> Optional[str]:
```

## ephemeral

```python
@classmethod
@contextmanager
def ephemeral(
    cls: type["_Dict"],
    *,
    client: Optional[_Client] = None,
    environment_name: Optional[str] = None,
) -> Iterator["_Dict"]:
```

Creates a new ephemeral Dict within a context manager:

Usage:

```python
from modal import Dict

with Dict.ephemeral() as d:
    d["foo"] = "bar"
```

```python notest
async with Dict.ephemeral() as d:
    await d.put.aio("foo", "bar")
```

## from\_name

```python
@staticmethod
def from_name(
    name: str,
    *,
    environment_name: Optional[str] = None,
    create_if_missing: bool = False,
    client: Optional[_Client] = None,
) -> "_Dict":
```

Reference a named Dict, creating if necessary.

This is a lazy method that defers hydrating the local
object with metadata from Modal servers until the first
time it is actually used.

```python
d = modal.Dict.from_name("my-dict", create_if_missing=True)
d[123] = 456
```

## from\_id

```python
@staticmethod
def from_id(
    dict_id: str,
    client: Optional[_Client] = None,
) -> "_Dict":
```

Construct a Dict from an id and look up the Dict metadata.

This is a lazy method that defers hydrating the local
object with metadata from Modal servers until the first
time it is actually used.

The ID of a Dict object can be accessed using `.object_id`.

**Example:**

```python notest
@app.function()
def my_worker(dict_id: str):
    d = modal.Dict.from_id(dict_id)
    d["key"] = "Hello from remote function!"

with modal.Dict.ephemeral() as d:
    # Pass the dict ID to a remote function
    my_worker.remote(d.object_id)
    print(d["key"])  # "Hello from remote function!"
```

## info

```python
@live_method
def info(self) -> DictInfo:
```

Return information about the Dict object.

## clear

```python
@live_method
def clear(self) -> None:
```

Remove all items from the Dict.

## get

```python
@live_method
def get(self, key: Any, default: Optional[Any] = None) -> Any:
```

Get the value associated with a key.

Returns `default` if key does not exist.

## contains

```python
@live_method
def contains(self, key: Any) -> bool:
```

Return if a key is present.

## len

```python
@live_method
def len(self) -> int:
```

Return the length of the Dict.

Note: This is an expensive operation and will return at most 100,000.

## update

```python
@live_method
def update(self, other: Optional[Mapping] = None, /, **kwargs) -> None:
```

Update the Dict with additional items.

## put

```python
@live_method
def put(self, key: Any, value: Any, *, skip_if_exists: bool = False) -> bool:
```

Add a specific key-value pair to the Dict.

Returns True if the key-value pair was added and False if it wasn't because the key already existed and
`skip_if_exists` was set.

## pop

```python
@live_method
def pop(self, key: Any, default: Any = _NO_DEFAULT) -> Any:
```

Remove a key from the Dict, returning the value if it exists.

If key is not found, return default if provided, otherwise raise KeyError.

## keys

```python
@live_method_gen
def keys(self) -> Iterator[Any]:
```

Return an iterator over the keys in this Dict.

Note that (unlike with Python dicts) the return value is a simple iterator,
and results are unordered.

## values

```python
@live_method_gen
def values(self) -> Iterator[Any]:
```

Return an iterator over the values in this Dict.

Note that (unlike with Python dicts) the return value is a simple iterator,
and results are unordered.

## items

```python
@live_method_gen
def items(self) -> Iterator[tuple[Any, Any]]:
```

Return an iterator over the (key, value) tuples in this Dict.

Note that (unlike with Python dicts) the return value is a simple iterator,
and results are unordered.
