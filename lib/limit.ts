import { clerkClient } from "@clerk/nextjs/server";

const DAILY_LIMIT = 50;

/**
 * Checks the user's view count and increments it if within limits.
 * Returns the state to determine UI rendering.
 */
export async function checkAndIncrementLimit(userId: string): Promise<{
    allowed: boolean;
    remaining: number;
    reset: boolean
}> {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const metadata = user.privateMetadata as {
        contactsViewedToday?: number;
        lastReset?: string
    };

    let count = metadata.contactsViewedToday || 0;
    const lastReset = metadata.lastReset;

    let isNewDay = false;

    // Reset if it's a new day
    if (lastReset !== today) {
        count = 0;
        isNewDay = true;
    }

    // Check limit
    if (count >= DAILY_LIMIT) {
        return { allowed: false, remaining: 0, reset: isNewDay };
    }

    // Increment logic
    // In a real app, you might increment by the number of records fetched.
    // Here, we count 1 "View" as 1 credit used for accessing the page/list.
    // Alternatively, if you want to count individual rows displayed:
    const incrementBy = 10; // Assuming we show 10 per page
    const newCount = count + incrementBy;

    // Update Clerk Metadata
    // Note: Clerk has rate limits. In high-traffic apps, use Redis/DB instead of Metadata.
    await client.users.updateUser(userId, {
        privateMetadata: {
            contactsViewedToday: newCount,
            lastReset: today
        }
    });

    return {
        allowed: true,
        remaining: Math.max(0, DAILY_LIMIT - newCount),
        reset: isNewDay
    };
}
