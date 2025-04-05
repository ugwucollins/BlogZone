import { Routes, Route } from "react-router";
import Home from "./component/Home/Home";
import Posts from "./component/Posts/Posts";
import NotFound from "./component/Not-Found";
import Login from "./component/auth/Login/Login";
import SignUp from "./component/auth/SignUp/SignUp";
import UsersContextProvider from "./content/usersContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./component/auth/PrivateRoute";
import Dashboard from "./component/Home/Dashboard/Dashboard";
import UserProfile from "./component/UserProfile/UserProfile";
import EditUserProfile from "./component/Home/Dashboard/EditUserProfile";
import PostContent from "./component/Posts/PostBody/PostContent";
import { PostsContext } from "./component/Posts/postsContext";
import { CommentContext } from "./component/Posts/comment/CommentContext";
import { createContext, useContext, useState } from "react";
import About from "./component/About/About";
import AdminDashboard from "./component/Admin/Home/Dashboard";
import UsersPage from "./component/Admin/Users/UsersPage";
import { AdminUrl } from "./content/Types";
import UsersDetails from "./component/Admin/Users/UsersDetails";
import Bloggers from "./component/Admin/Bloggers/Bloggers";
import AllPosts from "./component/Admin/Posts/AllPosts";
import PostContentA from "./component/Admin/Posts/PostContent";
import CreatePost from "./component/Admin/Posts/CreatePost";
import BloggersDetails from "./component/Admin/Bloggers/BloggersDetails";
import Layout from "./Layout";
import UserAdminContext from "./component/Admin/AdminContext/UserAdminContext";
import AdminDetails from "./component/Admin/Home/AdminDetails";
import PostIDDetails from "./component/Admin/Posts/PostDetails/PostIDDetails";

