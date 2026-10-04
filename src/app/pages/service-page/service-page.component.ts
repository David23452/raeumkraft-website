import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LOCATIONS } from '../../core/data/locations';
import { findLocation } from '../../core/data/locations';
import { SERVICES } from '../../core/data/services';
import { findService } from '../../core/data/services';
import { UNTERNEHMEN } from '../../core/data/unternehmen';

@Component({
  selector: 'app-service-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (service(); as s) {
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          <li><a routerLink="/">Startseite</a></li>
          <li><a routerLink="/leistungen">Leistungen</a></li>
          @if (location(); as l) {
            <li><a [routerLink]="['/leistungen', s.slug]">{{ s.name }}</a></li>
            <li><span aria-current="page">{{ l.name }}</span></li>
          } @else {
            <li><span aria-current="page">{{ s.name }}</span></li>
          }
        </ol>
      </nav>

      <main class="service-page">
        <h1>{{ headline() }}</h1>
        <p class="service-page__intro">{{ introText() }}</p>

        <div class="service-page__cta">
          <a class="btn btn--primary" [href]="unternehmen.telefonHref">
            Jetzt anrufen: {{ unternehmen.telefon }}
          </a>
          <a class="btn btn--secondary" routerLink="/kontakt">
            Kostenlos anfragen
          </a>
        </div>

        @if (location(); as l) {
          <section class="service-page__related">
            <h2>{{ s.name }} in anderen Orten</h2>
            <ul>
              @for (loc of otherLocations(); track loc.slug) {
                <li>
                  <a [routerLink]="['/leistungen', s.slug, loc.slug]">
                    {{ s.name }} in {{ loc.name }}
                  </a>
                </li>
              }
            </ul>
          </section>

          <section class="service-page__related">
            <h2>Weitere Leistungen in {{ l.name }}</h2>
            <ul>
              @for (svc of otherServices(); track svc.slug) {
                <li>
                  <a [routerLink]="['/leistungen', svc.slug, l.slug]">
                    {{ svc.name }} in {{ l.name }}
                  </a>
                </li>
              }
            </ul>
          </section>
        } @else {
          <section class="service-page__related">
            <h2>{{ s.name }} in Ihrer Region</h2>
            <ul>
              @for (loc of allLocations; track loc.slug) {
                <li>
                  <a [routerLink]="['/leistungen', s.slug, loc.slug]">
                    {{ s.name }} in {{ loc.name }}
                  </a>
                </li>
              }
            </ul>
          </section>
        }
      </main>
    }
  `,
})
export class ServicePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  protected readonly unternehmen = UNTERNEHMEN;
  protected readonly allLocations = LOCATIONS;

  private readonly params = toSignal(this.route.paramMap, { requireSync: true });

  protected readonly service = computed(() => findService(this.params().get('service')));
  protected readonly location = computed(() => findLocation(this.params().get('ort')));

  protected readonly headline = computed(() => {
    const s = this.service();
    const l = this.location();
    if (!s) return '';
    return l ? `${s.name} in ${l.name}` : s.name;
  });

  protected readonly introText = computed(() => {
    const s = this.service();
    const l = this.location();
    if (!s) return '';
    const ort = l ? (l.note ?? `in ${l.name} und Umgebung (${l.landkreis})`) : 'in Bayern';
    return `Räumkraft übernimmt für Sie die ${s.name} ${ort} – schnell, sauber und zum Festpreis. ${s.kurzbeschreibung}`;
  });

  protected readonly otherLocations = computed(() =>
    LOCATIONS.filter((l) => l.slug !== this.location()?.slug),
  );

  protected readonly otherServices = computed(() =>
    SERVICES.filter((s) => s.slug !== this.service()?.slug),
  );

  constructor() {
    effect(() => {
      const s = this.service();
      const ortParam = this.params().get('ort');

      if (!s) {
        this.router.navigate(['/leistungen']);
        return;
      }

      if (ortParam && !this.location()) {
        this.router.navigate(['/leistungen', s.slug]);
        return;
      }

      this.titleService.setTitle(`${this.headline()} | Räumkraft`);
      this.meta.updateTag({ name: 'description', content: this.introText() });

      const l = this.location();
      const canonicalPath = l ? `leistungen/${s.slug}/${l.slug}` : `leistungen/${s.slug}`;
      this.setCanonicalUrl(`https://raum-kraft.de/${canonicalPath}`);
    });
  }

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
