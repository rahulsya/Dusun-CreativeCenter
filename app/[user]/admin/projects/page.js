"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { projectServices } from "@/firebase/services/projects";

export default function Projects() {
  const { user } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await projectServices.getAllProjects();
        setProjects(fetchedProjects);
        setLoading(false);
        console.log(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message || "An error occurred while fetching projects.");
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Projects</h1>
      <Button asChild className="mb-6">
        <Link href={`/${user}/admin/projects/new`}>Create New Project</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <img
                src={project.featured_image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardTitle className="text-slate-900">{project.title}</CardTitle>
              <CardDescription>Status: {project.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href={`/${user}/admin/projects/${project.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
