import Link from 'next/link';

export default function UpgradePrompt() {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg border border-gray-200 shadow-sm max-w-2xl mx-auto mt-10">
            <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Limit Reached</h3>
            <p className="text-gray-500 mb-6 max-w-md">
                You have viewed your daily allowance of contacts. Please upgrade your plan to unlock unlimited access or return tomorrow.
            </p>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium">
                Upgrade to Pro
            </button>
        </div>
    );
}
