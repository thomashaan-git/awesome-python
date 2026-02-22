# CLAUDE.md

## Project Overview

**Awesome Python** is a community-curated list of Python frameworks, libraries, software, and resources. The primary content lives in `README.md`, which is also used to generate the website at [awesome-python.com](https://awesome-python.com) via MkDocs.

This is a content-curation project, not a software project. The only code is a sorting script (`sort.py`) and documentation build tooling.

## Repository Structure

```
.
├── README.md              # Main curated list (~1200 lines, ~350 entries across ~88 categories)
├── CONTRIBUTING.md        # Contribution guidelines
├── sort.py                # Sorts README.md entries alphabetically within sections
├── Makefile               # Build/deploy targets for MkDocs site
├── mkdocs.yml             # MkDocs site configuration
├── requirements.txt       # Python deps: mkdocs, mkdocs-material
├── docs/
│   ├── CNAME              # Custom domain (awesome-python.com)
│   ├── css/extra.css      # Theme customizations
│   └── index.md           # Generated from README.md (gitignored)
├── .travis.yml            # CI: runs sort.py, builds site, deploys to GitHub Pages
└── .github/
    ├── workflows/codeql.yml       # CodeQL security scanning
    ├── PULL_REQUEST_TEMPLATE.md   # PR template
    ├── FUNDING.yml                # GitHub Sponsors config
    └── ISSUE_TEMPLATE/            # Issue templates (redirect to PRs)
```

## Key Commands

```bash
# Install dependencies
make site_install          # pip install -r requirements.txt

# Sort README entries alphabetically (CI runs this automatically)
python sort.py

# Preview site locally
make site_preview          # runs mkdocs serve (requires site_link)

# Build static site
make site_build            # runs mkdocs build

# Deploy to GitHub Pages
make site_deploy           # runs mkdocs gh-deploy --clean
```

## CI/CD Pipeline

**Travis CI** runs on every push/PR:
1. `python sort.py` - Sorts all entries in README.md alphabetically
2. `cp README.md docs/index.md` - Copies README as site source
3. `mkdocs build` - Builds the static site

On merge to `master`, the site is deployed to GitHub Pages.

**GitHub Actions** runs CodeQL security analysis on pushes/PRs to `master` and weekly.

## Entry Format Convention

Every library entry in `README.md` must follow this exact format:

```markdown
* [project-name](https://example.com/) - A short description ends with a period.
```

Rules:
- Entries are alphabetically sorted within their section (enforced by `sort.py`)
- Descriptions must be concise and short
- Descriptions must end with a period
- Do not mention "Python" in descriptions (it's implied by the list)
- Links use `* [name](url)` format (bullet + space + markdown link)

## README.md Structure

The README is divided into two parts separated by `- - -`:

1. **Table of Contents** - Linked list of all categories
2. **Content sections** - `##` headers for categories, `###` for subcategories, `* [link](url) - description.` for entries

When adding a new category:
- Add a `##` section header in the content area
- Add the corresponding entry in the Table of Contents
- Follow existing alphabetical ordering

## Contribution Rules

- **One link per Pull Request** (strictly enforced)
- PR title format: `Add project-name`
- Search existing PRs/Issues before submitting to avoid duplicates
- Check spelling and grammar; remove trailing whitespace
- Authors should not submit their own projects

## How sort.py Works

The script performs two passes:

1. **`main()`**: Clusters lines by indentation, identifies link entries (`* [` or `- [`), and sorts each cluster case-insensitively
2. **`sort_blocks()`**: Splits content at `- - -`, then sorts `##`-level sections within the content area

The script reads and rewrites `README.md` in place. Running it is idempotent on already-sorted content.

## Dependencies

- Python 3.6+
- `mkdocs==1.0.4`
- `mkdocs-material==4.0.2`

## Common Tasks for AI Assistants

### Adding a new library entry
1. Identify the correct `##` category section in `README.md`
2. Add the entry in the format: `* [name](url) - Description.`
3. Run `python sort.py` to ensure proper alphabetical ordering
4. Verify the Table of Contents includes the relevant category

### Adding a new category
1. Add a `##` heading in the appropriate position in the content area (after `- - -`)
2. Add a corresponding link in the Table of Contents section
3. Add entries under the new heading
4. Run `python sort.py`

### Validating changes
Run `python sort.py` and check if README.md content changed. If it did, the entries were not properly sorted before the edit.
