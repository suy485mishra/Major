import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTemplates } from "../api";

const useTemplates = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "templates",
        async () => {
            try {
                const templates = await getTemplates();
                return templates; // Return the data to the React Query hook
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
                throw new Error("Error fetching templates"); // Throw the error to let React Query handle it
            }
        },
        { refetchOnWindowFocus: false }
    );

    return {
        data,
        isError,
        isLoading,
        refetch,
    };
};

export default useTemplates;
