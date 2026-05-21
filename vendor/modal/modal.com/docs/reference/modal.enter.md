# modal.enter

```python
def enter(
    *,
    snap: bool = False,
) -> Callable[[Union[_PartialFunction, NullaryMethod]], _PartialFunction]:
```

Decorator for methods which should be executed when a new container is started.

See the [lifeycle function guide](https://modal.com/docs/guide/lifecycle-functions#enter) for more information.
