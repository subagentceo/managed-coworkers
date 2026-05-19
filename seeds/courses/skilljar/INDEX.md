# Anthropic Skilljar course transcripts

> Operator-curated text transcripts of public Anthropic Skilljar courses.
> Use as citation material from `*.test.ts` files via `@cite seeds/courses/skilljar/<filename>`.

**Source**: <https://anthropic.skilljar.com/> (public catalog)
**Curated**: 2026-05-18 by `alex-jadecli`
**License**: All transcripts are Anthropic's published course content; included here for replay-only citation, not redistribution.

## Index

| Slug | Course | Bytes | Topics |
|---|---|---|---|
| `ai-fluency-for-educators__aif4ed.txt` | AI Fluency for Educators | 13 KB | classroom AI use, lesson design |
| `ai-fluency-for-students__aif4students.txt` | AI Fluency for Students | 13 KB | study-skills with AI, prompt literacy |
| `building-with-the-claude-api__1p.txt` | Building with the Claude API | 85 KB | tool use, agents, prompt engineering |
| `claude-api-course-notes.txt` | Claude API course notes | 85 KB | companion notes to the API course |
| `claude-code-in-action__claudecode.txt` | Claude Code in Action | 19 KB | CLI workflows, agents, skills |
| `claude-with-amazon-bedrock__bedrock.txt` | Claude with Amazon Bedrock | 73 KB | AWS deployment, IAM, model access |
| `claude-with-google-cloud-s-vertex-ai__vertex.txt` | Claude with Google Cloud Vertex AI | 76 KB | GCP deployment, regional endpoints |
| `introduction-to-claude-cowork__cowork.txt` | Introduction to Claude Cowork | 302 KB | 14-lesson Cowork 101: delegation, projects, skills, plugins, M365 |
| `introduction-to-model-context-protocol__mcp_intro.txt` | Introduction to MCP | 12 KB | MCP servers, clients, transport |
| `model-context-protocol-advanced-topics__mcp_advanced.txt` | MCP Advanced Topics | 10 KB | resources, prompts, sampling |
| `teaching-ai-fluency__taif.txt` | Teaching AI Fluency | 22 KB | educator playbook, rubrics, exercises |

## Citation examples

In any `*.test.ts` file:

```ts
/**
 * @cite seeds/courses/skilljar/introduction-to-claude-cowork__cowork.txt
 * @cite seeds/courses/skilljar/building-with-the-claude-api__1p.txt
 */
```

The `scripts/lib/citation-guard.ts` enforcer recognizes `seeds/courses/`
as a valid citation root (alongside `vendor/`, `seeds/citations/`, `rubrics/`).

## Maintenance

- **Refresh cadence**: when Anthropic publishes a new lesson or revises an existing one, re-export the transcript and replace the file in place.
- **Slug stability**: filenames are stable; rely on them in citations.
- **Removal**: if Anthropic delists a course, leave the transcript here with a `# DEPRECATED` header at the top of the file — it's still useful as a frozen snapshot.
