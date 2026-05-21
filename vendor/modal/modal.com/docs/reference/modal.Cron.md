# modal.Cron

```python
class Cron(modal.schedule.Schedule)
```

Cron jobs are a type of schedule, specified using the
[Unix cron tab](https://crontab.guru/) syntax.

The alternative schedule type is the [`modal.Period`](https://modal.com/docs/reference/modal.Period).

**Usage**

```python
import modal
app = modal.App()


@app.function(schedule=modal.Cron("* * * * *"))
def f():
    print("This function will run every minute")
```

We can specify different schedules with cron strings, for example:

```python
modal.Cron("5 4 * * *")  # run at 4:05am UTC every night
modal.Cron("0 9 * * 4")  # runs every Thursday at 9am UTC
```

We can also optionally specify a timezone, for example:

```python
# Run daily at 6am New York time, regardless of whether daylight saving
# is in effect (i.e. at 11am UTC in the winter, and 10am UTC in the summer):
modal.Cron("0 6 * * *", timezone="America/New_York")
```

If no timezone is specified, the default is UTC.

```python
def __init__(
    self,
    cron_string: str,
    timezone: str = "UTC",
) -> None:
```

Construct a schedule that runs according to a cron expression string.
