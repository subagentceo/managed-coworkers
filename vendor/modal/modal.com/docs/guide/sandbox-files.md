# Filesystem Access

There are multiple options for uploading files to a Sandbox and accessing them
from outside the Sandbox.

## Filesystem API (beta)

<Callout variant="beta">

This feature is in beta and brings significant reliability improvements compared to the previous Sandbox filesystem API, which was available in releases prior to v1.4.0 and is now deprecated. We'd love to hear your feedback — please reach out via [Slack](/slack) or email us at <support@modal.com>.

</Callout>

The most convenient way to pass data in and out of the Sandbox during
execution is to use our filesystem API:

```python
import modal

app = modal.App.lookup("sandbox-fs-demo", create_if_missing=True)

sb = modal.Sandbox.create(app=app)

# Write text to a file in the sandbox.
sb.filesystem.write_text("Hello World\n", "/tmp/test.txt")

# Read the file back from the sandbox into a string.
contents = sb.filesystem.read_text("/tmp/test.txt")
print(contents)

sb.terminate()
sb.detach()
```

It has convenience APIs for streaming file copies in both directions:

```python
from pathlib import Path
import modal

# Write a local file.
with open("local-file.txt", "w") as f:
    f.write("Hello World!\n")

app = modal.App.lookup("sandbox-fs-demo", create_if_missing=True)

sb = modal.Sandbox.create(app=app)

# Copy the local file into the sandbox.
sb.filesystem.copy_from_local("local-file.txt", "/tmp/file-in-sandbox.txt")

# Copy it back to the local filesystem.
sb.filesystem.copy_to_local("/tmp/file-in-sandbox.txt", "local-file-copy.txt")

print(Path("local-file-copy.txt").read_text())

sb.terminate()
sb.detach()
```

These APIs may be used to read files of up to 5GB and write files of any size.

However, if you have a large dataset that you want to use repeatedly from many sandboxes,
consider [using Volumes](#using-volumes).

## Using Volumes

It's possible to use Modal [Volume](/docs/reference/modal.Volume)s or
[CloudBucketMount](/docs/guide/cloud-bucket-mounts)s with Sandboxes.

Volumes and CloudBucketMounts allow you to upload data once and access that
data efficiently from many sandboxes.

To access a Volume from a Sandbox, you can use the `volumes` parameter of `Sandbox.create`:

```python notest
# Find or create a Volume with the name "my-volume".
vol = modal.Volume.from_name("my-volume", create_if_missing=True)
sb = modal.Sandbox.create(
    volumes={"/cache": vol},
    app=my_app,
)
# Read a file in the Volume.
p = sb.exec("bash", "-c", "cat /cache/some-file.txt")
print(p.stdout.read())
p.wait()

# Write a file to the Volume.
p = sb.exec("bash", "-c", "echo foo > /cache/a.txt")
p.wait()
sb.terminate(wait=True)
sb.detach()

# Access the Volume file from outside the Sandbox.
for data in vol.read_file("a.txt"):
    print(data)
```

File syncing behavior differs between Volumes and CloudBucketMounts. For
Volumes, files are only synced back to the Volume when the Sandbox terminates.
For CloudBucketMounts, files are synced automatically.

### Committing Volume changes with `sync` (v2 only)

For [Volumes v2](/docs/guide/volumes#volumes-v2-overview), you can explicitly
commit changes at any point during Sandbox execution by running the `sync`
command on the mountpoint. This persists all data and metadata changes to the
Volume's storage without waiting for the Sandbox to terminate:

```python notest
sb = modal.Sandbox.create(
    volumes={"/data": modal.Volume.from_name("my-v2-volume")},
    app=my_app,
)

# Write files to the volume
sb.exec("bash", "-c", "echo 'hello' > /data/output.txt").wait()

# Commit changes immediately
p = sb.exec("sync", "/data")
p.wait()
if p.returncode != 0:
    raise Exception(f"sync failed with exit code {p.returncode}")

# Changes are now persisted and visible to other containers
sb.terminate()
sb.detach()
```

This is particularly useful for long-running Sandboxes where you want to
persist intermediate results, or when you need changes to be visible to other
containers before the Sandbox terminates.

## Adding files to an Image

In some cases, you may want to [add a file to an Image itself](/docs/guide/images#add-local-files-with-add_local_dir-and-add_local_file).
This is useful if the file will be used by many Sandboxes, or if you
want to access that file from the Sandbox's entrypoint command.

This can be done using the
[`add_local_file`](/docs/reference/modal.Image#add_local_file) and
[`add_local_dir`](/docs/reference/modal.Image#add_local_dir) methods on the
[`Image`](/docs/reference/modal.Image) class:

```python notest
# Eagerly build the image - otherwise the Image will lazily build when the
# Sandbox is created.
image = (
    modal.Image.debian_slim()
    .add_local_dir(
        local_path="/home/user/my_dir",
        remote_path="/app",
    )
    .build(my_app)
)

sb = modal.Sandbox.create(app=my_app, image=image)
p = sb.exec("ls", "/app")
print(p.stdout.read())
p.wait()
sb.detach()
```

<!-- TODO(WRK-956) -->

<!-- ## File Watching

You can watch files or directories for changes using [`watch`](/docs/reference/modal.Sandbox#watch), which is conceptually similar to [`fsnotify`](https://pkg.go.dev/github.com/fsnotify/fsnotify).

```python notest
from modal.file_io import FileWatchEventType

async def watch(sb: modal.Sandbox):
    event_stream = sb.watch.aio(
        "/watch",
        recursive=True,
        filter=[FileWatchEventType.Create, FileWatchEventType.Modify],
    )
    async for event in event_stream:
        print(event)

async def main():
    app = modal.App.lookup("sandbox-file-watch", create_if_missing=True)
    sb = await modal.Sandbox.create.aio(app=app)
    asyncio.create_task(watch(sb))

    await sb.mkdir.aio("/watch")
    for i in range(10):
        async with await sb.open.aio(f"/watch/bar-{i}.txt", "w") as f:
            await f.write.aio(f"hello-{i}")
``` -->
