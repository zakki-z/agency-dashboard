import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl">
          Welcome back, {user?.firstName}
        </h1>
        <p className="mt-6 text-lg leading-8 dark:text-gray-400">
          Select a module to get started.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
              href="/agencies"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View Agencies
          </Link>
          <Link href="/contacts" className="text-sm font-semibold leading-6 text-white-900">
            View Contacts <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
  );
}
