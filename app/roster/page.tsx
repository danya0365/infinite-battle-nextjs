import { RosterView } from "@/src/presentation/components/roster/RosterView";
import { createServerRosterPresenter } from "@/src/presentation/presenters/roster/RosterPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the roster page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerRosterPresenter();

  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Character Roster - Infinite Battle",
      description: "Explore all available characters in Infinite Battle",
    };
  }
}

/**
 * Roster Page - Server Component for SEO optimization
 * Uses presenter pattern following Clean Architecture
 */
export default async function RosterPage() {
  const presenter = createServerRosterPresenter();

  try {
    // Get view model from presenter
    const viewModel = await presenter.getViewModel();

    return <RosterView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching roster data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-white/60 mb-4">Unable to load character roster</p>
          <Link
            href="/"
            className="main-btn main-btn-primary inline-block"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
