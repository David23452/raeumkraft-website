import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { findLocation } from '../../core/data/locations';
import { findService, Service } from '../../core/data/services';

@Component({
  selector: 'app-service-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (service(); as s) {
      <h1>{{ headline() }}</h1>
      <p>{{ description() }}</p>
    }
  `,
})
export class ServicePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  // Lernpunkt: toSignal statt route.snapshot — wandelt das paramMap-Observable
  // in ein Signal um. Wichtig, weil Angular diese Komponente beim Navigieren
  // zwischen z.B. .../schrobenhausen und .../freising WIEDERVERWENDET (gleiche
  // Route-Definition), statt sie neu zu erzeugen. Ein einmaliger "Schnappschuss"
  // (snapshot) würde dabei nicht aktualisiert werden — das Signal schon.
  private readonly params = toSignal(this.route.paramMap, { requireSync: true });

  protected readonly service = computed(() => findService(this.params().get('service')));
  protected readonly location = computed(() => findLocation(this.params().get('ort')));

  protected readonly headline = computed(() => {
    const s = this.service();
    const l = this.location();
    if (!s) return '';
    return l ? `${s.name} in ${l.name}` : s.name;
  });

  // Lernpunkt: Textbaustein mit Platzhaltern statt identischem Text je Seite —
  // sonst stuft Google die Seiten als Duplicate/Thin Content ein.
  protected readonly description = computed(() => {
    const s = this.service();
    const l = this.location();
    if (!s) return '';
    return l
      ? `${s.kurzbeschreibung} Wir sind für dich in ${l.name} und Umgebung (${l.landkreis}) im Einsatz.`
      : s.kurzbeschreibung;
  });

  constructor() {
    // Lernpunkt: effect() statt computed() für Title/Meta/Canonical, weil das
    // hier Seiteneffekte sind (DOM/Browser-APIs verändern) — kein abgeleiteter
    // Wert, den man einfach im Template anzeigen würde. computed() ist für
    // reine, seiteneffektfreie Berechnungen gedacht.
    effect(() => {
      const s = this.service();

      if (!s) {
        // Ungültiger Service-Slug in der URL → zurück zur Übersicht.
        this.router.navigate(['/leistungen']);
        return;
      }

      this.titleService.setTitle(`${this.headline()} | Räumkraft`);
      this.meta.updateTag({ name: 'description', content: this.description() });

      const l = this.location();
      const canonicalPath = l ? `leistungen/${s.slug}/${l.slug}` : `leistungen/${s.slug}`;
      this.setCanonicalUrl(`https://raum-kraft.de/${canonicalPath}`);
    });
  }

  // Lernpunkt: Canonical ist ein <link>-Tag im <head>, kein <meta>-Tag —
  // deshalb reicht der Meta-Service hier nicht, wir greifen direkt aufs DOM zu.
  private setCanonicalUrl(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