const localMode: any = localStorage.getItem("theme");
export const themeContext = createContext(localMode);
const App = () => {
  const getheme = JSON.parse(localMode);
  const [darkMode, setdarkMode] = useState(getheme || false);

  localStorage.setItem("theme", JSON.stringify(darkMode));
  const themeControl = () => {
    // window.print();
    setdarkMode(!darkMode);
  };

  return (
    <>
      <themeContext.Provider value={{ darkMode, themeControl }}>
        <UserAdminContext>
          <PostsContext>
            <CommentContext>
              <UsersContextProvider>
                <div
                  className={`${darkMode && "dark"}
             `}
                >
                  <main className="sm:px-2 px-2 py-3 pb-4 dark:bg-black/85 bg-white">
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />

                        <Route element={<PrivateRoute />}>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route
                            path="/UserProfile"
                            element={<UserProfile />}
                          />
                          <Route
                            path="/UserProfile/EditUserProfile"
                            element={<EditUserProfile />}
                          />
                        </Route>
                        <Route element={<PrivateRoute />}>
                          {/* Admin section */}
                          <Route path={AdminUrl} element={<AdminDashboard />} />
                          <Route
                            path={`${AdminUrl}/users`}
                            element={<UsersPage />}
                          />
                          <Route
                            path={`${AdminUrl}/bloggers`}
                            element={<Bloggers />}
                          />
                          <Route
                            path={`${AdminUrl}/posts`}
                            element={<AllPosts />}
                          />
                          <Route
                            path={`${AdminUrl}/admindeatils`}
                            element={<AdminDetails />}
                          />
                          <Route
                            path={`${AdminUrl}/posts/postcontent/:_id`}
                            element={<PostContentA />}
                          />

                          <Route
                            path={`${AdminUrl}/users/userdetailS/:_id`}
                            element={<UsersDetails />}
                          />
                          <Route
                            path={`${AdminUrl}/users/posts/:_id`}
                            element={<PostIDDetails />}
                          />
                          <Route
                            path={`${AdminUrl}/bloggers/bloggersdetails/:_id`}
                            element={<BloggersDetails />}
                          />
                        </Route>

                        <Route path="/posts" element={<Posts />} />
                        <Route path="/posts/:search" element={<Posts />} />

                        <Route
                          path="/PostContent/:_id"
                          element={<PostContent />}
                        />
                        <Route
                          path={`${AdminUrl}/posts/createPost`}
                          element={<CreatePost />}
                        />

                        <Route path="/about" element={<About />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/signUp" element={<SignUp />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                    <ToastContainer />
                  </main>
                </div>
              </UsersContextProvider>
            </CommentContext>
          </PostsContext>
        </UserAdminContext>
      </themeContext.Provider>
    </>
  );
};

export default App;
export const Getheme = () => {
  return useContext(themeContext);
};

// ///React routes and Imports
// import { Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FormEvent } from "react";

// ///React component
// import Navbar from "./component/navbar";
// import Create from "./component/create";
// import Blog from "./component/blog";
// import Edit from "./component/edit";
// import Api from "./Axios/Api";
// import EditById from "./component/editById";

// export default function App() {
//   const locate = useNavigate();
//   // All the Posts
//   const [posts, setposts] = useState([]);
//   const [searchResult, setsearchResult] = useState([]);

//   // errors and loading
//   const [err, seterr] = useState<any>();
//   const [loading, setloading] = useState(true);
//   const [search, setsearch] = useState("");

//   // // Create useState
//   const [name, setname] = useState("");
//   const [titles, settitles] = useState("");
//   const [body, setbody] = useState("");

//   // // Edit useState
//   const [editName, seteditName] = useState("");
//   const [editTitles, seteditTitles] = useState("");
//   const [editBody, seteditBody] = useState("");

//   const [inputErrors, setinputErrors] = useState({
//     name: "",
//     titles: "",
//     body: "",
//   });

//   useEffect(() => {
//     const FetchApi = async () => {
//       try {
//         setloading(true);
//         const res = await Api.get("/users");
//         const data = res.data;
//         console.log(data.users);
//         setposts(data.users);
//       } catch (error: unknown) {
//         seterr(error);
//       }finally{
//         setloading(false);
//       }
//     };

//     setTimeout(() => {
//       FetchApi();
//       setloading(false);
//     }, 1500);
//   }, []);

//   // const TextsNum = (strngPosts:any, num: any) => {
//   //   if (strngPosts.length >= num) {
//   //     return strngPosts.slice(0, num) + "...";
//   //   } else {
//   //     return strngPosts;
//   //   }
//   // };

//   const submitHandle = async (e: FormEvent<HTMLFormElement> | any) => {
//     e.preventDefault();

//     let errors = {
//       name: "",
//       titles: "",
//       body: "",
//     };

//     const now = Date.now();
//     const date = new Intl.DateTimeFormat("en-us", { dateStyle: "full" }).format(
//       now
//     );
//     const creatListPost = {
//       date: date,
//       name,
//       titles,
//       body,
//     };

//     // const myPost: any = [...posts, creatListPost];
//     //setposts(myPost);

//     // For Api

//     try {
//       if (creatListPost.name === "") {
//         errors.name = " UserName is Required";
//       } else if (creatListPost.name.length <= 4) {
//         errors.name = "UserName most be more than 5 characters";
//       } else if (creatListPost.titles === "") {
//         errors.titles = "Title Is Required";
//       } else if (creatListPost.titles.length <= 9) {
//         errors.titles = "Title most be more than 10 characters";
//       } else if (creatListPost.body === "") {
//         errors.body = "Your  body content is required";
//       } else if (creatListPost.body.length <= 29) {
//         errors.body = "your content most be more than 30 characters";
//       } else {
//         const response = await Api.post("/users", creatListPost);
//         const myPost: any = [...posts, response.data];
//         setposts(myPost);
//         console.log(posts);
//         setname("");
//         settitles("");
//         setbody("");
//         locate("/");
//         window.location.reload();
//       }
//     } catch (error: any) {
//       seterr(error.message);
//     }
//     setinputErrors({ ...errors });
//   };

//   const deleteHandle = async (_id: any) => {
//     try {
//       await Api.delete(`/users/${_id}`);
//       const deletes = posts.filter((post: any) => post._id !== _id);
//       setposts(deletes);
//       locate("/");
//     } catch (error: any) {
//       seterr(error.message);
//     }
//   };

//   const editHandle = async (_id: any) => {
//     const now = Date.now();
//     const updatedDate = new Intl.DateTimeFormat("en-us", {
//       dateStyle: "full",
//     }).format(now);

//     const editListPost = {
//       _id,
//       updatedDate: updatedDate,
//       name: editName,
//       titles: editTitles,
//       body: editBody,
//     };

//     // const checks: any = posts.map((post: any) =>
//     //   post._id === _id ? { ...editListPost } : post
//     // );
//     // setposts(checks);
//     // locate("/");

//     //for Api

//     try {
//       const response = await Api.put(`/users/${_id}`, editListPost);
//       if (response) {
//         const checks: any = posts.map((post: any) =>
//           post._id === _id ? { ...response.data } : post
//         );
//         setposts(checks);
//         locate("/");
//         window.location.reload();
//       } else {
//         seterr({ message: "Post Id Not Found" });
//       }
//     } catch (error: any) {
//       seterr(error.message);
//     }
//   };

//   useEffect(() => {
//     const filterPosts = posts.filter(
//       (post: any) =>
//         post.name.toLowerCase().includes(search.toLowerCase()) ||
//         post.titles.toLowerCase().includes(search.toLowerCase())
//     );
//     console.log(filterPosts);

//     setsearchResult(filterPosts.reverse());
//   }, [posts,search]);

//   return (
//     <>
//       <Navbar search={search} setsearch={setsearch} />
//       <main className="p-3 max-[300px]:p-0 bg-slate-300/50 min-h-max overflow-hidden">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Blog
//                 posts={searchResult}
//                 err={err}
//                 loading={loading}
//               />
//             }
//           />
//           <Route
//             path="/:_id"
//             element={<Edit posts={posts} deleteHandle={deleteHandle} />}
//           />
//           <Route
//             path="/editById/:_id"
//             element={
//               <EditById
//                 editHandle={editHandle}
//                 editName={editName}
//                 seteditName={seteditName}
//                 editTitles={editTitles}
//                 seteditTitles={seteditTitles}
//                 editBody={editBody}
//                 seteditBody={seteditBody}
//                 posts={posts}
//               />
//             }
//           />
//           <Route
//             path="/create"
//             element={
//               <Create
//                 name={name}
//                 setname={setname}
//                 titles={titles}
//                 settitles={settitles}
//                 inputErrors={inputErrors}
//                 body={body}
//                 setbody={setbody}
//                 submitHandle={submitHandle}
//               />
//             }
//           />
//         </Routes>
//       </main>
//     </>
//   );
// }
