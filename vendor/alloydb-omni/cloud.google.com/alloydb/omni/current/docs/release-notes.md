-   [Home](https://docs.cloud.google.com/)
-   [Documentation](https://docs.cloud.google.com/docs)
-   [Databases](https://docs.cloud.google.com/docs/databases)
-   [AlloyDB Omni](https://docs.cloud.google.com/alloydb/omni/docs)
-   [Resources](https://docs.cloud.google.com/alloydb/omni/docs/resources)

Send feedback

# AlloyDB Omni release notes Stay organized with collections Save and categorize content based on your preferences.

This page contains release notes for features and updates to AlloyDB Omni.

You can see the latest product updates for all of Google Cloud on the [Google Cloud](/release-notes) page, browse and filter all release notes in the [Google Cloud console](https://console.cloud.google.com/release-notes), or programmatically access release notes in [BigQuery](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=google_cloud_release_notes&t=release_notes&page=table).

To get the latest product updates delivered to you, add the URL of this page to your [feed reader](https://wikipedia.org/wiki/Comparison_of_feed_aggregators), or add the [feed URL](https://docs.cloud.google.com/feeds/alloydbomni-release-notes.xml) directly.

## May 08, 2026

Announcement

The AlloyDB Omni Kubernetes operator (version 1.7.0) is officially certified for Red Hat OpenShift. The operator and its associated database images are validated to run optimally and securely on Red Hat OpenShift.

This release includes the following:

-   OpenShift Certified Catalog: the AlloyDB Omni Operator is now officially listed on the [OpenShift Certified Catalog](https://catalog.redhat.com/en/software/container-stacks/detail/6837eb3b9137db6941d32436#overview).
-   Built-in management: discover, install, and manage the operator using OpenShift's built-in Operator Lifecycle Manager (OLM) user interface.
-   OLM support: support for OLM bundles is available, facilitating a seamless, one-click installation experience and automated management for enterprise deployments. For more information, see [Install the AlloyDB Omni operator](/alloydb/omni/kubernetes/current/docs/deploy-kubernetes#olm_1).
-   This certification is supported by AlloyDB Omni versions starting with 16.11.0, 17.7.0, and 18.1.0.

## April 22, 2026

Announcement

[AlloyDB Omni using the Red Hat RPM orchestrator](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/overview) is now available in [Preview](https://docs.cloud.google.com/products#product-launch-stages) for AlloyDB Omni version 18.1.0. To get started, [submit this form to request access](https://forms.gle/zxuHekMtV67Bw9Av9).

This release provides full orchestration for AlloyDB Omni Red Hat RPM orchestrator and includes the following features:

-   Provides complete automation for deployment and a centralized control plane to manage AlloyDB Omni using the Red Hat RPM orchestrator. For more information, see [Install the AlloyDB Omni orchestrator](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/install-orchestrator).
-   Streamlines provisioning of AlloyDB Omni software using an integrated Ansible collection. For more information, see [Install AlloyDB Omni components](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/install-components).
-   Simplifies initial setup and cluster creation for faster environment readiness. For more information, see [Create a cluster](/alloydb/omni/redhat-orchestrator/18.1.0/docs/create-cluster).
-   Supports high availability and automated failover for the Red Hat RPM orchestrator deployment option, with built-in health monitoring. For more information, see [Manage High Availability](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/manage-high-availability).
-   Supports backup and restore using pgBackRest. For more information, see [Backup and restore using pgBackRest](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/backup-restore-pgbackrest).
-   Supports automated configuration and rotation of SSL/TLS certificates for secure database communication. For more information, see [Configure TLS Certificates](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/tls/overview).
-   Supports external load balancers to manage traffic and enhance availability. For more information, see [Configure a load balancer](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/configure-load-balancer).
-   Integrates seamlessly with PgBouncer connection pooler for efficient connection management. For more information, see [Use the PgBouncer connection pooler](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/use-pgbouncer-connection-pooler).
-   Centrally manages PostgreSQL configuration settings and database parameters using the automated control plane. For more information, see [Configure database parameters](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/configure-database-parameters).
-   Supports automated log management, enabling log redirection to a log volume for optimal disk usage and auditability. For more information, see [Configure logging for a cluster](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/configure-logging-cluster).
-   Generates diagnosis dump files with system state and diagnostic logs to troubleshoot issues. For more information, see [Generate diagnosis dump files](https://docs.cloud.google.com/alloydb/omni/redhat-orchestrator/18.1.0/docs/manage-dump-files).

Change

The naming conventions for AlloyDB Omni deployment options are updated to more accurately reflect their respective installation and orchestration methods. The following table summarizes the primary name changes:

**Original name**

**New name**

AlloyDB Omni for containers

AlloyDB Omni using containers

AlloyDB Omni for Kubernetes

AlloyDB Omni using the container orchestrator

AlloyDB Omni for Linux

AlloyDB Omni using RPM

Red Hat RPM orchestrator

AlloyDB Omni using the RPM orchestrator

This update clarifies the distinction between AlloyDB Omni deployment environments (such as Kubernetes or standalone Linux) and the packaging and orchestration technologies used to manage them. For more information, see [Choose your deployment environment](/alloydb/omni/docs/choose-deployment).

Change

The naming conventions for AlloyDB Omni deployment options are updated to more accurately reflect their respective installation and orchestration methods.
The following table summarizes the primary name changes:

**Original name**

**New name**

AlloyDB Omni for containers

AlloyDB Omni using containers

AlloyDB Omni for Kubernetes

AlloyDB Omni using the container orchestrator

AlloyDB Omni for Linux

AlloyDB Omni using RPM

Red Hat RPM orchestrator

AlloyDB Omni using the RPM orchestrator

This update clarifies the distinction between AlloyDB Omni deployment environments (such as Kubernetes or standalone Linux) and the packaging and orchestration technologies used to manage them. For more information, see [Choose your deployment environment](/alloydb/omni/docs/choose-deployment).

Change

The naming conventions for AlloyDB Omni deployment options are updated to more accurately reflect their respective installation and orchestration methods.
The following table summarizes the primary name changes:

**Original name**

**New name**

AlloyDB Omni for containers

AlloyDB Omni using containers

AlloyDB Omni for Kubernetes

AlloyDB Omni using the container orchestrator

AlloyDB Omni for Linux

AlloyDB Omni using RPM

Red Hat RPM orchestrator

AlloyDB Omni using the RPM orchestrator

This update clarifies the distinction between AlloyDB Omni deployment environments (such as Kubernetes or standalone Linux) and the packaging and orchestration technologies used to manage them. For more information, see [Choose your deployment environment](/alloydb/omni/docs/choose-deployment).

Change

The naming conventions for AlloyDB Omni deployment options are updated to more accurately reflect their respective installation and orchestration methods.
The following table summarizes the primary name changes:

**Original name**

**New name**

AlloyDB Omni for containers

AlloyDB Omni using containers

AlloyDB Omni for Kubernetes

AlloyDB Omni using the container orchestrator

AlloyDB Omni for Linux

AlloyDB Omni using RPM

Red Hat RPM orchestrator

AlloyDB Omni using the RPM orchestrator

This update clarifies the distinction between AlloyDB Omni deployment environments (such as Kubernetes or standalone Linux) and the packaging and orchestration technologies used to manage them. For more information, see [Choose your deployment environment](/alloydb/omni/docs/choose-deployment).

## April 09, 2026

Announcement

The [AlloyDB Omni Kubernetes operator](/alloydb/omni/kubernetes/18.1.0/docs/deploy-kubernetes) version 1.7.0 is generally available ([GA](/products#product-launch-stages)) and includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL 18.1.0. For more information, see [AlloyDB Omni Kubernetes operator](/alloydb/omni/kubernetes/18.1.0/docs/overview). This operator version also supports AlloyDB Omni minor versions 15.15.0, 16.11.0, and 17.7.0.
-   Enterprise readiness for AlloyDB Omni on [Google Distributed Cloud Software Only](/kubernetes-engine/distributed-cloud/bare-metal/docs) lets the operator manage the full database lifecycle, including [provisioning](/alloydb/omni/kubernetes/18.1.0/docs/deploy-kubernetes), [high availability](/alloydb/omni/kubernetes/18.1.0/docs/high-availability/setup), and [disaster recovery](/alloydb/omni/kubernetes/18.1.0/docs/cross-data-center-replication/about-cross-data-center-replication), directly on your own physical bare metal infrastructure.
-   Database pods feature a hardened security posture with restricted Kubernetes `securityContext` settings enabled by default, including non-root execution and read-only root filesystems.
-   Added support for Transparent Data Encryption (TDE) ([Preview](https://cloud.google.com/products#product-launch-stages)), providing at-rest encryption for database clusters. This is available beginning with AlloyDB Omni 18.1.0. For more information, see [Transparent Data Encryption](/alloydb/omni/kubernetes/18.1.0/docs/transparent-data-encryption-omni).
-   Added support for custom configuration of database port numbers for your clusters. For more information, see [Configure custom ports](/alloydb/omni/kubernetes/18.1.0/docs/run-connect).
-   Introduced a framework for defining and collecting custom database metrics to enhance monitoring capabilities. For more information, see [Configure custom metrics](/alloydb/omni/kubernetes/18.1.0/docs/improve-observability-custom-monitoring-metrics).
-   Added detailed memory allocation metrics for improved memory and performance monitoring. For more information, see [AlloyDB Omni metrics](/alloydb/omni/kubernetes/18.1.0/docs/reference/omni-metrics).
-   Improved Active Directory integration with support for `hostssl` connection types, multi-domain LDAP base DNs, and customizable LDAP search attributes. For more information, see [Integrate Active Directory](/alloydb/omni/kubernetes/18.1.0/docs/integrate-active-directory-kubernetes-operator).
-   Added support for rewind trigger functionality in symmetric disaster recovery configurations. For more information, see [Work with cross-data-center replication](/alloydb/omni/kubernetes/18.1.0/docs/cross-data-center-replication/work-with-cross-data-center-replication).
-   You can perform CPU and memory scaling operations with minimal downtime using Low Downtime Maintenance ([Preview](https://cloud.google.com/products#product-launch-stages)). For more information, see [Scale a database cluster](/alloydb/omni/kubernetes/18.1.0/docs/deploy-kubernetes#scale).
-   Additional [database flags](/alloydb/omni/kubernetes/18.1.0/docs/reference/database-flags) are supported.
-   All current and earlier versions of Helm charts are available in the [Artifact Registry](https://pantheon.corp.google.com/artifacts/docker/alloydb-omni/us/gcr.io/alloydbomni-operator?rapt=AEjHL4NMzSdtsKxud4VKouvR3VJJHW7nf35vtrNV5vp_Ct9bJQYJFIb2a-TObQ1goelzrCPt-J2NFHHDIsEcsykeHublDMDJHkxtsSegSCNviRr4MyZExiQ). However, Helm charts are no longer available in Cloud Storage.
-   Updated manual major version upgrade instructions to use versioned data directory paths. For more information, see [Upgrade database major version](/alloydb/omni/kubernetes/18.1.0/docs/upgrade-kubernetes-database-major-version).
-   Updated [Choose compatible Kubernetes operator and database cluster versions](/alloydb/omni/kubernetes/18.1.0/docs/choose-compatible-versions) with latest versions.

Announcement

[AlloyDB Omni](/alloydb/omni/containers/18.1.0/docs/overview) version 18.1.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 18.1.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [18.1](https://www.postgresql.org/docs/release/18.1/).
-   Added support for Transparent Data Encryption (TDE) ([Preview](https://cloud.google.com/products#product-launch-stages)), enabling at-rest encryption for database clusters. This is available beginning with AlloyDB Omni for containers 18.1.0. For more information, see [Transparent Data Encryption for containers](/alloydb/omni/containers/18.1.0/docs/transparent-data-encryption-omni).
-   Data checksums aren't enabled by default for AlloyDB Omni. You must enable them explicitly by passing `--data-checksums` to `initdb` through the `POSTGRES_INITDB_ARGS` environment variable.

Announcement

[AlloyDB Omni](/alloydb/omni/containers/17.7.0/docs/overview) version 17.7.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 17.7.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [17.7](https://www.postgresql.org/docs/release/17.7/).
-   Support for additional [database flags](/alloydb/omni/containers/17.7.0/docs/reference/database-flags).

Fixed

Reliability improvement for backups from standby instances: Fixed an issue in the AlloyDB Omni Kubernetes operator version 1.7.0 where backups taken from a standby instance could be incomplete if the primary instance were under heavy load. The backup process now performs a checkpoint before starting to ensure data integrity.

Upgrade required: If you use the backup from standby feature, upgrade to the latest versions of the AlloyDB Omni control plane and data plane. After you perform the upgrade, take a new backup to make sure that your data is fully protected.

Announcement

[AlloyDB Omni](/alloydb/omni/containers/16.11.0/docs/overview) version 16.11.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.11.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.11](https://www.postgresql.org/docs/release/16.11/).
-   Support for additional [database flags](/alloydb/omni/containers/16.11.0/docs/reference/database-flags).

Issue

Restore operations might fail if a database backup is running at the same time. If this occurs, retry the restore operation after some delay.

Announcement

[AlloyDB Omni](/alloydb/omni/containers/15.15.0/docs/overview) version 15.15.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.15.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.15](https://www.postgresql.org/docs/release/15.15/).
-   Adds support for heartbeat telemetry in AlloyDB Omni version 15.15.0. For more information, see [Enable and disable AlloyDB Omni telemetry](/alloydb/omni/containers/15.15.0/docs/install).
-   Support for additional [database flags](/alloydb/omni/containers/15.15.0/docs/reference/database-flags).

## April 07, 2026

Announcement

AlloyDB Omni version 18.1.0 is available in [Preview](https://cloud.google.com/products#product-launch-stages). Version 18.1.0 is available as a Docker image and as an RPM package for Linux. To get started, [submit this form to request access](https://forms.gle/zxuHekMtV67Bw9Av9).

Version 18.1.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [18.1](https://www.postgresql.org/docs/release/18.1/) in [Preview](https://cloud.google.com/products#product-launch-stages).

-   To automate the process of vacuuming and collectively update the table statistics, AlloyDB Omni supports adaptive autovacuum. For more information, see [Configure adaptive autovacuum](/alloydb/omni/linux/18.1.0/docs/adaptive-autovacuum).

-   AlloyDB AI lets you query remote ML models using the `google_ml_integration` extension to work with online predictions and text embeddings generated from ML models. For more information, see [Install AlloyDB Omni with AlloyDB AI](/alloydb/omni/linux/18.1.0/docs/install-with-alloydb-ai).

-   Connect your AlloyDB Omni instance to agents that support the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro), which help you with development workflows. For more information, see [Use AlloyDB Omni with MCP, Gemini CLI, and other agents](/alloydb/omni/linux/18.1.0/docs/connect-ide-using-mcp-toolbox).

-   Build LLM-powered applications using LlamaIndex. For more information, see [Build LLM-powered applications using LlamaIndex](/alloydb/omni/linux/18.1.0/docs/ai/build-llm-apps-using-llamaindex).

-   Generate vector embeddings using an LLM hosted by Vertex AI that translates a text string into an embedding, which is the model's representation of the given text's semantic meaning as a numeric vector. For more information, see [Generate embeddings](/alloydb/omni/linux/18.1.0/docs/ai/work-with-embeddings).

-   Set up, configure, and generate SQL statements using AlloyDB AI natural language, which lets you create user-facing generative AI applications using natural language to query databases. For more information, see [Generate SQL queries from natural language](/alloydb/omni/linux/18.1.0/docs/ai/generate-sql-queries-natural-language).

-   Protect your data by configuring AlloyDB Omni to work with Barman or pgBackRest, which are open-source database backup servers. For more information, see [Set up Barman for AlloyDB Omni](/alloydb/omni/linux/18.1.0/docs/install-configure-barman) and [Set up pgBackRest for AlloyDB Omni on Linux](/alloydb/omni/linux/18.1.0/docs/set-up-pgbackrest).

-   Parameterized secure views provide application data security and row access control using SQL views. This helps ensure that application users can view only the data that they're supposed to access. For more information, see [Parameterized secure views overview](/alloydb/omni/linux/18.1.0/docs/parameterized-secure-views-overview).

-   Set up a high availability configuration for AlloyDB Omni. This only covers creating a new AlloyDB Omni instance in a high availability configuration. For more information, see [Create a high availability setup](/alloydb/omni/linux/18.1.0/docs/high-availability/setup). Then, [Test your high availability setup](/alloydb/omni/linux/18.1.0/docs/high-availability/test).

-   Use the AlloyDB Omni monitor to manage AlloyDB Omni user roles, monitor the activity of your AlloyDB Omni server, and update or remove your AlloyDB Omni installation. For more information, see [Manage and monitor AlloyDB Omni](/alloydb/omni/linux/18.1.0/docs/manage).

-   AlloyDB Omni only supports the `io_method` of worker and sync mode, with worker as default.


## March 05, 2026

Security

The [AlloyDB Omni Kubernetes operator](/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.6.3 is generally available ([GA](/products#product-launch-stages)) and includes the following security fixes:

-   A security fix for [CVE-2025-68121](https://security-tracker.debian.org/tracker/CVE-2025-68121) is implemented.

## February 25, 2026

Announcement

The [AlloyDB Omni Kubernetes operator](/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.6.2 is generally available ([GA](/products#product-launch-stages)) and includes the following bug fixes:

-   Fixed an issue in Kubernetes clusters where, in some cases, a large number of database parameters in a DBCluster manifest caused redundant configuration updates and reloads, potentially slowing down other operations.

## February 13, 2026

Announcement

The [AlloyDB Omni Kubernetes operator](/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.6.1 is generally available ([GA](/products#product-launch-stages)) and includes the following bug fixes:

-   Resolved Kubernetes secret resource quota overcounting by improving Kubernetes client logic and by reducing secret churn.
-   Fixed PgBouncer status flapping and continuous reconciler requests.

## December 16, 2025

Announcement

AlloyDB Omni for Linux is now available in [Preview](https://cloud.google.com/products#product-launch-stages) with AlloyDB Omni version 17.5.0. AlloyDB Omni is a downloadable, self-managed version of AlloyDB for PostgreSQL. AlloyDB Omni for Linux is suitable for deployment in non-containerized environments such as virtual machines or on bare metal. Available as an RPM package, you can [install](https://docs.cloud.google.com/alloydb/omni/linux/current/docs/available-download-install-options) AlloyDB Omni directly on Red Hat Enterprise Linux (RHEL) 9 and Rocky Linux 9.

AlloyDB Omni for Linux is well suited for modernizing legacy applications, edge computing scenarios, and development environments where you need a powerful database that mirrors the managed AlloyDB service. For more information, see the [AlloyDB Omni for Linux overview](https://docs.cloud.google.com/alloydb/omni/linux/current/docs/overview).

To get started with this deployment model, [submit this form to request access](https://forms.gle/zxuHekMtV67Bw9Av9).

## December 15, 2025

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 17.5.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 17.5.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [17.5](https://www.postgresql.org/docs/release/17.5/).
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/kubernetes/current/docs/ai/natural-language-overview).
-   Use parameterized secure views, which provide a secure interface for application developers by improving data security and row access control while using SQL. This feature is in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Parameterized secure views overview](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/parameterized-secure-views-overview).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 16.9.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.9.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.9](https://www.postgresql.org/docs/release/16.9/).
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/kubernetes/16.9.0/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/kubernetes/16.9.0/docs/ai/natural-language-overview).
-   This release adds support for parametrized secure views.

Fixed

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/16.9.0/docs/overview) version 16.9.0 includes fixes for [major version upgrades](https://cloud.google.com/alloydb/omni/kubernetes/16.9.0/docs/upgrade-kubernetes-database-major-version). The supported upgrade path is from version 15.13.0 to 16.9.0.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 15.13.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.13.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.13](https://www.postgresql.org/docs/release/15.13/).
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/kubernetes/15.13.0/docs/ai/natural-language-overview).
-   This release adds support for parametrized secure views.
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/kubernetes/15.13.0/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.

Announcement

The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.6.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)) and includes the following features and bug fixes:

-   New metrics for [Backup](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/custom-resource-metrics-kubernetes-operator#backup-metrics) and [BackupPlan](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/custom-resource-metrics-kubernetes-operator#backupplan-metrics) custom resources to provide better visibility into your backup operations. You can now monitor key metrics such as backup status, duration, and size for `Backup` resources, and the status and schedule of `BackupPlan` resources. The [Backup](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/kubernetes-crds-1.6.0/backup) API is extended to include more detailed status information, such as `startTime`, `endTime`, `wal`, `lsn`, and `size`.

-   The default AlloyDB Omni database images for PostgreSQL 16.9.0+ and 17.5.0+ are now based on UBI 9, while the PostgreSQL 15 track remains on its Debian base. The AlloyDB Omni Kubernetes operator provides a seamless upgrade path between them by introducing two distinct base image tracks for database clusters: Debian-based and UBI-based. You can now specify the base operating system of the database image by using the new `databaseImageOSType` field in the DBCluster custom resource. For more information, see [DBCluster Spec schema](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/kubernetes-crds-1.6.0/dbcluster#spec_schema).

-   Ultra-fast cache and columnar engine enhancements:

    -   You can now use `emptyDir` volumes for [ephemeral disk caching](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/configure-disk-cache), providing temporary fast storage tied to the pod's lifecycle without persisting data if the pod is rescheduled.
    -   You can now [configure a dedicated device](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/columnar-engine/configure#configure-storage-cache) for the columnar engine storage cache.
-   You can configure the operator to [use a custom certificate issuer of your choice for TLS certificates](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/manage-certificates-kubernetes-operator). This feature lets you chain all certificates, including those for control plane components, back to your own trusted root CA, providing control over your TLS connections and allowing for integration with your existing public key infrastructure.

-   You can now view [controller-runtime metrics](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/omni-metrics#controller-runtime-metrics) to monitor key components of the operator, including the workqueue, reconciliations, and webhooks, to identify potential bottlenecks and to make sure the operator runs efficiently.

-   To monitor query performance in detail, you can now view new query insights metrics at a higher granularity such as `alloydb_omni_database_postgresql_insights_perquery_execution_time_us_total` and `alloydb_omni_database_postgresql_insights_pertag_execution_time_us_total`. These metrics provide insights into execution time, I/O time, and lock time, both aggregated and per query/per tag, helping you to identify and optimize expensive queries. For more information, see the [Omni Metrics reference](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/omni-metrics).

-   Active Directory group-based authorization is now generally available ([GA](https://cloud.google.com/products#product-launch-stages)), enabling granular permission management based on your Active Directory groups. For more information, see [Integrate Active Directory group support with AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/integrate-ad-group-support-kubernetes-operator).

-   You can [investigate an issue with a crash-looping database pod](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/access-crash-looping-database-pod) by pausing the operator and patching a pod's `StatefulSet` to temporarily stop the crash loop.

-   For smooth major version upgrade, we recommend to perform a [minor version upgrade](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/upgrade-kubernetes-database-minor-version) to the latest refresh before proceeding with a [major version upgrade](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/upgrade-kubernetes-database-major-version). The supported upgrade paths are from version 15.13.0 to 16.9.0, from 16.9.0 to 17.5.0, and from 15.13.0 to 17.5.0.


Change

Starting with this release, any modifications made to the [scheduling configuration](/alloydb/omni/kubernetes/current/docs/assign-nodes-cluster-scheduling) are applied immediately and trigger a database restart.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 17.5.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 17.5.0 is built on the Red Hat Universal Base Image (UBI) and includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [17.5](https://www.postgresql.org/docs/release/17.5/).
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/containers/current/docs/ai/natural-language-overview).
-   Use parameterized secure views, which provide a secure interface for application developers by improving data security and row access control while using SQL. This feature is in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Parameterized secure views overview](https://cloud.google.com/alloydb/omni/containers/current/docs/parameterized-secure-views-overview).
-   Active Directory group-based authorization is now generally available ([GA](https://cloud.google.com/products#product-launch-stages)), enabling granular permission management based on your Active Directory groups. For more information, see [Integrate Active Directory group support with AlloyDB Omni](https://docs.cloud.google.com/alloydb/omni/containers/current/docs/integrate-ad-group-support-alloydb-omni).
-   You can [investigate an issue with a crash-looping database pod](https://cloud.google.com/alloydb/omni/containers/current/docs/access-crash-looping-database-pod) by pausing the operator and patching a pod's `StatefulSet` to temporarily stop the crash loop.
-   AlloyDB Omni for containers now includes a lightweight telemetry agent that runs in the container image. This agent is enabled by default and periodically collects and sends a set of basic, pseudonymous metrics to a Google-managed endpoint. For more information, see [Enable and disable AlloyDB Omni telemetry](https://docs.cloud.google.com/alloydb/omni/containers/current/docs/install#enable-disable-telemetry).

Fixed

The AlloyDB Omni Kubernetes operator version 1.6.0 fixes a bug in the cache that might prevent the database from starting up after a restart, requiring manual intervention to recover.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 16.9.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.9.0 is built on the Red Hat Universal Base Image (UBI) and includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.9](https://www.postgresql.org/docs/release/16.9/).
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/containers/16.9.0/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/containers/16.9.0/docs/ai/natural-language-overview).
-   Use parameterized secure views, which provide a secure interface for application developers by improving data security and row access control while using SQL. This feature is in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Parameterized secure views overview](https://cloud.google.com/alloydb/omni/containers/16.9.0/docs/parameterized-secure-views-overview).
-   This version includes updates for Asynchronous I/O (AIO) and Active Directory integration.
-   Active Directory group-based authorization is now generally available ([GA](https://cloud.google.com/products#product-launch-stages)), enabling granular permission management based on your Active Directory groups. For more information, see [Integrate Active Directory group support with AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/16.9.0/docs/integrate-ad-group-support-alloydb-omni).
-   You can [investigate an issue with a crash-looping database pod](https://cloud.google.com/alloydb/omni/containers/16.9.0/docs/access-crash-looping-database-pod) by pausing the operator and patching a pod's `StatefulSet` to temporarily stop the crash loop.
-   AlloyDB Omni for containers now includes a lightweight telemetry agent that runs in the container image. This agent is enabled by default and periodically collects and sends a set of basic, pseudonymous metrics to a Google-managed endpoint. For more information, see [Enable and disable AlloyDB Omni telemetry](https://docs.cloud.google.com/alloydb/omni/containers/16.9.0/docs/install#enable-disable-telemetry).

Fixed

The AlloyDB Omni Kubernetes operator version 1.6.0 fixes a memory leak in the local operator to prevent out-of-memory (OOM) errors and subsequent crashes.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 15.13.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.13.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.13](https://www.postgresql.org/docs/release/15.13/).
-   AlloyDB AI natural language, now available in [Preview](https://cloud.google.com/products#product-launch-stages), delivers secure and accurate responses for application end user natural language questions. For more information, see [AlloyDB AI natural language overview](https://docs.cloud.google.com/alloydb/omni/containers/15.13.0/docs/ai/natural-language-overview).
-   Use parameterized secure views, which provide a secure interface for application developers by improving data security and row access control while using SQL. This feature is in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Parameterized secure views overview](https://cloud.google.com/alloydb/omni/containers/15.13.0/docs/parameterized-secure-views-overview).
-   AlloyDB Omni supports the [`credcheck`](https://cloud.google.com/alloydb/omni/containers/15.13.0/docs/reference/extensions) extension which provides general credential checks, which are evaluated during the user creation, during the password change, and user renaming.
-   You can [investigate an issue with a crash-looping database pod](https://cloud.google.com/alloydb/omni/containers/15.13.0/docs/access-crash-looping-database-pod) by pausing the operator and patching a pod's `StatefulSet` to temporarily stop the crash loop.

Issue

AlloyDB Omni DBClusters ignore the user-specified `vertexAIRegion` configuration. This issue causes all Vertex AI prediction calls to be incorrectly routed to the `us-central1` region instead of the intended region.

## July 23, 2025

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 16.8.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.8.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.8](https://www.postgresql.org/docs/release/16.8/).
-   AlloyDB Omni supports the [`pg_squeeze`](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions) extension that addresses table bloat and improves data locality.
-   You can set up the columnar engine storage cache on dedicated devices. For more information, see [Configure the columnar engine in AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/columnar-engine/configure).
-   [Improved I/O acceleration](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/improve-database-performance-using-io-acceleration) due to bug fixes in `libaio`.
-   [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) authentication integration is generally available ([GA](https://cloud.google.com/products#product-launch-stages)), providing robust user authentication for your database clusters. For more information, see [Integrate Active Directory with AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/integrate-active-directory).
-   Active Directory group-based authorization is available in [Preview](https://cloud.google.com/products#product-launch-stages), enabling granular permission management based on your Active Directory groups. For more information, see [Integrate Active Directory group support with AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/integrate-ad-group-support-alloydb-omni).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 16.8.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.8.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.8](https://www.postgresql.org/docs/release/16.8/).
-   AlloyDB Omni supports the [`pg_squeeze`](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions) extension that addresses table bloat and improves data locality.
-   You can set up the columnar engine storage cache on dedicated devices. For more information, see [Configure the columnar engine in AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/columnar-engine/configure).
-   [Improved I/O acceleration](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/improve-database-performance-using-io-acceleration) due to bug fixes in `libaio`.
-   [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) authentication integration is generally available ([GA](https://cloud.google.com/products#product-launch-stages)), providing robust user authentication for your database clusters. For more information, see [Integrate Active Directory with AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/integrate-active-directory).
-   Active Directory group-based authorization is available in [Preview](https://cloud.google.com/products#product-launch-stages), enabling granular permission management based on your Active Directory groups. For more information, see [Integrate Active Directory group support with AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/integrate-ad-group-support-alloydb-omni).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 15.12.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.12.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.12](https://www.postgresql.org/docs/release/15.12/).
-   AlloyDB Omni supports the [`pg_squeeze`](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions) extension that addresses table bloat and improves data locality.
-   You can set up the columnar engine storage cache on dedicated devices. For more information, see [Configure the columnar engine in AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/columnar-engine/configure).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 15.12.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.12.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.12](https://www.postgresql.org/docs/release/15.12/).
-   AlloyDB Omni supports the [`pg_squeeze`](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions) extension that addresses table bloat and improves data locality.
-   You can set up the columnar engine storage cache on dedicated devices. For more information, see [Configure the columnar engine in AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/columnar-engine/configure).

Announcement

The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.5.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)) and includes the following features and bug fixes:

-   You can install the operator using the [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/) for Kubernetes and OpenShift environments. See "Install the AlloyDB Omni operator" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/deploy-kubernetes#olm) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/deploy-kubernetes#olm) for details.

-   Low downtime, minor version upgrades for a database cluster in a high availability setup are available in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see "Perform a minor database version upgrade for AlloyDB Omni on Kubernetes" in the documentation for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/upgrade-kubernetes-database-minor-version) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/upgrade-kubernetes-database-minor-version).

-   [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) authentication integration on your Kubernetes-based AlloyDB Omni database cluster is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). For more information, see [Integrate Active Directory with AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/integrate-active-directory-kubernetes-operator).

-   Active Directory group-based authorization on your Kubernetes-based AlloyDB Omni database cluster is available in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Integrate Active Directory group support on Kubernetes](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/integrate-ad-group-support-kubernetes-operator).

-   You can configure backups to be taken directly from a standby Kubernetes cluster in a high availability (HA) setup to offload backup operations from your primary instance. See "Backup and restore in Kubernetes" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/backup-kubernetes) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/backup-kubernetes) for details.

-   The operator fully automatically replicates replication slots for cross-data-center replication to work with primary database clusters that have high availability (HA) enabled. You still need to make sure you have reliable and low latency network connectivity between the primary and secondary data centers, which is crucial for cross-data-center replication to function effectively. For more information, see "Work with cross-data-center replication" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/cross-data-center-replication/work-with-cross-data-center-replication) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/cross-data-center-replication/work-with-cross-data-center-replication).

-   AlloyDB Omni Kubernetes images are now built on Red Hat's Universal Base Image (UBI) 9. For more information, see "Install AlloyDB Omni on Kubernetes" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/deploy-kubernetes#base-image) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/deploy-kubernetes#base-image).

-   AlloyDB AI requires AlloyDB Omni version 15.5.5 or later.


Announcement

The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.5.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)) and includes the following features and bug fixes:

-   You can install the operator using the [Operator Lifecycle Manager (OLM)](https://olm.operatorframework.io/) for Kubernetes and OpenShift environments. See "Install the AlloyDB Omni operator" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/deploy-kubernetes#olm) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/deploy-kubernetes#olm) for details.

-   Low downtime, minor version upgrades for a database cluster in a high availability setup are available in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see "Perform a minor database version upgrade for AlloyDB Omni on Kubernetes" in the documentation for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/upgrade-kubernetes-database-minor-version) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/upgrade-kubernetes-database-minor-version).

-   [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) authentication integration on your Kubernetes-based AlloyDB Omni database cluster is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). For more information, see [Integrate Active Directory with AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/integrate-active-directory-kubernetes-operator).

-   Active Directory group-based authorization on your Kubernetes-based AlloyDB Omni database cluster is available in [Preview](https://cloud.google.com/products#product-launch-stages). For more information, see [Integrate Active Directory group support on Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/integrate-ad-group-support-kubernetes-operator).

-   You can configure backups to be taken directly from a standby Kubernetes cluster in a high availability (HA) setup to offload backup operations from your primary instance. See "Backup and restore in Kubernetes" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/backup-kubernetes) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/backup-kubernetes) for details.

-   The operator fully automatically replicates replication slots for cross-data-center replication to work with primary database clusters that have high availability (HA) enabled. You still need to make sure you have reliable and low latency network connectivity between the primary and secondary data centers, which is crucial for cross-data-center replication to function effectively. For more information, see "Work with cross-data-center replication" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/cross-data-center-replication/work-with-cross-data-center-replication) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/cross-data-center-replication/work-with-cross-data-center-replication).

-   AlloyDB Omni Kubernetes images are now built on Red Hat's Universal Base Image (UBI) 9. For more information, see "Install AlloyDB Omni on Kubernetes" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/deploy-kubernetes#base-image) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/deploy-kubernetes#base-image).

-   AlloyDB AI requires AlloyDB Omni version 15.5.5 or later.


Issue

When upgrading your AlloyDB Omni database clusters, be aware of specific upgrade paths and prerequisites depending on your current `controlPlaneAgentsVersion` and environment:

-   If your database cluster's `controlPlaneAgentsVersion` is `1.0.0`, you must first upgrade to `1.1.1` before you upgrade to `1.5.0` or higher. You can directly upgrade database clusters with `controlPlaneAgentsVersion` `1.1.0` or later to `1.5.0`.

-   If you use an OpenShift database cluster that runs `controlPlaneAgentsVersion` `1.4.1` or earlier, you must run prerequisite steps before updating to `1.5.0`. For more information, see "Update OpenShift database clusters from version `1.4.1` or earlier" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/containers/15.12.0/docs/upgrade-kubernetes-operator-version#update-openshift) and [16.8.0](https://cloud.google.com/alloydb/omni/containers/16.8.0/docs/upgrade-kubernetes-operator-version#update-openshift).


Issue

When upgrading your AlloyDB Omni database clusters, be aware of specific upgrade paths and prerequisites depending on your current `controlPlaneAgentsVersion` and environment:

-   If your database cluster's `controlPlaneAgentsVersion` is `1.0.0`, you must first upgrade to `1.1.1` before you upgrade to `1.5.0` or higher. You can directly upgrade database clusters with `controlPlaneAgentsVersion` `1.1.0` or later to `1.5.0`.

-   If you use an OpenShift database cluster that runs `controlPlaneAgentsVersion` `1.4.1` or earlier, you must run prerequisite steps before updating to `1.5.0`. For more information, see "Update OpenShift database clusters from version `1.4.1` or earlier" for AlloyDB Omni [15.12.0](https://cloud.google.com/alloydb/omni/kubernetes/15.12.0/docs/upgrade-kubernetes-operator-version#update-openshift) and [16.8.0](https://cloud.google.com/alloydb/omni/kubernetes/16.8.0/docs/upgrade-kubernetes-operator-version#update-openshift).


## May 27, 2025

Feature

The [AlloyDB Omni Kubernetes](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) operator version 1.4.1 is generally available (GA) and includes the following bug fixes:

-   Fix for overriding replication related parameters. This fix lets you override the `wal_keep_size` value. For more information, see [Work with cross-data-center replication](https://cloud.google.com/alloydb/omni/containers/current/docs/cross-data-center-replication/work-with-cross-data-center-replication). This fix requires database version 15.7.1 or later.
-   63-character DBCluster names are supported, which lets you define clearer and more descriptive cluster names.
-   Various bug fixes are implemented to enhance stability and the user experience.

Feature

The [AlloyDB Omni Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) operator version 1.4.1 is generally available (GA) and includes the following bug fixes:

-   Fix for overriding replication related parameters. This fix lets you override the `wal_keep_size` value. For more information, see [Work with cross-data-center replication](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/cross-data-center-replication/work-with-cross-data-center-replication). This fix requires database version 15.7.1 or later.
-   63-character DBCluster names are supported, which lets you define clearer and more descriptive cluster names.
-   Various bug fixes are implemented to enhance stability and the user experience.

## May 09, 2025

Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/docs) version 16.3.0 with Red Hat Universal Base Image ([UBI](https://catalog.redhat.com/software/base-images)) as a base image is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). The image is RedHat certified and can also be accessed from the [Red Hat Ecosystem Catalog](https://catalog.redhat.com/software/container-stacks/detail/67d88bd7ce4ca47642c2a072). Version UBI 16.3.0 includes third-party extensions, including [PostGIS](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/install-postgis) and [Orafce](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/install-orafce), which you can install on RPM-based Linux distributions. For more information about using UBI in AlloyDB Omni, see [Install AlloyDB Omni on a VM](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/deploy-vm).

Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/docs) version 16.3.0 with Red Hat Universal Base Image ([UBI](https://catalog.redhat.com/software/base-images)) as a base image is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). The image is RedHat certified and can also be accessed from the [Red Hat Ecosystem Catalog](https://catalog.redhat.com/software/container-stacks/detail/67d88bd7ce4ca47642c2a072). Version UBI 16.3.0 includes third-party extensions, including [PostGIS](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/install-postgis) and [Orafce](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/install-orafce), which you can install on RPM-based Linux distributions. For more information about using UBI in AlloyDB Omni, see [Install AlloyDB Omni on a VM](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/deploy-vm).

## April 09, 2025

Announcement

AlloyDB Omni is in General Availability on the [Aiven Platform](https://aiven.io/alloydb-omni). Aiven provides managed AlloyDB Omni as a service on multiple public clouds. For more information, see [Store your data on any major cloud](https://aiven.io/platform/store).

Announcement

AlloyDB Omni is in General Availability on the [Aiven Platform](https://aiven.io/alloydb-omni). Aiven provides managed AlloyDB Omni as a service on multiple public clouds. For more information, see [Store your data on any major cloud](https://aiven.io/platform/store).

Announcement

The `alloydb_scann` extension is updated to include the following vector search improvements in ([Preview](https://cloud.google.com/products#product-launch-stages)):

-   You can enable auto-maintenance for your ScaNN index and let incrementally manage the index such that when your dataset grows, AlloyDB splits large outlier partitions, and tries to provide better QPS and search results. For more information, see "Maintain indexes automatically" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/maintain-vector-indexes) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/maintain-vector-indexes) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/ai/maintain-vector-indexes).

-   Adaptive filtering for ScaNN significantly improves the speed of filtered vector searches. Adaptive filtering automatically selects the most efficient filtering method at runtime. For more information, see "Filtered vector search" and "Adaptive filtering" in the documentation for [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/docs/ai/filtered-vector-search-overview) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/filtered-vector-search-overview#inline-filtering) and [16.3.0](https://cloud..google.com/alloydb/omni/containers/16.3.0/docs/ai/filtered-vector-search-overview#inline-filtering).

-   You can enable index auto maintenance and adaptive inline filtering together using the `scann.enable_preview_features` Grand Unified Configuration (GUC) parameters. For more information, see "AlloyDB flags" for [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/docs/reference/alloydb-flags) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/reference/alloydb-flags) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/reference/alloydb-flags).


Announcement

The `alloydb_scann` extension is updated to include the following vector search improvements. These features are generally available ([GA](https://cloud.google.com/products#product-launch-stages)):

-   Inline filtering enables the execution of vector search and filter evaluation through the combined use of vector and secondary indexes. For more information, see "Inline filtering" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/filtered-vector-search-overview#inline-filtering) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/filtered-vector-search-overview#inline-filtering) and [16.3.0](https://cloud..google.com/alloydb/omni/containers/16.3.0/docs/ai/filtered-vector-search-overview#inline-filtering).

-   You can let AlloyDB automatically create multiple parallel workers during index creation when the dataset grows, leading to faster build times. For more information, see "Build indexes in parallel" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/store-index-query-vectors) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/store-index-query-vectors?resource=scann) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/store-index-query-vectors?resource=scann).

-   A distribution histogram is available in the `pg_stat_ann_indexes` view, which helps you understand the distribution of vectors between partitions of your ScaNN index. For more information, including recommendations about tuning the `distributionpercentile` metric, see "Tuning metrics" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/reference/vector-index-metrics#tuning-metrics), and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/reference/vector-index-metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/reference/vector-index-metrics).

-   You can use a query recall evaluator to find the recall for a vector query for a given configuration, and to tune your parameters to achieve the desired vector query recall results for different vector indexes. For more information, see "Measure vector query recall" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/measure-vector-query-recall), and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/ai/measure-vector-query-recall) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/ai/measure-vector-query-recall).


Announcement

The `alloydb_scann` extension is updated to include the following vector search improvements in ([Preview](https://cloud.google.com/products#product-launch-stages)):

-   You can enable auto-maintenance for your ScaNN index and let incrementally manage the index such that when your dataset grows, AlloyDB splits large outlier partitions, and tries to provide better QPS and search results. For more information, see "Maintain indexes automatically" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/maintain-vector-indexes) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/maintain-vector-indexes) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/ai/maintain-vector-indexes).

-   Adaptive filtering for ScaNN significantly improves the speed of filtered vector searches. Adaptive filtering automatically selects the most efficient filtering method at runtime. For more information, see "Filtered vector search" and "Adaptive filtering" in the documentation for [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/docs/ai/filtered-vector-search-overview) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/filtered-vector-search-overview#inline-filtering) and [16.3.0](https://cloud..google.com/alloydb/omni/kubernetes/16.3.0/docs/ai/filtered-vector-search-overview#inline-filtering).

-   You can enable index auto maintenance and adaptive inline filtering together using the `scann.enable_preview_features` Grand Unified Configuration (GUC) parameters. For more information, see "AlloyDB flags" for [AlloyDB for PostgreSQL](https://cloud.google.com/alloydb/docs/reference/alloydb-flags) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/reference/alloydb-flags) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/reference/alloydb-flags).


Announcement

The `alloydb_scann` extension is updated to include the following vector search improvements. These features are generally available ([GA](https://cloud.google.com/products#product-launch-stages)):

-   Inline filtering enables the execution of vector search and filter evaluation through the combined use of vector and secondary indexes. For more information, see "Inline filtering" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/filtered-vector-search-overview#inline-filtering) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/filtered-vector-search-overview#inline-filtering) and [16.3.0](https://cloud..google.com/alloydb/omni/kubernetes/16.3.0/docs/ai/filtered-vector-search-overview#inline-filtering).

-   You can let AlloyDB automatically create multiple parallel workers during index creation when the dataset grows, leading to faster build times. For more information, see "Build indexes in parallel" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/store-index-query-vectors) and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/store-index-query-vectors?resource=scann) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/store-index-query-vectors?resource=scann).

-   A distribution histogram is available in the `pg_stat_ann_indexes` view, which helps you understand the distribution of vectors between partitions of your ScaNN index. For more information, including recommendations about tuning the `distributionpercentile` metric, see "Tuning metrics" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/reference/vector-index-metrics#tuning-metrics), and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/reference/vector-index-metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/reference/vector-index-metrics).

-   You can use a query recall evaluator to find the recall for a vector query for a given configuration, and to tune your parameters to achieve the desired vector query recall results for different vector indexes. For more information, see "Measure vector query recall" in the documentation for [AlloyDB PostgreSQL](https://cloud.google.com/alloydb/docs/ai/measure-vector-query-recall), and AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/ai/measure-vector-query-recall) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/ai/measure-vector-query-recall).


## April 08, 2025

Feature

**Action required:** You can access [Kubernetes operator 1.4.0](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) high availability (HA) improvements for automatic setup, failover, and healing capabilities starting with AlloyDB Omni 15.7.1 and later. To access these features, see "Migrate to the latest version of AlloyDB Omni on Kubernetes" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/migrate-to-latest-version-kubernetes#upgrade-operator) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/upgrade-kubernetes-operator-version).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/overview) version 16.3.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.3.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.3](https://www.postgresql.org/docs/release/16.3/).
-   [Asynchronous I/O](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/improve-database-performance-using-io-acceleration) improves performance on systems with atomic writes for high concurrency Online Transaction Processing (OLTP) workloads. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages).
-   You can upgrade your AlloyDB Omni PostgreSQL 15-based containers to AlloyDB Omni PostgreSQL 16 using `pg_upgrade`. For more information, see [Upgrade to AlloyDB Omni version 16.3.0 on a VM](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/upgrade-vm-alloydb-omni-version).
-   AlloyDB Omni provides additional low-level logs (called "[internal logs](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/configure-omni#enable-internal-logging)"), which are useful for debugging database issues. Production users are encouraged to enable this feature for greater observability. We recommend that you enable this feature to improve production observability.
-   Active Directory integration lets you use your Active Directory Server to authenticate users for accessing your AlloyDB Omni 16.3.0 databases. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages). For more information, see [Integrate Active Directory with AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/integrate-active-directory).
-   Multiple [extensions](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions) are updated.
-   Multiple [GUCs](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/database-flags) have been updated or added.
-   Security fixes for [CVE-2024-7348](https://www.postgresql.org/support/security/CVE-2024-7348/) are implemented.
-   Various bug fixes.

Issue

If you use mutating admission webhooks in your Kubernetes cluster, you might experience issues when you create database clusters and the webhooks conflict with the AlloyDB Omni Kubernetes Operator. Examples of mutating admission webhooks include [LimitRanger](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#limitranger) and [DefaultTolerationSecond](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaulttolerationseconds). When the conflict occurs, the database pod repeatedly switches between running and terminating. To work around this issue, disable these webhooks where you run your AlloyDB Omni database cluster.

Fixed

The PostgreSQL Audit Extension (pgaudit) logging fix In AlloyDB Omni 15.7.0, which enables the `pgAudit` extension together with the PostgreSQL `logging_collector` parameter, might have resulted in audit logs loss. This issue is fixed in AlloyDB Omni versions 15.7.1 and 16.3.0.

Announcement

The [AlloyDB Omni Kubernetes](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) operator version 1.4.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.4.0 includes the following new features and changes:

-   You can enable [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) integration on your Kubernetes-based AlloyDB Omni database cluster so that you can allow your existing Active Directory-based users to access your AlloyDB Omni database. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages). For more information, see [Integrate Active Directory with AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/integrate-active-directory-kubernetes-operator).
-   You can create backups in any cloud or on-premises object storage systems that are compatible with the Amazon S3 API. For more information, see Create backups to S3-compatible storage (AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/backup-kubernetes) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/backup-kubernetes)).
-   You can now [access log files](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/kubernetes-sidecar-container#access-logs) from sidecar containers.
-   You can manually upgrade your AlloyDB Omni 15 database clusters to AlloyDB Omni 16.3.0 using `pg_upgrade`. For more information, see [Migrate to the latest version of AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/migrate-kubernetes-omni-version).
-   Beginning with Kubernetes operator version 1.4.0, the `alloydb_omni_instance_postgresql_wait_time_second_total` metric is renamed to `alloydb_omni_instance_postgresql_wait_time_us_total` to reflect the correct unit of the metric value. If you are not already using microseconds (`us`) for your metric unit, your queries and dashboard calculations need to change to reflect the correct unit of this metric: `seconds` -> `us`. For more information, see [Upgrade your AlloyDB Omni Kubernetes operator to version 1.4.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/upgrade-kubernetes-operator-version).
-   The [PgBouncer connection pooler](https://cloud.google.com/alloydb/omni/containers/current/docs/use-connection-pooler-kubernetes) is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). This release includes g-pgBouncer 1.4.0, which incorporates features and bug fixes from PgBouncer 1.24.0.
-   You can [configure the monitoring dashboard on your Grafana operator](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/manage#kubernetes) to visualize metrics using the monitoring endpoint of the Kubernetes operator.
-   When the AlloyDB Omni Kubernetes Operator detects low disk space, the Kubernetes Operator reports a low disk space Critical Incident (CI) on the database cluster.
-   AlloyDB Omni provides internal logs for debugging database issues. We recommend that you enable this feature to improve production observability. See "Enable internal logging" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/configure-omni#enable-internal-logging) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/configure-omni#enable-internal-logging) for details.
-   Disk cache metrics `alloydb_omni_database_postgresql_chill_cache_get_entry_calls_total` and `alloydb_omni_database_postgresql_chill_cache_num_hits_total` are exposed when you enable disk cache on AlloyDB Omni versions [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/configure-disk-cache) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/configure-disk-cache). These metrics are database container-level metrics. For more information, see AlloyDB Omni metrics ([15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/reference/omni-metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/reference/omni-metrics)).
-   Use `alloydb_omni_instance_postgresql_version` to get the current PostgreSQL major version. For more information, see "Database container-level metrics" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/reference/omni-metrics#database_container-level_metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/containers/16.3.0/docs/reference/omni-metrics#database_container-level_metrics).
-   Various bug fixes and performance improvements.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/15.7.1/docs) version 15.7.1 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.7.1 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.7](https://www.postgresql.org/docs/release/15.7/).
-   AlloyDB Omni provides additional low-level logs (called [_internal logs_](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/configure-omni#enable-internal-logging)), which are useful for debugging database issues. Production users are encouraged to enable this feature for greater observability. We recommend that you enable this feature to improve production observability.
-   Multiple [extensions](https://cloud.google.com/alloydb/omni/15,7,1/docs/reference/extensions) are updated.
-   Multiple [GUCs](https://cloud.google.com/alloydb/omni/containers/15.7.1/docs/reference/database-flags) have been updated or added.
-   Security fixes for [CVE-2024-7348](https://www.postgresql.org/support/security/CVE-2024-7348/) are implemented.
-   Bug fixes.

Fixed

The Kubernetes 1.4.0 DBCluster might have a status of `DBClusterReady` even though its endpoint, which allows clients to connect, is not yet ready.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/overview) version 16.3.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 16.3.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [16.3](https://www.postgresql.org/docs/release/16.3/).
-   [Asynchronous I/O](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/improve-database-performance-using-io-acceleration) improves performance on systems with atomic writes for high concurrency Online Transaction Processing (OLTP) workloads. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages).
-   You can upgrade your AlloyDB Omni PostgreSQL 15-based containers to AlloyDB Omni PostgreSQL 16 using `pg_upgrade`. For more information, see [Upgrade to AlloyDB Omni version 16.3.0 on a VM](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/upgrade-vm-alloydb-omni-version).
-   AlloyDB Omni provides additional low-level logs (called "[internal logs](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/configure-omni#enable-internal-logging)"), which are useful for debugging database issues. Production users are encouraged to enable this feature for greater observability. We recommend that you enable this feature to improve production observability.
-   Active Directory integration lets you use your Active Directory Server to authenticate users for accessing your AlloyDB Omni 16.3.0 databases. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages). For more information, see [Integrate Active Directory with AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/integrate-active-directory).
-   Multiple [extensions](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions) are updated.
-   Multiple [GUCs](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/database-flags) have been updated or added.
-   Security fixes for [CVE-2024-7348](https://www.postgresql.org/support/security/CVE-2024-7348/) are implemented.
-   Various bug fixes.

Issue

If you use mutating admission webhooks in your Kubernetes cluster, you might experience issues when you create database clusters and the webhooks conflict with the AlloyDB Omni Kubernetes Operator. Examples of mutating admission webhooks include [LimitRanger](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#limitranger) and [DefaultTolerationSecond](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#defaulttolerationseconds). When the conflict occurs, the database pod repeatedly switches between running and terminating. To work around this issue, disable these webhooks where you run your AlloyDB Omni database cluster.

Announcement

The [AlloyDB Omni Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) operator version 1.4.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.4.0 includes the following new features and changes:

-   You can enable [Active Directory](https://en.wikipedia.org/wiki/Active_Directory) integration on your Kubernetes-based AlloyDB Omni database cluster so that you can allow your existing Active Directory-based users to access your AlloyDB Omni database. This feature is available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages). For more information, see [Integrate Active Directory with AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/integrate-active-directory-kubernetes-operator).
-   You can create backups in any cloud or on-premises object storage systems that are compatible with the Amazon S3 API. For more information, see Create backups to S3-compatible storage (AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/backup-kubernetes) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/backup-kubernetes)).
-   You can now [access log files](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/kubernetes-sidecar-container#access-logs) from sidecar containers.
-   You can manually upgrade your AlloyDB Omni 15 database clusters to AlloyDB Omni 16.3.0 using `pg_upgrade`. For more information, see [Migrate to the latest version of AlloyDB Omni on Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/migrate-kubernetes-omni-version).
-   Beginning with Kubernetes operator version 1.4.0, the `alloydb_omni_instance_postgresql_wait_time_second_total` metric is renamed to `alloydb_omni_instance_postgresql_wait_time_us_total` to reflect the correct unit of the metric value. If you are not already using microseconds (`us`) for your metric unit, your queries and dashboard calculations need to change to reflect the correct unit of this metric: `seconds` -> `us`. For more information, see [Upgrade your AlloyDB Omni Kubernetes operator to version 1.4.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/upgrade-kubernetes-operator-version).
-   The [PgBouncer connection pooler](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/use-connection-pooler-kubernetes) is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). This release includes g-pgBouncer 1.4.0, which incorporates features and bug fixes from PgBouncer 1.24.0.
-   You can [configure the monitoring dashboard on your Grafana operator](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/manage#kubernetes) to visualize metrics using the monitoring endpoint of the Kubernetes operator.
-   When the AlloyDB Omni Kubernetes Operator detects low disk space, the Kubernetes Operator reports a low disk space Critical Incident (CI) on the database cluster.
-   AlloyDB Omni provides internal logs for debugging database issues. We recommend that you enable this feature to improve production observability. See "Enable internal logging" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/configure-omni#enable-internal-logging) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/configure-omni#enable-internal-logging) for details.
-   Disk cache metrics `alloydb_omni_database_postgresql_chill_cache_get_entry_calls_total` and `alloydb_omni_database_postgresql_chill_cache_num_hits_total` are exposed when you enable disk cache on AlloyDB Omni versions [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/configure-disk-cache) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/configure-disk-cache). These metrics are database container-level metrics. For more information, see AlloyDB Omni metrics ([15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/reference/omni-metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/reference/omni-metrics)).
-   Use `alloydb_omni_instance_postgresql_version` to get the current PostgreSQL major version. For more information, see "Database container-level metrics" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/reference/omni-metrics#database_container-level_metrics) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/reference/omni-metrics#database_container-level_metrics).
-   Various bug fixes and performance improvements.

Feature

**Action required:** You can access [Kubernetes operator 1.4.0](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) high availability (HA) improvements for automatic setup, failover, and healing capabilities starting with AlloyDB Omni 15.7.1 and later. To access these features, see "Migrate to the latest version of AlloyDB Omni on Kubernetes" for AlloyDB Omni [15.7.1](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/migrate-to-latest-version-kubernetes#upgrade-operator) and [16.3.0](https://cloud.google.com/alloydb/omni/kubernetes/16.3.0/docs/upgrade-kubernetes-operator-version).

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/15.7.1/docs) version 15.7.1 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.7.1 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.7](https://www.postgresql.org/docs/release/15.7/).
-   AlloyDB Omni provides additional low-level logs (called [_internal logs_](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/configure-omni#enable-internal-logging)), which are useful for debugging database issues. Production users are encouraged to enable this feature for greater observability. We recommend that you enable this feature to improve production observability.
-   Multiple [extensions](https://cloud.google.com/alloydb/omni/15,7,1/docs/reference/extensions) are updated.
-   Multiple [GUCs](https://cloud.google.com/alloydb/omni/kubernetes/15.7.1/docs/reference/database-flags) have been updated or added.
-   Security fixes for [CVE-2024-7348](https://www.postgresql.org/support/security/CVE-2024-7348/) are implemented.
-   Bug fixes.

Fixed

The PostgreSQL Audit Extension (pgaudit) logging fix In AlloyDB Omni 15.7.0, which enables the `pgAudit` extension together with the PostgreSQL `logging_collector` parameter, might have resulted in audit logs loss. This issue is fixed in AlloyDB Omni versions 15.7.1 and 16.3.0.

Fixed

The Kubernetes 1.4.0 DBCluster might have a status of `DBClusterReady` even though its endpoint, which allows clients to connect, is not yet ready.

## April 02, 2025

Issue

When the ScaNN index creation updates the `reltuples` statistics of a heap table, performance might be degraded for queries involving that table. For information to mitigate the issue, see [Analyze your indexed table](https://cloud.google.com/alloydb/omni/containers/current/docs/ai/store-index-query-vectors?resource=scann#analyze-indexed-table).

Issue

When the ScaNN index creation updates the `reltuples` statistics of a heap table, performance might be degraded for queries involving that table. For information to mitigate the issue, see [Analyze your indexed table](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/ai/store-index-query-vectors?resource=scann#analyze-indexed-table).

## February 03, 2025

Announcement

The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.3.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.3.0 includes the following new features and changes:

-   The Kubernetes operator 1.3.0 supports [connection pooling](https://cloud.google.com/alloydb/omni/containers/current/docs/use-connection-pooler-kubernetes) ([Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages)).

-   You can [put the database in maintenance mode](https://cloud.google.com/alloydb/omni/containers/current/docs/kubernetes-maintenance-mode) to make a maintenance update or repair a pod.

-   You can [create replication slots and users](https://cloud.google.com/alloydb/omni/containers/current/docs/create-replication-slots) for logical replication via the Operator API from your database instance to subscribed applications.

-   This release of the Kubernetes operator adds support for [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) so that you can use Prometheus or a Prometheus-compatible scraper to consume and display custom resource metrics like DBCluster Backup, and DBInstance. For more information, see [Monitor AlloyDB Omni Kubernetes operator custom resources](https://cloud.google.com/alloydb/omni/containers/current/docs/monitor-kubernetes-operator-custom-resources).

-   When you create a new database cluster, this version of the Kubernetes operator creates read-only (RO) and read-write (RW) load balancers concurrently, which reduces the time that it takes for the database cluster to be ready for connections and queries.

-   Configurable log rotation has a default retention time of seven days, and each archived file is individually compressed using Gzip. For more information, see [Configure AlloyDB Omni log rotation](https://cloud.google.com/alloydb/omni/containers/current/docs/configure-log-rotation).

-   Various bug fixes and performance improvements.


Announcement

The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.3.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.3.0 includes the following new features and changes:

-   The Kubernetes operator 1.3.0 supports [connection pooling](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/use-connection-pooler-kubernetes) ([Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages)).

-   You can [put the database in maintenance mode](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/kubernetes-maintenance-mode) to make a maintenance update or repair a pod.

-   You can [create replication slots and users](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/create-replication-slots) for logical replication via the Operator API from your database instance to subscribed applications.

-   This release of the Kubernetes operator adds support for [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) so that you can use Prometheus or a Prometheus-compatible scraper to consume and display custom resource metrics like DBCluster Backup, and DBInstance. For more information, see [Monitor AlloyDB Omni Kubernetes operator custom resources](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/monitor-kubernetes-operator-custom-resources).

-   When you create a new database cluster, this version of the Kubernetes operator creates read-only (RO) and read-write (RW) load balancers concurrently, which reduces the time that it takes for the database cluster to be ready for connections and queries.

-   Configurable log rotation has a default retention time of seven days, and each archived file is individually compressed using Gzip. For more information, see [Configure AlloyDB Omni log rotation](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/configure-log-rotation).

-   Various bug fixes and performance improvements.


## November 21, 2024

Feature

Model endpoint management is generally available ([GA](https://cloud.google.com/products#product-launch-stages)) for both AlloyDB and AlloyDB Omni. You can use [sample templates](https://cloud.google.com/alloydb/docs/reference/model-endpoint-sample-template?resource=custom) to register model endpoints. For more information, see [Register and call remote AI models in AlloyDB](https://cloud.google.com/alloydb/docs/ai/model-endpoint-overview) or [Register and call remote AI models in AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/model-endpoint-overview).

Feature

Model endpoint management is generally available ([GA](https://cloud.google.com/products#product-launch-stages)) for both AlloyDB and AlloyDB Omni. You can use [sample templates](https://cloud.google.com/alloydb/docs/reference/model-endpoint-sample-template?resource=custom) to register model endpoints. For more information, see [Register and call remote AI models in AlloyDB](https://cloud.google.com/alloydb/docs/ai/model-endpoint-overview) or [Register and call remote AI models in AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/model-endpoint-overview).

## November 08, 2024

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/docs) version 15.7.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.7.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.7](https://www.postgresql.org/docs/release/15.7/).

-   The `alloydb_scann` extension—previously named `postgres_scann`—is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). For more information about storing vector embeddings, creating indexes, and tuning indexes to achieve faster query performance and better recall, see [Work with vectors](https://cloud.google.com/alloydb/omni/containers/current/docs/ai/store-embeddings).

-   Support for Red Hat Enterprise Linux (RHEL) 8 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)).

-   The AlloyDB Omni [columnar engine](https://cloud.google.com/alloydb/omni/containers/current/docs/columnar-engine/overview) is available in [Preview](https://cloud.google.com/products#product-launch-stages) on ARM.

-   [Disk cache](https://cloud.google.com/alloydb/omni/containers/current/docs/configure-disk-cache) and [columnar storage cache](https://cloud.google.com/alloydb/omni/containers/current/docs/columnar-engine/configure) are available to improve AlloyDB Omni performance by accelerating data access for AlloyDB Omni in a container and on a Kubernetes cluster.

-   Security fixes for [CVE-2023-50387](https://security-tracker.debian.org/tracker/CVE-2023-50387) and [CVE-2024-7348](https://security-tracker.debian.org/tracker/CVE-2024-7348) have been implemented.

-   The [AlloyDB Omni Reference](https://cloud.google.com/alloydb/omni/containers/current/docs/choose-compatible-versions) documentation is available. This includes [metrics](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/omni-metrics), [database flags](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/database-flags), [model endpoint management reference](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/model-endpoint-reference), and [extensions](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions) documentation for AlloyDB Omni 15.7.0.

-   AlloyDB Omni supports the [`pg_ivm`](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions#pg_ivm) extension, which provides incremental view maintenance for materialized views.

-   Various bug fixes and performance improvements.


The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.2.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.2.0 includes the following new features:

-   The `healthcheckPeriodSeconds` parameter lets you specify the number of seconds to wait between health checks. For more information, see [Adjust automatic failover trigger settings](https://cloud.google.com/alloydb/omni/containers/current/docs/kubernetes-ha#adjust-failover-trigger-settings).

-   The following metrics help you monitor the performance of your database container. Each of these metrics is of type `gauge`. For more information, see [Database container-level metrics](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/omni-metrics).

    -   `alloydb_omni_memory_limit_byte` shows the memory limit of a database container.

    -   `alloydb_omni_instance_postgresql_replication_state` shows the state of each replica that's connected to the AlloyDB Omni primary node.

    -   `alloydb_omni_memory_used_byte` shows the memory used by the database container in bytes.

-   An issue that caused a brief interruption to all database clusters when the following is true is fixed:

    -   You're [upgrading the AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/migrate-to-latest-version-kubernetes) version 1.1.1 to a newer version.

    -   You're using the AlloyDB Omni database version 15.5.5 or later.

    -   AlloyDB AI is not [enabled](https://cloud.google.com/alloydb/omni/containers/current/docs/install-with-alloydb-ai?resource=kubernetes#enable-alloydb-ai).

-   High availability is supported on a secondary database cluster after it's promoted. For more information, see [Promote a secondary database cluster](https://cloud.google.com/alloydb/omni/containers/current/docs/cross-data-center-replication/work-with-cross-data-center-replication#promote-secondary-cluster) and [Manage high availability in Kubernetes](https://cloud.google.com/alloydb/omni/containers/current/docs/kubernetes-ha).

-   You can enable or disable model endpoint management through Kubernetes manifests. For more information, see Install [AlloyDB Omni with AlloyDB AI](https://cloud.google.com/alloydb/omni/containers/current/docs/install-with-alloydb-ai?resource=kubernetes).

-   You can configure when logs rotate using thresholds that are based on the size of the log files, the time since the log file last rotated, or both. For more information, see [Configure AlloyDB Omni log rotation](https://cloud.google.com/alloydb/omni/containers/current/docs/configure-log-rotation).

-   You can create a snapshot of the memory heap of AlloyDB Omni Kubernetes operator to help you analyze and debug its memory performance. For more information, see [Analyze AlloyDB Omni Kubernetes operator memory heap usage](https://cloud.google.com/alloydb/omni/containers/current/docs/analyze-memory-heap-usage).


Breaking

In AlloyDB Omni versions 15.5.5 and earlier, parameterized view features were available in the `alloydb_ai_nl` extension. Starting in version 15.7.0, parameterized view features are available in the `parameterized_views` extension, which you must create before you use parameterized views. Also starting in version 15.7.0, the related function, `google_exec_param_query`, has been renamed to `execute_parameterized_query` and is available in the `parameterized_views` extension. For more information, see [Query your database using natural language](https://cloud.google.com/alloydb/docs/ai/use-psvs).

Change

The extension `pg_ivm` version 1.9 has been added to [extensions supported by AlloyDB Omni](https://cloud.google.com/alloydb/omni/containers/current/docs/reference/extensions).

The following extensions are updated:

-   `google_ml_integration` from 1.3 to 1.4.2
-   `pg_partman` from 4.7.4 to 5.0.1
-   `pglogical` from 2.4.4 to 2.4.5
-   `pgtt` from 3.0.0 to 4.0.0
-   `vector` is updated from 0.7.0 to 0.7.4

**Note:** `pg_partman` contains breaking changes when upgrading from version 4.x to 5.x. Refer to the [upgrade notes](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman_5.0.1_upgrade.md) before upgrading. Alternatively, you may still install and use prior versions of `pg_partman` by explicitly stating the version when installing, for example, `CREATE EXTENSION pg_partman WITH VERSION '4.7.4';`.

Breaking

In AlloyDB Omni versions 15.5.5 and earlier, parameterized view features were available in the `alloydb_ai_nl` extension. Starting in version 15.7.0, parameterized view features are available in the `parameterized_views` extension, which you must create before you use parameterized views. Also starting in version 15.7.0, the related function, `google_exec_param_query`, has been renamed to `execute_parameterized_query` and is available in the `parameterized_views` extension. For more information, see [Query your database using natural language](https://cloud.google.com/alloydb/docs/ai/use-psvs).

Change

The extension `pg_ivm` version 1.9 has been added to [extensions supported by AlloyDB Omni](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions).

The following extensions are updated:

-   `google_ml_integration` from 1.3 to 1.4.2
-   `pg_partman` from 4.7.4 to 5.0.1
-   `pglogical` from 2.4.4 to 2.4.5
-   `pgtt` from 3.0.0 to 4.0.0
-   `vector` is updated from 0.7.0 to 0.7.4

**Note:** `pg_partman` contains breaking changes when upgrading from version 4.x to 5.x. Refer to the [upgrade notes](https://github.com/pgpartman/pg_partman/blob/master/doc/pg_partman_5.0.1_upgrade.md) before upgrading. Alternatively, you may still install and use prior versions of `pg_partman` by explicitly stating the version when installing, for example, `CREATE EXTENSION pg_partman WITH VERSION '4.7.4';`.

Announcement

[AlloyDB Omni](https://cloud.google.com/alloydb/omni/docs) version 15.7.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 15.7.0 includes the following features and changes:

-   AlloyDB Omni supports PostgreSQL version [15.7](https://www.postgresql.org/docs/release/15.7/).

-   The `alloydb_scann` extension—previously named `postgres_scann`—is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). For more information about storing vector embeddings, creating indexes, and tuning indexes to achieve faster query performance and better recall, see [Work with vectors](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/ai/store-embeddings).

-   Support for Red Hat Enterprise Linux (RHEL) 8 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)).

-   The AlloyDB Omni [columnar engine](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/columnar-engine/overview) is available in [Preview](https://cloud.google.com/products#product-launch-stages) on ARM.

-   [Disk cache](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/configure-disk-cache) and [columnar storage cache](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/columnar-engine/configure) are available to improve AlloyDB Omni performance by accelerating data access for AlloyDB Omni in a container and on a Kubernetes cluster.

-   Security fixes for [CVE-2023-50387](https://security-tracker.debian.org/tracker/CVE-2023-50387) and [CVE-2024-7348](https://security-tracker.debian.org/tracker/CVE-2024-7348) have been implemented.

-   The [AlloyDB Omni Reference](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/choose-compatible-versions) documentation is available. This includes [metrics](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/omni-metrics), [database flags](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/database-flags), [model endpoint management reference](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/model-endpoint-reference), and [extensions](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions) documentation for AlloyDB Omni 15.7.0.

-   AlloyDB Omni supports the [`pg_ivm`](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/extensions#pg_ivm) extension, which provides incremental view maintenance for materialized views.

-   Various bug fixes and performance improvements.


The [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.2.0 is generally available ([GA](https://cloud.google.com/products#product-launch-stages)). Version 1.2.0 includes the following new features:

-   The `healthcheckPeriodSeconds` parameter lets you specify the number of seconds to wait between health checks. For more information, see [Adjust automatic failover trigger settings](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/kubernetes-ha#adjust-failover-trigger-settings).

-   The following metrics help you monitor the performance of your database container. Each of these metrics is of type `gauge`. For more information, see [Database container-level metrics](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/reference/omni-metrics).

    -   `alloydb_omni_memory_limit_byte` shows the memory limit of a database container.

    -   `alloydb_omni_instance_postgresql_replication_state` shows the state of each replica that's connected to the AlloyDB Omni primary node.

    -   `alloydb_omni_memory_used_byte` shows the memory used by the database container in bytes.

-   An issue that caused a brief interruption to all database clusters when the following is true is fixed:

    -   You're [upgrading the AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/migrate-to-latest-version-kubernetes) version 1.1.1 to a newer version.

    -   You're using the AlloyDB Omni database version 15.5.5 or later.

    -   AlloyDB AI is not [enabled](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/install-with-alloydb-ai?resource=kubernetes#enable-alloydb-ai).

-   High availability is supported on a secondary database cluster after it's promoted. For more information, see [Promote a secondary database cluster](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/cross-data-center-replication/work-with-cross-data-center-replication#promote-secondary-cluster) and [Manage high availability in Kubernetes](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/kubernetes-ha).

-   You can enable or disable model endpoint management through Kubernetes manifests. For more information, see Install [AlloyDB Omni with AlloyDB AI](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/install-with-alloydb-ai?resource=kubernetes).

-   You can configure when logs rotate using thresholds that are based on the size of the log files, the time since the log file last rotated, or both. For more information, see [Configure AlloyDB Omni log rotation](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/configure-log-rotation).

-   You can create a snapshot of the memory heap of AlloyDB Omni Kubernetes operator to help you analyze and debug its memory performance. For more information, see [Analyze AlloyDB Omni Kubernetes operator memory heap usage](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/analyze-memory-heap-usage).


## October 09, 2024

Announcement

AlloyDB for PostgreSQL minor versions are upgraded to 15.7 and 14.12. For more information, see [AlloyDB and AlloyDB Omni version policies](https://cloud.google.com/alloydb/docs/db-version-policies).

Announcement

AlloyDB for PostgreSQL minor versions are upgraded to 15.7 and 14.12. For more information, see [AlloyDB and AlloyDB Omni version policies](https://cloud.google.com/alloydb/docs/db-version-policies).

## October 02, 2024

Announcement

AlloyDB Omni is in Limited Availability on the [Aiven Platform](https://aiven.io/). Aiven provides managed AlloyDB Omni as a service on multiple public clouds. For more information, see [Store your data on any major cloud](https://aiven.io/platform/store).

Announcement

AlloyDB Omni is in Limited Availability on the [Aiven Platform](https://aiven.io/). Aiven provides managed AlloyDB Omni as a service on multiple public clouds. For more information, see [Store your data on any major cloud](https://aiven.io/platform/store).

## September 18, 2024

Feature

The AlloyDB Omni operator is now available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages) on [Google Distributed Cloud (GDC) connected](https://cloud.google.com/distributed-cloud-connected). For more information, see [Install AlloyDB Omni on Kubernetes.](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes)

Feature

The AlloyDB Omni operator is now available in [Preview](https://cloud.google.com/products?e=48754805&hl=en#product-launch-stages) on [Google Distributed Cloud (GDC) connected](https://cloud.google.com/distributed-cloud-connected). For more information, see [Install AlloyDB Omni on Kubernetes.](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes)

## September 16, 2024

Breaking

The `postgres_ann` extension has been renamed to `alloydb_scann`. Before you upgrade to [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.1.1, you must drop any indexes created using the earlier `postgres_ann` version, then upgrade AlloyDB Omni, and then create the indexes again using the `alloydb_scann` extension.

Breaking

The `postgres_ann` extension has been renamed to `alloydb_scann`. Before you upgrade to [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.1.1, you must drop any indexes created using the earlier `postgres_ann` version, then upgrade AlloyDB Omni, and then create the indexes again using the `alloydb_scann` extension.

Issue

Upgrading to version 1.1.1 of the [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) might result in a brief interruption to all database clusters. No data loss is expected.

Issue

Upgrading to version 1.1.1 of the [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) might result in a brief interruption to all database clusters. No data loss is expected.

Fixed

[AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.1.1 is now available. This patch fixes the following issues:

-   Fixed a regression for the AlloyDB Vertex AI integration.
-   Fixed a bug in which upgrading from version 1.0.0 to version 1.1.0 failed when using injected sidecars.
-   Fixed a bug in which backups weren't reestablished correctly across failovers when using the Commvault sidecar with high availability (HA) configurations.
-   Fixed a bug that caused a status to be incorrectly set by the load balancer, resulting in erroneous reports that the database cluster wasn't ready.

Feature

Added a [tutorial](https://cloud.google.com/alloydb/docs/quickstart/integrate-kubernetes) that shows you how to set up a connection from an application running in a Google Kubernetes Engine autopilot cluster to an AlloyDB instance.

Issue

Upgrading to version 1.1.1 of the [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) might result in a brief interruption to all database clusters. No data loss is expected.

Fixed

[AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.1.1 is now available. This patch fixes the following issues:

-   Fixed a regression for the AlloyDB Vertex AI integration.
-   Fixed a bug in which upgrading from version 1.0.0 to version 1.1.0 failed when using injected sidecars.
-   Fixed a bug in which backups weren't reestablished correctly across failovers when using the Commvault sidecar with high availability (HA) configurations.
-   Fixed a bug that caused a status to be incorrectly set by the load balancer, resulting in erroneous reports that the database cluster wasn't ready.

Feature

Added a [tutorial](https://cloud.google.com/alloydb/docs/quickstart/integrate-kubernetes) that shows you how to set up a connection from an application running in a Google Kubernetes Engine autopilot cluster to an AlloyDB instance.

Issue

Upgrading to version 1.1.1 of the [AlloyDB Omni Kubernetes operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) might result in a brief interruption to all database clusters. No data loss is expected.

## August 22, 2024

Feature

AlloyDB Omni now offers in-depth documentation that describes how to install and use AlloyDB Omni in virtual machine (VM) environments. The information in these documents is in addition to the AlloyDB Omni documentation that describes how to install and use AlloyDB Omni in VM and Kubernetes environments. For more information, see [Get started with AlloyDB Omni on VMs](https://cloud.google.com/alloydb/omni/containers/current/docs/get-started).

Feature

AlloyDB Omni now offers in-depth documentation that describes how to install and use AlloyDB Omni in virtual machine (VM) environments. The information in these documents is in addition to the AlloyDB Omni documentation that describes how to install and use AlloyDB Omni in VM and Kubernetes environments. For more information, see [Get started with AlloyDB Omni on VMs](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/get-started).

Change

The extension `temporal_tables` version 1.2.2 has been added to [extensions supported by AlloyDB](https://cloud.google.com/alloydb/docs/reference/extensions).

The following extensions are updated:

-   Updated `pg_partman` to version 4.7.4.
-   Updated `pgtt` to version 3.0.0.

Change

The extension `temporal_tables` version 1.2.2 has been added to [extensions supported by AlloyDB](https://cloud.google.com/alloydb/docs/reference/extensions).

The following extensions are updated:

-   Updated `pg_partman` to version 4.7.4.
-   Updated `pgtt` to version 3.0.0.

## August 16, 2024

Feature

[The AlloyDB Omni Kubernetes Operator version 1.1.0](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) lets you [configure a load balancer using annotations](https://cloud.google.com/alloydb/omni/containers/current/docs/configure-load-balancer-k8s).

Feature

[The AlloyDB Omni Kubernetes Operator version 1.1.0](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) lets you [configure a load balancer using annotations](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/configure-load-balancer-k8s).

## August 05, 2024

Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/docs/omni) version 15.5.5 is now generally available ([GA](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages)). This version includes the following features and changes:

-   The [AlloyDB Omni Kubernetes Operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes) version 1.1.0 is generally available ([GA](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages)) and it includes the following new features:

    -   [Cross-data center replication](https://cloud.google.com/alloydb/omni/containers/current/docs/cross-data-center-replication/about-cross-data-center-replication) to support automated setup of disaster recovery.
    -   [Support for the Red Hat OpenShift container platform](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes#rhel-openshift) version 4.14 and later in [Preview](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages).
    -   [Variable number of nodes](https://cloud.google.com/alloydb/omni/containers/current/docs/kubernetes-read-pool) per read pool instance.
    -   [Customizable count](https://cloud.google.com/alloydb/omni/containers/current/docs/kubernetes-ha#adjust-failover-trigger-settings) for the number of failed checks before auto-failover kicks in for a High Availability (HA) configuration.
    -   [Version 1.1.0 of the Operator](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes#compatibility) is supported on AlloyDB Omni version 15.5.5 and later.
    -   A dedicated backup server for streamlined backup operations.
    -   When you create a database cluster, the admin password secret is [no longer deleted](https://cloud.google.com/alloydb/omni/containers/current/docs/deploy-kubernetes#create) after you specify it.
-   The `postgres_ann` extension is renamed to `alloydb_scann`. Before you upgrade AlloyDB Omni, you must drop any indexes created using the older `postgres_ann` version, then upgrade AlloyDB Omni, and then create the indexes again using the `alloydb_scann` extension.

-   Various bug fixes.


Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/docs/omni) version 15.5.5 is now generally available ([GA](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages)). This version includes the following features and changes:

-   The [AlloyDB Omni Kubernetes Operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes) version 1.1.0 is generally available ([GA](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages)) and it includes the following new features:

    -   [Cross-data center replication](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/cross-data-center-replication/about-cross-data-center-replication) to support automated setup of disaster recovery.
    -   [Support for the Red Hat OpenShift container platform](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes#rhel-openshift) version 4.14 and later in [Preview](https://cloud.google.com/products?e=48754805&amp;hl=en#product-launch-stages).
    -   [Variable number of nodes](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/kubernetes-read-pool) per read pool instance.
    -   [Customizable count](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/kubernetes-ha#adjust-failover-trigger-settings) for the number of failed checks before auto-failover kicks in for a High Availability (HA) configuration.
    -   [Version 1.1.0 of the Operator](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes#compatibility) is supported on AlloyDB Omni version 15.5.5 and later.
    -   A dedicated backup server for streamlined backup operations.
    -   When you create a database cluster, the admin password secret is [no longer deleted](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/deploy-kubernetes#create) after you specify it.
-   The `postgres_ann` extension is renamed to `alloydb_scann`. Before you upgrade AlloyDB Omni, you must drop any indexes created using the older `postgres_ann` version, then upgrade AlloyDB Omni, and then create the indexes again using the `alloydb_scann` extension.

-   Various bug fixes.


## June 25, 2024

Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/docs/omni) version 15.5.4 is generally available ([GA](https://cloud.google.com/products?e=48754805&#product-launch-stages)). This version includes the following features and changes:

-   The simplified installation method for AlloyDB Omni is now generally available ([GA](https://cloud.google.com/products?e=48754805&#product-launch-stages)). You can install and manage your AlloyDB Omni installation using common container-management tools such as Docker. For information on upgrading an existing AlloyDB Omni installation, see [Migrate from an earlier version of AlloyDB Omni to the latest version](https://cloud.google.com/alloydb/omni/containers/current/docs/migrate-to-latest-version).
-   AlloyDB Omni supports the Podman container tool on Red Hat Enterprise Linux (RHEL).
-   Support for Arm-based architectures is now available in [Preview](https://cloud.google.com/products?e=48754805&#product-launch-stages).
-   Various bug fixes and performance improvements.

Feature

[AlloyDB Omni](https://cloud.google.com/alloydb/docs/omni) version 15.5.4 is generally available ([GA](https://cloud.google.com/products?e=48754805&#product-launch-stages)). This version includes the following features and changes:

-   The simplified installation method for AlloyDB Omni is now generally available ([GA](https://cloud.google.com/products?e=48754805&#product-launch-stages)). You can install and manage your AlloyDB Omni installation using common container-management tools such as Docker. For information on upgrading an existing AlloyDB Omni installation, see [Migrate from an earlier version of AlloyDB Omni to the latest version](https://cloud.google.com/alloydb/omni/kubernetes/current/docs/migrate-to-latest-version).
-   AlloyDB Omni supports the Podman container tool on Red Hat Enterprise Linux (RHEL).
-   Support for Arm-based architectures is now available in [Preview](https://cloud.google.com/products?e=48754805&#product-launch-stages).
-   Various bug fixes and performance improvements.

Send feedback

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.
