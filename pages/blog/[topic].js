import { generateBlog } from "../../utils/generateBlog";

import Head from "next/head";

export const getStaticProps = async ({ params }) => {
  const { topic } = params;
  console.log("topic", topic);
  const { title, post, image } = await generateBlog(topic);

  return { props: { title, image, post }, revalidate: 84600 };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Blog = ({ title, image, post }) => {
  return (
    <div>
      <Head>
        <meta name="image" content={image} />
        <meta name="description" content={post.slice(0, 100)} />
        <meta name="title" content={title}></meta>
        <title>{title}</title>
      </Head>
      <div className="flex justify-center pt-20">
        <div className="w-full max-w-screen-lg">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-lg ">
            <div className="flex-shrink-0">
              <img className=" w-full h-80 object-cover" src={image} alt="" />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600"></p>

                <p
                  id="title"
                  className="text-xl capitalize font-semibold text-gray-900"
                >
                  {title}
                </p>
                <p className="mt-3 text-base text-gray-800">{post}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
