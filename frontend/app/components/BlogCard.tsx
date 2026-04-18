"use client";

type Blog = {
  _id: string;
  title: string;
  content: string;
  image?: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-200">

      {blog.image && (
        <img
          src={`http://localhost:5000/${blog.image}`}
          alt="blog"
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{blog.title}</h2>

        <p className="text-sm text-gray-300 mb-3">
          {blog.content.slice(0, 80)}...
        </p>

        <div className="flex gap-2">
          <button className="bg-blue-500 px-3 py-1 rounded text-white">
            View
          </button>

          <button className="bg-yellow-400 px-3 py-1 rounded">
            Edit
          </button>

          <button className="bg-red-500 px-3 py-1 rounded text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}