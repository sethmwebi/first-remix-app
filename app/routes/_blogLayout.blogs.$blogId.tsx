import { ActionFunction, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";
import React from "react";

export const loader = async ({
  params,
  context,
  request,
}: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.blogId}`
  );
  const data: { id: string; title: string; body: string; userId: string } =
    await response.json();
  return json({ blog: data });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  console.log(title);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.blogId}`,
    { body: JSON.stringify({ title }), method: "PATCH" }
  );
  const data = await response.json();
  console.log(data);
  return json({ post: data });
};

const Blog = () => {
  const { blog } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isSubmitting = !(navigation.state === "idle");
  return (
    <div>
      <Link to="/">Home</Link>
      <div className="p-4 rounded-sm max-w-md border">
        <h1 className="font-bold text-xl mb-3">{blog.title}</h1>
        <p>{blog.body}</p>
      </div>
      <Form method="patch">
        <div className="p-3 border my-5 flex space-x-3 max-w-fit flex-col items-start">
          <input type="text" name="title" placeholder="title" />
          <button type="submit">{isSubmitting ? "submiting" : "update"}</button>
        </div>
      </Form>
    </div>
  );
};

export default Blog;
