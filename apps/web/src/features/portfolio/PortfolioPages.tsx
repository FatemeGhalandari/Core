import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { setDemoOrganizationSlug } from "../../lib/api";

type AccentStyle = CSSProperties & {
  "--accent": string;
};

type PortfolioDemo = {
  key: string;
  name: string;
  title: string;
  subtitle: string;
  slug: string;
  loginEmail: string;
  accent: string;
  caseLabel: string;
  customerLabel: string;
  workflows: string[];
  intakeFields: string[];
  proofPoints: string[];
};

const demos: PortfolioDemo[] = [
  {
    key: "clinic",
    name: "Core Clinic",
    title: "Patient intake and appointment requests without clinic-only code.",
    subtitle:
      "A healthcare-flavored demo showing triage, scheduling, records requests, and patient follow-up on the same reusable case engine.",
    slug: "maplecare-clinic",
    loginEmail: "owner@maplecare.test",
    accent: "#2563eb",
    caseLabel: "Request",
    customerLabel: "Patient",
    workflows: ["New", "Triage", "Scheduled", "Waiting on Patient", "Closed"],
    intakeFields: [
      "Reason for request",
      "Preferred date",
      "Preferred time",
      "Coverage provider",
    ],
    proofPoints: [
      "Role-aware settings for owners and admins",
      "Patient records linked to every request",
      "Activity history for comments, assignments, and status changes",
    ],
  },
  {
    key: "realty",
    name: "Core Realty",
    title: "Property inquiries, buyer leads, and viewings in one workflow.",
    subtitle:
      "A real estate demo that adapts Core around clients, inquiries, viewing requests, and deal-stage follow-up.",
    slug: "summit-realty",
    loginEmail: "owner@summit-realty.test",
    accent: "#0f766e",
    caseLabel: "Inquiry",
    customerLabel: "Client",
    workflows: ["New Lead", "Qualified", "Viewing Scheduled", "Offer", "Closed"],
    intakeFields: [
      "Property type",
      "Budget range",
      "Preferred area",
      "Timeline",
    ],
    proofPoints: [
      "Buyer and seller categories out of the box",
      "Intake fields for location, budget, and timing",
      "Demo mode switches the whole workspace context",
    ],
  },
  {
    key: "finance",
    name: "Core Finance",
    title: "Applications, disputes, and document reviews with clear ownership.",
    subtitle:
      "A finance demo for teams handling customer applications, transaction issues, and review queues.",
    slug: "northstar-finance",
    loginEmail: "owner@northstar-finance.test",
    accent: "#7c3aed",
    caseLabel: "Application",
    customerLabel: "Customer",
    workflows: ["Submitted", "Under Review", "Needs Information", "Approved"],
    intakeFields: [
      "Application type",
      "Requested amount",
      "Income range",
      "Supporting details",
    ],
    proofPoints: [
      "Reports surface bottlenecks and status volume",
      "Configurable categories keep review queues generic",
      "Customers, cases, comments, and intake data share one model",
    ],
  },
];

const coreHighlights = [
  "Reusable case workflow engine",
  "Configurable labels, statuses, categories, and intake fields",
  "Customer records tied to operational work",
  "Reports, assignments, comments, and activity history",
];

function setDemoMode(slug: string) {
  setDemoOrganizationSlug(slug);
}

