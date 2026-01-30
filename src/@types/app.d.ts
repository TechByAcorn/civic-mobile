import { string } from "zod";

declare namespace App {
  interface Meta {
    timestamp: string;
    requestId: string;
    apiVersion: "v1";
    executionTime: number;
    responseTimeMs: number;
    message: string;
  }

  interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }

  interface Filter {
    // left to set. Jan 29.
    [key: string]: any;
  }

  interface Course {
    id: string;
    title: string;
    description: string;
    image: {
      jpg: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      },
      webp: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      }
    },
    category: string;
    level: string;
    status: string;
    created: number;
    updated: number;
    duration: number;
    difficulty: string;
    enrollmentCount: number;
    rating: number;
    modulesCount: number;
    reviewsCount: number;
    progress: number;
    learningStatus: "not_started"
  }

  interface Section {
    title: string;
    description?: string;
    items: string[];
  }

  interface Sections {
    [key: string]: Section;
  }

  interface CourseResponse {
    meta: Meta;
    data: {
      courses: Course[];
      pagination: Pagination;
      filters?: Filter;
      sections?: Sections;
    };
  }
}

