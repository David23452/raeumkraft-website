
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

# Räumkraft – Firmenwebsite

## Unternehmen
- Name: Raumkraft (Entrümpelung / Haushaltsauflösung)
- Inhaber: David Goldmann
- Adresse: Mitterndorferweg 3, 85304 Ilmmünster
- Telefon: +49 176 73225728 | E-Mail: kontakt@raum-kraft.de
- Einsatzgebiet: Landkreis Pfaffenhofen (60 km), außerdem Freising, Ingolstadt,
  Dachau, Neuburg-Schrobenhausen, Eichstätt, Aichach-Friedberg, Kelheim

## Ziel
Professionelle Website zur Lead-Generierung (Anfragen per Telefon/Formular).
Lokales SEO hat höchste Priorität.

## Technik
- Aktuelles Angular, Standalone Components, Signals
- Prerendering (statische Ausgabe) für SEO
- SCSS, keine schweren UI-Bibliotheken
- Mobile first, Barrierearm, schnelle Ladezeiten
- Jede Seite: eigener Title, Meta-Description, Canonical, strukturierte Daten
  (LocalBusiness-Schema auf der Startseite)
- Nur Deutsch

## Seitenstruktur
/ (Startseite)
/leistungen (Übersicht aller Leistungen)
/leistungen/:service (Service-Landingpage ohne Ort, z.B. /leistungen/garagenentruempelung)
/leistungen/:service/:ort (Service + Standort kombiniert für lokales SEO,
  z.B. /leistungen/garagenentruempelung/pfaffenhofen-an-der-ilm)
/ueber-uns
/kontakt
/impressum, /datenschutz

## Lokales SEO: Service × Standort-Seiten
- Zwei Datenquellen als Single Source of Truth: `services.ts` (Slug, Name,
  Kurzbeschreibung) und `locations.ts` (Slug, Name, Landkreis/Entfernung)
- Routing: `leistungen/:service` als Parent-Route, `leistungen/:service/:ort`
  als Kind-Route (Ort-Parameter optional) — statische Routen wie `leistungen`
  müssen in der Routen-Liste vor den dynamischen Mustern stehen
- Eine wiederverwendbare Komponente für beide Fälle (mit/ohne Ort); Service-
  und Ort-Parameter per `input()` aus dem Router oder per `toSignal(route.paramMap)`
  als Signal abonnieren (nicht nur `snapshot`, da Angular die Komponente bei
  reinem Parameterwechsel zwischen Geschwister-Routen wiederverwendet);
  Headline/Title/Meta-Description als `computed()` aus Service- und Ort-Signal
  ableiten
- Title, Meta-Description und Canonical-URL dynamisch je Kombination setzen
  (`Title`- und `Meta`-Service)
- Content-Textbausteine mit Platzhaltern statt identischem Text je Seite
  verwenden, um Duplicate-/Thin-Content-Probleme zu vermeiden
- Alle Service×Ort-Kombinationen beim Build vorab prerendern (Angular
  Prerendering/SSG), nicht rein clientseitig rendern
- `sitemap.xml` aus den zwei Datenquellen automatisch generieren (Build-Script)
- Interne Verlinkung auf jeder Seite: "diese Leistung in anderen Orten" +
  "andere Leistungen in diesem Ort" + Breadcrumbs
- Ungültige Service-/Ort-Slugs (kein Treffer in den Datenquellen) → Redirect
  auf die generische Service-Seite oder 404

## Arbeitsweise
- Vor größeren Änderungen kurz den Plan nennen
- Nach jedem Schritt `ng build` ausführen und Fehler beheben
