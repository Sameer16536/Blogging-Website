import AppBar from "./AppBar"
import Skeleton from "./ui/Skeleton";

export const BlogSkeleton = () => {
    return (
        <div>
            <AppBar />
            <div role="status" className="animate-pulse">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </div>
    );
}