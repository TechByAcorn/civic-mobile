import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { App } from "@/@types/app";

const fetchCourses = async (): Promise<App.CourseResponse> => {
  const queryParams = new URLSearchParams({ view: "home" }).toString();
  return await api.get<App.CourseResponse>(`/courses?${queryParams}`);
};

export const useHomeCourses = () => {
  return useQuery<App.CourseResponse>({
    queryKey: ['home-courses'],
    queryFn: () => fetchCourses(),
  });
};
