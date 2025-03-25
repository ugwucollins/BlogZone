import { useEffect } from "react";
import { useParams } from "react-router";

function editById({
  posts,
  editHandle,
  editName,
  seteditName,
  editTitles,
  seteditTitles,
  editBody,
  seteditBody,
}: any) {
  const { _id } = useParams();
  const editPost = posts.find((post: any) => post._id === _id);

  useEffect(() => {
    if (editPost) {
      seteditBody(editPost.body);
      seteditTitles(editPost.titles);
      seteditName(editPost.name);
    } else {
      return { ...editPost };
    }
  }, [editPost, seteditBody, seteditTitles, seteditName]);
  return (
    <section className="m-0 p-0">
      <div className="px-2 max-[300px]:px-0 m-0 bg-white/50 rounded h-[86vh] w-full">
        <div className="mt-2 grid justify-left text-left lg:justify-center lg:text-center relative w-full">
          <div className="w-full mt-10 lg:w-[800px] bg-white h-[80vh] sm:p-3 p-0 rounded-md drop-shadow-2xl shadow-md">
            <h1 className="text-2xl font-semibold mx-1 mb-7 text-left lg:text-center">
              Edit Post
            </h1>
            <div className=" flex gap-2 mt-8 mb-7 mx-2">
              <label htmlFor="Name" className="font-bold text-xl text-black">
                Name:
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => seteditName(e.target.value)}
                name="name"
                className="w-full h-10 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none pl-[6px] text-black"
                placeholder="Name is required"
              />
            </div>

            <div className=" flex gap-2 mt-6 mb-7 mx-2">
              <label
                htmlFor="titles"
                className="font-bold ml-3 text-xl text-black"
              >
                Title:
              </label>
              <input
                type="text"
                value={editTitles}
                onChange={(e) => seteditTitles(e.target.value)}
                name="titles"
                placeholder="title is required"
                className="w-full h-10 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pl-[6px]"
              />
            </div>

            <div className=" flex gap-2 mt-7 mx-2 ">
              <label
                htmlFor="body"
                className="font-bold ml-2 text-xl text-black"
              >
                Body:{" "}
              </label>
              <textarea
                name="body"
                value={editBody}
                onChange={(e) => seteditBody(e.target.value)}
                className="w-full h-64 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pt-2 pl-2"
                placeholder="Your Content is required"
                id="body"
              ></textarea>
            </div>

            <div className="text-center mt-5">
              <button
                onClick={() => editHandle(editPost._id)}
                type="submit"
                className="w-[89%] max-[300px]:w-full max-[300px]:ml-1 ml-10 sm:ml-16 h-12 mb-0 sm:mb-8 mt-1 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg shadow-slate-400 focus:outline-none text-black pt-2 pl-2"
              >
                Edit Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default editById;
