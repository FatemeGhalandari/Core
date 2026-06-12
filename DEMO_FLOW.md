# Core Demo Flow

Use this flow to show Core as a reusable operations workspace, not just a dashboard.

## 1. Login

Open:

```txt
http://localhost:5173/login
```

Sign in with:

```txt
owner@maplecare.test
Password123!
```

Positioning line:

> Core is a reusable workflow and case management platform. This demo uses a clinic workspace, but the same engine can support real estate, finance, insurance, sales, or local service workflows.

## 2. Main Operations Workspace

Go to the Case Inbox at `/`.

Show:

- Search and filters
- Priority and status signals
- Assigned and unassigned cases
- Open, waiting, overdue, and closed operational work

Positioning line:

> The inbox is the team’s daily command center. It helps operators find the right work, see urgency, and understand ownership quickly.

## 3. Create a Case

Click **New Case**.

Create a realistic case with:

- Title
- Customer details
- Priority
- Intake fields

Submit the form.

Show that required intake fields are enforced.

Positioning line:

> Cases can capture structured intake data, so each workspace can collect the information that matters for its workflow.

## 4. Assign the Case

Open the new case detail page.

In the Ownership panel:

- Assign the case to a team member
- Mention that unassigned work can also be tracked

Positioning line:

> Ownership is explicit. Teams can see who is responsible and where work may be falling through the cracks.

## 5. Change Status

Use the workflow status dropdown.

Move the case from its current status to another active status, such as:

```txt
Waiting on Customer
```

Show the activity timeline after the change.

Positioning line:

> Workflow statuses are configurable, and status changes create an audit trail.

## 6. Add a Comment

Add an internal comment, for example:

```txt
Called customer and confirmed next step. Waiting for missing documentation.
```

Show:

- Comment appears in the Internal Comments panel
- Activity log records the comment event

Positioning line:

> Teams can keep working context directly on the case instead of scattering notes across email or chat.

## 7. Show Customer Record

Click the linked customer name or go to `/customers`.

Show:

- Customer list
- Customer detail page
- Cases linked back to the customer

Positioning line:

> Core keeps customer history connected to operational work, so teams can understand the relationship, not just the individual task.

## 8. Show Reports

Go to `/reports`.

Show:

- Metric cards
- Status counts
- Category counts
- Priority counts
- Owner workload

Positioning line:

> Reports are calculated on the backend, so leaders can see workload, bottlenecks, and operational mix without relying on the first page of inbox data.

## 9. Show Settings Configuration

Go to `/settings`.

Show:

- Workspace profile
- Workflow statuses
- Case categories
- Team members
- Intake fields

Positioning line:

> Settings make Core configurable as a product foundation. The workspace can adapt without rewriting the app for every business type.

## 10. Show Template And Label Customization

In Workspace Profile:

- Change the selected industry template
- Show that app name, case label, and customer label auto-fill
- Explain that the admin can still edit those labels before saving

Do not save if you want to keep the demo workspace unchanged.

Positioning line:

> Templates give each industry a starting point, while labels keep the same underlying engine reusable.

## 11. Show Custom Intake Fields

In Intake Fields:

- Add a simple field, such as `Preferred Contact Time`
- Mark whether it is required
- Choose whether it appears on case detail
- Save it

Then return to New Case and show the field appearing in the form.

Positioning line:

> Intake fields let each workspace define the structured data it needs. A clinic, realty office, finance team, or local business can all collect different information on the same platform.

## Closing Line

> Core is built as a reusable operations engine: cases, customers, workflow, ownership, intake data, reporting, and configuration. The MapleCare demo is one vertical example of a platform that can be adapted across many service businesses.
