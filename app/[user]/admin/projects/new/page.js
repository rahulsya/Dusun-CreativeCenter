"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "@/hooks/use-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { projectServices } from "@/firebase/services/projects";
import { X } from "lucide-react";

const initialValues = {
  title: "",
  description: "",
  client_name: "",
  technologies: [],
  status: "draft",
  date: { from: null, to: null },
  images: [],
};

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Project title is required";
  } else if (values.title.length < 2) {
    errors.title = "Project title must be at least 2 characters";
  }

  if (!values.description) {
    errors.description = "Description is required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!values.date?.from || !values.date?.to) {
    errors.date = "Both start and end dates are required";
  }

  if (!values.images.length) {
    errors.images = "At least one image is required";
  }

  if (!values.client_name) {
    errors.client_name = "Client name is required";
  }

  return errors;
};

export default function NewProject() {
  const router = useRouter();
  const { user } = useParams();

  const onSubmit = async (values) => {
    try {
      const projectData = {
        title: values.title,
        description: values.description,
        client_name: values.client_name,
        status: values.status,
        images: values.images,
        technologies: values.technologies,
        start_date: values.date.from,
        end_date: values.date.to,
      };

      const result = await projectServices.createProject(projectData);
      console.log("Project created:", result);
      router.push(`/${user}/admin/projects`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    onSubmit,
    validate,
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setValues((prevValues) => ({
      ...prevValues,
      images: [...prevValues.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      images: prevValues.images.filter((_, i) => i !== index),
    }));
  };

  const handleDateChange = (newDate) => {
    setValues((prevValues) => ({
      ...prevValues,
      date: newDate,
    }));
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(",").map((tech) => tech.trim());
    setValues((prevValues) => ({
      ...prevValues,
      technologies,
    }));
  };

  return (
    <div className="w-full flex flex-row gap-4 h-[calc(100vh-100px)]">
      <Card className="shadow-none w-1/2 ">
        <CardHeader>
          <CardTitle className="text-slate-900">Create New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter project title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                name="client_name"
                placeholder="Enter client name"
                value={values.client_name}
                onChange={handleChange}
              />
              {errors.client_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.client_name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter project description"
                value={values.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="technologies">
                Technologies (comma-separated)
              </Label>
              <Input
                id="technologies"
                name="technologies"
                placeholder="React, NextJS, Firebase"
                value={values.technologies.join(", ")}
                onChange={handleTechnologiesChange}
              />
            </div>

            <div>
              <Label htmlFor="date">Date Range</Label>
              <div className="mt-1">
                <DatePicker date={values.date} setDate={handleDateChange} />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="images">Project Images</Label>
              <div className="mt-1">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
              </div>
            </div>

            <Button className="mt-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="shadow-none w-1/2 overflow-y-scroll ">
        <CardHeader className="sticky top-0 z-10 bg-white">
          <CardTitle className="text-slate-900">File Previews</CardTitle>
        </CardHeader>
        <CardContent className="z-0">
          {values.images.length > 0 && (
            <div className=" grid grid-cols-2 gap-4">
              {values.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Project image ${index + 1}`}
                    className={`w-full h-48 object-contain rounded-md ${
                      index === 0 ? "border-2 border-blue-500" : ""
                    }`}
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
