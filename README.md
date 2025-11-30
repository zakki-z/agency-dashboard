# Agency Dashboard

## 1. Project Overview

The Agency Dashboard is a private web application designed to manage and display data related to government agencies and their associated contacts. The application provides a frontend interface for viewing structured data, which is sourced from local CSV files. It is secured using Clerk for user authentication and built upon the modern Next.js framework.

## 2. Technology Stack

The project is built using a modern, popular web development stack.

| Category | Technology | Version / Description | Source |
|----------|------------|----------------------|---------|
| Framework | Next.js | `16.0.4` (React Framework for Production) | `package.json` |
| Frontend | React | `19.2.0` | `package.json` |
| Styling | Tailwind CSS | Utility-first CSS framework | `package.json` |
| Language | TypeScript | Superset of JavaScript | `package.json` |
| Authentication | Clerk | `@clerk/nextjs` for user management and authentication | `package.json` |
| Data Source | Local Files | Data is read from local `.csv` files using Node.js `fs` module | `lib/data.ts` |

## 3. System Design Flowchart / Diagram

The application follows a standard Next.js architecture, utilizing server-side data fetching to read and parse local CSV files before rendering the dashboard pages. Authentication is handled externally by Clerk.

### Data Flow Summary:

1. **User Access**: The user is authenticated via the Clerk service.
2. **Request**: The Next.js application receives a request (e.g., `/agencies`) from the client.
3. **Data Fetching**: The Next.js server-side logic (e.g., in a Server Component) calls a data utility function, such as `getAgencies()`.
4. **File Read**: The utility function uses the native Node.js `fs` module to read the contents of the specified CSV file (e.g., `data/agencies_agency_rows.csv`) from the local file system.
5. **Parsing**: The raw CSV content is processed by the `parseCSV` helper function, which converts the string data into a structured array of objects (`Agency[]` or `Contact[]`).
6. **Presentation**: The structured data is returned to the Next.js component and rendered to the client using the `Table` component.

## 4. Data Model

The application handles two primary data entities, defined in `lib/types.ts`: Agency and Contact.

### Agency Interface

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the agency. |
| `name` | `string` | The official name of the agency. |
| `state` | `string` | The full state name. |
| `state_code` | `string` | The two-letter state abbreviation. |
| `type` | `string` | The type of agency (e.g., local, state). |
| `population` | `string` | The population served. |
| `website` | `string` | Official website URL. |
| `county` | `string` | Optional field for the county. |

### Contact Interface

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the contact. |
| `first_name` | `string` | Contact's first name. |
| `last_name` | `string` | Contact's last name. |
| `email` | `string` | Contact's email address. |
| `phone` | `string` | Contact's phone number. |
| `title` | `string` | Contact's job title. |
| `department` | `string` | Contact's department. |
| `agency_id` | `string` | Optional ID linking to an Agency. |
| `email_type` | `string` | Optional field for the type of email. |

## 5. Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project requires a Node.js package manager. You can use any of the following:
* `npm`
* `yarn`
* `pnpm`
* `bun`

### Installation and Running Locally

1. **Run the development server**: Choose one of the commands below based on your package manager:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. **Open in Browser**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.

3. **Start Editing**: You can begin modifying the main page by editing `app/page.tsx`. The page will auto-update as you save changes.

## 6. Deployment

This Next.js application  is currently availbale at [link](https://agency-dashboard-p092ruft0-zakariae-azharis-projects.vercel.app)

If you wanna deploy it yourself, the best way is by using the Vercel Platform, the creators of Next.js.

Check the official Next.js deployment documentation for more details: [Next.js deployment documentation](https://nextjs.org/docs/deployment).
