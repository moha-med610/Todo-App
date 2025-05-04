import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-indigo-600 animate-bounce">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
          الصفحة غير موجودة
        </p>
        <p className="mt-2 text-gray-500 font-bold">
          يبدو أنك ضائع في الفضاء... رجعنا على الصفحة الرئيسية 👨‍🚀
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium shadow hover:bg-indigo-700 transition duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;