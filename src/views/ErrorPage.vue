<template>
  <div
    className="text-center flex justify-center flex-col h-screen items-center"
  >
    <div className="mb-20">
      <p className="font-bold text-[150px] text-gray-800">404</p>
      <p className="text-gray-600 text-[40px] mb-2">Page not found...🔭</p>
      <p className="text-gray-600 text-[20px] w-[500px]">
        The page you are looking for does not exist. Go back, or head over to
        <router-link to="/profile" className="text-blue-700 underline">
          Home page
        </router-link>
      </p>
    </div>
  </div>
</template>
