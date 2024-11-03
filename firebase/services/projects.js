import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { getAuth } from "firebase/auth";

export const projectServices = {
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
          const storageRef = ref(
            storage,
            `project-images/${Date.now()}-${image.name}`
          );
          try {
            const uploadResult = await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(uploadResult.ref);
            imageUrls.push(imageUrl);
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            throw {
              status: uploadError.code || "UPLOAD_ERROR",
              message: uploadError.message || "Error uploading image",
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
};
