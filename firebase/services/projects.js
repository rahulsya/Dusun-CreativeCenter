import {
  collection,
  getDocs,
  doc,
  addDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { supabase } from "@/lib/supabase/config";

export const projectServices = {
  async uploadImage(file) {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `project-images/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error("Failed to get public URL");
      }

      try {
        const response = await fetch(publicUrl, { method: "HEAD" });
        if (!response.ok) {
          throw new Error(`URL not accessible: ${response.status}`);
        }
      } catch (error) {
        console.error("URL verification failed:", error);
        throw error;
      }

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw {
        status: "UPLOAD_ERROR",
        message: error.message || "Error uploading image",
      };
    }
  },

  async createProject(project) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw {
        status: "AUTH_ERROR",
        message: "User must be authenticated to create a project",
      };
    }

    try {
      const imageUrls = [];
      if (project.images && project.images.length > 0) {
        for (const image of project.images) {
          try {
            const publicUrl = await this.uploadImage(image);
            if (publicUrl) {
              imageUrls.push(publicUrl);
            }
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            throw {
              status: "UPLOAD_ERROR",
              message: `Failed to upload image ${image.name}: ${uploadError.message}`,
            };
          }
        }
      }

      const projectData = {
        title: project.title || "",
        description: project.description || "",
        client_name: project.client_name || "",
        status: project.status || "draft",
        featured_image: imageUrls[0] || null,
        gallery_images: imageUrls,
        technologies: project.technologies || [],
        userId: user.uid,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
        start_date: project.start_date
          ? Timestamp.fromDate(project.start_date)
          : null,
        end_date: project.end_date
          ? Timestamp.fromDate(project.end_date)
          : null,
      };

      let retries = 3;
      while (retries > 0) {
        try {
          const projectRef = await addDoc(
            collection(db, "projects"),
            projectData
          );

          return {
            id: projectRef.id,
            ...projectData,
            start_date: projectData.start_date?.toDate(),
            end_date: projectData.end_date?.toDate(),
            created_at: projectData.created_at.toDate(),
            updated_at: projectData.updated_at.toDate(),
          };
        } catch (firestoreError) {
          console.error(
            `Firestore write error (retries left: ${retries}):`,
            firestoreError
          );
          retries--;
          if (retries === 0) {
            throw firestoreError;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error("Error creating project:", error);
      throw {
        status: error.code || "CREATE_ERROR",
        message: error.message || "Error creating project",
      };
    }
  },

  async getAllProjects() {
    try {
      let retries = 3;
      while (retries > 0) {
        try {
          const querySnapshot = await getDocs(collection(db, "projects"));
          return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              start_date: data.start_date?.toDate(),
              end_date: data.end_date?.toDate(),
              created_at: data.created_at?.toDate(),
              updated_at: data.updated_at?.toDate(),
            };
          });
        } catch (firestoreError) {
          console.error(
            `Firestore read error (retries left: ${retries}):`,
            firestoreError
          );
          retries--;
          if (retries === 0) {
            throw firestoreError;
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      console.error("Error getting projects:", error);
      throw {
        status: error.code || "FETCH_ERROR",
        message: error.message || "Error fetching projects",
      };
    }
  },

  async getProjectById(projectId) {
    try {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Project not found");
      }

      const data = docSnap.data();

      const toDateSafe = (dateField) =>
        dateField?.toDate ? dateField.toDate() : null;

      const projectData = {
        id: docSnap.id,
        ...data,
        start_date: toDateSafe(data.start_date),
        end_date: toDateSafe(data.end_date),
        created_at: toDateSafe(data.created_at),
        updated_at: toDateSafe(data.updated_at),
        technologies: Array.isArray(data.technologies) ? data.technologies : [],
      };

      return projectData;
    } catch (error) {
      console.error("Error getting project:", error);

      if (error.code === "not-found") {
        throw { status: "NOT_FOUND", message: "Project not found" };
      }

      throw {
        status: "FETCH_ERROR",
        message: error.message || "Error fetching project",
      };
    }
  },
};
