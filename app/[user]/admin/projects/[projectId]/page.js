"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectServices } from "@/firebase/services/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetails() {
  const { user, projectId } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const fetchedProject = await projectServices.getProjectById(projectId);
        setProject(fetchedProject);
        setLoading(false);
        preloadImages(fetchedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(
          error.message || "An error occurred while fetching the project."
        );
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  const preloadImages = (project) => {
    const imagesToLoad = [project.featured_image, ...project.gallery_images];
    const imagePromises = imagesToLoad.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-10 mb-4" />
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-32 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="w-1/2">
      <Button
        onClick={() => router.push(`/${user}/admin/projects`)}
        variant="outline"
        className="mb-4"
      >
        Back to Projects
      </Button>
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-slate-900">
            {project.title || "Untitled Project"}
          </CardTitle>
          <CardDescription>
            <Badge>{project.status || "No Status"}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Description
              </h3>
              <p>{project.description || "No description available"}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Client</h3>
              <p>{project.client_name || "No client specified"}</p>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <p>No categories specified</p>
                )}
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
              <p>
                Start Date:{" "}
                {project.start_date
                  ? format(project.start_date, "MMMM d, yyyy")
                  : "Not set"}
              </p>
              <p>
                End Date:{" "}
                {project.end_date
                  ? format(project.end_date, "MMMM d, yyyy")
                  : "Not set"}
              </p>
            </div>
            {project.featured_image && imagesLoaded && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Featured Image
                  </h3>
                  <img
                    src={project.featured_image}
                    alt="Featured project image"
                    className="mt-2 rounded-md max-w-full h-auto"
                  />
                </div>
              </>
            )}
            {project.gallery_images &&
              project.gallery_images.length > 0 &&
              imagesLoaded && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                      {project.gallery_images.map((image, index) => (
                        <div
                          key={index}
                          className="h-32 overflow-hidden rounded-lg"
                        >
                          <img
                            src={image}
                            alt={`Project image ${index + 1}`}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() =>
              router.push(`/${user}/admin/projects/${projectId}/edit`)
            }
          >
            Edit Project
          </Button>
          <Button variant="destructive">Delete Project</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
