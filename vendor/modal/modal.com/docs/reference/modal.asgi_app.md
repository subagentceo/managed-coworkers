# modal.asgi\_app

```python
def asgi_app(
    *,
    label: Optional[str] = None,  # Label for created endpoint. Final subdomain will be <workspace>--<label>.modal.run.
    custom_domains: Optional[Iterable[str]] = None,  # Deploy this endpoint on a custom domain.
    requires_proxy_auth: bool = False,  # Require Modal-Key and Modal-Secret HTTP Headers on requests.
) -> Callable[[Union[_PartialFunction, NullaryFuncOrMethod]], _PartialFunction]:
```

Decorator for registering an ASGI app as a Web Function.

Asynchronous Server Gateway Interface (ASGI) is a standard for Python
web apps, supported by all popular Python web libraries.

**Usage:**

```python
from typing import Callable

@app.function()
@modal.asgi_app()
def create_asgi() -> Callable:
    ...
```

To learn how to use Modal with popular web frameworks, see the
[guide on Web Functions](https://modal.com/docs/guide/webhooks).
