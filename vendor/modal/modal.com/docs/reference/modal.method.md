# modal.method

```python
def method(
    *,
    # Set this to True if it's a non-generator function returning
    # a [sync/async] generator object
    is_generator: Optional[bool] = None,
) -> _MethodDecoratorType:
```

Decorator for methods that should be transformed into a Modal Function registered against this class's App.

**Usage:**

```python
@app.cls(cpu=8)
class MyCls:

    @modal.method()
    def f(self):
        ...
```
