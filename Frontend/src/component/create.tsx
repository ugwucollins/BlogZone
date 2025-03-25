function Create({
  name,
  setname,
  titles,
  settitles,
  body,
  setbody,
  submitHandle,
  inputErrors,
}: any) {
  return (
    <section className="m-0 p-0 overflow-hidden">
      <form
        onSubmit={submitHandle}
        className="px-2 max-[300px]:px-0 m-0 bg-white/50rounded h-[89vh] w-full"
      >
        <div className="mt-2 grid justify-left text-left lg:justify-center lg:text-center relative w-full">
          <div className="w-full lg:w-[800px] bg-white h-[85vh] sm:p-3 p-0 rounded-md drop-shadow-2xl shadow-md">
            <h1 className="text-2xl font-semibold mx-1 mb-7 text-left lg:text-center">
              Create A Post
            </h1>
            <div className="flex flex-col transition gap-2 mb-1 mt-4 mx-2">
              <div className=" flex gap-2 mt-4 mx-2">
                <label htmlFor="Name" className="font-bold text-xl text-black">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  name="name"
                  className="w-full h-10 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none pl-[6px] text-black"
                  placeholder="Name is required"
                />
              </div>
              <span className="mb-0 text-left w-auto text-red-700 capitalize font-medium ml-20">
                {inputErrors.name}
              </span>
            </div>

            <div className="flex flex-col transition gap-2 mb-3 mt-1 mx-2">
              <div className=" flex gap-2 mt-4 mx-2">
                <label
                  htmlFor="titles"
                  className="font-bold ml-3 text-xl text-black"
                >
                  Title:{" "}
                </label>
                <input
                  type="text"
                  value={titles}
                  onChange={(e) => settitles(e.target.value)}
                  name="titles"
                  placeholder="title is required"
                  className="w-full h-10 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pl-[6px]"
                />
              </div>
              <span className="mb-0 text-left w-auto text-red-700 capitalize ml-20 font-medium ">
                {inputErrors.titles}
              </span>
            </div>

            <div className="flex flex-col gap-2 transition mb-5 mt-1 mx-2">
              <div className=" flex gap-2 mt-4 mx-2">
                <label
                  htmlFor="body"
                  className="font-bold ml-2 text-xl text-black"
                >
                  Body:{" "}
                </label>
                <textarea
                  name="body"
                  value={body}
                  className="w-full h-64 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pt-2 pl-2"
                  onChange={(e) => setbody(e.target.value)}
                  placeholder="Your Content is required"
                  id="body"
                ></textarea>
              </div>
              <span className="mb-0 text-left w-auto text-red-700 capitalize font-medium ml-20">
                {inputErrors.body}
              </span>
            </div>

            <div className="text-center">
              <button
                onClick={submitHandle}
                type="submit"
                className="w-[89%] max-[300px]:w-full max-[300px]:ml-1 ml-10 sm:ml-16 h-12 sm:mb-8 mt-1 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg mb-0 shadow-slate-400 focus:outline-none text-black pt-2 pl-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Create;

{
  /* <div className="flex gap-2 mb-8 mx-2">
              <label
                htmlFor="titles"
                className="font-bold ml-3 text-xl text-black"
              >
                Title:{" "}
              </label>
              <input
                type="text"
                value={titles}
                onChange={(e) => settitles(e.target.value)}
                name="titles"
                placeholder="title is required"
                className="w-full h-10 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pl-[6px]"
              />
            </div>
            <div className="flex gap-2 mb-10 mx-2">
              <label
                htmlFor="body"
                className="font-bold ml-2 text-xl text-black"
              >
                Body:{" "}
              </label>
              <textarea
                name="body"
                value={body}
                className="w-full h-64 rounded-md text-xl font-semibold bg-white/80 shadow-md drop-shadow-lg -mt-[6px] shadow-slate-400 focus:outline-none text-black pt-2 pl-2"
                onChange={(e) => setbody(e.target.value)}
                placeholder="Your Content is required"
                id="body"
              ></textarea>
              {/* <input type="text" name="body" placeholder="body is required" /> *}
            </div> */
}