function ProductVisual({ demo }: { demo?: PortfolioDemo }) {
  const accent = demo?.accent ?? "#111827";
  const rows = demo?.workflows ?? ["New", "In Progress", "Waiting", "Closed"];
  const accentStyle: AccentStyle = { "--accent": accent };

  return (
    <div className="portfolio-product-visual" style={accentStyle}>
      <div className="portfolio-visual-topbar">
        <span />
        <span />
        <span />
      </div>

      <div className="portfolio-visual-shell">
        <div className="portfolio-visual-sidebar">
          <strong>{demo?.name ?? "Core"}</strong>
          <span>Dashboard</span>
          <span>{demo?.caseLabel ?? "Cases"}</span>
          <span>{demo?.customerLabel ?? "Customers"}</span>
          <span>Reports</span>
        </div>

        <div className="portfolio-visual-main">
          <div className="portfolio-visual-header">
            <div>
              <span>Active workflow</span>
              <strong>{demo?.caseLabel ?? "Case"} Inbox</strong>
            </div>
            <small>{demo?.customerLabel ?? "Customer"} context</small>
          </div>

          <div className="portfolio-visual-grid">
            {rows.slice(0, 4).map((status, index) => (
              <div className="portfolio-visual-row" key={status}>
                <span>{status}</span>
                <strong>{index + 4}</strong>
              </div>
            ))}
          </div>

          <div className="portfolio-visual-detail">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioNav() {
  return (
    <nav className="portfolio-nav" aria-label="Portfolio demos">
      <Link to="/portfolio">Core</Link>
      <Link to="/demo/clinic">Clinic</Link>
      <Link to="/demo/realty">Realty</Link>
      <Link to="/demo/finance">Finance</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export function CoreLandingPage() {
  return (
    <main className="portfolio-page">
      <PortfolioNav />

      <section className="portfolio-hero">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">Core Workflow Platform</p>
          <h1>One reusable case engine for many vertical SaaS demos.</h1>
          <p>
            Core is a portfolio-ready workflow product built around cases,
            customers, intake data, statuses, assignments, and reporting. The
            same product can present as clinic, realty, finance, and more.
          </p>

          <div className="portfolio-actions">
            <Link className="primary-button" to="/demo/clinic">
              View demo pages
            </Link>
            <Link className="secondary-button" to="/login">
              Open app login
            </Link>
          </div>
        </div>

        <ProductVisual />
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-header">
          <p className="eyebrow">Product Shape</p>
          <h2>Generic foundation, vertical presentation.</h2>
        </div>

        <div className="portfolio-highlight-grid">
          {coreHighlights.map((highlight) => (
            <div className="portfolio-card" key={highlight}>
              <strong>{highlight}</strong>
              <p>
                Built as reusable workflow infrastructure instead of a
                single-industry dashboard.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-header">
          <p className="eyebrow">Vertical Demos</p>
          <h2>Pick the story you want to show.</h2>
        </div>

        <div className="portfolio-demo-grid">
          {demos.map((demo) => (
            <Link
              className="portfolio-demo-card"
              key={demo.key}
              style={{ "--accent": demo.accent } as AccentStyle}
              to={`/demo/${demo.key}`}
            >
              <span>{demo.name}</span>
              <strong>{demo.caseLabel} workflow</strong>
              <p>{demo.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function VerticalDemoPage({ demoKey }: { demoKey: string }) {
  const demo = demos.find((option) => option.key === demoKey) ?? demos[0];

  return (
    <main className="portfolio-page">
      <PortfolioNav />

      <section className="portfolio-hero portfolio-vertical-hero">
        <div className="portfolio-hero-copy">
          <p className="eyebrow">{demo.name} Demo</p>
          <h1>{demo.title}</h1>
          <p>{demo.subtitle}</p>

          <div className="portfolio-actions">
            <Link
              className="primary-button"
              to="/login"
              onClick={() => setDemoMode(demo.slug)}
            >
              Set demo mode
            </Link>
            <Link className="secondary-button" to="/portfolio">
              Back to Core
            </Link>
          </div>

          <p className="portfolio-login-note">
            Suggested login: {demo.loginEmail} / Password123!
          </p>
        </div>

        <ProductVisual demo={demo} />
      </section>

      <section className="portfolio-section portfolio-two-column">
        <div>
          <p className="eyebrow">Workflow</p>
          <h2>{demo.caseLabel} pipeline</h2>
          <div className="portfolio-chip-list">
            {demo.workflows.map((workflow) => (
              <span key={workflow}>{workflow}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Intake</p>
          <h2>{demo.customerLabel} context</h2>
          <div className="portfolio-chip-list">
            {demo.intakeFields.map((field) => (
              <span key={field}>{field}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-section-header">
          <p className="eyebrow">Why it matters</p>
          <h2>Vertical language, shared product core.</h2>
        </div>

        <div className="portfolio-highlight-grid">
          {demo.proofPoints.map((point) => (
            <div className="portfolio-card" key={point}>
              <strong>{point}</strong>
              <p>
                This is configured through Core workspace setup and seed data,
                not a separate cloned application.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
