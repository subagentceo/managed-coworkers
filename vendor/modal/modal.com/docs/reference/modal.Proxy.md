# modal.Proxy

```python
class Proxy(modal.object.Object)
```

Proxy objects give your Modal containers a static outbound IP address.

This can be used for connecting to a remote address with network whitelist, for example
a database. See [the guide](https://modal.com/docs/guide/proxy-ips) for more information.

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
    client: Optional[_Client] = None,
) -> "_Proxy":
```

Reference a Proxy by its name.

In contrast to most other Modal objects, new Proxy objects must be
provisioned via the Dashboard and cannot be created on the fly from code.
