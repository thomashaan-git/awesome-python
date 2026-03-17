# Code Review & Improvement Prompt — awesome-python

> **Doel:** Voer in één keer een grondige, kritische review uit van het hele awesome-python project (code, configuratie, UI/styling, content-kwaliteit) en maak alle verbeteringen direct. Budget: tot 60.000 tokens aan wijzigingen.

---

## PROMPT (kopieer en plak dit als instructie)

```
Je bent een senior software engineer en technical reviewer. Voer een VOLLEDIGE, KRITISCHE review uit van het awesome-python project en implementeer ALLE verbeteringen in één sessie. Je hebt een budget van 60.000 output-tokens — gebruik dit volledig.

## SCOPE — Wat je MOET reviewen en verbeteren

### 1. CODE KWALITEIT — sort.py (KRITISCH)

Analyseer sort.py rigoureus op:

- **Dode code:** `sort_blocks()` wordt aangeroepen vanuit `main()` maar voert een TWEEDE pass uit die de output van `main()` potentieel overschrijft. Analyseer of dit correct is of een bug.
- **Code duplicatie:** Twee sorteerfuncties (`sort_blocks` en de logica in `main`) doen overlappend werk. Refactor naar één duidelijke pipeline.
- **Error handling:** Geen enkele try/except. Wat als README.md niet bestaat? Wat als het formaat onverwacht is?
- **Type hints:** Ontbreken volledig. Voeg type annotations toe (Python 3.9+ style).
- **Docstrings:** Alleen een module-level docstring. Voeg functie-docstrings toe (Google style).
- **Edge cases:** Wat als een blok leeg is? Wat als er geen `- - -` separator is?
- **Testbaarheid:** Maak functies puur (input/output) zodat ze testbaar zijn zonder file I/O.
- **Performance:** `any([...])` maakt een onnodige list — gebruik een generator: `any(...)`.
- **Modernisering:** Gebruik `pathlib.Path` in plaats van `open()`. Gebruik `enumerate()` waar van toepassing.
- **Voeg een unittest-bestand toe:** `test_sort.py` met minimaal 5 tests die kernfunctionaliteit valideren.

### 2. UI / STYLING — docs/css/extra.css (KRITISCH)

Het huidige CSS is minimaal (9 regels) en bevat een HACK:

```css
.md-content__inner > ul:nth-child(5) {
    display: none;
}
```

Dit verbergt content via een fragiele positie-selector. Review en verbeter:

- **Waarom wordt dit element verborgen?** Onderzoek welk element dit is in de gegenereerde HTML en bepaal of dit de juiste aanpak is.
- **Voeg professionele styling toe:**
  - Verbeterde typografie (font-sizes, line-heights, letter-spacing)
  - Betere visuele hiërarchie voor categorieën vs. items
  - Hover-effecten op links voor betere UX
  - Verbeterde spacing/padding tussen secties
  - Subtiele achtergrondkleuren of borders om secties visueel te scheiden
  - Dark mode support via `@media (prefers-color-scheme: dark)`
  - Print stylesheet via `@media print`
  - Scroll-to-top indicatie of improved navigation
  - Badge/tag styling voor de categorie-headers
  - Responsive verbeteringen voor mobiel (de huidige CSS ignoreert mobiel volledig)
  - Focus-states voor accessibility (keyboard navigation)
  - Custom scrollbar styling
- **Verwijder de nth-child hack** en los het onderliggende probleem op de juiste manier op.

### 3. MKDOCS CONFIGURATIE — mkdocs.yml

- **Verouderd:** `google_analytics` is deprecated in nieuwere MkDocs versies. Migreer naar de juiste plugin-aanpak.
- **Social icons:** Gebruiken `type: github` formaat — dit is het OUDE formaat. Migreer naar het `icon`/`link` formaat.
- **Ontbrekende features:** Voeg toe:
  - `features: [navigation.instant, navigation.top, search.suggest, search.highlight]`
  - `icon: repo: fontawesome/brands/github`
  - Search plugin configuratie
  - Meta tags (description, og:image, etc.)
  - Correcte `nav` structuur
- **Versie-update in requirements.txt:** Update mkdocs en mkdocs-material naar recente versies die compatibel zijn met de nieuwe configuratie.

### 4. CI/CD — .travis.yml

- **Python 3.6 is EOL** sinds december 2021. Update naar Python 3.11+.
- **Travis CI is grotendeels verlaten** door open-source. Migreer naar GitHub Actions:
  - Maak `.github/workflows/build-and-deploy.yml`
  - Steps: checkout → setup Python → install deps → run sort.py → run tests → build site → deploy to GitHub Pages
  - Gebruik `actions/deploy-pages` voor deployment
  - Voeg een **link-checker** stap toe die dode links detecteert
  - Voeg **linting** toe (flake8 of ruff voor sort.py)
- **Behoud .travis.yml** als backup maar voeg een comment toe dat het deprecated is.

### 5. CONTENT KWALITEIT — README.md

Scan de HELE README.md (1200+ regels) op:

- **Consistentie:** Elke entry moet het formaat volgen: `* [naam](url) - Beschrijving met punt.`
  - Vind entries ZONDER punt aan het einde
  - Vind entries ZONDER beschrijving
  - Vind entries met inconsistente formatting (spaties, dashes, etc.)
- **Dode links:** Markeer verdachte URLs (known-dead domains, HTTP ipv HTTPS)
- **Duplicaten:** Zoek naar bibliotheken die in meerdere secties staan
- **Verouderde projecten:** Markeer projecten die archived/unmaintained zijn (als je dit kunt detecteren)
- **Alfabetische volgorde:** Controleer of items binnen secties correct gesorteerd zijn
- **HTTP → HTTPS:** Upgrade alle http:// links naar https:// waar mogelijk

### 6. PROJECT STRUCTUUR & DX (Developer Experience)

- **Makefile:** Voeg targets toe voor: `test`, `lint`, `check-links`, `format`
- **Pre-commit hooks:** Voeg een `.pre-commit-config.yaml` toe met hooks voor:
  - Trailing whitespace
  - End-of-file fixer
  - YAML lint
  - Markdown lint
  - Python formatting (black/ruff)
- **.editorconfig:** Voeg toe voor consistente formatting across editors
- **.gitignore:** Review en update (voeg `site/`, `__pycache__/`, `.mypy_cache/`, etc. toe)
- **CONTRIBUTING.md:** Update met duidelijkere instructies en voorbeelden

### 7. SECURITY & BEST PRACTICES

- **GitHub templates:** Review en verbeter issue/PR templates
- **CODEOWNERS:** Voeg een CODEOWNERS bestand toe
- **Dependabot:** Voeg `.github/dependabot.yml` toe voor automatische dependency updates
- **Branch protection:** Documenteer aanbevolen branch protection rules

## UITVOERINGSREGELS

1. **Lees EERST alle bestanden** voordat je wijzigingen maakt
2. **Maak ALLE wijzigingen** — niet alleen de makkelijke
3. **Wees KRITISCH** — als iets "goed genoeg" lijkt maar beter kan, verbeter het
4. **Documenteer je keuzes** — voeg comments toe waar design decisions niet obvious zijn
5. **Test compatibiliteit** — zorg dat mkdocs nog steeds kan builden na je wijzigingen
6. **Commit met duidelijke messages** — één commit per logische wijziging, of één grote commit als alles samenhangt
7. **Prioriteer impact:** Als je tegen het token-limiet aanloopt, focus dan op (in volgorde):
   a. Bugs en correctheid (sort.py)
   b. CI/CD modernisering (GitHub Actions)
   c. UI/CSS verbeteringen
   d. Content consistentie
   e. DX verbeteringen

## OUTPUT VERWACHTING

Na afloop moet het project:
- Een werkende, geteste sort.py hebben met moderne Python
- Een professioneel gestylede documentatie-site
- Een moderne CI/CD pipeline via GitHub Actions
- Consistente, goed-geformatteerde README content
- Goede developer experience met pre-commit hooks en linting
- Up-to-date dependencies

BEGIN NU. Lees alle bestanden, analyseer kritisch, en voer alle verbeteringen uit.
```

---

## Hoe te gebruiken

1. Open een nieuwe Claude Code sessie (of gebruik Claude met groot context window)
2. Navigeer naar de awesome-python repository
3. Kopieer het volledige prompt-blok hierboven
4. Plak het als instructie
5. Claude zal alle bestanden lezen, kritisch analyseren, en alle verbeteringen doorvoeren

## Verwachte token-verdeling

| Onderdeel | Geschatte tokens |
|-----------|-----------------|
| sort.py refactor + tests | ~8.000 |
| CSS/UI overhaul | ~6.000 |
| GitHub Actions workflow | ~5.000 |
| mkdocs.yml modernisering | ~3.000 |
| README.md fixes | ~25.000 |
| DX bestanden (.pre-commit, .editorconfig, etc.) | ~5.000 |
| Overige (templates, docs, config) | ~8.000 |
| **Totaal** | **~60.000** |
