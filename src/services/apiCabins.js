/*eslint-disable*/
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  //   this error handling should be done otherwise it gives error
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // so when we are editing the cabin we encounter an issue that if the new image is uploaded then it will be changed to its original url and the image is not along with the supabase url
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://kgfsbxxanckkqtslfwfv.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2023-12-18T02%3A32%3A16.307Z
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1.create/edit the cabin

  let query = supabase.from("cabins");

  // a)create if there is no id(when there is no edit session)
  if (!id)
    query = query
      // When using the insert method, you need to provide an array of objects, where each object represents a record to be inserted into the specified table. The spread operator is used to create a shallow copy of the newCabin object and then add or override the image property. This is done to ensure that the object structure conforms to the expected format for the database insertion.
      .insert([{ ...newCabin, image: imagePath }]);

  // b)edit
  if (id) {
    // here we need not place this in the form of array
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single(); //select and single here will take the new element from the array
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  // 2.upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3.delete the cabin if there was an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.editId);
    console.error(storageError);
    throw new Error(
      "Cabins could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
