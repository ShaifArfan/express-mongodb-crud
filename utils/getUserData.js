export const getUserData = (doc)  => {
  
  const userData = {
    id: doc._id,
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
  };

  return userData;
}