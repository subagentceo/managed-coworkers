# modal.Cls

```python
class Cls(modal.object.Object)
```

Cls adds method pooling and [lifecycle hook](https://modal.com/docs/guide/lifecycle-functions) behavior
to [modal.Function](https://modal.com/docs/reference/modal.Function).

Generally, you will not construct a Cls directly.
Instead, use the [`@app.cls()`](https://modal.com/docs/reference/modal.App#cls) decorator on the App object.

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
@classmethod
def from_name(
    cls: type["_Cls"],
    app_name: str,
    name: str,
    *,
    environment_name: Optional[str] = None,
    client: Optional["_Client"] = None,
) -> "_Cls":
```

Reference a Cls from a deployed App by its name.

This is a lazy method that defers hydrating the local
object with metadata from Modal servers until the first
time it is actually used.

```python
Model = modal.Cls.from_name("other-app", "Model")
```

## with\_options

```python
@handle_deprecated_parameters
def with_options(
    self: "_Cls",
    *,
    cpu: Optional[Union[float, tuple[float, float]]] = None,
    memory: Optional[Union[int, tuple[int, int]]] = None,
    gpu: Optional[str] = None,
    env: Optional[dict[str, Optional[str]]] = None,
    secrets: Optional[Collection[_Secret]] = None,
    volumes: dict[Union[str, PurePosixPath], Union[_Volume, _CloudBucketMount]] = {},
    retries: Optional[Union[int, Retries]] = None,
    max_containers: Optional[int] = None,  # Limit on the number of containers that can be concurrently running.
    buffer_containers: Optional[int] = None,  # Additional containers to scale up while Function is active.
    scaledown_window: Optional[int] = None,  # Max amount of time a container can remain idle before scaling down.
    timeout: Optional[int] = None,
    region: Optional[Union[str, Sequence[str]]] = None,  # Region or regions to run the function on.
    cloud: Optional[str] = None,  # Cloud provider to run the function on. Possible values are aws, gcp, oci, auto.
) -> "_Cls":
```

Override the static Cls configuration with invocation-specific values.

This method will return a new variant of the Cls that will autoscale independently of the
base configuration.

Note that options cannot be "unset" with this method (i.e., if a GPU is configured in the
`@app.cls()` decorator, passing `gpu=None` here will not create a CPU-only instance).

**Usage:**

You can use this method after looking up the Cls from a deployed App or if you have a
direct reference to a Cls from another Function or local entrypoint on its App:

```python notest
Model = modal.Cls.from_name("my_app", "Model")
ModelUsingGPU = Model.with_options(gpu="A100")
ModelUsingGPU().generate.remote(input_prompt)  # Run with an A100 GPU
```

The method can be called multiple times to "stack" updates:

```python notest
Model.with_options(gpu="A100").with_options(scaledown_window=300)  # Use an A100 with slow scaledown
```

Note that container arguments (i.e. `volumes` and `secrets`) passed in subsequent calls
will not be merged.

## with\_concurrency

```python
def with_concurrency(self: "_Cls", *, max_inputs: int, target_inputs: Optional[int] = None) -> "_Cls":
```

Override the static Cls configuration with invocation-specific input concurrency settings.

**Usage:**

```python notest
Model = modal.Cls.from_name("my_app", "Model")
ModelUsingGPU = Model.with_options(gpu="A100").with_concurrency(max_inputs=100)
ModelUsingGPU().generate.remote(42)  # will run on an A100 GPU with input concurrency enabled
```

## with\_batching

```python
def with_batching(self: "_Cls", *, max_batch_size: int, wait_ms: int) -> "_Cls":
```

Override the static Cls configuration with invocation-specific dynamic batching settings.

**Usage:**

```python notest
Model = modal.Cls.from_name("my_app", "Model")
ModelUsingGPU = Model.with_options(gpu="A100").with_batching(max_batch_size=100, batch_wait_ms=1000)
ModelUsingGPU().generate.remote(42)  # will run on an A100 GPU with input concurrency enabled
```
