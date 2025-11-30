import { Table } from "@/components/Table";
import UpgradePrompt from "@/components/UpgradePrompt";
import { checkAndIncrementLimit } from "@/lib/limit";
import { auth } from "@clerk/nextjs/server";
import { getContacts } from "@/lib/data";

export default async function ContactsPage() {
    const { userId } = await auth();

    if (!userId) return null;

    // Check Limit Logic
    const { allowed, remaining } = await checkAndIncrementLimit(userId);

    if (!allowed) {
        return <UpgradePrompt />;
    }

    // Load Real Data
    const contacts = await getContacts();

    // Slice data to simulate viewing a subset
    const dataToShow = contacts.slice(0, 10);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contacts</h1>
                    <p className="text-sm text-gray-500">
                        Daily limit remaining: <span className="font-semibold text-indigo-600">{remaining}</span> views
                    </p>
                </div>
            </div>

            <Table
                data={dataToShow}
                columns={[
                    {
                        header: 'Name',
                        accessor: 'first_name',
                        render: (row) => <span className="font-medium text-gray-900">{row.first_name} {row.last_name}</span>
                    },
                    { header: 'Title', accessor: 'title' },
                    {
                        header: 'Department',
                        accessor: 'department',
                        render: (row) => (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {row.department}
              </span>
                        )
                    },
                    { header: 'Email', accessor: 'email' },
                    { header: 'Phone', accessor: 'phone' },
                ]}
            />

            <p className="text-xs text-center text-gray-400 mt-4">
                Showing top results. Viewing this page consumes your daily allowance.
            </p>
        </div>
    );
}
