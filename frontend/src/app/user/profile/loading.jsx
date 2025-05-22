// This is a server component that acts as a loading state
// for the profile page - will help with perceived performance
export default function Loading() {
    return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
            <div className="text-center">
                <div className="text-teal-400 text-xl font-semibold">Loading profile...</div>
            </div>
        </div>
    );
}
