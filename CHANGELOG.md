# Changelog

All notable changes to this project are tracked here. This file is maintained
automatically by [release-please](https://github.com/googleapis/release-please)
from [Conventional Commits](https://www.conventionalcommits.org/) on `main`.

## [0.4.0](https://github.com/subagentceo/managed-coworkers/compare/knowledge-engineering-v0.3.0...knowledge-engineering-v0.4.0) (2026-05-20)


### Features

* **md-quality:** all-vendor baseline snapshot for drift tracking (OMDQ12) ([#97](https://github.com/subagentceo/managed-coworkers/issues/97)) ([b970084](https://github.com/subagentceo/managed-coworkers/commit/b970084f07a055c76ad9c1a7a3cd921c5a30dc7a))


### Bug Fixes

* **md-quality:** apply fix-vendor.ts to bottom-3 vendors (OMDQ13) ([#99](https://github.com/subagentceo/managed-coworkers/issues/99)) ([ec87fa5](https://github.com/subagentceo/managed-coworkers/commit/ec87fa58176fdb01c78ea3d7b7381cba51dbeb5a))

## [0.3.0](https://github.com/subagentceo/managed-coworkers/compare/knowledge-engineering-v0.2.0...knowledge-engineering-v0.3.0) (2026-05-20)


### Features

* **seeds:** add 10 Anthropic Skilljar course transcripts (OSKILL1) ([#94](https://github.com/subagentceo/managed-coworkers/issues/94)) ([a3411a9](https://github.com/subagentceo/managed-coworkers/commit/a3411a9d1d9f620e280cb30e41afc88f5c5cb828))

## [0.2.0](https://github.com/subagentceo/managed-coworkers/compare/knowledge-engineering-v0.1.1...knowledge-engineering-v0.2.0) (2026-05-19)


### Features

* **data-plane:** AlloyDB Omni + Redis 7 docker stack + MCP wiring (OVR19) ([#34](https://github.com/subagentceo/managed-coworkers/issues/34)) ([5c8ab68](https://github.com/subagentceo/managed-coworkers/commit/5c8ab68377c3b99e49e914ba6c651eaad9bd2ec2))
* **domain/tools:** import 16 canonical Tool subclasses (OCDM3) ([#84](https://github.com/subagentceo/managed-coworkers/issues/84)) ([4b33048](https://github.com/subagentceo/managed-coworkers/commit/4b3304815fb39ef60ec7fa4c2f1e864c4cb95489))
* **domain:** canonical Agent, Subagent, AgentTeam model (OCDM8) ([#89](https://github.com/subagentceo/managed-coworkers/issues/89)) ([93256ab](https://github.com/subagentceo/managed-coworkers/commit/93256ab5eb44c5bacf4b4d4152976db7872c2383))
* **domain:** canonical Automation + Loop/CronTask/Routine (OCDM6) ([#87](https://github.com/subagentceo/managed-coworkers/issues/87)) ([5f9f673](https://github.com/subagentceo/managed-coworkers/commit/5f9f67362d8e2c37bd5489472b47f2c7e6c6b8d8))
* **domain:** canonical Permissions (PermissionRule + PermissionPolicy) (OCDM4) ([#86](https://github.com/subagentceo/managed-coworkers/issues/86)) ([ab62f62](https://github.com/subagentceo/managed-coworkers/commit/ab62f62f8c6216c302106be1f9cb689c5bd33d89))
* **domain:** canonical Sessions (Context+Turn+AgenticLoop+Session) + Checkpoint stub (OCDM7) ([#88](https://github.com/subagentceo/managed-coworkers/issues/88)) ([48b79d0](https://github.com/subagentceo/managed-coworkers/commit/48b79d0fa5e3a581ff447a94ee6b1b15b7e554e3))
* **domain:** canonical Surface abstraction + 5 concrete surfaces (OCDM5) ([#82](https://github.com/subagentceo/managed-coworkers/issues/82)) ([0c2a4a1](https://github.com/subagentceo/managed-coworkers/commit/0c2a4a14b397e21eabe31e0410fb2933a7e748b2))
* **domain:** import Entity, Identifier, enums foundations (OCDM1) ([#83](https://github.com/subagentceo/managed-coworkers/issues/83)) ([65adb20](https://github.com/subagentceo/managed-coworkers/commit/65adb2057f05c12aed1e838a9fc2833400ca086b))
* **domain:** import Tool base + 6 file-ops Tool subclasses (OCDM2) ([#85](https://github.com/subagentceo/managed-coworkers/issues/85)) ([6234262](https://github.com/subagentceo/managed-coworkers/commit/6234262e8d09a8caa13d11076536bef14d3b0ab9))
* **mcp:** add vendor_refresh tool to knowledge bridge (OVR2) ([#13](https://github.com/subagentceo/managed-coworkers/issues/13)) ([d4db570](https://github.com/subagentceo/managed-coworkers/commit/d4db570c9c0f88a9fb03e1d12a16d98a3e82f10e))
* **mcp:** redis cache layer for vendor_fetch (OVR22) ([#37](https://github.com/subagentceo/managed-coworkers/issues/37)) ([e82f54f](https://github.com/subagentceo/managed-coworkers/commit/e82f54fb4fed28dfbfe47c894bccce3617ad6e0c))
* **mcp:** vendor_refresh emits structured JSON, drops log-scrape (OVR21) ([#36](https://github.com/subagentceo/managed-coworkers/issues/36)) ([a3bc4da](https://github.com/subagentceo/managed-coworkers/commit/a3bc4da53b0c6de8c507fa359f2b1a70ae796130))
* **md-quality:** --vendors=a,b,c multi-vendor flag for grade-vendor CLI (OMDQ-MULTI) ([#74](https://github.com/subagentceo/managed-coworkers/issues/74)) ([f6e49a0](https://github.com/subagentceo/managed-coworkers/commit/f6e49a0a8fe3f7f9cefcc1ed5cca73070471eaf8))
* **md-quality:** aggregator + grade-vendor CLI + golden test (OMDQ6) ([#68](https://github.com/subagentceo/managed-coworkers/issues/68)) ([d0203ed](https://github.com/subagentceo/managed-coworkers/commit/d0203ed3aa938e13bc32dbf8205e5108bdb06caf))
* **md-quality:** fenced code axis C (OMDQ3) ([#65](https://github.com/subagentceo/managed-coworkers/issues/65)) ([16e027e](https://github.com/subagentceo/managed-coworkers/commit/16e027e3b2157f417431e322f8c524bf0272ac48))
* **md-quality:** heading hygiene axis B (OMDQ2) ([#64](https://github.com/subagentceo/managed-coworkers/issues/64)) ([1ac5a38](https://github.com/subagentceo/managed-coworkers/commit/1ac5a38015bb8abb773bfdafe7bbdfc1c9afe661))
* **md-quality:** line discipline axis E (OMDQ5) ([#67](https://github.com/subagentceo/managed-coworkers/issues/67)) ([d063e1f](https://github.com/subagentceo/managed-coworkers/commit/d063e1fa8be2d65ebaf7f2834cee972e683a9416))
* **md-quality:** link hygiene axis D (OMDQ4) ([#66](https://github.com/subagentceo/managed-coworkers/issues/66)) ([14edac1](https://github.com/subagentceo/managed-coworkers/commit/14edac16b506658445f85c9f920b7db153c31d2e))
* **md-quality:** md_quality_diff MCP tool (OMDQ9, MD9) ([#75](https://github.com/subagentceo/managed-coworkers/issues/75)) ([14e4901](https://github.com/subagentceo/managed-coworkers/commit/14e4901bc0d6289e6d741463016e382ee59b40fc))
* **md-quality:** md_quality_file MCP tool (OMDQ7, MD7) ([#77](https://github.com/subagentceo/managed-coworkers/issues/77)) ([31d9999](https://github.com/subagentceo/managed-coworkers/commit/31d9999c1e4015bbed1ec3a1089e61b5ba62aaa5))
* **md-quality:** md_quality_top_offenders + index builder (OMDQ10, MD10) ([#76](https://github.com/subagentceo/managed-coworkers/issues/76)) ([2ca1db5](https://github.com/subagentceo/managed-coworkers/commit/2ca1db5f15084c4b92f02d8b47cb4541f7393782))
* **md-quality:** md_quality_vendor MCP tool + redis cache (OMDQ8, MD8) ([#71](https://github.com/subagentceo/managed-coworkers/issues/71)) ([39ab709](https://github.com/subagentceo/managed-coworkers/commit/39ab709b347e9583f79332cb5dc796765b0af5b7))
* **md-quality:** parseability axis A + spec.txt fixture loader (OMDQ1) ([#63](https://github.com/subagentceo/managed-coworkers/issues/63)) ([df39c32](https://github.com/subagentceo/managed-coworkers/commit/df39c32fbf7319d0b95dca8f648a309169d6aaf8))
* **md-quality:** re-export gradeMarkdown + types from package root (OMDQ-EXPORT) ([#69](https://github.com/subagentceo/managed-coworkers/issues/69)) ([92277d4](https://github.com/subagentceo/managed-coworkers/commit/92277d48065a0269568ea70936ad719dc9926778))
* **md-quality:** scripts/fix-vendor.ts auto-fixer for B/C/D/E axes (OMDQ11) ([#80](https://github.com/subagentceo/managed-coworkers/issues/80)) ([b3c313e](https://github.com/subagentceo/managed-coworkers/commit/b3c313e01a5878b1516b71609862e653c9ff0ddb))
* **md-quality:** scripts/grade-vendors-all.ts + npm run grade:vendor:all (OMDQ-ALL) ([#78](https://github.com/subagentceo/managed-coworkers/issues/78)) ([0443034](https://github.com/subagentceo/managed-coworkers/commit/0443034a65537d97debc73936bbe13003e7a6431))
* **md-quality:** vendor markdown rubric v1 + commonmark-spec mirror (OMDQ0) ([#62](https://github.com/subagentceo/managed-coworkers/issues/62)) ([894e33d](https://github.com/subagentceo/managed-coworkers/commit/894e33db6836ed26f98985f95509a51746f2ebe5))
* **miniflare:** in-process workerd harness (OMINI1) ([#45](https://github.com/subagentceo/managed-coworkers/issues/45)) ([ac4bf96](https://github.com/subagentceo/managed-coworkers/commit/ac4bf96a896a537722821501e44e339be3770fec))
* **packages:** vendor anthropics/claude-for-legal as packages/claude-for-legal (OPKG1) ([#40](https://github.com/subagentceo/managed-coworkers/issues/40)) ([d4cf056](https://github.com/subagentceo/managed-coworkers/commit/d4cf0561158fcf8611895a7ceb65a71e5c18733e))
* **packages:** vendor anthropics/financial-services-plugins as packages/financial-services (OPKG2) ([#41](https://github.com/subagentceo/managed-coworkers/issues/41)) ([4d4ae0e](https://github.com/subagentceo/managed-coworkers/commit/4d4ae0e1c997ddfc245f4b69d7613ca914dad80a))
* **packages:** vendor anthropics/knowledge-work-plugins/small-business as packages/small-business (OPKG3) ([#42](https://github.com/subagentceo/managed-coworkers/issues/42)) ([28eefe3](https://github.com/subagentceo/managed-coworkers/commit/28eefe3c81fce78436d8492d3ce08cda195b8cca))
* **packages:** vendor anthropics/skills/claude-api as packages/claude-api-skill (OPKG4) ([#43](https://github.com/subagentceo/managed-coworkers/issues/43)) ([1eef3ae](https://github.com/subagentceo/managed-coworkers/commit/1eef3ae5ab1a9873379d743889425beb8b995219))
* **replay:** cassette-redact helper + CLI (OREPLAY13) ([#61](https://github.com/subagentceo/managed-coworkers/issues/61)) ([777fa92](https://github.com/subagentceo/managed-coworkers/commit/777fa92ffe172bfe95b7c1fa2229ea4376e1a136))
* **replay:** combined pollyjs + miniflare harness test (OREPLAY4) ([#49](https://github.com/subagentceo/managed-coworkers/issues/49)) ([c2ddae3](https://github.com/subagentceo/managed-coworkers/commit/c2ddae375b8f5022b237ed4866f7be1d9145682a))
* **replay:** cookbook-replay glue layer (OREPLAY7) ([#54](https://github.com/subagentceo/managed-coworkers/issues/54)) ([5e33c57](https://github.com/subagentceo/managed-coworkers/commit/5e33c57768295e5a2fd0e45f09eccab596512027))
* **replay:** finance managed-agent cookbook loader (OREPLAY3) ([#47](https://github.com/subagentceo/managed-coworkers/issues/47)) ([3630d4a](https://github.com/subagentceo/managed-coworkers/commit/3630d4a4f6dc4fd0224497716a1e91e9fe8d7d2b))
* **replay:** legal managed-agent cookbook loader (OREPLAY2) ([#46](https://github.com/subagentceo/managed-coworkers/issues/46)) ([dfd0a81](https://github.com/subagentceo/managed-coworkers/commit/dfd0a81e02fd5b8df6f7166395dd3bd07d58f73e))
* **replay:** pollyjs harness foundation (OREPLAY1) ([#44](https://github.com/subagentceo/managed-coworkers/issues/44)) ([448beef](https://github.com/subagentceo/managed-coworkers/commit/448beef3e2607eab9fd339949350ccf738e7e42e))
* **replay:** re-export replay surface from src/index.ts (OREPLAY8) ([#55](https://github.com/subagentceo/managed-coworkers/issues/55)) ([1acd59d](https://github.com/subagentceo/managed-coworkers/commit/1acd59d124a12d985c33f075002b93bf3ca8930f))
* **replay:** undici MockAgent supplement closes pollyjs leak (OREPLAY16) ([#60](https://github.com/subagentceo/managed-coworkers/issues/60)) ([41c0f09](https://github.com/subagentceo/managed-coworkers/commit/41c0f09f371b646b76a8c6d52397fc1f744a2d2f))
* **smoke:** add data-plane smoke test for AlloyDB + Redis (OVR20) ([#35](https://github.com/subagentceo/managed-coworkers/issues/35)) ([7141a3d](https://github.com/subagentceo/managed-coworkers/commit/7141a3d6ef4c437fdc241bf4aa82164279da365c))
* **vendor:** mirror miniflare docs + re-cite harness (OMINI-CRAWL) ([#72](https://github.com/subagentceo/managed-coworkers/issues/72)) ([6a7db8c](https://github.com/subagentceo/managed-coworkers/commit/6a7db8cddabc5baefd7340de1f339171c235d2ad))
* **vendor:** refresh vendor/anthropic-sitemap (OVR9) ([#21](https://github.com/subagentceo/managed-coworkers/issues/21)) ([719aa21](https://github.com/subagentceo/managed-coworkers/commit/719aa21712d26cff6a84fd35e6960a259fc02443))
* **vendor:** refresh vendor/anthropics + restore crawler runtime (OVR1) ([#11](https://github.com/subagentceo/managed-coworkers/issues/11)) ([5ff5108](https://github.com/subagentceo/managed-coworkers/commit/5ff51081f09d351b792c09a957a1362eedb609f7))
* **vendor:** refresh vendor/arkose-labs (OVR10) ([#22](https://github.com/subagentceo/managed-coworkers/issues/22)) ([af7ecbe](https://github.com/subagentceo/managed-coworkers/commit/af7ecbeb811a5680c564a2231e449fd2d0594b29))
* **vendor:** refresh vendor/aws (OVR11) ([#23](https://github.com/subagentceo/managed-coworkers/issues/23)) ([70a9a55](https://github.com/subagentceo/managed-coworkers/commit/70a9a55c4cd559c408175ec4612842fe600224be))
* **vendor:** refresh vendor/brave-search (OVR12) ([#24](https://github.com/subagentceo/managed-coworkers/issues/24)) ([8bedc49](https://github.com/subagentceo/managed-coworkers/commit/8bedc49fb97a43a91a2a5513ca4bec12a5aa11cd))
* **vendor:** refresh vendor/claude-sitemap (OVR13) ([#25](https://github.com/subagentceo/managed-coworkers/issues/25)) ([733f196](https://github.com/subagentceo/managed-coworkers/commit/733f196c73df619465659e5844d5eb027757e76f))
* **vendor:** refresh vendor/cloudflare (OVR3) ([#14](https://github.com/subagentceo/managed-coworkers/issues/14)) ([5a38f6b](https://github.com/subagentceo/managed-coworkers/commit/5a38f6b0ce6053867cee4cc974efc5668674ad4a))
* **vendor:** refresh vendor/docs-github (OVR14) ([#26](https://github.com/subagentceo/managed-coworkers/issues/26)) ([2339afe](https://github.com/subagentceo/managed-coworkers/commit/2339afea62bd28123a8ebc36c9e1ceb0ed0bb08c))
* **vendor:** refresh vendor/modelcontextprotocol (OVR8) ([#19](https://github.com/subagentceo/managed-coworkers/issues/19)) ([a1b5b37](https://github.com/subagentceo/managed-coworkers/commit/a1b5b37afdeb042785c468abdb7ecef0954abdb6))
* **vendor:** refresh vendor/neon + add TODO for non-vendor study dirs (OVR15) ([#28](https://github.com/subagentceo/managed-coworkers/issues/28)) ([0e1e724](https://github.com/subagentceo/managed-coworkers/commit/0e1e724c378c7c151898abc32db7085bb767fd06))
* **vendor:** refresh vendor/sentry (OVR7) ([#18](https://github.com/subagentceo/managed-coworkers/issues/18)) ([09c7c8c](https://github.com/subagentceo/managed-coworkers/commit/09c7c8c3e644383bf0df434032ef9a17a3e4ed13))
* **vendor:** refresh vendor/sift (OVR16) ([#29](https://github.com/subagentceo/managed-coworkers/issues/29)) ([6a89699](https://github.com/subagentceo/managed-coworkers/commit/6a89699fa0b28b1f93fcfc957a780df4805eacd5))
* **vendor:** refresh vendor/stripe (OVR5) ([#16](https://github.com/subagentceo/managed-coworkers/issues/16)) ([40c9837](https://github.com/subagentceo/managed-coworkers/commit/40c9837bfb3f1e044022768f48ae515085cc67f5))
* **vendor:** refresh vendor/turbopuffer (OVR4) ([#15](https://github.com/subagentceo/managed-coworkers/issues/15)) ([fe18e4b](https://github.com/subagentceo/managed-coworkers/commit/fe18e4b8ae3229c6d408147feec9516510d96f27))
* **vendor:** refresh vendor/wellarchitected-github (OVR17) ([#31](https://github.com/subagentceo/managed-coworkers/issues/31)) ([3c8f246](https://github.com/subagentceo/managed-coworkers/commit/3c8f2461f82cd3fc4bc0f486cdffa7fda0dbc5a4))
* **vendor:** refresh vendor/workos (OVR6) ([#17](https://github.com/subagentceo/managed-coworkers/issues/17)) ([c59b1c1](https://github.com/subagentceo/managed-coworkers/commit/c59b1c1e6b0db9e23d426fb114ba4fd8528b0f63))
* **vendor:** surface llms.txt directives via GUIDANCE.md (OVR18) ([#33](https://github.com/subagentceo/managed-coworkers/issues/33)) ([b93a46c](https://github.com/subagentceo/managed-coworkers/commit/b93a46c751dc04b1771779a3caf4c36bc2615911))


### Bug Fixes

* **oauth:** reject ANTHROPIC_API_KEY in ManagedAgentsClient constructor (OSL1-FIX) ([#51](https://github.com/subagentceo/managed-coworkers/issues/51)) ([2ab0742](https://github.com/subagentceo/managed-coworkers/commit/2ab074268e11f91b338e8fc635598a29b17b47f4))
* **package:** remove stray merge marker from package.json (OBATCH-FIX) ([#79](https://github.com/subagentceo/managed-coworkers/issues/79)) ([9d9f230](https://github.com/subagentceo/managed-coworkers/commit/9d9f2302241fa184d4b902d2875ab42f0d5bdc2c))
* **tsc:** strip dead .ts extensions + tighten Message role types (OVR24) ([#39](https://github.com/subagentceo/managed-coworkers/issues/39)) ([8e17607](https://github.com/subagentceo/managed-coworkers/commit/8e17607c2f91b7d22a9afc15f8c222820b27eabb))
* **verify:** add alloydb-omni + redis to vendor-catalog LEGACY_ALLOW (OVR26) ([#50](https://github.com/subagentceo/managed-coworkers/issues/50)) ([8a1b4a7](https://github.com/subagentceo/managed-coworkers/commit/8a1b4a7e4fb5bf767314b8a59b91e3cc5c6805b1))


### Documentation

* **adr:** replay-only managed-agents architecture (OREPLAY0) ([#52](https://github.com/subagentceo/managed-coworkers/issues/52)) ([f750153](https://github.com/subagentceo/managed-coworkers/commit/f750153604f2750a2a40781adcfcb802e671da8f))
* **audit:** legacy src/index.ts exports have no external consumers (OREPLAY9) ([#58](https://github.com/subagentceo/managed-coworkers/issues/58)) ([b2fdb3f](https://github.com/subagentceo/managed-coworkers/commit/b2fdb3fdb1c79f8e6b92c2bcf6b0f7c3191f228d))
* **readme:** refresh top-level README to current chassis reality (OREPLAY-15) ([#73](https://github.com/subagentceo/managed-coworkers/issues/73)) ([414ddaa](https://github.com/subagentceo/managed-coworkers/commit/414ddaad29194fcb115a044ff52b70420ddab78e))
* **replay:** chassis-specific adapter overlay for managed-agents skill (OREPLAY10) ([#57](https://github.com/subagentceo/managed-coworkers/issues/57)) ([a74f463](https://github.com/subagentceo/managed-coworkers/commit/a74f463f06e59d63beab7eedce3b8cfb80ac6d9b))


### Chores

* **cassettes:** bootstrap cassettes/ directory tree (OREPLAY0/CASSETTE-DIR) ([#53](https://github.com/subagentceo/managed-coworkers/issues/53)) ([6a7d66c](https://github.com/subagentceo/managed-coworkers/commit/6a7d66ccb0f73ba1568cfaf770b34271f95fd272))
* **deprecate:** mark 15 legacy index exports [@deprecated](https://github.com/deprecated) (OREPLAY-12) ([#70](https://github.com/subagentceo/managed-coworkers/issues/70)) ([4b86ff5](https://github.com/subagentceo/managed-coworkers/commit/4b86ff5f67381409aa48ccdcca243e14b84ba28a))
* **domain:** delete legacy files/vaults/environments managers (OCDM10) ([#91](https://github.com/subagentceo/managed-coworkers/issues/91)) ([0641a54](https://github.com/subagentceo/managed-coworkers/commit/0641a5465ab7e031b9705284473128d7e9a93434))
* **legacy:** delete platform/outcomes/webhooks rubric remnants (OCDM11) ([#92](https://github.com/subagentceo/managed-coworkers/issues/92)) ([69c7ab3](https://github.com/subagentceo/managed-coworkers/commit/69c7ab3032f8ad68e5e9fa319f1b5e4b21fc5527))
* **ocdm:** delete legacy skills/dreams/memory modules (OCDM9) ([#90](https://github.com/subagentceo/managed-coworkers/issues/90)) ([4ea7243](https://github.com/subagentceo/managed-coworkers/commit/4ea724389e436ebc78f29ecd0b58f3bcc9002615))
* **scripts:** wire smoke:replay + verify:* chain (OVR25) ([#48](https://github.com/subagentceo/managed-coworkers/issues/48)) ([34ae33b](https://github.com/subagentceo/managed-coworkers/commit/34ae33bb0a784a3cf75ca3b0927eb02fc3eee439))

## [0.1.1](https://github.com/subagentceo/managed-coworkers/compare/knowledge-engineering-v0.1.0...knowledge-engineering-v0.1.1) (2026-05-18)


### Chores

* **ci:** canonicalize claude-* workflows + trim auto-rebase (ORM5) ([#9](https://github.com/subagentceo/managed-coworkers/issues/9)) ([55eff86](https://github.com/subagentceo/managed-coworkers/commit/55eff862cfc4fd758a51de6c8d54079c9e7dafa0))
* **ci:** canonicalize release-please.yml + strip Neon from cf-preview (ORM4) ([#7](https://github.com/subagentceo/managed-coworkers/issues/7)) ([58be3a7](https://github.com/subagentceo/managed-coworkers/commit/58be3a73f79352a02ef3df4f514717600dab4129))
* **ci:** remove dead CodeQL + Dependabot + Neon surfaces (ORM1) ([#3](https://github.com/subagentceo/managed-coworkers/issues/3)) ([f79d98c](https://github.com/subagentceo/managed-coworkers/commit/f79d98c3b221fbc83afc067bdb09d99f6ffdadff))
* **ci:** remove verify.yml — chain references deleted files (ORM3) ([#6](https://github.com/subagentceo/managed-coworkers/issues/6)) ([b64da4a](https://github.com/subagentceo/managed-coworkers/commit/b64da4af27dc49ec0a57c1b536b81dbacab281a7))
* remove plugins/ directory and dependent CI surfaces (ORM2) ([#5](https://github.com/subagentceo/managed-coworkers/issues/5)) ([d8c3a0f](https://github.com/subagentceo/managed-coworkers/commit/d8c3a0fa3680f39aa2e8c145b078336ed23b4fb9))

## [0.1.0] - 2026-05-09

### Features

- Four-lane knowledge bridge MCP server on MCP SDK v2
  (`src/mcp/bridge-server.ts`) with one lane module per source:
  - `anthropic.com/engineering` (`engineering_index`, `engineering_fetch`,
    `engineering_search`)
  - `claude.com/blog` (`blog_index`, `blog_fetch`, `blog_search`)
  - `support.claude.com` (`support_collections`, `support_collection`,
    `support_article`)
  - `llms.txt` namespaces (`llms_namespaces`, `llms_fetch`, `llms_grep`)
- Claude Agent SDK orchestrator (`src/agent/run.ts`) with one sub-agent per
  bridge; each sub-agent's tool surface is restricted to its lane.
- OAuth-only auth gate (`src/oauth/token.ts`): refuses to run if
  `ANTHROPIC_API_KEY` is set or no OAuth token is provided.
- Seed prompts in `seeds/prompts/` for the orchestrator and four bridge
  sub-agents.
- Mintlify documentation site (`docs/`) with one page per bridge plus
  reference pages for the MCP server, orchestrator, and OAuth contract.
- Session artifact (`docs/session-artifact.md`): how the original ten
  tool-family decomposition was rotated into four content-source bridges.

### Chores

- `release-please` configured for automated CHANGELOG + version bumps.
