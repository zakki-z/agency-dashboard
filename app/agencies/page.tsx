import { Table } from "@/components/Table";
import { currentUser } from "@clerk/nextjs/server";
import { getAgencies } from "@/lib/data";

// Next.js 15/16 Page Props type
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function AgenciesPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    await currentUser(); // Ensure auth check passes

    const query = (typeof searchParams.q === 'string' ? searchParams.q : '').toLowerCase();

    // Load Real Data
    const agencies = await getAgencies();

    // Filter Logic
    const filteredAgencies = agencies.filter(agency =>
        (agency.name && agency.name.toLowerCase().includes(query)) ||
        (agency.state && agency.state.toLowerCase().includes(query))
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Agencies</h1>
                    <p className="text-sm text-gray-500">Managing {filteredAgencies.length} agencies</p>
                </div>

                <form className="flex gap-2">
                    <input
                        name="q"
                        defaultValue={query}
                        placeholder="Search agencies..."
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border"
                    />
                    <button type="submit" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
                        Search
                    </button>
                </form>
            </div>

            <Table
                data={filteredAgencies}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    {
                        header: 'State',
                        accessor: 'state',
                        render: (row) => (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/10">
                {row.state}
              </span>
                        )
                    },
                    { header: 'Type', accessor: 'type' },
                    {
                        header: 'Population',
                        accessor: 'population',
                        render: (row) => row.population ? Number(row.population).toLocaleString() : '-'
                    },
                    {
                        header: 'Website',
                        accessor: 'website',
                        render: (row) => row.website ? (
                            <a href={row.website} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-900 hover:underline">
                                Visit
                            </a>
                        ) : <span className="text-gray-400">-</span>
                    }
                ]}
            />
        </div>
    );
}
